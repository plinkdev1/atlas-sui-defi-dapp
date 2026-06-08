export default function TransactionExplainerDocs() {
  return (
    <article className="max-w-4xl prose prose-invert">
      <h1>Transaction Explainer Module Documentation</h1>

      <section>
        <h2>Overview</h2>
        <p>
          The Transaction Explainer module provides human-readable summaries of Sui transactions. Paste any transaction
          digest or explorer link to instantly understand what happened.
        </p>
      </section>

      <section>
        <h2>Features</h2>
        <ul>
          <li>
            <strong>Multi-format Input:</strong> Accepts hex digests and full Suiscan explorer URLs
          </li>
          <li>
            <strong>Human-Readable Summaries:</strong> Plain English explanation of transaction actions
          </li>
          <li>
            <strong>Visual Flow:</strong> Sender → recipient transfer visualization
          </li>
          <li>
            <strong>Detailed Breakdown:</strong> Gas fees, events, object changes, balance changes
          </li>
          <li>
            <strong>Raw JSON Toggle:</strong> Advanced mode for developers
          </li>
          <li>
            <strong>Error Handling:</strong> Graceful messages for invalid or missing transactions
          </li>
        </ul>
      </section>

      <section>
        <h2>Data Sources</h2>
        <ul>
          <li>
            <strong>Sui RPC:</strong> suiClient.getTransactionBlock() with full options
          </li>
          <li>
            <strong>Options Used:</strong> showEffects, showInput, showEvents, showObjectChanges, showBalanceChanges
          </li>
        </ul>
      </section>

      <section>
        <h2>Input Formats</h2>
        <ul>
          <li>
            <strong>Transaction Digest (Base64):</strong> <code>5JGH7XT23NoS5XWmsxS71LU7GgFCek5cTNN2KutAkeHQ</code>
          </li>
          <li>
            <strong>Transaction Digest (Hex):</strong> <code>0x1234567890abcdef...</code>
          </li>
          <li>
            <strong>Explorer Link:</strong> <code>https://suiscan.xyz/mainnet/tx/5JGH7XT23NoS...</code>
          </li>
        </ul>
      </section>

      <section>
        <h2>Technical Implementation</h2>
        <pre className="bg-black p-4 rounded border border-border overflow-x-auto">
          {`// Fetching transaction details
const fetchTransactionBlock = async (digest: string) => {
  const tx = await suiClient.getTransactionBlock({
    digest,
    options: {
      showEffects: true,
      showInput: true,
      showEvents: true,
      showObjectChanges: true,
      showBalanceChanges: true,
    },
  });
  return tx;
};`}
        </pre>
      </section>

      <section>
        <h2>Summary Parsing</h2>
        <ul>
          <li>Transfer detection and amounts</li>
          <li>Move call extraction and labeling</li>
          <li>Object creation/modification tracking</li>
          <li>Gas fee calculation in SUI</li>
          <li>Event parsing and categorization</li>
        </ul>
      </section>

      <section>
        <h2>Sui-Only Scope</h2>
        <p>Exclusively available on Sui networks. Shows "Full functionality on Sui" messaging on non-Sui chains.</p>
      </section>
    </article>
  )
}
