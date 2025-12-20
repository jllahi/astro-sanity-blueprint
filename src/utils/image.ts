import type { Image } from '@sanity/types'
import { createImageUrlBuilder } from '@sanity/image-url'
// import { useSanityClient } from "@sanity/astro";
import { sanityClient } from 'sanity:client'

const builder = createImageUrlBuilder(sanityClient)

export function urlForImage(source: Image) {
  return builder.image(source)
}
