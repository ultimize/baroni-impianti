import * as cheerio from "cheerio"
import type { UploadResult } from "./media-uploader.js"

type UploadFn = (url: string) => Promise<UploadResult | null>

export type RewriteResult = {
  html: string
  uploadedUrls: string[]
  skippedUrls: string[]
}

function isWpHostUrl(url: string, wpHost: string): boolean {
  try {
    const u = new URL(url, `https://${wpHost}`)
    return u.host === wpHost
  } catch {
    return false
  }
}

function pointsToUploads(url: string): boolean {
  return /\/wp-content\/uploads\//i.test(url)
}

export async function rewriteContentImages(
  html: string,
  uploadFn: UploadFn,
  wpHost: string,
): Promise<RewriteResult> {
  if (!html) {
    return { html: "", uploadedUrls: [], skippedUrls: [] }
  }

  const $ = cheerio.load(html, { xml: { decodeEntities: false } })
  const uploadedUrls: string[] = []
  const skippedUrls: string[] = []

  // Raccogliamo gli <img> e <a> rilevanti e li processiamo in sequenza
  // (il limite di concorrenza reale è in media-uploader).
  const imgEls = $("img").toArray()
  for (const el of imgEls) {
    const $img = $(el)
    const src = $img.attr("src")
    if (!src) continue
    if (!isWpHostUrl(src, wpHost)) continue
    if (!pointsToUploads(src)) continue

    const uploaded = await uploadFn(src)
    if (uploaded) {
      $img.attr("src", uploaded.publicUrl)
      uploadedUrls.push(src)
    } else {
      skippedUrls.push(src)
    }
    // Rimuove srcset/sizes: next/image li rigenererà.
    $img.removeAttr("srcset")
    $img.removeAttr("sizes")
  }

  // Link a file caricati su WP (pdf, immagini linkate).
  const linkEls = $("a[href]").toArray()
  for (const el of linkEls) {
    const $a = $(el)
    const href = $a.attr("href")
    if (!href) continue
    if (!isWpHostUrl(href, wpHost)) continue
    if (!pointsToUploads(href)) continue

    const uploaded = await uploadFn(href)
    if (uploaded) {
      $a.attr("href", uploaded.publicUrl)
      uploadedUrls.push(href)
    } else {
      skippedUrls.push(href)
    }
  }

  return {
    html: $.html(),
    uploadedUrls,
    skippedUrls,
  }
}
