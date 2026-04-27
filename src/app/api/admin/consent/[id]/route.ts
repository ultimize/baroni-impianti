import { NextResponse, type NextRequest } from "next/server"
import { z } from "zod"
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

const idSchema = z.string().uuid()

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await ensureAdmin()
  if (!auth.ok) {
    return NextResponse.json({ error: "unauthorized" }, { status: auth.status })
  }

  const { id } = await params
  const parsed = idSchema.safeParse(id)
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_id" }, { status: 400 })
  }

  const admin = createAdminClient()
  const { error } = await admin.from("consent_logs").delete().eq("id", parsed.data)
  if (error) {
    return NextResponse.json({ error: "delete_failed" }, { status: 500 })
  }

  return new NextResponse(null, { status: 204 })
}
