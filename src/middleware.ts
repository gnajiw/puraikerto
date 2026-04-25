import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const protectedPaths = ["/admin", "/berita/edit"]
const authPaths = ["/auth"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Redirect unauthenticated users away from protected paths
  if (!user && protectedPaths.some((p) => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL("/auth", request.url))
  }

  // Redirect authenticated users away from auth pages
  if (user && authPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/auth", "/admin/:path*", "/berita/edit/:path*"],
}
