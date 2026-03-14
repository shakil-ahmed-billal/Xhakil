import { getAllDocs } from "@/features/doc/data/documents"
import { getLLMText } from "@/features/doc/lib/get-llm-text"
import { CERTIFICATIONS } from "@/features/portfolio/data/certifications"
import { EXPERIENCES } from "@/features/portfolio/data/experiences"
import { PROJECTS } from "@/features/portfolio/data/projects"
import { SOCIAL_LINKS } from "@/features/portfolio/data/social-links"
import { TECH_STACK } from "@/features/portfolio/data/tech-stack"
import { USER } from "@/features/portfolio/data/user"

const allPosts = getAllDocs()

async function getBlogContent() {
  const posts = allPosts.filter(
    (post) => post.metadata?.category !== "components"
  )
  const blogTexts = await Promise.all(
    posts.map(async (post) => {
      const skills = post.metadata.category
        ? `\n\nSkills: ${post.metadata.category}`
        : ""
      const contentText = await getLLMText(post)
      return `### ${post.metadata.title}\n\nURL: ${SITE_INFO.url}/blog/${post.slug}${skills}\n\n${contentText.trim()}`
    })
  )
  return blogTexts.join("\n\n")
}

const aboutText = `## About

${USER.about.trim()}

### Personal Information

- First Name: ${USER.firstName}
- Last Name: ${USER.lastName}
- Display Name: ${USER.displayName}
- Location: ${USER.address}
- Website: ${USER.website}

### Social Links

${SOCIAL_LINKS.map((item) => `- [${item.title}](${item.href})`).join("\n")}

### Tech Stack

${TECH_STACK.map((item) => `- [${item.title}](${item.href})`).join("\n")}\n`

const experienceText = `## Experience

${EXPERIENCES.map((item) =>
  item.positions
    .map((position) => {
      const skills = position.skills?.map((skill) => skill).join(", ") || "N/A"
      return `### ${position.title} | ${item.companyName}\n\nDuration: ${position.employmentPeriod.start} - ${position.employmentPeriod.end || "Present"}\n\nSkills: ${skills}\n\n${position.description?.trim()}`
    })
    .join("\n\n")
).join("\n\n")}
`

const projectsText = `## Projects

${PROJECTS.map((item) => {
  const skills = `\n\nSkills: ${item.skills.join(", ")}`
  const description = item.description ? `\n\n${item.description.trim()}` : ""
  return `### ${item.title}\n\nProject URL: ${item.link}${skills}${description}`
}).join("\n\n")}
`

const certificationsText = `## Certifications

${CERTIFICATIONS.map((item) => `- [${item.title}](${item.credentialURL})`).join("\n")}`

import { SITE_INFO } from "@/config/site"

async function getContent() {
  const blogContent = await getBlogContent()
  return `<SYSTEM>This document contains comprehensive information about ${USER.displayName}'s professional profile, portfolio, and blog content. It includes personal details, work experience, projects, achievements, certifications, and all published blog posts. This data is formatted for consumption by Large Language Models (LLMs) to provide accurate and up-to-date information about ${USER.displayName}'s background, skills, and expertise as a Design Engineer.</SYSTEM>

# xhakil.vercel.app

> A minimal, pixel-perfect dev portfolio, shadcn registry, and blog to showcase my work as a Design Engineer.

${aboutText}
${experienceText}
${projectsText}
${certificationsText}

## Blog

${blogContent}`
}

export const revalidate = false
export const dynamic = "force-static"

export async function GET() {
  return new Response(await getContent(), {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  })
}
