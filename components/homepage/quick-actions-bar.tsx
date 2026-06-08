"use client"

import Link from "next/link"
import { ArrowRightLeft, Zap, Coins, Grid3x3 } from "lucide-react"

export function QuickActionsBar() {
  return (
    <div className="grid grid-cols-4 gap-3 stagger-item" style={{ animationDelay: "0.1s" }}>
      <Link
        href="/swap-aggregator"
        className="group bg-card/50 backdrop-blur-xl border border-border/20 rounded-lg p-4 hover:border-primary/50 smooth-transition hover:shadow-lg hover:shadow-primary/20 flex flex-col items-center gap-2 text-center"
      >
        <div className="w-10 h-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center smooth-transition">
          <ArrowRightLeft className="h-5 w-5 text-primary" />
        </div>
        <span className="text-xs font-semibold text-foreground">Swap</span>
      </Link>

      <Link
        href="/bridge-hub"
        className="group bg-card/50 backdrop-blur-xl border border-border/20 rounded-lg p-4 hover:border-accent/50 smooth-transition hover:shadow-lg hover:shadow-accent/20 flex flex-col items-center gap-2 text-center"
      >
        <div className="w-10 h-10 rounded-lg bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center smooth-transition">
          <Zap className="h-5 w-5 text-accent" />
        </div>
        <span className="text-xs font-semibold text-foreground">Bridge</span>
      </Link>

      <Link
        href="/stake-hub"
        className="group bg-card/50 backdrop-blur-xl border border-border/20 rounded-lg p-4 hover:border-green-500/50 smooth-transition hover:shadow-lg hover:shadow-green-500/20 flex flex-col items-center gap-2 text-center"
      >
        <div className="w-10 h-10 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 flex items-center justify-center smooth-transition">
          <Coins className="h-5 w-5 text-green-500" />
        </div>
        <span className="text-xs font-semibold text-foreground">Stake</span>
      </Link>

      <Link
        href="/swap-aggregator"
        className="group bg-card/50 backdrop-blur-xl border border-border/20 rounded-lg p-4 hover:border-yellow-500/50 smooth-transition hover:shadow-lg hover:shadow-yellow-500/20 flex flex-col items-center gap-2 text-center"
      >
        <div className="w-10 h-10 rounded-lg bg-yellow-500/10 group-hover:bg-yellow-500/20 flex items-center justify-center smooth-transition">
          <Grid3x3 className="h-5 w-5 text-yellow-500" />
        </div>
        <span className="text-xs font-semibold text-foreground">Agg</span>
      </Link>
    </div>
  )
}
