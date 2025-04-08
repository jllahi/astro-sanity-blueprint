import type { Post } from '@/sanity.types'
// import { useSanityClient } from "@sanity/astro";
// import type { PortableTextBlock } from '@portabletext/types'
// import groq from 'groq'
// import { sanityClient } from 'sanity:client'
import { loadQuery } from '../../sanity/load-query'
import type { ContentSourceMap } from '@sanity/client';

export async function getPosts(): Promise<{ data: Post[]; sourceMap: ContentSourceMap | undefined; perspective: string; }> {
	return await loadQuery({
		query: `*[_type == "post" && defined(slug.current)] | order(_createdAt desc) {
			...,
			'lqip': mainImage.asset->metadata.lqip,
			mainImage {
				...,
				asset->{
					...,
					metadata
				}
			},
		}`,
	})
}

export async function getPost(slug: string): Promise<{ data: Post; sourceMap: ContentSourceMap | undefined; perspective: string; }> {
	return await loadQuery({
		query: `*[_type == "post" && slug.current == $slug][0] {
			...,
			'lqip': mainImage.asset->metadata.lqip,
			mainImage {
				...,
				asset->{
					...,
					metadata
				}
			},
		}`,
		params: { slug },
	})
}

export interface PostPayload {
	data: Post
	sourceMap: ContentSourceMap | undefined
	perspective: 'published' | 'drafts'
}
// export interface Post {
//   _type: 'post'
//   _createdAt: string
//   title: string
//   slug: Slug
//   excerpt: string
//   mainImage: ImageAsset
//   body: PortableTextBlock[]
//   lqip: string
// }

// export interface Image {
//   asset: {
//     metadata: {
//       lqip: string
//     }
//   }
// }
