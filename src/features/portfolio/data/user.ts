import type { User } from "@/features/portfolio/types/user"

export const USER: User = {
  firstName: "Shakil",
  lastName: "Ahmed Billal",
  displayName: "Shakil Ahmed Billal",
  username: "shakil-ahmed-billal",
  gender: "male",
  pronouns: "he/him",
  bio: "Passionate full-stack developer with strong expertise in building responsive, scalable, and high-performance web applications.",
  flipSentences: [
    "Creating with code. Small details matter.",
    "Full-Stack Developer",
    "Open Source Contributor",
  ],
  address: "Dhaka, Bangladesh",
  phoneNumber: "Kzg4MDEzMDgwNDg0Nzg=", // E.164 format, base64 encoded (https://t.io.vn/base64-string-converter)
  email: "c2hha2lsLmRldjk5QGdtYWlsLmNvbQ==", // base64 encoded
  website: "https://xhakil.vercel.app",
  jobTitle: "Full-Stack Developer",
  jobs: [
    {
      title: "Front-End Developer",
      company: "BD Calling (Softvence)",
      website: "https://bdcalling.com",
      experienceId: "softvence",
    },
    {
      title: "Frontend Developer Intern",
      company: "Qwik IT Services",
      website: "https://qwokit.com",
      experienceId: "qwik-it",
    },
  ],
  about: `
- **Full-Stack Developer** with expertise in building responsive, scalable, and high-performance web applications.
- Skilled in translating Figma designs into pixel-perfect user interfaces, optimizing performance, and writing clean, maintainable code. 
- Experienced in **React**, **Next.js**, **REST API integration**, state management, and cross-functional collaboration.
- Adept at solving complex problems and delivering seamless digital experiences in fast-paced environments.
- Creator of [QuickHire](https://quickhire-bd.vercel.app): comprehensive job portal
- Creator of [Zentask](https://zentask-bd.vercel.app): full-stack project management application

<p class="text-muted-foreground">* Peak metrics recorded; actual current figures may vary.</p>
`,
  avatar: "/profile/shakil.webp", // Use github avatar instead
  ogImage: "/shakil/dark-logo.webp",
  namePronunciationUrl: "/voice/shakil-ahmed-billal.mp3",
  timeZone: "Asia/Dhaka",
  keywords: [
    "shakil",
    "ahmed",
    "billal",
    "shakildev",
    "shakilahmedbillal",
    "fullstack",
    "react",
    "nextjs",
  ],
  dateCreated: "2023-10-20", // YYYY-MM-DD
}
