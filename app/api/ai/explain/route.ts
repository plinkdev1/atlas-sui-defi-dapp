import { NextResponse } from "next/server"
import { explainTransaction } from "@/lib/ai-explain-utils"
import { getSuiClient } from "@/lib/sui-utils"

export async function POST(request: Request) {
  try {
    const { digest, isPro } = await request.json()

    if (!digest) {
      return NextResponse.json({ error: "Transaction digest required" }, { status: 400 })
    }

    const client = getSuiClient()
    const explanation = await explainTransaction(digest, client, isPro)

    // Award Airpoints for explanation (5 points)
    try {
      await fetch("/api/airpoints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add",
          walletAddress: request.headers.get("x-wallet-address"),
          amount: 5,
          type: "earn_explainer",
          description: `Got AI explanation for ${digest.slice(0, 8)}...`,
        }),
      }).catch(() => {})
    } catch (error) {
      console.error("[v0] Error awarding Airpoints:", error)
    }

    return NextResponse.json({
      explanation,
      airpointsAwarded: 5,
    })
  } catch (error) {
    console.error("[v0] Error explaining transaction:", error)
    return NextResponse.json(
      { error: "Failed to explain transaction" },
      { status: 500 },
    )
  }
}
