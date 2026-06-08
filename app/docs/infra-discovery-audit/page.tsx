"use client"

export default function InfraDiscoveryAudit() {
  return (
    <article className="max-w-4xl prose prose-invert">
      <h1>Infra Discovery Module - Audit & Verification Guide</h1>

      <section>
        <h2>Overview</h2>
        <p>
          This guide provides comprehensive testing procedures for the Infra Discovery module, covering user flows,
          provider management, admin controls, and payment functionality across multiple wallets and display modes.
        </p>
      </section>

      <section>
        <h2>Audit Scope</h2>
        <ul>
          <li>50+ infrastructure providers (RPC, Indexing, Gateway)</li>
          <li>User search/filter/export functionality</li>
          <li>Provider dashboard (create/edit/delete listings)</li>
          <li>Admin moderation (approve/reject/verify)</li>
          <li>Payment tiers and entitlements</li>
          <li>Dark/Light mode compatibility</li>
          <li>Mobile responsiveness</li>
          <li>Data persistence (Supabase)</li>
        </ul>
      </section>

      <section>
        <h2>Test Cases</h2>

        <h3>1. User: Search & Filter Providers</h3>
        <div className="space-y-4 bg-slate-900 p-4 rounded-lg">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-bold text-blue-300">Steps:</h4>
            <ol className="list-decimal ml-5 mt-2 text-sm">
              <li>Navigate to /docs/infra-discovery</li>
              <li>Click "Services" tab → view 50+ providers with logos</li>
              <li>Search "Shinami" → confirm filtered results</li>
              <li>Filter by "RPC" type → verify ~17 RPC providers show</li>
              <li>Filter by pricing "Free" → confirm correct providers</li>
              <li>Search "verified" → show only verified providers</li>
              <li>Click "Export Registry" → download JSON with all providers</li>
              <li>Verify JSON contains: rpc[], indexing[], gateways[], validators[]</li>
            </ol>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-bold text-green-300">Expected Results:</h4>
            <ul className="text-sm">
              <li>✓ Search returns accurate results instantly</li>
              <li>✓ Filters work in combination (multi-select)</li>
              <li>✓ JSON export includes all 50+ providers with metadata</li>
              <li>✓ Provider cards show logos, names, tags, pricing</li>
            </ul>
          </div>
        </div>

        <h3>2. Provider: Create/Edit Listing</h3>
        <div className="space-y-4 bg-slate-900 p-4 rounded-lg">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-bold text-blue-300">Steps:</h4>
            <ol className="list-decimal ml-5 mt-2 text-sm">
              <li>Connect wallet (Phantom, Suiet, or OKX)</li>
              <li>Navigate to /provider-dashboard</li>
              <li>Click "Add Service" → fill form (name, type, pricing, features)</li>
              <li>Select features: "Staking", "24/7 Support", "API Access"</li>
              <li>Set pricing: "Freemium"</li>
              <li>Click "Save Service" → confirm Supabase entry created</li>
              <li>Edit saved service → change pricing to "Paid"</li>
              <li>Verify changes persist after page refresh</li>
              <li>Delete service → confirm removal from list</li>
            </ol>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-bold text-green-300">Expected Results:</h4>
            <ul className="text-sm">
              <li>✓ Form validation prevents empty fields</li>
              <li>✓ Service saved to Supabase immediately</li>
              <li>✓ Edits persist across sessions</li>
              <li>✓ Features array correctly parsed/stored</li>
              <li>✓ Delete removes service from both UI and database</li>
              <li>✓ Toast notifications confirm all actions</li>
            </ul>
          </div>
        </div>

        <h3>3. Admin: Approve/Reject Listings</h3>
        <div className="space-y-4 bg-slate-900 p-4 rounded-lg">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-bold text-blue-300">Steps:</h4>
            <ol className="list-decimal ml-5 mt-2 text-sm">
              <li>Navigate to /admin (admin-only access)</li>
              <li>View "Pending Listings" section</li>
              <li>Click "Approve" on a provider → set "verified: true"</li>
              <li>Verify badge appears on provider card in main discovery</li>
              <li>Click "Reject" on another provider → confirm removal</li>
              <li>Toggle "Verification Badge" on approved service</li>
              <li>Refresh page → verify admin changes persist</li>
              <li>Log out → re-login as non-admin → confirm read-only view</li>
            </ol>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-bold text-green-300">Expected Results:</h4>
            <ul className="text-sm">
              <li>✓ Admin dashboard loads only for authorized users</li>
              <li>✓ Approve action updates Supabase verified column</li>
              <li>✓ Verified badge immediately appears on provider</li>
              <li>✓ Reject removes listing from user view</li>
              <li>✓ All changes persist across sessions</li>
              <li>✓ Non-admins cannot access /admin page</li>
            </ul>
          </div>
        </div>

        <h3>4. Payments: Purchase Tier & Entitlement</h3>
        <div className="space-y-4 bg-slate-900 p-4 rounded-lg">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-bold text-blue-300">Steps:</h4>
            <ol className="list-decimal ml-5 mt-2 text-sm">
              <li>Connect wallet to /docs/infra-discovery</li>
              <li>Click "Purchase" on a tier (e.g., Shinami Growth tier)</li>
              <li>Payment modal shows: price, token, provider name</li>
              <li>Select payment token: "SUI" or "USDC"</li>
              <li>Verify balance check (insufficient balance handling)</li>
              <li>Click "Confirm Payment" → mock transaction executes</li>
              <li>Verify transaction success message/toast</li>
              <li>Confirm entitlement event logged (check /api/entitlements)</li>
              <li>Test on Testnet and Mainnet networks</li>
              <li>Verify payment persists in user account</li>
            </ol>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-bold text-green-300">Expected Results:</h4>
            <ul className="text-sm">
              <li>✓ Payment modal shows correct pricing in SUI/USDC</li>
              <li>✓ Insufficient balance warning appears if needed</li>
              <li>✓ Transaction executes without errors</li>
              <li>✓ Entitlement event logged to database</li>
              <li>✓ User can view purchased tier in profile/dashboard</li>
              <li>✓ Tier access restrictions enforced</li>
            </ul>
          </div>
        </div>

        <h3>5. UI/UX: Dark/Light Modes</h3>
        <div className="space-y-4 bg-slate-900 p-4 rounded-lg">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-bold text-blue-300">Steps:</h4>
            <ol className="list-decimal ml-5 mt-2 text-sm">
              <li>Open /docs/infra-discovery in light mode</li>
              <li>Verify provider cards readable (contrast, text color)</li>
              <li>Check badges, tags, pricing displays correctly</li>
              <li>Verify search bar, filters styled appropriately</li>
              <li>Switch to dark mode (header toggle)</li>
              <li>Verify all elements remain readable and styled</li>
              <li>Check logo images render correctly on both modes</li>
              <li>Verify modals (detail, payment) work in both modes</li>
              <li>Test with Validators, Indexing tabs</li>
            </ol>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-bold text-green-300">Expected Results:</h4>
            <ul className="text-sm">
              <li>✓ Text contrast meets WCAG AA standards in both modes</li>
              <li>✓ Provider logos visible with appropriate backgrounds</li>
              <li>✓ All interactive elements properly styled</li>
              <li>✓ Modals layer correctly on dark/light backgrounds</li>
              <li>✓ No text cutoff or layout shifts</li>
            </ul>
          </div>
        </div>

        <h3>6. Mobile Responsiveness</h3>
        <div className="space-y-4 bg-slate-900 p-4 rounded-lg">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-bold text-blue-300">Steps:</h4>
            <ol className="list-decimal ml-5 mt-2 text-sm">
              <li>Open /docs/infra-discovery on mobile (iPhone/Android)</li>
              <li>Verify layout switches to mobile grid (1-2 columns)</li>
              <li>Test search bar responsiveness on mobile</li>
              <li>Tap filters → verify dropdown/modal works</li>
              <li>Scroll provider list → check infinite scroll/pagination</li>
              <li>Click provider card → detail modal opens properly</li>
              <li>Test payment modal on mobile (input fields accessible)</li>
              <li>Verify export JSON works on mobile browser</li>
              <li>Test all tabs (RPC, Indexing, Services, Validators, Usage)</li>
            </ol>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-bold text-green-300">Expected Results:</h4>
            <ul className="text-sm">
              <li>✓ Layout reflows smoothly to mobile dimensions</li>
              <li>✓ Touch targets 48px+ for buttons</li>
              <li>✓ Search/filter remain functional</li>
              <li>✓ Modals don't overflow screen</li>
              <li>✓ No horizontal scrolling needed</li>
            </ul>
          </div>
        </div>

        <h3>7. Multi-Wallet Testing</h3>
        <div className="space-y-4 bg-slate-900 p-4 rounded-lg">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-bold text-blue-300">Steps:</h4>
            <ol className="list-decimal ml-5 mt-2 text-sm">
              <li>Connect with Phantom → access provider dashboard</li>
              <li>Create a test service → verify saved to DB</li>
              <li>Disconnect, connect with Suiet</li>
              <li>Verify Suiet user sees their own services (not Phantom's)</li>
              <li>Disconnect, connect with OKX</li>
              <li>Repeat service creation with OKX</li>
              <li>Admin: view all services from all wallets</li>
              <li>Verify wallet isolation works correctly</li>
            </ol>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-bold text-green-300">Expected Results:</h4>
            <ul className="text-sm">
              <li>✓ Each wallet has separate provider listings</li>
              <li>✓ No data leakage between wallets</li>
              <li>✓ Admin can see all services regardless of wallet</li>
              <li>✓ Payment history properly attributed to each wallet</li>
            </ul>
          </div>
        </div>

        <h3>8. Validators Tab Verification</h3>
        <div className="space-y-4 bg-slate-900 p-4 rounded-lg">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-bold text-blue-300">Steps:</h4>
            <ol className="list-decimal ml-5 mt-2 text-sm">
              <li>Click "Validators" tab in Infra Discovery</li>
              <li>Verify validator list loads (name, commission, uptime)</li>
              <li>Filter by "active" status → show only active validators</li>
              <li>Search validator name → confirm instant filtering</li>
              <li>Click validator card → detail modal shows info</li>
              <li>Verify APY and voting power display correctly</li>
            </ol>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-bold text-green-300">Expected Results:</h4>
            <ul className="text-sm">
              <li>✓ Validator data loads from mock or live API</li>
              <li>✓ Filters work correctly on validator fields</li>
              <li>✓ Detail modal displays all fields properly</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2>Console Logging & Verification</h2>
        <p>Enable browser DevTools Console to verify these logs:</p>
        <div className="bg-slate-900 p-4 rounded-lg text-sm font-mono space-y-1">
          <div>[v0] Infra Discovery loaded successfully</div>
          <div>[v0] Provider fetched: Shinami (verified: true)</div>
          <div>[v0] Service created - ID: {"{id}"}</div>
          <div>[v0] Admin verification toggled: {"{provider}"}</div>
          <div>[v0] Payment processed - Amount: {"{amount}"} SUI</div>
          <div>[v0] Entitlement event emitted - User: {"{wallet}"}</div>
          <div>[v0] Database persistence verified</div>
        </div>
      </section>

      <section>
        <h2>Test Results Template</h2>
        <div className="bg-slate-900 p-4 rounded-lg text-sm space-y-2">
          <div>
            <strong>Test Date:</strong> [DATE]
          </div>
          <div>
            <strong>Tester:</strong> [NAME]
          </div>
          <div>
            <strong>Network:</strong> Testnet
          </div>
          <div className="space-y-1">
            <div>User Search/Export: [ ] PASS [ ] FAIL</div>
            <div>Provider Dashboard: [ ] PASS [ ] FAIL</div>
            <div>Admin Moderation: [ ] PASS [ ] FAIL</div>
            <div>Payment Processing: [ ] PASS [ ] FAIL</div>
            <div>Dark Mode: [ ] PASS [ ] FAIL</div>
            <div>Mobile: [ ] PASS [ ] FAIL</div>
            <div>Multi-Wallet: [ ] PASS [ ] FAIL</div>
            <div>DB Persistence: [ ] PASS [ ] FAIL</div>
          </div>
          <div>
            <strong>Issues Found:</strong> [LIST ANY BUGS]
          </div>
          <div>
            <strong>Notes:</strong> [ADDITIONAL OBSERVATIONS]
          </div>
        </div>
      </section>

      <section>
        <h2>Edge Cases & Error Handling</h2>
        <ul>
          <li>Disconnect wallet mid-payment → verify error toast</li>
          <li>Network switch while viewing provider details → refresh data</li>
          <li>Export with 0 providers → confirm empty/error handling</li>
          <li>Admin reject listing → confirm user cannot access</li>
          <li>Duplicate provider creation attempt → prevent duplicates</li>
          <li>Invalid JSON export file → corrupted download handling</li>
        </ul>
      </section>

      <section>
        <h2>Known Issues & Fixes</h2>
        <div className="space-y-3">
          <div className="bg-yellow-900/20 border border-yellow-700 p-3 rounded">
            <div className="font-bold text-yellow-300">Web3Modal MIME Type Error</div>
            <div className="text-sm mt-1">Non-blocking error in console. Does not affect functionality.</div>
          </div>
          <div className="bg-green-900/20 border border-green-700 p-3 rounded">
            <div className="font-bold text-green-300">All Major Features Working</div>
            <div className="text-sm mt-1">
              Provider discovery, payment tiers, admin moderation, and data persistence operational.
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2>Recommendations</h2>
        <ul>
          <li>Add real Blockberry API integration for security scoring</li>
          <li>Implement live provider status/uptime monitoring</li>
          <li>Add provider ratings/review system</li>
          <li>Create notification system for tier usage limits</li>
          <li>Add analytics dashboard for provider performance</li>
        </ul>
      </section>
    </article>
  )
}
