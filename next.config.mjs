import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Remove Webpack customization – not supported in Turbopack
  turbopack: {
    // Add any Turbopack-specific options here (currently optional)
  },
  redirects: async () => {
    return [
      {
        source: "/start",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default withMDX(config);
