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
  themes: ['@docusaurus/theme-live-codeblock'],

  plugins: [
    
    require.resolve('@cmfcmf/docusaurus-search-local'),
    require.resolve('docusaurus-plugin-segment'),
    ['./src/_plugins/google-tag-manager', { id: 'GTM-59XXGSG' }],
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
        sourceBaseUrl: 'https://raw.githubusercontent.com/LakshmiLavanyaKasturi/stacks.js/test-interactive-code/docs/',
        outDir: 'docs/stacks.js',
        documents: ['faq.md', 'getting-started.md', 'overview.md', 'troubleshooting.md'],
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        name: 'remote-docs-stx-js-includes',
        sourceBaseUrl:
          'https://raw.githubusercontent.com/hirosystems/stacks.js/master/docs/includes',
        outDir: 'docs/stacks.js/includes/',
        documents: ['stacks.js-starters-note.mdx'],
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        name: 'remote-docs-stx-js-feature-guides',
        sourceBaseUrl:
          'https://raw.githubusercontent.com/hirosystems/stacks.js/master/docs/feature-guides',
        outDir: 'docs/stacks.js/feature-guides',
        documents: [
          'authenticate-users-with-connect.md',
          'sign-messages.md',
          'sign-transactions.md',
          'store-data-securely.md',
        ],
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        name: 'remote-docs-stx-js-how-to',
        sourceBaseUrl:
          'https://raw.githubusercontent.com/hirosystems/stacks.js/master/docs/how-to-guides/',
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
        sourceBaseUrl: 'https://raw.githubusercontent.com/hirosystems/stacks-subnets/master/docs/',
        outDir: 'docs/subnets',
        documents: ['getting-started.md', 'overview.md'],
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        name: 'remote-docs-subnets-feature-guides',
        sourceBaseUrl:
          'https://raw.githubusercontent.com/hirosystems/stacks-subnets/master/docs/feature-guides/',
        outDir: 'docs/subnets/feature-guides',
        documents: ['trust-models.md'],
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        name: 'remote-docs-subnets-images',
        sourceBaseUrl:
          'https://raw.githubusercontent.com/hirosystems/stacks-subnets/master/docs/images/',
        outDir: 'docs/subnets/images',
        documents: [
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
        name: 'remote-docs-chainhooks-docs',
        sourceBaseUrl: 'https://raw.githubusercontent.com/hirosystems/chainhook/develop/docs/',
        outDir: 'docs/chainhooks',
        documents: ['faq.md', 'getting-started.md', 'overview.md'],
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        name: 'remote-docs-chainhooks-how-to',
        sourceBaseUrl:
          'https://raw.githubusercontent.com/hirosystems/chainhook/develop/docs/how-to-guides/',
        outDir: 'docs/chainhooks/how-to-guides',
        documents: [
          'how-to-run-chainhook-as-a-service.md',
          'how-to-use-chainhook-with-bitcoin.md',
          'how-to-use-chainhook-with-stacks.md',
        ],
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
        name: 'remote-docs-token-metadata-api-feature-guides',
        sourceBaseUrl:
          'https://raw.githubusercontent.com/hirosystems/token-metadata-api/master/docs/feature-guides/',
        outDir: 'docs/token-metadata-api/feature-guides',
        documents: ['token-metadata-api.md'],
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
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),

          editUrl({ docPath }) {
            const repoUrls = {
              clarinet: 'https://github.com/hirosystems/clarinet/blob/main/docs',
              explorer: 'https://github.com/hirosystems/explorer/blob/main/docs',
              'stacks.js': 'https://github.com/hirosystems/stacks.js/blob/master/docs',
              'stacks-blockchain-api':
                'https://github.com/hirosystems/stacks-blockchain-api/blob/master/content',
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
    [
      'redocusaurus',
      {
        specs: [
          {
            route: '/api/',
            spec: 'https://raw.githubusercontent.com/hirosystems/stacks-blockchain-api/gh-pages/openapi.resolved.yaml',
          },
          {
            route: '/ordinals',
            spec: 'https://ordinals-api.vercel.app/openapi.yaml',
          },
          {
            route: '/metadata',
            spec: 'https://token-metadata-api.vercel.app/openapi.yaml',
          },
        ],
        theme: {
          primaryColor: '#FF5500',
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
                label: 'Stacks Blockchain API',
                to: '/api',
              },
              {
                label: 'Ordinals API',
                to: '/ordinals',
              },
              {
                label: 'Token Metadata API',
                to: '/metadata',
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
