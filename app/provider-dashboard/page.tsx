"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogOut, Save, X, Edit, Trash2, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useSupabaseUser } from "@/hooks/use-supabase-user"
import { ProviderAnalytics } from "@/components/provider-analytics"

const FEATURE_OPTIONS = [
  "Staking",
  "NFT Support",
  "DeFi Integration",
  "24/7 Support",
  "API Access",
  "Custom RPC",
  "Load Balancing",
  "Backup Nodes",
]

interface Provider {
  id: string
  name: string
  description: string
  pricing: string
  features: string[]
  website: string
  logo: string
  category?: string
}

export default function ProviderDashboard() {
  const router = useRouter()
  const { toast } = useToast()
  const { user, isLoading } = useSupabaseUser()

  const [providers, setProviders] = useState<Provider[]>([])
  const [isLoadingProviders, setIsLoadingProviders] = useState(true)
  const [isEditingId, setIsEditingId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  const [formData, setFormData] = useState<Partial<Provider>>({
    name: "",
    description: "",
    pricing: "",
    features: [],
    website: "",
    logo: "",
  })
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [isSaving, setIsSaving] = useState(false)

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth")
    }
  }, [user, isLoading, router])

  // Fetch providers on mount
  useEffect(() => {
    if (user) {
      fetchProviders()
    }
  }, [user])

  const fetchProviders = async () => {
    try {
      setIsLoadingProviders(true)
      const response = await fetch("/api/providers")
      if (!response.ok) throw new Error("Failed to fetch providers")
      const data = await response.json()
      setProviders(data)
    } catch (error) {
      console.error("[v0] Error fetching providers:", error)
      toast({ title: "Error", description: "Failed to load providers", variant: "destructive" })
    } finally {
      setIsLoadingProviders(false)
    }
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) => {
      if (prev.includes(feature)) {
        return prev.filter((f) => f !== feature)
      } else {
        return [...prev, feature]
      }
    })
  }

  const handleSave = async () => {
    if (!formData.name || !formData.description) {
      toast({ title: "Error", description: "Name and description are required", variant: "destructive" })
      return
    }

    setIsSaving(true)
    try {
      const dataToSend = {
        ...formData,
        features: selectedFeatures,
      }

      if (isEditingId) {
        const response = await fetch(`/api/providers/${isEditingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
        })
        if (!response.ok) throw new Error("Failed to update provider")
        toast({ title: "Success", description: "Provider updated successfully" })
      } else {
        const response = await fetch("/api/providers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
        })
        if (!response.ok) throw new Error("Failed to create provider")
        toast({ title: "Success", description: "Provider created successfully" })
      }

      setFormData({ name: "", description: "", pricing: "", features: [], website: "", logo: "" })
      setSelectedFeatures([])
      setIsEditingId(null)
      setIsCreating(false)
      fetchProviders()
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to save provider"
      console.error("[v0] Error saving provider:", error)
      toast({ title: "Error", description: message, variant: "destructive" })
    } finally {
      setIsSaving(false)
    }
  }

  const handleEdit = (provider: Provider) => {
    setFormData(provider)
    setSelectedFeatures(provider.features)
    setIsEditingId(provider.id)
    setIsCreating(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this provider?")) return

    try {
      const response = await fetch(`/api/providers/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete provider")
      toast({ title: "Success", description: "Provider deleted successfully" })
      fetchProviders()
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to delete provider"
      console.error("[v0] Error deleting provider:", error)
      toast({ title: "Error", description: message, variant: "destructive" })
    }
  }

  const handleCancel = () => {
    setFormData({ name: "", description: "", pricing: "", features: [], website: "", logo: "" })
    setSelectedFeatures([])
    setIsEditingId(null)
    setIsCreating(false)
  }

  const handleLogout = async () => {
    router.push("/")
    toast({ title: "Logged Out", description: "You have been logged out" })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Provider Dashboard</h1>
            <p className="text-muted-foreground">Manage and update your service listings</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-2 border-border/40 hover:bg-destructive/10 bg-transparent"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>

        <Tabs defaultValue="listings" className="space-y-6">
          <TabsList>
            <TabsTrigger value="listings">Listings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics">
            <ProviderAnalytics providerId={user?.id || ""} />
          </TabsContent>

          <TabsContent value="listings">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="md:col-span-1">
            <Card className="border-border/40 bg-card/80 backdrop-blur-sm sticky top-8">
              <CardHeader>
                <CardTitle>{isEditingId ? "Edit Provider" : isCreating ? "Create Provider" : "New Listing"}</CardTitle>
                <CardDescription>
                  {isEditingId ? "Update your provider details" : "Add a new service provider"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isCreating && !isEditingId && (
                  <Button onClick={() => setIsCreating(true)} className="w-full bg-primary hover:bg-primary/90 gap-2">
                    <Plus className="h-4 w-4" />
                    Create New Provider
                  </Button>
                )}

                {(isCreating || isEditingId) && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Name *</label>
                      <Input
                        name="name"
                        value={formData.name || ""}
                        onChange={handleFormChange}
                        placeholder="Provider name"
                        className="bg-background/50 border-border/40"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Description *</label>
                      <textarea
                        name="description"
                        value={formData.description || ""}
                        onChange={handleFormChange}
                        placeholder="Describe your services"
                        className="w-full px-3 py-2 rounded-md bg-background/50 border border-border/40 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-20 resize-none text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Pricing</label>
                      <Input
                        name="pricing"
                        value={formData.pricing || ""}
                        onChange={handleFormChange}
                        placeholder="e.g., Pro - $499/month"
                        className="bg-background/50 border-border/40"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Website</label>
                      <Input
                        name="website"
                        type="url"
                        value={formData.website || ""}
                        onChange={handleFormChange}
                        placeholder="https://example.com"
                        className="bg-background/50 border-border/40"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Logo URL</label>
                      <Input
                        name="logo"
                        type="url"
                        value={formData.logo || ""}
                        onChange={handleFormChange}
                        placeholder="/logos/provider.svg"
                        className="bg-background/50 border-border/40"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Features</label>
                      <div className="flex flex-wrap gap-1">
                        {FEATURE_OPTIONS.map((feature) => (
                          <button
                            key={feature}
                            onClick={() => toggleFeature(feature)}
                            className={`px-2 py-1 rounded text-xs transition-all border ${
                              selectedFeatures.includes(feature)
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-background/50 text-foreground border-border/40"
                            }`}
                          >
                            {feature}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button
                        variant="outline"
                        onClick={handleCancel}
                        className="flex-1 border-border/40 bg-transparent"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex-1 bg-primary hover:bg-primary/90"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        {isSaving ? "Saving..." : "Save"}
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Listings Section */}
          <div className="md:col-span-2">
            {isLoadingProviders ? (
              <Card className="border-border/40 bg-card/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <p className="text-muted-foreground text-center">Loading providers...</p>
                </CardContent>
              </Card>
            ) : providers.length === 0 ? (
              <Card className="border-border/40 bg-card/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <p className="text-muted-foreground text-center">No providers yet. Create one to get started!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {providers.map((provider) => (
                  <Card key={provider.id} className="border-border/40 bg-card/80 backdrop-blur-sm">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{provider.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{provider.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(provider)}
                            className="border-border/40"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(provider.id)}
                            className="border-red-500/30 hover:bg-red-500/10"
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>

                      {provider.pricing && (
                        <p className="text-sm text-foreground mb-2">
                          <span className="text-muted-foreground">Pricing:</span> {provider.pricing}
                        </p>
                      )}

                      {provider.features.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-2">
                          {provider.features.map((feature) => (
                            <span
                              key={feature}
                              className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary border border-primary/20"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      )}

                      {provider.website && (
                        <a
                          href={provider.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          Visit Website →
                        </a>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
