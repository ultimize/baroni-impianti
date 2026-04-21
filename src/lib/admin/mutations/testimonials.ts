"use client"

import { createClient } from "@/lib/supabase/client"
import type { TestimonialFormData } from "../validation/testimonial"
import { extractYoutubeId } from "../utils/extract-youtube-id"

function preparePayload(data: TestimonialFormData) {
  const youtube_url = data.youtube_url?.trim() || null
  return {
    client_name: data.client_name.trim(),
    project_title: data.project_title?.trim() || null,
    description: data.description?.trim() || null,
    location: data.location?.trim() || null,
    youtube_url,
    youtube_video_id: extractYoutubeId(youtube_url),
    thumbnail_url: data.thumbnail_url?.trim() || null,
    order_index: data.order_index,
    is_featured: data.is_featured,
    is_published: data.is_published,
  }
}

export async function createTestimonial(data: TestimonialFormData) {
  const supabase = createClient()
  const { data: row, error } = await supabase
    .from("testimonials")
    .insert(preparePayload(data))
    .select("id")
    .single()
  if (error) throw error
  return row
}

export async function updateTestimonial(id: string, data: TestimonialFormData) {
  const supabase = createClient()
  const { error } = await supabase.from("testimonials").update(preparePayload(data)).eq("id", id)
  if (error) throw error
}

export async function deleteTestimonial(id: string) {
  const supabase = createClient()
  const { error } = await supabase.from("testimonials").delete().eq("id", id)
  if (error) throw error
}

export async function bulkDeleteTestimonials(ids: string[]) {
  if (ids.length === 0) return
  const supabase = createClient()
  const { error } = await supabase.from("testimonials").delete().in("id", ids)
  if (error) throw error
}
