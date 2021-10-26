const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(
  module.exports = {
    title: "Hiro Docs",
    tagline: "Developer tools for Stacks",
    url: "https://docs.hiro.so",
    baseUrl: "/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    favicon: "img/favicon-light.svg",
    organizationName: "hirosystems", // Usually your GitHub org/user name.
    projectName: "docs", // Usually your repo name.
    trailingSlash: false,

    plugins: [
      require.resolve("@cmfcmf/docusaurus-search-local"),
      require.resolve("docusaurus-plugin-fathom"),
    ],

    presets: [
      [
        "@docusaurus/preset-classic",
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          docs: {
            sidebarPath: require.resolve("./sidebars.js"),
            // Please change this to your repo.
            editUrl: "https://github.com/hirosystems/docs/edit/main/",
            routeBasePath: "/",
          },
          theme: {
            customCss: require.resolve("./src/css/custom.css"),
          },
        }),
      ],
      [
        "redocusaurus",
        {
          specs: [
            {
              routePath: "/api/",
              specUrl:
                "https://raw.githubusercontent.com/blockstack/stacks-blockchain-api/gh-pages/openapi.resolved.yaml",
            },
          ],
          theme: {
            primaryColor: "#5546FF",
          },
        },
      ],
    ],

    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        navbar: {
          logo: {
            alt: "Hiro docs",
            src: "img/logo-light.svg",
            srcDark: "img/logo-dark.svg",
            target: "_self",
          },
          items: [
            {
              to: "/",
              label: "Get Started",
              position: "left",
            },
            {
              type: "doc",
              docId: "intro",
              position: "left",
              label: "Documentation",
            },
            {
              to: "/api",
              label: "Stacks API",
              position: "left",
            },
            {
              type: "doc",
              docId: "tutorials",
              position: "left",
              label: "Tutorials",
            },
            {
              type: "doc",
              docId: "example-apps",
              position: "left",
              label: "Example Apps",
            },
            {
              href: "https://github.com/hirosystems/docs",
              label: "GitHub",
              position: "left",
            },
          ],
        },
        footer: {
          style: "dark",
          links: [
            {
              title: "Docs",
              items: [
                {
                  label: "Developer docs",
                  to: "/intro",
                },
                {
                  label: "Stacks API",
                  to: "/api",
                },
                {
                  label: "Tutorials",
                  to: "/tutorials",
                },
                {
                  label: "Example apps",
                  to: "/example-apps",
                },
              ],
            },
            {
              title: "Community",
              items: [
                {
                  label: "Discord",
                  href: "https://discordapp.com/invite/docusaurus",
                },
                {
                  label: "Forum",
                  href: "https://forum.stacks.org",
                },
                {
                  label: "Reddit",
                  href: "https://www.reddit.com/r/stacks",
                },
                {
                  label: "Twitter",
                  href: "https://twitter.com/hirosystems",
                },
              ],
            },
            {
              title: "More",
              items: [
                { label: "Stacks docs", href: "https://docs.stacks.co" },
                {
                  label: "GitHub",
                  href: "https://github.com/hirosystems/docs",
                },
              ],
            },
          ],
          copyright: `Copyright © ${new Date().getFullYear()} Hiro Systems, PBC. Built with Docusaurus.`,
        },
        prism: {
          theme: lightCodeTheme,
          darkTheme: darkCodeTheme,
          additionalLanguages: ["toml", "lisp"],
        },
        fathomAnalytics: {
          siteId: "NMTVJYHS",
        },
      }),
  }
);
