'use server'

import type { Metadata } from 'next'

import { apiRequest } from '@/app/actions/api'

export const getPageMetadata = async (page: string): Promise<Metadata> => {
  try {
    const data: any = await apiRequest(`metatags/${page}`, {
      method: 'GET',
    })

    if (!data || data.code) return {}

    return {
      title: data.title || '',
      description: data.description || '',
      keywords: data.keywords || '',

      ...(data.openGraph && {
        openGraph: {
          title: data.openGraph.title || data.title,
          description: data.openGraph.description || data.description,
          type: data.openGraph.type || 'website',
          url: data.openGraph.url,
          images: data.openGraph.image ? [data.openGraph.image] : [],
        },
      }),

      ...(data.twitter && {
        twitter: {
          card: data.twitter.card || 'summary_large_image',
          title: data.twitter.title,
          description: data.twitter.description,
          site: data.twitter.site,
          creator: data.twitter.creator,
          images: data.twitter.image ? data.twitter.image : [],
        },
      }),
    }
  } catch (error) {
    console.error(`Error metadata: ${page}:`, error)
    return {}
  }
}
