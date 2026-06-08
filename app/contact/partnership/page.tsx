import { Mail, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { PartnershipContactForm } from "@/components/partnership-contact-form"

export const metadata = {
  title: "Partnership Inquiry - Atlas Protocol",
  description: "Connect with Atlas Protocol for partnerships, integrations, and collaboration opportunities.",
}

export default function PartnershipContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/20 opacity-80"></div>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: "url('/images/atlas-network-logo.png')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/50 dark:from-black/50 dark:to-navy-900/60"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>

        <div className="relative container mx-auto px-4 py-12 md:py-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">Partner with Atlas Protocol</h1>
          <p className="text-lg text-gray-200 max-w-2xl drop-shadow-md">
            We're always looking for strategic partnerships, integrations, and collaboration opportunities. Let's build
            the future of Sui infrastructure together.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Get in Touch</h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form and our team will reach out to discuss your partnership or collaboration ideas.
              </p>
            </div>

            {/* Contact Options */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Email</h3>
                  <a
                    href="mailto:partnerships@atlasprotocol.space"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    partnerships@atlasprotocol.space
                  </a>
                </div>
              </div>
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
                <h4 className="font-semibold text-foreground mb-2">Partnership Inquiries</h4>
                <p className="text-sm text-muted-foreground">Strategic partnerships and ecosystem integrations</p>
              </div>

              <div className="rounded-lg border border-accent/30 bg-accent/5 p-4">
                <h4 className="font-semibold text-foreground mb-2">Developer Integration</h4>
                <p className="text-sm text-muted-foreground">API access and technical integration support</p>
              </div>

              <div className="rounded-lg border border-secondary/30 bg-secondary/5 p-4">
                <h4 className="font-semibold text-foreground mb-2">Brand Collaboration</h4>
                <p className="text-sm text-muted-foreground">Marketing and brand partnership opportunities</p>
              </div>

              <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
                <h4 className="font-semibold text-foreground mb-2">Provider Registration</h4>
                <p className="text-sm text-muted-foreground">List your infrastructure service on Atlas</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-sm p-8">
            <PartnershipContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
