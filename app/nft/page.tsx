import type { Metadata } from "next"
import { NFTMarketplaceContent } from "@/components/nft-marketplace-content"
import { BackButton } from "@/components/back-button"
import { PageHeader } from "@/components/page-header"
import { Image } from "lucide-react"

export const metadata: Metadata = {
  title: "NFT Marketplace | Atlas Protocol",
  description: "Browse, buy, and sell NFTs across Sui marketplaces. Aggregated listings from TradePort, BlueMove, and more.",
}

export default function NFTMarketplacePage() {
  return (
    <div className="bg-background pb-20 md:pb-0">
      <div className="container max-w-7xl mx-auto px-4 py-6 md:py-8">
        <BackButton label="Back to Home" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-8 md:py-12">
        <PageHeader
          icon={Image}
          title="NFT Marketplace"
          description="Browse, buy, and sell NFTs across Sui marketplaces. Aggregated listings from TradePort, BlueMove, and more."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "More" },
            { label: "NFT Marketplace" },
          ]}
        />
      </div>

      <NFTMarketplaceContent />
    </div>
  )
}
