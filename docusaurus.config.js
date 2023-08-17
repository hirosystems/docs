const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/vsDark');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Hiro Docs',
  tagline: 'Developer tools for Stacks',
  url: 'https://docs.hiro.so',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'hirosystems', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.
  trailingSlash: false,

  plugins: [
    require.resolve('@cmfcmf/docusaurus-search-local'),
    require.resolve('docusaurus-plugin-segment'),
    ['./src/_plugins/google-tag-manager', { id: 'GTM-59XXGSG' }],
    [
      'docusaurus-plugin-openapi',
      {
        id: 'ordinals',
        path: 'openapi/ordinals-api.json',
        routeBasePath: '/ordinals',
      },
    ],
    [
      'docusaurus-plugin-openapi',
      {
        id: 'stx-blockchain',
        path: 'openapi/stacks-blockchain-api.json',
        routeBasePath: '/api',
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        name: 'remote-docs-stx-blockchain-api-docs',
        sourceBaseUrl:
          'https://raw.githubusercontent.com/hirosystems/stacks-blockchain-api/master/content/',
        outDir: 'docs/stacks-blockchain-api',
        documents: ['faqs.md', 'getting-started.md', 'overview.md', 'troubleshooting.md'],
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        name: 'remote-docs-stx-blockchain-api-feature-guides',
        sourceBaseUrl:
          'https://raw.githubusercontent.com/hirosystems/stacks-blockchain-api/master/content/feature-guides',
        outDir: 'docs/stacks-blockchain-api/feature-guides',
        documents: [
          'gaia-storage.md',
          'microblocks.md',
          'nonce-handling.md',
          'openapi-spec.md',
          'pagination.md',
          'rate-limiting.md',
          'requesting-proofs.md',
          'rosetta-support.md',
          'search-endpoint.md',
          'search-endpoint.md',
          'transactions.md',
          'use-clarity-values.md',
          'use-stacks-blockchain-api.md',
        ],
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        name: 'remote-docs-stx-blockchain-api-how-to',
        sourceBaseUrl:
          'https://raw.githubusercontent.com/hirosystems/stacks-blockchain-api/master/content/how-to-guides/',
        outDir: 'docs/stacks-blockchain-api/how-to-guides',
        documents: [
          'how-to-deploy-service-dependencies.md',
          'how-to-handle-errors.md',
          'how-to-install-stacks-cli.md',
          'how-to-query-stacks2.0-blockchain.md',
          'how-to-run-api-node.md',
          'how-to-run-mainnet-node.md',
          'how-to-run-stacks-blockchain-api-docker.md',
          'how-to-run-testnet-node.md',
          'how-to-upgrade-stacks-blockchain-api.md',
          'how-to-use-docker-with-Stacks-blockchain-api.md',
        ],
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        name: 'remote-docs-stx-blockchain-api-images', // path safe name to have multiple versions for the plugin
        sourceBaseUrl: 'https://raw.github.com/hirosystems/stacks-blockchain-api/master/content/', // url from where the files are donwloaded from
        outDir: 'docs/stacks-blockchain-api/', // content directory where the downloaded files are stored
        documents: ['images/api-architecture.png'], // named files list to be downloaded
        requestConfig: { responseType: 'arraybuffer' }, // required for non-text downloads
        headers: {
          accept: 'image*',
          'Content-Type': 'image/jpeg', // required for image downloads
        },
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        name: 'remote-docs-stx-js-docs',
        sourceBaseUrl: 'https://raw.githubusercontent.com/hirosystems/stacks.js/main/docs/',
        outDir: 'docs/stacks.js',
        documents: ['faq.md', 'getting-started.md', 'overview.md', 'troubleshooting.md'],
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        name: 'remote-docs-stx-js-includes',
        sourceBaseUrl: 'https://raw.githubusercontent.com/hirosystems/stacks.js/main/docs/includes',
        outDir: 'docs/stacks.js/includes/',
        documents: ['_stacks.js-starters-note.mdx', '_stacks.js-provider-section.mdx'],
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        name: 'remote-docs-stx-js-feature-guides',
        sourceBaseUrl:
          'https://raw.githubusercontent.com/hirosystems/stacks.js/main/docs/feature-guides',
        outDir: 'docs/stacks.js/feature-guides',
        documents: [
          'authenticate-users-with-connect.md',
          'sign-messages.md',
          'sign-transactions.md',
          'store-data-securely.md',
          'update-profile.md',
        ],
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        name: 'remote-docs-stx-js-how-to',
        sourceBaseUrl:
          'https://raw.githubusercontent.com/hirosystems/stacks.js/main/docs/how-to-guides/',
        outDir: 'docs/stacks.js/how-to-guides',
        documents: [
          'how-to-integrate-stacking-delegation.md',
          'how-to-integrate-stacking.md',
          'how-to-migrate-from-blockstack.js.md',
          'how-to-use-stacks-connect-with-angular.md',
        ],
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        name: 'remote-docs-subnets-docs',
        sourceBaseUrl: 'https://raw.githubusercontent.com/hirosystems/stacks-subnets/develop/docs/',
        outDir: 'docs/subnets',
        documents: ['getting-started.md', 'overview.md'],
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        name: 'remote-docs-subnets-feature-guides',
        sourceBaseUrl:
          'https://raw.githubusercontent.com/hirosystems/stacks-subnets/develop/docs/feature-guides/',
        outDir: 'docs/subnets/feature-guides',
        documents: ['trust-models.md', 'subnet-participants.md'],
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        name: 'remote-docs-subnets-images',
        sourceBaseUrl:
          'https://raw.githubusercontent.com/hirosystems/stacks-subnets/develop/docs/images/',
        outDir: 'docs/subnets/images',
        documents: [
          'deposit-stx.png',
          'subnet-devnet.png',
          'subnet-miners.png',
          'subnets-architecture.png',
          'subnets-deployment-confirmed.png',
        ],
        requestConfig: { responseType: 'arraybuffer' },

        headers: {
          accept: 'image*',
          'Content-Type': 'image/png',
        },
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        name: 'remote-docs-chainhook-docs',
        sourceBaseUrl: 'https://raw.githubusercontent.com/hirosystems/chainhook/develop/docs/',
        outDir: 'docs/chainhook',
        documents: ['faq.md', 'getting-started.md', 'overview.md'],
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        name: 'remote-docs-chainhook-how-to',
        sourceBaseUrl:
          'https://raw.githubusercontent.com/hirosystems/chainhook/develop/docs/how-to-guides/',
        outDir: 'docs/chainhook/how-to-guides',
        documents: [
          'how-to-run-chainhook-as-a-service-using-bitcoind.md',
          'how-to-run-chainhook-as-a-service-using-stacks.md',
          'how-to-use-chainhooks-with-bitcoin.md',
          'how-to-use-chainhooks-with-stacks.md',
        ],
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        name: 'remote-docs-chainhook-images',
        sourceBaseUrl:
          'https://raw.githubusercontent.com/hirosystems/chainhook/develop/docs/images/',
        outDir: 'docs/chainhook/images/',
        documents: ['chainhook-post-request.jpeg'],
        requestConfig: { responseType: 'arraybuffer' },

        headers: {
          accept: 'image*',
          'Content-Type': 'image/jpeg',
        },
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        name: 'remote-docs-ordinals-api-docs',
        sourceBaseUrl: 'https://raw.githubusercontent.com/hirosystems/ordinals-api/develop/docs/',
        outDir: 'docs/ordinals-api',
        documents: ['overview.md'],
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        name: 'remote-docs-ordinals-feature-guides',
        sourceBaseUrl:
          'https://raw.githubusercontent.com/hirosystems/ordinals-api/master/docs/feature-guides/',
        outDir: 'docs/ordinals-api/feature-guides',
        documents: ['rate-limiting.md'],
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        name: 'remote-docs-clarinet-docs',
        sourceBaseUrl: 'https://raw.githubusercontent.com/hirosystems/clarinet/develop/docs/',
        outDir: 'docs/clarinet',
        documents: ['faq.md', 'getting-started.md', 'introduction.md', 'troubleshooting.md'],
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        name: 'remote-docs-clarinet-feature-guides',
        sourceBaseUrl:
          'https://raw.githubusercontent.com/hirosystems/clarinet/develop/docs/feature-guides',
        outDir: 'docs/clarinet/feature-guides',
        documents: [
          'analyze-with-check-checker.md',
          'chainhooks.md',
          'clarinet-deploy.md',
          'clarinet-integrate.md',
          'extend-clarinet.md',
        ],
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        name: 'remote-docs-clarinet-how-to',
        sourceBaseUrl:
          'https://raw.githubusercontent.com/hirosystems/clarinet/develop/docs/how-to-guides/',
        outDir: 'docs/clarinet/how-to-guides',
        documents: [
          'how-to-add-contract.md',
          'how-to-check-contract.md',
          'how-to-create-new-project.md',
          'how-to-debug-contract.md',
          'how-to-deploy-contracts.md',
          'how-to-deploy-with-subnets.md',
          'how-to-run-integration-environment.md',
          'how-to-set-up-local-development-environment.md',
          'how-to-test-contract.md',
          'how-to-use-deployment-plans.md',
        ],
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        name: 'remote-docs-clarinet-images',
        sourceBaseUrl: 'https://raw.github.com/hirosystems/clarinet/develop/docs/images',
        outDir: 'docs/clarinet/images',
        documents: [
          'breakpoint.png',
          'clarinet-banner.bmp',
          'clarinet-dialog.bmp',
          'clarinet-faq-1.png',
          'clarinet-faq-2.png',
          'clarinet-faq-3.png',
          'clarinet-faq-4.png',
          'clarinet.ico',
          'clarinet.png',
          'clarinet101.png',
          'costs.gif',
          'debug-console.png',
          'debug-toolbar.png',
          'demo.gif',
          'deno-error.png',
          'jupyter.png',
          'lcov.png',
          'run-and-debug.png',
          'sidebar.png',
          'trace.png',
          'watchpoint.png',
          'deployment-plans.png',
        ],
        requestConfig: { responseType: 'arraybuffer' },

        headers: {
          accept: 'image*',
          'Content-Type': 'image/jgeg',
        },
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        name: 'remote-docs-explorer-docs',
        sourceBaseUrl: 'https://raw.githubusercontent.com/hirosystems/explorer/main/docs/',
        outDir: 'docs/explorer',
        documents: ['getting-started.md', 'overview.md'],
      },
    ],

    [
      'docusaurus-plugin-remote-content',
      {
        name: 'remote-docs-explorer-how-to',
        sourceBaseUrl:
          'https://raw.githubusercontent.com/hirosystems/explorer/main/docs/how-to-guides/',
        outDir: 'docs/explorer/how-to-guides',
        documents: ['build-explorer.md'],
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        name: 'remote-docs-token-metadata-api-docs',
        sourceBaseUrl:
          'https://raw.githubusercontent.com/hirosystems/token-metadata-api/develop/docs/',
        outDir: 'docs/token-metadata-api',
        documents: ['getting-started.md', 'overview.md'],
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        name: 'remote-docs-token-metadata-api-feature-guides',
        sourceBaseUrl:
          'https://raw.githubusercontent.com/hirosystems/token-metadata-api/master/docs/feature-guides/',
        outDir: 'docs/token-metadata-api/feature-guides',
        documents: ['metadata-api.md', 'rate-limiting.md'],
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        name: 'remote-docs-token-metadata-api-how-to',
        sourceBaseUrl:
          'https://raw.githubusercontent.com/hirosystems/token-metadata-api/develop/docs/how-to/',
        outDir: 'docs/token-metadata-api/how-to-guides',
        documents: ['how-to-stop-service.md', 'how-to-use-image-cache-service.md'],
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        name: 'remote-docs-token-metadata-images',
        sourceBaseUrl: 'https://raw.githubusercontent.com/hirosystems/token-metadata-api/master/',
        outDir: 'docs',
        documents: ['flowchart.png', 'architecture.png'],
        requestConfig: { responseType: 'arraybuffer' },

        headers: {
          accept: 'image*',
          'Content-Type': 'image/jgeg',
        },
      },
    ],
  ],
  presets: [
    [
      'docusaurus-preset-openapi',
      /** @type {import('docusaurus-preset-openapi').Options} */
      {
        api: {
          path: 'openapi/token-metadata-api.json',
          routeBasePath: '/metadata',
        },
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),

          editUrl({ docPath }) {
            const repoUrls = {
              clarinet: 'https://github.com/hirosystems/clarinet/blob/main/docs',
              explorer: 'https://github.com/hirosystems/explorer/blob/main/docs',
              'stacks.js': 'https://github.com/hirosystems/stacks.js/blob/master/docs',
              'stacks-subnets': 'https://github.com/hirosystems/stacks-subnets/tree/master/docs',
              'stacks-blockchain-api':
                'https://github.com/hirosystems/stacks-blockchain-api/blob/master/content',
              'ordinals-api': 'https://github.com/hirosystems/ordinals-api/tree/develop/docs',
              'token-metadata-api':
                'https://github.com/hirosystems/token-metadata-api/tree/develop/docs',
              chainhook: 'https://github.com/hirosystems/chainhook/tree/develop/docs',
            };
            const [repo, ...rem] = docPath.split('/');
            if (repo in repoUrls) {
              return `${repoUrls[repo]}/${rem.join('/')}`;
            }

            return `https://github.com/hirosystems/docs/blob/main/docs/${docPath}`;
          },
          routeBasePath: '/',
          breadcrumbs: false, // todo: enable at some point (breadcrumbs need a design overhaul first)
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        logo: {
          alt: 'Hiro developers',
          src: 'img/hiro-docs-logo.svg',
          srcDark: 'img/hiro-docs-logo-dark.svg',
          target: '_self',
          className: 'hiro-logo',
        },
        items: [
          {
            type: 'dropdown',
            label: 'References',
            position: 'right',
            items: [
              {
                type: 'html',
                value: 'APIs',
                className: 'section-title',
              },
              {
                label: 'Ordinals API',
                to: '/ordinals',
              },
              {
                label: 'Stacks Blockchain API',
                to: '/api',
              },
              {
                label: 'Token Metadata API',
                to: '/metadata',
              },
              {
                type: 'html',
                value: 'OTHER',
                className: 'section-title',
              },
              {
                label: 'Stacks CLI',
                to: '/references/stacks-cli',
              },
              {
                label: 'Stacks.js',
                href: 'https://stacks.js.org',
              },
              {
                label: 'Stacks Connect',
                href: 'https://connect.stacks.js.org',
              },
              {
                label: 'Clarity Functions',
                href: 'https://docs.stacks.co/docs/clarity/language-functions',
              },
              {
                label: 'Clarity Keywords',
                href: 'https://docs.stacks.co/docs/clarity/language-keywords',
              },
              {
                label: 'Clarity Types',
                href: 'https://docs.stacks.co/docs/clarity/language-types',
              },
            ],
          },
          {
            type: 'dropdown',
            label: 'Learn & Build',
            position: 'right',
            items: [
              {
                type: 'doc',
                label: 'Tutorials',
                docId: 'tutorials',
              },
              {
                type: 'doc',
                label: 'Example Apps',
                docId: 'example-apps',
              },
              {
                type: 'doc',
                label: 'Stacks.js Starters',
                docId: 'stacksjs-starters',
              },
            ],
          },
          {
            type: 'doc',
            docId: 'roadmap',
            label: 'Roadmap',
            position: 'right',
          },
          {
            href: 'https://github.com/hirosystems/docs',
            className: 'header-github-link',
            title: 'GitHub Repository',
            'aria-label': 'GitHub Repository',
            position: 'right',
          },
        ],
      },
      footer: {
        logo: {
          alt: 'Hiro developers',
          src: 'img/hiro-docs-footer.svg',
          srcDark: 'img/hiro-docs-footer-light.svg',
        },
        links: [
          {
            title: 'Hiro Developers',
            items: [
              {
                label: 'Stacks Blockchain API',
                to: '/api',
              },
              {
                label: 'Tutorials',
                to: '/tutorials',
              },
              {
                label: 'Example Apps',
                to: '/example-apps',
              },
              {
                label: 'Contributors Guide',
                to: '/contributors-guide',
              },
              {
                label: 'Product Changelog',
                to: 'changelog/changelog-intro',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/hirosystems/docs',
              },
              {
                label: 'Stacks Docs',
                href: 'https://docs.stacks.co',
              },
              {
                label: 'Blog',
                href: 'https://www.hiro.so/blog',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/hirosystems',
              },
              {
                label: 'Youtube',
                href: 'https://www.youtube.com/channel/UC3xNLj2Mu7fW-BCq-vC9xKQ',
              },
              {
                label: 'Newsletter',
                href: 'https://hiro.so/updates-docs',
              },
            ],
          },
          {
            title: 'Stacks Community',
            items: [
              {
                label: 'Discord',
                href: 'https://stacks.chat',
              },
              {
                label: 'Stacks Forum',
                href: 'https://forum.stacks.org',
              },
              {
                label: 'Reddit',
                href: 'https://www.reddit.com/r/stacks',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Hiro Systems, PBC.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['toml'],
      },
      segment: {
        apiKey: 'qabJfWPhi2L9CeMk22A1XlYmabsNtgKy',
      },
    }),
};
