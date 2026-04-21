import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database"
import { formatInTimeZone } from "date-fns-tz"

type Supa = SupabaseClient<Database>

const POST_CARD_COLUMNS = `
  id,
  slug,
  title,
  excerpt,
  featured_image_url,
  featured_image_alt,
  published_at,
  reading_time_minutes,
  wp_original_url,
  author:authors ( id, name, slug, avatar_url )
`

const POST_DETAIL_COLUMNS = `
  id,
  slug,
  title,
  excerpt,
  content,
  featured_image_url,
  featured_image_alt,
  published_at,
  updated_at,
  reading_time_minutes,
  wp_original_url,
  seo_title,
  seo_description,
  og_image_url,
  canonical_url,
  noindex,
  author:authors ( id, name, slug, avatar_url, bio, email )
`

export type PostCard = {
  id: string
  slug: string
  title: string
  excerpt: string | null
  featured_image_url: string | null
  featured_image_alt: string | null
  published_at: string
  reading_time_minutes: number | null
  wp_original_url: string | null
  author: {
    id: string
    name: string
    slug: string
    avatar_url: string | null
  } | null
  categories?: CategoryRef[]
}

export type CategoryRef = {
  id: string
  slug: string
  name: string
}

export type TagRef = {
  id: string
  slug: string
  name: string
}

export type PostDetail = PostCard & {
  content: string | null
  updated_at: string
  seo_title: string | null
  seo_description: string | null
  og_image_url: string | null
  canonical_url: string | null
  noindex: boolean
  author: (NonNullable<PostCard["author"]> & {
    bio: string | null
    email: string | null
  }) | null
  categories: CategoryRef[]
  tags: TagRef[]
}

export async function getRecentPosts(
  supabase: Supa,
  limit = 3,
): Promise<PostCard[]> {
  const { data, error } = await supabase
    .from("posts")
    .select(POST_CARD_COLUMNS)
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false })
    .limit(limit)

  if (error) throw error
  return await enrichPostsWithCategories(supabase, (data ?? []) as unknown as PostCard[])
}

type PaginatedOpts = {
  page?: number
  pageSize?: number
  categorySlug?: string
  tagSlug?: string
}

export type PaginatedPosts = {
  posts: PostCard[]
  totalCount: number
  totalPages: number
  currentPage: number
  pageSize: number
}

export async function getPostsPaginated(
  supabase: Supa,
  opts: PaginatedOpts = {},
): Promise<PaginatedPosts> {
  const page = Math.max(1, opts.page ?? 1)
  const pageSize = opts.pageSize ?? 12
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let postIds: string[] | null = null

  if (opts.categorySlug) {
    const { data: cat } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", opts.categorySlug)
      .maybeSingle()
    if (!cat) {
      return { posts: [], totalCount: 0, totalPages: 0, currentPage: page, pageSize }
    }
    const { data: rels } = await supabase
      .from("post_categories")
      .select("post_id")
      .eq("category_id", cat.id)
    postIds = (rels ?? []).map((r) => r.post_id)
  }

  if (opts.tagSlug) {
    const { data: tag } = await supabase
      .from("tags")
      .select("id")
      .eq("slug", opts.tagSlug)
      .maybeSingle()
    if (!tag) {
      return { posts: [], totalCount: 0, totalPages: 0, currentPage: page, pageSize }
    }
    const { data: rels } = await supabase
      .from("post_tags")
      .select("post_id")
      .eq("tag_id", tag.id)
    const tagPostIds = (rels ?? []).map((r) => r.post_id)
    postIds = postIds
      ? postIds.filter((id) => tagPostIds.includes(id))
      : tagPostIds
  }

  if (postIds !== null && postIds.length === 0) {
    return { posts: [], totalCount: 0, totalPages: 0, currentPage: page, pageSize }
  }

  let query = supabase
    .from("posts")
    .select(POST_CARD_COLUMNS, { count: "exact" })
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())

  if (postIds !== null) {
    query = query.in("id", postIds)
  }

  const { data, error, count } = await query
    .order("published_at", { ascending: false })
    .range(from, to)

  if (error) throw error

  const posts = await enrichPostsWithCategories(
    supabase,
    (data ?? []) as unknown as PostCard[],
  )
  const totalCount = count ?? 0

  return {
    posts,
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
    currentPage: page,
    pageSize,
  }
}

