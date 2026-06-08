# Atlas Protocol — Sui DeFi Toolkit & On-Chain Protocol

![Next.js](https://img.shields.io/badge/Next.js-16-000000) ![React](https://img.shields.io/badge/React-19-61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6) ![Sui](https://img.shields.io/badge/Sui-Move-6FBCF0) ![Supabase](https://img.shields.io/badge/Supabase-Postgres-3ECF8E)

> The all-in-one Sui power tool: decode any transaction into plain English, pull live oracle prices, get best-price swaps across DEXs, manage staking, explore the chain, and clean up wallets — backed by an on-chain Move package and a ~100-route API layer.

**Status:** Prototype (v1.0.0 development build). Front end, API layer, and Move package are built out; live actions require keys/RPC.

## Screens

<p align="center">
  <img src="screenshots/01.png" width="240" />
  <img src="screenshots/03.png" width="240" />
  <img src="screenshots/06.png" width="240" />
</p>

## Why Atlas

Sui users juggle a half-dozen tools — an explorer here, a swap there, staking somewhere else. Atlas folds discovery and action into one application and adds an AI layer that turns raw transactions into readable explanations.

## Feature Matrix

| Capability | What it does | Powered by |
|---|---|---|
| AI Transaction Decoder | Plain-English explanation of any Sui tx hash | xAI Grok |
| Oracle Feeds | Live SUI/BTC/ETH prices with alerts | Pyth Network |
| Swap Aggregator | Best quote + execution across DEXs | Cetus CLMM, Turbos |
| Staking Hub | Validators, delegations, reward calculation | Sui RPC |
| On-Chain Explorer | Transaction / object / address / block search | Sui RPC |
| Wallet Tools | Holdings analytics + wallet cleanup | Sui RPC |
| Bridge Hub | Cross-chain route discovery + execution | — |
| NFT Marketplace | Listings, ownership, trading | — |
| Provider Directory | Infrastructure listings + admin moderation | Supabase |
| Monetization | Tiered entitlements, API keys, usage metering | LemonSqueezy |

## Engineering Highlights

- **Three authentication paths in one app** — Sui wallet connect, **zkLogin**, and **passkeys (WebAuthn)**, plus email/password.
- **DEX aggregation** with real quote and execute routes against the Cetus CLMM SDK.
- **AI decoding pipeline** that summarizes on-chain transactions via Grok.
- **Usage-metered API platform** — key issuance, per-endpoint quotas, tiered billing.
- **A real on-chain Move package** (below) — not just a front end calling third-party contracts.
- **~40 pages and ~100 API routes** spanning auth, DeFi tools, explorer, admin, and billing.

## On-Chain (Sui Move)

A Move package lives in `contracts/`:
- `sources/atlas_protocol.move` — protocol module
- `sources/types.move` — shared types
- `Move.toml` — package manifest

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16, React 19, TypeScript |
| Sui | @mysten/sui, @mysten/dapp-kit, @mysten/zklogin, @mysten/wallet-kit |
| DeFi / Data | Cetus CLMM SDK, Pyth Network, Sui RPC |
| AI | xAI Grok |
| Backend | Next.js API routes, Supabase (Postgres) |
| Auth | SimpleWebAuthn (passkeys), JWT (jose) |
| Billing | LemonSqueezy |
| State / UI | Zustand, TanStack Query, SWR, Tailwind v4, shadcn/ui |

## Getting Started

```bash
npm install --legacy-peer-deps
cp .env.example .env.local     # add your own keys
npm run dev                    # http://localhost:3000
```

Required env: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `GROK_API_KEY`, `NEXT_PUBLIC_SUI_RPC_URL`.

## Known Limitations

- Prototype: live swap/stake/bridge and AI decoding require real keys and RPC.
- Pin Next.js to a patched 16.x release.

## Disclaimer

Shared as a portfolio artifact demonstrating product, system, and on-chain design. Experimental software — not audited, not financial advice.

## The Atlas Ecosystem

Part of the Atlas ecosystem on Sui:

| Repository | Role |
|---|---|
| [atlas-website](https://github.com/plinkdev1/atlas-website) | Landing site & provider portal |
| **atlas-app** (this repo) | dApp + Sui Move contracts |
| [airpoints](https://github.com/plinkdev1/airpoints) | Loyalty & rewards engine — the $ATLAS flywheel |
