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
  // webpack: (config, { isServer }) => {
  //   config.optimization.minimize = false;
    
  // Add source map for better debugging
  //   config.devtool = 'source-map';
    
  //   return config;
  // },
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
