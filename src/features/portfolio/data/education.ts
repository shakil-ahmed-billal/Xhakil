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
          "Focus on Core Computer Science subjects, Software Engineering, and Web Technologies.",
        skills: [
          "Data Structures",
          "Algorithms",
          "Database Management",
          "Software Engineering",
          "Web Development",
          "Networking",
        ],
        isExpanded: true,
      },
    ],
    isCurrentEmployer: false,
  },
]
