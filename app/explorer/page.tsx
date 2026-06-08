import { FullExplorerContent } from "@/components/full-explorer-content"
import { BackButton } from "@/components/back-button"
import { PageHeader } from "@/components/page-header"
import { Search } from "lucide-react"

export const metadata = {
  title: "Blockchain Explorer | Atlas Protocol",
  description: "Explore Sui blockchain - search wallets, transactions, blocks, and objects",
}

export default function ExplorerPage() {
  return (
    <div className="bg-background pb-20 md:pb-0">
      <div className="container max-w-7xl mx-auto px-4 py-6 md:py-8">
        <BackButton label="Back to Home" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-8 md:py-12">
        <PageHeader
          icon={Search}
          title="Blockchain Explorer"
          description="Explore Sui blockchain - search wallets, transactions, blocks, and objects with detailed information."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "More" },
            { label: "Explorer" },
          ]}
        />
      </div>

      <FullExplorerContent />
    </div>
  )
}
