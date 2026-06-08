"use client"

import Image from "next/image"

export default function BlockchainsPage() {
  const blockchains = [
    {
      name: "Sui",
      logoPath: "/logos/sui-logo.png",
      description: "Layer 1 blockchain enabling low-cost, high-speed transactions with the Move programming language.",
      docsUrl: "https://docs.sui.io",
      status: "Live" as const,
      networks: ["Mainnet", "Testnet", "Devnet"],
    },
    {
      name: "Aptos",
      logoPath: "/logos/aptos-logo.png",
      description: "Move-based Layer 1 blockchain focused on scalability, safety, and reliability.",
      docsUrl: "https://aptos.dev/en/build/guides",
      status: "Coming Soon" as const,
      networks: ["Mainnet", "Testnet"],
    },
    {
      name: "Ethereum",
      logoPath: "/logos/ethereum-logo.png",
      description: "The leading smart contract platform with massive ecosystem and DeFi liquidity.",
      docsUrl: "https://ethereum.org/en/developers/docs/",
      status: "Coming Soon" as const,
      networks: ["Mainnet", "Sepolia", "Base"],
    },
    {
      name: "Mina Protocol",
      logoPath: "/logos/mina-logo.png",
      description: "Lightweight blockchain with succinct zero-knowledge proofs for privacy and scalability.",
      docsUrl: "https://docs.minaprotocol.com",
      status: "Coming Soon" as const,
      networks: ["Mainnet", "Berkeley Testnet"],
    },
    {
      name: "IOTA",
      logoPath: "/logos/iota-logo.png",
      description: "Distributed ledger with feeless transactions, perfect for IoT and machine economy.",
      docsUrl: "https://wiki.iota.org",
      status: "Coming Soon" as const,
      networks: ["Mainnet", "Shimmer Testnet"],
    },
    {
      name: "Monad",
      logoPath: "/logos/monad-logo.png",
      description: "High-performance EVM-compatible blockchain with pipelining consensus mechanism.",
      docsUrl: "https://monad.xyz",
      status: "Coming Soon" as const,
      networks: ["Mainnet", "Testnet"],
    },
  ]

  return (
    <div className="max-w-5xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-foreground">Blockchain Resources</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Official documentation and developer resources for all supported blockchains. Each blockchain has unique
          features, tools, and developer ecosystems.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {blockchains.map((blockchain) => (
          <a
            key={blockchain.name}
            href={blockchain.docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-6 border border-border rounded-lg hover:border-purple-500/50 hover:bg-purple-500/5 transition-all"
          >
            <div className="mb-4 h-12 w-12 relative">
              <Image
                src={blockchain.logoPath || "/placeholder.svg"}
                alt={`${blockchain.name} logo`}
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-purple-400 transition-colors">
              {blockchain.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-3">{blockchain.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {blockchain.networks.map((network) => (
                <span key={network} className="px-2 py-1 text-xs rounded bg-purple-500/10 text-purple-400">
                  {network}
                </span>
              ))}
            </div>
            <div
              className={`inline-flex items-center gap-2 text-sm font-medium ${
                blockchain.status === "Live" ? "text-green-400" : "text-yellow-400"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${blockchain.status === "Live" ? "bg-green-400" : "bg-yellow-400"}`}
              ></span>
              {blockchain.status}
            </div>
          </a>
        ))}
      </div>

      {/* Additional Resources */}
      <div className="mt-16 p-8 bg-card rounded-lg border border-border">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Getting Help</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Each blockchain has a vibrant developer community. Visit their official documentation sites above to access
            tutorials, API references, and community forums.
          </p>
          <p>
            For Atlas Protocol-specific questions about multi-chain support, reach out to our team through the contact
            page or Discord community.
          </p>
        </div>
      </div>
    </div>
  )
}
