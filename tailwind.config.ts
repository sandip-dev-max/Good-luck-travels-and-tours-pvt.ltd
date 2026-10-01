import type { Config } from 'tailwindcss'

/**
 * Brand palette — taken from the homepage hero.
 *   navy  → text, primary buttons, dark panels
 *   sea   → the blue of the hero sky (links, icons, accents on light)
 *   sky   → lighter sky blue (decorative)
 *   mist  → pale blue (text on dark, soft fills)
 *   cloud → page tint (the hero's outer background)
 *   gold  → the single warm accent (CTAs, highlights, focus)
 */
const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#06152e', 2: '#0d2954', 3: '#14376b' },
        sea: { DEFAULT: '#1c6a98', deep: '#14537a' },
        sky: '#5fa3c6',
        mist: '#d5e8f2',
        cloud: '#e9f1f7',
        paper: '#f4f8fb',
        line: '#d6e4ee',
        ink: { DEFAULT: '#06152e', 2: '#27405c' },
        muted: '#51647b',
        subtle: '#6b7d92',
        gold: { DEFAULT: '#f4b73f', soft: '#ffc85a', deep: '#c98a10', ink: '#8a5a00' },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Arial', 'sans-serif'],
        display: ['var(--font-display)', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        lux: '0 30px 80px rgba(12,45,80,.22)',
        soft: '0 14px 40px rgba(12,45,80,.10)',
        card: '0 16px 45px rgba(12,45,80,.07)',
        gold: '0 14px 34px rgba(244,183,63,.32)',
      },
    },
  },
  plugins: [],
}
export default config
