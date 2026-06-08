import { SwapAggregatorContent } from "@/components/swap-aggregator-content"
import { PageHeader } from "@/components/page-header"
import { Coins } from "lucide-react"

export const metadata = {
  title: "Swap Aggregator - Atlas Protocol",
  description: "Find the best swap routes across Sui DEXes with aggregated quotes",
}

export default function SwapAggregatorPage() {
  return (
    <div className="bg-background pb-20 md:pb-0">
      <div className="container max-w-7xl mx-auto px-4 py-8 md:py-12">
        <PageHeader
          icon={Coins}
          title="Swap Aggregator"
          description="Find the best swap routes across Sui DEXes with aggregated quotes and lowest fees."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "DeFi" },
            { label: "Swap Aggregator" },
          ]}
        />
      </div>

      <SwapAggregatorContent />
    </div>
  )
}
