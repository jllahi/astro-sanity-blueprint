import colors from 'tailwindcss/colors'
import theme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter Variable', ...theme.fontFamily.sans],
				heading: ['Montserrat Variable', ...theme.fontFamily.sans],
				logo: ['Montserrat Variable', ...theme.fontFamily.sans],
			},
			colors: {
				'color-sanity': '#F03E2F',
				'color-black': colors.neutral[800],
				'color-white': colors.neutral[100],
				'color-placeholder': colors.neutral[200],
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
}
