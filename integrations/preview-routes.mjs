import process from 'node:process'

/**
 * Preview (draft) mode route overrides.
 *
 * Astro only accepts the literal values `true` and `false` for a route's `prerender`
 * export, so a route cannot read the preview flag itself. This integration is the
 * supported way to flip it at build time.
 *
 * When preview mode is enabled the home page is rendered on demand, so new drafts show
 * up without a rebuild. Everything else stays prerendered: production keeps its static
 * HTML, its sitemap and its CDN caching.
 */
export function previewRoutes({
  enabled = process.env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED === 'true',
} = {}) {
  return {
    name: 'sanity-preview-routes',
    hooks: {
      'astro:route:setup': ({ route }) => {
        if (enabled && route.component === 'src/pages/index.astro') {
          route.prerender = false
        }
      },
    },
  }
}
