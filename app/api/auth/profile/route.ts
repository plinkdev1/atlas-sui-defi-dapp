import { createServerClient_ } from "@/lib/supabase/server"
import { withAuth, unauthorized } from "@/lib/auth-middleware"
import { type NextRequest, NextResponse } from "next/server"

// GET user profile details
export async function GET(request: NextRequest) {
  try {
    const authResult = await withAuth(request)
    if (!authResult.valid) {
      return unauthorized(authResult.error)
    }

    const supabase = await createServerClient_()

    // Get wallet user
    const { data: walletUser, error: walletError } = await supabase
      .from("wallet_users")
      .select("*")
      .eq("id", authResult.userId)
      .single()

    if (walletError || !walletUser) {
      return unauthorized("User not found")
    }

    // Get full profile
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("wallet_address", walletUser.wallet_address)
      .single()

    // Get API keys count
    const { data: apiKeys, error: keysError } = await supabase
      .from("api_keys")
      .select("id")
      .eq("user_id", authResult.userId)

    // Get entitlements
    const { data: entitlements } = await supabase
      .from("entitlements")
      .select("*")
      .eq("user_id", walletUser.wallet_address)
      .eq("status", "active")

    return NextResponse.json({
      id: walletUser.id,
      walletAddress: walletUser.wallet_address,
      email: walletUser.metadata?.email,
      isAdmin: profile?.is_admin || false,
      theme: profile?.theme || "light",
      network: profile?.network || "testnet",
      preferredExplorer: profile?.preferred_explorer,
      analyticsOptOut: profile?.analytics_opt_out || false,
      walletName: profile?.wallet_name,
      apiKeysCount: apiKeys?.length || 0,
      activeEntitlements: entitlements?.length || 0,
      createdAt: walletUser.created_at,
      updatedAt: profile?.updated_at,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to get profile"
    console.error("[v0] Get profile error:", error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// PUT update profile details
export async function PUT(request: NextRequest) {
  try {
    const authResult = await withAuth(request)
    if (!authResult.valid) {
      return unauthorized(authResult.error)
    }

    const body = await request.json()
    const { theme, network, preferredExplorer, analyticsOptOut, walletName } = body

    const supabase = await createServerClient_()

    // Get wallet user
    const { data: walletUser, error: walletError } = await supabase
      .from("wallet_users")
      .select("*")
      .eq("id", authResult.userId)
      .single()

    if (walletError || !walletUser) {
      return unauthorized("User not found")
    }

    // Update profile
    const { data: updatedProfile, error: updateError } = await supabase
      .from("user_profiles")
      .update({
        theme: theme || undefined,
        network: network || undefined,
        preferred_explorer: preferredExplorer || undefined,
        analytics_opt_out: analyticsOptOut !== undefined ? analyticsOptOut : undefined,
        wallet_name: walletName || undefined,
        updated_at: new Date().toISOString(),
      })
      .eq("wallet_address", walletUser.wallet_address)
      .select()
      .single()

    if (updateError) throw updateError

    return NextResponse.json({
      success: true,
      theme: updatedProfile.theme,
      network: updatedProfile.network,
      preferredExplorer: updatedProfile.preferred_explorer,
      analyticsOptOut: updatedProfile.analytics_opt_out,
      walletName: updatedProfile.wallet_name,
      updatedAt: updatedProfile.updated_at,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update profile"
    console.error("[v0] Update profile error:", error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
