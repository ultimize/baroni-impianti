// Script standalone di migrazione WordPress → Supabase.
// Uso:
//   npx tsx scripts/import-wp.ts --dry-run
//   npx tsx scripts/import-wp.ts --limit=5
//   npx tsx scripts/import-wp.ts --resume
//   npx tsx scripts/import-wp.ts --yes
//
// Non importare questo file da codice Next: gira solo da CLI.

import { config as loadDotenv } from "dotenv"
import { writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { createInterface } from "node:readline/promises"
import { stdin, stdout } from "node:process"

import { logger } from "./lib/logger.js"
import {
  clearCheckpoint,
  emptyCheckpoint,
  loadCheckpoint,
  saveCheckpoint,
} from "./lib/checkpoint.js"
import { getSupabaseAdmin } from "./lib/supabase-admin.js"
import {
  fetchAllCategories,
  fetchAllPosts,
  fetchAllTags,
  fetchAllUsers,
  fetchTotals,
} from "./lib/wp-client.js"
import {
  dumpMediaCache,
  primeMediaCache,
  uploadMediaToSupabase,
} from "./lib/media-uploader.js"
import { rewriteContentImages } from "./lib/content-rewriter.js"
import type {
  Checkpoint,
  ImportCliOptions,
  ImportReport,
  WPCategory,
  WPPost,
  WPTag,
  WPUser,
} from "./types.js"

loadDotenv({ path: resolve(process.cwd(), ".env.local") })

// -----------------------------------------------------------------------------
// CLI parsing
// -----------------------------------------------------------------------------

function parseCliOptions(argv: string[]): ImportCliOptions {
  const opts: ImportCliOptions = {
    dryRun: false,
    resume: false,
    limit: null,
    yes: false,
  }
  for (const arg of argv) {
    if (arg === "--dry-run") opts.dryRun = true
    else if (arg === "--resume") opts.resume = true
    else if (arg === "--yes" || arg === "-y") opts.yes = true
    else if (arg.startsWith("--limit=")) {
      const n = Number(arg.split("=")[1])
      if (!Number.isFinite(n) || n <= 0) {
        throw new Error(`--limit deve essere un intero positivo, ricevuto: ${arg}`)
      }
      opts.limit = Math.floor(n)
    } else if (arg.startsWith("--")) {
      throw new Error(`Flag sconosciuta: ${arg}`)
    }
  }
  return opts
}

// -----------------------------------------------------------------------------
// Helpers HTML
// -----------------------------------------------------------------------------

// Decoder minimale per le entità HTML che WP produce nel rendered.
// Copre &amp; &lt; &gt; &quot; &#39; &#NNN; &#xNNN;
function decodeHtmlEntities(input: string): string {
  if (!input) return ""
  return input
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex: string) => {
      const code = parseInt(hex, 16)
      return Number.isFinite(code) ? String.fromCodePoint(code) : ""
    })
    .replace(/&#(\d+);/g, (_, dec: string) => {
      const code = parseInt(dec, 10)
      return Number.isFinite(code) ? String.fromCodePoint(code) : ""
    })
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
}

function stripHtml(input: string): string {
  if (!input) return ""
  return decodeHtmlEntities(input.replace(/<[^>]*>/g, "")).replace(/\s+/g, " ").trim()
}

function estimateReadingMinutes(htmlContent: string): number {
  const words = stripHtml(htmlContent).split(/\s+/).filter(Boolean).length
  if (words === 0) return 1
  return Math.max(1, Math.ceil(words / 220))
}

function mapWpStatus(wpStatus: string): "published" | "scheduled" | "draft" {
  if (wpStatus === "publish") return "published"
  if (wpStatus === "future") return "scheduled"
  return "draft"
}

// -----------------------------------------------------------------------------
// Conferma interattiva
// -----------------------------------------------------------------------------

async function confirm(question: string): Promise<boolean> {
  const rl = createInterface({ input: stdin, output: stdout })
  try {
    const ans = (await rl.question(`${question} [y/N] `)).trim().toLowerCase()
    return ans === "y" || ans === "yes"
  } finally {
    rl.close()
  }
}

// -----------------------------------------------------------------------------
// Banner
// -----------------------------------------------------------------------------

