import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CreditCard, Code2, BookOpen, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PaymentsDocumentation() {
  return (
    <main className="container mx-auto px-4 py-8 pb-24 md:px-6 md:pb-8">
      {/* Back Button */}
      <Link href="/docs">
        <Button variant="ghost" className="mb-8 gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Docs
        </Button>
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-3">
          <CreditCard className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Onchain Payments Guide</h1>
        </div>
        <p className="text-lg text-muted-foreground">Integrate tier-based payments for infrastructure providers</p>
      </div>

      <div className="space-y-8">
        {/* Overview */}
        <Card className="glass-card border-border/50">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>How payments work in Atlas Protocol</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Atlas Protocol enables infrastructure providers to accept direct onchain payments for service tiers. Users
              can purchase tier access using SUI tokens, with entitlements tracked on-chain and in the database.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="bg-muted/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">1. Select Tier</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  User chooses a pricing tier from provider cards
                </CardContent>
              </Card>
              <Card className="bg-muted/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">2. Sign Transaction</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Wallet signs SUI transfer to treasury address
                </CardContent>
              </Card>
              <Card className="bg-muted/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">3. Store Entitlement</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Entitlement recorded in Supabase with tx digest
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Configuration */}
        <Card className="glass-card border-border/50">
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
            <CardDescription>Required environment variables</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="rounded-lg bg-muted/50 p-4">
                <p className="mb-2 font-mono text-sm font-semibold">NEXT_PUBLIC_PAYMENT_TREASURY</p>
                <p className="text-sm text-muted-foreground">Sui address where payments are collected</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-4">
                <p className="mb-2 font-mono text-sm font-semibold">NEXT_PUBLIC_SUPABASE_URL</p>
                <p className="text-sm text-muted-foreground">Supabase project URL for storing entitlements</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-4">
                <p className="mb-2 font-mono text-sm font-semibold">NEXT_PUBLIC_SUPABASE_ANON_KEY</p>
                <p className="text-sm text-muted-foreground">Supabase anonymous key for client-side access</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* API Integration */}
        <Card className="glass-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="h-5 w-5" />
              API Endpoints
            </CardTitle>
            <CardDescription>Store and retrieve entitlements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="mb-2 font-semibold">POST /api/entitlements</p>
              <p className="mb-3 text-sm text-muted-foreground">Store a new entitlement after successful payment</p>
              <div className="rounded-lg bg-muted/50 p-3 font-mono text-xs">
                {JSON.stringify(
                  {
                    user_id: "0x1234...",
                    provider_id: "shinami-rpc",
                    tier: "professional",
                    transaction_digest: "0xabcd...",
                  },
                  null,
                  2,
                )}
              </div>
            </div>

            <div>
              <p className="mb-2 font-semibold">GET /api/entitlements?user_id=0x1234...&provider_id=shinami-rpc</p>
              <p className="mb-3 text-sm text-muted-foreground">Retrieve user's entitlements for a provider</p>
              <div className="rounded-lg bg-muted/50 p-3 font-mono text-xs">
                {JSON.stringify(
                  [
                    {
                      id: "uuid",
                      user_id: "0x1234...",
                      provider_id: "shinami-rpc",
                      tier: "professional",
                      transaction_digest: "0xabcd...",
                      purchased_at: "2026-01-12T12:00:00Z",
                      expires_at: "2027-01-12T12:00:00Z",
                      status: "active",
                    },
                  ],
                  null,
                  2,
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Database Schema */}
        <Card className="glass-card border-border/50">
          <CardHeader>
            <CardTitle>Database Schema</CardTitle>
            <CardDescription>Run the migration script to create tables</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center gap-2">
              <Badge>SQL Migration</Badge>
              <code className="text-sm text-muted-foreground">scripts/006_create_entitlements_table.sql</code>
            </div>
            <p className="mb-4 text-sm">
              The entitlements table stores user purchases with automatic expiration after 1 year. Row-level security
              ensures users can only view their own entitlements.
            </p>
            <div className="rounded-lg bg-muted/50 p-4 text-xs">
              <p className="mb-2 font-semibold">Table: entitlements</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• id: UUID (primary key)</li>
                <li>• user_id: TEXT (wallet address)</li>
                <li>• provider_id: TEXT (provider identifier)</li>
                <li>• tier: TEXT (tier name)</li>
                <li>• transaction_digest: TEXT (payment tx hash)</li>
                <li>• purchased_at: TIMESTAMP (creation time)</li>
                <li>• expires_at: TIMESTAMP (1 year from purchase)</li>
                <li>• status: TEXT (active/expired/revoked)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Example Integration */}
        <Card className="glass-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Integration Example
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">When a user clicks "Purchase Tier" on a provider card:</p>
            <ol className="space-y-3 text-sm">
              <li className="flex gap-3">
                <span className="flex-shrink-0 font-semibold">1.</span>
                <span>PurchaseTierModal opens showing available tiers</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 font-semibold">2.</span>
                <span>User selects tier and clicks Purchase</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 font-semibold">3.</span>
                <span>PTB is built with SUI transfer to treasury</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 font-semibold">4.</span>
                <span>User signs transaction in connected wallet</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 font-semibold">5.</span>
                <span>Transaction is executed and digest returned</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 font-semibold">6.</span>
                <span>Entitlement is stored via POST /api/entitlements</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 font-semibold">7.</span>
                <span>User receives confirmation toast with tier name</span>
              </li>
            </ol>
          </CardContent>
        </Card>

        {/* Testing */}
        <Card className="glass-card border-border/50">
          <CardHeader>
            <CardTitle>Testing on Testnet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">Follow these steps to test payments:</p>
            <ol className="space-y-2 text-sm">
              <li>1. Fund a wallet with Testnet SUI from faucet.testnet.sui.io</li>
              <li>2. Switch network to Testnet in the app</li>
              <li>3. Deploy payment Move contract to Testnet</li>
              <li>4. Set NEXT_PUBLIC_PAYMENT_TREASURY to contract address</li>
              <li>5. Click "Purchase Tier" on any provider card</li>
              <li>6. Complete payment flow and verify transaction on explorer</li>
              <li>7. Check Supabase table to confirm entitlement was stored</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
