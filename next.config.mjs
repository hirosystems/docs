import createBundleAnalyzer from '@next/bundle-analyzer';
import createMDX from 'fumadocs-mdx/config';
import {
  remarkDynamicContent,
  remarkInstall,
  rehypeCodeDefaultOptions,
} from 'fumadocs-core/mdx-plugins';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { recmaCodeHike, remarkCodeHike } from "codehike/mdx";
import theme from "./components/docskit/theme.mjs";

const withAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  eslint: {
    // Replaced by root workspace command
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [],
  },
  swcMinify: false,
  webpack: (config) => {
    config.optimization.minimize = false;
    return config;
  },
  redirects: () => [
    {
      source: "/address",
      destination: "/stacks/stacks.js/concepts/accounts-and-addresses",
      permanent: true,
    },
    {
      source: "/what-is-a-wallet",
      destination: "/stacks/stacks.js/concepts/private-keys",
      permanent: true,
    },
    {
      source: "/intro",
      destination: "/",
      permanent: true,
    },
    {
      source: "/chainhooks/overview", 
      destination: "/stacks/chainhook",
      permanent: true,
    },
    {
      source: "/roadmap",
      destination: "/",
      permanent: true,
    },
    {
      source: "/stacks/api-keys/rate-limiting",
      destination: "/stacks/rate-limiting",
      permanent: true,
    },
    {
      source: "/txid",
      destination: "/stacks/stacks.js/concepts/transactions",
      permanent: true,
    },
    {
      source: "/smart-contracts/clarinet",
      destination: "/stacks/clarinet",
      permanent: true,
    },
    {
      source: "/stacks/platform/guides/deploy-project/build-contracts",
      destination: "/stacks/platform",
      permanent: true,
    },
    {
      source: "/stacks/platform/guides/deploy-project/create-project",
      destination: "/stacks/platform",
      permanent: true,
    },
    {
      source: "/stacks/platform/guides/deployment-plans",
      destination: "/stacks/platform",
      permanent: true,
    },
    {
      source: "/stacks/platform/guides/deploy-project",
      destination: "/stacks/platform/guides/deploy-contracts",
      permanent: true,
    },
  ],
};

/**
 * @type {import('codehike/mdx').CodeHikeConfig}
 */
const chConfig = {
  components: {
    code: "DocsKitCode",
    inlineCode: "DocsKitInlineCode",
  },
  ignoreCode: ({ lang, meta }) =>
    meta?.startsWith("title")
};

const withMDX = createMDX({
  mdxOptions: {
    rehypeCodeOptions: {
      themes: {
        light: 'catppuccin-latte',
        dark: 'catppuccin-mocha',
      },
      transformers: [
        ...rehypeCodeDefaultOptions.transformers,
      ],
    },
    lastModifiedTime: 'git',
    remarkPlugins: (v) => [
      [remarkCodeHike, chConfig],
      remarkMath,
      remarkDynamicContent,
      [remarkInstall],
      ...v,
    ],
    rehypePlugins: (v) => [rehypeKatex, ...v],
    recmaPlugins: [[recmaCodeHike, chConfig]],
  },
  buildSearchIndex: {},
});

export default withAnalyzer(withMDX(config));
