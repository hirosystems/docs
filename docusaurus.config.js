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

    presets: [
      [
        "@docusaurus/preset-classic",
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          docs: {
            sidebarPath: require.resolve("./sidebars.js"),
            // Please change this to your repo.
            editUrl: "https://github.com/hirosystems/docs/edit/main/",
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
                "https://raw.githubusercontent.com/blockstack/stacks-blockchain-api/master/docs/openapi.yaml",
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
            href: "/",
            target: "_self",
          },
          items: [
            {
              type: "doc",
              docId: "intro",
              position: "right",
              label: "Developer docs",
            },
            {
              to: "/api",
              label: "Stacks API",
              position: "right",
            },
            {
              type: "doc",
              docId: "tutorials",
              position: "right",
              label: "Tutorials",
            },
            {
              type: "doc",
              docId: "example-apps",
              position: "right",
              label: "Example apps",
            },
            {
              href: "https://github.com/hirosystems/docs",
              label: "GitHub",
              position: "right",
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
                  to: "/docs/intro",
                },
                {
                  label: "Stacks API",
                  to: "/api",
                },
                {
                  label: "Tutorials",
                  to: "/docs/tutorials",
                },
                {
                  label: "Example apps",
                  to: "/docs/example-apps",
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
        algolia: {
          apiKey: "d8b485de9405f879665028e816a7fd38",
          indexName: "hirodocs",
          appId: "3NIPUOHI5R",
        },
      }),
  }
);
