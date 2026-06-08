import { writeFileSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const target = join(__dirname, "..", "app", "page.tsx")

const content = `"use client"

import { ArrowRightLeft, TrendingUp, Shield, Zap, Coins, Grid3x3, Activity, AlertTriangle, Gift, Filter } from "lucide-react"
import { useState } from "react"

// =====================
// Stats Row Component
// =====================
function StatsRow() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-card/50 backdrop-blur-xl border border-border/20 rounded-xl p-4 card-hover">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Net Worth</span>
          <TrendingUp className="h-4 w-4 text-primary" />
        </div>
        <div className="text-2xl font-bold text-foreground mb-1">$12,450.32</div>
        <div className="text-xs text-green-500 font-medium">+4.2% (24h)</div>
      </div>
      <div className="bg-card/50 backdrop-blur-xl border border-border/20 rounded-xl p-4 card-hover">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Staked SUI</span>
          <Activity className="h-4 w-4 text-accent" />
        </div>
        <div className="text-2xl font-bold text-foreground mb-1">4,000.00</div>
        <div className="text-xs text-green-500 font-medium">6.2% APY</div>
      </div>
      <div className="bg-card/50 backdrop-blur-xl border border-border/20 rounded-xl p-4 card-hover">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Wallet Health</span>
          <Shield className="h-4 w-4 text-green-500" />
        </div>
        <div className="text-2xl font-bold text-green-500 mb-1">98/100</div>
        <div className="text-xs text-green-500 font-medium">Protected</div>
      </div>
    </div>
  )
}

// =====================
// Quick Actions
// =====================
function QuickActions() {
  const actions = [
    { href: "/swap-aggregator", label: "Swap", icon: ArrowRightLeft, color: "primary" },
    { href: "/bridge-hub",      label: "Bridge", icon: Zap,            color: "accent"  },
    { href: "/stake-hub",       label: "Stake",  icon: Coins,          color: "green"   },
    { href: "/nft",             label: "Aggregator", icon: Grid3x3,    color: "yellow"  },
  ]
  const colorMap: Record<string, string> = {
    primary: "bg-primary/10 hover:bg-primary/20 text-primary border-primary/50",
    accent:  "bg-accent/10 hover:bg-accent/20 text-accent border-accent/50",
    green:   "bg-green-500/10 hover:bg-green-500/20 text-green-500 border-green-500/50",
    yellow:  "bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 border-yellow-500/50",
  }
  return (
    <div className="grid grid-cols-4 gap-3">
      {actions.map(({ href, label, icon: Icon, color }) => (
        <a
          key={href}
          href={href}
          className="group bg-card/50 backdrop-blur-xl border border-border/20 rounded-xl p-4 hover:border-border/50 smooth-transition flex flex-col items-center gap-2 text-center"
        >
          <div className={\`w-10 h-10 rounded-lg flex items-center justify-center smooth-transition \${colorMap[color]}\`}>
            <Icon className="h-5 w-5" />
          </div>
          <span className="text-xs font-semibold text-foreground">{label}</span>
        </a>
      ))}
    </div>
  )
}

// =====================
// AI Decoder Widget
// =====================
function AIDecoderWidget() {
  const [txHash, setTxHash] = useState("")
  const [result, setResult] = useState<string | null>(
    "Incoming decoded: You are swapping 500 SUI for USDC via Cetus Aggregator. Estimated slippage is 0.05%. No malicious contract logic detected."
  )
  const [loading, setLoading] = useState(false)

  async function decode() {
    if (!txHash.trim()) return
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch("/api/ai/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ txHash }),
      })
      const data = await res.json()
      setResult(data.explanation ?? "Unable to decode this transaction.")
    } catch {
      setResult("Failed to decode transaction. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-card/50 backdrop-blur-xl border border-border/20 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="h-4 w-4 text-primary" />
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">AI Transaction Decoder</span>
        <span className="ml-auto w-2 h-2 rounded-full bg-primary animate-pulse" />
      </div>
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          placeholder="0x..."
          value={txHash}
          onChange={(e) => setTxHash(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && decode()}
          className="flex-1 bg-background/50 border border-border/20 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:border-primary/50 focus:outline-none smooth-transition font-mono"
        />
        <button
          onClick={decode}
          disabled={loading}
          className="px-4 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/80 smooth-transition disabled:opacity-50"
        >
          {loading ? "..." : "Decode"}
        </button>
      </div>
      {result && (
        <div className="bg-background/30 border-l-2 border-primary rounded-r-lg p-3">
          <p className="text-sm text-foreground leading-relaxed">{result}</p>
        </div>
      )}
    </div>
  )
}

// =====================
// Live Activity Feed
// =====================
const ACTIVITY = [
  { id: 1, type: "swap",    title: "Swap Executed",           sub: "Via Cetus Protocol",   amount: "-500 SUI",     badge: "+4,200 ATLAS", Icon: ArrowRightLeft },
  { id: 2, type: "warning", title: "Scam Contract Blocked",   sub: "Auto-Blocked",         amount: "BLOCKED",      badge: "Wallet Protection", Icon: AlertTriangle },
  { id: 3, type: "oracle",  title: "Oracle Update: SUI/USD",  sub: "Pyth Network • 30s",   amount: "$1.24",        badge: "+4.2%",         Icon: Zap },
  { id: 4, type: "event",   title: "Whale Inflow",            sub: "Bridge • 12m ago",     amount: "+250,000 SUI", badge: "",              Icon: Gift },
]
const TABS = ["All", "Swaps", "NFTs", "Whales", "Alerts"]
const iconColor = { swap: "text-primary", warning: "text-red-500", oracle: "text-accent", event: "text-yellow-500" }
const iconBg    = { swap: "bg-primary/10", warning: "bg-red-500/10", oracle: "bg-accent/10", event: "bg-yellow-500/10" }

function LiveActivityFeed() {
  const [tab, setTab] = useState("All")
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">Oracle & Activity</h2>
        <span className="text-xs text-primary font-semibold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse inline-block" />
          LIVE
        </span>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={\`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap smooth-transition border \${tab === t ? "bg-primary/20 text-primary border-primary/50" : "bg-transparent border-border/20 text-muted-foreground hover:text-foreground"}\`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {ACTIVITY.map((item) => (
          <div key={item.id} className="bg-card/50 backdrop-blur-xl border border-border/10 rounded-xl p-4 hover:border-border/40 smooth-transition cursor-pointer">
            <div className="flex items-start gap-3">
              <div className={\`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 \${iconBg[item.type as keyof typeof iconBg]}\`}>
                <item.Icon className={\`h-4 w-4 \${iconColor[item.type as keyof typeof iconColor]}\`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className={\`text-sm font-semibold \${item.type === "warning" ? "text-red-400" : "text-foreground"}\`}>{item.title}</div>
                <div className="text-xs text-muted-foreground">{item.sub}</div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className={\`text-sm font-semibold \${item.type === "warning" ? "text-red-500" : item.amount.startsWith("+") ? "text-green-500" : "text-foreground"}\`}>
                  {item.amount}
                </div>
                {item.badge && <div className="text-xs text-muted-foreground">{item.badge}</div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// =====================
// Positions Table
// =====================
const POSITIONS = [
  { asset: "SUI-USDC", protocol: "Turbos", value: "$4,200.00", pnl: "+12.4%", pos: true },
  { asset: "SUI Staked", protocol: "Native", value: "$2,050.00", pnl: "+6.1%", pos: true },
  { asset: "haSUI-USDC", protocol: "Haedal", value: "$1,200.00", pnl: "+8.2%", pos: true },
]

function ActivePositions() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">Active Positions</h2>
        <a href="/hub" className="text-xs text-primary hover:underline">View All</a>
      </div>
      <div className="bg-card/50 backdrop-blur-xl border border-border/20 rounded-xl overflow-hidden">
        <div className="grid grid-cols-4 gap-4 px-4 py-2.5 bg-background/30 border-b border-border/10 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          <div>Asset</div><div>Protocol</div><div className="text-right">Value</div><div className="text-right">PNL</div>
        </div>
        {POSITIONS.map((p) => (
          <div key={p.asset} className="grid grid-cols-4 gap-4 px-4 py-3 border-b border-border/10 last:border-0 hover:bg-background/20 smooth-transition">
            <div className="text-sm font-semibold text-foreground">{p.asset}</div>
            <div className="text-sm text-muted-foreground">{p.protocol}</div>
            <div className="text-sm text-right font-medium text-foreground">{p.value}</div>
            <div className={\`text-sm text-right font-semibold \${p.pos ? "text-green-500" : "text-red-500"}\`}>{p.pnl}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// =====================
// Right Sidebar
// =====================
function RightSidebar() {
  return (
    <aside className="space-y-4">
      {/* Quick Swap */}
      <div className="bg-card/50 backdrop-blur-xl border border-border/20 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Quick Swap</span>
          <span className="text-xs text-primary">0.05% Slippage</span>
        </div>
        <div className="space-y-2">
          <div className="bg-background/40 rounded-lg p-3 flex justify-between items-center">
            <div>
              <div className="text-xs text-muted-foreground mb-1">FROM &nbsp; BAL: 2,400</div>
              <input type="number" defaultValue={100} className="w-24 bg-transparent text-xl font-bold text-foreground focus:outline-none" />
            </div>
            <span className="text-sm font-semibold text-foreground bg-background/50 px-2 py-1 rounded">SUI</span>
          </div>
          <div className="flex justify-center">
            <div className="w-7 h-7 rounded-full bg-background/50 border border-border/20 flex items-center justify-center">
              <ArrowRightLeft className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
          </div>
          <div className="bg-background/40 rounded-lg p-3 flex justify-between items-center">
            <div>
              <div className="text-xs text-muted-foreground mb-1">TO &nbsp; ESTIMATED</div>
              <div className="text-xl font-bold text-foreground">154.20</div>
            </div>
            <span className="text-sm font-semibold text-foreground bg-background/50 px-2 py-1 rounded">USDC</span>
          </div>
          <button className="w-full bg-primary text-white font-semibold py-2.5 rounded-lg hover:bg-primary/80 smooth-transition text-sm mt-1">
            Swap Tokens
          </button>
        </div>
      </div>

      {/* Top Movers */}
      <div className="bg-card/50 backdrop-blur-xl border border-border/20 rounded-2xl p-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Top Movers</h3>
        <div className="space-y-2">
          {[
            { name: "BLUB",   chg: "+24.5%", pos: true  },
            { name: "FUD",    chg: "+12.1%", pos: true  },
            { name: "SCALLOP",chg: "-4.2%",  pos: false },
          ].map((t) => (
            <div key={t.name} className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-foreground/10" />
                <span className="text-sm text-foreground font-medium">{t.name}</span>
              </div>
              <span className={\`text-sm font-semibold \${t.pos ? "text-green-500" : "text-red-500"}\`}>{t.chg}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Airpoints */}
      <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Airpoints</span>
          <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-semibold">Level 3</span>
        </div>
        <div className="text-2xl font-bold text-foreground mb-1">8,450</div>
        <div className="text-xs text-muted-foreground mb-2">Next Perk: 150 \$ATLAS &nbsp;·&nbsp; 2.5x Multiplier</div>
        <div className="h-1.5 bg-background/40 rounded-full overflow-hidden">
          <div className="h-full w-3/4 bg-primary rounded-full" />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>75%</span><span>NEXT: 100%</span>
        </div>
      </div>
    </aside>
  )
}

// =====================
// Alert Banner
// =====================
function AlertBanner() {
  return (
    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0" />
        <div>
          <div className="text-sm font-semibold text-red-400">2 Scams Detected</div>
          <div className="text-xs text-muted-foreground">Protect your wallet — review now</div>
        </div>
      </div>
      <a href="/wallet-cleanup" className="text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/40 px-3 py-1.5 rounded-lg hover:bg-red-500/30 smooth-transition">
        Review
      </a>
    </div>
  )
}

// =====================
// Page
// =====================
export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-screen-2xl mx-auto px-4 py-6 space-y-6">
        <AlertBanner />
        <StatsRow />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <QuickActions />
            <AIDecoderWidget />
            <LiveActivityFeed />
            <ActivePositions />
          </div>
          <RightSidebar />
        </div>
      </div>
    </main>
  )
}
`

writeFileSync(target, content, "utf-8")
console.log("[v0] page.tsx written successfully, length:", content.length)
