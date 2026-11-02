# Astro Starter Kit: Blog

```sh
npm create astro@latest -- --template blog
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/blog)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/blog)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/blog/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![blog](https://github.com/withastro/astro/assets/2244813/ff10799f-a816-4703-b967-c78997e8323d)

Features:

- ✅ Minimal styling (make it your own!)
- ✅ 100/100 Lighthouse performance
- ✅ SEO-friendly with canonical URLs and OpenGraph data
- ✅ Sitemap support
- ✅ RSS Feed support
- ✅ Markdown & MDX support

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## Environment variables

Sanity credentials come from the environment. Copy `.env.example` to `.env` and fill in what you need:

| Variable                               | Scope         | Purpose                                                                |
| :------------------------------------- | :------------ | :--------------------------------------------------------------------- |
| `PUBLIC_SANITY_VISUAL_EDITING_ENABLED` | server+client | Turns preview (draft) mode on. Must be `false` or unset in production. |
| `SANITY_API_READ_TOKEN`                | server only   | Viewer token used to read drafts. Required when preview mode is on.    |

The project ID and dataset are configured directly in `astro.config.mjs` (`3q0ng9ao` / `development`), so the app runs without any `.env` file in published-content mode.

## Draft content and preview mode

Sanity stores unpublished edits as a separate `drafts.<document-id>` version. This site reads content through `src/sanity/load-query.ts`, which picks the query perspective from a single flag:

```ts
const perspective = previewEnabled ? 'drafts' : 'published'
```

The `published` perspective **excludes drafts and release versions**. That is why a post left unpublished does not appear on the home page: it is not filtered out by the GROQ query, it is simply not part of the published dataset view. This is the default, and the desired behaviour for a public site.

### Enable preview mode locally

1. Copy `.env.example` to `.env`.
2. Set `PUBLIC_SANITY_VISUAL_EDITING_ENABLED=true`.
3. Add a Viewer token to `SANITY_API_READ_TOKEN` (sanity.io/manage → API → Tokens).
4. Run `pnpm dev`.

`pnpm dev` renders on demand, so drafts show up immediately. The `drafts` perspective falls back to the published version when a document has no draft, so already-published posts keep showing.

### Preview deployments

Set the same two variables in Vercel's **Preview** environment only. On a preview build the home page is rendered on demand (see the `sanity-preview-routes` integration in `astro.config.mjs`), so a new draft shows up without a rebuild. Post pages stay prerendered and pick drafts up on the next build.

### Production safety

Preview mode serves unpublished content, so it must never reach production:

- `src/sanity/load-query.ts` throws during build and at runtime when the flag is on and `VERCEL_ENV === 'production'`, failing the deployment instead of leaking drafts.
- The RSS feed forces the `published` perspective, so drafts never reach the feed, even in preview.
- In a preview build the post pages are prerendered from the `drafts` perspective, so draft URLs land in that build's `sitemap-0.xml`. Production sitemaps are unaffected.
- Vercel preview deployments are public by default: enable Deployment Protection if the draft content is sensitive.

### A note on local builds

`astro build` does not expose `.env` values to `astro.config.mjs`, so a plain `pnpm build` with preview mode set in `.env` prerenders the home page with draft content baked in. To exercise the real preview behaviour in a local build, pass the flag inline:

```sh
PUBLIC_SANITY_VISUAL_EDITING_ENABLED=true pnpm build
```

### Going further: visual editing

Draft visibility is the first half of Sanity's editorial workflow. Click-to-edit overlays, refresh on save and the Presentation Tool need cookie-based draft mode and `output: 'server'`; see the [Sanity visual editing guide for Astro](https://www.sanity.io/docs/visual-editing/astro-visual-editing).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run test`            | Run the node test runner (`tests/`)              |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).
