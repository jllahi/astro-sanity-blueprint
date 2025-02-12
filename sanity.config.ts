// const projectId =
//   import.meta.env.PUBLIC_SANITY_STUDIO_PROJECT_ID! || import.meta.env.PUBLIC_SANITY_PROJECT_ID!
// const dataset =
//   import.meta.env.PUBLIC_SANITY_STUDIO_DATASET! || import.meta.env.PUBLIC_SANITY_DATASET!

// Feel free to remove this check if you don't need it
// if (!projectId || !dataset) {
//   throw new Error(
//     `Missing environment variable(s). Check if named correctly in .env file.\n\nShould be:\nPUBLIC_SANITY_STUDIO_PROJECT_ID=${projectId}\nPUBLIC_SANITY_STUDIO_DATASET=${dataset}\n\nAvailable environment variables:\n${JSON.stringify(
//       import.meta.env,
//       null,
//       2
//     )}`
//   )
// }
import process from 'node:process'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { media } from 'sanity-plugin-media'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'
import { loadEnv } from 'vite'
import { resolve } from './sanity/resolve'
import { schemaTypes } from './sanity/schema'
// const env = loadEnv('', process.cwd(), 'PUBLIC')

// Different environments use different variables
// const projectId = env.PUBLIC_SANITY_STUDIO_PROJECT_ID! || env.PUBLIC_SANITY_PROJECT_ID!
// const dataset = env.PUBLIC_SANITY_STUDIO_DATASET! || env.PUBLIC_SANITY_DATASET!

const {
  PUBLIC_SANITY_STUDIO_PROJECT_ID,
  PUBLIC_SANITY_STUDIO_DATASET,
  PUBLIC_SANITY_PROJECT_ID,
  PUBLIC_SANITY_DATASET,
} = loadEnv('', process.cwd(), '')
// } = loadEnv(import.meta.env.MODE, process.cwd(), '')
const projectId = PUBLIC_SANITY_STUDIO_PROJECT_ID || PUBLIC_SANITY_PROJECT_ID
const dataset = PUBLIC_SANITY_STUDIO_DATASET || PUBLIC_SANITY_DATASET

// const homeLocation = {
// 	title: 'Home',
// 	href: '/',
// } satisfies DocumentLocation

export function resolveHref(documentType?: string, slug?: string): string | undefined {
  switch (documentType) {
    case 'post':
      return slug ? `/post/${slug}` : undefined
    default:
      console.warn('Invalid document type:', documentType)
      return undefined
  }
}

export default defineConfig({
  name: 'astro-sanity-blueprint',
  title: 'astro-sanity-blueprint',
  projectId,
  dataset,
  plugins: [
    structureTool(),
    presentationTool({
      resolve,
      previewUrl: location.origin,
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
