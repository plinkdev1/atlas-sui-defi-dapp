import { type NextRequest, NextResponse } from "next/server"

const BLOCKBERRY_BASE_URL = "https://api.blockberry.one/sui/v1"
const API_KEY = process.env.BLOCKBERRY_API_KEY

const mockSecurityData = {
  address: "",
  isScam: false,
  risk: "safe" as const,
  securityMessage: "Unable to verify security. Assuming safe (fallback mode).",
  confidence: 0,
  flags: [],
}

const mockNFTMetadata = {
  name: "Unknown NFT",
  description: "Metadata unavailable",
  collection: {
    name: "Unknown Collection",
    creator: "Unknown",
    verified: false,
  },
}

const mockCoinMetadata = {
  symbol: "UNKNOWN",
  name: "Unknown Token",
  decimals: 9,
}

type RequestType = "nft-security" | "coin-security" | "tx-security" | "nft-metadata" | "coin-metadata"

export async function POST(req: NextRequest) {
  try {
    const { type, address, network = "mainnet" } = await req.json()

    if (!API_KEY) {
      console.warn("[v0] Blockberry API key missing. Using mock data for:", type)
      return NextResponse.json({
        ...mockSecurityData,
        address,
      })
    }

    let endpoint = ""
    switch (type as RequestType) {
      case "nft-security":
        endpoint = `${BLOCKBERRY_BASE_URL}/${network}/nft/${address}/security`
        break
      case "coin-security":
        endpoint = `${BLOCKBERRY_BASE_URL}/${network}/coin/${encodeURIComponent(address)}/security`
        break
      case "tx-security":
        endpoint = `${BLOCKBERRY_BASE_URL}/${network}/transaction/${address}/security`
        break
      case "nft-metadata":
        endpoint = `${BLOCKBERRY_BASE_URL}/${network}/nft/${address}/metadata`
        break
      case "coin-metadata":
        endpoint = `${BLOCKBERRY_BASE_URL}/${network}/coin/${encodeURIComponent(address)}/metadata`
        break
      default:
        return NextResponse.json({ error: "Invalid request type" }, { status: 400 })
    }

    const response = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
    })

    if (!response.ok) {
      console.warn("[v0] Blockberry API request failed. Status:", response.status, "Using mock data.")
      return NextResponse.json({
        ...mockSecurityData,
        address,
      })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.warn("[v0] Blockberry API error:", message, "Using mock data.")
    return NextResponse.json({
      ...mockSecurityData,
      address: "",
    })
  }
}
