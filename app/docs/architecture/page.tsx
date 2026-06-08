export default function ArchitectureDocs() {
  return (
    <article className="max-w-4xl prose prose-invert">
      <h1>Atlas Protocol Architecture</h1>

      <section>
        <h2>Overview</h2>
        <p>
          Atlas Protocol is a modular Sui blockchain dApp toolkit built with Next.js 16, React 19, TypeScript, Tailwind
          CSS, shadcn/ui, and @mysten/dapp-kit for wallet integration.
        </p>
      </section>

      <section>
        <h2>Technology Stack</h2>
        <ul>
          <li>
            <strong>Framework:</strong> Next.js 16 (App Router)
          </li>
          <li>
            <strong>UI Framework:</strong> React 19 with TypeScript
          </li>
          <li>
            <strong>Styling:</strong> Tailwind CSS v4 with custom design tokens
          </li>
          <li>
            <strong>Components:</strong> shadcn/ui with custom Dark Theme
          </li>
          <li>
            <strong>Wallet Integration:</strong> @mysten/dapp-kit (Sui Wallet Standard)
          </li>
          <li>
            <strong>Blockchain:</strong> Sui RPC via useSuiClient()
          </li>
          <li>
            <strong>APIs:</strong> Blockberry, Blockvision for enrichment (optional)
          </li>
          <li>
            <strong>State Management:</strong> Zustand (chain-store.tsx)
          </li>
        </ul>
      </section>

      <section>
        <h2>Project Structure</h2>
        <pre className="bg-black p-4 rounded border border-border overflow-x-auto">
          {`atlas-protocol/
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Home page with module cards
│   ├── wallet-cleanup/         # Module 1
│   ├── transaction-explainer/  # Module 2
│   ├── infra-discovery/        # Module 3
│   ├── admin/partners/         # Admin dashboard
│   └── docs/                   # Documentation site
├── components/
│   ├── header.tsx              # Header with wallet & chain selector
│   ├── mobile-nav.tsx          # Mobile bottom navigation
│   ├── ecosystem-partners-section.tsx
│   ├── wallet-cleanup-content.tsx
│   ├── transaction-explainer-content.tsx
│   └── infra-discovery-content.tsx
├── lib/
│   ├── sui-provider.tsx        # @mysten/dapp-kit setup
│   ├── chain-store.tsx         # Zustand store for chains
│   ├── network-context.tsx     # Network provider
│   ├── wallet-store.ts         # Wallet state
│   ├── partners-data.ts        # Partner listings
│   └── ...
├── utils/api/
│   ├── blockberry.ts           # Blockberry API client
│   └── blockvision.ts          # Blockvision API client
└── globals.css                 # Design tokens & theme`}
        </pre>
      </section>

      <section>
        <h2>State Management</h2>
        <ul>
          <li>
            <strong>Chain Store (Zustand):</strong> Current selected chain, supported chains, network sync
          </li>
          <li>
            <strong>Wallet Store:</strong> Connected wallet, account address, connection status
          </li>
          <li>
            <strong>React Context:</strong> Network provider for RPC selection
          </li>
          <li>
            <strong>Local Storage:</strong> Provider login, service listings (MVP)
          </li>
        </ul>
      </section>

      <section>
        <h2>Data Flow</h2>
        <ol>
          <li>User selects chain in header dropdown</li>
          <li>Chain store updates, triggers network sync</li>
          <li>User connects wallet via dapp-kit modal</li>
          <li>Wallet store persists connection</li>
          <li>Module component fetches data from Sui RPC</li>
          <li>Optional: Enrich with Blockberry/Blockvision APIs</li>
          <li>Display results with Phantom-style UI components</li>
        </ol>
      </section>

      <section>
        <h2>Wallet Integration</h2>
        <p>Built on @mysten/dapp-kit which automatically supports all Sui Wallet Standard-compliant wallets:</p>
        <ul>
          <li>Slush Wallet (original Sui Wallet, rebranded)</li>
          <li>Phantom (Sui support)</li>
          <li>OKX Wallet</li>
          <li>Nightly Wallet</li>
          <li>Suiet Wallet</li>
          <li>Ethos Wallet</li>
          <li>Glass Wallet</li>
          <li>Martian Wallet (Sui)</li>
          <li>Surf Wallet</li>
          <li>Any future standard-compliant wallets</li>
        </ul>
      </section>

      <section>
        <h2>Module Architecture</h2>
        <p>Each module follows the same pattern:</p>
        <ul>
          <li>
            <strong>Page Component:</strong> <code>app/[module]/page.tsx</code> - Metadata and layout
          </li>
          <li>
            <strong>Content Component:</strong> <code>components/[module]-content.tsx</code> - Main logic and UI
          </li>
          <li>
            <strong>Hooks:</strong> <code>useSuiClient</code>, <code>useCurrentAccount</code>,{" "}
            <code>useChainStore</code>
          </li>
          <li>
            <strong>API Calls:</strong> Direct RPC + optional enrichment APIs
          </li>
          <li>
            <strong>Sui-Only Scope:</strong> Check selected chain, show "Full functionality on Sui" for non-Sui
          </li>
        </ul>
      </section>

      <section>
        <h2>Design System</h2>
        <p>
          Color tokens in <code>globals.css</code>:
        </p>
        <ul>
          <li>
            <strong>Background:</strong> oklch(0.08 0.01 293) - Deep purple-black
          </li>
          <li>
            <strong>Primary:</strong> oklch(0.65 0.24 293) - Phantom purple
          </li>
          <li>
            <strong>Accent:</strong> oklch(0.65 0.24 293) - Purple/cyan gradient ready
          </li>
          <li>
            <strong>Border:</strong> oklch(0.22 0.02 293) - Subtle dividers
          </li>
          <li>
            <strong>Radius:</strong> 0.75rem - Smooth corners
          </li>
        </ul>
      </section>

      <section>
        <h2>Mobile Responsiveness</h2>
        <ul>
          <li>Tailwind responsive prefixes: sm:, md:, lg:, max-sm:</li>
          <li>Mobile-first layout approach</li>
          <li>Bottom navigation on mobile (MobileNav component)</li>
          <li>Stacked cards and scrollable grids on small screens</li>
          <li>Touch-friendly button sizes (min 44x44px)</li>
        </ul>
      </section>

      <section>
        <h2>Sui RPC Calls</h2>
        <p>
          Each module uses <code>useSuiClient()</code> from @mysten/dapp-kit:
        </p>
        <ul>
          <li>
            <strong>Wallet Cleanup:</strong> getCoins(), getOwnedObjects(), getOwnedNFTs()
          </li>
          <li>
            <strong>Transaction Explainer:</strong> getTransactionBlock() with full options
          </li>
          <li>
            <strong>Infra Discovery:</strong> getValidators(), mock service data
          </li>
          <li>
            <strong>Usage Tracking:</strong> Mock quota dashboard (no RPC call needed)
          </li>
        </ul>
      </section>

      <section>
        <h2>Environment Variables</h2>
        <ul>
          <li>
            <strong>Blockchain Indexing API Key:</strong> Optional client-side key for Blockberry API
          </li>
          <li>
            <strong>Sui Indexing API Key:</strong> Optional client-side key for Blockvision API
          </li>
        </ul>
        <p>
          These are public blockchain APIs designed for client-side use with domain restrictions at provider dashboards.
        </p>
      </section>

      <section>
        <h2>Deployment</h2>
        <ul>
          <li>Built for Vercel deployment</li>
          <li>Next.js 16 optimizations enabled</li>
          <li>Environment variables configured in Vercel project settings</li>
          <li>Domain restrictions set in Blockberry/Blockvision dashboards</li>
        </ul>
      </section>

      <section>
        <h2>Future Enhancements</h2>
        <ul>
          <li>Multichain support (Aptos, Mina with unified SDKs)</li>
          <li>Backend database for service listings</li>
          <li>CMS integration for partner ads</li>
          <li>Real Move smart contracts for payments</li>
          <li>Advanced analytics and user behavior tracking</li>
          <li>User accounts and saved preferences</li>
        </ul>
      </section>
    </article>
  )
}
