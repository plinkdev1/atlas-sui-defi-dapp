import crypto from "crypto"

const JWT_SECRET = process.env.SUPABASE_JWT_SECRET || "your-super-secret-jwt-key-change-in-production"
const JWT_EXPIRY = 24 * 60 * 60 // 24 hours in seconds

interface JWTPayload {
  userId: string
  walletAddress?: string
  email?: string
  tier?: string
  iat?: number
  exp?: number
}

// Sign a JWT token
export function signJWT(payload: JWTPayload): string {
  const now = Math.floor(Date.now() / 1000)
  const token_payload = {
    ...payload,
    iat: now,
    exp: now + JWT_EXPIRY,
  }

  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url")
  const body = Buffer.from(JSON.stringify(token_payload)).toString("base64url")
  const signature = crypto.createHmac("sha256", JWT_SECRET).update(`${header}.${body}`).digest("base64url")

  return `${header}.${body}.${signature}`
}

// Verify and decode JWT token
export function verifyJWT(token: string): JWTPayload | null {
  try {
    const parts = token.split(".")
    if (parts.length !== 3) return null

    const [header, body, signature] = parts
    const expectedSignature = crypto.createHmac("sha256", JWT_SECRET).update(`${header}.${body}`).digest("base64url")

    if (signature !== expectedSignature) return null

    const payload = JSON.parse(Buffer.from(body, "base64url").toString())

    // Check expiry
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null
    }

    return payload
  } catch (error) {
    console.error("[v0] JWT verification error:", error)
    return null
  }
}

// Extract JWT from Authorization header
export function extractTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null
  }
  return authHeader.substring(7)
}
