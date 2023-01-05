const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

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
    ["docusaurus-plugin-remote-content",
      {
          // options here
          name: "remote-docs-stx-blockchain-api-docs", // used by CLI, must be path safe
          sourceBaseUrl: "https://raw.githubusercontent.com/hirosystems/stacks-blockchain-api/master/content/", // the base url for the markdown (gets prepended to all of the documents when fetching)
          outDir: "docs/stacks-blockchain-api", // the base directory to output to.
          documents: ["faqs.md", "getting-started.md","overview.md", "troubleshooting.md"
            ], // the file names to download
          // in the plugin's options:
          // noRuntimeDownloads: "true"
          
      }],
    ["docusaurus-plugin-remote-content",
      {
          // options here
          name: "remote-docs-stx-blockchain-api-feature-guides", // used by CLI, must be path safe
          sourceBaseUrl: "https://raw.githubusercontent.com/hirosystems/stacks-blockchain-api/master/content/feature-guides", // the base url for the markdown (gets prepended to all of the documents when fetching)
          outDir: "docs/stacks-blockchain-api/feature-guides", // the base directory to output to.
          documents: ["gaia-storage.md",
          "microblocks.md", "nonce-handling.md", "openapi-spec.md", "pagination.md", 
          "rate-limiting.md", "requesting-proofs.md", "rosetta-support.md", "search-endpoint.md",
          "search-endpoint.md", "transactions.md", "use-clarity-values.md","use-stacks-blockchain-api.md"
            ], // the file names to download
          // in the plugin's options:
          // noRuntimeDownloads: "true"
          
      }],
      ["docusaurus-plugin-remote-content",
      {
          // options here
          name: "remote-docs-stx-blockchain-api-how-to", // used by CLI, must be path safe
          sourceBaseUrl: "https://raw.githubusercontent.com/hirosystems/stacks-blockchain-api/master/content/how-to-guides/", // the base url for the markdown (gets prepended to all of the documents when fetching)
          outDir: "docs/stacks-blockchain-api/how-to-guides", // the base directory to output to.
          documents: ["how-to-deploy-service-dependencies.md",
          "how-to-handle-errors.md",
          "how-to-install-stacks-cli.md",
          "how-to-query-stacks2.0-blockchain.md",
          "how-to-run-api-node.md",
          "how-to-run-mainnet-node.md",
          "how-to-run-stacks-blockchain-api-docker.md",
          "how-to-run-testnet-node.md",
          "how-to-upgrade-stacks-blockchain-api.md",
          "how-to-use-docker-with-Stacks-blockchain-api.md",
            ], // the file names to download
          // in the plugin's options:
          // noRuntimeDownloads: "true"
          
      }],
      ["docusaurus-plugin-remote-content",
            {
                // options here
                name: "remote-docs-stx-blockchain-api-images", // used by CLI, must be path safe
                sourceBaseUrl: "https://raw.github.com/hirosystems/stacks-blockchain-api/master/content/", // the base url for the markdown (gets prepended to all of the documents when fetching)
                outDir: "docs/stacks-blockchain-api/", // the base directory to output to.
                documents: [
                 "images/api-architecture.png", ], // the file names to download
                // in the plugin's options:
                //noRuntimeDownloads: "true",
                requestConfig: { responseType: "arraybuffer" },
                
                headers: {
                  'accept': 'image*',
                  'Content-Type': 'image/jpeg',
                }
                }
                
      ],
      ["docusaurus-plugin-remote-content",
      {
          // options here
          name: "remote-docs-stx-js-docs", // used by CLI, must be path safe
          sourceBaseUrl: "https://raw.githubusercontent.com/hirosystems/stacks.js/master/docs/", // the base url for the markdown (gets prepended to all of the documents when fetching)
          outDir: "docs/stacks.js", // the base directory to output to.
          documents: ["faq.md", "getting-started.md","overview.md", "troubleshooting.md"
            ], // the file names to download
          // in the plugin's options:
          // noRuntimeDownloads: "true"
          
      }],     
      ["docusaurus-plugin-remote-content",
      {
          // options here
          name: "remote-docs-stx-js-includes", // used by CLI, must be path safe
          sourceBaseUrl: "https://raw.githubusercontent.com/hirosystems/stacks.js/master/docs/includes", // the base url for the markdown (gets prepended to all of the documents when fetching)
          outDir: "docs/stacks.js/includes/", // the base directory to output to.
          documents: ["stacks.js-starters-note.mdx"
            ], // the file names to download
          // in the plugin's options:
          // noRuntimeDownloads: "true"
          
      }],     
      ["docusaurus-plugin-remote-content",
      {
          // options here
          name: "remote-docs-stx-js-feature-guides", // used by CLI, must be path safe
          sourceBaseUrl: "https://raw.githubusercontent.com/hirosystems/stacks.js/master/docs/feature-guides", // the base url for the markdown (gets prepended to all of the documents when fetching)
          outDir: "docs/stacks.js/feature-guides", // the base directory to output to.
          documents: ["authenticate-users-with-connect.md",
          "sign-messages.md", "sign-transactions.md", "store-data-securely.md" ], // the file names to download
          // in the plugin's options:
          // noRuntimeDownloads: "true"
          
      }],
      ["docusaurus-plugin-remote-content",
      {
          // options here
          name: "remote-docs-stx-js-how-to", // used by CLI, must be path safe
          sourceBaseUrl: "https://raw.githubusercontent.com/hirosystems/stacks.js/master/docs/how-to-guides/", // the base url for the markdown (gets prepended to all of the documents when fetching)
          outDir: "docs/stacks.js/how-to-guides", // the base directory to output to.
          documents: ["how-to-integrate-stacking.md",
          "how-to-migrate-from-blockstack.js.md",
          "how-to-use-stacks-connect-with-angular.md",
          
            ], // the file names to download
          // in the plugin's options:
          // noRuntimeDownloads: "true"
          
      }],
      ["docusaurus-plugin-remote-content",
      {
          // options here
          name: "remote-docs-clarinet-docs", // used by CLI, must be path safe
          sourceBaseUrl: "https://raw.githubusercontent.com/hirosystems/clarinet/main/docs/", // the base url for the markdown (gets prepended to all of the documents when fetching)
          outDir: "docs/clarinet", // the base directory to output to.
          documents: ["faq.md", "getting-started.md","introduction.md", "troubleshooting.md"
            ], // the file names to download
          // in the plugin's options:
          // noRuntimeDownloads: "true"
          
      }],     
      ["docusaurus-plugin-remote-content",
      {
          // options here
          name: "remote-docs-clarinet-feature-guides", // used by CLI, must be path safe
          sourceBaseUrl: "https://raw.githubusercontent.com/hirosystems/clarinet/main/docs/feature-guides", // the base url for the markdown (gets prepended to all of the documents when fetching)
          outDir: "docs/clarinet/feature-guides", // the base directory to output to.
          documents: ["analyze-with-check-checker.md",
          "chainhooks.md", "clarinet-deploy.md", "clarinet-integrate.md","extend-clarinet.md" ], // the file names to download
          // in the plugin's options:
          // noRuntimeDownloads: "true"
          
      }],
      ["docusaurus-plugin-remote-content",
      {
          // options here
          name: "remote-docs-clarinet-how-to", // used by CLI, must be path safe
          sourceBaseUrl: "https://raw.githubusercontent.com/hirosystems/clarinet/main/docs/how-to-guides/", // the base url for the markdown (gets prepended to all of the documents when fetching)
          outDir: "docs/clarinet/how-to-guides", // the base directory to output to.
          documents: ["how-to-add-contract.md", "how-to-check-contract.md", "how-to-create-new-project.md",
          "how-to-debug-contract.md",
          "how-to-deploy-contracts.md", "how-to-deploy-with-subnets.md", "how-to-run-integration-environment.md", "how-to-set-up-local-development-environment.md"
          ,"how-to-test-contract.md"
            ], // the file names to download
          // in the plugin's options:
          // noRuntimeDownloads: "true"
          
      }],
      ["docusaurus-plugin-remote-content",
            {
                // options here
                name: "remote-docs-clarinet-images", // used by CLI, must be path safe
                sourceBaseUrl: "https://raw.github.com/hirosystems/clarinet/main/docs/images", // the base url for the markdown (gets prepended to all of the documents when fetching)
                outDir: "docs/clarinet/images", // the base directory to output to.
                
                documents: [
                 "breakpoint.png", 
                 "clarinet-banner.bmp", 
                 "clarinet-dialog.bmp", 
                 "clarinet-faq-1.png", 
                 "clarinet-faq-2.png", 
                 "clarinet-faq-3.png", 
                 "clarinet-faq-4.png", 
                 "clarinet.ico", 
                 "clarinet.png", 
                 "clarinet101.png", 
                 "costs.gif", 
                 "debug-console.png", 
                 "debug-toolbar.png", 
                 "demo.gif", 
                 "deno-error.png", 
                 "jupyter.png", 
                 "lcov.png", 
                 "run-and-debug.png", 
                 "sidebar.png", 
                 "trace.png", 
                 "watchpoint.png", 
                ], // the file names to download
                // in the plugin's options:
                //noRuntimeDownloads: "true",
                requestConfig: { responseType: "arraybuffer" },
                
                headers: {
                  'accept': 'image*',
                  'Content-Type': 'image/jgeg',
                }
                }
                
      ],
      ["docusaurus-plugin-remote-content",
      {
          // options here
          name: "remote-docs-explorer-docs", // used by CLI, must be path safe
          sourceBaseUrl: "https://raw.githubusercontent.com/hirosystems/explorer/main/docs/", // the base url for the markdown (gets prepended to all of the documents when fetching)
          outDir: "docs/explorer", // the base directory to output to.
          documents: ["getting-started.md","overview.md"
            ], // the file names to download
          // in the plugin's options:
          // noRuntimeDownloads: "true"
          
      }],     
      
      ["docusaurus-plugin-remote-content",
      {
          // options here
          name: "remote-docs-explorer-how-to", // used by CLI, must be path safe
          sourceBaseUrl: "https://raw.githubusercontent.com/hirosystems/explorer/main/docs/how-to-guides/", // the base url for the markdown (gets prepended to all of the documents when fetching)
          outDir: "docs/explorer/how-to-guides", // the base directory to output to.
          documents: ["build-explorer.md",
            ], // the file names to download
          // in the plugin's options:
          // noRuntimeDownloads: "true"
          
      }],
      
    
  ],

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/hirosystems/docs/edit/main/',
          routeBasePath: '/',
          breadcrumbs: false, // todo: enable at some point (breadcrumbs need a design overhaul first)
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
    [
      'redocusaurus',
      {
        specs: [
          {
            route: '/api/',
            spec: 'https://raw.githubusercontent.com/hirosystems/stacks-blockchain-api/gh-pages/openapi.resolved.yaml',
          },
        ],
        theme: {
          primaryColor: '#5546FF',
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
            type: 'doc',
            label: 'Documentation',
            docId: 'intro',
            position: 'right',
          },
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
                label: 'Stacks CLI',
                to: '/references/stacks-cli',
              },
              {
                label: 'Stacks.js',
                href: 'https://stacks.js.org',
              },
              {
                label: 'Clarity Functions',
                href: 'https://docs.stacks.co/docs/write-smart-contracts/clarity-language/language-functions',
              },
              {
                label: 'Clarity Keywords',
                href: 'https://docs.stacks.co/docs/write-smart-contracts/clarity-language/language-keywords',
              },
              {
                label: 'Clarity Types',
                href: 'https://docs.stacks.co/docs/write-smart-contracts/clarity-language/language-types',
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
        style: 'dark',
        logo: {
          alt: 'Hiro developers',
          src: 'img/hiro-docs-footer.svg',
        },
        links: [
          {
            title: 'Hiro Developers',
            items: [
              {
                label: 'Documentation',
                to: '/intro',
              },
              {
                label: 'Stacks API',
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
        additionalLanguages: ['toml', 'lisp'],
      },
      segment: {
        apiKey: 'qabJfWPhi2L9CeMk22A1XlYmabsNtgKy',
      },
    }),
};
