"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if user has consented in the last 20 days
    const checkConsent = async () => {
      try {
        const identifier = getIdentifier()
        const response = await fetch(`/api/cookies/check?id=${identifier}`)
        const data = await response.json()

        if (!data.hasValidConsent) {
          setIsVisible(true)
        }
      } catch (error) {
        console.error("Error checking consent:", error)
        setIsVisible(true)
      }
    }

    checkConsent()
  }, [])

  const getIdentifier = () => {
    // Try to get wallet address from storage or use a session-based identifier
    try {
      const stored = localStorage.getItem("atlas_user_id")
      return stored || `session_${Date.now()}`
    } catch {
      return `session_${Date.now()}`
    }
  }

  const handleAcceptAll = async () => {
    setIsLoading(true)
    try {
      const identifier = getIdentifier()
      await fetch("/api/cookies/consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_identifier: identifier,
          analytics_accepted: true,
          marketing_accepted: true,
          essential_accepted: true,
        }),
      })
      setIsVisible(false)
    } catch (error) {
      console.error("Error saving consent:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRejectOptional = async () => {
    setIsLoading(true)
    try {
      const identifier = getIdentifier()
      await fetch("/api/cookies/consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_identifier: identifier,
          analytics_accepted: false,
          marketing_accepted: false,
          essential_accepted: true,
        }),
      })
      setIsVisible(false)
    } catch (error) {
      console.error("Error saving consent:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-sm" role="region" aria-label="Cookie preferences">
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-2">Cookie & Privacy Settings</h3>
            <p className="text-sm text-muted-foreground">
              We use essential cookies for functionality and optional cookies for analytics to improve your experience.
              Please review our{" "}
              <a href="/privacy-policy" className="underline hover:text-foreground">
                privacy policy
              </a>{" "}
              for details.
            </p>
          </div>
          <div className="flex gap-2 md:flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRejectOptional}
              disabled={isLoading}
              className="whitespace-nowrap bg-transparent"
            >
              Reject Optional
            </Button>
            <Button size="sm" onClick={handleAcceptAll} disabled={isLoading} className="whitespace-nowrap">
              Accept All
            </Button>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 md:relative md:top-auto md:right-auto p-1 text-muted-foreground hover:text-foreground"
            aria-label="Close cookie banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
