import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database"

type Supa = SupabaseClient<Database>

export type Category = {
  id: string
  slug: string
  name: string
  description: string | null
  seo_title: string | null
  seo_description: string | null
  post_count?: number
}

export async function getAllCategories(supabase: Supa): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("id, slug, name, description, seo_title, seo_description, order_index")
    .order("order_index", { ascending: true })
    .order("name", { ascending: true })

  if (error) throw error
  return (data ?? []) as Category[]
}

export async function getCategoriesWithCounts(
  supabase: Supa,
  limit?: number,
): Promise<Category[]> {
  const categories = await getAllCategories(supabase)
  if (categories.length === 0) return []

  const { data: rels } = await supabase
    .from("post_categories")
    .select("category_id, posts!inner(status, published_at)")
    .eq("posts.status", "published")

  type Rel = {
    category_id: string
    posts: { status: string; published_at: string | null } | null
  }

  const counts = new Map<string, number>()
  const now = new Date()
  for (const rel of (rels ?? []) as unknown as Rel[]) {
    if (
      !rel.posts ||
      !rel.posts.published_at ||
      new Date(rel.posts.published_at) > now
    ) {
      continue
    }
    counts.set(rel.category_id, (counts.get(rel.category_id) ?? 0) + 1)
  }

  const enriched = categories
    .map((c) => ({ ...c, post_count: counts.get(c.id) ?? 0 }))
    .filter((c) => c.post_count > 0)
    .sort((a, b) => (b.post_count ?? 0) - (a.post_count ?? 0))

  return limit ? enriched.slice(0, limit) : enriched
}

export async function getCategoryBySlug(
  supabase: Supa,
  slug: string,
): Promise<Category | null> {
  const { data, error } = await supabase
    .from("categories")
    .select("id, slug, name, description, seo_title, seo_description")
    .eq("slug", slug)
    .maybeSingle()

  if (error) throw error
  return (data as Category | null) ?? null
}
