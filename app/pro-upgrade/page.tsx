"use client"

import { Button } from "@/components/ui/button"
import { useProStatus } from "@/hooks/use-pro-status"
import { useSupabaseUser } from "@/hooks/use-supabase-user"
import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LemonSqueezyCheckout } from "@/components/lemon-squeezy-checkout"
import { Card } from "@/components/ui/card"
import { Check, X, Crown, Zap, AlertCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

export default function ProUpgradePage() {
  const router = useRouter()
  const { status, upgradeToPro, isLoading } = useProStatus()
  const { user: supabaseUser } = useSupabaseUser()
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [selectedTier, setSelectedTier] = useState<"pro" | "pro+">("pro")
  const [formData, setFormData] = useState({ email: "", cardNumber: "" })
  const [isProcessing, setIsProcessing] = useState(false)

  const plans = [
    {
      tier: "free",
      name: "Free",
      price: "$0",
      description: "Perfect for getting started",
      features: [
        { name: "Basic transaction analysis", included: true },
        { name: "Wallet cleanup (1 wallet)", included: true },
        { name: "Auto-rules", included: false },
        { name: "Smart alerts", included: false },
        { name: "Unlimited API calls", included: false },
        { name: "Custom staking rates", included: false },
        { name: "Airpoints earning", included: false },
        { name: "Priority support", included: false },
        { name: "Advertising discounts", included: false },
      ],
      cta: "Current Plan",
      ctaDisabled: status.tier === "free",
    },
    {
      tier: "pro",
      name: "Pro",
      price: "$10",
      period: "/month",
      description: "For active traders",
      popular: true,
      features: [
        { name: "Basic transaction analysis", included: true },
        { name: "Wallet cleanup (unlimited)", included: true },
        { name: "Auto-rules", included: true },
        { name: "Smart alerts", included: true },
        { name: "Unlimited API calls", included: true },
        { name: "Custom staking rates (5%+ APY boost)", included: true },
        { name: "Airpoints earning (1x)", included: true },
        { name: "Email support", included: true },
        { name: "Advertising discounts (20%)", included: true },
      ],
      cta: "Upgrade to Pro",
      ctaDisabled: status.tier === "pro",
    },
    {
      tier: "pro+",
      name: "Pro+",
      price: "$30",
      period: "/month",
      description: "For serious investors",
      features: [
        { name: "Basic transaction analysis", included: true },
        { name: "Wallet cleanup (unlimited)", included: true },
        { name: "Auto-rules (unlimited)", included: true },
        { name: "Smart alerts (unlimited)", included: true },
        { name: "Unlimited API calls", included: true },
        { name: "Custom staking rates (10%+ APY boost)", included: true },
        { name: "Airpoints earning (3x)", included: true },
        { name: "Priority support 24/7", included: true },
        { name: "Advertising discounts (50%)", included: true },
      ],
      cta: "Upgrade to Pro+",
      ctaDisabled: status.tier === "pro+",
    },
  ]

  const handleUpgradeClick = (tier: "pro" | "pro+") => {
    setSelectedTier(tier)
    setCheckoutOpen(true)
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.cardNumber) {
      toast({ title: "Error", description: "Please fill in all fields" })
      return
    }

    // Check if user is authenticated
    if (!supabaseUser) {
      toast({ 
        title: "Authentication Required", 
        description: "Please sign in to upgrade your subscription" 
      })
      return
    }

    setIsProcessing(true)

    try {
      // Call upgradeToPro which handles both Supabase and localStorage
      const expiryDays = 30
      await upgradeToPro(selectedTier, expiryDays)

      toast({
        title: "Success!",
        description: `Pro activated (mock mode). You have ${expiryDays} days of ${selectedTier.toUpperCase()} access.`,
      })

      setCheckoutOpen(false)
      setFormData({ email: "", cardNumber: "" })

      // Redirect to hub after success
      setTimeout(() => {
        router.push("/hub")
      }, 1500)
    } catch (error) {
      console.error("[v0] Checkout error:", error)
      toast({
        title: "Error",
        description: "Failed to activate subscription. Please try again.",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleLemonCheckoutSuccess = async () => {
    console.log("[v0] Lemon Squeezy checkout completed")
    // For authenticated users, Lemon Squeezy webhook will handle subscription creation
    // For mock mode, trigger the upgrade
    if (!supabaseUser) {
      try {
        const expiryDays = 30
        await upgradeToPro(selectedTier, expiryDays)

        toast({
          title: "Success!",
          description: `Pro activated (mock mode). You have ${expiryDays} days of ${selectedTier.toUpperCase()} access.`,
        })

        setCheckoutOpen(false)
        setFormData({ email: "", cardNumber: "" })

        // Redirect to hub after success
        setTimeout(() => {
          router.push("/hub")
        }, 1500)
      } catch (error) {
        console.error("[v0] Mock checkout error:", error)
        toast({
          title: "Error",
          description: "Failed to activate subscription.",
        })
      }
    } else {
      // For real Lemon Squeezy checkouts, just show success and close modal
      toast({
        title: "Success!",
        description: "Your subscription is being processed. Check your email for confirmation.",
      })
      setCheckoutOpen(false)

      setTimeout(() => {
        router.push("/hub")
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 dark:from-slate-950 dark:to-slate-900/50">
      {/* Header */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block">
            ← Back to Atlas
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Upgrade to Pro</h1>
          <p className="text-lg text-muted-foreground">Unlock advanced analysis, unlimited features, and boost your earnings</p>
        </div>
      </div>

      {/* Auth Notice */}
      {!supabaseUser && (
        <div className="bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200 dark:border-amber-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-900 dark:text-amber-200 mb-1">Sign In to Upgrade</p>
              <p className="text-sm text-amber-800 dark:text-amber-300">You need to be signed in to purchase a subscription. Non-signed-in upgrades use mock localStorage.</p>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="bg-blue-50 dark:bg-blue-950/30 border-b border-blue-200 dark:border-blue-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <p className="text-sm text-blue-600 dark:text-blue-300">Loading subscription status...</p>
          </div>
        </div>
      )}

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.tier}
              className={cn(
                "relative flex flex-col transition-all duration-300",
                plan.popular && "md:scale-105 md:shadow-2xl dark:shadow-blue-500/20 border-2 border-blue-500 dark:border-blue-500",
                !plan.popular && "md:shadow-lg"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-500 dark:to-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                {/* Tier Info */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    {plan.popular && <Crown className="w-5 h-5 text-blue-500 dark:text-blue-500" />}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  onClick={() => {
                    if (plan.tier === "free") {
                      router.push("/")
                    } else {
                      handleUpgradeClick(plan.tier as "pro" | "pro+")
                    }
                  }}
                  disabled={plan.ctaDisabled}
                  className={cn(
                    "w-full mb-6 h-10 font-semibold",
                    plan.popular
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-500 dark:to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                      : ""
                  )}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>

                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature.name} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground/50 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={cn("text-sm", !feature.included && "text-muted-foreground/60")}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t">
        <h2 className="text-2xl font-bold mb-8">Why Upgrade?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Zap,
              title: "Faster Analysis",
              description: "Lightning-fast transaction parsing with unlimited API calls"
            },
            {
              icon: Crown,
              title: "Maximum Earnings",
              description: "3x Airpoints multiplier and 10%+ APY staking boost on Pro+"
            },
            {
              icon: Zap,
              title: "Smart Automation",
              description: "Set unlimited auto-rules and get real-time smart alerts"
            },
          ].map((item, idx) => (
            <Card key={idx} className="p-6">
              <item.icon className="w-8 h-8 text-blue-500 dark:text-blue-500 mb-3" />
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Checkout Modal */}
      {checkoutOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold mb-2">
                {selectedTier === "pro" ? "Pro - $10/month" : "Pro+ - $30/month"}
              </h2>
              <p className="text-sm text-muted-foreground mb-6">Secure payment via Lemon Squeezy</p>

              {!supabaseUser && (
                <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-3 text-sm mb-4">
                  <p className="font-medium text-amber-900 dark:text-amber-200 mb-1">Test Mode Active</p>
                  <p className="text-amber-800 dark:text-amber-300">You're not signed in. Upgrade will use mock checkout (localStorage only).</p>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg bg-background"
                  />
                </div>

                <LemonSqueezyCheckout
                  tier={selectedTier}
                  email={formData.email || supabaseUser?.email || ""}
                  onSuccess={handleLemonCheckoutSuccess}
                  onError={(error) => {
                    toast({ title: "Error", description: error })
                  }}
                />

                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => setCheckoutOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
