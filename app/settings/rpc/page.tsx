"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useRpcStore } from "@/lib/rpc-store"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"

export default function RPCSettingsPage() {
  const { customRpc, isUsingCustomRpc, setCustomRpc, setIsUsingCustomRpc, testRpcConnectivity } = useRpcStore()
  const { toast } = useToast()
  const [rpcUrl, setRpcUrl] = useState(customRpc || "")
  const [testing, setTesting] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const validateRpcUrl = (url: string): boolean => {
    try {
      new URL(url)
      return url.startsWith("http://") || url.startsWith("https://")
    } catch {
      return false
    }
  }

  const handleTestRpc = async () => {
    if (!validateRpcUrl(rpcUrl)) {
      toast({
        title: "Invalid RPC URL",
        description: "Please enter a valid HTTP(S) URL",
        variant: "destructive",
      })
      return
    }

    setTesting(true)
    try {
      const isConnected = await testRpcConnectivity(rpcUrl)
      if (isConnected) {
        toast({
          title: "RPC Connection Successful",
          description: "Custom RPC endpoint is working",
        })
        setIsValid(true)
      } else {
        toast({
          title: "RPC Connection Failed",
          description: "Unable to connect to the RPC endpoint",
          variant: "destructive",
        })
        setIsValid(false)
      }
    } catch {
      toast({
        title: "Test Failed",
        description: "Error testing RPC connectivity",
        variant: "destructive",
      })
      setIsValid(false)
    } finally {
      setTesting(false)
    }
  }

  const handleSave = () => {
    if (!validateRpcUrl(rpcUrl)) {
      toast({
        title: "Invalid RPC URL",
        description: "Please enter a valid HTTP(S) URL",
        variant: "destructive",
      })
      return
    }

    setCustomRpc(rpcUrl)
    setIsUsingCustomRpc(true)
    toast({
      title: "RPC Configuration Saved",
      description: "Custom RPC endpoint is now active",
    })
  }

  const handleReset = () => {
    setCustomRpc(null)
    setIsUsingCustomRpc(false)
    setRpcUrl("")
    setIsValid(false)
    toast({
      title: "RPC Reset",
      description: "Using default Sui RPC endpoints",
    })
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-8 flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">RPC Configuration</h1>
          <p className="text-muted-foreground">Customize your Sui RPC endpoint for advanced users</p>
        </div>

        <Card className="border-border/40 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Custom RPC Endpoint</CardTitle>
            <CardDescription>Override the default Sui RPC with your own endpoint</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">RPC URL</label>
              <Input
                type="url"
                placeholder="https://fullnode.mainnet.sui.io"
                value={rpcUrl}
                onChange={(e) => {
                  setRpcUrl(e.target.value)
                  setIsValid(false)
                }}
                className="mb-2"
              />
              <p className="text-xs text-muted-foreground">
                Enter a valid HTTPS URL for a Sui RPC endpoint (mainnet, testnet, or custom)
              </p>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleTestRpc} disabled={testing} variant="outline" className="bg-transparent">
                {testing ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                {testing ? "Testing..." : "Test Connection"}
              </Button>
              {isValid && (
                <div className="flex items-center gap-2 text-green-600 text-sm">
                  <CheckCircle2 className="h-4 w-4" />
                  Connection OK
                </div>
              )}
              {rpcUrl && !isValid && !testing && (
                <div className="flex items-center gap-2 text-yellow-600 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  Not tested
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-border/40 space-y-2">
              <Button onClick={handleSave} disabled={!isValid} className="w-full">
                Save Custom RPC
              </Button>
              {isUsingCustomRpc && (
                <Button onClick={handleReset} variant="outline" className="w-full bg-transparent">
                  Reset to Default RPC
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Info card */}
        <Card className="border-border/40 bg-blue-500/10 border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-blue-700 dark:text-blue-400">About RPC Endpoints</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-blue-600 dark:text-blue-300 space-y-2">
            <p>• An RPC (Remote Procedure Call) endpoint connects your wallet to the Sui blockchain</p>
            <p>• Custom RPC is useful for running a local node or using a private service provider</p>
            <p>• Default endpoints are provided by the official Sui project</p>
            <p>• Changes apply to this browser only; other devices will use defaults</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
