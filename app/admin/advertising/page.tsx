"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Plus, Trash2, Edit2, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import type { AdvertisingPartner } from "@/types/advertising"

export default function AdvertisingPartnersPage() {
  const { toast } = useToast()
  const [partners, setPartners] = useState<AdvertisingPartner[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const [draggedItem, setDraggedItem] = useState<AdvertisingPartner | null>(null)

  useEffect(() => {
    fetchPartners()
  }, [])

  const fetchPartners = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/advertising", { headers: { "Cache-Control": "no-store" } })
      if (!response.ok) throw new Error("Failed to fetch")
      const data = await response.json()
      setPartners(Array.isArray(data) ? data.sort((a, b) => a.slot_position - b.slot_position) : [])
    } catch (error) {
      console.error("[v0] Error:", error)
      toast({ title: "Error", description: "Failed to fetch partners", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return
    try {
      const response = await fetch(`/api/advertising/${id}`, { method: "DELETE" })
      if (!response.ok) throw new Error("Failed to delete")
      setPartners(partners.filter((p) => p.id !== id))
      toast({ title: "Deleted", description: "Partner removed successfully" })
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete partner", variant: "destructive" })
    }
  }

  const handleToggleActive = async (partner: AdvertisingPartner) => {
    try {
      const response = await fetch(`/api/advertising/${partner.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !partner.active }),
      })
      if (!response.ok) throw new Error("Failed to update")
      const updated = await response.json()
      setPartners(partners.map((p) => (p.id === partner.id ? updated : p)))
      toast({ title: "Updated", description: `Partner ${updated.active ? "activated" : "deactivated"}` })
    } catch (error) {
      toast({ title: "Error", description: "Failed to update partner", variant: "destructive" })
    }
  }

  const filteredPartners = partners.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-4 md:py-6">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Admin
        </Link>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Advertising Partners</h1>
            <p className="text-muted-foreground">Manage partner ad slots and carousel positioning</p>
          </div>

          {/* Search and Actions */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Search partners..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Partner
            </Button>
          </div>

          {/* Partners Table */}
          <Card>
            <CardHeader>
              <CardTitle>Active Partners ({filteredPartners.length})</CardTitle>
              <CardDescription>Drag to reorder, click to edit</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8 text-muted-foreground">Loading...</div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-8"></TableHead>
                        <TableHead>Partner</TableHead>
                        <TableHead>Tagline</TableHead>
                        <TableHead>Slot</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPartners.map((partner) => (
                        <TableRow key={partner.id} className="hover:bg-muted/50">
                          <TableCell className="cursor-grab active:cursor-grabbing">
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                          </TableCell>
                          <TableCell className="font-medium">{partner.name}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{partner.tagline}</TableCell>
                          <TableCell className="text-sm">#{partner.slot_position}</TableCell>
                          <TableCell>
                            <button
                              onClick={() => handleToggleActive(partner)}
                              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                                partner.active
                                  ? "bg-green-500/20 text-green-600 dark:text-green-400"
                                  : "bg-gray-500/20 text-gray-600 dark:text-gray-400"
                              }`}
                            >
                              {partner.active ? "Active" : "Inactive"}
                            </button>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                              <Button variant="ghost" size="sm" className="gap-2">
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="gap-2 text-destructive hover:text-destructive"
                                onClick={() => handleDelete(partner.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
