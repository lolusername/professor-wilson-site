import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export const publicationType = defineType({
  name: 'publication',
  title: 'Publication',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    {
      name: 'basic',
      title: 'Basic Information',
      default: true,
    },
    {
      name: 'bibliographic',
      title: 'Bibliographic Details',
    },
    {
      name: 'content',
      title: 'Content & Links',
    },
    {
      name: 'metadata',
      title: 'Metadata',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'basic',
      validation: (Rule) => Rule.required().min(5).max(300),
      description: 'Full title of the publication',
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'basic',
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
      name: 'type',
      title: 'Publication Type',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          { title: 'Journal Article', value: 'journal-article' },
          { title: 'Conference Paper', value: 'conference-paper' },
          { title: 'Book', value: 'book' },
          { title: 'Book Chapter', value: 'book-chapter' },
          { title: 'Preprint', value: 'preprint' },
          { title: 'Thesis', value: 'thesis' },
          { title: 'Technical Report', value: 'technical-report' },
          { title: 'Working Paper', value: 'working-paper' },
          { title: 'Review Article', value: 'review-article' },
          { title: 'Editorial', value: 'editorial' },
        ],
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'journal-article',
    }),

    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      group: 'basic',
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
              name: 'isCorresponding',
              title: 'Corresponding Author',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'orcid',
              title: 'ORCID',
              type: 'string',
              description: 'ORCID identifier (e.g., 0000-0000-0000-0000)',
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
      validation: (Rule) => Rule.required().min(1),
      description: 'List of authors in order',
    }),

    defineField({
      name: 'abstract',
      title: 'Abstract',
      type: 'text',
      group: 'basic',
      rows: 8,
      description: 'Publication abstract or summary',
    }),

    defineField({
      name: 'venue',
      title: 'Venue',
      type: 'string',
      group: 'bibliographic',
      description: 'Journal name, conference name, or publisher',
    }),

    defineField({
      name: 'volume',
      title: 'Volume',
      type: 'string',
      group: 'bibliographic',
      description: 'Journal volume number',
    }),

    defineField({
      name: 'issue',
      title: 'Issue',
      type: 'string',
      group: 'bibliographic',
      description: 'Journal issue number',
    }),

    defineField({
      name: 'pages',
      title: 'Pages',
      type: 'string',
      group: 'bibliographic',
      description: 'Page range (e.g., "123-145" or "1-20")',
    }),

    defineField({
      name: 'publishedDate',
      title: 'Publication Date',
      type: 'date',
      group: 'bibliographic',
      description: 'Date of publication',
    }),

    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      group: 'bibliographic',
      validation: (Rule) => Rule.min(1900).max(new Date().getFullYear() + 5),
      description: 'Publication year',
    }),

    defineField({
      name: 'doi',
      title: 'DOI',
      type: 'string',
      group: 'bibliographic',
      description: 'Digital Object Identifier (e.g., 10.1000/182)',
    }),

    defineField({
      name: 'isbn',
      title: 'ISBN',
      type: 'string',
      group: 'bibliographic',
      description: 'ISBN for books',
      hidden: ({ document }) => document?.type !== 'book' && document?.type !== 'book-chapter',
    }),

    defineField({
      name: 'arxivId',
      title: 'arXiv ID',
      type: 'string',
      group: 'bibliographic',
      description: 'arXiv identifier (e.g., math.GT/0309136 or 1234.5678)',
    }),

    defineField({
      name: 'status',
      title: 'Publication Status',
      type: 'string',
      group: 'metadata',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Submitted', value: 'submitted' },
          { title: 'Under Review', value: 'under-review' },
          { title: 'Accepted', value: 'accepted' },
          { title: 'Published', value: 'published' },
          { title: 'In Press', value: 'in-press' },
        ],
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'pdfFile',
      title: 'PDF File',
      type: 'file',
      group: 'content',
      description: 'Upload the publication PDF',
      options: {
        accept: '.pdf',
      },
    }),

    defineField({
      name: 'externalLinks',
      title: 'External Links',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              options: {
                list: [
                  { title: 'Journal Article', value: 'journal' },
                  { title: 'arXiv', value: 'arxiv' },
                  { title: 'Publisher', value: 'publisher' },
                  { title: 'Conference', value: 'conference' },
                  { title: 'Slides', value: 'slides' },
                  { title: 'Video', value: 'video' },
                  { title: 'Code', value: 'code' },
                  { title: 'Data', value: 'data' },
                  { title: 'Supplement', value: 'supplement' },
                ],
              },
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'url',
            },
          },
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
      description: 'Mathematical areas this publication contributes to',
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
      description: 'Keywords for searchability',
    }),

    defineField({
      name: 'relatedResearch',
      title: 'Related Research Projects',
      type: 'array',
      group: 'metadata',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'research' }],
        }),
      ],
      description: 'Research projects that led to this publication',
    }),

    defineField({
      name: 'citationCount',
      title: 'Citation Count',
      type: 'number',
      group: 'metadata',
      description: 'Number of citations (if tracked)',
    }),

    defineField({
      name: 'featured',
      title: 'Featured Publication',
      type: 'boolean',
      group: 'metadata',
      description: 'Highlight this publication',
      initialValue: false,
    }),

    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      group: 'content',
      rows: 3,
      description: 'Internal notes about this publication',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      authors: 'authors',
      year: 'year',
      type: 'type',
    },
    prepare({ title, authors, year, type }) {
      const authorsList = authors?.length 
        ? authors.map((author: any) => author.name).join(', ')
        : 'Unknown authors'
      
      return {
        title,
        subtitle: `${authorsList} (${year || 'No year'}) - ${type || 'Unknown type'}`,
      }
    },
  },

  orderings: [
    {
      title: 'Most Recent',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
    {
      title: 'Oldest First',
      name: 'yearAsc',
      by: [{ field: 'year', direction: 'asc' }],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
    {
      title: 'Type',
      name: 'type',
      by: [{ field: 'type', direction: 'asc' }],
    },
    {
      title: 'Status',
      name: 'status',
      by: [{ field: 'status', direction: 'asc' }],
    },
  ],
}) 