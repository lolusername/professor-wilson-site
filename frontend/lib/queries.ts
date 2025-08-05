// GROQ queries for fetching content from Sanity
export const defineQuery = (query: string) => query

// Professor profile query
export const professorQuery = defineQuery(`
  *[_type == "professor"][0] {
    _id,
    "name": fullName,
    "title": title,
    "bio": shortBio,
    email,
    phone,
    office,
    website,
    "image": profileImage.asset->url,
    "imageAlt": profileImage.alt,
    socialLinks[] {
      platform,
      url
    },
    researchAreas[]-> {
      _id,
      name,
      description
    }
  }
`)

// Research areas query
export const researchAreasQuery = defineQuery(`
  *[_type == "researchArea"] {
    _id,
    name,
    description,
    "image": image.asset->url
  }
`)

// Publications query
export const publicationsQuery = defineQuery(`
  *[_type == "publication"] | order(publishedAt desc) {
    _id,
    title,
    authors,
    journal,
    year,
    doi,
    abstract,
    "pdf": pdf.asset->url,
    researchAreas[]-> {
      _id,
      name
    }
  }
`)

// Blog posts query
export const blogPostsQuery = defineQuery(`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    "image": image.asset->url,
    publishedAt,
    content,
    tags
  }
`)

// CV entries query
export const cvEntriesQuery = defineQuery(`
  *[_type == "cvEntry"] | order(startDate desc) {
    _id,
    type,
    title,
    organization,
    location,
    startDate,
    endDate,
    description,
    "image": image.asset->url
  }
`)

// Research projects query
export const researchProjectsQuery = defineQuery(`
  *[_type == "research"] | order(startDate desc) {
    _id,
    title,
    description,
    startDate,
    endDate,
    status,
    funding,
    collaborators,
    "image": image.asset->url,
    researchAreas[]-> {
      _id,
      name
    }
  }
`)

// Courses query
export const coursesQuery = defineQuery(`
  *[_type == "course"] | order(year desc, semester asc) {
    _id,
    code,
    title,
    description,
    semester,
    year,
    credits,
    "image": image.asset->url
  }
`) 