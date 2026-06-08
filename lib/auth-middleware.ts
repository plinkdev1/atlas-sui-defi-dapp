import { type NextRequest, NextResponse } from "next/server"
import { verifyJWT, extractTokenFromHeader } from "./jwt-utils"

export interface AuthenticatedRequest extends NextRequest {
  userId?: string
  walletAddress?: string
  email?: string
  tier?: string
}

// Middleware to verify JWT and attach user info to request
export async function withAuth(request: NextRequest): Promise<{ valid: boolean; userId?: string; error?: string }> {
  const authHeader = request.headers.get("authorization")
  const token = extractTokenFromHeader(authHeader)

  if (!token) {
    return { valid: false, error: "Missing authorization token" }
  }

  const payload = verifyJWT(token)
  if (!payload) {
    return { valid: false, error: "Invalid or expired token" }
  }

  return { valid: true, userId: payload.userId }
}

// Helper to return 401 response
export function unauthorized(message = "Unauthorized") {
  return NextResponse.json({ error: message }, { status: 401 })
}

// Helper to return 400 response
export function badRequest(message = "Bad request") {
  return NextResponse.json({ error: message }, { status: 400 })
}

// Helper to return 500 response
export function serverError(message = "Internal server error") {
  return NextResponse.json({ error: message }, { status: 500 })
}
