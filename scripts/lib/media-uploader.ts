import pLimit from "p-limit"
import { downloadBinary } from "./wp-client.js"
import { logger } from "./logger.js"
import { getSupabaseAdmin, STORAGE_BUCKET } from "./supabase-admin.js"

export type UploadResult = { publicUrl: string; storagePath: string }

// Cache in-memory per tutta l'esecuzione: evita riupload multipli
// dello stesso asset quando appare in più post (es. un'icona condivisa).
// La chiave è il source URL normalizzato.
const cache = new Map<string, UploadResult>()

// Set di path WP già visti: se due URL diversi mappano allo stesso path,
// evitiamo un secondo upload ma restituiamo lo stesso public URL.
const uploadedPaths = new Map<string, UploadResult>()

const uploadLimit = pLimit(5)

function normalizeWpUploadPath(sourceUrl: string): string | null {
  // Estrae es. "2026/02/ChatGPT-Image.png" da ".../wp-content/uploads/2026/02/ChatGPT-Image.png"
  const match = sourceUrl.match(/\/wp-content\/uploads\/(.+)$/)
  if (!match) return null
  // Strippa eventuali query string (es. ?resize=300%2C200) dal path.
  const path = match[1].split("?")[0].split("#")[0]
  // Sanity: non permettere ".." o segmenti vuoti.
  if (path.includes("..") || path.includes("//")) return null
  return path
}

export function primeMediaCache(entries: Record<string, string>): void {
  for (const [sourceUrl, publicUrl] of Object.entries(entries)) {
    const path = normalizeWpUploadPath(sourceUrl) ?? sourceUrl
    const entry: UploadResult = { publicUrl, storagePath: path }
    cache.set(sourceUrl, entry)
    uploadedPaths.set(path, entry)
  }
}

export function dumpMediaCache(): Record<string, string> {
  const out: Record<string, string> = {}
  for (const [k, v] of cache.entries()) out[k] = v.publicUrl
  return out
}

async function doUpload(sourceUrl: string): Promise<UploadResult | null> {
  const path = normalizeWpUploadPath(sourceUrl)
  if (!path) {
    // Asset fuori da /wp-content/uploads: non lo gestiamo.
    logger.warn(`URL fuori wp-content/uploads, skip: ${sourceUrl}`)
    return null
  }
  if (uploadedPaths.has(path)) {
    const hit = uploadedPaths.get(path)!
    cache.set(sourceUrl, hit)
    return hit
  }

  const supabase = getSupabaseAdmin()
  let binary: { buffer: Buffer; contentType: string }
  try {
    binary = await downloadBinary(sourceUrl)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    // 404 / errori di download: trattiamo come asset mancante.
    logger.warn(`Download fallito (${msg}) → skip: ${sourceUrl}`)
    return null
  }

  let lastError: unknown = null
  for (let attempt = 1; attempt <= 2; attempt++) {
    const { error } = await supabase.storage.from(STORAGE_BUCKET).upload(path, binary.buffer, {
      contentType: binary.contentType,
      upsert: true,
    })
    if (!error) {
      const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path)
      const result: UploadResult = { publicUrl: data.publicUrl, storagePath: path }
      cache.set(sourceUrl, result)
      uploadedPaths.set(path, result)
      return result
    }
    lastError = error
    if (attempt < 2) {
      await new Promise((r) => setTimeout(r, 1000))
    }
  }
  const msg = lastError instanceof Error ? lastError.message : String(lastError)
  logger.warn(`Upload Storage fallito per ${path}: ${msg}`)
  return null
}

export async function uploadMediaToSupabase(sourceUrl: string): Promise<UploadResult | null> {
  if (!sourceUrl) return null
  const cached = cache.get(sourceUrl)
  if (cached) return cached
  return uploadLimit(() => doUpload(sourceUrl))
}
