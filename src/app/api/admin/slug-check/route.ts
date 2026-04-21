import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

const ALLOWED_TABLES = ["posts", "pages", "services", "categories", "tags", "authors"] as const
type AllowedTable = (typeof ALLOWED_TABLES)[number]

function isAllowedTable(value: string): value is AllowedTable {
  return (ALLOWED_TABLES as readonly string[]).includes(value)
}

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle()
  if (!profile || (profile.role !== "admin" && profile.role !== "editor")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const url = new URL(request.url)
  const table = url.searchParams.get("table")
  const slug = url.searchParams.get("slug")?.trim().toLowerCase()
  const excludeId = url.searchParams.get("excludeId")

  if (!table || !isAllowedTable(table)) {
    return NextResponse.json({ error: "Invalid table" }, { status: 400 })
  }
  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 })
  }

  let query = supabase.from(table).select("id", { head: false }).eq("slug", slug).limit(1)
  if (excludeId) {
    query = query.neq("id", excludeId)
  }

  const { data, error } = await query
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ available: !data || data.length === 0 })
}
