// import { useSanityClient } from "@sanity/astro";
import type { PortableTextBlock } from '@portabletext/types'
import type { ImageAsset, Slug } from '@sanity/types'
import groq from 'groq'
import { sanityClient } from 'sanity:client'
import { loadQuery } from '../../sanity/load-query'

export async function getPosts(): Promise<Post[]> {
  return await loadQuery<Array<Post>>({
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

export async function getPost(slug: string): Promise<Post> {
  return await loadQuery<Post>({
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

// export interface PostPayload {
//   data: Post
//   sourceMap: Record<string, any>
//   perspective: 'published' | 'previewDrafts'
// }
export interface Post {
  _type: 'post'
  _createdAt: string
  title: string
  slug: Slug
  excerpt: string
  mainImage: ImageAsset
  body: PortableTextBlock[]
  lqip: string
}

export interface Image {
  asset: {
    metadata: {
      lqip: string
    }
  }
}
