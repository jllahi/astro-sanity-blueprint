import imageUrlBuilder from '@sanity/image-url'
import type { Image } from '@sanity/types'
// import { useSanityClient } from "@sanity/astro";
import { sanityClient } from 'sanity:client'

const builder = imageUrlBuilder(sanityClient)

export function urlForImage(source: Image) {
  return builder.image(source)
}
