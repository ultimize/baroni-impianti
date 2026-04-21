"use client"

import { createClient } from "@/lib/supabase/client"
import type { AuthorFormData } from "../validation/author"

function preparePayload(data: AuthorFormData) {
  return {
    name: data.name.trim(),
    slug: data.slug.trim(),
    bio: data.bio?.trim() || null,
    avatar_url: data.avatar_url?.trim() || null,
    email: data.email?.trim() || null,
  }
}

export async function updateAuthor(id: string, data: AuthorFormData) {
  const supabase = createClient()
  const { error } = await supabase.from("authors").update(preparePayload(data)).eq("id", id)
  if (error) throw error
}
