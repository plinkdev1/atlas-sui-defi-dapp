import type { Metadata } from "next"
import { BackButton } from "@/components/back-button"
import { OracleFeedContent } from "@/components/oracle-feed-content"
import { PageHeader } from "@/components/page-header"
import { Gauge } from "lucide-react"

export const metadata: Metadata = {
  title: "Oracle Price Feeds | Atlas Protocol",
  description:
    "Real-time Pyth Network oracle price feeds for Sui ecosystem tokens with price alerts and notifications.",
}

export default function OracleFeedsPage() {
  return (
    <div className="bg-background pb-20 md:pb-0">
      <div className="container max-w-7xl mx-auto px-4 py-6 md:py-8">
        <BackButton label="Back to Home" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-8 md:py-12">
        <PageHeader
          icon={Gauge}
          title="Oracle Price Feeds"
          description="Real-time Pyth Network oracle price feeds for Sui ecosystem tokens with price alerts and notifications."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "More" },
            { label: "Oracle Feeds" },
          ]}
        />
      </div>

      <OracleFeedContent />
    </div>
  )
}
