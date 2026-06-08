export default function WalletCleanupDocs() {
  return (
    <article className="max-w-4xl prose prose-invert">
      <h1>Wallet Cleanup Module Documentation</h1>

      <section>
        <h2>Overview</h2>
        <p>
          The Wallet Cleanup module provides comprehensive analysis and cleanup recommendations for Sui wallets. It
          automatically detects spam NFTs, dust tokens, and provides actionable insights for wallet optimization.
        </p>
      </section>

      <section>
        <h2>Features</h2>
        <ul>
          <li>
            <strong>NFT Classification:</strong> Spam detection, community ratings, floor prices
          </li>
          <li>
            <strong>Token Analysis:</strong> Identifies low-value tokens and dust
          </li>
          <li>
            <strong>Action Buttons:</strong> Send, sell, or hide assets
          </li>
          <li>
            <strong>Real-time Security:</strong> Powered by Blockberry and Blockvision APIs
          </li>
          <li>
            <strong>Wallet Connection:</strong> Supports all major Sui wallets (Slush, Phantom, OKX, etc.)
          </li>
        </ul>
      </section>

      <section>
        <h2>Data Sources</h2>
        <ul>
          <li>
            <strong>Sui RPC:</strong> useSuiClient() for wallet balance and asset data
          </li>
          <li>
            <strong>Blockberry API:</strong> NFT spam detection and security scoring
          </li>
          <li>
            <strong>Blockvision API:</strong> Token metadata and market data enrichment
          </li>
        </ul>
      </section>

      <section>
        <h2>Technical Implementation</h2>
        <pre className="bg-black p-4 rounded border border-border overflow-x-auto">
          {`// Hook usage example
const { account } = useCurrentAccount();
const suiClient = useSuiClient();

// Fetch wallet data
const fetchWalletAssets = async () => {
  const coins = await suiClient.getCoins({ owner: account.address });
  const nfts = await suiClient.getOwnedObjects({ owner: account.address });
};`}
        </pre>
      </section>

      <section>
        <h2>Filters</h2>
        <ul>
          <li>Asset type (NFTs, Tokens, All)</li>
          <li>Spam confidence level</li>
          <li>Price range</li>
          <li>Custom tags</li>
        </ul>
      </section>

      <section>
        <h2>Integration Points</h2>
        <ul>
          <li>Wallet connection via @mysten/dapp-kit</li>
          <li>Sui RPC for data fetching</li>
          <li>Blockberry for security analysis</li>
          <li>Blockvision for metadata enrichment</li>
        </ul>
      </section>

      <section>
        <h2>Sui-Only Scope</h2>
        <p>
          This module is exclusively available on Sui networks (Mainnet, Testnet, Devnet). When a non-Sui chain is
          selected, the module displays "Full functionality on Sui" messaging and disables interactive features.
        </p>
      </section>
    </article>
  )
}
