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
      label: 'Clarinet',
      items: [
        'clarinet/overview',
        'clarinet/getting-started',
        {
          type: 'category',
          label: 'Feature Guides',
          items: [
            'clarinet/feature-guides/analyze-with-check-checker',
            'clarinet/feature-guides/extend-clarinet',
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
            'clarinet/how-to-guides/how-to-deploy-contracts',
            'clarinet/how-to-guides/how-to-run-integration-environment',
            'clarinet/how-to-guides/how-to-deploy-with-subnets',
          ],
        },
        //'clarinet/troubleshooting',
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
              label: 'Clarinet - Discord',
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
              items: [
                'explorer/how-to-guides/build-explorer',
              ]
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
                      label: 'Explorer - Discord',
                      href: 'https://discord.com/channels/621759717756370964/911531946738339900',
                    },
                    {
                      type: 'link',
                      label: 'Blogs',
                      href: 'https://www.hiro.so/search?query=Explorer',
                    },
                  ]
                  },
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
          ]
          },
            {
              type: 'category',
              label: 'How-to Guides',
              items: [
                'stacks-blockchain-api/how-to-guides/how-to-handle-errors',
                'stacks-blockchain-api/how-to-guides/how-to-use-docker-with-Stacks-blockchain-api',
                'stacks-blockchain-api/how-to-guides/how-to-run-stacks-blockchain-api-docker',
                'stacks-blockchain-api/how-to-guides/how-to-deploy-service-dependencies',
                'stacks-blockchain-api/how-to-guides/how-to-upgrade-stacks-blockchain-api',
              ]
              },
              'stacks-blockchain-api/faqs',
        {
          type: 'category',
          label: 'Developer Resources',
          items: [
            {
              type: 'link',
              label: 'Contribution Guidelines',
              href: 'https://github.com/hirosystems/stacks-blockchain-api',
            },
            {
              type: 'link',
              label: 'API - Discord',
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
            
          ]
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
              label: 'Stacks.js - Discord',
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
                  label: 'Developer Resources',
                  items: [
                    {
                      type: 'link',
                      label: 'Contribution Guidelines',
                      href: 'https://github.com/hirosystems/stacks-subnets',
                    },
                    {
                      type: 'link',
                      label: 'Blogs',
                      href: 'https://www.hiro.so/search?query=subnets',
                    },
                  ]
                  },
            ],
    },
    {
      type: 'category',
      label: 'Appendix',
      items: [
        'references/hiro-archiver',
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
