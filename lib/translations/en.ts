import type { Translations } from './types';

export const en: Translations = {
  navigation: {
    signIn: 'Sign in',
    menus: {
      tools: 'Tools',
      apis: 'APIs',
      libraries: 'Libraries & SDKs',
      resources: 'Resources',
    },
    search: 'Search',
    searchAriaLabel: 'Search',
    llmShare: {
      copyMarkdown: 'Copy markdown',
      viewAsMarkdown: 'View as Markdown',
      openIn: 'Open in',
      askQuestions: 'Ask questions about this page',
    },
    toc: {
      contents: 'Contents',
    },
    feedback: {
      question: 'How is this guide?',
      good: 'Good',
      bad: 'Bad',
      thankYou: 'Thank you for your feedback!',
      viewHere: 'View here',
      placeholder: 'Leave your feedback...',
      submit: 'Submit',
      submitting: 'Submitting...',
    },
  },
  breadcrumb: {
    // Main sections
    tools: 'Tools',
    apis: 'APIs',
    reference: 'Reference',
    resources: 'Resources',

    // Common terms
    api: 'API',
    cli: 'CLI',
    rpc: 'RPC',
    http: 'HTTP',
    sdk: 'SDK',
    sip: 'SIP',
    bns: 'BNS',
    stx: 'STX',
    nft: 'NFT',
    btc: 'BTC',
    auth: 'Auth',

    // Tools
    chainhook: 'Chainhook',

    // Specific pages/sections
    guides: 'Guides',
    snippets: 'Snippets',
    archive: 'Archive',
  },
  tools: {
    chainhook: {
      title: 'Chainhook',
      description: 'Monitor and analyze Clarity smart contract activity.',
    },
    contractMonitoring: {
      title: 'Contract Monitoring',
      description: 'Monitor and analyze Clarity smart contract activity.',
    },
    bitcoinIndexer: {
      title: 'Bitcoin Indexer',
      description: 'Indexer for Bitcoin blockchain data.',
    },
  },
  apis: {
    apiKeys: {
      title: 'API keys',
      description: 'API keys for accessing Hiro APIs.',
    },
    rateLimits: {
      title: 'Rate limits',
      description: 'Rate limits for accessing Hiro APIs.',
    },
    stacksApi: {
      title: 'Stacks API',
      description: 'RESTful API for accessing Stacks blockchain data and functionality.',
    },
    stacksNodeRpcApi: {
      title: 'Stacks Node RPC API',
      description:
        'Raw blockchain node methods: submit txs, call read-only contracts, query mempool/state.',
    },
    tokenMetadata: {
      title: 'Token Metadata API',
      description: 'API for retrieving NFT and fungible token metadata.',
    },
    platform: {
      title: 'Platform API',
      description: 'API for accessing Hiro Platform data and functionality.',
    },
    ordinals: {
      title: 'Ordinals API',
      description: 'API for Bitcoin Ordinals and inscriptions data.',
    },
    runes: {
      title: 'Runes API',
      description: 'API for Bitcoin Runes data.',
    },
    signerMetrics: {
      title: 'Signer Metrics API',
      description: 'API for accessing Signer metrics data and functionality.',
    },
  },
  resources: {
    guides: {
      title: 'Guides',
      description: 'Guides for building on Stacks.',
    },
    snippets: {
      title: 'Snippets',
      description: 'Code snippets for building on Stacks and Bitcoin.',
    },
    archive: {
      title: 'Hiro Archive',
      description: 'Archive of blockchain data.',
    },
  },
};
