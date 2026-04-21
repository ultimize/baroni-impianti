import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database"

/**
 * Cookieless Supabase client for build-time use (generateStaticParams,
 * sitemap generation, and any other place where `cookies()` can't be called).
 * Uses the public anon key; only reads publicly-exposed data.
 */
export function createPublicClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } },
  )
}
