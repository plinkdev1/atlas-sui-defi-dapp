import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Suspense } from "react"
import { AdminModerationDashboard } from "@/components/admin-moderation-dashboard"

function AdminLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-8 flex items-center justify-center">
      <div className="text-muted-foreground">Loading...</div>
    </div>
  )
}

export default function AdminPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-4 md:py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
      <Suspense fallback={<AdminLoading />}>
        <AdminModerationDashboard />
      </Suspense>
    </>
  )
}
