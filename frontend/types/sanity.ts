// TypeScript interfaces for Sanity schema types

export interface Professor {
  _id: string
  name: string
  title: string
  bio: string
  email: string
  phone?: string
  office?: string
  website?: string
  image?: string
  imageAlt?: string
  socialLinks?: SocialLink[]
  researchAreas?: ResearchArea[]
}

export interface ResearchArea {
  _id: string
  name: string
  description: string
  image?: string
}

export interface Publication {
  _id: string
  title: string
  authors: string[]
  journal: string
  year: number
  doi?: string
  abstract: string
  pdf?: string
  researchAreas?: ResearchArea[]
}

export interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  image?: string
  publishedAt: string
  content: any // Portable Text
  tags: string[]
}

export interface CVEntry {
  _id: string
  type: 'education' | 'experience' | 'award' | 'publication'
  title: string
  organization: string
  location?: string
  startDate: string
  endDate?: string
  description?: string
  image?: string
}

export interface Research {
  _id: string
  title: string
  description: string
  startDate: string
  endDate?: string
  status: 'active' | 'completed' | 'planned'
  funding?: string
  collaborators?: string[]
  image?: string
  researchAreas?: ResearchArea[]
}

export interface Course {
  _id: string
  code: string
  title: string
  description: string
  semester: 'fall' | 'spring' | 'summer'
  year: number
  credits: number
  image?: string
}

export interface SocialLink {
  platform: string
  url: string
}

// Query result types
export interface ProfessorQueryResult {
  data: Professor | null
  error?: string
}

export interface ResearchAreasQueryResult {
  data: ResearchArea[]
  error?: string
}

export interface PublicationsQueryResult {
  data: Publication[]
  error?: string
}

export interface BlogPostsQueryResult {
  data: BlogPost[]
  error?: string
}

export interface CVEntriesQueryResult {
  data: CVEntry[]
  error?: string
}

export interface ResearchProjectsQueryResult {
  data: Research[]
  error?: string
}

export interface CoursesQueryResult {
  data: Course[]
  error?: string
} 