import { Suspense } from "react"
import { HubContent } from "@/components/hub-content"
import { PageHeader } from "@/components/page-header"
import { Compass } from "lucide-react"

export const metadata = {
  title: "Hub - Dashboard | Atlas Protocol",
  description: "Your personal dashboard with portfolio overview, recommended tools, and ecosystem news.",
}

export default function HubPage() {
  return (
    <div className="bg-background pb-20 md:pb-0">
      <div className="container max-w-7xl mx-auto px-4 py-8 md:py-12">
        <PageHeader
          icon={Compass}
          title="Hub"
          description="Your personal dashboard with portfolio overview, recommended tools, and ecosystem news."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Hub" },
          ]}
        />
      </div>

      <Suspense fallback={null}>
        <HubContent />
      </Suspense>
    </div>
  )
}
