"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Sparkles,
  Coins,
  ArrowRightLeft,
  MoreHorizontal,
  X,
  FileSearch,
  Network,
  BarChart3,
  Gauge,
  Search,
  Image,
  Settings,
  Gift,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"

const primaryNavItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/wallet-cleanup", label: "Cleanup", icon: Sparkles },
  { href: "/stake-hub", label: "Stake", icon: Coins },
  { href: "/swap-aggregator", label: "Swap", icon: ArrowRightLeft },
]

const moreNavItems = [
  { href: "/transaction-explainer", label: "Tx Explainer", icon: FileSearch },
  { href: "/infra-discovery", label: "Infra Discovery", icon: Network },
  { href: "/bridge-hub", label: "Bridge Hub", icon: Zap },
  { href: "/oracle-feeds", label: "Oracle Feeds", icon: Gauge },
  { href: "/explorer", label: "Explorer", icon: Search },
  { href: "/nft", label: "NFT Marketplace", icon: Image },
  { href: "/hub", label: "Hub", icon: BarChart3 },
  { href: "/subscription", label: "Subscription", icon: Gift },
  { href: "/settings", label: "Settings", icon: Settings },
]

export function MobileNav() {
  const pathname = usePathname()
  const [moreOpen, setMoreOpen] = useState(false)

  const isItemActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  const isMoreActive = moreNavItems.some((item) => isItemActive(item.href))

  return (
    <>
      {/* More Panel Overlay */}
      {moreOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setMoreOpen(false)}>
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
          <div
            className="absolute bottom-16 left-2 right-2 bg-card/95 backdrop-blur-xl border border-border/20 rounded-2xl shadow-2xl p-4 max-h-[60vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">More</h3>
              <button
                onClick={() => setMoreOpen(false)}
                className="p-1 rounded-lg hover:bg-background/50"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {moreNavItems.map((item) => {
                const Icon = item.icon
                const active = isItemActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMoreOpen(false)}
                    className={cn(
                      "flex flex-col items-center gap-1.5 p-3 rounded-xl text-center transition-all",
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs font-medium leading-tight">{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Nav Bar */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/20 bg-card/80 backdrop-blur-2xl md:hidden w-full"
        style={{ paddingBottom: "var(--safe-area-inset-bottom, 0px)" }}
      >
        <div className="flex items-center justify-between w-full px-1">
          {primaryNavItems.map((item) => {
            const Icon = item.icon
            const active = isItemActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex-1 flex flex-col items-center justify-center gap-0.5 py-3 px-2 text-xs font-medium transition-all duration-200 relative",
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {active && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-primary" />
                )}
                <Icon className={cn("h-5 w-5", active && "scale-110")} />
                <span className="text-xs font-semibold">{item.label}</span>
              </Link>
            )
          })}

          {/* More Button */}
          <button
            onClick={() => setMoreOpen(!moreOpen)}
            className={cn(
              "flex-1 flex flex-col items-center justify-center gap-0.5 py-3 px-2 text-xs font-medium transition-all duration-200 relative",
              moreOpen || isMoreActive
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {(moreOpen || isMoreActive) && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-primary" />
            )}
            <MoreHorizontal className={cn("h-5 w-5", moreOpen && "scale-110")} />
            <span className="text-xs font-semibold">More</span>
          </button>
        </div>
      </nav>
    </>
  )
}
