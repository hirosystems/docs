import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

// Preserve bookmarks to retired Platform features in both supported languages.
const retiredPlatformPages = [
  ['/apis/platform-api/reference/devnet/:path*', 'https://docs.stacks.co/reference'],
  ['/apis/platform-api/:path*', '/apis/chainhooks-api'],
  ['/tools/contract-monitoring/:path*', '/tools/chainhooks'],
  ['/contract-monitoring/:path*', '/tools/chainhooks'],
  ['/tools/chainhooks/platform-usage', '/tools/chainhooks/introduction'],
  ['/tools/chainhooks/platform-quickstart', '/tools/chainhooks/create'],
  ['/tools/chainhooks/create-enable-chainhooks', '/tools/chainhooks/create'],
  ['/tools/chainhooks/view-chainhooks', '/tools/chainhooks/fetch'],
  ['/tools/chainhooks/manage-api-keys', '/resources/guides/api-keys'],
];

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Remove Webpack customization – not supported in Turbopack
  turbopack: {
    // Add any Turbopack-specific options here (currently optional)
  },
  redirects: async () => {
    return [
      ...retiredPlatformPages.flatMap(([source, destination]) =>
        ['', '/en', '/es'].map((locale) => ({
          source: `${locale}${source}`,
          destination: destination.startsWith('/') ? `${locale}${destination}` : destination,
          permanent: true,
        })),
      ),
      {
        source: '/start',
        destination: '/',
        permanent: false,
      },
      {
        source: '/.well-known/llms.txt',
        destination: '/llms.txt',
        permanent: true, // 301 redirect - tells crawlers this is the canonical location
      },
    ];
  },
};

export default withMDX(config);
