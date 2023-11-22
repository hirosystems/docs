const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('./src/theme/hiro-dark-code.js');

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
    require.resolve('docusaurus-plugin-segment'),
    ['./src/_plugins/google-tag-manager', { id: 'GTM-59XXGSG' }],
    ['./src/_plugins/alltius', { id: 'alltius' }],
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
    async function tailwindPlugin(context, options) {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(require('tailwindcss'));
          postcssOptions.plugins.push(require('autoprefixer'));
          return postcssOptions;
        },
      };
    },
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
          sidebarPath: require.resolve('./sidebars/main.js'),
          editUrl: 'https://github.com/hirosystems/docs/tree/main',
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
            label: 'API References',
            position: 'right',
            className: 'dropdown-nav',
            items: [
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
            ],
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
                label: 'Tutorials',
                to: '/tutorials/overview',
              },
              {
                label: 'Example Apps',
                to: '/example-apps/overview',
              },
              {
                label: 'Stacks CLI',
                to: '/references/stacks-cli',
              },
            ],
          },
          {
            title: 'References',
            items: [
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
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Hiro Systems, PBC.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['toml'],
      },
      // Algolio DocSearch
      algolia: {
        // The application ID provided by Algolia
        appId: 'UL2NZRAK8K',

        // Public API key: it is safe to commit it
        apiKey: '2b7f4af4606380e8e9d4a39aa9a4237f',

        indexName: 'hiro',
        contextualSearch: true,
        searchPagePath: 'search',
      },
      segment: {
        apiKey: 'qabJfWPhi2L9CeMk22A1XlYmabsNtgKy',
      },
    }),
};
