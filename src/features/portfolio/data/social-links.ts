import type { SocialProfile } from "@/features/portfolio/types/social-links"

export const SOCIAL = {
  x: {
    title: "𝕏",
    handle: "@shakil.dev99",
    href: "https://x.com/shakil_dev99",
    sameAs: true,
  },
  github: {
    title: "GitHub",
    handle: "shakil-ahmed-billal",
    href: "https://github.com/shakil-ahmed-billal",
    sameAs: true,
  },
  linkedin: {
    title: "LinkedIn",
    handle: "shakil-ahmed-billal",
    href: "https://linkedin.com/in/shakil-ahmed-billal",
    sameAs: true,
  },
} satisfies Record<string, SocialProfile>

export type SocialName = keyof typeof SOCIAL

export type SocialLink = SocialProfile & { name: SocialName }

export const SOCIAL_LINKS: SocialLink[] = (
  Object.entries(SOCIAL) as [SocialName, SocialProfile][]
).map(([name, profile]) => ({ name, ...profile }))
