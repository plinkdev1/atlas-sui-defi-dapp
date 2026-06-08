export default function WalletCleanupAudit() {
  return (
    <article className="max-w-4xl prose prose-invert">
      <h1>Wallet Cleanup Module - Audit & Verification</h1>

      <section>
        <h2>Overview</h2>
        <p>
          This audit guide provides comprehensive testing procedures for the Wallet Cleanup module across real-world
          scenarios, multiple wallets, and edge cases.
        </p>
      </section>

      <section>
        <h2>Test Environment</h2>
        <ul>
          <li>
            <strong>Network:</strong> Sui Testnet
          </li>
          <li>
            <strong>Wallets:</strong> Suiet, OKX Wallet, Phantom
          </li>
          <li>
            <strong>APIs:</strong> Blockberry (live), Blockvision (live)
          </li>
          <li>
            <strong>Theme:</strong> Dark mode and Light mode
          </li>
          <li>
            <strong>Device:</strong> Desktop and Mobile (responsive)
          </li>
        </ul>
      </section>

      <section>
        <h2>Test Cases</h2>

        <h3>1. Multi-Wallet Connection</h3>
        <table className="w-full border border-border">
          <thead>
            <tr className="border-b border-border">
              <th className="p-3 text-left">Wallet</th>
              <th className="p-3 text-left">Connection Status</th>
              <th className="p-3 text-left">Data Load</th>
              <th className="p-3 text-left">Result</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="p-3">Suiet</td>
              <td className="p-3">[ ] Pass [ ] Fail</td>
              <td className="p-3">[ ] Pass [ ] Fail</td>
              <td className="p-3">_______________</td>
            </tr>
            <tr className="border-b border-border">
              <td className="p-3">OKX Wallet</td>
              <td className="p-3">[ ] Pass [ ] Fail</td>
              <td className="p-3">[ ] Pass [ ] Fail</td>
              <td className="p-3">_______________</td>
            </tr>
            <tr className="border-b border-border">
              <td className="p-3">Phantom</td>
              <td className="p-3">[ ] Pass [ ] Fail</td>
              <td className="p-3">[ ] Pass [ ] Fail</td>
              <td className="p-3">_______________</td>
            </tr>
          </tbody>
        </table>

        <h3>2. Real NFT/Object Fetching (Testnet)</h3>
        <ul>
          <li>[ ] Verify wallet contains real objects on Testnet</li>
          <li>[ ] Check console logs for: "[v0] Total owned objects: X"</li>
          <li>[ ] Confirm NFT display with images loads correctly</li>
          <li>[ ] Verify metadata (name, creator, floor price) displays</li>
          <li>[ ] Test pagination if &gt; 10 objects present</li>
        </ul>

        <h3>3. Blockberry Live API Classification</h3>
        <ul>
          <li>[ ] Known legitimate NFT shows "safe" badge</li>
          <li>[ ] Known scam NFT shows "danger" badge with warning</li>
          <li>[ ] Security level displays (safe/warning/danger)</li>
          <li>[ ] Confidence score visible (e.g., "95% confidence")</li>
          <li>[ ] API errors display gracefully with fallback data</li>
        </ul>

        <h3>4. Bulk Hide/Burn Operations</h3>
        <ul>
          <li>[ ] Select multiple tokens/NFTs via checkbox</li>
          <li>[ ] "Bulk Hide Selected" button appears and is enabled</li>
          <li>[ ] Click bulk hide → items disappear from list</li>
          <li>[ ] localStorage correctly persists hidden state</li>
          <li>[ ] Burn modal appears with correct item count</li>
          <li>[ ] Confirm burn → toast notification shows</li>
          <li>[ ] Items removed from UI after burn</li>
          <li>[ ] Explorer link works (if tx sent)</li>
        </ul>

        <h3>5. Community Voting Persistence</h3>
        <ul>
          <li>[ ] Connected user (Supabase auth active)</li>
          <li>[ ] Rate an NFT: Click 👍 or 👎</li>
          <li>[ ] Toast shows "Rating submitted" locally</li>
          <li>[ ] Refresh page → rating persists</li>
          <li>[ ] Rate same NFT again → incremental change visible</li>
          <li>[ ] Check localStorage: nft-[id] key contains rating and hidden state</li>
          <li>[ ] Logout and login with different wallet → ratings still accessible</li>
        </ul>

        <h3>6. Dark/Light Mode Compatibility</h3>
        <ul>
          <li>[ ] Toggle theme in header</li>
          <li>[ ] All text remains readable (contrast ≥ 4.5:1)</li>
          <li>[ ] NFT images display correctly in both modes</li>
          <li>[ ] Security badges (safe/danger/warning) visible in both modes</li>
          <li>[ ] Modals and dropdowns styled correctly</li>
          <li>[ ] Buttons have proper hover states in both modes</li>
        </ul>

        <h3>7. Mobile Responsiveness</h3>
        <ul>
          <li>[ ] Test on iPhone 12/14 (375px width)</li>
          <li>[ ] Test on iPad (768px width)</li>
          <li>[ ] Test on Android device (360px width)</li>
          <li>[ ] NFT cards stack vertically on mobile</li>
          <li>[ ] Buttons are touch-friendly (min 44px height)</li>
          <li>[ ] Filters and sort dropdown work on mobile</li>
          <li>[ ] Horizontal scroll works for token tables</li>
          <li>[ ] Modal displays correctly with proper padding</li>
        </ul>

        <h3>8. Error Handling & Edge Cases</h3>
        <ul>
          <li>[ ] Wallet disconnects mid-load → graceful error, retry button</li>
          <li>[ ] Blockberry API timeout → fallback to local classifications</li>
          <li>[ ] Empty wallet (no objects) → "No assets found" message</li>
          <li>[ ] Network switch mid-fetch → data refreshes automatically</li>
          <li>[ ] Invalid transaction digest in explorer → helpful error message</li>
          <li>[ ] RPC rate limit → queue requests, show loading state</li>
        </ul>

        <h3>9. Filtering & Sorting</h3>
        <ul>
          <li>[ ] Filter by classification (legit/dubious/scam)</li>
          <li>[ ] Filter by security level (safe/warning/danger)</li>
          <li>[ ] Toggle "Show Hidden" to reveal hidden items</li>
          <li>[ ] Sort by name (A-Z)</li>
          <li>[ ] Sort by balance (high to low)</li>
          <li>[ ] Sort by rating (highest first)</li>
          <li>[ ] Search query filters results in real-time</li>
        </ul>

        <h3>10. Console Logging Verification</h3>
        <p>Open DevTools → Console and verify these log patterns:</p>
        <pre className="bg-black p-4 rounded border border-border overflow-x-auto text-sm">
          {`[v0] Network or account changed, refreshing wallet cleanup data
[v0] Fetching real tokens from Sui blockchain for address: 0x...
[v0] Total token balances: X
[v0] Token scanning complete: [...]
[v0] Fetching real NFTs from Sui blockchain for address: 0x...
[v0] Total owned objects: X
[v0] Filtered NFT objects: Y
[v0] NFT scanning complete: [...]`}
        </pre>
      </section>

      <section>
        <h2>Test Results Template</h2>
        <pre className="bg-black p-4 rounded border border-border overflow-x-auto text-sm">
          {`WALLET CLEANUP AUDIT RESULTS
============================

Date: ________________
Tester: ________________
Network: Sui Testnet
Browser: ________________

MULTI-WALLET CONNECTION:
- Suiet: [ ] Pass [ ] Fail  Notes: _______________
- OKX:   [ ] Pass [ ] Fail  Notes: _______________
- Phantom: [ ] Pass [ ] Fail Notes: _______________

REAL DATA FETCHING:
- NFT Count: X
- Token Count: Y
- Blockberry API: [ ] Pass [ ] Fail
- Blockvision API: [ ] Pass [ ] Fail

OPERATIONS:
- Hide NFT: [ ] Pass [ ] Fail
- Burn Token: [ ] Pass [ ] Fail
- Bulk Operations: [ ] Pass [ ] Fail

PERSISTENCE:
- localStorage: [ ] Pass [ ] Fail
- Community Votes: [ ] Pass [ ] Fail
- Cross-session: [ ] Pass [ ] Fail

RESPONSIVE:
- Desktop: [ ] Pass [ ] Fail
- Tablet: [ ] Pass [ ] Fail
- Mobile: [ ] Pass [ ] Fail
- Dark Mode: [ ] Pass [ ] Fail
- Light Mode: [ ] Pass [ ] Fail

OVERALL: [ ] PASS [ ] FAIL
Issues Found: _________________________`}
        </pre>
      </section>

      <section>
        <h2>Known Test Addresses</h2>
        <ul>
          <li>
            <strong>Testnet NFT Account:</strong> Request from team (contains Capy Friends, etc.)
          </li>
          <li>
            <strong>Testnet Spam Account:</strong> For testing scam detection (known spam tokens)
          </li>
          <li>
            <strong>Mixed Portfolio:</strong> Real tokens + spam NFTs
          </li>
        </ul>
      </section>

      <section>
        <h2>How to Run Audit</h2>
        <ol>
          <li>Connect wallet with test account</li>
          <li>Run through each test case above</li>
          <li>Document pass/fail status</li>
          <li>Check console logs for debugging</li>
          <li>Open DevTools → Application → Storage → localStorage to inspect data</li>
          <li>Fill in results template</li>
          <li>Report issues to team</li>
        </ol>
      </section>

      <section>
        <h2>Debugging Tips</h2>
        <ul>
          <li>Open DevTools (F12) → Console tab to see all [v0] logs</li>
          <li>Check Network tab to verify API calls are made</li>
          <li>Inspect localStorage: DevTools → Application → Storage → localStorage</li>
          <li>Use React DevTools to inspect component state</li>
          <li>Check Sui Explorer (testnet.suiscan.xyz) for transaction status</li>
        </ul>
      </section>
    </article>
  )
}
