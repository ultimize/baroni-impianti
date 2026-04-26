/**
 * Import galleria foto da WordPress (elettricistasestrilevante.it) → Supabase
 *
 * 1. Prende le foto dalla pagina /galleria/ del WP via WP REST API
 * 2. Le scarica
 * 3. Le carica su bucket Supabase Storage 'gallery'
 * 4. Inserisce le righe in tabella `gallery_items`
 *
 * USO:
 *   pnpm tsx scripts/import-gallery.ts
 *   pnpm tsx scripts/import-gallery.ts import
 *   pnpm tsx scripts/import-gallery.ts dry-run
 *   pnpm tsx scripts/import-gallery.ts wipe
 *
 * REQUIREMENTS .env.local:
 *   NEXT_PUBLIC_SUPABASE_URL=https://igtwzuxufrdflhmwuzpq.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY=...
 *   WP_HOST=elettricistasestrilevante.it    (default già impostato)
 *   WP_API_BASE=https://elettricistasestrilevante.it/wp-json/wp/v2  (richiesto da downloadBinary)
 *   WP_AUTH_USER=...      (application password user)
 *   WP_AUTH_PASSWORD=...  (application password)
 */

import "dotenv/config"
import { config as loadEnv } from "dotenv"
import { resolve } from "node:path"
import { getSupabaseAdmin } from "./lib/supabase-admin.js"
import { logger } from "./lib/logger.js"

loadEnv({ path: resolve(process.cwd(), ".env.local"), override: false })

const WP_HOST = process.env.WP_HOST ?? "elettricistasestrilevante.it"
const WP_BASE = `https://${WP_HOST}/wp-json/wp/v2`
const GALLERY_BUCKET = "gallery"

type WPMedia = {
  id: number
  date: string
  slug: string
  title: { rendered: string }
  alt_text: string
  caption: { rendered: string }
  description: { rendered: string }
  source_url: string
  media_details?: {
    width?: number
    height?: number
    sizes?: Record<string, { source_url: string; width: number; height: number }>
  }
  meta?: Record<string, unknown>
}

type WPPage = {
  id: number
  slug: string
  title: { rendered: string }
  content: { rendered: string }
}

const MODE = (process.argv[2] ?? "import").toLowerCase()

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: { "User-Agent": "BaroniGalleryImporter/1.0" },
  })
  if (!res.ok) {
    throw new Error(`Fetch ${url} failed: ${res.status} ${res.statusText}`)
  }
  return (await res.json()) as T
}

async function fetchGalleryPageHTML(): Promise<string | null> {
  // Il REST API restituisce content.rendered senza <img> per pagine Elementor/lazy.
  // Fetchiamo direttamente l'HTML pubblico della pagina /galleria/.
  try {
    const res = await fetch(`https://${WP_HOST}/galleria/`, {
      headers: { "User-Agent": "Mozilla/5.0 BaroniGalleryImporter/1.0" },
    })
    if (!res.ok) {
      logger.warn(`Fetch /galleria/ failed: ${res.status} ${res.statusText}`)
      return null
    }
    return await res.text()
  } catch (err) {
    logger.warn(`Errore fetch pagina galleria: ${(err as Error).message}`)
    return null
  }
}

// Normalizza una URL togliendo suffissi dimensione (-1024x768, -scaled) per
// fare match con il source_url originale del media WP.
function normalizeMediaUrl(url: string): string {
  return url
    .replace(/-\d+x\d+(\.[a-z]+)$/i, "$1")
    .replace(/-scaled(\.[a-z]+)$/i, "$1")
}

