import type { Metadata } from "next"
import { AdminDashboardContent } from "@/components/admin-dashboard-content"

export const metadata: Metadata = {
  title: "Admin Dashboard | Atlas Protocol",
  description: "Admin dashboard for managing users, providers, moderation, and revenue.",
}

export default function AdminDashboardPage() {
  return (
    <div className="bg-background">
      <AdminDashboardContent />
    </div>
  )
}
