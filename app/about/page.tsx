"use client"

import Link from "next/link"
import { ArrowLeft, Shield, Database, Map, Zap, Users, Coins } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Hero Section */}
        <section className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
            <Database className="w-6 h-6" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-balance bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Atlas Protocol
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Security & Infrastructure Hub for Sui and Move Ecosystems
          </p>
        </section>

        {/* Overview Section */}
        <section className="mb-16 max-w-4xl mx-auto">
          <div className="bg-muted/50 rounded-lg p-8 md:p-12 border border-border">
            <h2 className="text-3xl font-bold mb-6">Unified Platform for Web3 Infrastructure</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Atlas Protocol is a comprehensive toolkit designed for the Sui and Move ecosystems. We provide three core
              modules that work together seamlessly: secure wallet management, transaction analysis, and infrastructure
              discovery. Built RFP-aligned with a Sui-first approach and a roadmap for multichain expansion to Aptos,
              Ethereum, Mina Protocol, IOTA, and Monad.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our mission is to empower developers and users with the tools needed to navigate blockchain infrastructure
              with confidence, security, and clarity.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-12 text-center">Core Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Wallet Cleanup */}
            <div className="p-8 rounded-lg border border-border hover:border-primary/50 transition-colors">
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-green-500/10 text-green-500">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Wallet Cleanup</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>✓ Scam detection & classification</li>
                <li>✓ Fetch all NFTs & tokens</li>
                <li>✓ Bulk hide/burn operations</li>
                <li>✓ Community voting on assets</li>
                <li>✓ 11+ wallet support</li>
              </ul>
            </div>

            {/* Transaction Explainer */}
            <div className="p-8 rounded-lg border border-border hover:border-primary/50 transition-colors">
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-500/10 text-blue-500">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Transaction Explainer</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>✓ Human-readable summaries</li>
                <li>✓ Security flags & risk scoring</li>
                <li>✓ Object change tracking</li>
                <li>✓ Gas fee breakdown</li>
                <li>✓ Full JSON exploration</li>
              </ul>
            </div>

            {/* Infra Discovery */}
            <div className="p-8 rounded-lg border border-border hover:border-primary/50 transition-colors">
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-purple-500/10 text-purple-500">
                <Map className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Infra Discovery</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>✓ 50+ infrastructure providers</li>
                <li>✓ RPC, gateways, validators</li>
                <li>✓ Advanced filtering & search</li>
                <li>✓ Export full registry (JSON)</li>
                <li>✓ Payment tier system</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Token & Revenue Section */}
        <section className="mb-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary/5 via-background to-primary/5 rounded-lg p-8 md:p-12 border border-primary/20">
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <Coins className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Token & Revenue Model</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  <strong>$ATLAS Token:</strong> Utility and governance token powering the Atlas Protocol ecosystem.
                  Used for provider payments, tier upgrades, and governance decisions. Features automatic buybacks from
                  platform revenue.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Revenue Model:</strong> 20% Atlas Protocol fee, 80% provider share. Transparent on-chain
                  payment processing via Move smart contracts. Multiple payment tiers for infrastructure providers with
                  volume-based discounts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16 max-w-4xl mx-auto">
          <div className="bg-muted/50 rounded-lg p-8 md:p-12 border border-border">
            <div className="flex items-start gap-4 mb-6">
              <Users className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold mb-4">Built by Treezure Labs</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We are actively seeking partners, collaborators, and investors to expand Atlas Protocol across
                  multiple blockchains and scale the infrastructure discovery network. Join us in building the future of
                  blockchain tooling.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mb-16 text-center">
          <h2 className="text-3xl font-bold mb-8">Get Started Today</h2>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/hub">
              <Button size="lg" className="gap-2">
                <Zap className="w-4 h-4" />
                Launch Hub
              </Button>
            </Link>
            <Link href="/docs">
              <Button size="lg" variant="outline">
                Read Documentation
              </Button>
            </Link>
            <Link href="/contact/partnership">
              <Button size="lg" variant="outline">
                Partnership Inquiry
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer Info */}
        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Atlas Protocol – Empowering the Sui and Move ecosystems with security, transparency, and infrastructure
            discovery.
          </p>
          <div className="flex gap-6 justify-center text-sm text-muted-foreground">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Twitter
            </a>
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Discord
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
