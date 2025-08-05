import { defineType, defineField } from 'sanity'
import { TagIcon } from '@sanity/icons'

export const researchAreaType = defineType({
  name: 'researchArea',
  title: 'Research Area',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Research Area Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(100),
      description: 'Name of the mathematical research area (e.g., "Algebraic Topology", "Number Theory")',
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
        slugify: (input: string) => 
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
      description: 'URL-friendly version of the research area name',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Brief description of this research area',
    }),

    defineField({
      name: 'parentArea',
      title: 'Parent Research Area',
      type: 'reference',
      to: [{ type: 'researchArea' }],
      description: 'Optional: broader research area this belongs to',
    }),

    defineField({
      name: 'mscClassification',
      title: 'MSC Classification',
      type: 'string',
      description: 'Mathematics Subject Classification code (e.g., "11A25", "55N15")',
    }),

    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      options: {
        list: [
          { title: 'Blue', value: 'blue' },
          { title: 'Green', value: 'green' },
          { title: 'Purple', value: 'purple' },
          { title: 'Red', value: 'red' },
          { title: 'Orange', value: 'orange' },
          { title: 'Teal', value: 'teal' },
          { title: 'Gray', value: 'gray' },
        ],
      },
      description: 'Color for visual organization and tagging',
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? subtitle.slice(0, 100) + (subtitle.length > 100 ? '...' : '') : undefined,
      }
    },
  },

  orderings: [
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Name Z-A',
      name: 'nameDesc',
      by: [{ field: 'name', direction: 'desc' }],
    },
  ],
}) 