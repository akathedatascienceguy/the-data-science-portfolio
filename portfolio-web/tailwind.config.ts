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
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        ds: {
          bg:       '#0a0e1a',
          surface:  '#111827',
          surface2: '#1a2236',
          border:   '#1e2d42',
        },
      },
      backgroundSize: {
        '300%': '300%',
      },
      animation: {
        'gradient-shift': 'gradient-shift 6s ease infinite',
        'float-slow':     'float 8s ease-in-out infinite',
        'float-med':      'float 6s ease-in-out infinite',
        'pulse-live':     'pulse-live 2s ease-in-out infinite',
        'fade-in':        'fade-in 0.6s ease forwards',
        'slide-up':       'slide-up 0.6s ease forwards',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-14px)' },
        },
        'pulse-live': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 0 0 rgba(16,185,129,0.4)' },
          '50%':      { opacity: '0.7', boxShadow: '0 0 0 8px rgba(16,185,129,0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'glow-indigo': '0 0 30px rgba(99,102,241,0.2)',
        'glow-cyan':   '0 0 30px rgba(6,182,212,0.2)',
        'glow-green':  '0 0 30px rgba(16,185,129,0.2)',
        'glow-amber':  '0 0 30px rgba(245,158,11,0.2)',
        'card':        '0 4px 24px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
}
export default config
