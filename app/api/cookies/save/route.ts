import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { identifier, accepted } = body

    if (!identifier) {
      return NextResponse.json({ success: false, error: "Missing identifier" }, { status: 400 })
    }

    const supabase = await createServerClient()

    const { error } = await supabase.from("cookie_consents").upsert(
      {
        user_identifier: identifier,
        consent_given: accepted,
        created_at: new Date().toISOString(),
      },
      {
        onConflict: "user_identifier",
      },
    )

    if (error) {
      console.error("Error saving cookie consent:", error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Cookie save error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
