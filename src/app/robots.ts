import type { MetadataRoute } from "next";
import { SITE_INFO } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_INFO.url.endsWith("/")
    ? SITE_INFO.url.slice(0, -1)
    : SITE_INFO.url

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}