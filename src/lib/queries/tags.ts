import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database"

type Supa = SupabaseClient<Database>

export type Tag = {
  id: string
  slug: string
  name: string
  description: string | null
  post_count?: number
}

export async function getAllTags(supabase: Supa): Promise<Tag[]> {
  const { data, error } = await supabase
    .from("tags")
    .select("id, slug, name, description")
    .order("name", { ascending: true })

  if (error) throw error
  return (data ?? []) as Tag[]
}

export async function getPopularTags(
  supabase: Supa,
  limit = 20,
): Promise<Tag[]> {
  const tags = await getAllTags(supabase)
  if (tags.length === 0) return []

  const { data: rels } = await supabase
    .from("post_tags")
    .select("tag_id, posts!inner(status, published_at)")
    .eq("posts.status", "published")

  type Rel = {
    tag_id: string
    posts: { status: string; published_at: string | null } | null
  }

  const counts = new Map<string, number>()
  const now = new Date()
  for (const rel of (rels ?? []) as unknown as Rel[]) {
    if (
      !rel.posts ||
      !rel.posts.published_at ||
      new Date(rel.posts.published_at) > now
    )
      continue
    counts.set(rel.tag_id, (counts.get(rel.tag_id) ?? 0) + 1)
  }

  return tags
    .map((t) => ({ ...t, post_count: counts.get(t.id) ?? 0 }))
    .filter((t) => t.post_count > 0)
    .sort((a, b) => (b.post_count ?? 0) - (a.post_count ?? 0))
    .slice(0, limit)
}

export async function getTagBySlug(
  supabase: Supa,
  slug: string,
): Promise<Tag | null> {
  const { data, error } = await supabase
    .from("tags")
    .select("id, slug, name, description")
    .eq("slug", slug)
    .maybeSingle()

  if (error) throw error
  return (data as Tag | null) ?? null
}
