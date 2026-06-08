export default function InfraDiscoveryDocs() {
  return (
    <article className="max-w-4xl prose prose-invert">
      <h1>Infra Discovery Module Documentation</h1>

      <section>
        <h2>Overview</h2>
        <p>
          The Infra Discovery module provides a searchable, filterable marketplace for blockchain infrastructure
          services including RPC providers, indexing services, and ecosystem tools.
        </p>
      </section>

      <section>
        <h2>Features</h2>
        <ul>
          <li>
            <strong>RPC Services:</strong> Dedicated tab for RPC provider discovery
          </li>
          <li>
            <strong>Indexing Services:</strong> Dedicated tab for blockchain indexers
          </li>
          <li>
            <strong>Service Marketplace:</strong> Unified services tab with all providers
          </li>
          <li>
            <strong>Detailed Metadata:</strong> Service information with JSON export
          </li>
          <li>
            <strong>Validators:</strong> View active validators on Sui network
          </li>
          <li>
            <strong>Pricing Tiers:</strong> Starter, Growth, Pro plans with SUI/USDC payment
          </li>
          <li>
            <strong>Usage Tracking:</strong> Per-client quota dashboard and NGINX/Envoy configs
          </li>
          <li>
            <strong>Admin Features:</strong> Verification badges and listing moderation
          </li>
        </ul>
      </section>

      <section>
        <h2>Data Structure</h2>
        <pre className="bg-black p-4 rounded border border-border overflow-x-auto">
          {`interface InfraService {
  id: string;
  name: string;
  provider: string;
  type: 'RPC' | 'Indexing' | 'Gateway';
  chains: string[];
  pricing: {
    tier: string;
    price: number;
    currency: string;
  }[];
  tags: string[];
  sla: string;
  acceptedTokens: string[];
  verified: boolean;
  website: string;
  documentation: string;
}`}
        </pre>
      </section>

      <section>
        <h2>Tabs</h2>
        <ul>
          <li>
            <strong>RPC:</strong> Filtered view of RPC providers
          </li>
          <li>
            <strong>Indexing:</strong> Filtered view of indexing services
          </li>
          <li>
            <strong>Validators:</strong> Sui network validators
          </li>
          <li>
            <strong>Services:</strong> All services with full filters and search
          </li>
          <li>
            <strong>Usage:</strong> Quota tracking and proxy configuration
          </li>
        </ul>
      </section>

      <section>
        <h2>Onchain Payments</h2>
        <p>Each service tier includes a "Purchase" button. When connected to a Sui wallet:</p>
        <ul>
          <li>Payment modal shows transaction details</li>
          <li>User selects SUI or USDC token</li>
          <li>Mock transaction is prepared and confirmed</li>
          <li>Entitlement event is emitted (stub for future Move contracts)</li>
        </ul>
      </section>

      <section>
        <h2>Admin Panel</h2>
        <p>Access the admin panel for partner and service management (development only):</p>
        <ul>
          <li>View and edit service listings</li>
          <li>Export service data as JSON</li>
          <li>Toggle verification status</li>
          <li>Manage partner information</li>
        </ul>
      </section>

      <section>
        <h2>Sui-Only Scope</h2>
        <p>Purchase functionality and advanced features are only available on Sui networks.</p>
      </section>
    </article>
  )
}
