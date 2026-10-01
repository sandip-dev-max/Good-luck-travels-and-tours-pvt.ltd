import type { MetadataRoute } from 'next'
import { destinations, posts, tours } from '@/data/site'

const base = 'https://goodluckintl.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['/', '/about', '/contact', '/destinations', '/tours', '/flights', '/hotels', '/visa', '/blog', '/privacy', '/terms']
  const detail = [
    ...destinations.map((d) => `/destinations/${d.slug}`),
    ...tours.map((t) => `/tours/${t.slug}`),
    ...posts.map((p) => `/blog/${p.slug}`),
  ]
  return [...pages, ...detail].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : pages.includes(route) ? 0.7 : 0.6,
  }))
}
