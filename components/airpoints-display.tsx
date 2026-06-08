"use client"

import { useAirpoints } from "@/hooks/use-airpoints"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, Zap, TrendingUp, Gift, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { toast } from "react-toastify"

interface AirpointsDisplayProps {
  showHistory?: boolean
  compact?: boolean
  showRedemption?: boolean
}

export function AirpointsDisplay({ showHistory = false, compact = false, showRedemption = false }: AirpointsDisplayProps) {
  const { balance, tier, history, loading, error, isAuthenticated } = useAirpoints()
  const [redeemingDiscount, setRedeemingDiscount] = useState(false)
  const [redeemingToken, setRedeemingToken] = useState(false)

  // Tier earning rates
  const earningRates = {
    free: 0,
    pro: 1250,
    "pro+": 3500,
  }
  const monthlyEarning = earningRates[tier as keyof typeof earningRates]

  // Redemption options
  const redemptionOptions = [
    { id: "discount", name: "10% Ad Discount", cost: 100, description: "Reduce advertising costs by 10%", available: tier !== "free" },
    { id: "token", name: "Convert to $ATLAS", cost: 500, description: "Convert to $ATLAS token (coming soon)", available: false, future: true },
  ]

  const handleRedeem = async (redeemType: "discount" | "token", cost: number) => {
    if (balance < cost) {
      toast.error(`Insufficient balance. You need ${cost - balance} more Airpoints.`, {
        position: "bottom-right",
        className: "bg-red-600 text-white",
      })
      return
    }

    if (redeemType === "discount") {
      setRedeemingDiscount(true)
    } else {
      setRedeemingToken(true)
    }

    try {
      const response = await fetch("/api/airpoints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "redeem",
          walletAddress: "",
          amount: cost,
          type: "redeem_discount",
          description: redeemType === "discount" ? "10% advertising discount redeemed" : "$ATLAS token conversion",
        }),
      })

      if (!response.ok) {
        throw new Error("Redemption failed")
      }

      const data = await response.json()
      toast.success(`Redeemed ${cost} Airpoints! Balance: ${data.newBalance}`, {
        position: "bottom-right",
        className: "bg-blue-600 dark:bg-blue-600 text-white",
      })

      // Trigger balance refresh
      setTimeout(() => window.location.reload(), 1500)
    } catch (error) {
      console.error("[v0] Redemption error:", error)
      toast.error("Failed to redeem Airpoints", {
        position: "bottom-right",
        className: "bg-red-600 text-white",
      })
    } finally {
      setRedeemingDiscount(false)
      setRedeemingToken(false)
    }
  }

  // Progress to next milestone
  const milestones = { free: 1000, pro: 2500, "pro+": 5000 }
  const nextMilestone = milestones[tier as keyof typeof milestones]
  const progress = Math.min((balance / nextMilestone) * 100, 100)

  if (!isAuthenticated) {
    return (
      <Card className="border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6 text-center">
          <p className="text-sm text-muted-foreground">Sign in to view your Airpoints</p>
        </CardContent>
      </Card>
    )
  }

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
        <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
        <div>
          <p className="text-sm font-semibold text-foreground">{balance.toLocaleString()} Airpoints</p>
          <p className="text-xs text-muted-foreground">{tier.toUpperCase()}: {monthlyEarning.toLocaleString()} pts/mo</p>
        </div>
        {loading && <Loader2 className="w-4 h-4 animate-spin ml-auto text-blue-600 dark:text-blue-400" />}
      </div>
    )
  }

  return (
    <Card className="border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50/50 dark:from-blue-950/20 to-transparent">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600 dark:text-purple-400" />
              Airpoints Balance
            </CardTitle>
            <CardDescription>Earn points from Pro subscription and features</CardDescription>
          </div>
          <Badge variant="outline" className="border-blue-200 dark:border-blue-800">
            {tier.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {error && <div className="text-sm text-red-600 dark:text-red-400 p-2 bg-red-50 dark:bg-red-950/30 rounded">{error}</div>}

        {/* Balance & Progress */}
        <div className="space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">{loading ? "..." : balance.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground">/ {nextMilestone.toLocaleString()} to next tier</span>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-blue-100 dark:bg-blue-900/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-500 dark:to-blue-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Monthly Earning Rate */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-background/50 rounded-lg p-3 border border-blue-100 dark:border-blue-900">
            <p className="text-xs text-muted-foreground mb-1">Monthly Earning</p>
            <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              {monthlyEarning.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{monthlyEarning === 0 ? "Upgrade to Pro" : "per month"}</p>
          </div>

          <div className="bg-background/50 rounded-lg p-3 border border-blue-100 dark:border-blue-900">
            <p className="text-xs text-muted-foreground mb-1">Tier Bonus</p>
            <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
              {tier === "pro+" ? "+3x" : tier === "pro" ? "+1x" : "0x"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{tier === "pro+" ? "Pro+" : tier === "pro" ? "Pro" : "Free tier"}</p>
          </div>
        </div>

        {/* History */}
        {showHistory && history.length > 0 && (
          <div className="border-t border-blue-100 dark:border-blue-900 pt-4 space-y-2">
            <p className="text-sm font-semibold">Recent Activity</p>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {history.slice(0, 5).map((event) => (
                <div key={event.id} className="flex items-center justify-between text-sm p-2 bg-background/50 rounded">
                  <span className="text-muted-foreground truncate">{event.type.replace(/_/g, " ")}</span>
                  <span className={cn("font-semibold", event.amount > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400")}>
                    {event.amount > 0 ? "+" : ""}{event.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {loading && <div className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading...
        </div>}

        {/* Redemption Section */}
        {showRedemption && (
          <div className="border-t border-blue-100 dark:border-blue-900 pt-4 space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <Gift className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <p className="text-sm font-semibold">Redeem Your Points</p>
            </div>

            {tier === "free" && (
              <div className="text-sm text-muted-foreground bg-amber-50 dark:bg-amber-950/30 p-3 rounded border border-amber-200 dark:border-amber-800">
                Upgrade to Pro to unlock redemption options
              </div>
            )}

            <div className="space-y-2">
              {redemptionOptions.map((option) => (
                <div
                  key={option.id}
                  className={cn(
                    "p-3 rounded-lg border transition-all",
                    option.available && tier !== "free"
                      ? "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/50"
                      : "bg-gray-50 dark:bg-gray-900/30 border-gray-200 dark:border-gray-800 opacity-60"
                  )}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-sm">{option.name}</p>
                      <p className="text-xs text-muted-foreground">{option.description}</p>
                    </div>
                    <Badge variant="secondary" className="whitespace-nowrap">
                      {option.cost} pts
                    </Badge>
                  </div>

                  {option.future ? (
                    <Button disabled size="sm" className="w-full text-xs">
                      Coming Soon
                    </Button>
                  ) : tier === "free" ? (
                    <Button disabled size="sm" className="w-full text-xs">
                      Upgrade to Pro
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleRedeem(option.id as "discount" | "token", option.cost)}
                      disabled={balance < option.cost || redeemingDiscount || redeemingToken}
                      size="sm"
                      className="w-full text-xs bg-blue-600 dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-700 text-white"
                    >
                      {redeemingDiscount || redeemingToken ? (
                        <>
                          <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                          Redeeming...
                        </>
                      ) : (
                        <>
                          <ArrowRight className="w-3 h-3 mr-1" />
                          Redeem Now
                        </>
                      )}
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="text-xs text-muted-foreground p-2 bg-background/50 rounded border border-dashed">
              <p className="font-semibold mb-1">Cross-App Ecosystem</p>
              <p>Earn Airpoints in Atlas Protocol, redeem in Flipper and other Treezures Labs apps</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
