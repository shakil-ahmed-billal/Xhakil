import type { User } from "@/features/portfolio/types/user"

export const USER: User = {
  firstName: "Shakil",
  lastName: "Ahmed Billal",
  displayName: "Shakil Ahmed Billal",
  username: "shakil-ahmed-billal",
  gender: "male",
  pronouns: "he/him",
  bio: "Passionate Flutter Developer with strong expertise in building high-performance, cross-platform mobile applications for Android and iOS using Flutter and Dart.",
  flipSentences: [
    "Creating with code. Small details matter.",
    "Flutter Developer",
    "Cross-Platform Mobile Engineer",
    "Open Source Contributor",
  ],
  address: "Dhaka, Bangladesh",
  phoneNumber: "Kzg4MDEzMDgwNDg0Nzg=", // E.164 format, base64 encoded (https://t.io.vn/base64-string-converter)
  email: "c2hha2lsLmRldjk5QGdtYWlsLmNvbQ==", // base64 encoded
  website: "https://xhakil.site",
  jobTitle: "Flutter Developer",
  jobs: [
    {
      title: "Team Leader",
      company: "Softvence Agency",
      website: "https://softvence.agency",
      experienceId: "softvence",
    },
    {
      title: "Flutter Developer",
      company: "Softvence Agency",
      website: "https://softvence.agency",
      experienceId: "softvence",
    },
    {
      title: "Flutter Developer",
      company: "Qwik IT Services",
      website: "https://www.qwikit.ca",
      experienceId: "qwik-it",
    },
  ],
  about: `
- **Passionate Flutter Developer** with strong expertise in building high-performance, cross-platform mobile applications for **Android** and **iOS** using **Flutter** and **Dart**.
- Skilled in translating Figma designs into pixel-perfect, responsive UI, integrating REST APIs and Firebase services, and writing clean, maintainable, and scalable code.
- Experienced in state management (**Provider**, **Riverpod**, **Bloc/Cubit**), native platform channels, and CI/CD deployment pipelines (**Google Play Store** & **Apple App Store**).
- Adept at solving complex problems, optimizing app performance (rendering, lazy loading, memory management), and delivering seamless mobile experiences in fast-paced environments.
- Creator of [Demoulinn](https://apps.apple.com/ae/app/demoulinn/id6756694988): cross-platform social media and video sharing mobile application live on the App Store and Google Play.

<p class="text-muted-foreground">* Peak metrics recorded; actual current figures may vary.</p>
`,
  avatar: "/profile/shakil.webp", // Use github avatar instead
  ogImage: "/images/screenshot-desktop-dark.png",
  namePronunciationUrl: "/voice/shakil-ahmed-billal.mp3",
  timeZone: "Asia/Dhaka",
  keywords: [
    "shakil",
    "ahmed",
    "billal",
    "shakildev",
    "shakilahmedbillal",
    "flutter",
    "dart",
    "flutter developer",
    "mobile app developer",
    "cross-platform",
    "android",
    "ios",
    "bloc",
    "riverpod",
    "firebase",
  ],
  dateCreated: "2023-10-20", // YYYY-MM-DD
}
