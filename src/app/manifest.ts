import type { MetadataRoute } from "next"

import { SITE_INFO } from "@/config/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    short_name: SITE_INFO.name,
    name: SITE_INFO.name,
    description: SITE_INFO.description,
    icons: [
      {
        src: "/shakil/favicon_io/android-chrome-192x192.png",
        type: "image/png",
        sizes: "192x192",
        purpose: "any",
      },
      {
        src: "/shakil/favicon_io/android-chrome-512x512.png",
        type: "image/png",
        sizes: "512x512",
        purpose: "any",
      },
      {
        src: "/shakil/favicon_io/android-chrome-512x512.png",
        type: "image/png",
        sizes: "512x512",
        purpose: "maskable",
      },
    ],
    id: "/?utm_source=pwa",
    start_url: "/?utm_source=pwa",
    display: "standalone",
    scope: "/",
    screenshots: [
      {
        src: "/images/screenshot-mobile-dark.png?v=7",
        type: "image/png",
        sizes: "440x956",
        form_factor: "narrow",
      },
      {
        src: "/images/screenshot-mobile-light.png?v=7",
        type: "image/png",
        sizes: "440x956",
        form_factor: "narrow",
      },
      {
        src: "/images/screenshot-desktop-dark.png?v=7",
        type: "image/png",
        sizes: "1920x1080",
        form_factor: "wide",
      },
      {
        src: "/images/screenshot-desktop-light.png?v=7",
        type: "image/png",
        sizes: "1920x1080",
        form_factor: "wide",
      },
    ],
  }
}
