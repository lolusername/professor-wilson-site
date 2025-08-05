/**
 * GROQ Queries for Math Professor Portfolio
 * Optimized queries following latest Sanity best practices
 */

import { defineQuery } from 'groq'

// Professor Profile - Singleton Query
export const PROFESSOR_PROFILE_QUERY = defineQuery(`
  *[_type == "professor"][0]{
    _id,
    fullName,
    displayName,
    titles[],
    profileImage{
      asset->{
        _id,
        url,
        metadata{
          dimensions,
          lqip
        }
      },
      alt,
      hotspot,
      crop
    },
    shortBio,
    fullBio[]{
      ...,
      _type == "block" => {
        ...,
        markDefs[]{
          ...,
          _type == "link" => {
            ...,
            href
          }
        }
      }
    },
    currentPosition,
    department,
    institution,
    officeLocation,
    email,
    phone,
    officeHours,
    socialLinks[]{
      platform,
      url
    },
    primaryResearchAreas[]->{
      _id,
      name,
      slug,
      description,
      color
    },
    cvFile{
      asset->{
        _id,
        url,
        originalFilename,
        size
      }
    }
  }
`)

// Featured Research Projects
export const FEATURED_RESEARCH_QUERY = defineQuery(`
  *[_type == "research" && featured == true && status in ["active", "completed", "published"]]
  | order(startDate desc)
  [0...3]{
    _id,
    title,
    slug,
    abstract,
    status,
    startDate,
    researchAreas[]->{
      name,
      color
    },
    "imageUrl": description[_type == "image"][0].asset->url
  }
`)

// Recent Publications
export const RECENT_PUBLICATIONS_QUERY = defineQuery(`
  *[_type == "publication" && status == "published"]
  | order(year desc, publishedDate desc)
  [0...5]{
    _id,
    title,
    slug,
    authors[]{
      name,
      affiliation
    },
    type,
    venue,
    year,
    doi,
    arxivId,
    abstract,
    researchAreas[]->{
      name,
      color
    }
  }
`)

// Recent Blog Posts
export const RECENT_BLOG_POSTS_QUERY = defineQuery(`
  *[_type == "blogPost" && status == "published"]
  | order(publishedAt desc)
  [0...3]{
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    featuredImage{
      asset->{
        _id,
        url,
        metadata{
          dimensions,
          lqip
        }
      },
      alt
    },
    categories[],
    tags[]
  }
`)

// Current Courses
export const CURRENT_COURSES_QUERY = defineQuery(`
  *[_type == "course" && isCurrentlyTeaching == true]
  | order(courseNumber asc){
    _id,
    title,
    courseNumber,
    slug,
    level,
    credits,
    description,
    courseWebsite,
    semesters[]{
      term,
      year,
      schedule,
      location
    } | order(year desc, term desc)[0]
  }
`)

// Research Areas (for navigation/filtering)
export const RESEARCH_AREAS_QUERY = defineQuery(`
  *[_type == "researchArea"]
  | order(name asc){
    _id,
    name,
    slug,
    description,
    color,
    mscClassification,
    "publicationCount": count(*[_type == "publication" && references(^._id)]),
    "researchCount": count(*[_type == "research" && references(^._id)])
  }
`)

// Single Research Project
export const RESEARCH_PROJECT_QUERY = defineQuery(`
  *[_type == "research" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    abstract,
    description[]{
      ...,
      _type == "image" => {
        ...,
        asset->{
          _id,
          url,
          metadata{
            dimensions,
            lqip
          }
        }
      }
    },
    status,
    startDate,
    expectedCompletion,
    completionDate,
    researchAreas[]->{
      _id,
      name,
      slug,
      color
    },
    collaborators[]{
      name,
      affiliation,
      role,
      email
    },
    fundingSource,
    grantNumber,
    relatedPublications[]->{
      _id,
      title,
      slug,
      type,
      year,
      venue
    },
    keywords[]
  }
`)

// Single Publication
export const PUBLICATION_QUERY = defineQuery(`
  *[_type == "publication" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    type,
    authors[]{
      name,
      affiliation,
      isCorresponding,
      orcid
    },
    abstract,
    venue,
    volume,
    issue,
    pages,
    publishedDate,
    year,
    doi,
    isbn,
    arxivId,
    status,
    pdfFile{
      asset->{
        _id,
        url,
        originalFilename
      }
    },
    externalLinks[]{
      label,
      url
    },
    researchAreas[]->{
      _id,
      name,
      slug,
      color
    },
    keywords[],
    relatedResearch[]->{
      _id,
      title,
      slug,
      status
    },
    citationCount
  }
`)

