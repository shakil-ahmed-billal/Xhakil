import { SITE_INFO } from "@/config/site"
import { markdownResponse } from "@/lib/markdown-response"
import { getBlogPosts } from "@/features/doc/data/documents"
import { USER } from "@/features/portfolio/data/user"

const allPosts = getBlogPosts()

const content = `# ${USER.displayName}

> ${SITE_INFO.description}

- [About](${SITE_INFO.url}/about.md): A quick intro to me, my tech stack, and how to connect.
- [Experience](${SITE_INFO.url}/experience.md): Highlights from my career and key roles I've taken on.
- [Education](${SITE_INFO.url}/education.md): Where I studied, what I focused on, and what I built along the way.
- [Projects](${SITE_INFO.url}/projects.md): Selected projects that show my skills and creativity.
- [Blog](${SITE_INFO.url}/blog.md): Every blog post, newest first, with publish dates.

## Blog

${allPosts.map((item) => `- [${item.metadata.title}](${SITE_INFO.url}/blog/${item.slug}.md): ${item.metadata.description}`).join("\n")}

## Optional

- [Contact](${SITE_INFO.url}/contact): Direct communication and contact details.
- [Timeline](${SITE_INFO.url}/timeline): Career milestones and personal timeline.
- [Testimonials](${SITE_INFO.url}/testimonials): Client reviews and feedback.
- [RSS Feed](${SITE_INFO.url}/blog/rss): RSS feed of all published articles.
`

export const revalidate = false
export const dynamic = "force-static"

export async function GET() {
  return markdownResponse(content, { negotiated: true })
}
