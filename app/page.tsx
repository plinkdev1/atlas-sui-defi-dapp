import { Wallet } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { StatsRow } from "@/components/homepage/stats-row"
import { QuickActionsBar } from "@/components/homepage/quick-actions-bar"
import { AIDecoderWidget } from "@/components/widgets/ai-decoder-widget"
import { LiveActivityFeed } from "@/components/homepage/live-activity-feed"
import { ActivePositionsTable } from "@/components/homepage/active-positions-table"

export default function HomePage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Overview of your blockchain activities and positions"
        icon={Wallet}
        cta={{ label: "Connect Wallet", href: "#" }}
      />
      <div className="space-y-6">
        <StatsRow />
        <QuickActionsBar />
        <AIDecoderWidget />
        <LiveActivityFeed />
        <ActivePositionsTable />
      </div>
    </>
  )
}
