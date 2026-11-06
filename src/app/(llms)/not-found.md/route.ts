import { SITE_INFO } from "@/config/site"
import { markdownResponse } from "@/lib/markdown-response"

const content = `# Page not found

The page you requested does not exist on ${new URL(SITE_INFO.url).host}. It may have been moved, renamed, or removed.

- [llms.txt](${SITE_INFO.url}/llms.txt): Index of every page, available as Markdown.
- [Sitemap](${SITE_INFO.url}/sitemap.xml): Every public URL on the site.
- [Home](${SITE_INFO.url}/): Start from the home page.
`

export async function GET() {
  return markdownResponse(content, { status: 404, negotiated: true })
}
