import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - Atlas Protocol",
  description: "Atlas Protocol privacy policy and data handling practices",
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: January 2026</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Atlas Protocol ("we," "us," "our," or "Company") is committed to protecting your privacy and ensuring you
              have a positive experience on our platform. This Privacy Policy explains how we collect, use, disclose,
              and otherwise process personal information in connection with our website and services.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong>Important:</strong> Atlas Protocol does not custody, hold, or have access to your cryptocurrency
              assets or private keys. We are a non-custodial platform that helps you manage and understand your
              blockchain activities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">2. Data Collection</h2>
            <h3 className="text-xl font-semibold text-foreground mb-3">What Information We Collect</h3>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Wallet Information</h4>
                <p className="text-muted-foreground">
                  When you connect your wallet, we collect your public wallet address. This information is used to
                  identify your account and provide personalized services. Your wallet address is pseudonymous and does
                  not personally identify you without additional information.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">Usage Analytics</h4>
                <p className="text-muted-foreground">
                  We use PostHog for analytics to understand how users interact with our platform. This includes page
                  views, feature usage, and performance metrics. You can opt-out of analytics at any time through your
                  privacy settings or by rejecting optional cookies.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">Consent History</h4>
                <p className="text-muted-foreground">
                  We store your cookie and consent preferences in Supabase to respect your choices. This information is
                  used solely to ensure we honor your privacy preferences across visits.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">Transaction Data</h4>
                <p className="text-muted-foreground">
                  When using our services (Wallet Cleanup, Transaction Explainer, Infra Discovery), we process
                  transaction information from the blockchain. This data is stored temporarily to provide the requested
                  service and is not shared without your explicit consent.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">3. How We Use Your Data</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Provide and improve our services (Wallet Cleanup, Transaction Explainer, Infra Discovery)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Understand user behavior and platform usage patterns</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Maintain and enhance platform security</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Process payments and manage entitlements</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Communicate with you about service updates</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">4. Data Sharing</h2>
            <p className="text-muted-foreground leading-relaxed">
              We do not sell or rent your personal information. We only share data:
            </p>
            <ul className="space-y-3 text-muted-foreground mt-4">
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>
                  With service providers who assist us (e.g., PostHog for analytics, Supabase for data storage)
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>When required by law or legal process</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>With your explicit consent</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">5. Cookies & Tracking</h2>
            <h3 className="text-xl font-semibold text-foreground mb-3">Types of Cookies We Use</h3>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Essential Cookies</h4>
                <p className="text-muted-foreground">
                  Required for basic platform functionality (authentication, session management). These cannot be
                  disabled.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">Analytics Cookies</h4>
                <p className="text-muted-foreground">
                  Help us understand how users use our platform. Managed through PostHog. You can opt-out at any time.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">Marketing Cookies</h4>
                <p className="text-muted-foreground">
                  Used for marketing purposes. Entirely optional and can be rejected.
                </p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mt-6">
              You can manage your cookie preferences through the banner that appears on your first visit and reappears
              every 20 days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">6. Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement industry-standard security measures including:
            </p>
            <ul className="space-y-3 text-muted-foreground mt-4">
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Data encryption in transit (TLS/SSL) and at rest</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Regular security audits and updates</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Row-Level Security (RLS) policies in our database</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>No storage of private keys or sensitive wallet information</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">7. Your Rights (GDPR & Privacy Laws)</h2>
            <p className="text-muted-foreground leading-relaxed">
              Depending on your jurisdiction, you have the right to:
            </p>
            <ul className="space-y-3 text-muted-foreground mt-4">
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>
                  <strong>Access:</strong> Request a copy of your personal data
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>
                  <strong>Delete:</strong> Request deletion of your data (right to be forgotten)
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>
                  <strong>Rectify:</strong> Correct inaccurate information
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>
                  <strong>Opt-out:</strong> Decline marketing communications and analytics
                </span>
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              To exercise these rights, contact us at{" "}
              <a href="/contact/partnership" className="text-primary hover:underline">
                contact us
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">8. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain personal data only as long as necessary to provide our services or comply with legal
              obligations. Consent records expire after 20 days and require renewal. Transaction and usage data is
              retained for 90 days for analytics purposes and then anonymized.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">9. International Data Transfers</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your information may be transferred to, stored in, and processed in countries other than your country of
              residence, including countries outside the European Economic Area. These countries may not have the same
              level of data protection as your home country. By using Atlas Protocol, you consent to such transfers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">10. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of significant changes by posting
              the updated policy on our website with a new "Last Updated" date. Your continued use of Atlas Protocol
              following such notification constitutes your acceptance of the updated Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">11. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about this Privacy Policy or our data practices, please contact us through our{" "}
              <a href="/contact/partnership" className="text-primary hover:underline">
                contact form
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
