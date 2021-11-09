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
    favicon: "img/favicon.ico",
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
                "https://raw.githubusercontent.com/hirosystems/stacks-blockchain-api/gh-pages/openapi.resolved.yaml",
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
            alt: "Hiro developers",
            src: "img/logo-light.svg",
            srcDark: "img/logo-dark.svg",
            target: "_self",
          },
          items: [
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
          logo: {
            alt: "Hiro developers",
            src: "img/footer-logo-light.svg",
            srcDark: "img/footer-logo-dark.svg",
          },
          links: [
            {
              title: "Hiro Developers",
              items: [
                {
                  label: "Documentation",
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
                  label: "Example Apps",
                  to: "/example-apps",
                },
              ],
            },
            {
              title: "More",
              items: [
                {
                  label: "GitHub",
                  href: "https://github.com/hirosystems/docs",
                },
                { label: "Stacks Docs", href: "https://docs.stacks.co" },
                { label: "Blog", href: "https://www.hiro.so/blog" },
                {
                  label: "Twitter",
                  href: "https://twitter.com/hirosystems",
                },
                {
                  label: "Youtube",
                  href: "https://www.youtube.com/channel/UC3xNLj2Mu7fW-BCq-vC9xKQ",
                },
              ],
            },
            {
              title: "Stacks Community",
              items: [
                {
                  label: "Discord",
                  href: "https://discordapp.com/invite/docusaurus",
                },
                {
                  label: "Stacks Forum",
                  href: "https://forum.stacks.org",
                },
                {
                  label: "Reddit",
                  href: "https://www.reddit.com/r/stacks",
                },
              ],
            },
          ],
          copyright: `Copyright © ${new Date().getFullYear()} Hiro Systems, PBC.`,
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
