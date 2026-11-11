// import process from 'node:process'
import { existsSync, realpathSync } from "node:fs";

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import sanity from "@sanity/astro";
import tailwindcss from "@tailwindcss/vite";
import { imageService } from "@unpic/astro/service";
import metaTags from "astro-meta-tags";
import robotsTxt from "astro-robots-txt";
import { defineConfig } from "astro/config";
// import { loadEnv } from 'vite'

// Loading environment variables from .env files
// https://docs.astro.build/en/guides/configuring-astro/#environment-variables

// const {
//   PUBLIC_SANITY_STUDIO_PROJECT_ID,
//   PUBLIC_SANITY_STUDIO_DATASET,
//   PUBLIC_SANITY_PROJECT_ID,
//   PUBLIC_SANITY_DATASET,
// } = loadEnv(import.meta.env.MODE, process.cwd(), '')

// Different environments use different variables
// const projectId = PUBLIC_SANITY_STUDIO_PROJECT_ID || PUBLIC_SANITY_PROJECT_ID
// const dataset = PUBLIC_SANITY_STUDIO_DATASET || PUBLIC_SANITY_DATASET

// Change this depending on your hosting provider (Vercel, Netlify etc)
// https://docs.astro.build/en/guides/server-side-rendering/#adding-an-adapter

// `@sanity/astro` renders the visual editing island from inside its own
// `dist/`. This resolves that file so Vite can scan it (see `optimizeDeps`
// below). Missing on an unexpected package layout, in which case scanning is
// skipped instead of breaking the dev server.
const visualEditingIsland = new URL(
  "./node_modules/@sanity/astro/dist/visual-editing/visual-editing-component.tsx",
  import.meta.url,
);

// https://astro.build/config
export default defineConfig({
  site: "https://astro-sanity-blueprint.vercel.app",
  trailingSlash: "never",

  output: "server",
  adapter: vercel(),

  image: {
    service: imageService(),
  },
  integrations: [
    react(),
    sanity({
      projectId: "3q0ng9ao",
      dataset: "development",
      useCdn: true, // `false` if you want to ensure fresh data
      apiVersion: "2025-08-10", // Set to date of setup to use the latest API version
      studioBasePath: "/studio",
      stega: {
        studioUrl: "/studio",
      },
    }),
    metaTags(),
    sitemap({
      filter: (page) =>
        // page !== this.site + this.integrations[sanity].studioBasePath + '/' &&
        page !== "https://astro-sanity-blueprint.vercel.app/studio/",
    }),
    robotsTxt({
      policy: [
        {
          userAgent: ["*"],
          allow: ["/"],
          disallow: ["/studio"],
          crawlDelay: 15,
        },
      ],
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      // Astro only scans `src/` for dependencies to pre-bundle, so the client
      // island shipped by `@sanity/astro` is never scanned. Its module graph
      // imports several CommonJS packages (`react-compiler-runtime`,
      // `lodash/*`, `get-it/middleware`, `@sanity/eventsource`, ...) that the
      // browser cannot load as ESM. Vite never discovers them on demand either,
      // because discovery is skipped for importers inside `node_modules`. When
      // they are served raw, hydration fails with "does not provide an export
      // named ..." and the Studio's Presentation tool times out with "Unable to
      // connect to visual editing".
      // Adding the island as a scan entry lets Vite crawl its whole graph and
      // pre-bundle every dependency, including future ones. The path must be
      // absolute: Vite's scanner ignores relative matches under `dist/`, and
      // this package ships the island inside `dist/`. It is also realpath'd
      // because pnpm symlinks the package.
      entries: [
        "src/**/*.{jsx,tsx,vue,svelte,html}",
        ...(existsSync(visualEditingIsland) ? [realpathSync(visualEditingIsland)] : []),
      ],
    },
    // optimizeDeps: {
    //   exclude: ['date-fns', '@sanity/icons', 'lightningcss', 'fsevents', '@sanity/astro', 'sanity', 'sanity/structure'],
    // },
  },
});
