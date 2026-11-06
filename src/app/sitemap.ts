import type { MetadataRoute } from "next"

import { SITE_INFO } from "@/config/site"
import { getBlogPosts } from "@/features/doc/data/documents"

export const revalidate = false
export const dynamic = "force-static"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts: MetadataRoute.Sitemap = getBlogPosts().map((post) => ({
    url: `${SITE_INFO.url}/blog/${post.slug}`,
    lastModified: new Date(post.metadata.updatedAt).toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  const staticRoutes: {
    path: string
    priority: number
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
  }[] = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/blog", priority: 0.9, changeFrequency: "daily" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
    { path: "/timeline", priority: 0.7, changeFrequency: "monthly" },
    { path: "/testimonials", priority: 0.7, changeFrequency: "monthly" },
  ]

  const routes: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_INFO.url}${route.path}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  return [...routes, ...posts]
}
