import { WalletCleanupContent } from "@/components/wallet-cleanup-content"
import { BackButton } from "@/components/back-button"
import { ProCtaWrapper } from "@/components/pro-cta-wrapper"
import { PageHeader } from "@/components/page-header"
import { Trash2 } from "lucide-react"

export default function WalletCleanupPage() {
  return (
    <div className="bg-background pb-20 md:pb-0">
      <div className="container max-w-7xl mx-auto px-4 py-6 md:py-8">
        <BackButton label="Back to Home" />
      </div>
      
      <div className="container max-w-7xl mx-auto px-4 py-8 md:py-12">
        <PageHeader
          icon={Trash2}
          title="Wallet Cleanup"
          description="Organize and clean up your wallet by managing tokens, NFTs, and removing spam assets with AI-powered detection."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Tools" },
            { label: "Wallet Cleanup" },
          ]}
        />

        <ProCtaWrapper
          title="Unlimited Wallet Cleanup"
          description="Pro users get unlimited wallet analysis, auto-rules, smart alerts, and 10%+ APY staking boosts."
          variant="minimal"
        />
      </div>

      <WalletCleanupContent />
    </div>
  )
}