function printInitialBanner(mode: string): void {
  const projectId = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "")
    .replace(/^https?:\/\//, "")
    .split(".")[0]
  logger.plain("")
  logger.plain("╔═══════════════════════════════════════════════════════════════╗")
  logger.plain("║  📦 BARONI IMPIANTI - WordPress → Supabase Migration         ║")
  logger.plain("║                                                                ║")
  logger.plain(`║  Source:  ${(process.env.WP_API_BASE ?? "").replace(/\/wp-json.*$/, "").padEnd(52)}║`)
  logger.plain(`║  Target:  Supabase project ${projectId.padEnd(36)}║`)
  logger.plain(`║  Mode:    ${mode.padEnd(52)}║`)
  logger.plain("╚═══════════════════════════════════════════════════════════════╝")
  logger.plain("")
}

function printDiscoverySummary(totals: {
  authors: number
  categories: number
  tags: number
  postsPublished: number
  postsScheduled: number
}): void {
  const total = totals.postsPublished + totals.postsScheduled
  const pad = (n: number) => String(n).padEnd(16)
  logger.plain("┌───────────────────────────────┐")
  logger.plain("│  WordPress → Supabase Import  │")
  logger.plain("├───────────────────────────────┤")
  logger.plain(`│ Authors:       ${pad(totals.authors)}│`)
  logger.plain(`│ Categories:    ${pad(totals.categories)}│`)
  logger.plain(`│ Tags:          ${pad(totals.tags)}│`)
  logger.plain(`│ Posts (pub):   ${pad(totals.postsPublished)}│`)
  logger.plain(`│ Posts (sched): ${pad(totals.postsScheduled)}│`)
  logger.plain(`│ Total:         ${pad(total)}│`)
  logger.plain("└───────────────────────────────┘")
  logger.plain("")
}

function printFinalBanner(report: ImportReport): void {
  const duration = report.durationSeconds ?? 0
  const mins = Math.floor(duration / 60)
  const secs = duration % 60
  logger.plain("")
  logger.plain("╔═══════════════════════════════════════════════════════════════╗")
  logger.plain(`║  ✅ Import completed in ${mins}m ${secs}s`.padEnd(64) + "║")
  logger.plain("║                                                                ║")
  logger.plain(`║  Authors:        ${report.counts.authorsImported} imported`.padEnd(64) + "║")
  logger.plain(`║  Categories:     ${report.counts.categoriesImported} imported`.padEnd(64) + "║")
  logger.plain(`║  Tags:           ${report.counts.tagsImported} imported`.padEnd(64) + "║")
  logger.plain(
    `║  Posts:          ${report.counts.postsImported} imported, ${report.counts.postsSkipped} skipped`.padEnd(
      64,
    ) + "║",
  )
  logger.plain(
    `║  Media:          ${report.counts.mediaUploaded} uploaded, ${report.counts.mediaSkipped} skipped`.padEnd(
      64,
    ) + "║",
  )
  logger.plain("║                                                                ║")
  logger.plain("║  Report saved to: import-report.json                          ║")
  logger.plain("╚═══════════════════════════════════════════════════════════════╝")
  logger.plain("")
}

// -----------------------------------------------------------------------------
// Phases
// -----------------------------------------------------------------------------

async function phaseAuthors(checkpoint: Checkpoint, report: ImportReport): Promise<void> {
  logger.info("Phase 1/4: Authors")
  const users: WPUser[] = await fetchAllUsers()
  const supabase = getSupabaseAdmin()

  for (let i = 0; i < users.length; i++) {
    const u = users[i]
    logger.step(i + 1, users.length, `author "${u.name}" (wp_id=${u.id})`)
    const { data, error } = await supabase
      .from("authors")
      .upsert(
        {
          slug: u.slug,
          name: u.name,
          bio: u.description ?? null,
          email: u.email ?? null,
          avatar_url: u.avatar_urls?.["96"] ?? u.avatar_urls?.["48"] ?? null,
          wp_original_id: u.id,
        },
        { onConflict: "wp_original_id" },
      )
      .select("id")
      .single()
    if (error || !data) {
      logger.error(`Upsert autore ${u.id} fallito`, error ?? undefined)
      report.counts.errors += 1
      continue
    }
    checkpoint.taxonomyMaps.authors[String(u.id)] = data.id
    report.counts.authorsImported += 1
  }
  checkpoint.phase = "categories"
  saveCheckpoint(checkpoint)
  logger.success(`Authors phase done: ${report.counts.authorsImported} importati`)
}

