// import { useSanityClient } from "@sanity/astro";
import type { PortableTextBlock } from '@portabletext/types'
import type { ImageAsset, Slug } from '@sanity/types'
import groq from 'groq'
import { sanityClient } from 'sanity:client'

// export async function getPosts(): Promise<Post[]> {
// 	return await sanityClient.fetch(
// 		groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`
// 	)
// }
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

// export async function getPost(slug: string): Promise<Post> {
// 	return await sanityClient.fetch(groq`*[_type == "post" && slug.current == $slug][0]`, {
// 		slug,
// 	})
// }
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

export async function getPostImage(slug: string): Promise<Post> {
	return await sanityClient.fetch(
		groq`*[_type == "post" && slug.current == $slug][0] {
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
