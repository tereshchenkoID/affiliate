import { routing } from '@/i18n/routing'

interface Sitemap {
  url: string
  lastModified: Date,
  changeFrequency: 'daily' | 'weekly'
  priority: 1.0 | 0.8
}

export default async function sitemap() {
  const baseUrl = process.env.BASE_URL
  const locales = routing.locales

  const staticPages: string[] = [
    '',
  ]

  const routes: Array<Sitemap> = []

  locales.forEach((locale) => {
    staticPages.forEach((page) => {
      routes.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1.0 : 0.8,
      })
    })
  })

  return routes
}
