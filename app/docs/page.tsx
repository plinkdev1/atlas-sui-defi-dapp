"use client"

import Link from "next/link"
import { ArrowRight, BookOpen, Code2, Zap, Shield, Lock, Map, Layers, HelpCircle, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DocsOverview() {
  return (
    <div className="max-w-5xl">
      {/* Hero Section */}
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
          <Zap className="h-4 w-4 text-blue-400" />
          <span className="text-xs font-semibold text-blue-400">Documentation Hub</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-balance">Atlas Protocol Documentation</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl text-balance">
          Your comprehensive guide to security, infrastructure discovery, and developer tools on Sui blockchain. Learn
          how to maximize your blockchain experience.
        </p>
        <div className="flex gap-4 flex-wrap">
          <a href="/docs#intro">
            <Button size="lg" className="gap-2">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
          </a>
          <a href="/docs/blockchains">
            <Button size="lg" variant="outline" className="gap-2 bg-transparent">
              <BookOpen className="h-4 w-4" />
              Blockchain Guides
            </Button>
          </a>
        </div>
      </div>

      {/* Quick Links Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <a
          href="/docs/wallet-cleanup"
          className="group p-6 border border-border rounded-lg hover:border-blue-500/50 hover:bg-blue-500/5 transition-all"
        >
          <div className="flex items-center gap-2 mb-3">
            <Shield className="h-5 w-5 text-blue-400" />
            <h3 className="font-semibold text-foreground group-hover:text-blue-400 transition-colors">
              Wallet Cleanup
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">Scan, classify, and manage your assets securely.</p>
        </a>

        <a
          href="/docs/transaction-explainer"
          className="group p-6 border border-border rounded-lg hover:border-blue-500/50 hover:bg-blue-500/5 transition-all"
        >
          <div className="flex items-center gap-2 mb-3">
            <Code2 className="h-5 w-5 text-blue-400" />
            <h3 className="font-semibold text-foreground group-hover:text-blue-400 transition-colors">Tx Explainer</h3>
          </div>
          <p className="text-sm text-muted-foreground">Understand transactions with AI-powered summaries.</p>
        </a>

        <a
          href="/docs/infra-discovery"
          className="group p-6 border border-border rounded-lg hover:border-blue-500/50 hover:bg-blue-500/5 transition-all"
        >
          <div className="flex items-center gap-2 mb-3">
            <Map className="h-5 w-5 text-blue-400" />
            <h3 className="font-semibold text-foreground group-hover:text-blue-400 transition-colors">
              Infra Discovery
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">Browse 50+ providers and purchase access tiers.</p>
        </a>
      </div>

      {/* Main Sections */}
      <div className="space-y-12">
        {/* Introduction */}
        <section id="intro" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="h-6 w-6 text-blue-400" />
            <h2 className="text-3xl font-bold text-foreground">Introduction</h2>
          </div>
          <div className="prose prose-invert max-w-none">
            <div className="p-6 bg-card rounded-lg border border-border space-y-4">
              <div>
                <h3 className="font-semibold text-lg text-foreground mb-2">Welcome to Atlas Protocol</h3>
                <p className="text-muted-foreground">
                  Atlas Protocol is your comprehensive toolkit for blockchain infrastructure on Sui. We provide three
                  powerful modules designed to enhance your security, understanding, and access to infrastructure
                  services.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Our Mission</h4>
                <p className="text-muted-foreground">
                  To democratize blockchain security and infrastructure access by providing clear, actionable tools that
                  empower users and developers.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">What We Offer</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex gap-3">
                    <Shield className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Wallet Cleanup:</strong> Analyze and secure your Sui wallet by detecting spam, scams, and
                      low-value assets
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Code2 className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Transaction Explainer:</strong> Decode complex transactions into human-readable summaries
                      with security analysis
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Map className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Infra Discovery:</strong> Discover, evaluate, and purchase access to premium
                      infrastructure services
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Getting Started */}
        <section id="start" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="h-6 w-6 text-blue-400" />
            <h2 className="text-3xl font-bold text-foreground">Getting Started</h2>
          </div>
          <div className="space-y-4">
            <div className="p-6 bg-card rounded-lg border border-border">
              <h3 className="font-semibold text-lg text-foreground mb-4">1. Connect Your Wallet</h3>
              <p className="text-muted-foreground mb-4">
                Click the "Connect Wallet" button in the header. We support 11+ popular Sui wallets:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  "Phantom",
                  "OKX Wallet",
                  "Suiet",
                  "Martian",
                  "Nightly",
                  "Glass Wallet",
                  "Slush",
                  "OneKey",
                  "Surf",
                ].map((wallet) => (
                  <div
                    key={wallet}
                    className="px-3 py-2 rounded bg-blue-500/10 text-sm text-blue-400 border border-blue-500/20"
                  >
                    {wallet}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-card rounded-lg border border-border">
              <h3 className="font-semibold text-lg text-foreground mb-4">2. Choose Your Network</h3>
              <p className="text-muted-foreground mb-4">
                Use the network dropdown to select your preferred Sui network:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>Sui Mainnet (Production)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-yellow-500"></span>Sui Testnet (Testing)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>Sui Devnet (Development)
                </li>
              </ul>
            </div>

            <div className="p-6 bg-card rounded-lg border border-border">
              <h3 className="font-semibold text-lg text-foreground mb-4">3. Explore the Tools</h3>
              <p className="text-muted-foreground">
                Start with Wallet Cleanup to analyze your assets, use Transaction Explainer to understand transactions,
                or browse Infra Discovery to find services.
              </p>
            </div>
          </div>
        </section>

        {/* Integration Guide */}
        <section id="integration" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <Layers className="h-6 w-6 text-blue-400" />
            <h2 className="text-3xl font-bold text-foreground">Wallet Integration</h2>
          </div>
          <div className="p-6 bg-card rounded-lg border border-border">
            <p className="text-muted-foreground mb-4">
              Integrate Atlas Protocol into your dApp using our wallet connection utilities.
            </p>
            <div className="bg-muted rounded p-4 text-sm font-mono text-muted-foreground overflow-x-auto">
              <pre>{`// Import wallet kit
import { useWallet } from '@suiet/wallet-kit';

// Get wallet instance
const wallet = useWallet();

// Connect wallet
await wallet.connect();

// Get account
const address = wallet.account?.address;`}</pre>
            </div>
          </div>
        </section>

        {/* API & Payments */}
        <section id="api" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="h-6 w-6 text-blue-400" />
            <h2 className="text-3xl font-bold text-foreground">API & Payments</h2>
          </div>
          <div className="space-y-4">
            <div className="p-6 bg-card rounded-lg border border-border">
              <h3 className="font-semibold text-foreground mb-3">JSON Export</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Export your infrastructure registry and usage data as JSON for integration with external systems.
              </p>
              <Link href="/docs/infra-discovery">
                <Button size="sm" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
            <div className="p-6 bg-card rounded-lg border border-border">
              <h3 className="font-semibold text-foreground mb-3">Payment Flow</h3>
              <p className="text-sm text-muted-foreground">
                Purchase entitlements securely using Sui coins. Your transactions are recorded on-chain with automatic
                tier provisioning.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="h-6 w-6 text-blue-400" />
            <h2 className="text-3xl font-bold text-foreground">Troubleshooting & FAQ</h2>
          </div>
          <div className="space-y-4">
            <details className="p-6 bg-card rounded-lg border border-border group cursor-pointer">
              <summary className="font-semibold text-foreground flex items-center justify-between">
                How do I switch networks?
                <span className="text-blue-400">→</span>
              </summary>
              <p className="text-sm text-muted-foreground mt-3">
                Click the network dropdown in the header. Select your preferred Sui network (Mainnet, Testnet, or
                Devnet). Your wallet will automatically switch.
              </p>
            </details>

            <details className="p-6 bg-card rounded-lg border border-border group cursor-pointer">
              <summary className="font-semibold text-foreground flex items-center justify-between">
                What wallets do you support?
                <span className="text-blue-400">→</span>
              </summary>
              <p className="text-sm text-muted-foreground mt-3">
                We support 11+ popular Sui wallets including Phantom, OKX, Suiet, Martian, and more. Download your
                preferred wallet and connect through our secure connection modal.
              </p>
            </details>

            <details className="p-6 bg-card rounded-lg border border-border group cursor-pointer">
              <summary className="font-semibold text-foreground flex items-center justify-between">
                Is my data private?
                <span className="text-blue-400">→</span>
              </summary>
              <p className="text-sm text-muted-foreground mt-3">
                Yes. We never store your private keys or seed phrases. All wallet operations are performed client-side
                through secure wallet connections.
              </p>
            </details>

            <details className="p-6 bg-card rounded-lg border border-border group cursor-pointer">
              <summary className="font-semibold text-foreground flex items-center justify-between">
                How do I get support?
                <span className="text-blue-400">→</span>
              </summary>
              <p className="text-sm text-muted-foreground mt-3">
                Join our Discord community or contact support through the footer. We're here to help with any questions
                or issues.
              </p>
            </details>
          </div>
        </section>

        {/* Blockchains Section */}
        <section className="scroll-mt-24 py-8 border-t border-border">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="h-6 w-6 text-blue-400" />
              <h2 className="text-3xl font-bold mb-2 text-foreground">Blockchain Resources</h2>
            </div>
            <p className="text-muted-foreground">
              Official documentation and resources for supported blockchains. Learn about each ecosystem's unique
              features and tools.
            </p>
          </div>
          <Link href="/docs/blockchains">
            <Button size="lg" className="gap-2">
              <BookOpen className="h-4 w-4" />
              View Blockchain Guides
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </section>
      </div>
    </div>
  )
}
