import type { MetadataRoute } from "next"
import { createClient } from "@/lib/supabase/server"
import { SITE_URL } from "@/lib/constants"
import { buildPostUrl } from "@/lib/content/url-builder"

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()
  const now = new Date()

  const [posts, services, pages, categories] = await Promise.all([
    supabase
      .from("posts")
      .select("slug, published_at, updated_at")
      .eq("status", "published")
      .eq("noindex", false)
      .lte("published_at", now.toISOString()),
    supabase
      .from("services")
      .select("slug, updated_at")
      .eq("is_published", true),
    supabase
      .from("pages")
      .select("slug, updated_at")
      .eq("is_published", true)
      .eq("noindex", false),
    supabase.from("categories").select("slug, updated_at"),
  ])

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/specialista-elettrico-sestri-levante`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/elettricista-a-chiavari-e-sestri-levante`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/zero-pensieri`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/testimonianze`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/certificazioni`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/blog-per-elettricisti`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/contatti`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
  ]

  const postEntries: MetadataRoute.Sitemap = (posts.data ?? [])
    .filter((p): p is { slug: string; published_at: string; updated_at: string } =>
      !!p.published_at,
    )
    .map((p) => ({
      url: `${SITE_URL}${buildPostUrl(p.published_at, p.slug)}`,
      lastModified: new Date(p.updated_at ?? p.published_at),
      changeFrequency: "monthly",
      priority: 0.7,
    }))

  const serviceEntries: MetadataRoute.Sitemap = (services.data ?? []).map((s) => ({
    url: `${SITE_URL}/${s.slug}`,
    lastModified: new Date(s.updated_at),
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  const pageEntries: MetadataRoute.Sitemap = (pages.data ?? []).map((p) => ({
    url: `${SITE_URL}/${p.slug}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: "monthly",
    priority: 0.5,
  }))

  const categoryEntries: MetadataRoute.Sitemap = (categories.data ?? []).map((c) => ({
    url: `${SITE_URL}/blog-per-elettricisti/categoria/${c.slug}`,
    lastModified: new Date(c.updated_at),
    changeFrequency: "weekly",
    priority: 0.6,
  }))

  // ponytail: tag esclusi, sono noindex (vedi buildTagMetadata)

  return [
    ...staticEntries,
    ...postEntries,
    ...serviceEntries,
    ...pageEntries,
    ...categoryEntries,
  ]
}
