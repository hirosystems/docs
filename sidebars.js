/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

module.exports = {
  docs: [
    'intro',
    {
      type: 'category',
      label: 'Get Started',
      items: [
        'get-started/transactions',
        'get-started/stacks-blockchain-api',
        'get-started/gaia-storage',
        'get-started/command-line-interface',
        'get-started/running-api-node',
        'get-started/running-mainnet-node',
        'get-started/running-testnet-node',
      ],
    },
    {
      type: 'category',
      label: 'Develop Smart Contracts',
      items: ['smart-contracts/clarinet', 'smart-contracts/devnet'],
    },
    {
      type: 'category',
      label: 'Build Frontend Apps',
      items: [
        'build-apps/overview',
        'build-apps/authentication',
        'build-apps/transaction-signing',
        'build-apps/message-signing',
        'build-apps/data-storage',
        'build-apps/integrate-stacking',
        'build-apps/integrate-stacking-delegation',
      ],
    },
    {
      type: 'category',
      label: 'Developer References',
      items: [
        'references',
        'references/stacks-cli',
        {
          type: 'category',
          label: 'Clarity',
          items: [
            {
              type: 'link',
              label: 'Language Overview',
              href: 'https://docs.stacks.co/docs/write-smart-contracts/clarity-language/',
            },
            {
              type: 'link',
              label: 'Types',
              href: 'https://docs.stacks.co/docs/write-smart-contracts/clarity-language/language-types',
            },
            {
              type: 'link',
              label: 'Keywords',
              href: 'https://docs.stacks.co/docs/write-smart-contracts/clarity-language/language-keywords',
            },
            {
              type: 'link',
              label: 'Functions',
              href: 'https://docs.stacks.co/references/language-functions',
            },
          ],
        },
        {
          type: 'category',
          label: 'Stacks.js',
          items: [
            {
              type: 'link',
              label: 'blockchain-api-client',
              href: 'https://hirosystems.github.io/stacks-blockchain-api/client/index.html',
            },
            {
              type: 'link',
              label: 'connect',
              href: 'https://github.com/hirosystems/connect#readme',
            },
            {
              type: 'link',
              label: 'auth',
              href: 'https://stacks.js.org/modules/auth.html',
            },
            {
              type: 'link',
              label: 'storage',
              href: 'https://stacks.js.org/modules/storage.html',
            },
            {
              type: 'link',
              label: 'transactions',
              href: 'https://stacks.js.org/modules/transactions.html',
            },
            {
              type: 'link',
              label: 'stacking',
              href: 'https://stacks.js.org/modules/stacking.html',
            },
            {
              type: 'link',
              label: 'keychain',
              href: 'https://stacks.js.org/modules/keychain.html',
            },
            {
              type: 'link',
              label: 'network',
              href: 'https://stacks.js.org/modules/network.html',
            },
            {
              type: 'link',
              label: 'encryption',
              href: 'https://stacks.js.org/modules/encryption.html',
            },
            {
              type: 'link',
              label: 'profile',
              href: 'https://stacks.js.org/modules/profile.html',
            },
            {
              type: 'link',
              label: 'common',
              href: 'https://stacks.js.org/modules/common.html',
            },
            {
              type: 'link',
              label: 'bns',
              href: 'https://stacks.js.org/modules/bns.html',
            },
            {
              type: 'link',
              label: 'wallet-sdk',
              href: 'https://stacks.js.org/modules/wallet_sdk.html',
            },
          ],
        },
      ],
    },
  ],
  tutorials: [
    'tutorials',
    {
      type: 'category',
      label: 'Stacks basics',
      items: [
        'tutorials/managing-accounts',
        'tutorials/sending-tokens',
        'tutorials/stacking-using-cli',
      ],
    },
    {
      type: 'category',
      label: 'Developing with Clarinet',
      items: [
        'tutorials/clarity-hello-world',
        'tutorials/clarity-counter',
        'tutorials/clarity-billboard',
        'tutorials/clarity-nft',
        'tutorials/testing-contracts',
      ],
    },
    {
      type: 'category',
      label: 'Storing data with Gaia',
      items: ['tutorials/gaia-amazon-deploy'],
    },
  ],
  'example-apps': [
    'example-apps',
    'example-apps/to-dos',
    'example-apps/public-registry',
    'example-apps/billboard',
    'example-apps/heystack',
    'example-apps/angular',
  ],
};
