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
		},
	},
	plugins: [require('@tailwindcss/typography')],
}
