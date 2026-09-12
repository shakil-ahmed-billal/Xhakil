import type { Education } from "../types/education"

export const EDUCATION: Education[] = [
  {
    id: "gazipur-ideal-polytechnic",
    companyName: "Gazipur Ideal Polytechnic Institute",
    companyLogo: "/logo/gipi.webp", // Will need to ensure this exists or use a default
    companyWebsite: "https://gipi.gov.bd", // Example website
    positions: [
      {
        id: "diploma-cse",
        title: "Diploma in Computer Science Engineering (CSE)",
        employmentPeriod: {
          start: "2020",
          end: "2024",
        },
        employmentType: "Diploma",
        icon: "education",
        description:
          "- Completed coursework in Algorithms, Data Structures, Mobile & Web Development, and Operating Systems.\n- Participated in hands-on projects related to IoT and mobile application development.\n- Achieved a strong understanding of Computer Architecture, System Programming, and Computer Networks.",
        skills: [
          "Algorithms",
          "Data Structures",
          "Mobile & Web Development",
          "Operating Systems",
          "IoT Projects",
          "Computer Architecture",
          "Computer Networks",
        ],
        isExpanded: true,
      },
    ],
    isCurrentEmployer: false,
  },
]
