const { iconsPlugin, getIconCollections } = require('@egoist/tailwindcss-icons');

module.exports = {
  corePlugins: {
    preflight: false,
  },
  darkMode: ['class', '[data-theme="dark"]'],

  content: ['./src/**/*.{js,jsx,ts,tsx}', './docs/**/*.{md,mdx}'],

  theme: {
    extend: {},
  },

  plugins: [
    iconsPlugin({
      collections: getIconCollections(['bi', 'radix-icons', 'pixelarticons']),
    }),
  ],
};
