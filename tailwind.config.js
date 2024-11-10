const { createPreset } = require('fumadocs-ui/tailwind-plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
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
  			'ch-border': 'hsl(var(--border))',
  			'ch-selection': 'var(--ch-22)',
  			'ch-tabs-background': 'hsl(var(--card))',
  			'ch-tab-active-foreground': 'hsl(var(--card-foreground))',
  			'ch-tab-inactive-foreground': 'hsl(var(--muted-foreground))',
  			'ch-code': 'hsl(var(--code))',
  			'ch-active-border': 'hsl(var(--hiro))',
  			'ch-line-number': 'var(--ch-26)',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'var(--muted-foreground)'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
				hiro: 'hsl(var(--hiro) / <alpha-value>)',
				'card-hover': 'hsl(var(--card-hover) / <alpha-value>)',
				icon: '(var(--icon)',
				inverted: 'hsl(var(--inverted) / <alpha-value>)',
				code: 'hsl(var(--code) / <alpha-value>)',
				highlight: 'hsl(var(--highlight) / <alpha-value>)',
				content: 'hsl(var(--content) / <alpha-value>)',
				dark: 'hsl(var(--dark) / <alpha-value>)',
				contrast: 'hsl(var(--contrast) / <alpha-value>)',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		fontFamily: {
  			sans: ['var(--font-geist-sans)'],
  			mono: ["var(--font-aeonikMono)"],
  			aeonik: ['var(--font-aeonik)'],
  			aeonikFono: ['var(--font-aeonikFono)'],
  			inter: ['var(--font-inter)']
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
  			'repeat-gradient-to-r': 'repeating-linear-gradient(to right, var(--tw-gradient-stops))',
  			'repeat-gradient-to-br': 'repeating-linear-gradient(to bottom right, var(--tw-gradient-stops))'
  		},
  		keyframes: {
  			updown: {
  				'from, to': {
  					transform: 'translateY(-20px)'
  				},
  				'50%': {
  					transform: 'translateY(20px)'
  				}
  			},
  			light: {
  				'from, to': {
  					opacity: '0.7'
  				},
  				'50%': {
  					opacity: '1'
  				}
  			},
  			stroke: {
  				from: {
  					'stroke-dasharray': '1000'
  				},
  				to: {
  					'stroke-dasharray': '1000',
  					'stroke-dashoffset': '2000'
  				}
  			},
  			marquee: {
  				from: {
  					transform: 'translateX(0)'
  				},
  				to: {
  					transform: 'translateX(calc(-100% - var(--gap)))'
  				}
  			},
  			'marquee-vertical': {
  				from: {
  					transform: 'translateY(0)'
  				},
  				to: {
  					transform: 'translateY(calc(-100% - var(--gap)))'
  				}
  			}
  		},
  		animation: {
  			stroke: 'stroke 5s linear infinite',
  			light: 'light 2s ease-in-out infinite',
  			updown: 'updown 3s ease-in-out infinite',
  			marquee: 'marquee var(--duration) linear infinite',
  			'marquee-vertical': 'marquee-vertical var(--duration) linear infinite'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require('tailwindcss-animate')],
};
