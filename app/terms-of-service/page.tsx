import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service - Atlas Protocol",
  description: "Atlas Protocol Terms of Service and legal agreements",
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: January 2026</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">1. Agreement & Acceptance</h2>
            <p className="leading-relaxed">
              By accessing and using Atlas Protocol (the "Service"), you accept and agree to be bound by the terms and
              provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">2. Service Description</h2>
            <p className="leading-relaxed mb-4">
              Atlas Protocol provides a comprehensive toolkit for blockchain infrastructure management on Sui and Move
              ecosystems. Our services include:
            </p>
            <ul className="space-y-3 ml-6">
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>
                  <strong>Wallet Cleanup:</strong> Analyze and clean up wallet holdings with scam detection
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>
                  <strong>Transaction Explainer:</strong> Understand blockchain transactions with security analysis
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>
                  <strong>Infra Discovery:</strong> Discover and purchase access to 50+ blockchain infrastructure
                  providers
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>
                  <strong>Payment Processing:</strong> On-chain payment system for tier purchases
                </span>
              </li>
            </ul>
            <p className="leading-relaxed mt-4 text-yellow-600/80">
              <strong>BETA DISCLAIMER:</strong> Atlas Protocol is currently in beta. Features may change, be
              discontinued, or contain bugs. Use at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">3. User Responsibilities</h2>
            <p className="leading-relaxed mb-4">You acknowledge and agree that:</p>
            <ul className="space-y-3 ml-6">
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>You are responsible for all activities conducted through your wallet and account</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>You perform your own due diligence on all blockchain transactions and assets</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>You understand the risks of cryptocurrency, including total loss of funds</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Atlas Protocol does NOT provide financial advice or investment recommendations</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>You will not hold Atlas Protocol liable for any trading or investment losses</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">4. Disclaimers & Limitations</h2>
            <p className="leading-relaxed mb-4">
              <strong>NO WARRANTIES:</strong> Atlas Protocol is provided "AS IS" without warranties of any kind, express
              or implied. We make no warranty that the service will be uninterrupted, timely, secure, or error-free.
            </p>
            <p className="leading-relaxed">
              <strong>LIABILITY CAP:</strong> To the fullest extent permitted by law, Atlas Protocol and Treezure Labs
              shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including
              lost profits, loss of data, or business interruption.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">5. Non-Custody</h2>
            <p className="leading-relaxed">
              Atlas Protocol is a non-custodial platform. We do NOT hold, control, or have access to your private keys,
              cryptocurrency, or assets. All transactions are conducted directly on the blockchain with your explicit
              authorization.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">6. Prohibited Use</h2>
            <p className="leading-relaxed mb-4">You agree NOT to use Atlas Protocol for:</p>
            <ul className="space-y-3 ml-6">
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Any illegal activities or violations of applicable laws</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Money laundering, terrorist financing, or sanctions evasion</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Fraudulent schemes or pump-and-dump activities</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Accessing or attempting to hack the platform</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">7. Intellectual Property</h2>
            <p className="leading-relaxed">
              All content, features, and functionality of Atlas Protocol, including but not limited to text, graphics,
              logos, and code, are the exclusive property of Treezure Labs and are protected by copyright and other
              intellectual property laws. You may not reproduce, modify, or distribute any content without explicit
              written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">8. Termination</h2>
            <p className="leading-relaxed">
              Atlas Protocol reserves the right to suspend or terminate your access to the Service at any time, with or
              without notice, for violation of these terms or for any other reason deemed necessary to protect the
              integrity of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">9. Changes to Terms</h2>
            <p className="leading-relaxed">
              Atlas Protocol may update these terms at any time. Continued use of the Service constitutes acceptance of
              any changes. We will notify users of significant changes via email or platform notification.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">10. Contact</h2>
            <p className="leading-relaxed">
              For questions about these terms, please contact us at{" "}
              <a href="mailto:contact@atlasprotocol.com" className="text-primary hover:underline">
                contact@atlasprotocol.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
