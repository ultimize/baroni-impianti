"use client"

import { createClient } from "@/lib/supabase/client"
import type { Json } from "@/types/database"

export type SettingUpdate = {
  key: string
  value: Json | null
}

export async function batchUpdateSettings(updates: SettingUpdate[]) {
  if (updates.length === 0) return
  const supabase = createClient()

  const results = await Promise.all(
    updates.map((u) =>
      supabase
        .from("site_settings")
        .update({ value: u.value })
        .eq("key", u.key),
    ),
  )

  const firstError = results.find((r) => r.error)?.error
  if (firstError) throw firstError
}
