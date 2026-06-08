import { TransactionExplainerContent } from "@/components/transaction-explainer-content"
import { BackButton } from "@/components/back-button"
import { ProCtaWrapper } from "@/components/pro-cta-wrapper"
import { PageHeader } from "@/components/page-header"
import { FileSearch } from "lucide-react"

export default function TransactionExplainerPage() {
  return (
    <div className="bg-background pb-20 md:pb-0">
      <div className="container max-w-7xl mx-auto px-4 py-6 md:py-8">
        <BackButton label="Back to Home" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-8 md:py-12">
        <PageHeader
          icon={FileSearch}
          title="Transaction Explainer"
          description="Decode and understand complex transactions with human-readable explanations, security checks, and detailed insights."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Tools" },
            { label: "Transaction Explainer" },
          ]}
        />

        <ProCtaWrapper
          title="Advanced Transaction Analysis with Pro"
          description="Get unlimited API calls, custom rules, and smart alerts. Earn 3x Airpoints multiplier on Pro+."
          variant="minimal"
        />
      </div>

      <TransactionExplainerContent />
    </div>
  )
}
