import { createPublicClient } from "@/lib/supabase/public-client"
import { getRecentPosts } from "@/lib/queries/posts"
import { buildPostUrl } from "@/lib/content/url-builder"
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  BLOG_BASE_PATH,
} from "@/lib/constants"

/** Il feed viene rigenerato al massimo una volta all'ora. */
export const revalidate = 3600

/** Quanti articoli esporre: gli aggregatori raramente ne leggono di più. */
const FEED_ITEMS = 30

const FEED_PATH = "/feed.xml"

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

/** Testo libero (titoli, estratti): CDATA, con la sequenza di chiusura neutralizzata. */
function cdata(value: string): string {
  return `<![CDATA[${value.replace(/\]\]>/g, "]]]]><![CDATA[>")}]]>`
}

/** RSS 2.0 richiede date in formato RFC 822. */
function toRfc822(value: string): string {
  return new Date(value).toUTCString()
}

export async function GET(): Promise<Response> {
  const supabase = createPublicClient()
  const posts = await getRecentPosts(supabase, FEED_ITEMS)

  const lastBuildDate = posts[0]?.published_at
    ? toRfc822(posts[0].published_at)
    : new Date().toUTCString()

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}${buildPostUrl(post.published_at, post.slug)}`
      const description = post.excerpt?.trim()
      const image = post.featured_image_url

      return [
        "    <item>",
        `      <title>${cdata(post.title)}</title>`,
        `      <link>${escapeXml(url)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
        `      <pubDate>${toRfc822(post.published_at)}</pubDate>`,
        description ? `      <description>${cdata(description)}</description>` : null,
        post.author?.name ? `      <dc:creator>${cdata(post.author.name)}</dc:creator>` : null,
        ...(post.categories ?? []).map(
          (category) => `      <category>${cdata(category.name)}</category>`,
        ),
        image
          ? `      <enclosure url="${escapeXml(image)}" type="image/jpeg" />`
          : null,
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n")
    })
    .join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${cdata(`${SITE_NAME} — Blog`)}</title>
    <link>${escapeXml(`${SITE_URL}${BLOG_BASE_PATH}`)}</link>
    <description>${cdata(SITE_DESCRIPTION)}</description>
    <language>it-IT</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${escapeXml(`${SITE_URL}${FEED_PATH}`)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}
