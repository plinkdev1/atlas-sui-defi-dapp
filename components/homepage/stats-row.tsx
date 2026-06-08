"use client"

import { TrendingUp, Shield, Activity } from "lucide-react"

export function StatsRow() {
  return (
    <div className="grid grid-cols-3 gap-4 stagger-item">
      {/* Net Worth */}
      <div className="bg-card/50 backdrop-blur-xl border border-border/20 rounded-xl p-4 card-hover">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground font-medium">NET WORTH</span>
          <TrendingUp className="h-4 w-4 text-primary" />
        </div>
        <div className="text-2xl font-bold text-foreground mb-1">$124,592.40</div>
        <div className="text-xs text-green-500">+4.2% (24h)</div>
        <div className="text-xs text-muted-foreground mt-2">SUI Mainnet</div>
      </div>

      {/* Staked SUI */}
      <div className="bg-card/50 backdrop-blur-xl border border-border/20 rounded-xl p-4 card-hover">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground font-medium">STAKED SUI</span>
          <Activity className="h-4 w-4 text-accent" />
        </div>
        <div className="text-2xl font-bold text-foreground mb-1">4,000.00</div>
        <div className="text-xs text-green-500">6.2% APY</div>
        <div className="text-xs text-muted-foreground mt-2">Validator Rewards</div>
      </div>

      {/* Wallet Health */}
      <div className="bg-card/50 backdrop-blur-xl border border-border/20 rounded-xl p-4 card-hover">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground font-medium">WALLET HEALTH</span>
          <Shield className="h-4 w-4 text-green-500" />
        </div>
        <div className="text-2xl font-bold text-green-500 mb-1">98/100</div>
        <div className="text-xs text-green-500">Protected</div>
        <div className="text-xs text-muted-foreground mt-2">No threats detected</div>
      </div>
    </div>
  )
}
