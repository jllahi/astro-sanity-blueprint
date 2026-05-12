import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { media } from 'sanity-plugin-media'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'
import { resolve } from './src/sanity/resolve'
import { schemaTypes } from '@/sanity/schemas'

export default defineConfig({
  name: 'astro-sanity-blueprint',
  title: 'Astro Sanity Blueprint',
  projectId: '3q0ng9ao',
  dataset: 'development',
  plugins: [
    structureTool(),
    presentationTool({
      resolve,
      previewUrl: {
        origin: import.meta.env.SITE_URL || 'https://astro-sanity-blueprint.vercel.app',
        previewMode: {
          enable: '/api/preview',
        },
      },
    }),
    unsplashImageAsset(),
    visionTool(),
    media(),
  ],
  schema: {
    types: schemaTypes,
  },
  scheduledPublishing: {
    enabled: false,
  },
  tasks: {
    enabled: false,
  },
})
