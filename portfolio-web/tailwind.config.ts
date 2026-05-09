import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        g: {
          950: '#080808',
          900: '#111111',
          800: '#1c1c1e',
          700: '#2c2c2e',
          500: '#48484a',
          400: '#636366',
          300: '#8e8e93',
          200: '#aeaeb2',
          100: '#d1d1d6',
        },
        apple: '#f5f5f7',
      },
      letterSpacing: {
        widest2: '0.18em',
      },
      fontSize: {
        '10xl': '10rem',
        '9xl':  '8rem',
      },
    },
  },
  plugins: [],
}
export default config
