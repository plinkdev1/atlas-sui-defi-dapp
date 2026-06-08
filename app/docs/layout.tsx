"use client"

import type React from "react"
import Link from "next/link"
import { ChevronRight, Menu, X } from "lucide-react"
import { useState, Suspense } from "react"
import { DocsSearch } from "@/components/docs-search"

const docs = [
  { title: "Overview", href: "/docs" },
  { title: "Getting Started", href: "/docs#start" },
  { title: "Wallet Cleanup", href: "/docs/wallet-cleanup" },
  { title: "Transaction Explainer", href: "/docs/transaction-explainer" },
  { title: "Infra Discovery", href: "/docs/infra-discovery" },
  { title: "Blockchains", href: "/docs/blockchains" },
  { title: "Wallet Integration", href: "/docs#integration" },
  { title: "API & Payments", href: "/docs#api" },
  { title: "Troubleshooting", href: "/docs#faq" },
]

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      {/* Mobile Hamburger */}
      <div className="fixed top-20 left-4 z-40 md:hidden">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`fixed md:static w-64 border-r border-border bg-background/50 backdrop-blur p-6 sticky top-20 h-[calc(100vh-80px)] overflow-y-auto transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          } md:translate-x-0 z-30`}
        >
          <h2 className="text-lg font-bold mb-4 text-blue-400">Documentation</h2>
          <div className="mb-6">
            <DocsSearch />
          </div>
          <nav className="space-y-2">
            {docs.map((doc) => (
              <Link
                key={doc.href}
                href={doc.href}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-blue-500/10 hover:text-blue-400 transition-colors"
              >
                <ChevronRight className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{doc.title}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main Content */}
        <div className="flex-1 p-6 md:p-8 max-w-5xl mx-auto">
          <Suspense fallback={<div>Loading...</div>}>
            {children}
          </Suspense>
        </div>
      </div>
    </div>
  )
}
