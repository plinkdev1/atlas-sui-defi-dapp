"use client"

import type React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { validateAdminCredentialsViaAPI } from "@/lib/admin-auth"

import { useEffect, useState } from "react"
import { PARTNERS } from "@/lib/partners-data"
import { ChevronDown, Copy, Plus, Trash2, LogOut } from "lucide-react"
import { getAdminAuthFromStorage, setAdminAuthToStorage, isDevMode } from "@/lib/admin-auth"

export default function PartnersAdminPage() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [localPartners, setLocalPartners] = useState(PARTNERS)
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    const checkAdmin = () => {
      if (isDevMode()) {
        setIsAdmin(true)
        return
      }
      const isAuthenticated = getAdminAuthFromStorage()
      setIsAdmin(isAuthenticated)
      if (!isAuthenticated) {
        setShowLoginForm(true)
      }
    }
    checkAdmin()
  }, [])

  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")
    setIsLoggingIn(true)

    try {
      const isValid = await validateAdminCredentialsViaAPI(username, password)
      if (isValid) {
        setAdminAuthToStorage(true)
        setIsAdmin(true)
        setShowLoginForm(false)
        setUsername("")
        setPassword("")
      } else {
        setLoginError("Invalid credentials. Please try again.")
      }
    } catch (error) {
      setLoginError("Login failed. Please try again.")
    } finally {
      setIsLoggingIn(false)
    }
  }

  const handleLogout = () => {
    setAdminAuthToStorage(false)
    setIsAdmin(false)
    setShowLoginForm(true)
    setUsername("")
    setPassword("")
  }

  const handleCopyJSON = () => {
    const json = JSON.stringify(localPartners, null, 2)
    navigator.clipboard.writeText(json)
    alert("Partners JSON copied to clipboard!")
  }

  const handleExportJSON = () => {
    const json = JSON.stringify(localPartners, null, 2)
    const blob = new Blob([json], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "partners-data.json"
    a.click()
  }

  if (!isAdmin || showLoginForm) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-lg border border-border bg-card p-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">Admin Access</h1>
            <p className="text-muted-foreground mb-6">Enter your credentials to access the admin panel.</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {loginError && (
                <div className="px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-sm">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-all"
              >
                Login
              </button>
            </form>

            <div className="mt-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-xs text-blue-300">
                💡 Tip: Default credentials are admin/admin123 (in development mode, no login required)
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      <div className="flex-1 p-6 md:p-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Partners & Sponsors Admin</h1>
              <p className="text-muted-foreground">Manage ecosystem partners and advertising placements</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600/40 hover:bg-red-600/60 text-red-200 rounded-lg border border-red-500/30 transition-all"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>

          {/* Quick Actions */}
          <div className="mb-8 flex gap-3 flex-wrap">
            <button
              onClick={handleCopyJSON}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600/40 hover:bg-purple-600/60 text-purple-200 rounded-lg border border-purple-500/30 transition-all"
            >
              <Copy className="h-4 w-4" />
              Copy JSON
            </button>
            <button
              onClick={handleExportJSON}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600/40 hover:bg-blue-600/60 text-blue-200 rounded-lg border border-blue-500/30 transition-all"
            >
              <ChevronDown className="h-4 w-4" />
              Export JSON
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600/40 hover:bg-green-600/60 text-green-200 rounded-lg border border-green-500/30 transition-all">
              <Plus className="h-4 w-4" />
              Add Partner
            </button>
          </div>

          {/* JSON Editor Preview */}
          <div className="mb-8 rounded-lg bg-gray-900/40 border border-gray-700/40 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Partners Data (Read-Only Preview)</h2>
            <div className="bg-black rounded p-4 overflow-x-auto max-h-96 overflow-y-auto">
              <pre className="text-xs text-gray-400 font-mono whitespace-pre-wrap break-words">
                {JSON.stringify(localPartners, null, 2)}
              </pre>
            </div>
          </div>

          {/* Partners Table */}
          <div className="rounded-lg bg-gray-900/40 border border-gray-700/40 overflow-hidden">
            <table className="w-full text-sm text-gray-300">
              <thead className="bg-gray-800/40 border-b border-gray-700/40">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-white">Partner</th>
                  <th className="text-left px-4 py-3 font-semibold text-white">Website</th>
                  <th className="text-left px-4 py-3 font-semibold text-white">Chains</th>
                  <th className="text-left px-4 py-3 font-semibold text-white">Badge</th>
                  <th className="text-left px-4 py-3 font-semibold text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {localPartners.map((partner) => (
                  <tr key={partner.id} className="border-b border-gray-700/20 hover:bg-gray-800/20 transition-all">
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium text-white">{partner.name}</div>
                        <div className="text-xs text-gray-500">{partner.tagline}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline text-xs"
                      >
                        {partner.website.replace("https://", "")}
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 flex-wrap">
                        {partner.chains.map((chain) => (
                          <span
                            key={chain}
                            className="px-2 py-1 rounded text-xs bg-purple-500/20 text-purple-300 border border-purple-400/30"
                          >
                            {chain}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {partner.badge && (
                        <span className="px-2 py-1 rounded text-xs bg-yellow-500/20 text-yellow-300 border border-yellow-400/30">
                          {partner.badge}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-red-400 hover:text-red-300 transition-all">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Documentation */}
          <div className="mt-8 rounded-lg bg-blue-500/10 border border-blue-500/30 p-6">
            <h3 className="font-bold text-blue-300 mb-2">📝 Admin Notes</h3>
            <ul className="text-sm text-blue-300/80 space-y-2">
              <li>✓ This page now requires authentication in production</li>
              <li>✓ Development mode auto-authenticates for convenience</li>
              <li>✓ Currently loads hardcoded partner data from lib/partners-data.ts</li>
              <li>✓ Copy JSON to integrate with backend/database</li>
              <li>✓ To add partners: Edit lib/partners-data.ts and add entries to PARTNERS array</li>
              <li>✓ Future: Replace with dynamic admin interface + database persistence</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
