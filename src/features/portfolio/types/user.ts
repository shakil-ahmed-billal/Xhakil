import type { AvatarLightsVariants } from "@/features/portfolio/components/avatar-lights"

export type User = {
  firstName: string
  lastName: string

  displayName: string

  username: string
  gender: "male" | "female" | "non-binary"

  pronouns: string
  bio: string

  taglines: string[]

  address: string

  phoneNumberB64: string

  emailB64: string

  website: string

  jobTitle: string

  jobs: {
    title: string
    company: string
    website: string
    experienceId?: string
  }[]

  about: string

  avatar: string
  avatarOutline: string
  avatarMonochrome: string

  avatarVariants: AvatarLightsVariants

  ogImage: string

  namePronunciationUrl: string

  keywords: string[]

  timeZone: string

  dateCreated: string
  dateModified?: string
}
