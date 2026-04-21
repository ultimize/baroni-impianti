import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database"

type Supa = SupabaseClient<Database>

export type StaticPage = {
  id: string
  slug: string
  title: string
  content: string | null
  template: string | null
  is_published: boolean
  seo_title: string | null
  seo_description: string | null
  og_image_url: string | null
  noindex: boolean
  updated_at: string
}

export async function getPageBySlug(
  supabase: Supa,
  slug: string,
): Promise<StaticPage | null> {
  const { data, error } = await supabase
    .from("pages")
    .select(
      "id, slug, title, content, template, is_published, seo_title, seo_description, og_image_url, noindex, updated_at",
    )
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle()

  if (error) throw error
  return (data as StaticPage | null) ?? null
}

export async function getAllPublishedPages(
  supabase: Supa,
): Promise<Pick<StaticPage, "slug" | "updated_at" | "noindex">[]> {
  const { data, error } = await supabase
    .from("pages")
    .select("slug, updated_at, noindex")
    .eq("is_published", true)

  if (error) throw error
  return (data ?? []) as Pick<StaticPage, "slug" | "updated_at" | "noindex">[]
}
