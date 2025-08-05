import { defineType, defineField, defineArrayMember } from 'sanity'
import { StarIcon } from '@sanity/icons'

export const cvEntryType = defineType({
  name: 'cvEntry',
  title: 'CV Entry',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(3).max(200),
      description: 'Entry title (e.g., position, degree, award name)',
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Education', value: 'education' },
          { title: 'Academic Positions', value: 'positions' },
          { title: 'Awards & Honors', value: 'awards' },
          { title: 'Grants & Funding', value: 'grants' },
          { title: 'Professional Service', value: 'service' },
          { title: 'Editorial Activities', value: 'editorial' },
          { title: 'Conference Presentations', value: 'presentations' },
          { title: 'Teaching', value: 'teaching' },
          { title: 'Memberships', value: 'memberships' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
      description: 'CV section this entry belongs to',
    }),

    defineField({
      name: 'institution',
      title: 'Institution/Organization',
      type: 'string',
      description: 'University, organization, or company',
    }),

    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'City, state/country',
    }),

    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      description: 'Start date (year will be used if month/day not relevant)',
    }),

    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      description: 'End date (leave empty if current/ongoing)',
    }),

    defineField({
      name: 'isCurrent',
      title: 'Current/Ongoing',
      type: 'boolean',
      initialValue: false,
      description: 'Check if this is a current position or ongoing activity',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H4', value: 'h4' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
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
      ],
      description: 'Detailed description of the role, achievement, or activity',
    }),

    defineField({
      name: 'details',
      title: 'Additional Details',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'e.g., "Advisor", "Thesis Title", "Amount"',
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'value',
            },
          },
        }),
      ],
      description: 'Key-value pairs for additional structured information',
    }),

    defineField({
      name: 'amount',
      title: 'Amount',
      type: 'string',
      description: 'Grant amount, salary, or other monetary value',
      hidden: ({ document }) => !['grants', 'awards'].includes(document?.category || ''),
    }),

    defineField({
      name: 'grantNumber',
      title: 'Grant/Award Number',
      type: 'string',
      description: 'Official grant or award number',
      hidden: ({ document }) => !['grants', 'awards'].includes(document?.category || ''),
    }),

    defineField({
      name: 'coInvestigators',
      title: 'Co-Investigators/Collaborators',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      description: 'Names of co-investigators or collaborators',
      hidden: ({ document }) => document?.category !== 'grants',
    }),

    defineField({
      name: 'degreeType',
      title: 'Degree Type',
      type: 'string',
      options: {
        list: [
          { title: 'Ph.D.', value: 'phd' },
          { title: 'M.S./M.A.', value: 'masters' },
          { title: 'B.S./B.A.', value: 'bachelors' },
          { title: 'Postdoc', value: 'postdoc' },
          { title: 'Certificate', value: 'certificate' },
          { title: 'Other', value: 'other' },
        ],
      },
      hidden: ({ document }) => document?.category !== 'education',
      description: 'Type of degree earned',
    }),

    defineField({
      name: 'fieldOfStudy',
      title: 'Field of Study',
      type: 'string',
      hidden: ({ document }) => document?.category !== 'education',
      description: 'Major, field, or area of study',
    }),

    defineField({
      name: 'thesisTitle',
      title: 'Thesis/Dissertation Title',
      type: 'string',
      hidden: ({ document }) => document?.category !== 'education',
      description: 'Title of thesis or dissertation',
    }),

    defineField({
      name: 'advisor',
      title: 'Advisor',
      type: 'string',
      hidden: ({ document }) => document?.category !== 'education',
      description: 'Name of thesis advisor or supervisor',
    }),

    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Link to related webpage, document, or resource',
    }),

    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Custom sort order within category (lower numbers appear first)',
    }),

    defineField({
      name: 'isHidden',
      title: 'Hidden',
      type: 'boolean',
      initialValue: false,
      description: 'Hide this entry from public CV display',
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        layout: 'tags',
      },
      description: 'Tags for organizing and filtering',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      institution: 'institution',
      category: 'category',
      startDate: 'startDate',
      endDate: 'endDate',
      isCurrent: 'isCurrent',
    },
    prepare({ title, institution, category, startDate, endDate, isCurrent }) {
      const formatDate = (date: string) => {
        if (!date) return ''
        return new Date(date).getFullYear().toString()
      }

      const dateRange = startDate 
        ? `${formatDate(startDate)}${endDate && !isCurrent ? `-${formatDate(endDate)}` : isCurrent ? '-present' : ''}`
        : ''

      const subtitle = [institution, dateRange].filter(Boolean).join(' • ')
      
      return {
        title,
        subtitle: subtitle || category,
      }
    },
  },

  orderings: [
    {
      title: 'Category',
      name: 'category',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'startDate', direction: 'desc' },
      ],
    },
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
      title: 'Custom Sort Order',
      name: 'sortOrder',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'sortOrder', direction: 'asc' },
        { field: 'startDate', direction: 'desc' },
      ],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
}) 