import type { Image } from '@sanity/types'
import imageUrlBuilder from '@sanity/image-url'
// import { useSanityClient } from "@sanity/astro";
import { sanityClient } from 'sanity:client'

const builder = imageUrlBuilder(sanityClient)

export function urlForImage(source: Image) {
  return builder.image(source)
}
