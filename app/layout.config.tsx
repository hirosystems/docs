import type { BaseLayoutProps } from '@/components/layouts/shared';
/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: 'Hiro Docs',
  },
  links: [
    // {
    //   text: "Get started",
    //   url: "/start",
    //   active: "nested-url",
    // },
    // Menu type - uses NavigationMenu component
    {
      type: 'menu',
      text: 'Tools',
      items: [
        {
          text: 'Chainhook',
          description: 'Monitor and analyze Clarity smart contract activity.',
          url: '/tools/chainhook',
          isBeta: true,
        },
        {
          text: 'Contract Monitoring',
          description: 'Monitor and analyze Clarity smart contract activity.',
          url: '/tools/contract-monitoring',
        },
        {
          text: 'Bitcoin Indexer',
          description: 'Indexer for Bitcoin blockchain data.',
          url: '/tools/bitcoin-indexer',
        },
      ],
    },
    {
      type: 'menu',
      text: 'APIs',
      items: [
        {
          text: 'API keys',
          description: 'API keys for accessing Hiro APIs.',
          url: '/resources/guides/api-keys',
        },
        {
          text: 'Rate limits',
          description: 'Rate limits for accessing Hiro APIs.',
          url: '/resources/guides/rate-limits',
        },
        {
          text: 'Stacks API',
          description: 'RESTful API for accessing Stacks blockchain data and functionality.',
          url: '/apis/stacks-blockchain-api',
        },
        {
          text: 'Stacks RPC Node API',
          description:
            'Raw blockchain node methods: submit txs, call read-only contracts, query mempool/state.',
          url: '/apis/stacks-node-rpc-api',
        },
        {
          text: 'Token Metadata API',
          description: 'API for retrieving NFT and fungible token metadata.',
          url: '/apis/token-metadata-api',
        },
        {
          text: 'Chainhook API',
          description: 'RESTful API for accessing Chainhook',
          url: '/apis/chainhook-api',
          isNew: true,
        },
        {
          text: 'Platform API',
          description: 'API for accessing Hiro Platform data and functionality.',
          url: '/apis/platform-api',
        },
        {
          text: 'Ordinals API',
          description: 'API for Bitcoin Ordinals and inscriptions data.',
          url: '/apis/ordinals-api',
        },
        {
          text: 'Runes API',
          description: 'API for Bitcoin Runes data.',
          url: '/apis/runes-api',
        },
        {
          text: 'Signer Metrics API',
          description: 'API for accessing Signer metrics data and functionality.',
          url: '/apis/signer-metrics-api',
        },
      ],
    },
    {
      type: 'menu',
      text: 'Resources',
      items: [
        {
          text: 'Guides',
          description: 'Guides for building on Stacks.',
          url: '/resources/guides',
        },
        {
          text: 'Hiro Archive',
          description: 'Archive of blockchain data.',
          url: '/resources/archive',
        },
      ],
    },
  ],
};
