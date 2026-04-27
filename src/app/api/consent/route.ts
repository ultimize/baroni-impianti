import { NextResponse, type NextRequest } from "next/server"
import { createHash } from "node:crypto"
import { z } from "zod"

import { createAdminClient } from "@/lib/supabase/admin"

const consentSchema = z.object({
  consent_id: z.string().uuid(),
  necessary: z.boolean(),
  analytics: z.boolean(),
  marketing: z.boolean(),
  policy_version: z.string().min(1).max(20),
  action: z.enum(["accept_all", "reject_all", "custom", "revoke", "update"]),
  page_url: z.string().max(2048).optional().nullable(),
})

const RATE_LIMIT_MAX = 10
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

function hashIp(ip: string): string | null {
  const salt = process.env.CONSENT_IP_SALT
  if (!salt) return null
  return createHash("sha256").update(`${ip}${salt}`).digest("hex")
}

export async function POST(request: NextRequest) {
  const ip = extractIp(request)
  if (rateLimited(ip)) {
    return new NextResponse(null, { status: 429 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return new NextResponse(null, { status: 400 })
  }

  const parsed = consentSchema.safeParse(body)
  if (!parsed.success) {
    return new NextResponse(null, { status: 400 })
  }

  const userAgent = request.headers.get("user-agent")?.slice(0, 500) ?? null
  const ipHash = hashIp(ip)

  try {
    const supabase = createAdminClient()
    const { error } = await supabase.from("consent_logs").insert({
      consent_id: parsed.data.consent_id,
      necessary: parsed.data.necessary,
      analytics: parsed.data.analytics,
      marketing: parsed.data.marketing,
      policy_version: parsed.data.policy_version,
      action: parsed.data.action,
      page_url: parsed.data.page_url ?? null,
      user_agent: userAgent,
      ip_hash: ipHash,
    })
    if (error) {
      return new NextResponse(null, { status: 500 })
    }
  } catch {
    return new NextResponse(null, { status: 500 })
  }

  return new NextResponse(null, { status: 204 })
}
