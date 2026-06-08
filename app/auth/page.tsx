"use client"

import type React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Mail, Loader2, Wallet } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ZKLoginAuth } from "@/components/zklogin-auth"
import { PasskeyAuth } from "@/components/passkey-auth"

export default function AuthPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()
  const supabase = createClient()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error

      setSubmitted(true)
      toast({
        title: "Check your email",
        description: "A magic link has been sent to sign in securely",
      })
    } catch (error) {
      console.error("Auth error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to sign in",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col">
      <div className="container mx-auto px-4 py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Atlas Protocol</h1>
            <p className="text-muted-foreground">Sign in to your account</p>
          </div>

          {/* Auth Card */}
          <Card className="border-border/40 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Choose Authentication Method</CardTitle>
              <CardDescription>Sign in using your preferred method</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="email" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="zklogin">ZKLogin</TabsTrigger>
                  <TabsTrigger value="passkey">Passkey</TabsTrigger>
                  <TabsTrigger value="wallet">Wallet</TabsTrigger>
                </TabsList>

                {/* Email Tab */}
                <TabsContent value="email">
              {submitted ? (
                <div className="text-center space-y-4 py-8">
                  <div className="flex justify-center">
                    <Mail className="h-12 w-12 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Check your email</h3>
                    <p className="text-sm text-muted-foreground">
                      We sent a magic link to <strong>{email}</strong>
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Click the link in the email to sign in. The link expires in 24 hours.
                  </p>
                  <Button variant="outline" onClick={() => setSubmitted(false)} className="w-full">
                    Try another email
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      className="bg-background/50 border-border/40"
                      required
                    />
                  </div>

                  <Button type="submit" disabled={loading || !email} className="w-full bg-primary hover:bg-primary/90">
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending link...
                      </>
                    ) : (
                      <>
                        <Mail className="mr-2 h-4 w-4" />
                        Send Magic Link
                      </>
                    )}
                  </Button>

                  <div className="pt-4 border-t border-border/40">
                    <p className="text-xs text-muted-foreground text-center">
                      We'll link your wallet to this account after you sign in
                    </p>
                  </div>
                </form>
              )}
                </TabsContent>

                {/* ZKLogin Tab */}
                <TabsContent value="zklogin">
                  <ZKLoginAuth />
                </TabsContent>

                {/* Passkey Tab */}
                <TabsContent value="passkey">
                  <PasskeyAuth />
                </TabsContent>

                {/* Wallet Tab */}
                <TabsContent value="wallet">
                  <div className="space-y-4">
                    <Button
                      onClick={() => (window.location.href = "/")}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                    >
                      <Wallet className="mr-2 h-4 w-4" />
                      Connect Wallet
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      Connect your Sui wallet (Sui Wallet, Ethos, OKX, etc.) from the homepage.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="mt-6 border-border/40 bg-blue-500/10 border-blue-500/20">
            <CardContent className="pt-6">
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-2">Why authenticate?</p>
                <ul className="space-y-1">
                  <li>✓ Sync your preferences across devices</li>
                  <li>✓ Link your wallet securely</li>
                  <li>✓ Persist hidden items and votes</li>
                  <li>✓ Backup your data</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
