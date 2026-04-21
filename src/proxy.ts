import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import type { Database } from "@/types/database"

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  let response = NextResponse.next({ request })

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          )
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isAdminRoute = pathname.startsWith("/admin")
  const isLoginRoute = pathname === "/admin/login"

  // Not logged in trying to access protected admin → go to login
  if (isAdminRoute && !isLoginRoute && !user) {
    const url = request.nextUrl.clone()
    url.pathname = "/admin/login"
    url.searchParams.set("redirectTo", pathname)
    return NextResponse.redirect(url)
  }

  // Already logged in hitting login page → go to dashboard
  if (isLoginRoute && user) {
    const url = request.nextUrl.clone()
    url.pathname = "/admin"
    url.search = ""
    return NextResponse.redirect(url)
  }

  // Dynamic DB redirects only on public routes (legacy WP slug preservation).
  if (!isAdminRoute) {
    const { data: redirect } = await supabase
      .from("redirects")
      .select("new_path, status_code")
      .eq("old_path", pathname)
      .eq("is_active", true)
      .maybeSingle()

    if (redirect?.new_path) {
      const url = request.nextUrl.clone()
      url.pathname = redirect.new_path
      const status =
        redirect.status_code === 302 ||
        redirect.status_code === 307 ||
        redirect.status_code === 308
          ? redirect.status_code
          : 301
      return NextResponse.redirect(url, status)
    }
  }

  return response
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|auth/|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)",
  ],
}
