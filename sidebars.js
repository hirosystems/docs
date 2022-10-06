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
    // {
    //   type: 'category',
    //   label: 'Explorer',
    //   items: [
    //     'explorer/introduction',
    //     'explorer/getting-started',
    //     'explorer/feature-guides',
    //     'explorer/how-to-guides',
    //     'explorer/troubleshooting',
    //     'explorer/faq',
    //     'explorer/developer-resources',
    //   ],
    // },
    /*{
      type: 'category',
      label: 'Clarinet',
      items: [
        'clarinet/introduction',
        'clarinet/getting-started',
        'clarinet/feature-guides',
        {
          type: 'category',
          label: 'How-To\'s',
          items: [
            'clarinet/how-to-guides/how-to-set-up-local-development-environment',
            'clarinet/how-to-guides/how-to-install-clarinet',
            'clarinet/how-to-guides/how-to-create-new-project',
            'clarinet/how-to-guides/how-to-add-contract',
            'clarinet/how-to-guides/how-to-check-contract',
            'clarinet/how-to-guides/how-to-test-contract',
            'clarinet/how-to-guides/how-to-monitor-test-coverage',
            'clarinet/how-to-guides/how-to-debug-contract',
            'clarinet/how-to-guides/how-to-analyse-with-check-checker',
            'clarinet/how-to-guides/how-to-run-integration-blockchain',
            'clarinet/how-to-guides/how-to-deploy-subnets',
          ],
        },
        'clarinet/troubleshooting',
        'clarinet/faq',
        'clarinet/developer-resources',
      ],
    },*/
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
        
      ],
    }, 
    /*{
      type: 'category',
      label: 'Stacks.js',
      items: [
        
        'stacks.js/stacks.js-overview',
        'stacks.js/getting-started',
        'stacks.js/feature-guides',
        {
          type: 'category',
          label: 'How-To\'s',
          items: [
            'stacks.js/how-to-guides/how-to-authenticate-users-with-connect',
            'stacks.js/how-to-guides/how-to-integrate-stacking-delegation',
            'stacks.js/how-to-guides/how-to-integrate-stacking',
            'stacks.js/how-to-guides/how-to-migrate-from-blockstack.js',
            'stacks.js/how-to-guides/how-to-sign-messages',
            'stacks.js/how-to-guides/how-to-sign-transactions',
            'stacks.js/how-to-guides/how-to-store-data-securely',
            'stacks.js/how-to-guides/how-to-use-stacks-connect-with-angular',
          ],
        },
        'stacks.js/faq',
        'stacks.js/developer-resources',
      ],
    },*/

    
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


