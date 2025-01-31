import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'
import theme from 'tailwindcss/defaultTheme'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      fontFamily: {
        sans: ['Inter Variable', ...theme.fontFamily.sans],
        heading: ['Montserrat Variable', ...theme.fontFamily.sans],
        logo: ['Montserrat Variable', ...theme.fontFamily.sans],
      },
      colors: {
        'color-sanity': colors.neutral[800], // '#F03E2F',
        'color-black': colors.neutral[800],
        'color-white': colors.white, // colors.neutral[100],
        'color-placeholder': colors.neutral[200],
      },
    },
  },
  plugins: [typography],
} satisfies Config
