/**
 * Functional programming utilities for Sanity schemas
 * Demonstrates clean, composable functions for data transformation and validation
 */

// Type definitions for better TypeScript support
type ValidationRule = (value: any) => boolean | string
type SchemaField = {
  name: string
  type: string
  validation?: (rule: any) => any
}

// Higher-order function for creating reusable validation rules
export const createValidationRule = (predicate: (value: any) => boolean, message: string): ValidationRule =>
  (value: any) => predicate(value) || message

// Common validation predicates
export const isNonEmptyString = (value: string): boolean => 
  typeof value === 'string' && value.trim().length > 0

export const isValidEmail = (value: string): boolean => 
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

export const isValidYear = (value: number): boolean => 
  Number.isInteger(value) && value >= 1900 && value <= new Date().getFullYear() + 10

export const isValidDOI = (value: string): boolean => 
  /^10\.\d{4,}\/\S+$/.test(value)

// Composed validation rules
export const validateTitle = createValidationRule(
  (value) => isNonEmptyString(value) && value.length >= 3 && value.length <= 200,
  'Title must be between 3 and 200 characters'
)

export const validateEmail = createValidationRule(
  isValidEmail,
  'Please enter a valid email address'
)

export const validatePublicationYear = createValidationRule(
  isValidYear,
  'Year must be between 1900 and 10 years in the future'
)

export const validateDOI = createValidationRule(
  isValidDOI,
  'DOI must be in format 10.xxxx/xxxxx'
)

// Functional slug generation
export const createSlugify = (options: {
  maxLength?: number
  separator?: string
  lowercase?: boolean
} = {}) => {
  const { maxLength = 96, separator = '-', lowercase = true } = options
  
  return (input: string): string => {
    const processed = lowercase ? input.toLowerCase() : input
    
    return processed
      .replace(/\s+/g, separator)
      .replace(/[^\w\-]+/g, '')
      .slice(0, maxLength)
  }
}

// Default slugify function
export const slugify = createSlugify()

// Functional composition for complex slug generation
export const createSlugFromTitleAndNumber = (title: string, number?: string): string => {
  const parts = [number, title].filter(Boolean)
  return slugify(parts.join(' '))
}

// Date formatting utilities using functional approach
export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString()
}

export const formatYear = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.getFullYear().toString()
}

export const createDateRange = (startDate?: string | Date, endDate?: string | Date, isCurrent = false): string => {
  if (!startDate) return ''
  
  const start = formatYear(startDate)
  
  if (isCurrent) return `${start}-present`
  if (!endDate) return start
  
  const end = formatYear(endDate)
  return start === end ? start : `${start}-${end}`
}

// Array manipulation utilities
export const groupBy = <T>(array: T[], keyFn: (item: T) => string): Record<string, T[]> =>
  array.reduce((groups, item) => {
    const key = keyFn(item)
    return {
      ...groups,
      [key]: [...(groups[key] || []), item]
    }
  }, {} as Record<string, T[]>)

export const sortBy = <T>(array: T[], keyFn: (item: T) => any, direction: 'asc' | 'desc' = 'asc'): T[] =>
  [...array].sort((a, b) => {
    const aVal = keyFn(a)
    const bVal = keyFn(b)
    
    if (aVal < bVal) return direction === 'asc' ? -1 : 1
    if (aVal > bVal) return direction === 'asc' ? 1 : -1
    return 0
  })

export const filterBy = <T>(predicate: (item: T) => boolean) => (array: T[]): T[] =>
  array.filter(predicate)

// Specific filters for academic content
export const filterPublished = filterBy((item: any) => item.status === 'published')
export const filterCurrent = filterBy((item: any) => item.isCurrent === true)
export const filterByYear = (year: number) => filterBy((item: any) => {
  const itemYear = item.year || (item.publishedAt && new Date(item.publishedAt).getFullYear())
  return itemYear === year
})

