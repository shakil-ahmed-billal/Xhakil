export type DocMetadata = {
  title: string
  description: string

  image?: string

  category?: string

  new?: boolean
  updated?: boolean

  pinned?: boolean

  ads?: boolean

  createdAt: string

  updatedAt: string
}

export type Doc = {
  metadata: DocMetadata

  slug: string

  content: string
}

export type DocPreview = {
  slug: string
  title: string
  category?: string
}
