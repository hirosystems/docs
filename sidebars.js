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
    /*{
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
    }, */

    {
      type: 'category',
      label: 'Clarinet',
      items: [
        'clarinet/introduction',
        'clarinet/getting-started',
        {
          type: 'category',
          label: 'Feature guides',
          items: [
            'clarinet/feature-guides/analyze-with-check-checker',
            'clarinet/feature-guides/use-extensions',
          ],
        },
        {
          type: 'category',
          label: 'How-to guides',
          items: [
            'clarinet/how-to-guides/how-to-set-up-local-development-environment',
            'clarinet/how-to-guides/how-to-install-clarinet',
            'clarinet/how-to-guides/how-to-create-new-project',
            'clarinet/how-to-guides/how-to-add-contract',
            'clarinet/how-to-guides/how-to-check-contract',
            'clarinet/how-to-guides/how-to-test-contract',
            'clarinet/how-to-guides/how-to-debug-contract',
            'clarinet/how-to-guides/how-to-deploy-contracts',
            'clarinet/how-to-guides/how-to-run-integration-environment',
            'clarinet/how-to-guides/how-to-deploy-with-subnets',
          ],
        },
        'clarinet/troubleshooting',
        'clarinet/faq',
        {
          type: 'category',
          label: 'Developer resources',
          items: [
            'clarinet/developer-resources/contribution-guidelines',
            'clarinet/developer-resources/clarinet-discord',
            'clarinet/developer-resources/blogs',
            'clarinet/developer-resources/videos',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Stacks.js',
      items: [
        
        'stacks.js/overview',
        'stacks.js/getting-started',
        {
          type: 'category',
          label: 'Feature guides',
          items: [
            'stacks.js/feature-guides/authenticate-users-with-connect',
            'stacks.js/feature-guides/sign-messages',
            'stacks.js/feature-guides/sign-transactions',
            'stacks.js/feature-guides/store-data-securely',
          ],
        },
        {
          type: 'category',
          label: 'How-to guides',
          items: [
            'stacks.js/how-to-guides/how-to-integrate-stacking-delegation',
            'stacks.js/how-to-guides/how-to-integrate-stacking',
            'stacks.js/how-to-guides/how-to-migrate-from-blockstack.js',
            'stacks.js/how-to-guides/how-to-use-stacks-connect-with-angular',
          ],
        },
        'stacks.js/faq',
        {
          type: 'category',
          label: 'Developer resources',
          items: [
            'stacks.js/developer-resources/contribution-guidelines',
            'stacks.js/developer-resources/stacks.js-discord',
            'stacks.js/developer-resources/blogs',
            'stacks.js/developer-resources/videos',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Stacks blockchain API',
      items: [
        'stacks-blockchain-api/overview',
        'stacks-blockchain-api/getting-started',
        {
          type: 'category',
          label: 'Feature guides',
          items: [
            'stacks-blockchain-api/feature-guides/microblocks',
            'stacks-blockchain-api/feature-guides/nonce-handling',
            'stacks-blockchain-api/feature-guides/openapi-spec',
            'stacks-blockchain-api/feature-guides/pagination',
            'stacks-blockchain-api/feature-guides/rate-limiting',
            'stacks-blockchain-api/feature-guides/requesting-proofs',
            'stacks-blockchain-api/feature-guides/rosetta-support',
            'stacks-blockchain-api/feature-guides/search-endpoint',
            'stacks-blockchain-api/feature-guides/use-clarity-values',
            'stacks-blockchain-api/feature-guides/use-stacks-blockchain-api',
          ]
          },
            {
              type: 'category',
              label: 'How-to guides',
              items: [
                'stacks-blockchain-api/how-to-guides/how-to-deploy-service-dependencies',
                'stacks-blockchain-api/how-to-guides/how-to-handle-errors',
                'stacks-blockchain-api/how-to-guides/how-to-install-stacks-blockchain-api',
                'stacks-blockchain-api/how-to-guides/how-to-run-stacks-blockchain-api-docker',
                'stacks-blockchain-api/how-to-guides/how-to-upgrade-stacks-blockchain-api',
              ]
              },
              'stacks-blockchain-api/faqs',
        {
          type: 'category',
          label: 'Developer resources',
          items: [
            'stacks-blockchain-api/developer-resources/contribution-guidelines',
            'stacks-blockchain-api/developer-resources/stacks-blockchain-api-discord',
            'stacks-blockchain-api/developer-resources/blogs',
            'stacks-blockchain-api/developer-resources/videos',
          ]
          },
          {
            type: 'category',
            label: 'Stacks Explorer',
            items: [
              'stacks-explorer/overview',
              'stacks-explorer/getting-started',
                {
                  type: 'category',
                  label: 'Feature guides',
                  items: [
                    'stacks-explorer/feature-guides/feature-guide',
                  ]
                  },
                  {
                    type: 'category',
                    label: 'How-to guides',
                    items: [
                      'stacks-explorer/how-to-guides/how-to-run-build-explorer',
                    ]
                    },
                    
                    'stacks-explorer/faqs',
                      {
                        type: 'category',
                        label: 'Developer resources',
                        items: [
                          'stacks-explorer/developer-resources/contributor-guidelines',
                          'stacks-explorer/developer-resources/stacks-explorer-discord',
                          'stacks-explorer/developer-resources/blogs',
                          'stacks-explorer/developer-resources/videos',
                        ]
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
    'example-apps/billboard',
    'example-apps/heystack',
  ],
};
