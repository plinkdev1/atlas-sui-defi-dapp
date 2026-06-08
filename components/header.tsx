"use client"

import React, { memo, useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "@/lib/theme-provider"
import { useUnifiedWallet } from "@/lib/unified-wallet-context"
import { useSupabaseUser } from "@/hooks/use-supabase-user"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Menu, X, Wallet, LogOut } from "lucide-react"
import { ATLAS_BRANDING } from "@/lib/branding"
import { ThemeToggle } from "@/components/theme-toggle"
import { WalletConnectionModal } from "@/components/wallet-connection-modal"
import { MultichainNetworkSelector } from "@/components/multichain-network-selector"
import { toast } from "react-toastify"

function HeaderComponent() {
  const router = useRouter()
  const { user } = useSupabaseUser()
  const wallet = useUnifiedWallet()
  const { theme, toggleTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showWalletModal, setShowWalletModal] = useState(false)

  const handleConnectClick = useCallback(() => {
    setShowWalletModal(true)
  }, [])

  const handleDisconnect = useCallback(() => {
    wallet.disconnect()
    toast.success("Wallet disconnected")
  }, [wallet])

  const handleSignIn = useCallback(() => {
    router.push("/auth")
  }, [router])

  const shortenAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`

  return (
    <>
      <header className="w-full bg-card/50 backdrop-blur-xl border-b border-border/10 pt-safe">
        <div className="max-w-full px-4 md:px-6 py-3 flex items-center justify-between gap-4">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <div
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity duration-300"
              onClick={() => router.push("/")}
            >
              <img src={ATLAS_BRANDING.logoPath} alt={ATLAS_BRANDING.name} className="h-8 w-8" />
              <span className="font-bold text-foreground hidden sm:inline text-sm tracking-wide">{ATLAS_BRANDING.name}</span>
            </div>
          </div>

          {/* Center Search Bar (Desktop only) */}
          <div className="hidden md:flex flex-1 max-w-md items-center">
            <input
              type="text"
              placeholder="Search tokens, pools, or paste address..."
              className="w-full px-4 py-2 rounded-full bg-background/60 border border-border/30 text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
              readOnly
            />
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Airpoints Badge */}
            {user && (
              <div className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-secondary/30 border border-accent/30 hover:border-accent/50 transition-colors cursor-pointer">
                <div className="w-2 h-2 rounded-full bg-accent"></div>
                <span className="text-xs font-semibold text-foreground">Airpoints</span>
                <ChevronDown className="h-2.5 w-2.5 opacity-50" />
              </div>
            )}

            {/* Multichain Network Selector */}
            <MultichainNetworkSelector />

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Wallet Button */}
            {wallet.connected && wallet.address ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 text-xs font-medium hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    <span className="hidden sm:inline">{shortenAddress(wallet.address)}</span>
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel className="text-xs font-semibold">Wallet</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem disabled className="text-xs text-muted-foreground">
                    {wallet.walletName || "Connected Wallet"}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      navigator.clipboard.writeText(wallet.address || "")
                      toast.success("Address copied")
                    }}
                    className="text-xs cursor-pointer"
                  >
                    Copy Address
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDisconnect} className="text-xs text-destructive cursor-pointer">
                    <LogOut className="h-3 w-3 mr-2" />
                    Disconnect
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                size="sm"
                className="gap-2 text-xs font-medium bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                onClick={handleConnectClick}
              >
                <Wallet className="h-4 w-4" />
                <span className="hidden sm:inline">Connect</span>
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu - Simplified for new layout */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/10 bg-card/30 backdrop-blur px-4 py-3">
            <div className="space-y-1 text-xs">
              <p className="text-muted-foreground px-2">Navigation moved to sidebar and bottom nav</p>
              {!user && (
                <Button
                  size="sm"
                  className="w-full mt-2"
                  onClick={() => {
                    handleSignIn()
                    setMobileMenuOpen(false)
                  }}
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Wallet Connection Modal */}
      <WalletConnectionModal isOpen={showWalletModal} onClose={() => setShowWalletModal(false)} />
    </>
  )
}

export const Header = memo(HeaderComponent)
