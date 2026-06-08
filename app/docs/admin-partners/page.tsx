export default function AdminPartnersDocs() {
  return (
    <article className="max-w-4xl prose prose-invert">
      <h1>Admin Partners System Documentation</h1>

      <section>
        <h2>Overview</h2>
        <p>
          The Admin Partners system provides a development-mode interface for managing ecosystem partner listings and
          advertisements. This is a stub for future CMS integration.
        </p>
      </section>

      <section>
        <h2>Access</h2>
        <p>
          Available at <code>/admin/partners</code> in development mode. This page provides:
        </p>
        <ul>
          <li>Partner data table view</li>
          <li>JSON export and copy functionality</li>
          <li>Stub for future admin features</li>
        </ul>
      </section>

      <section>
        <h2>Partner Data Structure</h2>
        <pre className="bg-black p-4 rounded border border-border overflow-x-auto">
          {`interface Partner {
  id: string;
  name: string;
  logo: string;
  tagline: string;
  website: string;
  chains: string[];
  badge?: 'Verified Partner' | 'Sui Foundation Grantee' | 'Official Infra';
  featured: boolean;
  slotType: 'hero' | 'medium-rect' | 'leaderboard';
}`}
        </pre>
      </section>

      <section>
        <h2>Features</h2>
        <ul>
          <li>
            <strong>Partner Table:</strong> View all partners with details
          </li>
          <li>
            <strong>JSON Export:</strong> Export full partner data as JSON
          </li>
          <li>
            <strong>Copy to Clipboard:</strong> Quick copy of JSON for backup
          </li>
          <li>
            <strong>CMS Stub:</strong> Placeholder for future admin forms
          </li>
        </ul>
      </section>

      <section>
        <h2>Default Partners</h2>
        <ul>
          <li>Blockberry - Blockchain indexing</li>
          <li>Blockvision - Sui indexing</li>
          <li>Shinami - RPC provider</li>
          <li>Mysten Labs - Core Sui team</li>
          <li>OKX Wallet - Multi-chain wallet</li>
          <li>Nightly - Wallet provider</li>
          <li>Suiet - Sui wallet</li>
          <li>Aptos Labs - Multichain relevance</li>
        </ul>
      </section>

      <section>
        <h2>Future Roadmap</h2>
        <ul>
          <li>Admin authentication and authorization</li>
          <li>CMS backend integration (Sanity, Strapi, Contentful)</li>
          <li>Partner application forms</li>
          <li>Analytics dashboard for ad impressions/clicks</li>
          <li>Verification workflow automation</li>
          <li>Dynamic pricing tiers management</li>
        </ul>
      </section>

      <section>
        <h2>JSON Import/Export</h2>
        <p>
          Partners are currently stored in <code>lib/partners-data.ts</code>. To update:
        </p>
        <ol>
          <li>Export JSON from admin panel</li>
          <li>Update the partners array in the source file</li>
          <li>Rebuild and deploy</li>
        </ol>
      </section>
    </article>
  )
}