async function enrichPostsWithCategories(
  supabase: Supa,
  posts: PostCard[],
): Promise<PostCard[]> {
  if (posts.length === 0) return posts
  const ids = posts.map((p) => p.id)
  const { data: rels } = await supabase
    .from("post_categories")
    .select("post_id, categories ( id, slug, name )")
    .in("post_id", ids)

  type Rel = {
    post_id: string
    categories: { id: string; slug: string; name: string } | null
  }

  const byPost = new Map<string, CategoryRef[]>()
  for (const rel of (rels ?? []) as unknown as Rel[]) {
    if (!rel.categories) continue
    const arr = byPost.get(rel.post_id) ?? []
    arr.push(rel.categories)
    byPost.set(rel.post_id, arr)
  }

  return posts.map((p) => ({ ...p, categories: byPost.get(p.id) ?? [] }))
}

export async function getPostByDateAndSlug(
  supabase: Supa,
  year: string,
  month: string,
  day: string,
  slug: string,
): Promise<PostDetail | null> {
  const { data, error } = await supabase
    .from("posts")
    .select(POST_DETAIL_COLUMNS)
    .eq("slug", slug)
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .maybeSingle()

  if (error) throw error
  if (!data || !data.published_at) return null

  const expected = formatInTimeZone(
    new Date(data.published_at),
    "Europe/Rome",
    "yyyy/MM/dd",
  )
  const actual = `${year}/${month}/${day}`
  if (expected !== actual) return null

  const [catRes, tagRes] = await Promise.all([
    supabase
      .from("post_categories")
      .select("categories ( id, slug, name )")
      .eq("post_id", data.id),
    supabase
      .from("post_tags")
      .select("tags ( id, slug, name )")
      .eq("post_id", data.id),
  ])

  type CatRel = { categories: CategoryRef | null }
  type TagRel = { tags: TagRef | null }

  const categories: CategoryRef[] = ((catRes.data ?? []) as unknown as CatRel[])
    .map((r) => r.categories)
    .filter((c): c is CategoryRef => c !== null)

  const tags: TagRef[] = ((tagRes.data ?? []) as unknown as TagRel[])
    .map((r) => r.tags)
    .filter((t): t is TagRef => t !== null)

  return {
    ...(data as unknown as PostDetail),
    categories,
    tags,
  }
}

export async function getRelatedPosts(
  supabase: Supa,
  postId: string,
  limit = 3,
): Promise<PostCard[]> {
  const { data: catRows } = await supabase
    .from("post_categories")
    .select("category_id")
    .eq("post_id", postId)

  const categoryIds = (catRows ?? []).map((r) => r.category_id)
  if (categoryIds.length === 0) {
    const { data } = await supabase
      .from("posts")
      .select(POST_CARD_COLUMNS)
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .neq("id", postId)
      .order("published_at", { ascending: false })
      .limit(limit)
    return await enrichPostsWithCategories(
      supabase,
      (data ?? []) as unknown as PostCard[],
    )
  }

  const { data: relRows } = await supabase
    .from("post_categories")
    .select("post_id")
    .in("category_id", categoryIds)

  const relatedIds = Array.from(
    new Set((relRows ?? []).map((r) => r.post_id)),
  ).filter((id) => id !== postId)

  if (relatedIds.length === 0) return []

  const { data } = await supabase
    .from("posts")
    .select(POST_CARD_COLUMNS)
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .in("id", relatedIds)
    .order("published_at", { ascending: false })
    .limit(limit)

  return await enrichPostsWithCategories(
    supabase,
    (data ?? []) as unknown as PostCard[],
  )
}

export async function getAllPublishedPostSlugs(
  supabase: Supa,
): Promise<{ slug: string; published_at: string }[]> {
  const { data } = await supabase
    .from("posts")
    .select("slug, published_at")
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())

  return ((data ?? []) as { slug: string; published_at: string | null }[])
    .filter((p): p is { slug: string; published_at: string } => !!p.published_at)
}
