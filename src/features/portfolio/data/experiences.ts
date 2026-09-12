import type { Experience } from "../types/experiences"

export const EXPERIENCES: Experience[] = [
  {
    id: "softvence",
    companyName: "Softvence Agency",
    companyLogo: "/experience/softvence.webp", // Softvence Agency Logo
    companyWebsite: "https://softvence.agency",
    positions: [
      {
        id: "2",
        title: "Team Leader",
        employmentPeriod: {
          start: "01.2026",
          end: "08.2026",
        },
        employmentType: "Full-time",
        icon: "business",
        description:
          "- Overseeing a cross-functional mobile app development team, planning sprints, assigning tasks, and managing project timelines to ensure consistent, on-schedule delivery of Flutter-based products.\n- Mentoring Flutter developers on Dart best practices, state management patterns, clean architecture, and efficient widget composition to elevate overall code quality.\n- Coordinating closely between business stakeholders, designers, and the technical team to translate product requirements into clear, actionable development tasks and smooth feature delivery.\n- Driving key Flutter app architecture decisions, including module structuring, state management strategy, and API integration patterns, while leading thorough code review processes.\n- Establishing coding standards, Git workflow guidelines, and CI/CD release practices to improve team productivity and reduce production incidents across app releases.",
        skills: [
          "Team Leadership",
          "Flutter",
          "Dart",
          "Clean Architecture",
          "State Management",
          "CI/CD",
          "Code Review",
          "Sprint Planning",
        ],
        isExpanded: true,
      },
      {
        id: "1",
        title: "Flutter Developer",
        employmentPeriod: {
          start: "04.2025",
          end: "01.2026",
        },
        employmentType: "Full-time",
        icon: "code",
        description:
          "- Developed scalable, high-performance, cross-platform mobile applications for Android and iOS using Flutter and Dart, following clean architecture and reusable widget-based design principles.\n- Converted complex Figma designs into pixel-perfect, fully responsive Flutter UI, ensuring consistent look and feel across a wide range of device sizes and screen resolutions.\n- Integrated RESTful APIs, GraphQL endpoints, and Firebase services such as Authentication, Firestore, and Cloud Messaging to build dynamic, real-time, data-driven mobile applications.\n- Improved app performance and user experience through widget tree optimization, lazy loading, efficient state management, image caching, and reduction of unnecessary rebuilds.\n- Collaborated closely with backend engineers, UI/UX designers, and product managers in an agile environment to deliver production-ready mobile features on tight deadlines.\n- Handled app release management, including versioning, build configuration, and deployment to the Google Play Store and Apple App Store using CI/CD pipelines.",
        skills: [
          "Flutter",
          "Dart",
          "Android",
          "iOS",
          "Firebase",
          "REST APIs",
          "GraphQL",
          "Figma to Flutter UI",
          "App Store & Google Play",
        ],
        isExpanded: false,
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "qwik-it",
    companyName: "Qwik IT Services",
    companyLogo: "/experience/qwikit.webp", // Qwik IT Logo
    companyWebsite: "https://www.qwikit.ca",
    positions: [
      {
        id: "1",
        title: "Flutter Developer",
        employmentPeriod: {
          start: "03.2024",
          end: "04.2025",
        },
        employmentType: "Remote",
        icon: "code",
        description:
          "- Built reusable, well-documented Flutter widgets and components following a scalable, modular app architecture that could be shared across multiple screens and features.\n- Worked with REST APIs, GraphQL, and Firebase to fetch, cache, and synchronize data for dynamic, data-driven mobile applications used by real end users.\n- Ensured cross-platform compatibility, pixel-consistent layouts, and smooth performance across a variety of Android and iOS devices and screen sizes.\n- Supported and maintained CI/CD pipelines for automated build, test, and deployment of the mobile application using GitHub Actions, reducing manual release effort.\n- Participated in daily stand-ups, sprint planning, and code reviews, gaining hands-on experience with agile development practices in a remote, distributed team setting.",
        skills: [
          "Flutter",
          "Dart",
          "Cross-Platform",
          "REST APIs",
          "Firebase",
          "GraphQL",
          "CI/CD",
          "GitHub Actions",
          "Agile Development",
        ],
        isExpanded: false,
      },
    ],
    isCurrentEmployer: false,
  },
]
