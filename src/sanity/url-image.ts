import type { SanityImageSource } from '@sanity/image-url'
// import type { SanityAsset } from '@sanity/image-url/lib/types/types'
// import type { Image } from '@/sanity/types'
import { createImageUrlBuilder } from '@sanity/image-url'
import { sanityClient } from 'sanity:client'
// import { useSanityClient } from "@sanity/astro";
// import { sanityClient } from '@/sanity/client'

// export function urlForImage(source: SanityAsset) {
//   return imageBuilder.image(source).auto('format')
// }

const builder = createImageUrlBuilder(sanityClient)

export function urlForImage(source: SanityImageSource) {
  return builder.image(source).auto('format')
}
