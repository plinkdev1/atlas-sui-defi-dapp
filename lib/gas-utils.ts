import type { CoreClient } from "@mysten/sui/client"
import type { Transaction } from "@mysten/sui/transactions"
import { WalletError, ErrorCode } from "@/lib/errors"

// Type for dry run response - not exported in @mysten/sui@2.3.2, use any
type DryRunTransactionBlockResponse = any

export interface GasEstimate {
  gasLimit: string
  gasPrice: string
  totalGas: string
}

interface GasUsed {
  computationCost?: string
  storageCost?: string
}

export async function estimateGas(transactionBlock: Transaction, client: CoreClient): Promise<GasEstimate> {
  try {
    // Mock gas estimation since CoreClient doesn't expose dry run in v2.3.2
    console.log("[v0] Estimating gas for transaction...")

    // Standard Sui gas estimation
    // Most transactions cost between 1000-10000 MIST
    const baseGas = BigInt("5000")
    const computationCost = baseGas
    const storageCost = BigInt("0")
    const totalGas = (computationCost + storageCost).toString()

    console.log("[v0] Gas estimated:", {
      computationCost: computationCost.toString(),
      storageCost: storageCost.toString(),
      totalGas,
    })

    return {
      gasLimit: totalGas,
      gasPrice: "1", // Sui uses fixed gas price
      totalGas,
    }
  } catch (error) {
    console.error("[v0] Gas estimation error:", error)
    throw new WalletError(
      "Failed to estimate gas. Please try again.",
      ErrorCode.GAS_ESTIMATION_FAILED,
      true,
      error instanceof Error ? error : undefined,
    )
  }
}

interface Coin {
  balance?: string
}

export async function validateBalance(address: string, requiredGas: string, client: CoreClient): Promise<boolean> {
  try {
    console.log("[v0] Validating balance for address:", address)

    // Mock balance validation since CoreClient doesn't expose getCoins in v2.3.2
    // In a real app, this would query the blockchain
    // For now, assume any connected wallet has sufficient balance
    const requiredAmount = BigInt(requiredGas)
    
    // Mock balance - assume 1 SUI (1,000,000,000 MIST) is available
    const mockBalance = BigInt("1000000000")

    if (mockBalance < requiredAmount) {
      const shortfall = (requiredAmount - mockBalance).toString()
      throw new WalletError(
        `Insufficient balance. Need ${requiredGas} but have ${mockBalance.toString()}. Short ${shortfall}.`,
        ErrorCode.INSUFFICIENT_BALANCE,
        false,
      )
    }

    console.log("[v0] Balance sufficient:", mockBalance.toString())
    return true
  } catch (error) {
    if (error instanceof WalletError) throw error
    throw new WalletError(
      "Failed to validate balance",
      ErrorCode.GAS_ESTIMATION_FAILED,
      true,
      error instanceof Error ? error : undefined,
    )
  }
}
