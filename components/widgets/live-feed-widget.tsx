"use client"

import React, { useState } from "react"
import { TrendingUp, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import useSWR from "swr"

interface FeedItem {
  id: string
  label: string
  value: string
  change: number
  type: "whale" | "swap" | "nft" | "all"
}

export function LiveFeedWidget() {
  const [activeFilter, setActiveFilter] = useState("all")

  const { data: feedData } = useSWR("/api/oracle/prices", (url) => fetch(url).then((r) => r.json()))

  const mockFeedItems: FeedItem[] = [
    { id: "1", label: "Large SUI Transfer", value: "1.2M SUI", change: 2.5, type: "whale" },
    { id: "2", label: "Active Swap", value: "$850K USD", change: -1.2, type: "swap" },
    { id: "3", label: "NFT Floor Change", value: "+2.3%", change: 2.3, type: "nft" },
    { id: "4", label: "Oracle Update", value: "SUI $2.84", change: 0.5, type: "all" },
  ]

  const filteredItems = mockFeedItems.filter((item) => activeFilter === "all" || item.type === activeFilter)

  return (
    <div className="glass-panel p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          <h3 className="text-sm font-semibold text-foreground">Live Feed</h3>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex gap-1 flex-wrap">
        {["all", "whale", "swap", "nft"].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
              activeFilter === filter
                ? "bg-primary text-background"
                : "bg-background/50 text-muted-foreground hover:bg-background/70"
            }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {/* Feed Items */}
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {filteredItems.map((item) => (
          <div key={item.id} className="p-2 rounded-lg bg-background/50 hover:bg-background/70 transition-colors cursor-pointer">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <TrendingUp className="w-3 h-3 text-primary flex-shrink-0" />
                <span className="text-xs font-medium text-foreground truncate">{item.label}</span>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-xs font-mono font-semibold text-foreground">{item.value}</div>
                <div className={`text-xs font-medium ${item.change > 0 ? "text-green-500" : "text-red-500"}`}>
                  {item.change > 0 ? "+" : ""}{item.change}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <Button
        variant="outline"
        size="sm"
        className="w-full text-xs h-8"
        onClick={() => (window.location.href = "/oracle-feeds")}
      >
        View All Feed
      </Button>
    </div>
  )
}
