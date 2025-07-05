import type { BaseLayoutProps } from "@/components/layouts/shared";
/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: "Hiro Docs",
  },
  links: [
    // {
    //   text: "Get started",
    //   url: "/start",
    //   active: "nested-url",
    // },
    // Menu type - uses NavigationMenu component
    {
      type: "menu",
      text: "Tools",
      items: [
        {
          text: "Clarinet",
          description:
            "Development environment and testing framework for Clarity smart contracts.",
          url: "/tools/clarinet",
        },
        {
          text: "Chainhook",
          description: "Monitor and analyze Clarity smart contract activity.",
          url: "/tools/chainhook",
        },
        {
          text: "Contract monitoring",
          description: "Monitor and analyze Clarity smart contract activity.",
          url: "/tools/contract-monitoring",
        },
        {
          text: "Bitcoin indexer",
          description: "Indexer for Bitcoin blockchain data.",
          url: "/tools/bitcoin-indexer",
          isNew: true,
        },
      ],
    },
    {
      type: "menu",
      text: "APIs",
      items: [
        {
          text: "API keys",
          description: "API keys for accessing Hiro APIs.",
          url: "/resources/guides/api-keys",
        },
        {
          text: "Rate limits",
          description: "Rate limits for accessing Hiro APIs.",
          url: "/resources/guides/rate-limits",
        },
        {
          text: "Stacks API",
          description:
            "RESTful API for accessing Stacks blockchain data and functionality.",
          url: "/apis/stacks-blockchain-api",
        },
        {
          text: "Token Metadata API",
          description: "API for retrieving NFT and fungible token metadata.",
          url: "/apis/token-metadata-api",
        },
        {
          text: "Platform API",
          description:
            "API for accessing Hiro Platform data and functionality.",
          url: "/apis/platform-api",
        },
        {
          text: "Ordinals API",
          description: "API for Bitcoin Ordinals and inscriptions data.",
          url: "/apis/ordinals-api",
        },
        {
          text: "Runes API",
          description: "API for Bitcoin Runes data.",
          url: "/apis/runes-api",
        },
        {
          text: "Signer Metrics API",
          description:
            "API for accessing Signer metrics data and functionality.",
          url: "/apis/signer-metrics-api",
        },
      ],
    },
    {
      type: "menu",
      text: "Libraries & SDKs",
      items: [
        {
          text: "Stacks.js",
          description: "JavaScript library for building on Stacks.",
          url: "/reference/stacks.js",
        },
        {
          text: "Stacks Connect",
          description: "JavaScript library for connecting to Stacks wallets.",
          url: "/reference/stacks.js/connect-wallet",
        },
        {
          text: "Clarinet JS SDK",
          description: "JavaScript SDK for Clarinet.",
          url: "/tools/clarinet/sdk-introduction",
        },
        {
          text: "Clarinet JS Browser SDK",
          description: "JavaScript SDK for Clarinet in the browser.",
          url: "/tools/clarinet/browser-sdk-reference",
        },
        // {
        //   text: "Stacks Blockchain API Client",
        //   description: "Client SDK for the Stacks blockchain API.",
        //   url: "/reference/stacks-blockchain-api-client",
        // },
      ],
    },
    {
      type: "menu",
      text: "Resources",
      items: [
        {
          text: "Clarity lang",
          description: "Clarity language reference.",
          url: "/resources/clarity",
        },
        {
          text: "Guides",
          description: "Guides for building on Stacks.",
          url: "/resources/guides",
        },
        // {
        //   text: "Project templates",
        //   description: "Project templates for building on Stacks.",
        //   url: "/resources/templates",
        // },
        {
          text: "Snippets",
          description: "Code snippets for building on Stacks and Bitcoin.",
          url: "/resources/snippets",
        },
        {
          text: "Hiro Archive",
          description: "Archive of blockchain data.",
          url: "/resources/archive",
        },
        // {
        //   text: "Faucets",
        //   description: "Faucets for getting testnet tokens.",
        //   url: "/resources/faucets",
        // },
      ],
    },
  ],
};
