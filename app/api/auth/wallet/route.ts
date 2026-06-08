import { createServerClient_ } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"
import { verifyPersonalMessageSignature } from "@mysten/sui/verify"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, walletAddress, signature, sessionToken, signedMessage } = body

    if (!action || !walletAddress) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = await createServerClient_()

    // Action 1: Create new wallet session
    if (action === "create_session") {
      // Get or create wallet user
      const { data: user, error: userError } = await supabase
        .from("wallet_users")
        .upsert(
          { wallet_address: walletAddress, last_connected_at: new Date().toISOString() },
          { onConflict: "wallet_address" },
        )
        .select()
        .single()

      if (userError) throw userError

      // Create session for signing
      const sessionId = Math.random().toString(36).substring(2)
      const messageToSign = `Sign this message to verify ownership of wallet ${walletAddress}\n\nSession: ${sessionId}\nTimestamp: ${new Date().toISOString()}`

      const { data: session, error: sessionError } = await supabase
        .from("wallet_sessions")
        .insert({
          wallet_address: walletAddress,
          session_token: sessionId,
          message_to_sign: messageToSign,
          expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        })
        .select()
        .single()

      if (sessionError) throw sessionError

      return NextResponse.json({
        sessionToken: sessionId,
        messageToSign,
      })
    }

    // Action 2: Verify signature and authenticate
    if (action === "verify_signature") {
      if (!signature || !sessionToken) {
        return NextResponse.json({ error: "Signature and sessionToken required" }, { status: 400 })
      }

      // Get the session
      const { data: session, error: sessionError } = await supabase
        .from("wallet_sessions")
        .select("*")
        .eq("session_token", sessionToken)
        .eq("wallet_address", walletAddress)
        .single()

      if (sessionError) throw new Error("Session not found or invalid")

      let isSignatureValid = false
      try {
        // Verify the signature using Sui's verification library
        // verifyPersonalMessageSignature returns a PublicKey on success, throws on failure
        const publicKey = await verifyPersonalMessageSignature(
          signedMessage || session.message_to_sign,
          signature,
        )
        // If we got a public key back, the signature is valid
        isSignatureValid = !!publicKey
      } catch (verifyError) {
        console.error("[v0] Signature verification failed:", verifyError)
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
      }

      if (!isSignatureValid) {
        return NextResponse.json({ error: "Signature verification failed" }, { status: 401 })
      }

      // Mark session as verified
      const { data: verifiedSession, error: verifyError } = await supabase
        .from("wallet_sessions")
        .update({
          signature,
          verified_at: new Date().toISOString(),
        })
        .eq("session_token", sessionToken)
        .select()
        .single()

      if (verifyError) throw verifyError

      // Generate auth token (in production, use proper JWT)
      const authToken = Buffer.from(`${walletAddress}:${sessionToken}`).toString("base64")

      return NextResponse.json({
        verified: true,
        authToken,
        walletAddress,
        expiresAt: session.expires_at,
      })
    }

    // Action 3: Check if wallet already has active session
    if (action === "check_session") {
      const { data: activeSessions } = await supabase
        .from("wallet_sessions")
        .select("*")
        .eq("wallet_address", walletAddress)
        .gt("expires_at", new Date().toISOString())
        .not("verified_at", "is", null)
        .order("verified_at", { ascending: false })
        .limit(1)

      if (activeSessions && activeSessions.length > 0) {
        const session = activeSessions[0]
        const authToken = Buffer.from(`${walletAddress}:${session.session_token}`).toString("base64")

        return NextResponse.json({
          hasActiveSession: true,
          authToken,
          walletAddress,
          expiresAt: session.expires_at,
        })
      }

      return NextResponse.json({
        hasActiveSession: false,
      })
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Authentication failed"
    console.error("[v0] Wallet auth error:", error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
