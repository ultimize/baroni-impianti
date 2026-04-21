import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "../../src/types/database.js"

let cached: SupabaseClient<Database> | null = null

export function getSupabaseAdmin(): SupabaseClient<Database> {
  if (cached) return cached
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url) throw new Error("NEXT_PUBLIC_SUPABASE_URL mancante in .env.local")
  if (!serviceRole) throw new Error("SUPABASE_SERVICE_ROLE_KEY mancante in .env.local")
  cached = createClient<Database>(url, serviceRole, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
  return cached
}

export const STORAGE_BUCKET = "post-images"
