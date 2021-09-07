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
                  label: "Tutorial",
                  to: "/docs/intro",
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
        },
      }),
  }
);
