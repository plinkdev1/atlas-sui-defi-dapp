"use client"

import { TrendingUp, Eye } from "lucide-react"

const mockPositions = [
  {
    id: 1,
    asset: "SUI-USDC",
    protocol: "Turbos",
    value: "$4,200.00",
    pnl: "+12.4%",
    pnlPositive: true,
  },
  {
    id: 2,
    asset: "SUI Staked",
    protocol: "Native",
    value: "$2,050.00",
    pnl: "+6.1%",
    pnlPositive: true,
  },
]

export function ActivePositionsTable() {
  return (
    <div className="space-y-4 stagger-item" style={{ animationDelay: "0.4s" }}>
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">Active Positions</h2>
        <button className="text-xs text-primary hover:text-primary/80 smooth-transition">View All</button>
      </div>

      <div className="bg-card/50 backdrop-blur-xl border border-border/20 rounded-lg overflow-hidden">
        <div className="hidden sm:grid grid-cols-4 gap-4 p-4 bg-background/30 border-b border-border/10 text-xs font-semibold text-muted-foreground">
          <div>Asset</div>
          <div>Protocol</div>
          <div className="text-right">Value</div>
          <div className="text-right">PNL</div>
        </div>

        <div className="divide-y divide-border/10">
          {mockPositions.map((pos, idx) => (
            <div
              key={pos.id}
              className="p-4 hover:bg-background/20 smooth-transition cursor-pointer stagger-item"
              style={{ animationDelay: `${0.5 + idx * 0.05}s` }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm font-semibold text-foreground">{pos.asset}</div>
                  <div className="text-xs text-muted-foreground">{pos.protocol}</div>
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm text-foreground">{pos.protocol}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-foreground">{pos.value}</div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-semibold ${pos.pnlPositive ? "text-green-500" : "text-red-500"}`}>
                    {pos.pnl}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
