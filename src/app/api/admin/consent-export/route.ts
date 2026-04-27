import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"

async function ensureAdmin() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { ok: false as const, status: 401 }
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle()
  if (!profile || (profile.role !== "admin" && profile.role !== "editor")) {
    return { ok: false as const, status: 403 }
  }
  return { ok: true as const }
}

function csvCell(value: string | number | boolean | null | undefined): string {
  if (value === null || value === undefined) return ""
  const str = String(value)
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

export async function GET() {
  const auth = await ensureAdmin()
  if (!auth.ok) {
    return NextResponse.json({ error: "unauthorized" }, { status: auth.status })
  }

  const admin = createAdminClient()
  const { data, error } = await admin
    .from("consent_logs")
    .select(
      "id, consent_id, action, necessary, analytics, marketing, policy_version, page_url, ip_hash, user_agent, created_at",
    )
    .order("created_at", { ascending: false })
    .limit(50000)

  if (error) {
    return NextResponse.json({ error: "query_failed" }, { status: 500 })
  }

  const header = [
    "id",
    "consent_id",
    "action",
    "necessary",
    "analytics",
    "marketing",
    "policy_version",
    "page_url",
    "ip_hash",
    "user_agent",
    "created_at",
  ]
  const rows = (data ?? []).map((row) =>
    [
      row.id,
      row.consent_id,
      row.action,
      row.necessary,
      row.analytics,
      row.marketing,
      row.policy_version,
      row.page_url,
      row.ip_hash,
      row.user_agent,
      row.created_at,
    ]
      .map(csvCell)
      .join(","),
  )
  const csv = [header.join(","), ...rows].join("\r\n")

  const filename = `consent-logs-${new Date().toISOString().slice(0, 10)}.csv`
  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  })
}
