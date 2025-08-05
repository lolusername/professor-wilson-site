import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Type definitions for academic content
interface Author {
  name: string
  affiliation?: string
}

interface Publication {
  title: string
  authors?: Author[]
  venue?: string
  year?: number
  pages?: string
}

// Sanity client composable
export const useSanityClient = () => {
  const config = useRuntimeConfig()
  
  const client = createClient({
    projectId: config.public.sanityProjectId,
    dataset: config.public.sanityDataset,
    apiVersion: config.public.sanityApiVersion,
    useCdn: true,
    stega: false,
  })

  return client
}

// Image URL builder composable
export const useSanityImage = () => {
  const client = useSanityClient()
  const builder = imageUrlBuilder(client)

  const urlFor = (source: SanityImageSource) => {
    return builder.image(source)
  }

  return { urlFor }
}

// Optimized image URL helper
export const useSanityImageUrl = (
  source: SanityImageSource | undefined | null,
  options: {
    width?: number
    height?: number
    quality?: number
    format?: 'webp' | 'jpg' | 'png'
    fit?: 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'clip' | 'min'
  } = {}
) => {
  const { urlFor } = useSanityImage()
  
  if (!source) return null

  const {
    width = 800,
    height,
    quality = 80,
    format = 'webp',
    fit = 'fill'
  } = options

  let imageUrl = urlFor(source)
    .width(width)
    .quality(quality)
    .format(format)
    .fit(fit)

  if (height) {
    imageUrl = imageUrl.height(height)
  }

  return imageUrl.url()
}

// GROQ query helper with caching
export const useSanityQuery = async <T = unknown>(
  query: string,
  params: Record<string, unknown> = {}
) => {
  const client = useSanityClient()
  
  // Create unique cache key
  const key = `sanity:${JSON.stringify({ query, params })}`
  
  return await useAsyncData<T>(key, async () => {
    try {
      const result = await client.fetch<T>(query, params)
      return result
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch data from Sanity',
        data: error
      })
    }
  }, {
    server: true,
    client: true,
    default: () => null as T | null,
  })
}

// Academic citation formatter
export const useAcademicCitation = () => {
  const formatCitation = (publication: Publication, style: 'apa' | 'mla' | 'chicago' = 'apa') => {
    if (!publication) return ''

    const { title, authors, venue, year, pages } = publication
    const authorsList = authors?.map((author: Author) => author.name).join(', ') || 'Unknown Author'

    switch (style) {
      case 'apa':
        return `${authorsList} (${year || 'n.d.'}). ${title}. ${venue ? `${venue}.` : ''} ${pages ? `pp. ${pages}.` : ''}`
      
      case 'mla':
        return `${authorsList}. "${title}." ${venue ? `${venue}, ` : ''}${year || 'n.d.'}.${pages ? ` ${pages}.` : ''}`
      
      case 'chicago':
        return `${authorsList}. "${title}." ${venue ? `${venue} ` : ''}${year ? `(${year})` : ''}.${pages ? ` ${pages}.` : ''}`
      
      default:
        return `${authorsList}. ${title}. ${venue || ''} ${year || ''}.`
    }
  }

  return { formatCitation }
} 