import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import sanity from '@sanity/astro'
import { imageService } from '@unpic/astro/service'
import metaTags from 'astro-meta-tags'
import robotsTxt from 'astro-robots-txt'
import { defineConfig } from 'astro/config'
import { loadEnv } from 'vite'
import vercel from '@astrojs/vercel'

// Loading environment variables from .env files
// https://docs.astro.build/en/guides/configuring-astro/#environment-variables

const {
  PUBLIC_SANITY_STUDIO_PROJECT_ID,
  PUBLIC_SANITY_STUDIO_DATASET,
  PUBLIC_SANITY_PROJECT_ID,
  PUBLIC_SANITY_DATASET,
} = loadEnv(import.meta.env.MODE, process.cwd(), '')

// Different environments use different variables
const projectId = PUBLIC_SANITY_STUDIO_PROJECT_ID || PUBLIC_SANITY_PROJECT_ID
const dataset = PUBLIC_SANITY_STUDIO_DATASET || PUBLIC_SANITY_DATASET

// Change this depending on your hosting provider (Vercel, Netlify etc)
// https://docs.astro.build/en/guides/server-side-rendering/#adding-an-adapter

// https://astro.build/config
export default defineConfig({
  site: 'https://astro-sanity-blueprint.vercel.app',
  output: 'server',
  adapter: vercel(),
  image: {
    service: imageService(),
  },
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    sanity({
      projectId,
      dataset,
      useCdn: true, // `false` if you want to ensure fresh data
      apiVersion: '2024-08-10', // Set to date of setup to use the latest API version
      studioBasePath: '/studio',
      stega: {
        studioUrl: '/studio',
      },
    }),
    metaTags(),
    sitemap({
      filter: (page) =>
        // page !== this.site + this.integrations[sanity].studioBasePath + '/' &&
        page !== 'https://astro-sanity-blueprint.vercel.app/studio/',
    }),
    robotsTxt({
      policy: [
        {
          userAgent: '*',
          allow: '/',
          disallow: '/studio',
        },
      ],
    }),
  ],
  // vite: {
  // 	optimizeDeps: {
  // 		exclude: ['@sanity/astro'],
  // 	},
  // },
})
