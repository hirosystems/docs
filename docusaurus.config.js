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
        },
        items: [
          {
            type: 'doc',
            label: 'Documentation',
            docId: 'intro',
            position: 'left',
          },
          {
            to: '/api',
            label: 'Stacks API',
            position: 'left',
          },
          {
            type: 'dropdown',
            label: 'Learn & Build',
            position: 'left',
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
            position: 'left',
          },
          {
            href: 'https://github.com/hirosystems/docs',
            position: 'right',
            className: 'header-github-link',
            title: 'GitHub Repository',
            'aria-label': 'GitHub Repository',
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
                className: 'footer__link-item custom-footer-external',
                to: 'https://github.com/hirosystems/docs',
              },
              {
                label: 'Stacks Docs',
                className: 'footer__link-item custom-footer-external',
                to: 'https://docs.stacks.co',
              },
              {
                label: 'Blog',
                className: 'footer__link-item custom-footer-external',
                to: 'https://www.hiro.so/blog',
              },
              {
                label: 'Twitter',
                className: 'footer__link-item custom-footer-external',
                to: 'https://twitter.com/hirosystems',
              },
              {
                label: 'Youtube',
                className: 'footer__link-item custom-footer-external',
                to: 'https://www.youtube.com/channel/UC3xNLj2Mu7fW-BCq-vC9xKQ',
              },
              {
                label: 'Newsletter',
                className: 'footer__link-item custom-footer-external',
                to: 'https://hiro.so/updates-docs',
              },
            ],
          },
          {
            title: 'Stacks Community',
            items: [
              {
                label: 'Discord',
                className: 'footer__link-item custom-footer-external',
                to: 'https://stacks.chat',
              },
              {
                label: 'Stacks Forum',
                className: 'footer__link-item custom-footer-external',
                to: 'https://forum.stacks.org',
              },
              {
                label: 'Reddit',
                className: 'footer__link-item custom-footer-external',
                to: 'https://www.reddit.com/r/stacks',
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
