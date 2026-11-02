/* eslint-disable test/no-import-node-test -- this blueprint ships no test runner, and `node:test` needs no dependency */
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { previewRoutes } from '../integrations/preview-routes.mjs'

const COMPONENTS = [
  'src/pages/index.astro',
  'src/pages/post/[slug].astro',
  'src/pages/about.astro',
  'src/pages/rss.xml.ts',
]

function applyRoutes(hook) {
  const routes = COMPONENTS.map((component) => ({ component, prerender: true }))
  for (const route of routes) {
    hook({ route, logger: {} })
  }
  return Object.fromEntries(routes.map((route) => [route.component, route.prerender]))
}

test('preview disabled leaves every route prerendered', () => {
  const hook = previewRoutes({ enabled: false }).hooks['astro:route:setup']
  for (const [component, prerender] of Object.entries(applyRoutes(hook))) {
    assert.equal(prerender, true, component)
  }
})

test('preview enabled flips only the home page to on-demand', () => {
  const hook = previewRoutes({ enabled: true }).hooks['astro:route:setup']
  assert.deepEqual(applyRoutes(hook), {
    'src/pages/index.astro': false,
    'src/pages/post/[slug].astro': true,
    'src/pages/about.astro': true,
    'src/pages/rss.xml.ts': true,
  })
})

test('the flag defaults to PUBLIC_SANITY_VISUAL_EDITING_ENABLED', () => {
  const previous = process.env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED
  try {
    process.env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED = 'true'
    const enabled = applyRoutes(previewRoutes().hooks['astro:route:setup'])
    assert.equal(enabled['src/pages/index.astro'], false)

    process.env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED = 'false'
    const disabled = applyRoutes(previewRoutes().hooks['astro:route:setup'])
    assert.equal(disabled['src/pages/index.astro'], true)
  } finally {
    if (previous === undefined) {
      delete process.env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED
    } else {
      process.env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED = previous
    }
  }
})