// Publication formatting utilities
export const formatAuthorsList = (authors: Array<{ name: string }>): string =>
  authors.map(author => author.name).join(', ')

export const formatCitation = (publication: {
  title: string
  authors: Array<{ name: string }>
  venue?: string
  year?: number
  pages?: string
}): string => {
  const { title, authors, venue, year, pages } = publication
  const authorsList = formatAuthorsList(authors)
  const yearStr = year ? ` (${year})` : ''
  const venueStr = venue ? `. ${venue}` : ''
  const pagesStr = pages ? `, ${pages}` : ''
  
  return `${authorsList}${yearStr}. "${title}"${venueStr}${pagesStr}.`
}

// Research area utilities
export const extractResearchAreaNames = (researchAreas: Array<{ name: string }>): string[] =>
  researchAreas.map(area => area.name)

export const createResearchAreaFilter = (areaName: string) => 
  (item: { researchAreas?: Array<{ name: string }> }): boolean =>
    item.researchAreas?.some(area => area.name === areaName) || false

// Schema field generators using functional approach
export const createTitleField = (options: {
  minLength?: number
  maxLength?: number
  required?: boolean
} = {}) => {
  const { minLength = 3, maxLength = 200, required = true } = options
  
  return {
    name: 'title',
    title: 'Title',
    type: 'string',
    validation: (Rule: any) => {
      let rule = Rule
      if (required) rule = rule.required()
      return rule.min(minLength).max(maxLength)
    }
  }
}

export const createSlugField = (source = 'title') => ({
  name: 'slug',
  title: 'Slug',
  type: 'slug',
  options: {
    source,
    maxLength: 96,
    slugify: slugify
  },
  validation: (Rule: any) => Rule.required()
})

export const createDateField = (name: string, title: string, description?: string) => ({
  name,
  title,
  type: 'date',
  ...(description && { description })
})

// Functional preview generators
export const createPreview = <T>(
  selectFields: Record<string, string>,
  prepareFn: (selected: T) => { title: string; subtitle?: string; media?: any }
) => ({
  select: selectFields,
  prepare: prepareFn
})

// Common preview configurations
export const createTitleSubtitlePreview = (titleField = 'title', subtitleField = 'description') =>
  createPreview(
    { title: titleField, subtitle: subtitleField },
    ({ title, subtitle }: any) => ({
      title,
      subtitle: subtitle ? subtitle.slice(0, 100) + (subtitle.length > 100 ? '...' : '') : undefined
    })
  )

// Pure function for calculating academic age
export const calculateAcademicAge = (phdDate: string | Date): number => {
  const phd = typeof phdDate === 'string' ? new Date(phdDate) : phdDate
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - phd.getTime())
  return Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25))
}

// Functional approach to status management
export const createStatusChecker = (validStatuses: string[]) => 
  (status: string): boolean => validStatuses.includes(status)

export const isActiveStatus = createStatusChecker(['active', 'current', 'published', 'ongoing'])
export const isCompletedStatus = createStatusChecker(['completed', 'published', 'finished'])

// Export a collection of utility functions for easy importing
export const schemaUtils = {
  validation: {
    validateTitle,
    validateEmail,
    validatePublicationYear,
    validateDOI,
    createValidationRule
  },
  text: {
    slugify,
    createSlugify,
    createSlugFromTitleAndNumber,
    formatDate,
    formatYear,
    createDateRange,
    formatAuthorsList,
    formatCitation
  },
  array: {
    groupBy,
    sortBy,
    filterBy,
    filterPublished,
    filterCurrent,
    filterByYear
  },
  schema: {
    createTitleField,
    createSlugField,
    createDateField,
    createPreview,
    createTitleSubtitlePreview
  },
  academic: {
    calculateAcademicAge,
    extractResearchAreaNames,
    createResearchAreaFilter,
    isActiveStatus,
    isCompletedStatus
  }
}

export default schemaUtils 