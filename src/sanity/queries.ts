import { defineQuery } from 'groq'

export const POSTS_SLUGS_QUERY = defineQuery(
  `*[_type == "post" && defined(slug.current)] | order(_createdAt desc) {
    _id,
    slug,
    title,
  }`
)

export const POSTS_QUERY = defineQuery(
  `*[_type == "post" && defined(slug.current)] | order(_createdAt desc) {
    ...,
    coverImage {
      ...,
      asset->{
        ...,
        metadata {
          ...,
          blurhash,
          lqip,
          palette,
        }
      }
    },
  }`
)

export const POST_QUERY = defineQuery(
  `*[_type == "post" && slug.current == $slug][0] {
    ...,
    body,
    coverImage {
      ...,
      asset->{
        ...,
        metadata {
          ...,
          blurhash,
          lqip,
          palette,
        }
      }
    },
  }`
)
