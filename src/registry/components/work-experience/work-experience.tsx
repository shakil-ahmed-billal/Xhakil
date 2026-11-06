"use client"

import { useCallback, useRef, type ComponentProps } from "react"
import { differenceInMonths, parse } from "date-fns"
import { BriefcaseBusinessIcon, InfinityIcon } from "lucide-react"
import ReactMarkdown from "react-markdown"

import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"
import type { ChevronsUpDownIconHandle } from "@/registry/components/chevrons-up-down-icon"
import { ChevronsUpDownIcon } from "@/registry/components/chevrons-up-down-icon"

export type ExperiencePositionItemType = {
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

export type ExperienceItemType = {
  id: string

  companyName: string

  companyLogo?: string

  companyWebsite?: string

  positions: ExperiencePositionItemType[]

  isCurrentEmployer?: boolean
}

export type WorkExperienceProps = {
  className?: string

  experiences: ExperienceItemType[]
}

export function WorkExperience({
  className,
  experiences,
}: WorkExperienceProps) {
  return (
    <div className={cn("bg-background px-4 text-foreground", className)}>
      {experiences.map((experience) => (
        <ExperienceItem key={experience.id} experience={experience} />
      ))}
    </div>
  )
}

export type ExperienceItemProps = {
  experience: ExperienceItemType
}

export function ExperienceItem({ experience }: ExperienceItemProps) {
  return (
    <div className="space-y-4 py-4">
      <div className="not-prose flex items-center gap-3">
        <div className="flex size-6 shrink-0 items-center justify-center">
          {experience.companyLogo ? (
            <img
              src={experience.companyLogo}
              alt={experience.companyName}
              className="size-6 rounded-full"
              aria-hidden
            />
          ) : (
            <span className="flex size-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
          )}
        </div>

        <h3 className="text-lg/snug font-semibold">
          {experience.companyWebsite ? (
            <a
              className="link"
              href={experience.companyWebsite}
              target="_blank"
              rel="noopener noreferrer"
            >
              {experience.companyName}
            </a>
          ) : (
            experience.companyName
          )}
        </h3>

        {experience.isCurrentEmployer && (
          <span
            className="relative flex items-center justify-center"
            aria-label="Current Employer"
          >
            <span className="absolute inline-flex size-3 animate-ping rounded-full bg-sky-500 opacity-50" />
            <span className="relative inline-flex size-2 rounded-full bg-sky-500" />
          </span>
        )}
      </div>

      <div className="relative space-y-4 before:absolute before:left-3 before:h-full before:w-px before:bg-border">
        {experience.positions.map((position) => (
          <ExperiencePositionItem key={position.id} position={position} />
        ))}
      </div>
    </div>
  )
}

export type ExperiencePositionItemProps = {
  position: ExperiencePositionItemType
}

export function ExperiencePositionItem({
  position,
}: ExperiencePositionItemProps) {
  const chevronsUpDownIconRef = useRef<ChevronsUpDownIconHandle>(null)

  const handleOpenChange = useCallback((open: boolean) => {
    const controls = chevronsUpDownIconRef.current
    if (!controls) return

    if (open) {
      controls.startAnimation()
    } else {
      controls.stopAnimation()
    }
  }, [])

  const { start, end } = position.employmentPeriod
  const isOngoing = !end
  const duration = formatDuration(start, end)

  return (
    <Collapsible
      className="relative last:before:absolute last:before:h-full last:before:w-4 last:before:bg-background"
      defaultOpen={position.isExpanded}
      onOpenChange={handleOpenChange}
      disabled={!position.description}
    >
      <CollapsibleTrigger
        className={cn(
          "group/experience-position not-prose block w-full text-left select-none",
          "relative before:absolute before:-top-1 before:-right-1 before:-bottom-1.5 before:left-7 before:rounded-lg hover:before:bg-muted/30",
          "data-disabled:before:content-none"
        )}
      >
        <div className="relative z-1 mb-1 flex items-start gap-3 text-base">
          <div
            className={cn(
              "flex size-6 shrink-0 items-center justify-center rounded-lg",
              "bg-muted text-muted-foreground",
              "border border-muted-foreground/15 ring-1 ring-line ring-offset-1 ring-offset-background",
              "[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
            )}
          >
            {position.icon ?? <BriefcaseBusinessIcon />}
          </div>

          <h4 className="flex-1 font-medium text-balance text-foreground">
            {position.title}
          </h4>

          <div className="shrink-0 text-muted-foreground group-data-disabled/experience-position:hidden [&_svg]:h-lh [&_svg]:w-4">
            <ChevronsUpDownIcon ref={chevronsUpDownIconRef} duration={0.15} />
          </div>
        </div>

        <dl className="relative z-1 flex items-center gap-2 pl-9 text-sm text-muted-foreground">
          {position.employmentType && (
            <>
              <div>
                <dt className="sr-only">Employment Type</dt>
                <dd>{position.employmentType}</dd>
              </div>

              <Separator
                className="data-vertical:h-4 data-vertical:self-center"
                orientation="vertical"
                aria-hidden
              />
            </>
          )}

          <div>
            <dt className="sr-only">Employment Period</dt>
            <dd className="flex items-center gap-0.5 tabular-nums">
              <span>{start}</span>
              <span className="font-mono">—</span>
              {isOngoing ? (
                <InfinityIcon
                  className="size-4.5 translate-y-[0.5px]"
                  aria-label="Present"
                />
              ) : (
                <span>{end}</span>
              )}
            </dd>
          </div>

          {duration && (
            <>
              <Separator
                className="data-vertical:h-4 data-vertical:self-center"
                orientation="vertical"
                aria-hidden
              />
              <div>
                <dt className="sr-only">Duration</dt>
                <dd className="tabular-nums">{duration}</dd>
              </div>
            </>
          )}
        </dl>
      </CollapsibleTrigger>

      <CollapsibleContent className="overflow-hidden">
        {position.description && (
          <Prose className="pt-2 pl-9">
            <ReactMarkdown>{position.description}</ReactMarkdown>
          </Prose>
        )}
      </CollapsibleContent>

      {Array.isArray(position.skills) && position.skills.length > 0 && (
        <ul className="not-prose flex flex-wrap gap-1.5 pt-3 pl-9">
          {position.skills.map((skill, index) => (
            <li key={index} className="flex">
              <Skill>{skill}</Skill>
            </li>
          ))}
        </ul>
      )}
    </Collapsible>
  )
}

function Prose({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "prose max-w-none prose-custom prose-zinc dark:prose-invert",
        className
      )}
      {...props}
    />
  )
}

function Skill({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border bg-muted/50 px-1.5 py-0.5 font-mono text-xs text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function formatDuration(start: string, end?: string): string {
  const startHasMonth = start.includes(".")
  const endHasMonth = end ? end.includes(".") : true

  if (!startHasMonth && end && !endHasMonth) {
    const years = parseInt(end, 10) - parseInt(start, 10)
    if (years <= 0) {
      return ""
    }
    return `${years}y`
  }

  const startDate = parsePeriodDate(start, "first")
  const endDate = end ? parsePeriodDate(end, "last") : new Date()

  const totalMonths = differenceInMonths(endDate, startDate) + 1
  if (totalMonths <= 0) {
    return ""
  }

  if (totalMonths < 12) {
    return `${totalMonths}m`
  }

  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  if (months === 0) {
    return `${years}y`
  }
  return `${years}y ${months}m`
}

function parsePeriodDate(str: string, fallbackMonth: "first" | "last"): Date {
  if (str.includes(".")) {
    return parse(str, "MM.yyyy", new Date())
  }
  return parse(
    `${fallbackMonth === "last" ? "12" : "01"}.${str}`,
    "MM.yyyy",
    new Date()
  )
}
