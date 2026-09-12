import type { Project } from "../types/projects"

export const PROJECTS: Project[] = [
  {
    id: "demoulinn",
    title: "Demoulinn — Social Media & Video Sharing Mobile App",
    period: {
      start: "01.2026",
    },
    link: "https://apps.apple.com/ae/app/demoulinn/id6756694988",
    logo: "/logo/demoulinn.webp",
    skills: [
      "Flutter",
      "Dart",
      "Firebase (Auth, FCM, Firestore)",
      "Socket.io",
      "REST APIs",
      "Node.js",
      "Express.js",
      "App Store",
      "Google Play",
    ],
    description: `Built and published **Demoulinn**, a cross-platform Flutter social media app for photo/video sharing, live on the [App Store](https://apps.apple.com/ae/app/demoulinn/id6756694988) and [Google Play](https://play.google.com/store/apps/details?id=com.demoulinn.socialapp).

- **Core Social Features:** Implemented public content feed, likes, comments, reposts, hashtags, and clickable user profiles.
- **Real-Time Messaging:** Developed one-to-one messaging with Socket.io and Firebase Cloud Messaging (FCM), keeping conversations private, instant, and synced.
- **Security & Notifications:** Integrated secure Firebase Authentication, push notifications for engagement, and privacy controls (post deletion, user blocking).
- **Performance:** Optimized video auto-play, feed refresh, discovery, and scrolling performance for a smooth experience across Android and iOS devices.`,
    isExpanded: true,
  },
]
