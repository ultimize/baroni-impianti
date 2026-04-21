"use client"

import { createClient } from "@/lib/supabase/client"
import type { RedirectFormData } from "../validation/redirect"

function preparePayload(data: RedirectFormData) {
  return {
    old_path: data.old_path.trim(),
    new_path: data.new_path.trim(),
    status_code: data.status_code,
    is_active: data.is_active,
    notes: data.notes?.trim() || null,
  }
}

export async function createRedirect(data: RedirectFormData) {
  const supabase = createClient()
  const { data: row, error } = await supabase
    .from("redirects")
    .insert(preparePayload(data))
    .select("id")
    .single()
  if (error) throw error
  return row
}

export async function updateRedirect(id: string, data: RedirectFormData) {
  const supabase = createClient()
  const { error } = await supabase.from("redirects").update(preparePayload(data)).eq("id", id)
  if (error) throw error
}

export async function deleteRedirect(id: string) {
  const supabase = createClient()
  const { error } = await supabase.from("redirects").delete().eq("id", id)
  if (error) throw error
}

export async function toggleRedirectActive(id: string, isActive: boolean) {
  const supabase = createClient()
  const { error } = await supabase.from("redirects").update({ is_active: isActive }).eq("id", id)
  if (error) throw error
}
