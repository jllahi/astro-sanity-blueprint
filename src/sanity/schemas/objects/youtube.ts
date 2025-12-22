import { VideoIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

/**
 * Call to action schema object.  Objects are reusable schema structures document.
 * Learn more: https://www.sanity.io/docs/object-type
 */

export const youtube = defineType({
  name: 'youtube',
  title: 'YouTube',
  type: 'object',
  icon: VideoIcon,
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
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    // defineField({
    //   name: 'text',
    //   title: 'Text',
    //   type: 'text',
    // }),
    defineField({
      name: 'id',
      title: 'ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'posterQuality',
      title: 'Poster Quality',
      type: 'string',
      options: {
        list: [
          { title: 'Max (1280px)', value: 'max' },
          { title: 'High (640px)', value: 'high' },
          { title: 'Default (480px)', value: 'default' },
          { title: 'Low (120px)', value: 'low' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'high',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const { title } = selection

      return {
        title,
        subtitle: 'YouTube',
      }
    },
  },
})
