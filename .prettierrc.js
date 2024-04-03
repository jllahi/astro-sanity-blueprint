/** @type {import("prettier").Config} */
export default {
  useTabs: true,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'es5',
  semi: false,
  printWidth: 100,
	plugins: [
		'prettier-plugin-astro',
		'prettier-plugin-organize-imports',
		'prettier-plugin-packagejson',
		'prettier-plugin-tailwindcss'
	],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ]
}
