import { USER } from "@/features/portfolio/data/user"
import type { NavItem } from "@/types/nav"

function getSiteUrl() {
  if (process.env.APP_URL) return process.env.APP_URL
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  return "https://xhakil.vercel.app"
}

export const SITE_INFO = {
  name: USER.displayName,
  url: getSiteUrl(),
  ogImage: USER.ogImage,
  description: USER.bio,
  keywords: USER.keywords,
}

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
}

export const MAIN_NAV: NavItem[] = [
  {
    title: "Projects",
    href: "/#projects",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Contact",
    href: "/contact",
  },
]

export const X_USERNAME = "@shakil.dev99"
export const GITHUB_USERNAME = "shakil-ahmed-billal"
export const SOURCE_CODE_GITHUB_REPO = "shakil-ahmed-billal/xhakil"
export const SOURCE_CODE_GITHUB_URL =
  "https://github.com/shakil-ahmed-billal/xhakil"

export const UTM_PARAMS = {
  utm_source: "xhakil.vercel.app",
}
