import { SITE_INFO } from "@/config/site"

export { cn } from "cn"

export function absoluteUrl(path: string) {
  const base =
    SITE_INFO?.url ||
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.APP_URL ||
    "https://www.xhakil.site"
  const cleanPath = path.startsWith("/") ? path : `/${path}`
  return `${base.replace(/\/$/, "")}${cleanPath}`
}