async function phaseCategories(checkpoint: Checkpoint, report: ImportReport): Promise<void> {
  logger.info("Phase 2/4: Categories")
  const cats: WPCategory[] = await fetchAllCategories()
  const supabase = getSupabaseAdmin()

  // Primo pass: upsert senza parent_id.
  for (let i = 0; i < cats.length; i++) {
    const c = cats[i]
    logger.step(i + 1, cats.length, `category "${c.name}" (wp_id=${c.id})`)
    const { data, error } = await supabase
      .from("categories")
      .upsert(
        {
          slug: c.slug,
          name: c.name,
          description: c.description || null,
          wp_original_id: c.id,
        },
        { onConflict: "wp_original_id" },
      )
      .select("id")
      .single()
    if (error || !data) {
      logger.error(`Upsert categoria ${c.id} fallita`, error ?? undefined)
      report.counts.errors += 1
      continue
    }
    checkpoint.taxonomyMaps.categories[String(c.id)] = data.id
    report.counts.categoriesImported += 1
  }

  // Secondo pass: aggiorna parent_id con i mapping risolti.
  for (const c of cats) {
    if (!c.parent || c.parent === 0) continue
    const childId = checkpoint.taxonomyMaps.categories[String(c.id)]
    const parentId = checkpoint.taxonomyMaps.categories[String(c.parent)]
    if (!childId || !parentId) continue
    const { error } = await supabase
      .from("categories")
      .update({ parent_id: parentId })
      .eq("id", childId)
    if (error) {
      logger.warn(`Update parent_id fallito per categoria wp_id=${c.id}: ${error.message}`)
    }
  }

  checkpoint.phase = "tags"
  saveCheckpoint(checkpoint)
  logger.success(`Categories phase done: ${report.counts.categoriesImported} importati`)
}

async function phaseTags(checkpoint: Checkpoint, report: ImportReport): Promise<void> {
  logger.info("Phase 3/4: Tags")
  const tags: WPTag[] = await fetchAllTags()
  const supabase = getSupabaseAdmin()

  for (let i = 0; i < tags.length; i++) {
    const t = tags[i]
    logger.step(i + 1, tags.length, `tag "${t.name}" (wp_id=${t.id})`)
    const { data, error } = await supabase
      .from("tags")
      .upsert(
        {
          slug: t.slug,
          name: t.name,
          description: t.description || null,
          wp_original_id: t.id,
        },
        { onConflict: "wp_original_id" },
      )
      .select("id")
      .single()
    if (error || !data) {
      logger.error(`Upsert tag ${t.id} fallito`, error ?? undefined)
      report.counts.errors += 1
      continue
    }
    checkpoint.taxonomyMaps.tags[String(t.id)] = data.id
    report.counts.tagsImported += 1
  }

  checkpoint.phase = "posts"
  saveCheckpoint(checkpoint)
  logger.success(`Tags phase done: ${report.counts.tagsImported} importati`)
}

