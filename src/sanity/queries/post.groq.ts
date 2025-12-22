import type { Post } from '../types'
import { defineQuery } from 'groq'
import { loadQuery } from '../load-query'

export const queryAllPosts =
  defineQuery(`*[_type == "post" && defined(slug.current)] | order(_createdAt desc) {
			...,
			'lqip': coverImage.asset->metadata.lqip,
			coverImage {
				...,
				asset->{
					...,
					metadata
				}
			},
		}`)

export const querySlugsAllPosts =
  defineQuery(`*[_type == "post" && defined(slug.current)] | order(_createdAt desc) {
			title,
			slug
		}`)

export const queryPostBySlug = defineQuery(`*[_type == "post" && slug.current == $slug][0] {
			...,
			'lqip': coverImage.asset->metadata.lqip,
			coverImage {
				...,
				asset->{
					...,
					metadata
				}
			},
		}`)

export async function getAllPosts() {
  const { data: posts } = await loadQuery<Post[]>({
    query: queryAllPosts,
  })
  return posts
}

export async function getSlugsAllPosts() {
  const { data: posts } = await loadQuery<Post[]>({
    query: querySlugsAllPosts,
  })
  return posts
}

export async function getPostBySlug(slug: string) {
  const { data: post } = await loadQuery<Post>({
    query: queryPostBySlug,
    params: {
      slug,
    },
  })
  return post
}
