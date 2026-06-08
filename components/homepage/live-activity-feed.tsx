"use client"

import { AlertTriangle, TrendingUp, Zap, Gift, Filter } from "lucide-react"
import { useState } from "react"

const mockActivity = [
  {
    id: 1,
    type: "swap",
    title: "Swap Executed",
    protocol: "Cetus Protocol",
    amount: "+4,291.00",
    amountSub: "SUI",
    timeAgo: "2m ago",
    icon: TrendingUp,
  },
  {
    id: 2,
    type: "warning",
    title: "Scam Alert Blocked",
    protocol: "Wallet Guard • 5m ago",
    amount: "BLOCKED",
    amountColor: "text-red-500",
    timeAgo: "Safe",
    icon: AlertTriangle,
  },
  {
    id: 3,
    type: "oracle",
    title: "Oracle Update",
    protocol: "Pyth Network",
    amount: "SUI $1.24",
    amountSub: "+2.1%",
    timeAgo: "30s ago",
    icon: Zap,
  },
  {
    id: 4,
    type: "event",
    title: "NFT Minted",
    protocol: "Sui Punk #8821",
    amount: "250 SUI",
    amountSub: "MINTED",
    timeAgo: "1h ago",
    icon: Gift,
  },
]

export function LiveActivityFeed() {
  const [filter, setFilter] = useState("all")

  return (
    <div className="space-y-4 stagger-item" style={{ animationDelay: "0.3s" }}>
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">Oracle & Activity</h2>
        <span className="text-xs text-primary">LIVE</span>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {["all", "swaps", "nfts", "alerts"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap smooth-transition ${
              filter === tab
                ? "bg-primary/30 text-primary border border-primary/50"
                : "bg-background/50 border border-border/20 text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {mockActivity.map((item, idx) => {
          const Icon = item.icon
          return (
            <div
              key={item.id}
              className="bg-card/50 backdrop-blur-xl border border-border/20 rounded-lg p-3.5 hover:border-border/50 smooth-transition stagger-item cursor-pointer"
              style={{ animationDelay: `${0.4 + idx * 0.05}s` }}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  item.type === "warning"
                    ? "bg-red-500/10"
                    : item.type === "swap"
                      ? "bg-primary/10"
                      : item.type === "oracle"
                        ? "bg-accent/10"
                        : "bg-yellow-500/10"
                }`}>
                  <Icon className={`h-4 w-4 ${
                    item.type === "warning"
                      ? "text-red-500"
                      : item.type === "swap"
                        ? "text-primary"
                        : item.type === "oracle"
                          ? "text-accent"
                          : "text-yellow-500"
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-foreground">{item.title}</div>
                  <div className="text-xs text-muted-foreground">{item.protocol}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className={`font-semibold text-sm ${item.amountColor || "text-foreground"}`}>{item.amount}</div>
                  {item.amountSub && <div className="text-xs text-muted-foreground">{item.amountSub}</div>}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
