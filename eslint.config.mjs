/** @type {import("eslint").Config} */
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    react: true,
    astro: true,
    stylistic: false,
    // formatters: true,
    ignores: ['.astro', 'dist', 'pnpm-lock.yaml', 'src/sanity/types.ts'],
  },

  // `pnpm/yaml-enforce-settings` wants `trustPolicy: no-downgrade`, but that
  // policy rejects the current lockfile (many transitive deps resolve "down"),
  // so `pnpm install` fails. Keep the workspace file minimal on purpose.
  {
    files: ['pnpm-workspace.yaml'],
    rules: { 'pnpm/yaml-enforce-settings': 'off' },
  }

  // A11y
  // {
  //     name: 'jsx-a11y',
  //     files: ['**/*.{astro,svelte,tsx,ts}'],
  //     plugins: {
  //         'jsx-a11y': a11y,
  //     },
  //     languageOptions: {
  //         parserOptions: {
  //             ecmaFeatures: {
  //                 jsx: true,
  //             },
  //         },
  //     },
  //     ...a11y.flatConfigs.recommended,
  //     rules: {
  //         ...a11y.configs.recommended.rules,
  //         'jsx-a11y/alt-text': 'error',
  //         'jsx-a11y/prefer-tag-over-role': 'error',
  //     },
  // }
)
