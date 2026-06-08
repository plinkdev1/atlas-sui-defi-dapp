import { BackButton } from "@/components/back-button"
import { StakeHubContent } from "@/components/stake-hub-content"
import { ProCtaWrapper } from "@/components/pro-cta-wrapper"
import { PageHeader } from "@/components/page-header"
import { Zap } from "lucide-react"

export const metadata = {
  title: "Stake Hub - Sui Validator Dashboard | Atlas Protocol",
  description:
    "Explore Sui validators, delegate tokens, and optimize your staking rewards.",
}

export default function StakeHubPage() {
  return (
    <div className="bg-background pb-20 md:pb-0">
      <div className="container max-w-7xl mx-auto px-4 py-6 md:py-8">
        <BackButton label="Back to Home" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-8 md:py-12">
        <PageHeader
          icon={Zap}
          title="Stake Hub"
          description="Explore Sui validators, delegate tokens, and optimize your staking rewards with real-time performance metrics."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "DeFi" },
            { label: "Stake Hub" },
          ]}
        />

        <ProCtaWrapper
          title="Advanced Staking Analytics with Pro"
          description="Get real-time validator performance metrics, historical APR data, and advanced reward tracking."
          variant="minimal"
        />
      </div>

      <StakeHubContent />
    </div>
  )
}
