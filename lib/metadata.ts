import type { Metadata } from "next/types";

const defaultMetadata: Metadata = {
  title: "Hiro Docs",
  description:
    "All the developer docs, guides and resources you need to build on Bitcoin layers.",
  openGraph: {
    title: "Hiro Docs",
    description:
      "All the developer docs, guides and resources you need to build on Bitcoin layers.",
    url: "https://docs.hiro.so",
    siteName: "Hiro Docs",
    images: [
      {
        url: "/og.jpg",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hiro Docs",
    description:
      "All the developer docs, guides and resources you need to build on Bitcoin layers.",
    creator: "@hirosystems",
    images: ["/og.jpg"],
  },
};

const apiKeysMetadata: Partial<Metadata> = {
  title: "API keys",
  description: "Learn how to get and use API keys for Hiro tools.",
  openGraph: {
    title: "API keys",
    description: "Learn how to get and use API keys for Hiro tools.",
    images: [
      {
        url: "/images/api-keys-og.jpg",
        width: 800,
        height: 600,
      },
    ],
  },
  twitter: {
    title: "API keys",
    description: "Learn how to get and use API keys for Hiro tools.",
    images: ["/images/api-keys-og.jpg"],
  },
};

const hiroHacksMetadata: Partial<Metadata> = {
  title: "Hiro Hacks",
  description:
    "Join Hiro Hacks and build on Bitcoin layers with our monthly themed challenges.",
  openGraph: {
    title: "Hiro Hacks",
    description:
      "Join Hiro Hacks and build on Bitcoin layers with our monthly themed challenges.",
    images: [
      {
        url: "/images/hh-og.png",
        width: 800,
        height: 600,
      },
    ],
  },
  twitter: {
    title: "Hiro Hacks",
    description:
      "Join Hiro Hacks and build on Bitcoin layers with our monthly themed challenges.",
    images: ["/images/hh-og.png"],
  },
};

const chainhookMetadata: Partial<Metadata> = {
  title: "Chainhook",
  description: "Learn how to use Chainhook for blockchain event streaming.",
  openGraph: {
    title: "Chainhook",
    description: "Learn how to use Chainhook for blockchain event streaming.",
    images: [{ url: "/images/chainhook-og.jpg", width: 800, height: 600 }],
  },
  twitter: {
    title: "Chainhook",
    description: "Learn how to use Chainhook for blockchain event streaming.",
    images: ["/images/chainhook-og.jpg"],
  },
};

const clarinetMetadata: Partial<Metadata> = {
  title: "Clarinet",
  description:
    "Build and test Clarity smart contracts with Clarinet's development tools.",
  openGraph: {
    title: "Clarinet",
    description:
      "Build and test Clarity smart contracts with Clarinet's development tools.",
    images: [{ url: "/images/clarinet-og.jpg", width: 800, height: 600 }],
  },
  twitter: {
    title: "Clarinet",
    description:
      "Build and test Clarity smart contracts with Clarinet's development tools.",
    images: ["/images/clarinet-og.jpg"],
  },
};

const clarinetJsSdkMetadata: Partial<Metadata> = {
  title: "Clarinet JS SDK",
  description:
    "Integrate Clarinet's testing capabilities into your development workflow.",
  openGraph: {
    title: "Clarinet JS SDK",
    description:
      "Integrate Clarinet's testing capabilities into your development workflow.",
    images: [
      { url: "/images/clarinet-js-sdk-og.jpg", width: 800, height: 600 },
    ],
  },
  twitter: {
    title: "Clarinet JS SDK",
    description:
      "Integrate Clarinet's testing capabilities into your development workflow.",
    images: ["/images/clarinet-js-sdk-og.jpg"],
  },
};

const cookbookMetadata: Partial<Metadata> = {
  title: "Hiro Cookbook",
  description: "Practical recipes and examples for building on Bitcoin layers.",
  openGraph: {
    title: "Hiro Cookbook",
    description: "Practical recipes and examples for building on Stacks.",
    images: [{ url: "/images/cookbook-og.jpg", width: 800, height: 600 }],
  },
  twitter: {
    title: "Hiro Cookbook",
    description:
      "Practical recipes and examples for building on Bitcoin layers.",
    images: ["/images/cookbook-og.jpg"],
  },
};

const guidesMetadata: Partial<Metadata> = {
  title: "Hiro Guides",
  description:
    "Comprehensive guides for building on Bitcoin layers with Hiro tools.",
  openGraph: {
    title: "Hiro Guides",
    description:
      "Comprehensive guides for building on Bitcoin layers with Hiro tools.",
    images: [{ url: "/images/guides-og.jpg", width: 800, height: 600 }],
  },
  twitter: {
    title: "Hiro Guides",
    description:
      "Comprehensive guides for building on Bitcoin layers with Hiro tools.",
    images: ["/images/guides-og.jpg"],
  },
};

const ordinalsApiMetadata: Partial<Metadata> = {
  title: "Ordinals API",
  description: "Interact with Bitcoin Ordinals using Hiro's Ordinals API.",
  openGraph: {
    title: "Ordinals API",
    description: "Interact with Bitcoin Ordinals using Hiro's Ordinals API.",
    images: [{ url: "/images/ordinals-api-og.jpg", width: 800, height: 600 }],
  },
  twitter: {
    title: "Ordinals API",
    description: "Interact with Bitcoin Ordinals using Hiro's Ordinals API.",
    images: ["/images/ordinals-api-og.jpg"],
  },
};

const platformApiMetadata: Partial<Metadata> = {
  title: "Platform API",
  description: "Build applications with Hiro's Platform API services.",
  openGraph: {
    title: "Platform API",
    description: "Build applications with Hiro's Platform API services.",
    images: [{ url: "/images/platform-api-og.jpg", width: 800, height: 600 }],
  },
  twitter: {
    title: "Platform API",
    description: "Build applications with Hiro's Platform API services.",
    images: ["/images/platform-api-og.jpg"],
  },
};

const runesApiMetadata: Partial<Metadata> = {
  title: "Runes API",
  description: "Interact with Bitcoin Runes using Hiro's Runes API.",
  openGraph: {
    title: "Runes API",
    description: "Interact with Bitcoin Runes using Hiro's Runes API.",
    images: [{ url: "/images/runes-api-og.jpg", width: 800, height: 600 }],
  },
  twitter: {
    title: "Runes API",
    description: "Interact with Bitcoin Runes using Hiro's Runes API.",
    images: ["/images/runes-api-og.jpg"],
  },
};

const signerMetricsApiMetadata: Partial<Metadata> = {
  title: "Signer Metrics API",
  description:
    "Monitor and analyze Stacks signing metrics with the Signer Metrics API.",
  openGraph: {
    title: "Signer Metrics API",
    description:
      "Monitor and analyze Stacks signing metrics with the Signer Metrics API.",
    images: [
      {
        url: "/images/signer-metrics-api-og.jpg",
        width: 800,
        height: 600,
      },
    ],
  },
  twitter: {
    title: "Signer Metrics API",
    description:
      "Monitor and analyze Stacks signing metrics with the Signer Metrics API.",
    images: ["/images/signer-metrics-api-og.jpg"],
  },
};

const stacksApiMetadata: Partial<Metadata> = {
  title: "Stacks API",
  description: "Interact with the Stacks blockchain using Hiro's Stacks API.",
  openGraph: {
    title: "Stacks API",
    description: "Interact with the Stacks blockchain using Hiro's Stacks API.",
    images: [{ url: "/images/stacks-api-og.jpg", width: 800, height: 600 }],
  },
  twitter: {
    title: "Stacks API",
    description: "Interact with the Stacks blockchain using Hiro's Stacks API.",
    images: ["/images/stacks-api-og.jpg"],
  },
};

const stacksConnectMetadata: Partial<Metadata> = {
  title: "Stacks Connect",
  description:
    "Integrate Stacks authentication and transactions in your applications.",
  openGraph: {
    title: "Stacks Connect",
    description:
      "Integrate Stacks authentication and transactions in your applications.",
    images: [{ url: "/images/stacks-connect-og.jpg", width: 800, height: 600 }],
  },
  twitter: {
    title: "Stacks Connect",
    description:
      "Integrate Stacks authentication and transactions in your applications.",
    images: ["/images/stacks-connect-og.jpg"],
  },
};

const stacksJsMetadata: Partial<Metadata> = {
  title: "Stacks.js",
  description: "Build Stacks applications with the Stacks.js library.",
  openGraph: {
    title: "Stacks.js",
    description: "Build Stacks applications with the Stacks.js library.",
    images: [{ url: "/images/stacks-js-og.jpg", width: 800, height: 600 }],
  },
  twitter: {
    title: "Stacks.js",
    description: "Build Stacks applications with the Stacks.js library.",
    images: ["/images/stacks-js-og.jpg"],
  },
};

const tokenMetadataApiMetadata: Partial<Metadata> = {
  title: "Token Metadata API",
  description: "Access and manage token metadata on the Stacks blockchain.",
  openGraph: {
    title: "Token Metadata API",
    description: "Access and manage token metadata on the Stacks blockchain.",
    images: [
      { url: "/images/token-metadata-api-og.jpg", width: 800, height: 600 },
    ],
  },
  twitter: {
    title: "Token Metadata API",
    description: "Access and manage token metadata on the Stacks blockchain.",
    images: ["/images/token-metadata-api-og.jpg"],
  },
};

const bitcoinIndexerMetadata: Partial<Metadata> = {
  title: "Bitcoin Indexer",
  description:
    "Build accurate, lightweight databases with the Bitcoin Indexer.",
  openGraph: {
    title: "Bitcoin Indexer",
    description:
      "Build accurate, lightweight databases with the Bitcoin Indexer.",
    images: [
      { url: "/images/bitcoin-indexer-og.jpg", width: 800, height: 600 },
    ],
  },
  twitter: {
    title: "Bitcoin Indexer",
    description:
      "Build accurate, lightweight databases with the Bitcoin Indexer.",
    images: ["/images/bitcoin-indexer-og.jpg"],
  },
};

export function createMetadata(override: Partial<Metadata>): Metadata {
  return {
    ...defaultMetadata,
    ...override,
    openGraph: {
      ...defaultMetadata.openGraph,
      ...override.openGraph,
    },
    twitter: {
      ...defaultMetadata.twitter,
      ...override.twitter,
    },
  };
}

export const baseUrl =
  process.env.NODE_ENV === "development"
    ? new URL("http://localhost:3000")
    : new URL(`https://${process.env.NEXT_PUBLIC_VERCEL_URL!}`);

export function getRouteMetadata(path: string): Partial<Metadata> {
  if (
    path.startsWith("/stacks/api-keys") ||
    path.startsWith("/bitcoin/api-keys")
  ) {
    return apiKeysMetadata;
  }
  if (path.startsWith("/stacks/hacks")) return hiroHacksMetadata;
  if (path.startsWith("/tools/chainhook")) return chainhookMetadata;
  if (path.startsWith("/tools/clarinet")) return clarinetMetadata;
  if (path.startsWith("/tools/clarinet")) return clarinetJsSdkMetadata;
  if (path.startsWith("/resources/snippets")) return cookbookMetadata;
  if (path.startsWith("/resources/guides")) return guidesMetadata;
  if (path.startsWith("/apis/ordinals")) return ordinalsApiMetadata;
  if (path.startsWith("/apis/platform")) return platformApiMetadata;
  if (path.startsWith("/apis/runes")) return runesApiMetadata;
  if (path.startsWith("/apis/signer-metrics")) return signerMetricsApiMetadata;
  if (path.startsWith("/apis/stacks-blockchain")) return stacksApiMetadata;
  if (path.startsWith("/reference/stacks.js")) return stacksJsMetadata;
  if (path.startsWith("/reference/stacks.js")) return stacksConnectMetadata;
  if (path.startsWith("/apis/token-metadata")) return tokenMetadataApiMetadata;
  if (path.startsWith("/tools/bitcoin-indexer")) return bitcoinIndexerMetadata;
  return {};
}
