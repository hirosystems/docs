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
    {
      text: "Get started",
      url: "/start",
      active: "nested-url",
    },
    // Menu type - uses NavigationMenu component
    {
      type: "menu",
      text: "Tools",
      url: "/tools",
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
        },
      ],
    },
    {
      type: "menu",
      text: "APIs",
      url: "/apis",
      items: [
        {
          text: "API keys",
          description: "API keys for accessing Hiro APIs.",
          url: "/apis/api-keys",
        },
        {
          text: "Rate limits",
          description: "Rate limits for accessing Hiro APIs.",
          url: "/apis/rate-limits",
        },
        {
          text: "Stacks API",
          description:
            "RESTful API for accessing Stacks blockchain data and functionality.",
          url: "/apis/stacks-blockchain",
        },
        {
          text: "Token Metadata API",
          description: "API for retrieving NFT and fungible token metadata.",
          url: "/apis/token-metadata",
        },
        {
          text: "Platform API",
          description:
            "API for accessing Hiro Platform data and functionality.",
          url: "/apis/platform",
        },
        {
          text: "Stacks Node RPC",
          description:
            "RPC API for accessing Stacks blockchain data and functionality.",
          url: "/apis/stacks-node-rpc",
        },
        {
          text: "Ordinals API",
          description: "API for Bitcoin Ordinals and inscriptions data.",
          url: "/apis/ordinals",
        },
        {
          text: "Runes API",
          description: "API for Bitcoin Runes data.",
          url: "/apis/runes",
        },
        {
          text: "Signer Metrics API",
          description:
            "API for accessing Signer metrics data and functionality.",
          url: "/apis/signer-metrics",
        },
      ],
    },
    {
      type: "menu",
      text: "Libraries & SDKs",
      url: "/reference",
      items: [
        {
          text: "Stacks.js",
          description: "JavaScript library for building on Stacks.",
          url: "/reference/stacks.js",
        },
        {
          text: "Clarinet JS SDK",
          description: "JavaScript SDK for Clarinet.",
          url: "/reference/clarinet-js-sdk",
        },
        {
          text: "Stacks Blockchain API Client",
          description: "Client SDK for the Stacks blockchain API.",
          url: "/reference/stacks-blockchain-api-client",
        },
      ],
    },
    {
      type: "menu",
      text: "Resources",
      url: "/resources",
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
        {
          text: "Project templates",
          description: "Project templates for building on Stacks.",
          url: "/resources/templates",
        },
        // {
        //   text: "Snippets",
        //   description: "Code snippets for building on Stacks.",
        //   url: "/resources/snippets",
        // },
        // {
        //   text: "Clarity VSCode extension",
        //   description: "VSCode extension for Clarity.",
        //   url: "/resources/clarity-vscode",
        // },
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
        // {
        //   text: "Contributors guide",
        //   description: "Guide for contributing to Hiro.",
        //   url: "/resources/contributors",
        // },
      ],
    },
  ],
};
