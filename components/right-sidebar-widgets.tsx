"use client"

import React from "react"
import { WalletShieldWidget } from "./widgets/wallet-shield-widget"
import { QuickSwapWidget } from "./widgets/quick-swap-widget"
import { LiveFeedWidget } from "./widgets/live-feed-widget"
import { ActiveStakingWidget } from "./widgets/active-staking-widget"
import { useUnifiedWallet } from "@/lib/unified-wallet-context"

export function RightSidebarWidgets() {
  const wallet = useUnifiedWallet()

  if (!wallet.connected) {
    return (
      <div className="p-4">
        <div className="glass-panel p-6 text-center space-y-3">
          <div className="text-sm font-semibold text-foreground">Connect Wallet</div>
          <p className="text-xs text-muted-foreground">
            Connect your wallet to see sidebar widgets and personalized stats.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-4">
      <WalletShieldWidget />
      <QuickSwapWidget />
      <LiveFeedWidget />
      <ActiveStakingWidget />
    </div>
  )
}
