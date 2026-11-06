import { SiteMark } from "@/components/site-mark"

import type { Project } from "../types/projects"

export const PROJECTS: Project[] = [
  {
    id: "pms",
    title: "PMS Public — Project & Task Management Platform",
    period: {
      start: "01.2025",
    },
    link: "https://pms-tau-ten.vercel.app",
    skills: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JavaScript",
      "REST APIs",
    ],
    description: `Developed a role-based project management system for Leaders and Members with task tracking and activity analytics.
- Implemented secure authentication, project dashboards, and optimized REST APIs
- Focused on scalability, modular backend design, and clean architecture principles
`,
    isExpanded: true,
  },
  {
    id: "softynix",
    title: "Softynix — Digital Product E-commerce Platform",
    period: {
      start: "01.2025",
    },
    link: "https://softynix.vercel.app",
    skills: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma ORM",
      "React",
      "Tailwind CSS",
      "shadcn/ui",
    ],
    description: `Built a scalable e-commerce platform with secure authentication, product, order, review, and admin management.
- Integrated JWT authentication and Zod validation
- Cloudinary image management and automated notifications
`,
  },
  {
    id: "quickhire",
    title: "QuickHire — Job Recruitment Portal",
    period: {
      start: "06.2024",
    },
    link: "https://quickhire-bd.vercel.app",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "REST APIs"],
    description: `Built a modern recruitment platform connecting job seekers with hiring companies.
- Advanced search and filtering by skills, roles, and locations
- Responsive applicant tracking system with streamlined application workflows
`,
  },
  {
    id: "zentask",
    title: "Zentask — Minimalist Productivity Tool",
    period: {
      start: "03.2024",
    },
    link: "https://zentask-bd.vercel.app",
    skills: ["React", "TypeScript", "Tailwind CSS", "Zustand"],
    description: `A fast and minimalist task management app designed for developer daily workflows and sprint focus.
- Keyboard-first interaction and sub-second task filtering
- Clean local persistence and drag-and-drop task boards
`,
  },
  {
    id: "zapcash",
    title: "ZapCash — Mobile Financial Service (MFS)",
    period: {
      start: "01.2024",
    },
    link: "#",
    skills: ["Node.js", "Express.js", "MongoDB", "JavaScript", "JWT"],
    description: `Developed a digital financial service platform inspired by bKash and Nagad.
- Implemented secure user authentication and transaction workflows
- Focused on API reliability, data security, and backend scalability
`,
  },
  {
    id: "xhakildotcom",
    title: "www.xhakil.site",
    period: {
      start: "01.2025",
    },
    link: "https://www.xhakil.site",
    skills: [
      "Open Source",
      "Next.js 16",
      "Tailwind CSS v4",
      "Radix UI",
      "Base UI",
      "Motion",
      "shadcn/ui",
      "shadcn registry",
      "Vercel",
    ],
    description: "A pixel-perfect dev portfolio and shadcn registry.",
    icon: <SiteMark className="size-4" />,
  },
]
