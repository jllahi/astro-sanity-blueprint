// Different environments use different variables
const projectId =
	import.meta.env.PUBLIC_SANITY_STUDIO_PROJECT_ID! || import.meta.env.PUBLIC_SANITY_PROJECT_ID!
const dataset =
	import.meta.env.PUBLIC_SANITY_STUDIO_DATASET! || import.meta.env.PUBLIC_SANITY_DATASET!

// Feel free to remove this check if you don't need it
if (!projectId || !dataset) {
	throw new Error(
		`Missing environment variable(s). Check if named correctly in .env file.\n\nShould be:\nPUBLIC_SANITY_STUDIO_PROJECT_ID=${projectId}\nPUBLIC_SANITY_STUDIO_DATASET=${dataset}\n\nAvailable environment variables:\n${JSON.stringify(
			import.meta.env,
			null,
			2
		)}`
	)
}

const previewUrl = import.meta.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:4321'

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { media } from 'sanity-plugin-media'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schema'

export default defineConfig({
	name: 'astro-sanity-blueprint',
	title: 'astro-sanity-blueprint',
	projectId,
	dataset,
	plugins: [
		presentationTool({
			// Required: set the base URL to the preview location in the front end
			previewUrl: previewUrl,
			// locate,
		}),
		structureTool(),
		media(),
		visionTool(),
		unsplashImageAsset(),
	],
	schema: {
		types: schemaTypes,
	},
	scheduledPublishing: {
		enabled: false,
	},
})
