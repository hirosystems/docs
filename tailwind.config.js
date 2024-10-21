const { createPreset } = require('fumadocs-ui/tailwind-plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './content/**/*.mdx',
    './mdx-components.tsx',
    './node_modules/fumadocs-ui/dist/**/*.js',
    './node_modules/fumadocs-openapi/dist/**/*.js',
  ],
  presets: [createPreset({
    preset: 'default'
  })],
  theme: {
    extend: {
      colors: {
        "ch-border": "hsl(var(--border))", // editorGroup.border
        "ch-selection": "var(--ch-22)", // editor.selectionBackground
        "ch-tabs-background": "hsl(var(--card))", // editorGroupHeader.tabsBackground
        "ch-tab-active-foreground": "hsl(var(--card-foreground))", // tab.activeForeground
        "ch-tab-inactive-foreground": "hsl(var(--muted-foreground))", // tab.inactiveForeground
        "ch-background": "hsl(var(--code))", // editor.background
        "ch-active-border": "hsl(var(--hiro))", // tab.activeBorderTop
        "ch-line-number": "var(--ch-26)", // editorLineNumber.foreground
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ["var(--font-aeonikMono)"],
        aeonik: ['var(--font-aeonikFono)'],
        inter: ['var(--font-inter)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
        'repeat-gradient-to-r':
          'repeating-linear-gradient(to right, var(--tw-gradient-stops))',
        'repeat-gradient-to-br':
          'repeating-linear-gradient(to bottom right, var(--tw-gradient-stops))',
      },
      keyframes: {
        updown: {
          'from, to': {
            transform: 'translateY(-20px)',
          },
          '50%': {
            transform: 'translateY(20px)',
          },
        },
        light: {
          'from, to': {
            opacity: 0.7,
          },
          '50%': {
            opacity: 1,
          },
        },
        stroke: {
          from: {
            'stroke-dasharray': 1000,
          },
          to: {
            'stroke-dasharray': 1000,
            'stroke-dashoffset': 2000,
          },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
      },
      animation: {
        stroke: 'stroke 5s linear infinite',
        light: 'light 2s ease-in-out infinite',
        updown: 'updown 3s ease-in-out infinite',
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
