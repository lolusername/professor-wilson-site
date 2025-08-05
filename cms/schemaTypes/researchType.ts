import { defineType, defineField, defineArrayMember } from 'sanity'
import { SearchIcon } from '@sanity/icons'

export const researchType = defineType({
  name: 'research',
  title: 'Research Project',
  type: 'document',
  icon: SearchIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
    {
      name: 'metadata',
      title: 'Metadata',
    },
    {
      name: 'collaboration',
      title: 'Collaboration',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Research Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required().min(5).max(200),
      description: 'Clear, descriptive title of the research project',
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) => 
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'abstract',
      title: 'Abstract',
      type: 'text',
      group: 'content',
      rows: 6,
      validation: (Rule) => Rule.required().min(50),
      description: 'Research abstract or summary',
    }),

    defineField({
      name: 'description',
      title: 'Detailed Description',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              defineArrayMember({
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  }),
                ],
              }),
            ],
          },
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
        }),
        defineArrayMember({
          type: 'image',
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            }),
            defineField({
              name: 'caption',
              type: 'string',
              title: 'Caption',
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'researchAreas',
      title: 'Research Areas',
      type: 'array',
      group: 'metadata',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'researchArea' }],
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
      description: 'Mathematical areas this research belongs to',
    }),

    defineField({
      name: 'status',
      title: 'Project Status',
      type: 'string',
      group: 'metadata',
      options: {
        list: [
          { title: 'Planning', value: 'planning' },
          { title: 'Active', value: 'active' },
          { title: 'On Hold', value: 'on-hold' },
          { title: 'Completed', value: 'completed' },
          { title: 'Published', value: 'published' },
        ],
      },
      initialValue: 'planning',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      group: 'metadata',
      description: 'When the research project began',
    }),

    defineField({
      name: 'expectedCompletion',
      title: 'Expected Completion',
      type: 'date',
      group: 'metadata',
      description: 'Projected completion date',
      hidden: ({ document }) => document?.status === 'completed' || document?.status === 'published',
    }),

    defineField({
      name: 'completionDate',
      title: 'Completion Date',
      type: 'date',
      group: 'metadata',
      description: 'Actual completion date',
      hidden: ({ document }) => document?.status !== 'completed' && document?.status !== 'published',
    }),

    defineField({
      name: 'collaborators',
      title: 'Collaborators',
      type: 'array',
      group: 'collaboration',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'affiliation',
              title: 'Affiliation',
              type: 'string',
            }),
            defineField({
              name: 'role',
              title: 'Role',
              type: 'string',
              options: {
                list: [
                  { title: 'Co-Principal Investigator', value: 'co-pi' },
                  { title: 'Collaborator', value: 'collaborator' },
                  { title: 'Graduate Student', value: 'grad-student' },
                  { title: 'Postdoc', value: 'postdoc' },
                  { title: 'Research Assistant', value: 'research-assistant' },
                ],
              },
            }),
            defineField({
              name: 'email',
              title: 'Email',
              type: 'string',
              validation: (Rule) => Rule.email(),
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'affiliation',
            },
          },
        }),
      ],
    }),

    defineField({
      name: 'fundingSource',
      title: 'Funding Source',
      type: 'string',
      group: 'collaboration',
      description: 'Grant agency, fellowship, or funding organization',
    }),

    defineField({
      name: 'grantNumber',
      title: 'Grant Number',
      type: 'string',
      group: 'collaboration',
      description: 'Grant or award number if applicable',
    }),

    defineField({
      name: 'relatedPublications',
      title: 'Related Publications',
      type: 'array',
      group: 'collaboration',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'publication' }],
        }),
      ],
      description: 'Publications that have emerged from this research',
    }),

    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      group: 'metadata',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        layout: 'tags',
      },
      description: 'Keywords for searchability and categorization',
    }),

    defineField({
      name: 'featured',
      title: 'Featured Research',
      type: 'boolean',
      group: 'metadata',
      description: 'Highlight this research on the homepage',
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'status',
      media: 'description.0.asset',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `Status: ${subtitle}` : 'Research Project',
        media,
      }
    },
  },

  orderings: [
    {
      title: 'Most Recent',
      name: 'startDateDesc',
      by: [{ field: 'startDate', direction: 'desc' }],
    },
    {
      title: 'Oldest First',
      name: 'startDateAsc',
      by: [{ field: 'startDate', direction: 'asc' }],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
    {
      title: 'Status',
      name: 'status',
      by: [{ field: 'status', direction: 'asc' }],
    },
  ],
}) 