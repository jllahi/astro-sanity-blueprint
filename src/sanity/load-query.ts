// load-query.ts
import type { QueryParams } from 'sanity'
import { sanityClient } from 'sanity:client'

/**
 * Preview (draft) mode.
 *
 * Drafts are only requested when `PUBLIC_SANITY_VISUAL_EDITING_ENABLED` is `true`.
 * That flag must never be enabled on a production deployment: it serves unpublished
 * content and would bake it into any prerendered HTML.
 */
const previewRequested = import.meta.env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED === 'true'

if (previewRequested && import.meta.env.VERCEL_ENV === 'production') {
  throw new Error(
    'PUBLIC_SANITY_VISUAL_EDITING_ENABLED is enabled on a Vercel production deployment. ' +
      'Preview mode serves unpublished drafts, so it is only allowed in development and preview environments. ' +
      'Remove the variable from the Production environment in Vercel.'
  )
}

export const previewEnabled = previewRequested

const token = import.meta.env.SANITY_API_READ_TOKEN

/** Perspectives a page is allowed to request. `raw` and `previewDrafts` stay internal. */
export type QueryPerspective = 'published' | 'drafts'

export async function loadQuery<QueryResponse>({
  query,
  params,
  perspective: perspectiveOverride,
}: {
  query: string
  params?: QueryParams
  /** Force a perspective, for content that must stay published (for example the RSS feed). */
  perspective?: QueryPerspective
}) {
  const perspective: QueryPerspective =
    perspectiveOverride ?? (previewEnabled ? 'drafts' : 'published')

  // Draft content needs an API token and cannot be served from the API CDN.
  const draftContent = previewEnabled && perspective !== 'published'

  if (draftContent && !token) {
    throw new Error(
      'Preview mode is enabled but `SANITY_API_READ_TOKEN` is missing. ' +
        'Add a Viewer token for the dataset to your environment.'
    )
  }

  const { result, resultSourceMap } = await sanityClient.fetch<QueryResponse>(query, params ?? {}, {
    filterResponse: false,
    perspective,
    resultSourceMap: draftContent ? 'withKeyArraySelector' : false,
    stega: draftContent,
    ...(draftContent ? { token } : {}),
    useCdn: !draftContent,
  })

  return {
    data: result,
    sourceMap: resultSourceMap,
    perspective,
  }
}
