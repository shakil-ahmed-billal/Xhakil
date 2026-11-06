import { CodeXmlIcon, LightbulbIcon } from "lucide-react"

import type { ExperienceItemType } from "@/registry/components/work-experience"
import { WorkExperience } from "@/registry/components/work-experience"

export default function WorkExperienceDemo() {
  return <WorkExperience className="w-full" experiences={WORK_EXPERIENCE} />
}

const WORK_EXPERIENCE: ExperienceItemType[] = [
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
          "- Overseeing the development team and managing project deliverables.\n- Mentoring junior developers to enhance code quality and best practices.",
        skills: [
          "Team Leadership",
          "Project Management",
          "Code Review",
          "Mentoring",
        ],
      },
    ],
  },
]
