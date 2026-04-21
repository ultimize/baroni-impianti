import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database, Json } from "@/types/database"

type Supa = SupabaseClient<Database>

export type PublicSettings = Record<string, Json | null>

export async function getPublicSettings(supabase: Supa): Promise<PublicSettings> {
  const { data, error } = await supabase
    .from("site_settings")
    .select("key, value")
    .eq("is_public", true)

  if (error) throw error
  const map: PublicSettings = {}
  for (const row of data ?? []) {
    map[row.key] = row.value
  }
  return map
}
