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
    {
          type: 'category',
          label: 'Introduction',
          items: [
            'explorer/explorer-overview',
          ],
        },
{
          type: 'category',
          label: 'How-To\'s',
          items: [
            'explorer/how-to-guides/how-to-install-explorer',
            'explorer/how-to-guides/how-to-run-and-build-explorer',
          ],
        },
    {
      type: 'category',
      label: 'Clarinet Overview',
      items: [
        'clarinet/introduction',
        'clarinet/getting-started',
        'clarinet/feature-guides',
        {
          type: 'category',
          label: 'How-To\'s',
          items: [
            'clarinet/how-to-guides/how-to-add-contract',
            'clarinet/how-to-guides/how-to-check-contract',
            'clarinet/how-to-guides/how-to-create-new-project',
            'clarinet/how-to-guides/how-to-debug-contract',
            'clarinet/how-to-guides/how-to-deploy-subnets',
            'clarinet/how-to-guides/how-to-do-static-analysis',
            'clarinet/how-to-guides/how-to-install-clarinet',
            'clarinet/how-to-guides/how-to-test-contract',
            'clarinet/how-to-guides/how-to-set-up-local-development-environment',
            'clarinet/how-to-guides/how-to-run-integration-blockchain',
          ],
        },
        'clarinet/troubleshooting',
        'clarinet/faq',
        'clarinet/developer-resources',
      ],
    },
   /* {
      type: 'category',
      label: 'Stacks blockchain API',
      items: [
        'stacks-blockchain-api/introduction',
        'stacks-blockchain-api/getting-started',
        'stacks-blockchain-api/feature-guides',
        'stacks-blockchain-api/how-to-guides',
        'stacks-blockchain-api/troubleshooting',
        'stacks-blockchain-api/faq',
        'stacks-blockchain-api/developer-resources',
      ],
    }, */
    {
      type: 'category',
      label: 'Stacks.js',
      items: [
        {
          type: 'category',
          label: 'Introduction',
          items: [
            'stacks.js/how-to-guides/how-to-add-dependencies',
          ],
        },
        'stacks.js/introduction',
        'stacks.js/getting-started',
        'stacks.js/feature-guides',
        {
          type: 'category',
          label: 'How-To\'s',
          items: [
            'stacks.js/how-to-guides/how-to-add-dependencies',
            'stacks.js/how-to-guides/how-to-authenticate-users-with-connect',
            'stacks.js/how-to-guides/how-to-integrate-stacking-delegation',
            'stacks.js/how-to-guides/how-to-integrate-stacking',
            'stacks.js/how-to-guides/how-to-migrate-from-blockstack.js',
            'stacks.js/how-to-guides/how-to-setup-environment',
            'stacks.js/how-to-guides/how-to-sign-messages',
            'stacks.js/how-to-guides/how-to-sign-transactions',
            'stacks.js/how-to-guides/how-to-store-data-securely',
            'stacks.js/how-to-guides/how-to-use-stacks-connect-with-angular',
          ],
        },
        'stacks.js/troubleshooting',
        'stacks.js/faq',
        'stacks.js/developer-resources',
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
