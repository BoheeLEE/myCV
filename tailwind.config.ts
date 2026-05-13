import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        imperial: {
          DEFAULT: '#003e74',
          dark:    '#002d56',
          mid:     '#0054a0',
          soft:    'rgba(0,62,116,0.08)',
        },
      },
      fontFamily: {
        sans:  ['"Arial Narrow"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        serif: ['Georgia', '"Times New Roman"', 'serif'],
        mono:  ['Consolas', '"Courier New"', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config
