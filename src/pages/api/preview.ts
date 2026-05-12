import type { APIRoute } from 'astro'

const DOCUMENT_TYPE_ROUTES: Record<string, string> = {
  post: '/post',
  page: '',
  person: '/person',
}

export const GET: APIRoute = async ({ url, redirect }) => {
  const secret = url.searchParams.get('secret')
  const slug = url.searchParams.get('slug')
  const type = url.searchParams.get('type')

  // Validate secret token
  const expectedSecret = import.meta.env.SANITY_PREVIEW_SECRET
  if (!expectedSecret || secret !== expectedSecret) {
    return new Response(JSON.stringify({ message: 'Invalid or missing secret token' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Validate required parameters
  if (!slug) {
    return new Response(JSON.stringify({ message: 'Missing required parameter: slug' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  if (!type) {
    return new Response(JSON.stringify({ message: 'Missing required parameter: type' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Validate document type
  const routeBase = DOCUMENT_TYPE_ROUTES[type]
  if (routeBase === undefined) {
    return new Response(
      JSON.stringify({ message: `Unsupported document type: ${type}. Supported types: ${Object.keys(DOCUMENT_TYPE_ROUTES).join(', ')}` }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }

  // Build redirect URL
  const siteUrl = import.meta.env.SITE_URL || 'https://astro-sanity-blueprint.vercel.app'
  const targetUrl = `${siteUrl}${routeBase}/${slug}`

  // Set preview cookie and redirect
  return redirect(targetUrl, 307)
}