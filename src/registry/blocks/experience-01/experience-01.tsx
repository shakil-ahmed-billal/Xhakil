import { CodeXmlIcon, LightbulbIcon } from "lucide-react"

import type { ExperienceItemType } from "@/registry/components/work-experience"
import { WorkExperience } from "@/registry/components/work-experience"

export function Experience01() {
  return (
    <div className="max-w-screen overflow-x-clip">
      <div className="container mx-auto px-4">
        <div className="border-x border-line py-8">
          <h2 className="screen-line-top screen-line-bottom ml-4 font-heading text-3xl font-medium tracking-tight">
            Experience
          </h2>

          <WorkExperience
            className="bg-transparent *:screen-line-bottom"
            experiences={EXPERIENCE}
          />
        </div>
      </div>
    </div>
  )
}

const EXPERIENCE: ExperienceItemType[] = [
  {
    id: "naxtbrand",
    companyName: "NaxtBrand",
    companyLogo: "/experience/naxtbrand.webp",
    companyWebsite: "https://naxtbrand.com",
    positions: [
      {
        id: "1",
        title: "Founder & Lead Engineer",
        employmentPeriod: {
          start: "10.2026",
        },
        employmentType: "Self-employed",
        icon: <LightbulbIcon />,
        description:
          "- Leads technical vision, web architecture, and full-stack engineering operations.\n- Directs modern UI systems and robust web applications for clients.",
        skills: [
          "Technical Vision",
          "Software Architecture",
          "Next.js",
          "TypeScript",
          "Tailwind CSS",
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
    positions: [
      {
        id: "2",
        title: "Team Leader",
        employmentPeriod: {
          start: "01.2026",
          end: "09.2026",
        },
        employmentType: "Full-time",
        icon: <CodeXmlIcon />,
        description:
          "- Overseeing the development team and managing project deliverables.\n- Mentoring junior and mid-level developers to enhance code quality and best practices.",
        skills: [
          "Team Leadership",
          "Project Management",
          "Code Review",
          "Mentoring",
        ],
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
        description:
          "- Developed responsive user interfaces and modular component systems.\n- Integrated REST APIs and optimized web performance across client portals.",
        skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      },
    ],
  },
]
