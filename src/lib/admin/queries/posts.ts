import "server-only"

import { createClient } from "@/lib/supabase/server"
import type { PostStatus } from "../utils/status"

export type AdminPostListRow = {
  id: string
  slug: string
  title: string
  status: PostStatus
  published_at: string | null
  updated_at: string
  author: { id: string; name: string } | null
  featured_image_url: string | null
}

export type AdminPostListResult = {
  rows: AdminPostListRow[]
  total: number
  page: number
  pageSize: number
}

export type AdminPostListOptions = {
  page?: number
  pageSize?: number
  search?: string
  status?: PostStatus | "all"
  authorId?: string
  sort?: "title" | "published_at" | "updated_at"
  direction?: "asc" | "desc"
}

export async function listAdminPosts(opts: AdminPostListOptions = {}): Promise<AdminPostListResult> {
  const supabase = await createClient()
  const page = Math.max(1, opts.page ?? 1)
  const pageSize = opts.pageSize ?? 25
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1
  const sort = opts.sort ?? "updated_at"
  const direction = opts.direction ?? "desc"

  let query = supabase
    .from("posts")
    .select(
      "id, slug, title, status, published_at, updated_at, featured_image_url, author:authors ( id, name )",
      { count: "exact" },
    )

  if (opts.search) {
    query = query.ilike("title", `%${opts.search}%`)
  }
  if (opts.status && opts.status !== "all") {
    query = query.eq("status", opts.status)
  }
  if (opts.authorId) {
    query = query.eq("author_id", opts.authorId)
  }

  query = query.order(sort, { ascending: direction === "asc" }).range(from, to)

  const { data, error, count } = await query
  if (error) throw error

  return {
    rows: (data ?? []) as unknown as AdminPostListRow[],
    total: count ?? 0,
    page,
    pageSize,
  }
}

export async function getAdminPostById(id: string) {
  const supabase = await createClient()
  const [postRes, catRes, tagRes] = await Promise.all([
    supabase.from("posts").select("*").eq("id", id).maybeSingle(),
    supabase.from("post_categories").select("category_id").eq("post_id", id),
    supabase.from("post_tags").select("tag_id").eq("post_id", id),
  ])

  if (postRes.error) throw postRes.error
  if (!postRes.data) return null

  return {
    post: postRes.data,
    category_ids: (catRes.data ?? []).map((r) => r.category_id),
    tag_ids: (tagRes.data ?? []).map((r) => r.tag_id),
  }
}

export async function getPostStatusCounts() {
  const supabase = await createClient()
  const [total, published, scheduled, draft, archived] = await Promise.all([
    supabase.from("posts").select("id", { count: "exact", head: true }),
    supabase.from("posts").select("id", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("posts").select("id", { count: "exact", head: true }).eq("status", "scheduled"),
    supabase.from("posts").select("id", { count: "exact", head: true }).eq("status", "draft"),
    supabase.from("posts").select("id", { count: "exact", head: true }).eq("status", "archived"),
  ])
  return {
    total: total.count ?? 0,
    published: published.count ?? 0,
    scheduled: scheduled.count ?? 0,
    draft: draft.count ?? 0,
    archived: archived.count ?? 0,
  }
}
