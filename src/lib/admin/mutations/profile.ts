"use client"

import { createClient } from "@/lib/supabase/client"
import type { ProfileFormData } from "../validation/profile"

export async function updateOwnProfile(userId: string, data: ProfileFormData) {
  const supabase = createClient()
  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: data.full_name.trim(),
      avatar_url: data.avatar_url?.trim() || null,
    })
    .eq("id", userId)
  if (error) throw error
}
