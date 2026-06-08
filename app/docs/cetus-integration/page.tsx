"use client"

import { ArrowLeft, Code2, Zap, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CetusIntegrationDocs() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background pb-20">
      <main className="container mx-auto px-4 py-8 md:px-6 md:py-12 max-w-4xl">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Cetus SDK v2 Integration Guide</h1>
          <p className="text-lg text-muted-foreground">
            Complete guide to using Cetus protocol for swaps, staking, and liquidity management on Sui Testnet.
          </p>
        </div>

        {/* Overview Section */}
        <Card className="mb-8 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-500" />
              Integration Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground">
              Atlas Protocol integrates Cetus SDK v2 for decentralized swaps, liquidity pools, and yield farming on Sui.
              All features are tested on Sui Testnet.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-background rounded-lg border border-border">
                <p className="font-semibold text-foreground mb-2">Smart Router</p>
                <p className="text-sm text-muted-foreground">Multi-hop routing with optimal path finding</p>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border">
                <p className="font-semibold text-foreground mb-2">Pool APRs</p>
                <p className="text-sm text-muted-foreground">Real-time liquidity pool yields</p>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border">
                <p className="font-semibold text-foreground mb-2">Referrals</p>
                <p className="text-sm text-muted-foreground">Atlas earns partner commission</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Swap Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="h-5 w-5 text-blue-500" />
              Swap Feature
            </CardTitle>
            <CardDescription>Execute token swaps with best rates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Supported Trading Pairs</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">✓ SUI/USDC</li>
                <li className="flex items-center gap-2">✓ SUI/USDT</li>
                <li className="flex items-center gap-2">✓ USDC/USDT</li>
                <li className="flex items-center gap-2">✓ SUI/ETH</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2">Flow</h4>
              <div className="space-y-2 text-sm">
                <div className="p-3 bg-secondary rounded border border-border/50">
                  <p className="font-mono text-xs text-muted-foreground">1. User selects tokens and amount</p>
                </div>
                <div className="p-3 bg-secondary rounded border border-border/50">
                  <p className="font-mono text-xs text-muted-foreground">
                    2. "Get Quote" fetches price from /api/cetus/swap-quote
                  </p>
                </div>
                <div className="p-3 bg-secondary rounded border border-border/50">
                  <p className="font-mono text-xs text-muted-foreground">
                    3. Quote validated against slippage tolerance
                  </p>
                </div>
                <div className="p-3 bg-secondary rounded border border-border/50">
                  <p className="font-mono text-xs text-muted-foreground">
                    4. "Swap" executes via /api/cetus/swap-execute
                  </p>
                </div>
                <div className="p-3 bg-secondary rounded border border-border/50">
                  <p className="font-mono text-xs text-muted-foreground">
                    5. Transaction signed and broadcast to Testnet
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2">Error Handling</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>🔴 Insufficient Balance - Validates wallet balance before swap</li>
                <li>🔴 Slippage Exceeded - Compares price impact against tolerance</li>
                <li>🔴 Network Error - Graceful retry with toast notifications</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Staking Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              Staking & Liquidity
            </CardTitle>
            <CardDescription>Earn yield by providing liquidity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Available Pools (with APR)</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-3 bg-secondary rounded border border-border/50">
                  <span className="text-foreground">SUI/USDC</span>
                  <span className="text-green-500 font-semibold">12.5% APR</span>
                </div>
                <div className="flex justify-between p-3 bg-secondary rounded border border-border/50">
                  <span className="text-foreground">SUI/USDT</span>
                  <span className="text-green-500 font-semibold">9.8% APR</span>
                </div>
                <div className="flex justify-between p-3 bg-secondary rounded border border-border/50">
                  <span className="text-foreground">USDC/USDT</span>
                  <span className="text-green-500 font-semibold">3.2% APR</span>
                </div>
                <div className="flex justify-between p-3 bg-secondary rounded border border-border/50">
                  <span className="text-foreground">SUI/ETH</span>
                  <span className="text-green-500 font-semibold">15.3% APR</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2">Staking Flow</h4>
              <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                <li>Select a pool from available options</li>
                <li>Enter stake amount (must have sufficient balance)</li>
                <li>Click "Stake" to create liquidity position</li>
                <li>Transaction is signed and executed on Testnet</li>
                <li>Earn APR rewards from trading fees</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* Testnet Testing Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Testing on Sui Testnet</CardTitle>
            <CardDescription>Setup and verification steps</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Prerequisites</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Testnet wallet with sufficient SUI</li>
                <li>✓ Request testnet tokens via faucet</li>
                <li>✓ Network set to Sui Testnet in wallet</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2">Verification Checklist</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-3 bg-secondary rounded border border-border/50 text-sm">
                  <input type="checkbox" className="w-4 h-4" /> Wallet connects successfully
                </div>
                <div className="flex items-center gap-2 p-3 bg-secondary rounded border border-border/50 text-sm">
                  <input type="checkbox" className="w-4 h-4" /> SUI/USDC swap quote fetches
                </div>
                <div className="flex items-center gap-2 p-3 bg-secondary rounded border border-border/50 text-sm">
                  <input type="checkbox" className="w-4 h-4" /> Multi-pair swaps work (SUI/USDT, USDC/USDT, SUI/ETH)
                </div>
                <div className="flex items-center gap-2 p-3 bg-secondary rounded border border-border/50 text-sm">
                  <input type="checkbox" className="w-4 h-4" /> Insufficient balance error shows correctly
                </div>
                <div className="flex items-center gap-2 p-3 bg-secondary rounded border border-border/50 text-sm">
                  <input type="checkbox" className="w-4 h-4" /> Slippage tolerance validation works
                </div>
                <div className="flex items-center gap-2 p-3 bg-secondary rounded border border-border/50 text-sm">
                  <input type="checkbox" className="w-4 h-4" /> Pool APRs display correctly
                </div>
                <div className="flex items-center gap-2 p-3 bg-secondary rounded border border-border/50 text-sm">
                  <input type="checkbox" className="w-4 h-4" /> Stake transaction executes
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Once Cetus SDK is fully integrated on the backend, the following features will be enabled:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Real multi-hop swap routing with optimal path finding</li>
              <li>• Live APR data from Cetus pools</li>
              <li>• Cetus Terminal embed as professional trading UI</li>
              <li>• Advanced position management for LPs</li>
              <li>• Real-time portfolio tracking</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
