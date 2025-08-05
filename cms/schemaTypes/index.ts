import { professorType } from './professorType'
import { researchType } from './researchType'
import { publicationType } from './publicationType'
import { blogPostType } from './blogPostType'
import { cvEntryType } from './cvEntryType'
import { researchAreaType } from './researchAreaType'
import { courseType } from './courseType'

export const schemaTypes = [
  // Main profile
  professorType,
  
  // Academic content
  researchType,
  publicationType,
  cvEntryType,
  courseType,
  
  // Blog content
  blogPostType,
  
  // Taxonomy
  researchAreaType,
]
