import type { SanityAsset } from '@sanity/image-url/lib/types/types'
import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from 'sanity:client'

export const imageBuilder = imageUrlBuilder(sanityClient)

export function urlForImage(source: SanityAsset) {
  return imageBuilder.image(source).auto('format')
}
