// import { useSanityClient } from "@sanity/astro";
// import type { PortableTextBlock } from '@portabletext/types'
import type { BlockContent, Post } from '@/sanity.types'
// import type { ImageAsset, PortableTextBlock, Slug } from '@sanity/types'
import groq from 'groq'
import { sanityClient } from 'sanity:client'

export async function getPosts(): Promise<Post[]> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc) {
			...,
			'lqip': mainImage.asset->metadata.lqip,
			mainImage {
				...,
				asset->{
					...,
					metadata
				}
			},
		}`
  )
}

export async function getPost(slug: string): Promise<Post> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && slug.current == $slug][0] {
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
    {
      slug,
    }
  )
}

// export async function getPostImage(slug: string): Promise<Post> {
//   return await sanityClient.fetch(
//     groq`*[_type == "post" && slug.current == $slug][0] {
// 			mainImage {
// 				...,
// 				asset->{
// 					...,
// 					metadata
// 				}
// 			},
// 		}`,
//     {
//       slug,
//     }
//   )
// }

// export interface PostPayload {
//   data: Post
//   sourceMap: Record<string, any>
//   perspective: 'published' | 'previewDrafts'
// }
// export interface Post2 {
//   _type: 'post'
//   _createdAt: string
//   title: string
//   slug: Slug
//   excerpt: string
//   mainImage: ImageAsset
//   body: PortableTextBlock[]
//   lqip: string
// }

// export interface Post {
//   _id: string
//   _type: 'post'
//   _createdAt: string
//   _updatedAt: string
//   _rev: string
//   title: string
//   slug: Slug
//   content?: BlockContent
//   excerpt?: string
//   coverImage: {
//     asset?: ImageAsset
//   }
//   date?: string
//   // author?: {
//   //   _ref: string
//   //   _type: 'reference'
//   //   _weak?: boolean
//   //   [internalGroqTypeReferenceTo]?: 'person'
//   // }
// }

// export interface Image {
//   asset: {
//     metadata: {
//       lqip: string
//     }
//   }
// }