async function phasePosts(
  checkpoint: Checkpoint,
  report: ImportReport,
  options: ImportCliOptions,
): Promise<void> {
  logger.info("Phase 4/4: Posts")
  const supabase = getSupabaseAdmin()

  // Diagnostica: se queste size sono 0, i junction insert falliranno silenti.
  const mapSizes = {
    authors: Object.keys(checkpoint.taxonomyMaps.authors).length,
    categories: Object.keys(checkpoint.taxonomyMaps.categories).length,
    tags: Object.keys(checkpoint.taxonomyMaps.tags).length,
  }
  logger.info(
    `Taxonomy maps: authors=${mapSizes.authors}, categories=${mapSizes.categories}, tags=${mapSizes.tags}`,
  )
  if (mapSizes.tags === 0) {
    logger.warn(
      "taxonomyMaps.tags è vuota: nessun collegamento post_tags verrà creato. " +
        "Verifica che phaseTags sia stata eseguita (ricarica senza --resume o ispeziona .import-checkpoint.json).",
    )
  }

  const allPosts: WPPost[] = await fetchAllPosts()

  // Ordina per id crescente così il resume è deterministico.
  allPosts.sort((a, b) => a.id - b.id)

  const wpHost = new URL(process.env.WP_API_BASE ?? "https://example.com").host
  let processed = 0
  let skipped = 0
  const startIdx = checkpoint.lastProcessedPostId
    ? allPosts.findIndex((p) => p.id > (checkpoint.lastProcessedPostId as number))
    : 0
  const iterFrom = startIdx >= 0 ? startIdx : allPosts.length

  // Registra SIGINT per salvare il checkpoint al Ctrl+C.
  const onInterrupt = () => {
    logger.warn("Interruzione ricevuta: salvo checkpoint...")
    checkpoint.mediaCache = dumpMediaCache()
    saveCheckpoint(checkpoint)
    logger.plain("Paused, resume with --resume")
    process.exit(0)
  }
  process.once("SIGINT", onInterrupt)
  process.once("SIGTERM", onInterrupt)

  for (let i = iterFrom; i < allPosts.length; i++) {
    const post = allPosts[i]
    if (options.limit !== null && processed >= options.limit) {
      logger.info(`Raggiunto --limit=${options.limit}, stop.`)
      break
    }

    logger.step(
      i + 1,
      allPosts.length,
      `post "${decodeHtmlEntities(post.title.rendered)}" (wp_id=${post.id}, status=${post.status})`,
    )

    // Check idempotenza: se esiste e modified_gmt coincide, skip.
    const existing = await supabase
      .from("posts")
      .select("id, updated_at")
      .eq("wp_original_id", post.id)
      .maybeSingle()
    if (existing.data) {
      // updated_at Supabase è distinto da modified_gmt WP: usiamo solo
      // l'esistenza come skip (re-processare ogni modifica WP sarebbe
      // costoso e richiederebbe tracking lato DB di wp_modified_gmt).
      skipped += 1
      report.counts.postsSkipped += 1
      checkpoint.lastProcessedPostId = post.id
      if (processed % 10 === 0) {
        checkpoint.mediaCache = dumpMediaCache()
        saveCheckpoint(checkpoint)
      }
      continue
    }

    try {
      // Featured image
      let featuredImageUrl: string | null = null
      let featuredImageAlt: string | null = null
      let ogImageUrl: string | null = null
      const featured = post._embedded?.["wp:featuredmedia"]?.[0]
      if (featured?.source_url) {
        const uploaded = await uploadMediaToSupabase(featured.source_url)
        if (uploaded) {
          featuredImageUrl = uploaded.publicUrl
          report.counts.mediaUploaded += 1
        } else {
          report.counts.mediaSkipped += 1
        }
        featuredImageAlt = featured.alt_text || null
      }

      // Content rewrite (scarica + riscrive immagini inline)
      const rewrite = await rewriteContentImages(
        post.content.rendered,
        uploadMediaToSupabase,
        wpHost,
      )
      report.counts.mediaUploaded += rewrite.uploadedUrls.length
      report.counts.mediaSkipped += rewrite.skippedUrls.length

      // OG image da Yoast (fallback a featured)
      const yoastOg = post.yoast_head_json?.og_image?.[0]?.url
      if (yoastOg) {
        const uploaded = await uploadMediaToSupabase(yoastOg)
        if (uploaded) {
          ogImageUrl = uploaded.publicUrl
          report.counts.mediaUploaded += 1
        } else {
          report.counts.mediaSkipped += 1
          ogImageUrl = featuredImageUrl
        }
      } else {
        ogImageUrl = featuredImageUrl
      }

      const authorId = checkpoint.taxonomyMaps.authors[String(post.author)] ?? null
      if (!authorId && post.author) {
        logger.warn(`Autore wp_id=${post.author} non mappato per post wp_id=${post.id}`)
      }

      const title = decodeHtmlEntities(post.title.rendered)
      const excerpt = stripHtml(post.excerpt.rendered)
      const status = mapWpStatus(post.status)
      const publishedAt = new Date(post.date_gmt + "Z").toISOString()
      const readingTime = estimateReadingMinutes(rewrite.html)
      const seoTitle = post.yoast_head_json?.title || title
      const seoDescription = post.yoast_head_json?.description || excerpt || null

      const { data: upserted, error: upsertErr } = await supabase
        .from("posts")
        .upsert(
          {
            slug: post.slug,
            title,
            excerpt: excerpt || null,
            content: rewrite.html,
            featured_image_url: featuredImageUrl,
            featured_image_alt: featuredImageAlt,
            author_id: authorId,
            status,
            published_at: publishedAt,
            reading_time_minutes: readingTime,
            seo_title: seoTitle,
            seo_description: seoDescription,
            og_image_url: ogImageUrl,
            canonical_url: null,
            noindex: false,
            wp_original_id: post.id,
            wp_original_url: post.link,
          },
          { onConflict: "wp_original_id" },
        )
        .select("id")
        .single()

      if (upsertErr || !upserted) {
        logger.error(`Upsert post ${post.id} fallito`, upsertErr ?? undefined)
        report.counts.errors += 1
        continue
      }

      // Junction: post_categories
      if (Array.isArray(post.categories) && post.categories.length > 0) {
        const missing: number[] = []
        const rows = post.categories
          .map((wpId) => {
            const uuid = checkpoint.taxonomyMaps.categories[String(wpId)]
            if (!uuid) missing.push(wpId)
            return uuid
          })
          .filter((v): v is string => Boolean(v))
          .map((category_id) => ({ post_id: upserted.id, category_id }))
        if (missing.length > 0) {
          logger.warn(
            `Post wp_id=${post.id}: ${missing.length}/${post.categories.length} categorie non mappate (wp ids: ${missing.join(",")})`,
          )
        }
        if (rows.length > 0) {
          const { error: insErr } = await supabase
            .from("post_categories")
            .upsert(rows, { onConflict: "post_id,category_id", ignoreDuplicates: true })
          if (insErr) logger.warn(`Upsert post_categories fallito per wp_id=${post.id}: ${insErr.message}`)
        }
      }

      // Junction: post_tags
      if (Array.isArray(post.tags) && post.tags.length > 0) {
        const missing: number[] = []
        const rows = post.tags
          .map((wpId) => {
            const uuid = checkpoint.taxonomyMaps.tags[String(wpId)]
            if (!uuid) missing.push(wpId)
            return uuid
          })
          .filter((v): v is string => Boolean(v))
          .map((tag_id) => ({ post_id: upserted.id, tag_id }))
        if (missing.length > 0) {
          // Warning esplicito: prima era un silent failure (rows vuoto → nessun log).
          logger.warn(
            `Post wp_id=${post.id}: ${missing.length}/${post.tags.length} tag non mappati (wp ids: ${missing.join(",")})`,
          )
        }
        if (rows.length > 0) {
          const { error: insErr } = await supabase
            .from("post_tags")
            .upsert(rows, { onConflict: "post_id,tag_id", ignoreDuplicates: true })
          if (insErr) logger.warn(`Upsert post_tags fallito per wp_id=${post.id}: ${insErr.message}`)
        }
      }

      processed += 1
      report.counts.postsImported += 1
      checkpoint.lastProcessedPostId = post.id
    } catch (err) {
      logger.error(`Errore processando post wp_id=${post.id}`, err)
      report.counts.errors += 1
    }

    // Checkpoint ogni 10 post.
    if (processed > 0 && processed % 10 === 0) {
      checkpoint.mediaCache = dumpMediaCache()
      saveCheckpoint(checkpoint)
    }
  }

  process.off("SIGINT", onInterrupt)
  process.off("SIGTERM", onInterrupt)

  checkpoint.phase = "validation"
  checkpoint.mediaCache = dumpMediaCache()
  saveCheckpoint(checkpoint)
  logger.success(
    `Posts phase done: ${report.counts.postsImported} importati, ${skipped} skippati (già presenti)`,
  )
}

