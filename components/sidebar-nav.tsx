"use client"

import React, { useMemo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Home,
  Sparkles,
  FileSearch,
  Network,
  Zap,
  Settings,
  BarChart3,
  Coins,
  Gift,
  Crown,
  Rocket,
} from "lucide-react"
import { useSupabaseUser } from "@/hooks/use-supabase-user"
import { useProStatus } from "@/lib/pro-status-context"
import useSWR from "swr"

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
}

interface NavGroup {
  title: string
  items: NavItem[]
}

export function SidebarNav() {
  const pathname = usePathname()
  const { user } = useSupabaseUser()
  const { status } = useProStatus()
  
  // Fetch airpoints data
  const { data: airpointsData } = useSWR(
    user?.id ? `/api/airpoints?userId=${user.id}` : null,
    (url) => fetch(url).then((r) => r.json()),
  )

  const airpointsBalance = airpointsData?.balance || 0
  const airpointsTier = airpointsData?.tier || status.tier || "Free"

  const navGroups: NavGroup[] = useMemo(
    () => [
      {
        title: "MAIN",
        items: [
          { label: "Dashboard", href: "/", icon: Home },
          { label: "Hub", href: "/hub", icon: Zap },
        ],
      },
      {
        title: "TOOLS",
        items: [
          { label: "Wallet Cleanup", href: "/wallet-cleanup", icon: Sparkles },
          { label: "Tx Explainer", href: "/transaction-explainer", icon: FileSearch },
          { label: "Infra Discovery", href: "/infra-discovery", icon: Network },
        ],
      },
      {
        title: "DEFI",
        items: [
          { label: "Swap", href: "/swap-aggregator", icon: Coins },
          { label: "Stake", href: "/stake-hub", icon: BarChart3 },
          { label: "Bridge Hub", href: "/bridge-hub", icon: Network },
          { label: "Oracle Feeds", href: "/oracle-feeds", icon: Zap },
        ],
      },
      {
        title: "MORE",
        items: [
          { label: "Explorer", href: "/explorer", icon: BarChart3 },
          { label: "NFT", href: "/nft", icon: Gift },
          { label: "Subscription", href: "/subscription", icon: Crown },
          { label: "Settings", href: "/settings", icon: Settings },
        ],
      },
    ],
    [],
  )

  return (
    <nav className="flex flex-col h-full">
      {/* Nav Groups */}
      <div className="flex-1 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.title} className="mb-6 px-3">
            {/* Group Title */}
            <div className="mb-3">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide opacity-60">
                {group.title}
              </h3>
            </div>

            {/* Group Items */}
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "sidebar-nav-item flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-primary/10 text-primary border-l-2 border-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-card/50 border-l-2 border-transparent",
                    )}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Airpoints Loyalty Card */}
      {user && (
        <div className="border-t border-border/10 p-3 mt-4">
          <div className="glass-panel p-3 space-y-2">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Rocket className="w-4 h-4 text-accent" />
                <span className="text-xs font-semibold text-foreground">Airpoints</span>
              </div>
              <div className="flex items-center gap-1">
                <Crown className="w-3 h-3 text-accent" />
                <span className="text-xs font-bold text-accent">{airpointsTier}</span>
              </div>
            </div>

            {/* Points Balance */}
            <div className="bg-background/50 rounded-lg p-2">
              <div className="text-xs text-muted-foreground mb-1">Balance</div>
              <div className="text-sm font-mono font-bold text-primary">{airpointsBalance.toLocaleString()}</div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="w-full h-1.5 bg-background/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent"
                  style={{
                    width: `${Math.min((airpointsBalance / 10000) * 100, 100)}%`,
                  }}
                />
              </div>
              <div className="text-xs text-muted-foreground">
                {Math.min(Math.round((airpointsBalance / 10000) * 100), 100)}% to next tier
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/subscription"
              className="text-xs font-medium text-accent hover:text-primary transition-colors mt-2 block text-center py-1 rounded hover:bg-accent/10"
            >
              Upgrade
            </Link>
          </div>
        </div>
      )}

      {/* System Status Footer */}
      <div className="border-t border-border/10 p-3 mt-2">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card/30">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-xs text-muted-foreground">Sui Mainnet: Operational</span>
        </div>
      </div>
    </nav>
  )
}
