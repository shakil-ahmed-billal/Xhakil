import type { Project } from "../types/projects"

export const PROJECTS: Project[] = [
  {
    id: "pms",
    title: "PMS Public — Project & Task Management Platform",
    period: {
      start: "01.2025",
    },
    link: "https://pms-tau-ten.vercel.app", // Keeping original link assuming it is related to "PMS Public"
    skills: ["Node.js", "Express.js", "MongoDB", "Mongoose", "JavaScript"],
    description:
      "Developed a role-based project management system for Leaders and Members with task tracking and activity analytics. Implemented secure authentication, project dashboards, and optimized REST APIs. Focused on scalability, modular backend design, and clean architecture principles.",
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
      "Shadcn UI",
    ],
    description:
      "Built a scalable e-commerce platform with secure authentication, product, order, review, and admin management. Integrated JWT authentication, Zod validation, Cloudinary image management, and Email/WhatsApp notifications.",
  },
  {
    id: "zapcash",
    title: "ZapCash — Mobile Financial Service (MFS)",
    period: {
      start: "01.2025",
    },
    link: "#", // Add your link here
    skills: ["Node.js", "Express.js", "MongoDB", "JavaScript", "JWT"],
    description:
      "Developed a digital financial service platform inspired by bKash and Nagad. Implemented secure user authentication and transaction workflows. Focused on API reliability, data security, and backend scalability.",
  },
]
