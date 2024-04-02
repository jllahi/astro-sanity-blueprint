// import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'

import sanity from '@sanity/astro'
import react from '@astrojs/react'
import vercel from '@astrojs/vercel/serverless'
import { loadEnv } from 'vite'

// Loading environment variables from .env files
// https://docs.astro.build/en/guides/configuring-astro/#environment-variables

const {
  PUBLIC_SANITY_STUDIO_PROJECT_ID,
  PUBLIC_SANITY_STUDIO_DATASET,
  PUBLIC_SANITY_PROJECT_ID,
  PUBLIC_SANITY_DATASET,
} = loadEnv(import.meta.env.MODE, process.cwd(), '')

// Different environments use different variables
const projectId = PUBLIC_SANITY_STUDIO_PROJECT_ID || PUBLIC_SANITY_PROJECT_ID;
const dataset = PUBLIC_SANITY_STUDIO_DATASET || PUBLIC_SANITY_DATASET;

// Different environments use different variables
// const projectId =
//   import.meta.env.PUBLIC_SANITY_STUDIO_PROJECT_ID ||
//   import.meta.env.PUBLIC_SANITY_PROJECT_ID
// const dataset =
//   import.meta.env.PUBLIC_SANITY_STUDIO_DATASET ||
//   import.meta.env.PUBLIC_SANITY_DATASET

console.log("projectId:", projectId)

// Change this depending on your hosting provider (Vercel, Netlify etc)
// https://docs.astro.build/en/guides/server-side-rendering/#adding-an-adapter

// https://astro.build/config
export default defineConfig({
  site: 'https://astro-sanity-blueprint.vercel.app',
  output: 'hybrid',
  adapter: vercel(),
  integrations: [
    react(),
    tailwind(),
    sanity({
      projectId,
      dataset,
      studioBasePath: '/studio',
      useCdn: false,
      // `false` if you want to ensure fresh data
      apiVersion: '2023-03-20', // Set to date of setup to use the latest API version
    }),
  ],
})