// Single Blog Post
export const BLOG_POST_QUERY = defineQuery(`
  *[_type == "blogPost" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    excerpt,
    featuredImage{
      asset->{
        _id,
        url,
        metadata{
          dimensions,
          lqip
        }
      },
      alt,
      caption
    },
    content[]{
      ...,
      _type == "image" => {
        ...,
        asset->{
          _id,
          url,
          metadata{
            dimensions,
            lqip
          }
        }
      },
      _type == "codeBlock" => {
        ...,
        code,
        language,
        filename
      },
      _type == "mathBlock" => {
        ...,
        latex,
        caption
      }
    },
    publishedAt,
    status,
    categories[],
    tags[],
    relatedPosts[]->{
      _id,
      title,
      slug,
      excerpt,
      publishedAt
    },
    relatedResearch[]->{
      _id,
      title,
      slug,
      _type
    },
    seoTitle,
    seoDescription,
    seoKeywords[]
  }
`)

// CV Entries by Category
export const CV_ENTRIES_QUERY = defineQuery(`
  *[_type == "cvEntry" && isHidden != true]
  | order(category asc, sortOrder asc, startDate desc){
    _id,
    title,
    category,
    institution,
    location,
    startDate,
    endDate,
    isCurrent,
    description[]{
      ...,
      _type == "block" => {
        ...,
        markDefs[]{
          ...,
          _type == "link" => {
            ...,
            href
          }
        }
      }
    },
    details[]{
      label,
      value
    },
    amount,
    grantNumber,
    coInvestigators[],
    degreeType,
    fieldOfStudy,
    thesisTitle,
    advisor,
    url,
    tags[]
  }
`)

// Course Details
export const COURSE_QUERY = defineQuery(`
  *[_type == "course" && slug.current == $slug][0]{
    _id,
    title,
    courseNumber,
    slug,
    level,
    credits,
    description,
    prerequisites[],
    learningObjectives[]{
      ...,
      _type == "block" => {
        ...
      }
    },
    topics[]{
      title,
      description,
      weekNumber
    } | order(weekNumber asc),
    textbooks[]{
      title,
      authors,
      edition,
      publisher,
      year,
      isbn,
      type,
      url
    },
    semesters[]{
      term,
      year,
      enrollment,
      schedule,
      location,
      syllabusFile{
        asset->{
          _id,
          url,
          originalFilename
        }
      }
    } | order(year desc, term desc),
    gradingStructure[]{
      component,
      percentage,
      description
    },
    researchAreas[]->{
      _id,
      name,
      color
    },
    courseWebsite,
    isCurrentlyTeaching,
    notes
  }
`)

// Search query for global search
export const SEARCH_QUERY = defineQuery(`
  *[_type in ["research", "publication", "blogPost", "course"] && 
    (title match $searchTerm + "*" || 
     abstract match $searchTerm + "*" || 
     description match $searchTerm + "*" ||
     keywords[] match $searchTerm + "*")]
  | order(_score desc)
  [0...20]{
    _id,
    _type,
    title,
    slug,
    "preview": select(
      _type == "research" => abstract,
      _type == "publication" => abstract,
      _type == "blogPost" => excerpt,
      _type == "course" => description
    ),
    "date": select(
      _type == "research" => startDate,
      _type == "publication" => coalesce(publishedDate, year + "-01-01"),
      _type == "blogPost" => publishedAt,
      _type == "course" => null
    )
  }
`)

// Export all queries for easy importing
export const queries = {
  professor: PROFESSOR_PROFILE_QUERY,
  featuredResearch: FEATURED_RESEARCH_QUERY,
  recentPublications: RECENT_PUBLICATIONS_QUERY,
  recentBlogPosts: RECENT_BLOG_POSTS_QUERY,
  currentCourses: CURRENT_COURSES_QUERY,
  researchAreas: RESEARCH_AREAS_QUERY,
  researchProject: RESEARCH_PROJECT_QUERY,
  publication: PUBLICATION_QUERY,
  blogPost: BLOG_POST_QUERY,
  cvEntries: CV_ENTRIES_QUERY,
  course: COURSE_QUERY,
  search: SEARCH_QUERY,
}

export default queries 