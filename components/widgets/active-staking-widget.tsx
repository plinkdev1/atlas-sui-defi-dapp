"use client"

import React from "react"
import { Coins, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import useSWR from "swr"
import { useUnifiedWallet } from "@/lib/unified-wallet-context"

export function ActiveStakingWidget() {
  const wallet = useUnifiedWallet()

  const { data: delegationData } = useSWR(
    wallet.connected && wallet.address ? `/api/stake/user-delegations?address=${wallet.address}` : null,
    (url) => fetch(url).then((r) => r.json()),
  )

  const totalStaked = delegationData?.totalStaked || 0
  const pendingRewards = delegationData?.pendingRewards || 0
  const stakedAmount = (totalStaked / 1e9).toFixed(2)
  const rewardsAmount = (pendingRewards / 1e9).toFixed(2)

  return (
    <div className="glass-panel p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Coins className="w-4 h-4 text-accent" />
          <h3 className="text-sm font-semibold text-foreground">Staking</h3>
        </div>
      </div>

      {/* Total Staked */}
      <div className="space-y-1.5 p-3 rounded-lg bg-background/50">
        <div className="text-xs text-muted-foreground">Total Staked</div>
        <div className="text-lg font-bold font-mono text-primary">{stakedAmount}</div>
        <div className="text-xs text-muted-foreground">SUI</div>
      </div>

      {/* Pending Rewards */}
      <div className="space-y-1.5 p-3 rounded-lg bg-background/50">
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          <Zap className="w-3 h-3" /> Pending Rewards
        </div>
        <div className="text-lg font-bold font-mono text-accent">{rewardsAmount}</div>
        <div className="text-xs text-muted-foreground">SUI</div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 border-t border-border/10 pt-3">
        <Button
          variant="outline"
          size="sm"
          className="text-xs h-8"
          onClick={() => (window.location.href = "/stake-hub")}
        >
          Stake More
        </Button>
        <Button
          size="sm"
          className="text-xs h-8 bg-gradient-to-r from-accent to-primary hover:shadow-lg hover:shadow-accent/30"
          onClick={() => (window.location.href = "/stake-hub?action=claim")}
        >
          Claim
        </Button>
      </div>
    </div>
  )
}
