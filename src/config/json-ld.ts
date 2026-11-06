import type { Person } from "schema-dts"

import { SITE_INFO } from "@/config/site"
import { absoluteUrl } from "@/lib/utils"
import { SOCIAL_LINKS } from "@/features/portfolio/data/social-links"
import { USER } from "@/features/portfolio/data/user"

export const JSON_LD_ID = {
  website: `${SITE_INFO.url}/#website`,
  person: `${SITE_INFO.url}/#person`,
} as const

export const personJsonLd: Person = {
  "@type": "Person",
  "@id": JSON_LD_ID.person,
  name: USER.displayName,
  alternateName: [USER.username],
  identifier: USER.username,
  description: SITE_INFO.description,
  image: absoluteUrl(USER.avatar),
  url: SITE_INFO.url,
  jobTitle: USER.jobTitle,
  worksFor: {
    "@type": "Organization",
    name: "NaxtBrand",
    url: "https://naxtbrand.com",
  },

  sameAs: SOCIAL_LINKS.filter((link) => link.sameAs).map((link) => link.href),
  knowsAbout: [
    "Full-Stack Development",
    "React",
    "Next.js",
    "TypeScript",
    "Software Architecture",
    "Tailwind CSS",
  ],
}
