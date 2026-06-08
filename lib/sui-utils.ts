// Unified Sui utilities for all RPC operations
import type { CoreClient as SuiSDKClient } from "@mysten/sui/client"

const MAINNET_RPC = "https://fullnode.mainnet.sui.io:443"
const TESTNET_RPC = "https://fullnode.testnet.sui.io:443"

// Re-export from sui-client for backwards compatibility
export { getSuiClient } from "@/lib/sui-client"

export function getRpcUrl(network: "mainnet" | "testnet" = "mainnet"): string {
  return network === "testnet" ? TESTNET_RPC : MAINNET_RPC
}
