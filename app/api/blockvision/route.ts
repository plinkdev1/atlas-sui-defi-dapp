import { type NextRequest, NextResponse } from "next/server"

const BLOCKVISION_BASE_URL = "https://api.blockvision.org/v2/sui"
const API_KEY = process.env.BLOCKVISION_API_KEY

const mockNFTsData = {
  nfts: [
    {
      objectId: "0xmock1",
      name: "Mock NFT",
      description: "Placeholder NFT (API unavailable)",
      imageUrl: "/digital-art-collection.png",
      collection: { name: "Mock Collection", floorPrice: 0 },
    },
  ],
}

const mockCoinsData = {
  coins: [
    {
      coinType: "0x2::sui::SUI",
      symbol: "SUI",
      balance: "1000000000",
      decimals: 9,
      usdValue: 0,
    },
  ],
}

const mockTransactionData = {
  digest: "0xmock",
  sender: "0xmock",
  timestamp: Date.now(),
  status: "success",
  gasUsed: "0",
  effects: [{ type: "TransferObjects", description: "Mock transaction" }],
}

const mockCollectionData = {
  collectionId: "0xmock",
  name: "Mock Collection",
  description: "Collection data unavailable",
  floorPrice: 0,
  totalVolume: 0,
  holderCount: 0,
  itemCount: 0,
  verified: false,
}

const mockCoinMarketData = {
  coinType: "0x2::sui::SUI",
  price: 0,
  priceChange24h: 0,
  volume24h: 0,
  marketCap: 0,
  holders: 0,
}

type RequestType = "account-nfts" | "account-coins" | "collection-details" | "transaction-details" | "coin-market"

export async function POST(req: NextRequest) {
  try {
    const { type, address, network = "mainnet", limit = 20 } = await req.json()

    if (!API_KEY) {
      console.warn("[v0] Blockvision API key missing. Using mock data for:", type)
      switch (type) {
        case "account-nfts":
          return NextResponse.json(mockNFTsData)
        case "account-coins":
          return NextResponse.json(mockCoinsData)
        case "collection-details":
          return NextResponse.json(mockCollectionData)
        case "transaction-details":
          return NextResponse.json(mockTransactionData)
        case "coin-market":
          return NextResponse.json(mockCoinMarketData)
        default:
          return NextResponse.json({})
      }
    }

    let endpoint = ""
    switch (type as RequestType) {
      case "account-nfts":
        endpoint = `${BLOCKVISION_BASE_URL}/${network}/account/${address}/nfts`
        break
      case "account-coins":
        endpoint = `${BLOCKVISION_BASE_URL}/${network}/account/${address}/coins`
        break
      case "collection-details":
        endpoint = `${BLOCKVISION_BASE_URL}/${network}/collection/${address}`
        break
      case "transaction-details":
        endpoint = `${BLOCKVISION_BASE_URL}/${network}/transaction/${address}`
        break
      case "coin-market":
        endpoint = `${BLOCKVISION_BASE_URL}/${network}/coin/${encodeURIComponent(address)}/market`
        break
      default:
        return NextResponse.json({ error: "Invalid request type" }, { status: 400 })
    }

    const response = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
      },
    })

    if (!response.ok) {
      console.warn("[v0] Blockvision API request failed. Status:", response.status, "Using mock data.")
      switch (type) {
        case "account-nfts":
          return NextResponse.json(mockNFTsData)
        case "account-coins":
          return NextResponse.json(mockCoinsData)
        case "collection-details":
          return NextResponse.json(mockCollectionData)
        case "transaction-details":
          return NextResponse.json(mockTransactionData)
        case "coin-market":
          return NextResponse.json(mockCoinMarketData)
        default:
          return NextResponse.json({})
      }
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.warn("[v0] Blockvision API error:", message, "Using mock data.")
    return NextResponse.json(mockCoinsData) // Default fallback
  }
}
