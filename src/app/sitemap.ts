import type { MetadataRoute } from "next"

import { SITE_INFO } from "@/config/site"
import { getAllDocs } from "@/features/doc/data/documents"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_INFO.url.endsWith("/")
    ? SITE_INFO.url.slice(0, -1)
    : SITE_INFO.url

  const routes = [""].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }))

  const allPosts = getAllDocs()

  const posts = allPosts.map((post) => {
    const isComponent = post.metadata.category === "components"
    const route = isComponent ? `/components/${post.slug}` : `/blog/${post.slug}`

    return {
      url: `${baseUrl}${route}`,
      lastModified: new Date(
        post.metadata.updatedAt || post.metadata.createdAt
      ).toISOString(),
    }
  })

  return [
    ...routes,
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString(),
    },
    ...posts,
  ]
}
