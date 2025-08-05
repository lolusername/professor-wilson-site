import { defineType, defineField, defineArrayMember } from 'sanity'
import { UserIcon } from '@sanity/icons'

export const professorType = defineType({
  name: 'professor',
  title: 'Professor Profile',
  type: 'document',
  icon: UserIcon,
  __experimental_singleton: true, // Ensures only one document can be created
  groups: [
    {
      name: 'personal',
      title: 'Personal Information',
      icon: UserIcon,
      default: true,
    },
    {
      name: 'academic',
      title: 'Academic Information',
    },
    {
      name: 'contact',
      title: 'Contact Information',
    },
  ],
  fields: [
    // Hidden ID field to ensure consistent singleton ID
    defineField({
      name: 'id',
      title: 'ID',
      type: 'string',
      initialValue: 'professor-profile',
      readOnly: true,
      hidden: true,
    }),

    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      group: 'personal',
      validation: (Rule) => Rule.required().min(2).max(100),
      description: 'Professor\'s full name as it should appear on the site',
    }),

    defineField({
      name: 'displayName',
      title: 'Display Name',
      type: 'string',
      group: 'personal',
      description: 'Optional shorter name for headers and navigation',
    }),

    defineField({
      name: 'titles',
      title: 'Academic Titles',
      type: 'array',
      group: 'personal',
      of: [defineArrayMember({ type: 'string' })],
      description: 'Academic titles, degrees, and honors (e.g., "Ph.D.", "Professor Emeritus")',
    }),

    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      group: 'personal',
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
      ],
    }),

    defineField({
      name: 'shortBio',
      title: 'Short Biography',
      type: 'text',
      group: 'personal',
      rows: 4,
      validation: (Rule) => Rule.max(300),
      description: 'Brief bio for headers and cards (max 300 characters)',
    }),

    defineField({
      name: 'fullBio',
      title: 'Full Biography',
      type: 'array',
      group: 'personal',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
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
                title: 'External Link',
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
        }),
      ],
    }),

    defineField({
      name: 'currentPosition',
      title: 'Current Position',
      type: 'string',
      group: 'academic',
      description: 'Current academic position and institution',
    }),

    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      group: 'academic',
    }),

    defineField({
      name: 'institution',
      title: 'Institution',
      type: 'string',
      group: 'academic',
    }),

    defineField({
      name: 'officeLocation',
      title: 'Office Location',
      type: 'string',
      group: 'contact',
    }),

    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      group: 'contact',
      validation: (Rule) => Rule.email(),
    }),

    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      group: 'contact',
    }),

    defineField({
      name: 'officeHours',
      title: 'Office Hours',
      type: 'text',
      group: 'contact',
      rows: 3,
      description: 'When students can visit during office hours',
    }),

    defineField({
      name: 'socialLinks',
      title: 'Social & Academic Links',
      type: 'array',
      group: 'contact',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'ORCID', value: 'orcid' },
                  { title: 'Google Scholar', value: 'scholar' },
                  { title: 'ResearchGate', value: 'researchgate' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'Personal Website', value: 'website' },
                  { title: 'arXiv', value: 'arxiv' },
                  { title: 'MathSciNet', value: 'mathscinet' },
                ],
              },
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
            }),
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url',
            },
          },
        }),
      ],
    }),

    defineField({
      name: 'primaryResearchAreas',
      title: 'Primary Research Areas',
      type: 'array',
      group: 'academic',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'researchArea' }],
        }),
      ],
      description: 'Main areas of mathematical research',
    }),

    defineField({
      name: 'cvFile',
      title: 'CV File',
      type: 'file',
      group: 'academic',
      description: 'Upload current CV (PDF recommended)',
    }),
  ],

  preview: {
    select: {
      title: 'fullName',
      subtitle: 'currentPosition',
      media: 'profileImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Professor Profile',
        subtitle: subtitle || 'Complete your profile information',
        media,
      }
    },
  },
}) 