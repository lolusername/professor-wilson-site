import { defineType, defineField, defineArrayMember } from 'sanity'
import { EditIcon } from '@sanity/icons'

export const blogPostType = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  icon: EditIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
    {
      name: 'settings',
      title: 'Settings',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required().min(5).max(100),
      description: 'Blog post title',
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
      description: 'URL-friendly version of the title',
    }),

    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      group: 'content',
      rows: 4,
      validation: (Rule) => Rule.max(300),
      description: 'Brief summary for previews and social sharing (max 300 characters)',
    }),

    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Important for accessibility and SEO',
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
        }),
      ],
    }),

    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Underline', value: 'underline' },
              { title: 'Strike', value: 'strike-through' },
            ],
            annotations: [
              defineArrayMember({
                name: 'link',
                type: 'object',
                title: 'External Link',
                fields: [
                  defineField({
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  }),
                  defineField({
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: true,
                  }),
                ],
              }),
              defineArrayMember({
                name: 'internalLink',
                type: 'object',
                title: 'Internal Link',
                fields: [
                  defineField({
                    name: 'reference',
                    type: 'reference',
                    title: 'Reference',
                    to: [
                      { type: 'blogPost' },
                      { type: 'research' },
                      { type: 'publication' },
                    ],
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
        defineArrayMember({
          type: 'object',
          name: 'codeBlock',
          title: 'Code Block',
          fields: [
            defineField({
              name: 'code',
              title: 'Code',
              type: 'text',
              rows: 10,
            }),
            defineField({
              name: 'language',
              title: 'Language',
              type: 'string',
              options: {
                list: [
                  { title: 'Plain Text', value: 'text' },
                  { title: 'JavaScript', value: 'javascript' },
                  { title: 'TypeScript', value: 'typescript' },
                  { title: 'Python', value: 'python' },
                  { title: 'R', value: 'r' },
                  { title: 'LaTeX', value: 'latex' },
                  { title: 'Mathematica', value: 'mathematica' },
                  { title: 'MATLAB', value: 'matlab' },
                  { title: 'JSON', value: 'json' },
                  { title: 'Markdown', value: 'markdown' },
                  { title: 'HTML', value: 'html' },
                  { title: 'CSS', value: 'css' },
                ],
              },
              initialValue: 'text',
            }),
            defineField({
              name: 'filename',
              title: 'Filename',
              type: 'string',
              description: 'Optional filename to display',
            }),
          ],
          preview: {
            select: {
              title: 'filename',
              subtitle: 'language',
              code: 'code',
            },
            prepare({ title, subtitle, code }) {
              return {
                title: title || 'Code Block',
                subtitle: `Language: ${subtitle || 'text'}`,
                media: undefined,
              }
            },
          },
        }),
        defineArrayMember({
          type: 'object',
          name: 'mathBlock',
          title: 'Math Block',
          fields: [
            defineField({
              name: 'latex',
              title: 'LaTeX',
              type: 'text',
              rows: 6,
              description: 'LaTeX mathematical expression',
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'Optional caption for the equation',
            }),
          ],
          preview: {
            select: {
              latex: 'latex',
              caption: 'caption',
            },
            prepare({ latex, caption }) {
              return {
                title: caption || 'Math Expression',
                subtitle: latex ? latex.slice(0, 50) + '...' : 'LaTeX expression',
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'settings',
      description: 'When to publish this post',
      initialValue: () => new Date().toISOString(),
    }),

    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'settings',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
          { title: 'Archived', value: 'archived' },
        ],
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      group: 'settings',
      of: [
        defineArrayMember({
          type: 'string',
          options: {
            list: [
              { title: 'Mathematics', value: 'mathematics' },
              { title: 'Teaching', value: 'teaching' },
              { title: 'Research', value: 'research' },
              { title: 'Academic Life', value: 'academic-life' },
              { title: 'Technology', value: 'technology' },
              { title: 'Conferences', value: 'conferences' },
              { title: 'Reviews', value: 'reviews' },
              { title: 'Personal', value: 'personal' },
              { title: 'Tutorials', value: 'tutorials' },
              { title: 'News', value: 'news' },
            ],
          },
        }),
      ],
      description: 'Blog post categories',
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'settings',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        layout: 'tags',
      },
      description: 'Tags for this post',
    }),

    defineField({
      name: 'relatedPosts',
      title: 'Related Posts',
      type: 'array',
      group: 'settings',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'blogPost' }],
        }),
      ],
      validation: (Rule) => Rule.max(3),
      description: 'Up to 3 related blog posts',
    }),

    defineField({
      name: 'relatedResearch',
      title: 'Related Research',
      type: 'array',
      group: 'settings',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'research' }, { type: 'publication' }],
        }),
      ],
      description: 'Related research projects or publications',
    }),

    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      group: 'settings',
      description: 'Mark as featured to highlight on homepage',
      initialValue: false,
    }),

    defineField({
      name: 'allowComments',
      title: 'Allow Comments',
      type: 'boolean',
      group: 'settings',
      description: 'Enable comments for this post',
      initialValue: true,
    }),

    // SEO Fields
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      validation: (Rule) => Rule.max(60),
      description: 'Title for search engines (max 60 characters)',
    }),

    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      group: 'seo',
      rows: 3,
      validation: (Rule) => Rule.max(160),
      description: 'Description for search engines (max 160 characters)',
    }),

    defineField({
      name: 'seoKeywords',
      title: 'SEO Keywords',
      type: 'array',
      group: 'seo',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        layout: 'tags',
      },
      description: 'Keywords for search engines',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      status: 'status',
      publishedAt: 'publishedAt',
      media: 'featuredImage',
    },
    prepare({ title, status, publishedAt, media }) {
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString() : 'No date'
      
      return {
        title,
        subtitle: `${status} • ${date}`,
        media,
      }
    },
  },

  orderings: [
    {
      title: 'Published Date (Newest)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Published Date (Oldest)',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
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