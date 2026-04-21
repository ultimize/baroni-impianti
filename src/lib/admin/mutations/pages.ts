"use client"

import { createClient } from "@/lib/supabase/client"
import type { PageFormData } from "../validation/page"

function preparePayload(data: PageFormData) {
  return {
    title: data.title.trim(),
    slug: data.slug.trim(),
    content: data.content || null,
    template: data.template,
    is_published: data.is_published,
    seo_title: data.seo_title?.trim() || null,
    seo_description: data.seo_description?.trim() || null,
    og_image_url: data.og_image_url?.trim() || null,
    noindex: data.noindex,
  }
}

export async function createPage(data: PageFormData) {
  const supabase = createClient()
  const { data: row, error } = await supabase
    .from("pages")
    .insert(preparePayload(data))
    .select("id, slug")
    .single()
  if (error) throw error
  return row
}

export async function updatePage(id: string, data: PageFormData, allowSlugUpdate: boolean) {
  const supabase = createClient()
  const payload = preparePayload(data)
  const finalPayload = allowSlugUpdate ? payload : (() => {
    // Keep slug untouched for system pages.
    const { slug: _slug, ...rest } = payload
    void _slug
    return rest
  })()
  const { error } = await supabase.from("pages").update(finalPayload).eq("id", id)
  if (error) throw error
}

export async function deletePage(id: string) {
  const supabase = createClient()
  const { error } = await supabase.from("pages").delete().eq("id", id)
  if (error) throw error
}
