import { type NextRequest, NextResponse } from "next/server"

const protectedRoutes = ["/api/wallet/cleanup", "/api/transactions", "/api/infra/ratings"]

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if route is protected
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route))

  if (isProtected) {
    const authHeader = request.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // In production, verify JWT here
    const token = authHeader.substring(7)
    if (!token) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next|public|favicon).*)"],
}