function extractImageUrlsFromHtml(html: string): string[] {
  const urls = new Set<string>()
  // Cattura QUALUNQUE URL su /wp-content/uploads/, ovunque nell'HTML
  // (src, data-src, srcset, attributi Elementor, JSON-LD, ecc.)
  const re = /https:\/\/elettricistasestrilevante\.it\/wp-content\/uploads\/[^"'\s)<>]+\.(?:jpg|jpeg|png|webp|gif)/gi
  let match: RegExpExecArray | null
  while ((match = re.exec(html)) !== null) {
    const url = match[0]
    // Filtra fuori loghi/non-galleria noti
    if (/2023\/09\/Elettricista-sestri-levante/i.test(url)) continue // logo header
    if (/2025\/02\/(Coat_of_arms|CoesioneItalia|Emblem_of_Italy|IT-V-Cofinanziato)/i.test(url)) continue // loghi bandi UE
    if (/-150x150\./i.test(url)) continue // thumbnail loghi
    urls.add(normalizeMediaUrl(url))
  }
  return Array.from(urls)
}

async function fetchAllMediaFromWP(): Promise<WPMedia[]> {
  const all: WPMedia[] = []
  let page = 1
  const perPage = 100
  while (true) {
    const url = `${WP_BASE}/media?per_page=${perPage}&page=${page}&orderby=date&order=desc`
    let batch: WPMedia[]
    try {
      batch = await fetchJson<WPMedia[]>(url)
    } catch (err) {
      logger.info(`Fetch media page=${page} terminato (${(err as Error).message})`)
      break
    }
    if (batch.length === 0) break
    all.push(...batch)
    if (batch.length < perPage) break
    page++
    if (page > 50) {
      logger.warn("Hard stop a 50 pagine media (5000 immagini), exit loop")
      break
    }
  }
  return all
}

function findMediaForUrl(allMedia: WPMedia[], url: string): WPMedia | undefined {
  const target = normalizeMediaUrl(url)
  return allMedia.find((m) => {
    if (normalizeMediaUrl(m.source_url) === target) return true
    if (m.media_details?.sizes) {
      return Object.values(m.media_details.sizes).some(
        (s) => normalizeMediaUrl(s.source_url) === target,
      )
    }
    return false
  })
}

function inferCategory(media: WPMedia, urlGuess: string): string {
  const haystack = [
    media.title.rendered,
    media.alt_text,
    media.caption.rendered,
    media.description.rendered,
    media.slug,
    urlGuess,
  ]
    .join(" ")
    .toLowerCase()

  if (/quadro|elettric|cavi|interrutt|salvavita/.test(haystack)) return "impianti-elettrici"
  if (/fotovolt|pannello solare|inverter|zcs|energia rinnovabil/.test(haystack)) return "fotovoltaico"
  if (/allarme|videosorvegli|sicurezza|telecamer|antifurto/.test(haystack)) return "sicurezza"
  if (/domotic|knx|smart home|tablet/.test(haystack)) return "domotica"
  if (/rete|cablat|fibra|wireless|lan|switch/.test(haystack)) return "rete-cablata"
  if (/sonor|diffusion|audio|amplificat|microfo|cass[ae]/.test(haystack)) return "diffusione-sonora"
  if (/fulmine|sovratensione|spd|atmosfer|scarica/.test(haystack)) return "spd"
  return "lavori-vari"
}

function buildStoragePath(media: WPMedia, sourceUrl: string): string {
  let filename = "image.jpg"
  try {
    const u = new URL(sourceUrl)
    const last = u.pathname.split("/").filter(Boolean).pop()
    if (last) filename = decodeURIComponent(last)
  } catch {
    // ignore
  }
  filename = filename.replace(/[^a-zA-Z0-9._-]/g, "_")
  return `wp-${media.id}-${filename}`
}

async function downloadPublic(url: string): Promise<{ buffer: Buffer; contentType: string } | null> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 30_000)
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0 BaroniGalleryImporter/1.0" },
    })
    if (!res.ok) {
      logger.error(`Download fallito ${res.status} ${res.statusText}: ${url}`)
      return null
    }
    const contentType = res.headers.get("content-type") ?? "application/octet-stream"
    const arrayBuffer = await res.arrayBuffer()
    return { buffer: Buffer.from(arrayBuffer), contentType }
  } catch (err) {
    logger.error(`Download fallito per ${url}: ${(err as Error).message}`)
    return null
  } finally {
    clearTimeout(timeout)
  }
}

async function uploadToGalleryBucket(
  sourceUrl: string,
  storagePath: string,
): Promise<{ publicUrl: string; contentType: string; size: number } | null> {
  const supabase = getSupabaseAdmin()
  const binary = await downloadPublic(sourceUrl)
  if (!binary) return null

  const { error } = await supabase.storage.from(GALLERY_BUCKET).upload(storagePath, binary.buffer, {
    contentType: binary.contentType,
    upsert: true,
  })
  if (error) {
    logger.error(`Upload fallito per ${sourceUrl}: ${error.message}`)
    return null
  }
  const { data } = supabase.storage.from(GALLERY_BUCKET).getPublicUrl(storagePath)
  return {
    publicUrl: data.publicUrl,
    contentType: binary.contentType,
    size: binary.buffer.byteLength,
  }
}

async function wipeGallery() {
  const supabase = getSupabaseAdmin()
  logger.info("Wipe in corso: tabella gallery_items + bucket gallery")

  const { data: files } = await supabase.storage.from(GALLERY_BUCKET).list("", { limit: 1000 })
  if (files && files.length > 0) {
    const paths = files.map((f) => f.name)
    const { error: delErr } = await supabase.storage.from(GALLERY_BUCKET).remove(paths)
    if (delErr) logger.warn(`Errore delete storage: ${delErr.message}`)
    else logger.info(`Eliminati ${paths.length} file dal bucket`)
  }

  const { error } = await (supabase as unknown as {
    from: (t: string) => {
      delete: () => { neq: (col: string, val: string) => Promise<{ error: { message: string } | null }> }
    }
  })
    .from("gallery_items")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000")
  if (error) logger.error(`Errore wipe tabella: ${error.message}`)
  else logger.info("Tabella gallery_items svuotata")
}

