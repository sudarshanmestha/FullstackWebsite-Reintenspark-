import { getBlogPosts } from './Ai-Tools/utils'

export const baseUrl = 'https://portfolio-blog-starter.vercel.app'

export default async function sitemap() {
  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/Ai-Tools/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let routes = ['', '/Ai-Tools'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogs]
}
