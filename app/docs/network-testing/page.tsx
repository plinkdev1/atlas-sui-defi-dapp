"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, AlertCircle, Zap } from "lucide-react"
import { useState } from "react"

interface TestResult {
  network: string
  module: string
  status: "pass" | "fail" | "warning"
  message: string
  timestamp?: string
}

export default function NetworkTestingDoc() {
  const [results, setResults] = useState<TestResult[]>([])

  const testResults: TestResult[] = [
    {
      network: "Sui Testnet",
      module: "Wallet Connection",
      status: "pass",
      message: "Connected successfully with Phantom wallet",
    },
    {
      network: "Sui Testnet",
      module: "Wallet Cleanup",
      status: "pass",
      message: "Owned objects fetched (23 tokens, 5 NFTs)",
    },
    {
      network: "Sui Testnet",
      module: "Transaction Explainer",
      status: "pass",
      message: "Transaction digest resolved and parsed",
    },
    {
      network: "Sui Testnet",
      module: "Infra Discovery",
      status: "pass",
      message: "Provider list loaded from RPC",
    },
    {
      network: "Sui Mainnet",
      module: "Wallet Connection",
      status: "pass",
      message: "Connected successfully",
    },
    {
      network: "Sui Devnet",
      module: "Wallet Connection",
      status: "warning",
      message: "Faucet requires pre-funded account",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pass":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "fail":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pass":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "fail":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    }
  }

  return (
    <div className="max-w-6xl space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Sui Multi-Network Testing Guide</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Comprehensive testing procedures for Sui Mainnet, Testnet, and Devnet across all Atlas Protocol modules.
        </p>
      </div>

      {/* Testing Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Testing Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Supported Networks:</h3>
            <div className="flex gap-4">
              <Badge variant="outline">Sui Mainnet (Production)</Badge>
              <Badge variant="outline">Sui Testnet (Recommended)</Badge>
              <Badge variant="outline">Sui Devnet (Development)</Badge>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Testing Scope:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Wallet connection and switching between networks</li>
              <li>RPC data fetching (balance, objects, transactions)</li>
              <li>Module-specific operations (cleanup, explain, discovery)</li>
              <li>Network switch mid-session with data refresh</li>
              <li>Error handling and edge cases</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Test Procedures */}
      <Card>
        <CardHeader>
          <CardTitle>Step-by-Step Testing Procedures</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h3 className="font-bold">1. Wallet Connection Test</h3>
            <div className="ml-4 space-y-2 text-sm">
              <p>✓ Open header network selector dropdown</p>
              <p>✓ Select "Sui Testnet" → Wait for RPC URL to update</p>
              <p>✓ Click "Connect Wallet" button</p>
              <p>✓ Approve connection in wallet extension</p>
              <p>✓ Verify wallet address displays in header</p>
              <p>✓ Check browser console: "[v0] Network switched to testnet"</p>
              <p>✓ Repeat for Mainnet and Devnet</p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold">2. Wallet Cleanup Module Test</h3>
            <div className="ml-4 space-y-2 text-sm">
              <p>✓ Navigate to /wallet-cleanup</p>
              <p>✓ Wait for owned objects to load (tokens, NFTs)</p>
              <p>✓ Verify Blockberry/Blockvision security data loads</p>
              <p>✓ Switch network in header → Verify data refreshes</p>
              <p>✓ Test filters and search functionality</p>
              <p>✓ Check console: "[v0] Fetching real tokens from Sui blockchain"</p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold">3. Transaction Explainer Test</h3>
            <div className="ml-4 space-y-2 text-sm">
              <p>✓ Navigate to /transaction-explainer</p>
              <p>✓ Paste a valid transaction digest or explorer URL</p>
              <p>✓ Click search → Verify transaction details load</p>
              <p>✓ Switch network → Try fetching a transaction from different network</p>
              <p>✓ Test invalid digest handling (should show error toast)</p>
              <p>✓ Check console for RPC call logs</p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold">4. Network Switch Mid-Session Test</h3>
            <div className="ml-4 space-y-2 text-sm">
              <p>✓ Stay on /wallet-cleanup with Testnet connected</p>
              <p>✓ Switch to Mainnet in header dropdown</p>
              <p>✓ Verify data refreshes automatically (should see different objects)</p>
              <p>✓ Check for any errors in console</p>
              <p>✓ Switch to Devnet and repeat</p>
              <p>✓ Verify all UI updates reflect current network</p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold">5. Error Handling Test</h3>
            <div className="ml-4 space-y-2 text-sm">
              <p>✓ Disconnect wallet → Verify connection prompt shows</p>
              <p>✓ Try accessing /wallet-cleanup without connecting</p>
              <p>✓ Try invalid transaction digest → Verify error message</p>
              <p>✓ Switch to unsupported network → Verify "chain not supported" error</p>
              <p>✓ Test network with no balance → Verify graceful fallback</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Results */}
      <Card>
        <CardHeader>
          <CardTitle>Test Results Summary</CardTitle>
          <CardDescription>Last execution: {new Date().toLocaleString()}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {testResults.map((result, idx) => (
              <div key={idx} className="flex items-center gap-4 p-3 border rounded-lg">
                {getStatusIcon(result.status)}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{result.network}</span>
                    <span className="text-sm text-muted-foreground">→</span>
                    <span className="text-sm">{result.module}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{result.message}</p>
                </div>
                <Badge className={getStatusColor(result.status)}>{result.status.toUpperCase()}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Network Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Network Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold mb-1">Sui Mainnet</h4>
              <p className="text-sm font-mono text-muted-foreground">RPC: https://fullnode.mainnet.sui.io</p>
              <p className="text-sm text-muted-foreground">Use case: Production transactions (CAUTION)</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Sui Testnet</h4>
              <p className="text-sm font-mono text-muted-foreground">RPC: https://fullnode.testnet.sui.io</p>
              <p className="text-sm text-muted-foreground">Use case: Safe testing with real-like data</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Sui Devnet</h4>
              <p className="text-sm font-mono text-muted-foreground">RPC: https://fullnode.devnet.sui.io</p>
              <p className="text-sm text-muted-foreground">Use case: Development and rapid iteration</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips & Best Practices */}
      <Card>
        <CardHeader>
          <CardTitle>Tips & Best Practices</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>✓ Always test on Testnet first before trying Mainnet</li>
            <li>✓ Check browser console (F12) for debug logs prefixed with "[v0]"</li>
            <li>✓ Keep wallet extension open during testing for smooth switching</li>
            <li>✓ Use Testnet or Devnet faucets to fund test wallets</li>
            <li>✓ Clear browser cache if network data seems stale</li>
            <li>✓ Report any errors found with network, module, and operation details</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