async function main() {
  logger.info(`Modalità: ${MODE}`)
  logger.info(`WP host: ${WP_HOST}`)

  if (MODE === "wipe") {
    await wipeGallery()
    logger.info("Wipe completato. Lancia di nuovo con 'import' per re-importare.")
    return
  }

  logger.info("Step 1/4: fetch pagina /galleria/")
  const html = await fetchGalleryPageHTML()
  let galleryUrls: string[] = []

  if (html) {
    galleryUrls = extractImageUrlsFromHtml(html)
    logger.info(`Estratti ${galleryUrls.length} URL <img> dalla pagina galleria`)
  }

  if (galleryUrls.length === 0) {
    logger.warn("Pagina galleria vuota: fallback a fetch di TUTTI i media WP")
  }

  logger.info("Step 2/4: fetch metadata media WP")
  const allMedia = await fetchAllMediaFromWP()
  logger.info(`Recuperati ${allMedia.length} media totali da WP`)

  let mediaToImport: WPMedia[]
  if (galleryUrls.length > 0) {
    const matched: WPMedia[] = []
    let synthCounter = 900000 // ID sintetici sopra 900k per evitare collisioni con WP
    for (const url of galleryUrls) {
      const m = findMediaForUrl(allMedia, url)
      if (m) {
        matched.push(m)
        continue
      }
      // Le foto galleria del 2024/01 non sono nella REST API media: costruiamo
      // un WPMedia sintetico dall'URL così il flusso uniforme prosegue.
      const filename = url.split("/").pop() ?? "image.jpg"
      const titleFromFile = filename
        .replace(/\.[a-z]+$/i, "")
        .replace(/[-_]/g, " ")
        .replace(/\s+/g, " ")
        .trim()
      matched.push({
        id: synthCounter++,
        date: new Date().toISOString(),
        slug: filename.toLowerCase().replace(/\.[a-z]+$/i, ""),
        title: { rendered: titleFromFile },
        alt_text: titleFromFile,
        caption: { rendered: "" },
        description: { rendered: "" },
        source_url: url,
      })
    }
    mediaToImport = matched
  } else {
    mediaToImport = allMedia
  }

  logger.info(`Da importare: ${mediaToImport.length} immagini`)

  if (MODE === "dry-run") {
    logger.info("Dry-run: ecco cosa verrebbe importato:")
    for (const m of mediaToImport.slice(0, 20)) {
      console.log(`  - id=${m.id} | ${m.title.rendered || "(no title)"} | ${m.source_url}`)
    }
    if (mediaToImport.length > 20) console.log(`  ... e altri ${mediaToImport.length - 20}`)
    return
  }

  logger.info("Step 4/4: download + upload Supabase + insert DB")
  const supabase = getSupabaseAdmin() as unknown as {
    from: (t: string) => {
      select: (cols: string) => {
        eq: (col: string, val: number) => { maybeSingle: () => Promise<{ data: { id: string } | null }> }
      }
      insert: (row: Record<string, unknown>) => Promise<{ error: { message: string } | null }>
    }
  }
  let imported = 0
  let skipped = 0
  let failed = 0

  for (let i = 0; i < mediaToImport.length; i++) {
    const m = mediaToImport[i]!
    const progress = `[${i + 1}/${mediaToImport.length}]`

    let bestUrl = m.source_url
    if (m.media_details?.sizes) {
      const sizes = m.media_details.sizes
      bestUrl = sizes.large?.source_url ?? sizes.full?.source_url ?? m.source_url
    }

    const { data: existing } = await supabase
      .from("gallery_items")
      .select("id")
      .eq("source_wp_id", m.id)
      .maybeSingle()
    if (existing) {
      logger.info(`${progress} Skip (già importato): wp_id=${m.id}`)
      skipped++
      continue
    }

    const storagePath = buildStoragePath(m, bestUrl)
    const upload = await uploadToGalleryBucket(bestUrl, storagePath)
    if (!upload) {
      logger.error(`${progress} Upload FALLITO: ${bestUrl}`)
      failed++
      continue
    }

    const title = stripHtml(m.title.rendered) || `Lavoro Baroni #${m.id}`
    const description = stripHtml(m.caption.rendered) || stripHtml(m.description.rendered) || null
    const altText = m.alt_text || title
    const category = inferCategory(m, bestUrl)

    const { error: insertErr } = await supabase.from("gallery_items").insert({
      title,
      description,
      image_url: upload.publicUrl,
      alt_text: altText,
      category,
      source_wp_id: m.id,
      source_wp_url: bestUrl,
      width: m.media_details?.width ?? null,
      height: m.media_details?.height ?? null,
      order_index: i,
      is_published: true,
    })

    if (insertErr) {
      logger.error(`${progress} Insert DB FALLITO per wp_id=${m.id}: ${insertErr.message}`)
      failed++
      continue
    }

    logger.info(`${progress} ✓ ${title} [${category}]`)
    imported++
  }

  logger.info("--- RIEPILOGO ---")
  logger.info(`Importati: ${imported}`)
  logger.info(`Skippati (già esistenti): ${skipped}`)
  logger.info(`Falliti: ${failed}`)
  logger.info(`Totale processati: ${imported + skipped + failed}`)
}

function stripHtml(s: string): string {
  return (s ?? "")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .trim()
}

main().catch((err) => {
  logger.error(`FATAL: ${(err as Error).message}`)
  console.error(err)
  process.exit(1)
})
