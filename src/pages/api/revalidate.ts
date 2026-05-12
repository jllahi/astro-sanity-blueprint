import type { APIRoute } from 'astro'

const DOCUMENT_TYPE_ROUTES: Record<string, string> = {
  post: 'post',
  page: 'page',
  person: 'person',
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json()
    const { secret, type, slug } = body

    // Validate secret token
    const expectedSecret = import.meta.env.SANITY_PREVIEW_SECRET
    if (!expectedSecret || secret !== expectedSecret) {
      return new Response(
        JSON.stringify({ message: 'Invalid or missing secret token' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    // Validate required parameters
    if (!type) {
      return new Response(
        JSON.stringify({ message: 'Missing required parameter: type' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    if (!slug) {
      return new Response(
        JSON.stringify({ message: 'Missing required parameter: slug' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    // Validate document type
    const routeBase = DOCUMENT_TYPE_ROUTES[type]
    if (routeBase === undefined) {
      return new Response(
        JSON.stringify({ message: `Unsupported document type: ${type}` }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    // Use Vercel ISR revalidation via cache tags
    const revalidatedTag = `${routeBase}-${slug}`

    // Call Vercel cache invalidation API
    const vercelToken = import.meta.env.VERCEL_API_TOKEN
    const vercelTeamId = import.meta.env.VERCEL_TEAM_ID

    if (vercelToken) {
      const teamQuery = vercelTeamId ? `?teamId=${vercelTeamId}` : ''
      const purgeUrl = `https://api.vercel.com/v6/purges${teamQuery}`

      const purgeResponse = await fetch(purgeUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${vercelToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tags: [revalidatedTag] }),
      })

      if (!purgeResponse.ok) {
        const errorText = await purgeResponse.text()
        console.error('Vercel cache purge failed:', errorText)
        return new Response(
          JSON.stringify({ message: 'Cache purge failed', error: errorText }),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          }
        )
      }
    } else {
      // Log warning in local dev - Vercel API token not set
      console.warn('[revalidate] VERCEL_API_TOKEN not set - cache not purged')
    }

    return new Response(
      JSON.stringify({
        revalidated: true,
        slug,
        tag: revalidatedTag,
        timestamp: new Date().toISOString(),
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Revalidation error:', error)
    return new Response(
      JSON.stringify({ message: 'Revalidation failed', error: String(error) }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}