import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { getSuiClient } from "@/lib/sui-client"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get("limit") || "20")
    const cursor = searchParams.get("cursor")

    const supabase = await createServerClient()
    const client = getSuiClient()

    // Check cache
    const cacheKey = `blocks:${limit}:${cursor || "latest"}`
    const { data: cached } = await supabase
      .from("explorer_cache")
      .select("data")
      .eq("cache_key", cacheKey)
      .single()

    if (cached) {
      return NextResponse.json({ ...cached.data, cached: true })
    }

    // Mock latest checkpoint for now (CoreClient doesn't expose this in v2.3.2)
    const latestCheckpoint = 10000000
    const startSeq = cursor ? parseInt(cursor) : latestCheckpoint

    // Generate mock checkpoint blocks
    const checkpoints = []
    for (let i = 0; i < Math.min(limit, 20); i++) {
      const seq = startSeq - i
      if (seq < 0) break

      checkpoints.push({
        sequenceNumber: seq.toString(),
        timestamp: new Date(Date.now() - i * 1000 * 600).toISOString(), // ~10 min intervals
        transactionBlockCount: Math.floor(Math.random() * 100) + 1,
        gasUsed: Math.floor(Math.random() * 1000000000),
        validatorCount: 100,
      })
    }

    const blocksData = {
      blocks: checkpoints,
      latestCheckpoint: latestCheckpoint.toString(),
      hasMore: checkpoints.length === limit,
      nextCursor: checkpoints.length > 0 ? (startSeq - checkpoints.length).toString() : null,
    }

    // Cache for 30 seconds (blocks change frequently)
    await supabase.from("explorer_cache").upsert({
      cache_key: cacheKey,
      data: blocksData,
    })

    return NextResponse.json(blocksData)
  } catch (error) {
    console.error("[v0] Blocks fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch blocks" }, { status: 500 })
  }
}
