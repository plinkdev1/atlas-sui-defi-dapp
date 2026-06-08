import { CoreClient } from "@mysten/sui/client"

export interface ExplainResult {
  summary: string
  whatHappened: string
  tokenFlows: string
  risks: string
  defiDetails: string
  isPro: boolean
}

export async function explainTransaction(
  digest: string,
  client: CoreClient,
  isPro: boolean = false,
): Promise<ExplainResult> {
  try {
    const txData = await client.getTransaction({
      digest,
    })
    const prompt = buildExplainerPrompt(txData, isPro)
    const explanation = await callGrokExplainer(prompt)
    return parseExplanation(explanation, isPro)
  } catch (error) {
    console.error("[v0] Error explaining transaction:", error)
    return {
      summary: "Error analyzing transaction",
      whatHappened: "Could not fetch transaction data from Sui RPC.",
      tokenFlows: "",
      risks: "",
      defiDetails: isPro ? "" : "(Pro feature)",
      isPro,
    }
  }
}

function buildExplainerPrompt(txData: any, isPro: boolean): string {
  // Trim the txData to avoid exceeding token limits
  const trimmed = {
    digest: txData.digest,
    checkpoint: txData.checkpoint,
    effects: txData.effects,
    events: txData.events?.slice(0, 10),
    transaction: txData.transaction,
  }

  let prompt = `You are a Sui blockchain expert. Explain the following transaction in plain English for a non-technical user.

Transaction Data:
${JSON.stringify(trimmed, null, 2)}

Respond with exactly these 4 sections, each starting with the label on its own line:
WHAT HAPPENED:
TOKEN FLOWS:
GAS COSTS:
RISKS:`

  if (isPro) {
    prompt += `
ADVANCED ANALYSIS:`
  }

  return prompt
}

async function callGrokExplainer(prompt: string): Promise<string> {
  const apiKey = process.env.GROK_API_KEY

  if (!apiKey) {
    return "WHAT HAPPENED:\nThis transaction was executed on the Sui blockchain. Add a GROK_API_KEY environment variable for real AI-powered explanations.\n\nTOKEN FLOWS:\nToken movements detected in transaction.\n\nGAS COSTS:\nStandard gas fees applied.\n\nRISKS:\nNo analysis available without API key."
  }

  const response = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "grok-beta",
      messages: [
        {
          role: "system",
          content:
            "You are a Sui blockchain transaction expert. Explain transactions clearly and concisely for non-technical users. Always follow the exact response format requested.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.5,
      max_tokens: 800,
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    console.error("[v0] Grok API error:", err)
    throw new Error(`Grok API error: ${response.status}`)
  }

  const data = await response.json()
  return data.choices[0]?.message?.content ?? "No explanation generated."
}

function parseExplanation(text: string, isPro: boolean): ExplainResult {
  const extract = (label: string, next: string): string => {
    const regex = new RegExp(`${label}:\\s*([\\s\\S]*?)(?=${next}:|$)`, "i")
    return text.match(regex)?.[1]?.trim() ?? ""
  }

  return {
    summary: text.slice(0, 200),
    whatHappened: extract("WHAT HAPPENED", "TOKEN FLOWS"),
    tokenFlows: extract("TOKEN FLOWS", "GAS COSTS"),
    risks: extract("RISKS", "ADVANCED ANALYSIS"),
    defiDetails: isPro
      ? extract("ADVANCED ANALYSIS", "$END$")
      : "(Upgrade to Pro to see contract verification, DeFi protocol detection, and risk scoring)",
    isPro,
  }
}
