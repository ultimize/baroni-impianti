"use client"

import { createClient } from "@/lib/supabase/client"
import type { PostFormData } from "../validation/post"
import { calculateReadingTime } from "../utils/reading-time"

function normalizeUrl(value: string | null | undefined): string | null {
  if (!value) return null
  const trimmed = value.trim()
  return trimmed === "" ? null : trimmed
}

function preparePayload(data: PostFormData) {
  return {
    title: data.title.trim(),
    slug: data.slug.trim(),
    excerpt: normalizeUrl(data.excerpt) ?? null,
    content: data.content,
    featured_image_url: normalizeUrl(data.featured_image_url),
    featured_image_alt: normalizeUrl(data.featured_image_alt),
    author_id: data.author_id,
    status: data.status,
    published_at: data.published_at ?? null,
    reading_time_minutes: data.reading_time_minutes ?? calculateReadingTime(data.content),
    seo_title: normalizeUrl(data.seo_title),
    seo_description: normalizeUrl(data.seo_description),
    og_image_url: normalizeUrl(data.og_image_url),
    canonical_url: normalizeUrl(data.canonical_url),
    noindex: data.noindex,
  }
}

export async function createPost(data: PostFormData) {
  const supabase = createClient()
  const payload = preparePayload(data)

  const { data: post, error } = await supabase
    .from("posts")
    .insert(payload)
    .select("id, slug")
    .single()

  if (error) throw error

  if (data.category_ids.length > 0) {
    const { error: catErr } = await supabase
      .from("post_categories")
      .insert(data.category_ids.map((category_id) => ({ post_id: post.id, category_id })))
    if (catErr) throw catErr
  }
  if (data.tag_ids.length > 0) {
    const { error: tagErr } = await supabase
      .from("post_tags")
      .insert(data.tag_ids.map((tag_id) => ({ post_id: post.id, tag_id })))
    if (tagErr) throw tagErr
  }

  return post
}

export async function updatePost(id: string, data: PostFormData) {
  const supabase = createClient()
  const payload = preparePayload(data)

  const { error } = await supabase.from("posts").update(payload).eq("id", id)
  if (error) throw error

  // Replace category relations.
  await supabase.from("post_categories").delete().eq("post_id", id)
  if (data.category_ids.length > 0) {
    const { error: catErr } = await supabase
      .from("post_categories")
      .insert(data.category_ids.map((category_id) => ({ post_id: id, category_id })))
    if (catErr) throw catErr
  }

  // Replace tag relations.
  await supabase.from("post_tags").delete().eq("post_id", id)
  if (data.tag_ids.length > 0) {
    const { error: tagErr } = await supabase
      .from("post_tags")
      .insert(data.tag_ids.map((tag_id) => ({ post_id: id, tag_id })))
    if (tagErr) throw tagErr
  }
}

export async function deletePost(id: string) {
  const supabase = createClient()
  const { error } = await supabase.from("posts").delete().eq("id", id)
  if (error) throw error
}

export async function bulkDeletePosts(ids: string[]) {
  if (ids.length === 0) return
  const supabase = createClient()
  const { error } = await supabase.from("posts").delete().in("id", ids)
  if (error) throw error
}

export async function bulkUpdatePostStatus(
  ids: string[],
  status: "draft" | "scheduled" | "published" | "archived",
) {
  if (ids.length === 0) return
  const supabase = createClient()
  const { error } = await supabase.from("posts").update({ status }).in("id", ids)
  if (error) throw error
}

export async function duplicatePost(id: string) {
  const supabase = createClient()
  const { data: original, error } = await supabase.from("posts").select("*").eq("id", id).single()
  if (error) throw error

  const baseSlug = `${original.slug}-copia`
  let candidate = baseSlug
  let suffix = 1
  while (true) {
    const { data: existing } = await supabase
      .from("posts")
      .select("id")
      .eq("slug", candidate)
      .maybeSingle()
    if (!existing) break
    suffix += 1
    candidate = `${baseSlug}-${suffix}`
  }

  const { data: copy, error: insertErr } = await supabase
    .from("posts")
    .insert({
      title: `${original.title} (copia)`,
      slug: candidate,
      excerpt: original.excerpt,
      content: original.content,
      featured_image_url: original.featured_image_url,
      featured_image_alt: original.featured_image_alt,
      author_id: original.author_id,
      status: "draft",
      published_at: null,
      reading_time_minutes: original.reading_time_minutes,
      seo_title: original.seo_title,
      seo_description: original.seo_description,
      og_image_url: original.og_image_url,
      canonical_url: null,
      noindex: original.noindex,
    })
    .select("id, slug")
    .single()
  if (insertErr) throw insertErr

  // Copy taxonomy relations.
  const { data: cats } = await supabase
    .from("post_categories")
    .select("category_id")
    .eq("post_id", id)
  if (cats && cats.length > 0) {
    await supabase
      .from("post_categories")
      .insert(cats.map((c) => ({ post_id: copy.id, category_id: c.category_id })))
  }
  const { data: tags } = await supabase.from("post_tags").select("tag_id").eq("post_id", id)
  if (tags && tags.length > 0) {
    await supabase.from("post_tags").insert(tags.map((t) => ({ post_id: copy.id, tag_id: t.tag_id })))
  }

  return copy
}
