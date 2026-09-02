import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#071A33',
          800: '#0B1220',
        },
        neutral: {
          50: '#F7F9FC',
          100: '#FFFFFF',
          600: '#94A3B8',
        },
        primary: {
          blue: '#2563EB',
          brightBlue: '#3B82F6',
        },
        accent: {
          blue: '#2563EB',
          purple: '#8B5CF6',
          green: '#10B981',
          orange: '#F97316',
          pink: '#EC4899',
          teal: '#14B8A6',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
