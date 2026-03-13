import type { Experience } from "../types/experiences"

export const EXPERIENCES: Experience[] = [
  {
  "id": "softvence",
  "companyName": "Softvence agency",
  "companyLogo": "https://assets.chanhdai.com/images/companies/shadcraft.svg?v=2",
  "companyWebsite": "https://shadcraft.com",
  "positions": [
    {
      "id": "1",
      "title": "Frontend Developer",
      "employmentPeriod": {
        "start": "01.2025"
      },
      "employmentType": "Full-time",
      "icon": "code",
      "description": "- Work on the registry and React component library.\n- Design and build Pro application components and blocks, from Figma to production-ready React.",
      "skills": [
        "TypeScript",
        "Next.js",
        "Tailwind CSS",
        "shadcn/registry",
        "Figma"
      ],
      "isExpanded": true
    },
    {
      "id": "2",
      "title": "Team Leader",
      "employmentPeriod": {
        "start": "04.2026"
      },
      "employmentType": "Full-time",
      "description": "- Lead a team of front-end developers to deliver high-quality projects.\n- Collaborated with backend engineers and product teams to deliver production-ready features.\n- Developed scalable, responsive web applications using React and Next.js.\n- Converted Figma designs into pixel-perfect, accessible user interfaces.\n- Integrated RESTful APIs and optimized client-side data fetching.\n- Improved performance through lazy loading, code splitting, and caching strategies.",
      "skills": [
        "Leadership",
        "Project Management",
        "Team Coordination",
        "React",
        "Next.js",
        "Figma",
        "API Integration",
        "Performance Optimization"
      ],
      "isExpanded": false
    }
  ],
  "isCurrentEmployer": true
}
]
