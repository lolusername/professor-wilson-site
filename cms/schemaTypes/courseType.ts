import { defineType, defineField, defineArrayMember } from 'sanity'
import { BookIcon } from '@sanity/icons'

export const courseType = defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  icon: BookIcon,
  groups: [
    {
      name: 'basic',
      title: 'Basic Information',
      default: true,
    },
    {
      name: 'content',
      title: 'Course Content',
    },
    {
      name: 'logistics',
      title: 'Logistics',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Course Title',
      type: 'string',
      group: 'basic',
      validation: (Rule) => Rule.required().min(3).max(200),
      description: 'Full title of the course',
    }),

    defineField({
      name: 'courseNumber',
      title: 'Course Number',
      type: 'string',
      group: 'basic',
      description: 'Course code/number (e.g., MATH 101, MTH 5210)',
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'basic',
      options: {
        source: (doc: any) => `${doc.courseNumber || ''} ${doc.title || ''}`.trim(),
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
      name: 'level',
      title: 'Course Level',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          { title: 'Undergraduate - Introductory', value: 'undergrad-intro' },
          { title: 'Undergraduate - Intermediate', value: 'undergrad-intermediate' },
          { title: 'Undergraduate - Advanced', value: 'undergrad-advanced' },
          { title: 'Graduate - Masters', value: 'graduate-masters' },
          { title: 'Graduate - Doctoral', value: 'graduate-doctoral' },
          { title: 'Graduate - Advanced Topics', value: 'graduate-advanced' },
        ],
      },
      description: 'Academic level of the course',
    }),

    defineField({
      name: 'credits',
      title: 'Credit Hours',
      type: 'number',
      group: 'basic',
      validation: (Rule) => Rule.min(0).max(20),
      description: 'Number of credit hours',
    }),

    defineField({
      name: 'description',
      title: 'Course Description',
      type: 'text',
      group: 'basic',
      rows: 4,
      description: 'Official course description or catalog description',
    }),

    defineField({
      name: 'prerequisites',
      title: 'Prerequisites',
      type: 'array',
      group: 'basic',
      of: [defineArrayMember({ type: 'string' })],
      description: 'Required prerequisite courses or knowledge',
    }),

    defineField({
      name: 'learningObjectives',
      title: 'Learning Objectives',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          },
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
        }),
      ],
      description: 'What students will learn in this course',
    }),

    defineField({
      name: 'topics',
      title: 'Course Topics',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Topic Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'weekNumber',
              title: 'Week Number',
              type: 'number',
              description: 'Which week this topic is covered',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              week: 'weekNumber',
              description: 'description',
            },
            prepare({ title, week, description }) {
              return {
                title,
                subtitle: week ? `Week ${week}${description ? ': ' + description.slice(0, 50) + '...' : ''}` : description,
              }
            },
          },
        }),
      ],
      description: 'Main topics covered in the course',
    }),

    defineField({
      name: 'textbooks',
      title: 'Textbooks & Materials',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'authors',
              title: 'Authors',
              type: 'string',
            }),
            defineField({
              name: 'edition',
              title: 'Edition',
              type: 'string',
            }),
            defineField({
              name: 'publisher',
              title: 'Publisher',
              type: 'string',
            }),
            defineField({
              name: 'year',
              title: 'Year',
              type: 'number',
            }),
            defineField({
              name: 'isbn',
              title: 'ISBN',
              type: 'string',
            }),
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Required Textbook', value: 'required' },
                  { title: 'Recommended Reading', value: 'recommended' },
                  { title: 'Reference Material', value: 'reference' },
                  { title: 'Online Resource', value: 'online' },
                ],
              },
              initialValue: 'required',
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              description: 'Link to online resource or purchase page',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              authors: 'authors',
              type: 'type',
            },
            prepare({ title, authors, type }) {
              return {
                title,
                subtitle: `${authors || 'Unknown Author'} (${type || 'required'})`,
              }
            },
          },
        }),
      ],
    }),

    defineField({
      name: 'semesters',
      title: 'Semesters Taught',
      type: 'array',
      group: 'logistics',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'term',
              title: 'Term',
              type: 'string',
              options: {
                list: [
                  { title: 'Spring', value: 'spring' },
                  { title: 'Summer', value: 'summer' },
                  { title: 'Fall', value: 'fall' },
                  { title: 'Winter', value: 'winter' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'year',
              title: 'Year',
              type: 'number',
              validation: (Rule) => Rule.required().min(1900).max(new Date().getFullYear() + 5),
            }),
            defineField({
              name: 'enrollment',
              title: 'Enrollment',
              type: 'number',
              description: 'Number of students enrolled',
            }),
            defineField({
              name: 'schedule',
              title: 'Schedule',
              type: 'string',
              description: 'Days and times (e.g., MWF 10:00-10:50)',
            }),
            defineField({
              name: 'location',
              title: 'Location',
              type: 'string',
              description: 'Classroom or building',
            }),
            defineField({
              name: 'syllabusFile',
              title: 'Syllabus',
              type: 'file',
              description: 'Upload syllabus PDF',
              options: {
                accept: '.pdf',
              },
            }),
          ],
          preview: {
            select: {
              term: 'term',
              year: 'year',
              enrollment: 'enrollment',
            },
            prepare({ term, year, enrollment }) {
              const termLabel = term ? term.charAt(0).toUpperCase() + term.slice(1) : 'Unknown'
              const enrollmentText = enrollment ? ` (${enrollment} students)` : ''
              
              return {
                title: `${termLabel} ${year || 'Unknown Year'}`,
                subtitle: `Course offering${enrollmentText}`,
              }
            },
          },
        }),
      ],
      description: 'Semesters when this course was taught',
    }),

    defineField({
      name: 'gradingStructure',
      title: 'Grading Structure',
      type: 'array',
      group: 'logistics',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'component',
              title: 'Component',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'e.g., "Homework", "Midterm Exams", "Final Exam"',
            }),
            defineField({
              name: 'percentage',
              title: 'Percentage',
              type: 'number',
              validation: (Rule) => Rule.min(0).max(100),
              description: 'Percentage of total grade',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            }),
          ],
          preview: {
            select: {
              title: 'component',
              percentage: 'percentage',
            },
            prepare({ title, percentage }) {
              return {
                title,
                subtitle: percentage ? `${percentage}% of grade` : 'Grading component',
              }
            },
          },
        }),
      ],
    }),

    defineField({
      name: 'researchAreas',
      title: 'Related Research Areas',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'researchArea' }],
        }),
      ],
      description: 'Mathematical areas this course covers',
    }),

    defineField({
      name: 'courseWebsite',
      title: 'Course Website',
      type: 'url',
      group: 'logistics',
      description: 'Link to course website or LMS page',
    }),

    defineField({
      name: 'isCurrentlyTeaching',
      title: 'Currently Teaching',
      type: 'boolean',
      group: 'logistics',
      initialValue: false,
      description: 'Is this course currently being taught?',
    }),

    defineField({
      name: 'notes',
      title: 'Teaching Notes',
      type: 'text',
      group: 'logistics',
      rows: 4,
      description: 'Personal notes about teaching this course',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      courseNumber: 'courseNumber',
      level: 'level',
      credits: 'credits',
    },
    prepare({ title, courseNumber, level, credits }) {
      const courseCode = courseNumber ? `${courseNumber}: ` : ''
      const creditText = credits ? ` (${credits} credits)` : ''
      
      return {
        title: `${courseCode}${title}`,
        subtitle: `${level || 'Course'}${creditText}`,
      }
    },
  },

  orderings: [
    {
      title: 'Course Number',
      name: 'courseNumber',
      by: [{ field: 'courseNumber', direction: 'asc' }],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
    {
      title: 'Level',
      name: 'level',
      by: [
        { field: 'level', direction: 'asc' },
        { field: 'courseNumber', direction: 'asc' },
      ],
    },
    {
      title: 'Currently Teaching',
      name: 'current',
      by: [
        { field: 'isCurrentlyTeaching', direction: 'desc' },
        { field: 'courseNumber', direction: 'asc' },
      ],
    },
  ],
}) 