async function phaseValidation(report: ImportReport): Promise<void> {
  logger.info("Phase 5: Validation")
  const supabase = getSupabaseAdmin()
  const { count, error } = await supabase
    .from("posts")
    .select("id", { count: "exact", head: true })
    .not("wp_original_id", "is", null)
  if (error) {
    logger.warn(`Validation query fallita: ${error.message}`)
    return
  }
  logger.success(`Posts con wp_original_id in Supabase: ${count ?? 0}`)
  logger.plain(
    `Report: importati=${report.counts.postsImported}, skippati=${report.counts.postsSkipped}, errori=${report.counts.errors}`,
  )
}

// -----------------------------------------------------------------------------
// Main
// -----------------------------------------------------------------------------

function assertEnv(): void {
  const required = [
    "NEXT_PUBLIC_SUPABASE_URL",
    "SUPABASE_SERVICE_ROLE_KEY",
    "WP_API_BASE",
    "WP_AUTH_USER",
    "WP_AUTH_PASSWORD",
  ]
  const missing = required.filter((k) => !process.env[k])
  if (missing.length > 0) {
    throw new Error(`Env vars mancanti in .env.local: ${missing.join(", ")}`)
  }
}

async function main(): Promise<void> {
  const options = parseCliOptions(process.argv.slice(2))
  assertEnv()

  const mode = options.dryRun
    ? "DRY RUN"
    : options.resume
      ? "RESUME"
      : "FULL IMPORT"
  printInitialBanner(mode)

  // Discovery: sempre (è economica e informa il banner).
  logger.info("Discovery WP...")
  const totals = await fetchTotals()
  printDiscoverySummary(totals)

  if (options.dryRun) {
    logger.info("--dry-run: nessuna scrittura, esco.")
    return
  }

  if (!options.yes) {
    const ok = await confirm("Procedere con l'import?")
    if (!ok) {
      logger.info("Annullato dall'utente.")
      return
    }
  }

  // Checkpoint: carica se --resume, altrimenti parti pulito.
  let checkpoint: Checkpoint
  if (options.resume) {
    const loaded = loadCheckpoint()
    if (!loaded) {
      logger.warn("Nessun checkpoint trovato: parto da zero.")
      checkpoint = emptyCheckpoint()
    } else {
      checkpoint = loaded
      primeMediaCache(checkpoint.mediaCache)
      logger.info(`Checkpoint caricato: phase=${checkpoint.phase}, lastPostId=${checkpoint.lastProcessedPostId ?? "-"}`)
    }
  } else {
    checkpoint = emptyCheckpoint()
  }

  const report: ImportReport = {
    startedAt: new Date().toISOString(),
    finishedAt: null,
    durationSeconds: null,
    mode: options.dryRun ? "dry-run" : options.resume ? "resume" : "full",
    limit: options.limit,
    counts: {
      authorsImported: 0,
      categoriesImported: 0,
      tagsImported: 0,
      postsImported: 0,
      postsSkipped: 0,
      mediaUploaded: 0,
      mediaSkipped: 0,
      errors: 0,
    },
    warnings: [],
    errors: [],
  }

  const started = Date.now()
  try {
    if (checkpoint.phase === "authors") {
      await phaseAuthors(checkpoint, report)
    }
    if (checkpoint.phase === "categories") {
      await phaseCategories(checkpoint, report)
    }
    if (checkpoint.phase === "tags") {
      await phaseTags(checkpoint, report)
    }
    if (checkpoint.phase === "posts") {
      await phasePosts(checkpoint, report, options)
    }
    if (checkpoint.phase === "validation") {
      await phaseValidation(report)
      checkpoint.phase = "done"
      saveCheckpoint(checkpoint)
    }
  } catch (err) {
    logger.error("Errore fatale durante l'import", err)
    checkpoint.mediaCache = dumpMediaCache()
    saveCheckpoint(checkpoint)
    report.finishedAt = new Date().toISOString()
    report.durationSeconds = Math.round((Date.now() - started) / 1000)
    report.warnings = logger.getWarnings()
    report.errors = logger.getErrors()
    writeFileSync(
      resolve(process.cwd(), "import-report.json"),
      JSON.stringify(report, null, 2),
      "utf-8",
    )
    process.exit(1)
  }

  report.finishedAt = new Date().toISOString()
  report.durationSeconds = Math.round((Date.now() - started) / 1000)
  report.warnings = logger.getWarnings()
  report.errors = logger.getErrors()
  writeFileSync(
    resolve(process.cwd(), "import-report.json"),
    JSON.stringify(report, null, 2),
    "utf-8",
  )

  clearCheckpoint()
  printFinalBanner(report)
}

main().catch((err) => {
  logger.error("Uncaught error in main", err)
  process.exit(1)
})
