"use client"

import React, { useMemo } from "react"
import { Shield, AlertCircle, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import useSWR from "swr"
import { useUnifiedWallet } from "@/lib/unified-wallet-context"

export function WalletShieldWidget() {
  const wallet = useUnifiedWallet()

  // Fetch wallet health data
  const { data: healthData } = useSWR(
    wallet.connected && wallet.address ? `/api/analytics/wallet?address=${wallet.address}` : null,
    (url) => fetch(url).then((r) => r.json()),
  )

  const score = healthData?.healthScore || 85
  const dustTokens = healthData?.dustTokens || 0
  const openApprovals = healthData?.openApprovals || 0

  const getScoreColor = (s: number) => {
    if (s >= 80) return "text-green-500"
    if (s >= 60) return "text-yellow-500"
    return "text-destructive"
  }

  return (
    <div className="glass-panel p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Wallet Shield</h3>
        </div>
      </div>

      {/* Safety Score Circle */}
      <div className="flex justify-center">
        <div className="relative w-24 h-24 rounded-full border-4 border-border/20 flex items-center justify-center bg-background/50">
          <div className={`text-2xl font-bold font-mono ${getScoreColor(score)}`}>{score}</div>
        </div>
      </div>

      {/* Score Label */}
      <div className="text-center">
        <div className="text-xs text-muted-foreground mb-1">Safety Score</div>
        <div className={`text-xs font-semibold uppercase tracking-wide ${getScoreColor(score)}`}>
          {score >= 80 ? "Secure" : score >= 60 ? "Caution" : "At Risk"}
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-2 border-t border-border/10 pt-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> Dust Tokens
          </span>
          <span className="font-semibold text-foreground">{dustTokens}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground flex items-center gap-1">
            <Zap className="w-3 h-3" /> Open Approvals
          </span>
          <span className="font-semibold text-foreground">{openApprovals}</span>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="grid grid-cols-2 gap-2 border-t border-border/10 pt-3">
        <Button
          variant="outline"
          size="sm"
          className="text-xs h-8"
          onClick={() => (window.location.href = "/wallet-cleanup")}
        >
          Clean
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-xs h-8"
          onClick={() => (window.location.href = "/wallet-cleanup?tab=approvals")}
        >
          Revoke
        </Button>
      </div>
    </div>
  )
}
