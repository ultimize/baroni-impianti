import "server-only"

import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database"

// ⚠️ Service-role client. NEVER import from a Client Component or any module
// that may end up in the browser bundle. Use only in route handlers,
// server actions, or server-side scripts.
export function createAdminClient() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is missing")
  }
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: { autoRefreshToken: false, persistSession: false },
    },
  )
}
