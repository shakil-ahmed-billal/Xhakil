import type { Experience } from "../types/experiences"

export const EXPERIENCES: Experience[] = [
  {
    id: "softvence",
    companyName: "Softvence",
    companyLogo: "/experience/softvence.webp", // Placeholder BD Calling Logo
    companyWebsite: "https://softvence.agency",
    positions: [
      {
        id: "2",
        title: "Team Leader",
        employmentPeriod: {
          start: "01.2026",
        },
        employmentType: "Full-time",
        icon: "business",
        description:
          "- Overseeing the development team and managing project timelines.\n- Mentoring junior and mid-level developers to enhance code quality and best practices.\n- Coordinating between stakeholders and the technical team to ensure smooth feature delivery.\n- Driving technical architecture decisions and code review processes.",
        skills: ["Team Leadership", "Project Management", "Code Review", "Mentoring"],
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
        icon: "code",
        description:
          "- Developed scalable, responsive web applications using React and Next.js.\n- Converted Figma designs into pixel-perfect, accessible user interfaces.\n- Integrated RESTful APIs and optimized client-side data fetching.\n- Improved performance through lazy loading, code splitting, and caching strategies.\n- Collaborated with backend engineers and product teams to deliver production-ready features.",
        skills: ["React", "Next.js", "Figma", "REST API", "Optimization"],
        isExpanded: false,
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "qwik-it",
    companyName: "Qwik IT Services",
    companyLogo: "/experience/qwikit.webp", // Placeholder Qwik IT Logo
    companyWebsite: "https://www.qwikit.ca",
    positions: [
      {
        id: "1",
        title: "Frontend Developer Intern",
        employmentPeriod: {
          start: "03.2025",
          end: "04.2025",
        },
        employmentType: "Internship",
        description:
          "- Built reusable UI components following scalable frontend architecture.\n- Worked with REST APIs and GraphQL for dynamic data-driven applications.\n- Ensured cross-browser compatibility and responsive layouts.\n- Supported CI/CD pipelines using GitHub Actions.",
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
    companyLogo: "https://avatars.githubusercontent.com/u/124806346?s=200&v=4", // Placeholder Msab BD Logo
    companyWebsite: "#", // No website provided
    positions: [
      {
        id: "1",
        title: "Web Developer",
        employmentPeriod: {
          start: "01.2025",
          end: "03.2025",
        },
        employmentType: "Full-time",
        description:
          "- Developed full-stack web solutions using React, Node.js, and MongoDB.\n- Maintained clean, modular, and well-documented codebases.\n- Enhanced frontend performance with optimized rendering strategies.",
        skills: ["React", "Node.js", "MongoDB", "Frontend Performance"],
        isExpanded: false,
      },
    ],
    isCurrentEmployer: false,
  },
]
