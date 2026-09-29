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
  const isPublicAuthRoute =
    isLoginRoute ||
    pathname === "/admin/login/forgot" ||
    pathname === "/admin/login/reset-password"

  // Not logged in trying to access protected admin → go to login
  if (isAdminRoute && !isPublicAuthRoute && !user) {
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

  return response
}

/**
 * Il proxy serve solo all'area admin: sessione Supabase e protezione delle
 * route. Prima girava su TUTTE le pagine pubbliche e per ogni visita faceva
 * una verifica di sessione piu' una query sulla tabella redirects: CPU pagata
 * su ogni pagina vista, bot compresi. I redirect legacy ora sono gestiti nel
 * catch-all `(public)/[...path]`, solo quando un URL starebbe per dare 404.
 */
export const config = {
  matcher: ["/admin/:path*"],
}
