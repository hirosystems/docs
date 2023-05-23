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
      label: 'Chainhooks',
      items: [
        'chainhooks/overview',
        'chainhooks/getting-started',
        {
          type: 'category',
          label: 'How-to Guides',
          items: [
            'chainhooks/how-to-guides/how-to-use-chainhook-with-bitcoin',
            'chainhooks/how-to-guides/how-to-use-chainhook-with-stacks',
            'chainhooks/how-to-guides/how-to-run-chainhook-as-a-service',
          ],
        },
        'chainhooks/faq',
        {
          type: 'category',
          label: 'Developer Resources',
          items: [
            {
              type: 'link',
              label: 'Contribution Guidelines',
              href: 'https://github.com/hirosystems/chainhook/tree/develop',
            },
            {
              type: 'link',
              label: 'Discord #General',
              href: 'https://discord.com/channels/621759717756370964/621759718192447502',
            },
            {
              type: 'link',
              label: 'Blogs',
              href: 'https://www.hiro.so/blog/meet-4-new-features-in-clarinet',
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Clarinet',
      items: [
        'clarinet/introduction',
        'clarinet/getting-started',
        {
          type: 'category',
          label: 'Feature Guides',
          items: [
            'clarinet/feature-guides/analyze-with-check-checker',
            'clarinet/feature-guides/extend-clarinet',
            'clarinet/feature-guides/chainhooks',
            'clarinet/feature-guides/clarinet-deploy',
            'clarinet/feature-guides/clarinet-integrate',
            
          ],
        },
        {
          type: 'category',
          label: 'How-to Guides',
          items: [
            'clarinet/how-to-guides/how-to-set-up-local-development-environment',
            'clarinet/how-to-guides/how-to-create-new-project',
            'clarinet/how-to-guides/how-to-add-contract',
            'clarinet/how-to-guides/how-to-check-contract',
            'clarinet/how-to-guides/how-to-test-contract',
            'clarinet/how-to-guides/how-to-debug-contract',
            'clarinet/how-to-guides/how-to-run-integration-environment',
            'clarinet/how-to-guides/how-to-use-deployment-plans',
            'clarinet/how-to-guides/how-to-deploy-contracts',
            'clarinet/how-to-guides/how-to-deploy-with-subnets',
            
          ],
        },
        'clarinet/troubleshooting',
        'clarinet/faq',
        {
          type: 'category',
          label: 'Developer Resources',
          items: [
            {
              type: 'link',
              label: 'Contribution Guidelines',
              href: 'https://github.com/hirosystems/clarinet#contributing',
            },
            {
              type: 'link',
              label: 'Discord #clarinet',
              href: 'https://discord.com/channels/621759717756370964/839633619261456444',
            },
            {
              type: 'link',
              label: 'Blogs',
              href: 'https://www.hiro.so/search?query=Clarinet',
            },
            {
              type: 'link',
              label: 'Videos',
              href: 'https://www.youtube.com/c/HiroSystems/search?query=Clarinet',
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Explorer',
      items: [
        'explorer/overview',
        'explorer/getting-started',
        {
          type: 'category',
          label: 'How-to Guides',
          items: ['explorer/how-to-guides/build-explorer'],
        },
        {
          type: 'category',
          label: 'Developer Resources',
          items: [
            {
              type: 'link',
              label: 'Contribution Guidelines',
              href: 'https://github.com/hirosystems/explorer',
            },
            {
              type: 'link',
              label: 'Discord #explorer',
              href: 'https://discord.com/channels/621759717756370964/911531946738339900',
            },
            {
              type: 'link',
              label: 'Blogs',
              href: 'https://www.hiro.so/search?query=Explorer',
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Hiro Archive',
      items: [
        'hiro-archive/overview',
      ],
    }, 
    {
      type: 'category',
      label: 'Hiro Platform',
      items: [
        'platform/overview',
        'platform/getting-started',
        'platform/create-project',
        'platform/build-contract',
        'platform/deploy-project',
        'platform/archive-project',
        'platform/contract-examples',
        'platform/faq',
      ],
    }, 
    {
      type: 'category',
      label: 'Stacks Blockchain API',
      items: [
        'stacks-blockchain-api/overview',
        'stacks-blockchain-api/getting-started',
        {
          type: 'category',
          label: 'Feature Guides',
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
            'stacks-blockchain-api/feature-guides/gaia-storage',
            'stacks-blockchain-api/feature-guides/transactions',
          ]
          },
            {
              type: 'category',
              label: 'How-to Guides',
              items: [
                'stacks-blockchain-api/how-to-guides/how-to-install-stacks-cli',
                'stacks-blockchain-api/how-to-guides/how-to-run-api-node',
                'stacks-blockchain-api/how-to-guides/how-to-run-mainnet-node',
                'stacks-blockchain-api/how-to-guides/how-to-run-testnet-node',
                'stacks-blockchain-api/how-to-guides/how-to-handle-errors',
                'stacks-blockchain-api/how-to-guides/how-to-use-docker-with-Stacks-blockchain-api',
                'stacks-blockchain-api/how-to-guides/how-to-run-stacks-blockchain-api-docker',
                'stacks-blockchain-api/how-to-guides/how-to-deploy-service-dependencies',
                'stacks-blockchain-api/how-to-guides/how-to-upgrade-stacks-blockchain-api',
                'stacks-blockchain-api/how-to-guides/how-to-query-stacks2.0-blockchain',
              ]
              },
              'stacks-blockchain-api/troubleshooting',
              'stacks-blockchain-api/faqs',
        {
          type: 'category',
          label: 'Developer Resources',
          items: [
            {
              type: 'link',
              label: 'Stacks Blockchain JS Client API Reference',
              href: 'https://hirosystems.github.io/stacks-blockchain-api/client',
            },
            {
              type: 'link',
              label: 'Contribution Guidelines',
              href: 'https://github.com/hirosystems/stacks-blockchain-api',
            },
            {
              type: 'link',
              label: 'Discord #api',
              href: 'https://discord.com/channels/621759717756370964/909867922971820102',
            },
            {
              type: 'link',
              label: 'Blogs',
              href: 'https://www.hiro.so/search?query=blockchain-api',
            },
            {
              type: 'link',
              label: 'Videos',
              href: 'https://www.youtube.com/c/HiroSystems/search?query=API',
            },
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
          label: 'Feature Guides',
          items: [
            'stacks.js/feature-guides/authenticate-users-with-connect',
            'stacks.js/feature-guides/sign-messages',
            'stacks.js/feature-guides/sign-transactions',
            'stacks.js/feature-guides/store-data-securely',
            
          ],
        },
        {
          type: 'category',
          label: 'How-to Guides',
          items: [
            'stacks.js/how-to-guides/how-to-integrate-stacking-delegation',
            'stacks.js/how-to-guides/how-to-integrate-stacking',
            'stacks.js/how-to-guides/how-to-migrate-from-blockstack.js',
            'stacks.js/how-to-guides/how-to-use-stacks-connect-with-angular',
          ],
        },
        'stacks.js/troubleshooting',
        'stacks.js/faq',
        {
          type: 'category',
          label: 'Developer Resources',
          items: [
            {
              type: 'link',
              label: 'Contribution Guidelines',
              href: 'https://github.com/hirosystems/stacks.js/blob/master/CONTRIBUTING.md',
            },

            {
              type: 'link',
              label: 'Discord #stacks-js',
              href: 'https://discord.com/channels/621759717756370964/1022879438515486791',
            },
            {
              type: 'link',
              label: 'Blogs',
              href: 'https://www.hiro.so/search?query=Stacks.js',
            },
            {
              type: 'link',
              label: 'Videos',
              href: 'https://www.youtube.com/watch?v=SGrbeoCSHs0',
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Subnets',
      items: [
        'subnets/overview',
        'subnets/getting-started',
        {
          type: 'category',
          label: 'Feature Guides',
          items: [
            'subnets/feature-guides/trust-models',
          ],
        },
        {
          type: 'category',
          label: 'Developer Resources',
          items: [
            {
              type: 'link',
              label: 'Contribution Guidelines',
              href: 'https://github.com/hirosystems/stacks-subnets/blob/master/CONTRIBUTORS.md',
            },
            {
              type: 'link',
              label: 'Discord #General',
              href: 'https://discord.com/channels/621759717756370964/621759718192447502',
            },
            {
              type: 'link',
              label: 'Blogs',
              href: 'https://www.hiro.so/search?query=subnet',
            },
            {
              type: 'link',
              label: 'Videos',
              href: 'https://www.youtube.com/@HiroSystems/search?query=subnets',
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Token Metadata API',
      items: [
        {
          type: 'category',
          label: 'Feature Guides',
          items: [
            'token-metadata-api/feature-guides/token-metadata-api',
          ],
        },
      ],
    },
    {
      type: 'doc',
      label: 'Stacks 2.1 Upgrades',
      id: 'stacks-2.1-upgrades',
    },
    {
      type: 'category',
      label: 'Appendix',
      items: [
        'changelog/changelog-march',
        'changelog/changelog-february',
        'changelog/changelog-january',
        'changelog/changelog-december',
        'changelog/changelog-november',
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
