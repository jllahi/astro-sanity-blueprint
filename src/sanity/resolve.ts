import type { PresentationPluginOptions } from 'sanity/presentation'
import { defineLocations } from 'sanity/presentation'

const homeLocation = {
  title: 'Home',
  href: '/',
}

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    post: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => {
        if (!doc?.slug) return null
        return {
          locations: [
            {
              title: doc.title || 'Untitled',
              href: `/post/${doc.slug}`,
            },
            { title: 'Posts', href: '/' },
          ],
        }
      },
    }),
    page: defineLocations({
      select: {
        title: 'name',
        slug: 'slug.current',
      },
      resolve: (doc) => {
        if (!doc?.slug) return null
        return {
          locations: [
            {
              title: doc.title || 'Untitled',
              href: `/${doc.slug}`,
            },
            homeLocation,
          ],
        }
      },
    }),
    person: defineLocations({
      select: {
        title: 'firstName',
        slug: 'slug.current',
      },
      resolve: (doc) => {
        if (!doc?.slug) return null
        return {
          locations: [
            {
              title: doc.title || 'Untitled',
              href: `/person/${doc.slug}`,
            },
            homeLocation,
          ],
        }
      },
    }),
  },
}
