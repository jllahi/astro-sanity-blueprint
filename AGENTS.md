# Agent Instructions — astro-sanity-blueprint

## Stack

- **Framework**: Astro 6 (static output, Vercel adapter)
- **CMS**: Sanity v5 (embedded studio at `/studio`)
- **Styling**: Tailwind CSS v4 + @tailwindcss/vite
- **UI**: Astro components (.astro) + React islands
- **Package Manager**: pnpm (scripts use pnpm; dev uses bun)
- **Deployment**: Vercel

## Project Structure

```
src/
├── assets/          # Static assets (images, fonts via @fontsource)
├── components/
│   ├── Debug.astro  # Dev-only debug component
│   ├── NoPosts.astro
│   ├── Welcome.astro
│   ├── content/     # Content layer components
│   ├── theme/       # Theme tokens/styling
│   └── ui/
│       └── Card.astro
├── consts.ts        # Shared constants
├── layouts/         # Astro layouts
├── pages/
│   ├── about.astro
│   ├── index.astro
│   ├── post/        # Dynamic post pages
│   └── rss.xml.ts   # RSS feed
└── sanity/
    ├── image.ts       # Sanity image URL builder
    ├── load-query.ts  # GROQ query execution
    ├── queries/       # GROQ query definitions
    ├── resolve.ts      # Document resolver
    ├── schema.json     # Extracted types
    ├── schemas/
    │   ├── documents/   # post.ts, etc.
    │   ├── objects/    # Reusable schema objects
    │   ├── singletons/ # settings.tsx
    │   └── index.ts
    ├── types.ts       # Generated Sanity types
    ├── url-image.ts   # URL-based image handling
    └── utils.ts       # Sanity utilities
```

## Key Patterns

### Queries

GROQ queries live in `src/sanity/queries/`. Use typed queries with the Sanity client:

```ts
import { sanityClient } from '@sanity/astro'
import { postsQuery } from '@/sanity/queries'
const posts = await sanityClient.fetch(postsQuery)
```

### Portable Text

Use `astro-portabletext` for rendering Sanity block content:

```astro
---
import { PortableText } from 'astro-portabletext'
---
<PortableText value={post.body} />
```

### Images

Two image sources:
- **Sanity images**: Use `urlFor(source)` from `src/sanity/image.ts`
- **External images**: Use `src/sanity/url-image.ts` with `@unpic/astro`

### Styling

Tailwind v4 with CSS variables (no `var()` in class names — direct token usage):

```astro
<style>
  @import "tailwindcss";
  @theme {
    --color-primary: oklch(0.55 0.2 250);
  }
</style>
```

### Sanity Studio

Embedded at `/studio`. Schema types defined in `src/sanity/schemas/`. Run:

```bash
bun run typegen  # Extract and generate types from Sanity schema
```

## Commands

| Command | Description |
|---------|-------------|
| `bun run dev` | Start dev server |
| `bun run build` | Build (includes type check) |
| `bun run check` | Type check with astro check |
| `bun run lint` | ESLint + auto-fix |
| `bun run format` | Prettier format |
| `bun run typegen` | Extract Sanity schema + generate TS types |
| `bun run preview` | Preview production build |

## Environment Variables

```env
PUBLIC_SANITY_PROJECT_ID=3q0ng9ao
PUBLIC_SANITY_DATASET=development
SANITY_API_TOKEN=     # For write operations (CI/deploy)
```

## AI Agent Guidelines

- Always run `bun run check` before committing to catch type errors
- Use `bun run typegen` if modifying Sanity schemas to update types
- Prefer `.astro` components over React when possible (better performance)
- When adding React islands, use `client:load` or `client:visible` appropriately
- Sanity studio embedded at `/studio` — no separate deployment needed
- Use `@sanity/image-url` for all Sanity image transformations, never manually construct URLs