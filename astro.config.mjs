// import process from 'node:process'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel'
import sanity from '@sanity/astro'
import tailwindcss from '@tailwindcss/vite'
import { imageService } from '@unpic/astro/service'
import metaTags from 'astro-meta-tags'
import robotsTxt from 'astro-robots-txt'
import { defineConfig, fontProviders } from 'astro/config'
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

// https://astro.build/config
export default defineConfig({
  site: 'https://astro-sanity-blueprint.vercel.app',
  trailingSlash: 'never',

  output: 'static',
  adapter: vercel(),

  image: {
    service: imageService(),
  },

  integrations: [
    react(),
    sanity({
      projectId: '3q0ng9ao',
      dataset: 'development',
      useCdn: true, // `false` if you want to ensure fresh data
      apiVersion: '2025-08-10', // Set to date of setup to use the latest API version
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
          userAgent: ['*'],
          allow: ['/'],
          disallow: ['/studio'],
          crawlDelay: 15,
        },
      ],
    }),
  ],

  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-inter',
    },
    {
      provider: fontProviders.google(),
      name: 'Montserrat',
      cssVariable: '--font-montserrat',
      weights: [400, 500, 600, 700, 900, 'bold'],
    },
  ],

  vite: {
    plugins: [tailwindcss()],
    // optimizeDeps: {
    //   exclude: ['date-fns', '@sanity/icons', 'lightningcss', 'fsevents', '@sanity/astro', 'sanity', 'sanity/structure'],
    // },
  },
})
