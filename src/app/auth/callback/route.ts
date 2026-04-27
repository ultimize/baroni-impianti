import { createClient } from "@/lib/supabase/server"
import { NextResponse, type NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const redirectTo = searchParams.get("redirectTo") ?? "/admin"

  console.log("[auth/callback] hit", {
    hasCode: !!code,
    redirectTo,
    allParams: Object.fromEntries(searchParams.entries()),
  })

  if (!code) {
    console.warn("[auth/callback] missing code param")
    return NextResponse.redirect(
      `${origin}/admin/login?error=auth_failed&reason=missing_code`,
    )
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    console.error("[auth/callback] exchangeCodeForSession failed", {
      message: error.message,
      status: error.status,
      name: error.name,
    })
    const url = new URL(`${origin}/admin/login`)
    url.searchParams.set("error", "auth_failed")
    url.searchParams.set("reason", error.message)
    return NextResponse.redirect(url)
  }

  console.log("[auth/callback] exchange ok, redirecting to", redirectTo)
  return NextResponse.redirect(`${origin}${redirectTo}`)
}
