import type { MetadataRoute } from "next"

import { SITE_INFO } from "@/config/site"
import { getAllDocs } from "@/features/doc/data/documents"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_INFO.url.endsWith("/")
    ? SITE_INFO.url.slice(0, -1)
    : SITE_INFO.url

  const now = new Date().toISOString()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ]

  const allDocs = getAllDocs()

  const docRoutes: MetadataRoute.Sitemap = allDocs.map((doc) => {
    const isComponent = doc.metadata.category === "components"
    const path = isComponent
      ? `/components/${doc.slug}`
      : `/blog/${doc.slug}`

    const dateStr = doc.metadata.updatedAt || doc.metadata.createdAt
    const lastModified = dateStr ? new Date(dateStr) : new Date()

    return {
      url: `${baseUrl}${path}`,
      lastModified: isNaN(lastModified.getTime()) ? now : lastModified.toISOString(),
      changeFrequency: "monthly",
      priority: 0.8,
    }
  })

  return [...staticRoutes, ...docRoutes]
}
