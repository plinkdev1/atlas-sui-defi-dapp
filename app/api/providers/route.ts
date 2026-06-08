import { createServerClient_ } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient_()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: providers, error } = await supabase
      .from("providers")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false })

    if (error) throw error

    return NextResponse.json(providers || [])
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch providers"
    console.error("[v0] Providers GET error:", error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, pricing, features, website, logo, category } = body

    if (!name || !description) {
      return NextResponse.json({ error: "Name and description are required" }, { status: 400 })
    }

    const supabase = await createServerClient_()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: provider, error } = await supabase
      .from("providers")
      .insert({
        user_id: user.id,
        name,
        description,
        pricing: pricing || {},
        features: features || [],
        website,
        logo,
        category,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(provider, { status: 201 })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create provider"
    console.error("[v0] Providers POST error:", error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
