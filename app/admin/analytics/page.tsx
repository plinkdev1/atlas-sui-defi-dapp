"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface WalletStats {
  connects: number
  disconnects: number
  signs: number
  executes: number
  errors: number
  lastActivity: number | null
}

interface AnalyticsEvent {
  id: string
  type: string
  wallet: string
  timestamp: number
  status: string
  [key: string]: unknown
}

interface AnalyticsData {
  totalEvents: number
  summaryByWallet: Record<string, WalletStats>
  recentEvents: AnalyticsEvent[]
}

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [chartData, setChartData] = useState<Array<{ name: string; connects: number; disconnects: number; signs: number; executes: number; errors: number }>>([])

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch("/api/analytics/wallet")
        const data = (await response.json()) as AnalyticsData
        setAnalyticsData(data)

        // Prepare chart data
        const walletData = Object.entries(data.summaryByWallet || {}).map(([wallet, stats]) => ({
          name: wallet,
          connects: (stats as WalletStats).connects,
          disconnects: (stats as WalletStats).disconnects,
          signs: (stats as WalletStats).signs,
          executes: (stats as WalletStats).executes,
          errors: (stats as WalletStats).errors,
        }))
        setChartData(walletData)
      } catch (error) {
        console.error("[v0] Failed to fetch analytics:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
    const interval = setInterval(fetchAnalytics, 5000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-8 flex items-center justify-center">
        <div className="text-muted-foreground">Loading analytics...</div>
      </div>
    )
  }

  if (!analyticsData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <Card className="border-border/40 bg-card/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <p className="text-muted-foreground">No analytics data available yet.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Real-time wallet and transaction analytics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="border-border/40 bg-card/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary">{analyticsData.totalEvents}</div>
              <p className="text-sm text-muted-foreground mt-1">Total Events</p>
            </CardContent>
          </Card>

        {["connects", "disconnects", "signs", "executes", "errors"].map((metric) => (
          <Card key={metric} className="border-border/40 bg-card/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold">
                {Object.values(analyticsData.summaryByWallet).reduce(
                  (sum: number, wallet: WalletStats) => sum + (wallet[metric as keyof WalletStats] || 0),
                  0,
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1 capitalize">{metric}</p>
            </CardContent>
          </Card>
        ))}
        </div>

        {/* Wallet Activity Chart */}
        <Card className="border-border/40 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Wallet Activity</CardTitle>
            <CardDescription>Event distribution by wallet type</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                connects: { label: "Connects", color: "hsl(var(--primary))" },
                signs: { label: "Signs", color: "hsl(var(--chart-1))" },
                executes: { label: "Executes", color: "hsl(var(--chart-2))" },
                errors: { label: "Errors", color: "hsl(var(--chart-5))" },
              }}
              className="h-80"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="connects" fill="var(--color-connects)" />
                  <Bar dataKey="signs" fill="var(--color-signs)" />
                  <Bar dataKey="executes" fill="var(--color-executes)" />
                  <Bar dataKey="errors" fill="var(--color-errors)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Wallet Summary Table */}
        <Card className="border-border/40 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Wallet Summary</CardTitle>
            <CardDescription>Detailed activity breakdown by wallet</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(analyticsData.summaryByWallet).map(([wallet, stats]: [string, WalletStats]) => (
                <div
                  key={wallet}
                  className="p-4 rounded-lg bg-background/50 border border-border/40 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div>
                    <div className="font-semibold text-foreground">{wallet}</div>
                    <div className="text-xs text-muted-foreground">
                      Last active: {stats.lastActivity ? new Date(stats.lastActivity).toLocaleString() : "Never"}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="secondary">{stats.connects} connects</Badge>
                    <Badge variant="secondary">{stats.signs} signs</Badge>
                    <Badge variant="secondary">{stats.executes} executes</Badge>
                    {stats.errors > 0 && <Badge variant="destructive">{stats.errors} errors</Badge>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Events */}
        <Card className="border-border/40 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
            <CardDescription>Latest tracked events (last 20)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {(analyticsData.recentEvents || [])
                .reverse()
                .slice(0, 20)
                .map((event: AnalyticsEvent, index: number) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-background/50 border border-border/40 flex justify-between items-center"
                  >
                    <div className="flex items-center gap-3">
                      <Badge className="bg-primary/20 text-primary">{String(event.type)}</Badge>
                      <span className="text-sm text-foreground">{String(event.wallet)}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
