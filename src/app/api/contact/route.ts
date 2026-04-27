import { NextResponse, type NextRequest } from "next/server"
import { z } from "zod"

import { sendContactNotification } from "@/lib/email/resend"
import { createAdminClient } from "@/lib/supabase/admin"

const contactSchema = z.object({
  full_name: z.string().trim().min(2).max(120),
  email: z.string().trim().toLowerCase().email().max(254),
  phone: z.string().trim().max(40).optional().or(z.literal("")).transform((v) => (v ? v : null)),
  subject: z.string().trim().max(60).optional().or(z.literal("")).transform((v) => (v ? v : null)),
  message: z.string().trim().min(10).max(5000),
  privacy_ok: z.literal(true),
  service_interest: z.string().trim().max(80).optional().or(z.literal("")).transform((v) => (v ? v : null)),
  source_page: z.string().trim().max(2048).optional().or(z.literal("")).transform((v) => (v ? v : null)),
  hp: z.string().max(0).optional(),
})

const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 60_000
const rateBuckets = new Map<string, { count: number; resetAt: number }>()

function rateLimited(ipKey: string): boolean {
  const now = Date.now()
  const bucket = rateBuckets.get(ipKey)
  if (!bucket || bucket.resetAt < now) {
    rateBuckets.set(ipKey, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    if (rateBuckets.size > 5000) {
      for (const [key, value] of rateBuckets) {
        if (value.resetAt < now) rateBuckets.delete(key)
      }
    }
    return false
  }
  bucket.count += 1
  return bucket.count > RATE_LIMIT_MAX
}

function extractIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for")
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim()
    if (first) return first
  }
  const realIp = request.headers.get("x-real-ip")
  if (realIp) return realIp.trim()
  return "unknown"
}

export async function POST(request: NextRequest) {
  const ip = extractIp(request)
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429 },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    )
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation_failed" },
      { status: 400 },
    )
  }

  const data = parsed.data
  const userAgent = request.headers.get("user-agent")?.slice(0, 500) ?? null
  const referrer = request.headers.get("referer")?.slice(0, 2048) ?? null

  let insertedId: string | null = null
  try {
    const supabase = createAdminClient()
    const { data: inserted, error } = await supabase
      .from("contact_submissions")
      .insert({
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        service_interest: data.service_interest,
        source_page: data.source_page,
        ip_address: ip === "unknown" ? null : ip,
        user_agent: userAgent,
        referrer,
        status: "new",
      })
      .select("id")
      .single()
    if (error) {
      console.error("[contact] insert failed", error)
      return NextResponse.json(
        { ok: false, error: "save_failed" },
        { status: 500 },
      )
    }
    insertedId = inserted?.id ?? null
  } catch (error) {
    console.error("[contact] insert threw", error)
    return NextResponse.json(
      { ok: false, error: "save_failed" },
      { status: 500 },
    )
  }

  try {
    await sendContactNotification({
      id: insertedId,
      name: data.full_name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
      sourcePage: data.source_page,
    })
  } catch (error) {
    console.error("[contact] email notification threw", error)
  }

  return NextResponse.json({ ok: true }, { status: 201 })
}
