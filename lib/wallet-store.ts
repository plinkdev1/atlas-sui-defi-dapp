"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface WalletStore {
  currentAccount: string | null
  walletName: string | null
  isConnected: boolean
  authToken: string | null
  isAuthenticated: boolean
  analyticsOptOut: boolean
  setCurrentAccount: (account: string | null) => void
  setWalletName: (name: string | null) => void
  setIsConnected: (connected: boolean) => void
  setAuthToken: (token: string | null) => void
  setIsAuthenticated: (authenticated: boolean) => void
  setAnalyticsOptOut: (optOut: boolean) => void
  disconnect: () => void
}

export const useWalletStore = create<WalletStore>()(
  persist(
    (set) => ({
      currentAccount: null,
      walletName: null,
      isConnected: false,
      authToken: null,
      isAuthenticated: false,
      analyticsOptOut: false,
      setCurrentAccount: (account: string | null) => set({ currentAccount: account }),
      setWalletName: (name: string | null) => set({ walletName: name }),
      setIsConnected: (connected: boolean) => set({ isConnected: connected }),
      setAuthToken: (token: string | null) => set({ authToken: token }),
      setIsAuthenticated: (authenticated: boolean) => set({ isAuthenticated: authenticated }),
      setAnalyticsOptOut: (optOut: boolean) => set({ analyticsOptOut: optOut }),
      disconnect: () =>
        set({
          currentAccount: null,
          walletName: null,
          isConnected: false,
          authToken: null,
          isAuthenticated: false,
          analyticsOptOut: false,
        }),
    }),
    {
      name: "atlas-wallet-storage",
    },
  ),
)
