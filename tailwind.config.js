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
    colors: {
      background: 'hsl(var(--background) / <alpha-value>)',
      foreground: 'hsl(var(--foreground) / <alpha-value>)',
      card: 'hsl(var(--card) / <alpha-value>)',
      'card-foreground': 'hsl(var(--card-foreground) / <alpha-value>)',
      popover: 'hsl(var(--popover) / <alpha-value>)',
      'popover-foreground': 'hsl(var(--popover-foreground) / <alpha-value>)',
      primary: 'hsl(var(--primary) / <alpha-value>)',
      'primary-foreground': 'hsl(var(--primary-foreground) / <alpha-value>)',
      secondary: 'hsl(var(--secondary) / <alpha-value>)',
      'secondary-foreground': 'hsl(var(--secondary-foreground) / <alpha-value>)',
      muted: 'hsl(var(--muted) / <alpha-value>)',
      'muted-foreground': 'hsl(var(--muted-foreground) / <alpha-value>)',
      accent: 'hsl(var(--accent) / <alpha-value>)',
      'accent-foreground': 'hsl(var(--accent-foreground) / <alpha-value>)',
      destructive: 'hsl(var(--destructive) / <alpha-value>)',
      'destructive-foreground': 'hsl(var(--destructive-foreground) / <alpha-value>)',
      border: 'hsl(var(--border) / <alpha-value>)',
      input: 'hsl(var(--input) / <alpha-value>)',
      ring: 'hsl(var(--ring) / <alpha-value>)',
      hiro: 'hsl(var(--hiro) / <alpha-value>)',
      'card-hover': 'hsl(var(--card-hover) / <alpha-value>)',
      icon: 'hsl(var(--icon) / <alpha-value>)',
      inverted: 'hsl(var(--inverted) / <alpha-value>)',
      code: 'hsl(var(--code) / <alpha-value>)',
      highlight: 'hsl(var(--highlight) / <alpha-value>)',
      content: 'hsl(var(--content) / <alpha-value>)',
      contrast: 'hsl(var(--contrast) / <alpha-value>)',
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
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
