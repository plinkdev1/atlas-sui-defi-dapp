"use client"

import { Zap, Loader2, AlertCircle, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

interface ExplainResult {
  summary: string
  whatHappened: string
  tokenFlows: string
  risks: string
  defiDetails: string
  isPro: boolean
}

export function AIDecoderWidget() {
  const [txHash, setTxHash] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [result, setResult] = useState<ExplainResult | null>(null)
  const [expanded, setExpanded] = useState(false)

  async function handleDecode() {
    if (!txHash.trim()) return
    setLoading(true)
    setError("")
    setResult(null)

    try {
      const res = await fetch("/api/ai/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ digest: txHash.trim(), isPro: false }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to explain transaction")
      setResult(data.explanation)
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-card/50 backdrop-blur-xl border border-border/20 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-semibold text-foreground">AI Transaction Decoder</h2>
        <span className="ml-auto text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
          Grok
        </span>
      </div>

      <div className="space-y-3">
        <label className="text-xs text-muted-foreground block">Paste transaction hash</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="0x..."
            value={txHash}
            onChange={(e) => setTxHash(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleDecode()}
            className="flex-1 bg-background/50 border border-border/20 rounded-lg px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:border-primary/50 focus:outline-none transition-colors"
          />
          <button
            onClick={handleDecode}
            disabled={loading || !txHash.trim()}
            className="px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Decode"}
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {result && (
          <div className="bg-background/30 border border-border/20 rounded-xl overflow-hidden">
            <div className="p-3 border-b border-border/10">
              <p className="text-sm text-foreground leading-relaxed">{result.whatHappened}</p>
            </div>
            {expanded && (
              <div className="p-3 space-y-3">
                {result.tokenFlows && (
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">Token Flows</div>
                    <p className="text-sm text-foreground">{result.tokenFlows}</p>
                  </div>
                )}
                {result.risks && (
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">Risks</div>
                    <p className="text-sm text-foreground">{result.risks}</p>
                  </div>
                )}
                <div>
                  <div className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">Advanced (Pro)</div>
                  <p className="text-sm text-muted-foreground italic">{result.defiDetails}</p>
                </div>
              </div>
            )}
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-full flex items-center justify-center gap-1 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors border-t border-border/10"
            >
              {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              {expanded ? "Show less" : "Show full breakdown"}
            </button>
          </div>
        )}

        {!result && !loading && !error && (
          <div className="bg-background/20 border-l-2 border-primary/50 rounded px-3 py-2">
            <p className="text-xs text-muted-foreground">
              Paste any Sui transaction digest to get a plain-English AI explanation powered by Grok.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
