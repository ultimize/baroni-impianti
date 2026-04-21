import "server-only"

import { createClient } from "@/lib/supabase/server"

export type AdminAuthor = {
  id: string
  slug: string
  name: string
  bio: string | null
  avatar_url: string | null
  email: string | null
  post_count: number
}

export async function listAuthors(): Promise<AdminAuthor[]> {
  const supabase = await createClient()
  const { data: authors } = await supabase
    .from("authors")
    .select("id, slug, name, bio, avatar_url, email")
    .order("name", { ascending: true })

  const list = (authors ?? []) as Omit<AdminAuthor, "post_count">[]
  if (list.length === 0) return []

  const { data: posts } = await supabase.from("posts").select("author_id")
  const counts = new Map<string, number>()
  for (const p of posts ?? []) {
    if (!p.author_id) continue
    counts.set(p.author_id, (counts.get(p.author_id) ?? 0) + 1)
  }

  return list.map((a) => ({ ...a, post_count: counts.get(a.id) ?? 0 }))
}

export async function getAuthorById(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("authors")
    .select("id, slug, name, bio, avatar_url, email")
    .eq("id", id)
    .maybeSingle()
  if (error) throw error
  return data
}

export async function listAuthorsLite() {
  const supabase = await createClient()
  const { data } = await supabase
    .from("authors")
    .select("id, name")
    .order("name", { ascending: true })
  return (data ?? []) as { id: string; name: string }[]
}

export type AdminCategory = {
  id: string
  slug: string
  name: string
  description: string | null
  parent_id: string | null
  order_index: number
  post_count: number
}

export async function listAdminCategories(): Promise<AdminCategory[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("categories")
    .select("id, slug, name, description, parent_id, order_index")
    .order("order_index", { ascending: true })
    .order("name", { ascending: true })

  const list = (data ?? []) as Omit<AdminCategory, "post_count">[]
  if (list.length === 0) return []

  const { data: rels } = await supabase.from("post_categories").select("category_id")
  const counts = new Map<string, number>()
  for (const rel of rels ?? []) {
    counts.set(rel.category_id, (counts.get(rel.category_id) ?? 0) + 1)
  }

  return list.map((c) => ({ ...c, post_count: counts.get(c.id) ?? 0 }))
}

export type AdminTag = {
  id: string
  slug: string
  name: string
  description: string | null
  post_count: number
}

export async function listAdminTags(): Promise<AdminTag[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("tags")
    .select("id, slug, name, description")
    .order("name", { ascending: true })

  const list = (data ?? []) as Omit<AdminTag, "post_count">[]
  if (list.length === 0) return []

  const { data: rels } = await supabase.from("post_tags").select("tag_id")
  const counts = new Map<string, number>()
  for (const rel of rels ?? []) {
    counts.set(rel.tag_id, (counts.get(rel.tag_id) ?? 0) + 1)
  }

  return list.map((t) => ({ ...t, post_count: counts.get(t.id) ?? 0 }))
}
