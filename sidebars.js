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
      type: 'html',
      value: 'APIs',
      className: 'section-title',
      defaultStyle: true,
    },
    {
      type: 'category',
      label: 'Ordinals API',
      items: [
        {
          type: 'doc',
          label: 'Overview',
          id: 'ordinals-api/overview',
        },
        {
          type: 'category',
          label: 'Feature Guides',
          items: ['ordinals-api/feature-guides/rate-limiting'],
        },
        {
          type: 'category',
          label: 'How-to Guides',
          items: ['api-keys'],
        },
        {
          type: 'category',
          label: 'Developer Resources',
          items: [
            {
              type: 'link',
              label: 'Discord #ordinals',
              href: 'https://discord.com/channels/621759717756370964/1101164749984649256',
            },
            {
              type: 'link',
              label: 'Blogs',
              href: 'https://www.hiro.so/search?query=Ordinals',
            },
            {
              type: 'link',
              label: 'Videos',
              href: 'https://www.youtube.com/watch?v=p1clYRMkaFI',
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Stacks Blockchain API',
      items: [
        {
          type: 'doc',
          label: 'Overview',
          id: 'stacks-blockchain-api/overview',
        },
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
          ],
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
            'stacks-blockchain-api/how-to-guides/how-to-run-stacks-blockchain-api-docker',
            'stacks-blockchain-api/how-to-guides/how-to-deploy-service-dependencies',
            'stacks-blockchain-api/how-to-guides/how-to-upgrade-stacks-blockchain-api',
            'stacks-blockchain-api/how-to-guides/how-to-query-stacks2.0-blockchain',
            'api-keys',
          ],
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
              href: 'https://github.com/hirosystems/stacks-blockchain-api/blob/master/.github/CONTRIBUTING.md',
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
      label: 'Token Metadata API',
      items: [
        'token-metadata-api/overview',
        'token-metadata-api/getting-started',
        {
          type: 'category',
          label: 'Feature Guides',
          items: [
            'token-metadata-api/feature-guides/metadata-api',
            'token-metadata-api/feature-guides/rate-limiting',
          ],
        },
        {
          type: 'category',
          label: 'How-to Guides',
          items: [
            'token-metadata-api/how-to-guides/how-to-use-image-cache-service',
            'token-metadata-api/how-to-guides/how-to-stop-service',
            'api-keys',
          ],
        },
        {
          type: 'category',
          label: 'Developer Resources',
          items: [
            {
              type: 'link',
              label: 'Discord #api',
              href: 'https://discord.com/channels/621759717756370964/909867922971820102',
            },
            {
              type: 'link',
              label: 'Blogs',
              href: 'https://www.hiro.so/search?query=Token+Metadata+API',
            },
            {
              type: 'link',
              label: 'Videos',
              href: 'https://www.youtube.com/watch?v=Hejsz-pivM4',
            },
          ],
        },
      ],
    },
    {
      type: 'html',
      value: 'PRODUCTS',
      className: 'section-title',
      defaultStyle: true,
    },
    {
      type: 'category',
      label: 'Chainhook',
      items: [
        'chainhook/overview',
        'chainhook/getting-started',
        {
          type: 'category',
          label: 'How-to Guides',
          items: [
            'chainhook/how-to-guides/how-to-run-chainhook-as-a-service-using-bitcoind',
            'chainhook/how-to-guides/how-to-run-chainhook-as-a-service-using-stacks',
            'chainhook/how-to-guides/how-to-use-chainhooks-with-bitcoin',
            'chainhook/how-to-guides/how-to-use-chainhooks-with-stacks',
          ],
        },
        'chainhook/faq',
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
            'clarinet/feature-guides/clarinet-js-sdk',
            'clarinet/feature-guides/test-contract-with-clarinet-sdk',
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
        {
          type: 'doc',
          label: 'Overview',
          id: 'explorer/overview',
        },
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
      items: ['hiro-archive/overview'],
    },
    {
      type: 'category',
      label: 'Hiro Platform',
      items: [
        'platform/overview',
        'platform/getting-started',
        'platform/connect-desktop-to-cloud',
        'platform/create-project',
        'platform/build-contract',
        'platform/create-chainhooks',
        'platform/deployment-plans',
        'platform/deploy-project',
        'platform/archive-project',
        'platform/faucet',
        'platform/faq',
      ],
    },
    {
      type: 'category',
      label: 'Ordhook',
      items: [
        'ordhook/overview',
        'ordhook/getting-started',
        {
          type: 'category',
          label: 'How-to Guides',
          items: [
            'ordhook/how-to-guides/how-to-run-ordhook-as-a-service-using-bitcoind',
            'ordhook/how-to-guides/how-to-scan-ordinal-activities',
            'ordhook/how-to-guides/how-to-stream-ordinal-activities',
          ],
        },
        {
          type: 'category',
          label: 'Developer Resources',
          items: [
            {
              type: 'link',
              label: 'Contribution Guidelines',
              href: 'https://github.com/hirosystems/ordhook/tree/develop',
            },
            {
              type: 'link',
              label: 'Discord #General',
              href: 'https://discord.com/channels/621759717756370964/621759718192447502',
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
        'stacks.js/installing',
        'stacks.js/getting-started',
        'stacks.js/connect',

        {
          type: 'category',
          label: 'Guides',
          items: [
            'stacks.js/guides/authenticate-users-with-connect',
            'stacks.js/guides/sign-messages',
            'stacks.js/guides/sign-transactions',
            'stacks.js/guides/store-data-securely',
            'stacks.js/guides/update-profile',

            'stacks.js/guides/how-to-integrate-stacking-delegation',
            'stacks.js/guides/how-to-integrate-stacking',
            'stacks.js/guides/how-to-migrate-from-blockstack.js',
            'stacks.js/guides/how-to-use-stacks-connect-with-angular',
          ],
        },

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
            'subnets/feature-guides/subnet-participants',
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
      type: 'html',
      value: 'OTHER',
      className: 'section-title',
      defaultStyle: true,
    },
    {
      type: 'category',
      label: 'Release History',
      items: [
        {
          type: 'link',
          label: 'August 2023',
          href: 'https://www.hiro.so/blog/release-roundup-august-2023',
        },
        {
          type: 'link',
          label: 'July 2023',
          href: 'https://www.hiro.so/blog/release-roundup-july-2023',
        },
        {
          type: 'link',
          label: 'June 2023',
          href: 'https://www.hiro.so/blog/release-roundup-june-2023',
        },
        {
          type: 'link',
          label: 'May 2023',
          href: 'https://www.hiro.so/blog/release-roundup-may-2023',
        },
        {
          type: 'link',
          label: 'April 2023',
          href: 'https://www.hiro.so/blog/release-roundup-april-2023',
        },
        {
          type: 'link',
          label: 'March 2023',
          href: 'https://www.hiro.so/blog/release-roundup-march-2023',
        },
        {
          type: 'link',
          label: 'February 2023',
          href: 'https://www.hiro.so/blog/release-roundup-february-2023',
        },
        {
          type: 'link',
          label: 'January 2023',
          href: 'https://www.hiro.so/blog/release-roundup-january-2023',
        },
        {
          type: 'link',
          label: 'December 2022',
          href: 'https://www.hiro.so/blog/release-roundup-december-2022',
        },
        {
          type: 'link',
          label: 'November 2022',
          href: 'https://www.hiro.so/blog/release-roundup-november-2022',
        },
        {
          type: 'link',
          label: 'October 2022',
          href: 'https://www.hiro.so/blog/release-roundup-october-2022',
        },
        {
          type: 'link',
          label: 'September 2022',
          href: 'https://www.hiro.so/blog/release-roundup-september-2022',
        },
        {
          type: 'link',
          label: 'August 2022',
          href: 'https://www.hiro.so/blog/release-roundup-august-2022',
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
    'example-apps/billboard',
    'example-apps/heystack',
  ],
};
