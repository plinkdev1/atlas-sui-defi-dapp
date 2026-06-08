"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useWalletStore } from "@/lib/wallet-store"
import { setAnalyticsOptOut } from "@/lib/wallet-analytics"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { analyticsOptOut, setAnalyticsOptOut: updateStoreOptOut } = useWalletStore()
  const [mounted, setMounted] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleAnalyticsToggle = (enabled: boolean) => {
    setAnalyticsOptOut(!enabled)
    updateStoreOptOut(!enabled)
    toast({
      title: enabled ? "Analytics Enabled" : "Analytics Disabled",
      description: enabled
        ? "We'll track your wallet activity to improve the service."
        : "We won't track your wallet activity.",
    })
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-8 flex items-center justify-center">
        <div className="text-muted-foreground">Loading settings...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your preferences and privacy settings</p>
        </div>

        {/* Analytics Settings */}
        <Card className="border-border/40 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Analytics & Tracking</CardTitle>
            <CardDescription>Control how we track your wallet activity and usage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/40">
              <div>
                <div className="font-medium text-foreground">Analytics Tracking</div>
                <p className="text-sm text-muted-foreground">
                  Allow us to track wallet connections, transactions, and errors (anonymized)
                </p>
              </div>
              <Switch
                checked={!analyticsOptOut}
                onCheckedChange={handleAnalyticsToggle}
                aria-label="Enable analytics tracking"
              />
            </div>

            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <h4 className="font-medium text-foreground mb-2">What we track:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Wallet connections and disconnections</li>
                <li>• Transaction signing (type only, no amounts)</li>
                <li>• Network switches (mainnet/testnet/devnet)</li>
                <li>• Error occurrences (error codes only)</li>
                <li>• Page views and user flows</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <h4 className="font-medium text-green-700 dark:text-green-400 mb-2">Privacy:</h4>
              <ul className="text-sm text-green-600 dark:text-green-300 space-y-1">
                <li>• Wallet addresses are hashed and anonymized</li>
                <li>• No personal information is collected</li>
                <li>• No transaction amounts or data is stored</li>
                <li>• You can opt-out at any time</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="border-border/40 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
            <CardDescription>Manage your stored data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => {
                localStorage.removeItem("atlas-wallet-analytics-events")
                toast({
                  title: "Data Cleared",
                  description: "Local analytics data has been cleared",
                })
              }}
            >
              Clear Local Analytics Data
            </Button>

            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => {
                localStorage.removeItem("atlas-wallet-storage")
                localStorage.removeItem("atlas-theme")
                toast({
                  title: "All Data Cleared",
                  description: "All local data has been cleared. Please refresh the page.",
                })
              }}
            >
              Clear All Local Data
            </Button>
          </CardContent>
        </Card>

        {/* About Analytics */}
        <Card className="border-border/40 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>About Our Analytics</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-3">
            <p>
              We use analytics to understand how Atlas Protocol is being used and to improve the service. Our analytics
              system respects your privacy by:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Anonymizing all wallet addresses using one-way hashing</li>
              <li>Never collecting transaction amounts, tokens, or balances</li>
              <li>Allowing you to opt-out at any time</li>
              <li>Using industry-standard privacy practices</li>
            </ul>
            <p className="pt-2">
              We use PostHog and Vercel Analytics to power our analytics infrastructure. For more information, check
              their privacy policies.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
