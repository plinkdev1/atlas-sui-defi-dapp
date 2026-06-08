"use client"

import React, { useState } from "react"
import { Zap, ArrowRightLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function QuickSwapWidget() {
  const [fromAmount, setFromAmount] = useState("1.0")
  const [toAmount, setToAmount] = useState("2847.50")
  const [slippage, setSlippage] = useState(0.5)

  return (
    <div className="glass-panel p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-accent" />
          <h3 className="text-sm font-semibold text-foreground">Quick Swap</h3>
        </div>
      </div>

      {/* From Input */}
      <div className="space-y-1.5">
        <label className="text-xs text-muted-foreground block">From</label>
        <div className="flex gap-1">
          <Input
            type="number"
            placeholder="0"
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
            className="flex-1 h-8 text-sm"
          />
          <Button variant="outline" size="sm" className="text-xs w-16">
            SUI
          </Button>
        </div>
      </div>

      {/* Swap Icon */}
      <div className="flex justify-center py-1">
        <button className="p-1.5 rounded-lg bg-background/50 hover:bg-background transition-colors">
          <ArrowRightLeft className="w-4 h-4 text-primary" />
        </button>
      </div>

      {/* To Input */}
      <div className="space-y-1.5">
        <label className="text-xs text-muted-foreground block">To</label>
        <div className="flex gap-1">
          <Input
            type="number"
            placeholder="0"
            value={toAmount}
            onChange={(e) => setToAmount(e.target.value)}
            className="flex-1 h-8 text-sm"
          />
          <Button variant="outline" size="sm" className="text-xs w-16">
            USDC
          </Button>
        </div>
      </div>

      {/* Slippage */}
      <div className="space-y-1.5 border-t border-border/10 pt-3">
        <label className="text-xs text-muted-foreground block">Slippage</label>
        <div className="flex gap-1">
          {[0.1, 0.5, 1].map((s) => (
            <Button
              key={s}
              variant={slippage === s ? "default" : "outline"}
              size="sm"
              className="text-xs flex-1 h-7"
              onClick={() => setSlippage(s)}
            >
              {s}%
            </Button>
          ))}
        </div>
      </div>

      {/* Swap Button */}
      <Button className="w-full h-9 text-sm font-semibold bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/30">
        Swap
      </Button>
    </div>
  )
}
