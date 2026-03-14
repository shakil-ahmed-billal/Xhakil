import type { MetadataRoute } from "next"

import { SITE_INFO } from "@/config/site"
import { getAllDocs } from "@/features/doc/data/documents"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [""].map((route) => ({
    url: `${SITE_INFO.url}${route}`,
    lastModified: new Date().toISOString(),
  }))

  const allPosts = getAllDocs()

  const posts = allPosts.map((post) => ({
    url: `${SITE_INFO.url}/blog/${post.slug}`,
    lastModified: new Date(
      post.metadata.updatedAt || post.metadata.createdAt
    ).toISOString(),
  }))

  return [
    ...routes,
    {
      url: `${SITE_INFO.url}/blog`,
      lastModified: new Date().toISOString(),
    },
    ...posts,
  ]
}
