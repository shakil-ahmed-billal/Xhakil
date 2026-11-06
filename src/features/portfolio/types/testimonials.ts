export type Testimonial = {
  authorAvatar: string

  authorName: string

  authorTagline: string

  url: string

  quote: string

  date: string

  isVerified?: boolean

  isFeatured?: boolean

  order?: number

  icon?: React.ReactNode
}
