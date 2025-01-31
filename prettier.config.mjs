/** @type {import('prettier').Config} */

const prettierConfig = {
	arrowParens: 'always',
	astroAllowShorthand: false,
	bracketSameLine: true,
	bracketSpacing: true,
	endOfLine: 'lf', // end_of_line = lf
	jsxSingleQuote: false,
	printWidth: 100, // default: 80
	quoteProps: 'consistent',
	semi: false, // default: true
	singleQuote: true, // default: false
	tabWidth: 2, // indent_size = 2
	tailwindAttributes: ['class:list', 'className'],
	tailwindFunctions: ['clsx', 'cn', 'tw', 'tv'],
	trailingComma: 'es5',
	useTabs: false, // indent_style = space
	// astroOrganizeImportsMode: 'All',
	plugins: [
		'prettier-plugin-astro',
		'prettier-plugin-tailwindcss',
		// 'prettier-plugin-svelte',
		// 'prettier-plugin-packagejson',
		// 'prettier-plugin-organize-imports',
	],
	overrides: [
		{
			files: '*.astro',
			options: {
				parser: 'astro',
			},
		},
		// {
		//   files: '*.svelte',
		//   options: {
		//     parser: 'svelte',
		//   },
		// },
	],
}
export default prettierConfig
