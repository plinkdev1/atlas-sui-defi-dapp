"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import type { FooterAd } from "@/lib/ads-data"

interface AdManagementModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AdManagementModal({ open, onOpenChange }: AdManagementModalProps) {
  const { toast } = useToast()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passwordInput, setPasswordInput] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)

  const [ads, setAds] = useState<FooterAd[]>([])
  const [isLoadingAds, setIsLoadingAds] = useState(false)

  const [title, setTitle] = useState("")
  const [tagline, setTagline] = useState("")
  const [link, setLink] = useState("")
  const [ctaText, setCtaText] = useState("Learn More")
  const [imagePreview, setImagePreview] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handlePasswordSubmit = async () => {
    setIsVerifying(true)
    setPasswordError("")

    try {
      const response = await fetch("/api/admin/verify-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput }),
      })

      if (response.ok) {
        setIsAuthenticated(true)
        setPasswordInput("")
        fetchAds()
      } else {
        const data = await response.json()
        setPasswordError(data.error || "Incorrect password")
        setPasswordInput("")
      }
    } catch (error) {
      console.error("[v0] Password verification failed:", error)
      setPasswordError("Verification failed. Please try again.")
      setPasswordInput("")
    } finally {
      setIsVerifying(false)
    }
  }

  const fetchAds = async () => {
    setIsLoadingAds(true)
    try {
      const response = await fetch("/api/ads?all=true")
      if (response.ok) {
        const data = await response.json()
        setAds(
          data.ads.map((ad: FooterAd) => ({
            id: ad.id,
            title: ad.title,
            tagline: ad.tagline,
            imageUrl: ad.imageUrl,
            linkUrl: ad.linkUrl,
            ctaText: ad.ctaText,
            active: ad.active,
            createdAt: new Date(ad.createdAt),
          })),
        )
      }
    } catch (error) {
      console.error("[v0] Failed to fetch ads:", error)
      toast({ title: "Error", description: "Failed to load ads", variant: "destructive" })
    } finally {
      setIsLoadingAds(false)
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setIsAuthenticated(false)
      setPasswordInput("")
      setPasswordError("")
      setAds([])
    }
    onOpenChange(newOpen)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddAd = async () => {
    if (!title || !imagePreview) {
      toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" })
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/ads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          tagline,
          image_url: imagePreview,
          link_url: link,
          cta_text: ctaText,
          active: true,
          position: ads.length,
        }),
      })

      if (response.ok) {
        toast({ title: "Success", description: "Ad created successfully" })
        setTitle("")
        setTagline("")
        setLink("")
        setCtaText("Learn More")
        setImagePreview("")
        await fetchAds()
      } else {
        throw new Error("Failed to create ad")
      }
    } catch (error) {
      console.error("[v0] Failed to create ad:", error)
      toast({ title: "Error", description: "Failed to create ad", variant: "destructive" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteAd = async (adId: string) => {
    if (!confirm("Are you sure you want to delete this ad?")) return

    try {
      const response = await fetch(`/api/ads/${adId}`, { method: "DELETE" })

      if (response.ok) {
        toast({ title: "Success", description: "Ad deleted successfully" })
        await fetchAds()
      } else {
        throw new Error("Failed to delete ad")
      }
    } catch (error) {
      console.error("[v0] Failed to delete ad:", error)
      toast({ title: "Error", description: "Failed to delete ad", variant: "destructive" })
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Manage Partner Ads</DialogTitle>
          <DialogDescription>Upload new banner ads (728x90 recommended)</DialogDescription>
        </DialogHeader>

        {!isAuthenticated ? (
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium">Admin Password</label>
              <Input
                type="password"
                placeholder="Enter admin password"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value)
                  setPasswordError("")
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !isVerifying) handlePasswordSubmit()
                }}
                disabled={isVerifying}
                className={passwordError ? "border-destructive" : ""}
              />
              {passwordError && <p className="text-sm text-destructive mt-1">{passwordError}</p>}
            </div>
            <div className="flex gap-2">
              <Button onClick={handlePasswordSubmit} disabled={isVerifying} className="flex-1">
                {isVerifying ? "Verifying..." : "Unlock"}
              </Button>
              <Button
                variant="outline"
                onClick={() => handleOpenChange(false)}
                disabled={isVerifying}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Current Ads List */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Active Ads ({ads.length})</h4>
              <div className="max-h-32 overflow-y-auto space-y-2">
                {isLoadingAds ? (
                  <p className="text-sm text-muted-foreground">Loading ads...</p>
                ) : ads.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No ads yet</p>
                ) : (
                  ads.map((ad) => (
                    <div key={ad.id} className="flex items-center justify-between text-sm p-2 bg-muted rounded">
                      <span className="truncate">{ad.title}</span>
                      <button
                        onClick={() => handleDeleteAd(ad.id)}
                        className="text-destructive hover:text-destructive/80 text-xs"
                      >
                        Remove
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Add New Ad Form */}
            <div className="space-y-3 pt-4 border-t">
              <div>
                <label className="text-sm font-medium">Title *</label>
                <Input
                  placeholder="e.g., Partner with Atlas"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Tagline</label>
                <Input placeholder="Brief description" value={tagline} onChange={(e) => setTagline(e.target.value)} />
              </div>

              <div>
                <label className="text-sm font-medium">Link URL</label>
                <Input placeholder="https://example.com" value={link} onChange={(e) => setLink(e.target.value)} />
              </div>

              <div>
                <label className="text-sm font-medium">CTA Button Text</label>
                <Input placeholder="e.g., Learn More" value={ctaText} onChange={(e) => setCtaText(e.target.value)} />
              </div>

              <div>
                <label className="text-sm font-medium">Banner Image * (728x90)</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-sm" />
                {imagePreview && (
                  <div className="mt-2 relative">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full max-h-24 object-cover rounded"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <Button onClick={handleAddAd} disabled={isSubmitting} className="flex-1">
                  {isSubmitting ? "Adding..." : "Add Ad"}
                </Button>
                <Button variant="outline" onClick={() => handleOpenChange(false)} className="flex-1">
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
