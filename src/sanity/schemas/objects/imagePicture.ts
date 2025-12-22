import { ImageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

/**
 * Call to action schema object.  Objects are reusable schema structures document.
 * Learn more: https://www.sanity.io/docs/object-type
 */

export const imagePicture = defineType({
  name: 'imagePicture',
  title: 'Image',
  type: 'object',
  icon: ImageIcon,
  // validation: (Rule) =>
  //   // This is a custom validation rule that requires both 'buttonText' and 'link' to be set, or neither to be set
  //   Rule.custom((fields) => {
  //     const { buttonText, link } = fields || {}
  //     if ((buttonText && link) || (!buttonText && !link)) {
  //       return true
  //     }
  //     return 'Both Button text and Button link must be set, or both must be empty'
  //   }),
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'alt',
      media: 'image',
    },
    prepare(selection) {
      const { title, media } = selection

      return {
        title,
        subtitle: 'Image',
        media,
      }
    },
  },
})
