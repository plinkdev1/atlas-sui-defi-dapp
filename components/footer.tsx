"use client"

import { useState } from "react"
import Link from "next/link"
import { AdCarousel } from "@/components/ad-carousel"
import { AdManagementModal } from "@/components/ad-management-modal"
import { INITIAL_ADS } from "@/lib/ads-data"
import type { FooterAd } from "@/lib/ads-data"

export function Footer() {
  const [ads, setAds] = useState<FooterAd[]>(INITIAL_ADS)
  const [showAdModal, setShowAdModal] = useState(false)

  return (
    <footer className="mt-20 border-t border-border bg-background relative overflow-hidden">
      {/* Decorative Background Coin Element */}
      <div className="absolute -top-20 -right-32 w-96 h-96 opacity-30 dark:opacity-40 pointer-events-none animate-float-coin scale-75 z-0">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "url('/images/3d-coin.png')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>
      
      {/* Theme-aware gradient fade overlay */}
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background/60 to-background pointer-events-none z-[1]" />
      
      {/* Ad Carousel Section */}
      <div className="container mx-auto px-4 py-8 md:py-10 relative z-10">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Featured Partners</h3>
            <button
              onClick={() => setShowAdModal(true)}
              className="text-xs text-primary hover:text-primary/80 underline"
            >
              Manage Ads
            </button>
          </div>
          <AdCarousel ads={ads} />
        </div>
      </div>

      {/* Footer Divider */}
      <div className="border-t border-border/50 relative z-10"></div>

      {/* Footer Content */}
      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h4 className="mb-4 font-semibold text-foreground">Atlas Protocol</h4>
            <p className="text-sm text-muted-foreground">
              Your comprehensive toolkit for blockchain infrastructure on Sui.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Tools</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/wallet-cleanup" className="text-muted-foreground hover:text-foreground transition-colors">
                  Wallet Cleanup
                </a>
              </li>
              <li>
                <a
                  href="/transaction-explainer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Transaction Explainer
                </a>
              </li>
              <li>
                <a href="/infra-discovery" className="text-muted-foreground hover:text-foreground transition-colors">
                  Infra Discovery
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/provider-dashboard" className="text-primary hover:text-primary/80 font-medium transition-colors">
                  Provider Dashboard →
                </a>
              </li>
              <li>
                <a href="/subscription" className="text-muted-foreground hover:text-foreground transition-colors">
                  Subscription & Billing
                </a>
              </li>
              <li>
                <a href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </a>
              </li>
              <li>
                <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <a
                  href="/contact/partnership"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="https://sui.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sui Network
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/sui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Discord
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms-of-service" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Atlas Protocol. All rights reserved.</p>
        </div>
      </div>

      {/* Ad Management Modal */}
      <AdManagementModal open={showAdModal} onOpenChange={setShowAdModal} />
    </footer>
  )
}
