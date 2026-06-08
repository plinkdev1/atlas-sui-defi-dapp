// Mock Sui client factory - @mysten/sui@2.3.2 doesn't expose a concrete client class
// In production, use proper RPC integration or dapp-kit

export interface SuiClientType {
  url: string
}

let mainnetClient: SuiClientType | null = null
let testnetClient: SuiClientType | null = null

export function getSuiClient(network: "mainnet" | "testnet" = "mainnet"): SuiClientType {
  if (network === "testnet") {
    if (!testnetClient) {
      testnetClient = { url: "https://fullnode.testnet.sui.io:443" }
    }
    return testnetClient
  }

  if (!mainnetClient) {
    mainnetClient = { url: "https://fullnode.mainnet.sui.io:443" }
  }
  return mainnetClient
}

// Type alias for CoreClient to accept mock SuiClientType
export type CoreClient = SuiClientType
