import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const identifier = searchParams.get("id")

    if (!identifier) {
      return NextResponse.json({ hasAccepted: false })
    }

    const supabase = await createServerClient()

    // Check if user has accepted the risk disclaimer
    const { data, error } = await supabase
      .from("risk_disclaimers")
      .select("accepted")
      .eq("user_identifier", identifier)
      .order("created_at", { ascending: false })
      .limit(1)

    if (error && error.code !== "PGRST116") {
      // PGRST116 = no rows returned, which is expected if not accepted
      console.error("Error checking disclaimer:", error)
    }

    return NextResponse.json({
      hasAccepted: data && Array.isArray(data) && data.length > 0 && data[0]?.accepted === true,
    })
  } catch (error) {
    console.error("Disclaimer check error:", error)
    return NextResponse.json({ hasAccepted: false })
  }
}
