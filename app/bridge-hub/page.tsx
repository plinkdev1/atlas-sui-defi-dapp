import type { Metadata } from "next"
import { BridgeHubContent } from "@/components/bridge-hub-content"
import { BackButton } from "@/components/back-button"
import { PageHeader } from "@/components/page-header"
import { Network } from "lucide-react"

export const metadata: Metadata = {
  title: "Bridge Hub | Atlas Protocol",
  description: "Bridge tokens across chains with the best routes and lowest fees. Compare Wormhole, Squid, and Sui Native Bridge.",
}

export default function BridgeHubPage() {
  return (
    <div className="bg-background pb-20 md:pb-0">
      <div className="container max-w-7xl mx-auto px-4 py-6 md:py-8">
        <BackButton label="Back to Home" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-8 md:py-12">
        <PageHeader
          icon={Network}
          title="Bridge Hub"
          description="Bridge tokens across chains with the best routes and lowest fees. Compare Wormhole, Squid, and Sui Native Bridge."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "DeFi" },
            { label: "Bridge Hub" },
          ]}
        />
      </div>

      <BridgeHubContent />
    </div>
  )
}
