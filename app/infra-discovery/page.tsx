import { InfraDiscoveryContent } from "@/components/infra-discovery-content"
import { BackButton } from "@/components/back-button"
import { ProCtaWrapper } from "@/components/pro-cta-wrapper"
import { ProviderDashboardBanner } from "@/components/provider-dashboard-banner"
import { PageHeader } from "@/components/page-header"
import { Network } from "lucide-react"

export default function InfraDiscoveryPage() {
  return (
    <div className="bg-background pb-20 md:pb-0">
      <div className="container max-w-7xl mx-auto px-4 py-6 md:py-8">
        <BackButton label="Back to Home" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-8 md:py-12">
        <PageHeader
          icon={Network}
          title="Infra Discovery"
          description="Explore and discover infrastructure services, validators, RPCs, and ecosystem tools with curated recommendations."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Tools" },
            { label: "Infra Discovery" },
          ]}
        />

        <ProCtaWrapper
          title="Deep Infra Analysis with Pro"
          description="Unlock advanced infrastructure discovery, detailed analytics, and network insights with Pro access."
          variant="minimal"
        />
      </div>

      <InfraDiscoveryContent />
      
      {/* Provider Dashboard Banner - appears at bottom */}
      <div className="container max-w-7xl mx-auto px-4 mt-16 mb-8">
        <ProviderDashboardBanner />
      </div>
      
    </div>
  )
}
