import { BriefcaseBusinessIcon, CodeXmlIcon, LightbulbIcon } from "lucide-react"

import type { Experience } from "@/features/portfolio/types/experiences"

export const EXPERIENCES: Experience[] = [
  {
    id: "naxtbrand",
    companyName: "NaxtBrand",
    companyLogo: "/experience/naxtbrand.webp",
    companyWebsite: "https://naxtbrand.com",
    location: "Dhaka, Bangladesh",
    locationType: "Hybrid",
    positions: [
      {
        id: "1",
        title: "Founder & Lead Engineer",
        employmentPeriod: {
          start: "10.2026",
        },
        employmentType: "Self-employed",
        icon: <BriefcaseBusinessIcon />,
        description: `- Leads NaxtBrand's technical vision, software architecture, web development, and engineering operations.
- Directs end-to-end full-stack development, modern UI systems, and robust web applications.
- Drives product roadmaps, technical execution, and performance optimization for client and internal solutions.`,
        skills: [
          "Technical Vision",
          "Software Architecture",
          "Web Development",
          "Engineering Operations",
        ],
        isExpanded: true,
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "softvence",
    companyName: "Softvence",
    companyLogo: "/experience/softvence.webp",
    companyWebsite: "https://softvence.agency",
    location: "Dhaka, Bangladesh",
    locationType: "On-site",
    positions: [
      {
        id: "2",
        title: "Team Leader",
        employmentPeriod: {
          start: "01.2026",
          end: "09.2026",
        },
        employmentType: "Full-time",
        icon: <BriefcaseBusinessIcon />,
        description: `- Overseeing the development team and managing project timelines.
- Mentoring junior and mid-level developers to enhance code quality and best practices.
- Coordinating between stakeholders and the technical team to ensure smooth feature delivery.
- Driving technical architecture decisions and code review processes.`,
        skills: [
          "Team Leadership",
          "Project Management",
          "Code Review",
          "Mentoring",
        ],
        isExpanded: true,
      },
      {
        id: "1",
        title: "Front-End Developer",
        employmentPeriod: {
          start: "04.2025",
          end: "01.2026",
        },
        employmentType: "Full-time",
        icon: <CodeXmlIcon />,
        description: `- Developed scalable, responsive web applications using React and Next.js.
- Converted Figma designs into pixel-perfect, accessible user interfaces.
- Integrated RESTful APIs and optimized client-side data fetching.
- Improved performance through lazy loading, code splitting, and caching strategies.
- Collaborated with backend engineers and product teams to deliver production-ready features.`,
        skills: ["React", "Next.js", "Figma", "REST API", "Optimization"],
        isExpanded: false,
      },
    ],
    isCurrentEmployer: false,
  },
  {
    id: "qwik-it",
    companyName: "Qwik IT Services",
    companyLogo: "/experience/qwikit.webp",
    companyWebsite: "https://www.qwikit.ca",
    location: "Remote",
    locationType: "Remote",
    positions: [
      {
        id: "1",
        title: "Frontend Developer Intern",
        employmentPeriod: {
          start: "03.2025",
          end: "04.2025",
        },
        employmentType: "Internship",
        icon: <CodeXmlIcon />,
        description: `- Built reusable UI components following scalable frontend architecture.
- Worked with REST APIs and GraphQL for dynamic data-driven applications.
- Ensured cross-browser compatibility and responsive layouts.
- Supported CI/CD pipelines using GitHub Actions.`,
        skills: [
          "Frontend Architecture",
          "GraphQL",
          "REST API",
          "GitHub Actions",
          "UI Components",
        ],
        isExpanded: false,
      },
    ],
    isCurrentEmployer: false,
  },
  {
    id: "msab-bd",
    companyName: "Msab BD",
    companyLogo: "https://avatars.githubusercontent.com/u/124806346?s=200&v=4",
    companyWebsite: "#",
    location: "Dhaka, Bangladesh",
    locationType: "Hybrid",
    positions: [
      {
        id: "1",
        title: "Web Developer",
        employmentPeriod: {
          start: "01.2025",
          end: "03.2025",
        },
        employmentType: "Full-time",
        icon: <LightbulbIcon />,
        description: `- Developed full-stack web solutions using React, Node.js, and MongoDB.
- Maintained clean, modular, and well-documented codebases.
- Enhanced frontend performance with optimized rendering strategies.`,
        skills: ["React", "Node.js", "MongoDB", "Frontend Performance"],
        isExpanded: false,
      },
    ],
    isCurrentEmployer: false,
  },
]
