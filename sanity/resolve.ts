import type { PresentationPluginOptions } from 'sanity/presentation'
import { defineLocations } from 'sanity/presentation'

export const resolve: PresentationPluginOptions['resolve'] = {
	locations: {
		// Add more locations for other post types
		post: defineLocations({
			select: {
				title: 'title',
				slug: 'slug.current',
			},
			resolve: (doc) => ({
				locations: [
					{
						title: doc?.title || 'Untitled',
						href: `/post/${doc?.slug}`,
					},
					{ title: 'Posts', href: location.origin },
				],
			}),
		}),
	},
}

// resolve: {
//   mainDocuments: defineDocuments([
//     {
//       route: '/post/:slug',
//       filter: `_type == "post" && slug.current == $slug`,
//     },
//   ]),
//   locations: {
//     settings: defineLocations({
//       locations: [homeLocation],
//       message: 'This document is used on all pages',
//       tone: 'caution',
//     }),
//     post: defineLocations({
//       select: {
//         title: 'title',
//         slug: 'slug.current',
//       },
//       resolve: (doc) => ({
//         locations: [
//           {
//             title: doc?.title || 'Untitled',
//             href: resolveHref('post', doc?.slug)!,
//           },
//           homeLocation,
//         ],
//       }),
//     }),
//   },
// },
