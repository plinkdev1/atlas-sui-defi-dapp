"use client"

import { useProStatus } from "@/lib/pro-status-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { BackButton } from "@/components/back-button"
import { AirpointsDisplay } from "@/components/airpoints-display"
import { useAirpointsEarn } from "@/hooks/use-airpoints-earn"
import { Crown, Zap, Gift, Calendar, AlertCircle } from "lucide-react"
import { formatDistance, formatDate } from "date-fns"
import { toast } from "react-toastify"
import { useState } from "react"

export default function SubscriptionPage() {
  const { status, downgradeToFree, upgradeToPro } = useProStatus()
  const { earn, loading: earnLoading } = useAirpointsEarn()
  const router = useRouter()
  const [simulatingEarn, setSimulatingEarn] = useState(false)

  // Mock Airpoints calculation based on tier
  const airpointsEarned = status.isPro ? (status.tier === "pro+" ? 3500 : 1250) : 0
  const airpointsNextMilestone = status.tier === "pro+" ? 5000 : status.tier === "pro" ? 2500 : 1000

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel your Pro subscription?")) {
      downgradeToFree()
      toast.success("Subscription cancelled. Back to Free tier.", { position: "bottom-right" })
      setTimeout(() => window.location.reload(), 500)
    }
  }

  const handleUpgrade = () => {
    router.push("/pro-upgrade")
  }

  const handleSimulateEarn = async () => {
    if (!status.isPro) {
      toast.info("Upgrade to Pro to earn Airpoints", { position: "bottom-right" })
      return
    }

    setSimulatingEarn(true)
    try {
      await earn({
        amount: 25,
        type: "earn_cleanup",
        description: "Mock earning simulation for testing",
      })
      toast.success("Simulated earning: +25 Airpoints!", {
        position: "bottom-right",
        className: "bg-blue-600 dark:bg-blue-600 text-white",
      })
    } catch (error) {
      toast.error("Failed to simulate earning", { position: "bottom-right" })
    } finally {
      setSimulatingEarn(false)
    }
  }

  const daysRemaining =
    status.expiry && status.isPro ? Math.ceil((new Date(status.expiry).getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : null

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <div className="container max-w-4xl mx-auto px-4 pt-4 md:pt-6 space-y-8">
        <BackButton label="Back to Home" />

        {/* Current Status Section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Subscription & Billing</h1>
            <p className="text-muted-foreground">Manage your Atlas Protocol Pro subscription</p>
          </div>

          {/* Main Status Card */}
          <Card className="border-2 border-blue-500/30 bg-gradient-to-br from-blue-500/5 to-transparent">
            <CardHeader className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {status.isPro ? (
                    <>
                      <div className="p-3 bg-blue-500/20 rounded-lg">
                        <Crown className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-foreground">
                          {status.tier === "pro+" ? "Pro+ Subscription" : "Pro Subscription"}
                        </h2>
                        <p className="text-sm text-muted-foreground">Premium access unlocked</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-3 bg-gray-500/20 rounded-lg">
                        <Zap className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-foreground">Free Tier</h2>
                        <p className="text-sm text-muted-foreground">Upgrade to unlock advanced features</p>
                      </div>
                    </>
                  )}
                </div>
                <Badge variant={status.isPro ? "default" : "secondary"} className="text-base px-3 py-1">
                  {status.tier.charAt(0).toUpperCase() + status.tier.slice(1)}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Status Details */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-background/50 rounded-lg p-4 border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Tier</p>
                  <p className="text-lg font-semibold text-foreground">
                    {status.tier === "pro+" ? "Pro+" : status.tier === "pro" ? "Pro" : "Free"}
                  </p>
                </div>

                {status.isPro && status.expiry && (
                  <>
                    <div className="bg-background/50 rounded-lg p-4 border border-border">
                      <p className="text-sm text-muted-foreground mb-1">Active Until</p>
                      <p className="text-lg font-semibold text-foreground">{formatDate(new Date(status.expiry), "MMM dd, yyyy")}</p>
                      {daysRemaining && (
                        <p className="text-xs text-muted-foreground mt-1">{daysRemaining} days remaining</p>
                      )}
                    </div>

                    <div className="bg-background/50 rounded-lg p-4 border border-border">
                      <p className="text-sm text-muted-foreground mb-1">Auto-Renewal</p>
                      <p className="text-lg font-semibold text-foreground">Manual</p>
                      <p className="text-xs text-muted-foreground mt-1">Will expire without manual renewal</p>
                    </div>

                    <div className="bg-background/50 rounded-lg p-4 border border-border">
                      <p className="text-sm text-muted-foreground mb-1">Pricing</p>
                      <p className="text-lg font-semibold text-foreground">
                        ${status.tier === "pro+" ? "30" : "10"}/month
                      </p>
                    </div>
                  </>
                )}

                {!status.isPro && (
                  <div className="bg-background/50 rounded-lg p-4 border border-border">
                    <p className="text-sm text-muted-foreground mb-1">Next Tier</p>
                    <p className="text-lg font-semibold text-foreground">Pro ($10/month)</p>
                  </div>
                )}
              </div>

              {/* Expiry Warning */}
              {status.isPro && daysRemaining !== null && daysRemaining <= 7 && (
                <div className="flex gap-3 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-amber-900 dark:text-amber-100">Expiring Soon</p>
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                      Your subscription expires in {daysRemaining} day{daysRemaining !== 1 ? "s" : ""}. Renew now to maintain access.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Airpoints Section */}
        <AirpointsDisplay showHistory={true} showRedemption={true} />

        {/* Mock Testing Section */}
        <Card className="border-dashed border-amber-500/50 bg-amber-50/30 dark:bg-amber-950/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Gift className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              Testing & Simulation
            </CardTitle>
            <CardDescription>Mock Airpoints earning for development testing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button
                onClick={handleSimulateEarn}
                disabled={!status.isPro || simulatingEarn || earnLoading}
                className="w-full bg-blue-600 dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-700 text-white"
              >
                {simulatingEarn || earnLoading ? "Earning..." : "Simulate Earn (+25 pts)"}
              </Button>
              <p className="text-xs text-muted-foreground">
                {!status.isPro
                  ? "Upgrade to Pro to test earning"
                  : "Click to simulate earning 25 Airpoints from a cleanup scan action"}
              </p>

              {/* Pro Activation/Sync Test */}
              <div className="border-t pt-3 mt-3">
                <p className="text-xs font-semibold text-muted-foreground mb-2">Subscription Sync Tests:</p>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={() => {
                      downgradeToFree()
                      toast.info("Downgraded to Free (Airpoints tier synced)", {
                        position: "bottom-right",
                        className: "bg-amber-600 text-white",
                      })
                    }}
                    disabled={!status.isPro}
                    size="sm"
                    variant="outline"
                    className="text-xs"
                  >
                    Test Downgrade
                  </Button>
                  <Button
                    onClick={async () => {
                      await upgradeToPro("pro", 30)
                      toast.success("Upgraded to Pro + Airpoints synced!", {
                        position: "bottom-right",
                        className: "bg-blue-600 dark:bg-blue-600 text-white",
                      })
                    }}
                    size="sm"
                    variant="outline"
                    className="text-xs"
                  >
                    Test Pro Activation
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Your Features</CardTitle>
            <CardDescription>Available features in your current tier</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    status.isPro ? "bg-blue-500" : "bg-gray-300"
                  }`}
                >
                  {status.isPro && <span className="text-white text-sm">✓</span>}
                </div>
                <span className={status.isPro ? "text-foreground" : "text-muted-foreground opacity-50"}>
                  Unlimited wallet cleanup & analysis
                </span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    status.isPro ? "bg-blue-500" : "bg-gray-300"
                  }`}
                >
                  {status.isPro && <span className="text-white text-sm">✓</span>}
                </div>
                <span className={status.isPro ? "text-foreground" : "text-muted-foreground opacity-50"}>
                  Advanced transaction analysis
                </span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    status.isPro ? "bg-blue-500" : "bg-gray-300"
                  }`}
                >
                  {status.isPro && <span className="text-white text-sm">✓</span>}
                </div>
                <span className={status.isPro ? "text-foreground" : "text-muted-foreground opacity-50"}>
                  Smart alerts & auto-rules
                </span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    status.tier === "pro+" ? "bg-blue-500" : "bg-gray-300"
                  }`}
                >
                  {status.tier === "pro+" && <span className="text-white text-sm">✓</span>}
                </div>
                <span className={status.tier === "pro+" ? "text-foreground" : "text-muted-foreground opacity-50"}>
                  {status.tier === "pro+" ? "3x Airpoints multiplier" : "Airpoints multiplier (Pro+ only)"}
                </span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    status.tier === "pro+" ? "bg-blue-500" : "bg-gray-300"
                  }`}
                >
                  {status.tier === "pro+" && <span className="text-white text-sm">✓</span>}
                </div>
                <span className={status.tier === "pro+" ? "text-foreground" : "text-muted-foreground opacity-50"}>
                  {status.tier === "pro+" ? "+10% staking APY boost" : "Staking APY boost (Pro+ only)"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-4">
          {!status.isPro ? (
            <div className="md:col-span-2">
              <Button onClick={handleUpgrade} size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                <Crown className="w-4 h-4 mr-2" />
                Upgrade to Pro
              </Button>
            </div>
          ) : (
            <>
              {status.tier === "pro" && (
                <Button onClick={handleUpgrade} size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade to Pro+
                </Button>
              )}

              <Button onClick={handleCancel} size="lg" variant="destructive" className="w-full">
                Cancel Subscription
              </Button>
            </>
          )}
        </div>

        {/* Help Section */}
        <Card className="bg-blue-500/5 border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-base">Need Help?</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>• All subscriptions are processed in USD and billed monthly</p>
            <p>• You can cancel anytime - no hidden fees or long-term commitments</p>
            <p>• Airpoints are earned monthly and reset at the end of each billing cycle</p>
            <p>• Questions? Visit our support page or contact support@atlasprotocol.io</p>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}
