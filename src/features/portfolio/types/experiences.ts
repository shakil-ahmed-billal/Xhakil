export type ExperiencePosition = {
  id: string
  title: string

  employmentPeriod: {
    start: string

    end?: string
  }

  employmentType?: string
  description?: string

  icon?: React.ReactElement
  skills?: string[]

  isExpanded?: boolean
}

export type Experience = {
  id: string
  companyName: string

  companyLogo?: string

  companyIcon?: React.ReactElement

  companyWebsite?: string
  location?: string
  locationType?: "On-site" | "Hybrid" | "Remote"

  positions: ExperiencePosition[]

  isCurrentEmployer?: boolean
}
