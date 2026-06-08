export default function TransactionExplainerAudit() {
  return (
    <article className="max-w-4xl prose prose-invert">
      <h1>Transaction Explainer Module - Audit & Verification</h1>

      <section>
        <h2>Overview</h2>
        <p>
          This audit guide provides comprehensive testing procedures for the Transaction Explainer module, covering
          real-world transaction analysis, security detection, and UI/UX verification across multiple scenarios.
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
            <strong>APIs:</strong> Blockberry (live security checks), SuiClient RPC (getTransactionBlock)
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

        <h3>1. Real Testnet Transaction Digest Fetching</h3>
        <ul>
          <li>[ ] Obtain real Testnet transaction digest from explorer (suiscan.xyz or suivision.xyz)</li>
          <li>[ ] Paste full explorer URL → verify URL parsing works correctly</li>
          <li>[ ] Paste transaction digest (hex format) → verify parsing</li>
          <li>[ ] Paste transaction digest (base64 format) → verify parsing</li>
          <li>[ ] Check console logs for: "[v0] Transaction fetched successfully"</li>
          <li>[ ] Verify transaction status displays (success/failed)</li>
          <li>[ ] Confirm timestamp and block number display</li>
        </ul>

        <h3>2. Transaction Data Parsing & Summary Generation</h3>
        <ul>
          <li>[ ] Transfer detection: Verify correct sender/recipient addresses parse</li>
          <li>[ ] Balance changes: Confirm amount in SUI displays with correct decimals</li>
          <li>[ ] Object changes: Verify count of created/modified/deleted objects</li>
          <li>[ ] Events emitted: Confirm event count displays correctly</li>
          <li>[ ] Gas fees: Verify gas cost calculation and display (SUI units)</li>
          <li>[ ] Summary lists all transaction actions in plain English</li>
          <li>[ ] Check console for: "[v0] Generated X summary items"</li>
        </ul>

        <h3>3. Transfer Flow Visualization with Arrows</h3>
        <ul>
          <li>[ ] Find transaction with balance changes (transfer)</li>
          <li>[ ] Verify "Transfer Flow" section appears</li>
          <li>[ ] Check sender address displays (truncated with "...")</li>
          <li>[ ] Verify arrow icon renders between sender and recipient</li>
          <li>[ ] Check recipient address displays</li>
          <li>[ ] Verify transfer amount appears in center</li>
          <li>[ ] Confirm styling uses blue accents from theme</li>
          <li>[ ] Test on mobile → arrow should wrap/stack correctly</li>
        </ul>

        <h3>4. Blockberry Live Security Flags</h3>
        <ul>
          <li>[ ] Transaction with known suspicious contract → security warning toast appears</li>
          <li>[ ] Blockberry API returns "danger" → warning displayed prominently</li>
          <li>[ ] Check console for: "[v0] Security check: danger"</li>
          <li>[ ] API timeout or error → gracefully handled, continue showing transaction</li>
          <li>[ ] Normal transaction → no security warning (only info)</li>
        </ul>

        <h3>5. "Explain Another" Button Functionality</h3>
        <ul>
          <li>[ ] After viewing transaction, "Explain Another" button visible</li>
          <li>[ ] Click button → input field clears</li>
          <li>[ ] Previous transaction data removed from display</li>
          <li>[ ] Focus returns to input field (UX verification)</li>
          <li>[ ] Raw JSON toggle resets to hidden</li>
          <li>[ ] Error messages clear</li>
          <li>[ ] Ready for new transaction input</li>
        </ul>

        <h3>6. Raw JSON Toggle</h3>
        <ul>
          <li>[ ] Transaction displays summary by default</li>
          <li>[ ] Click "Show Raw JSON" button → full JSON displays</li>
          <li>[ ] JSON is properly formatted with indentation</li>
          <li>[ ] Syntax highlighting applies (if implemented)</li>
          <li>[ ] Click again to hide JSON</li>
          <li>[ ] Summary still accessible after toggle</li>
        </ul>

        <h3>7. Input Format Validation</h3>
        <ul>
          <li>[ ] Hex format digest: 0x followed by 64 hex characters</li>
          <li>[ ] Base64 format digest: 43-44 alphanumeric characters</li>
          <li>[ ] URL format: https://suiscan.xyz/testnet/tx/[digest]</li>
          <li>[ ] URL format: https://suivision.xyz/testnet/tx/[digest]</li>
          <li>[ ] Invalid input → toast error: "Invalid Input"</li>
          <li>[ ] Empty input → toast error when searching</li>
        </ul>

        <h3>8. Error Handling & Edge Cases</h3>
        <ul>
          <li>[ ] Non-existent digest → error message displays with helpful text</li>
          <li>[ ] Wallet disconnects mid-fetch → graceful error handling</li>
          <li>[ ] RPC timeout → error message with retry option</li>
          <li>[ ] Malformed URL input → helpful error message</li>
          <li>[ ] Network switch mid-fetch → automatically uses correct RPC</li>
          <li>[ ] Invalid JSON parsing → graceful fallback</li>
        </ul>

        <h3>9. Multi-Wallet Testing</h3>
        <ul>
          <li>[ ] Connect with Suiet → fetch and display transaction</li>
          <li>[ ] Switch to OKX Wallet → transaction still displays/refetchable</li>
          <li>[ ] Switch to Phantom → transaction fetches correctly</li>
          <li>[ ] Verify wallet connection doesn't affect transaction display</li>
          <li>[ ] Test with disconnected wallet → still able to analyze transactions</li>
        </ul>

        <h3>10. Dark/Light Mode Compatibility</h3>
        <ul>
          <li>[ ] Toggle theme in header</li>
          <li>[ ] Summary text readable in both modes (contrast ≥ 4.5:1)</li>
          <li>[ ] Transfer flow visualization visible and clear</li>
          <li>[ ] Status badges (success/failed) display correctly</li>
          <li>[ ] Icons visible and properly colored</li>
          <li>[ ] Input field clearly visible</li>
          <li>[ ] Buttons have proper contrast and hover states</li>
          <li>[ ] JSON display readable with proper background</li>
        </ul>

        <h3>11. Mobile Responsiveness</h3>
        <ul>
          <li>[ ] Test on iPhone 12/14 (375px width)</li>
          <li>[ ] Test on iPad (768px width)</li>
          <li>[ ] Test on Android device (360px width)</li>
          <li>[ ] Input field spans full width on mobile</li>
          <li>[ ] Search button accessible and touch-friendly (≥44px)</li>
          <li>[ ] Summary cards stack vertically</li>
          <li>[ ] Transfer flow wraps/stacks on small screens</li>
          <li>[ ] JSON display scrollable horizontally if needed</li>
          <li>[ ] All text readable without zooming</li>
        </ul>

        <h3>12. Performance Testing</h3>
        <ul>
          <li>[ ] Fetch time for transaction with 10+ balance changes: &lt;2s</li>
          <li>[ ] Fetch time for transaction with 50+ events: &lt;3s</li>
          <li>[ ] JSON rendering &lt;500ms</li>
          <li>[ ] Check browser console for "[v0] Transaction fetch time: Xms"</li>
          <li>[ ] No memory leaks on page refresh multiple times</li>
        </ul>

        <h3>13. Cross-Network Testing</h3>
        <ul>
          <li>[ ] Switch to Mainnet → transaction fetching works</li>
          <li>[ ] Switch to Devnet → transaction fetching works</li>
          <li>[ ] Switch back to Testnet → continues working</li>
          <li>[ ] Verify correct RPC endpoint used for each network</li>
        </ul>
      </section>

      <section>
        <h2>Console Logging Verification</h2>
        <p>Open browser DevTools (F12) and check for these debug messages:</p>
        <ul>
          <li>[ ] "[v0] Transaction digest validated: [digest]"</li>
          <li>[ ] "[v0] Fetching transaction via SuiClient..."</li>
          <li>[ ] "[v0] Transaction fetched successfully"</li>
          <li>[ ] "[v0] Generated X summary items"</li>
          <li>[ ] "[v0] Security check: [status]"</li>
          <li>[ ] "[v0] Error fetching transaction: [message]" (if applicable)</li>
        </ul>
      </section>

      <section>
        <h2>Test Results Template</h2>
        <pre>{`Test Date: ___________
Tester: ___________
Network: Sui Testnet
Overall Status: [ ] PASS [ ] FAIL

Summary:
- Real transaction fetching: [ ] PASS [ ] FAIL
- Data parsing & summaries: [ ] PASS [ ] FAIL
- Transfer flow visualization: [ ] PASS [ ] FAIL
- Blockberry security checks: [ ] PASS [ ] FAIL
- Explain Another button: [ ] PASS [ ] FAIL
- Error handling: [ ] PASS [ ] FAIL
- Dark/Light mode: [ ] PASS [ ] FAIL
- Mobile responsiveness: [ ] PASS [ ] FAIL
- Performance: [ ] PASS [ ] FAIL

Issues Found:
1. ___________
2. ___________
3. ___________

Notes:
___________`}</pre>
      </section>

      <section>
        <h2>Known Issues & Workarounds</h2>
        <ul>
          <li>Web3Modal MIME type error (non-blocking) - doesn't affect functionality</li>
          <li>If Blockberry API is unavailable, transaction still displays with local analysis</li>
        </ul>
      </section>
    </article>
  )
}
