"use client"

import { createClient } from "@/lib/supabase/client"
import type { ServiceFormData } from "../validation/service"
import type { Json } from "@/types/database"

function preparePayload(data: ServiceFormData) {
  return {
    title: data.title.trim(),
    slug: data.slug.trim(),
    short_description: data.short_description?.trim() || null,
    content: data.content || null,
    icon: data.icon?.trim() || null,
    featured_image_url: data.featured_image_url?.trim() || null,
    gallery_images: (data.gallery_images ?? []) as unknown as Json,
    features: (data.features ?? []) as unknown as Json,
    cta_text: data.cta_text?.trim() || null,
    cta_url: data.cta_url?.trim() || null,
    order_index: data.order_index,
    is_featured: data.is_featured,
    is_published: data.is_published,
    seo_title: data.seo_title?.trim() || null,
    seo_description: data.seo_description?.trim() || null,
    og_image_url: data.og_image_url?.trim() || null,
  }
}

export async function createService(data: ServiceFormData) {
  const supabase = createClient()
  const { data: row, error } = await supabase
    .from("services")
    .insert(preparePayload(data))
    .select("id, slug")
    .single()
  if (error) throw error
  return row
}

export async function updateService(id: string, data: ServiceFormData) {
  const supabase = createClient()
  const { error } = await supabase.from("services").update(preparePayload(data)).eq("id", id)
  if (error) throw error
}

export async function deleteService(id: string) {
  const supabase = createClient()
  const { error } = await supabase.from("services").delete().eq("id", id)
  if (error) throw error
}
