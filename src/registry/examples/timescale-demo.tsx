import { cn } from "@/lib/utils"
import { Markdown } from "@/components/markdown"
import {
  TimescaleAge,
  TimescaleContent,
  TimescaleHeader,
  TimescaleItem,
  TimescaleRail,
  TimescaleRoot,
  TimescaleTick,
  TimescaleTrack,
  TimescaleViewport,
  TimescaleYear,
} from "@/registry/components/timescale"

export default function TimescaleDemo() {
  return (
    <TimescaleRoot className="w-full">
      <TimescaleHeader>
        <TimescaleAge>Age</TimescaleAge>
        <TimescaleYear>Years</TimescaleYear>
      </TimescaleHeader>

      <TimescaleViewport>
        <TimescaleTrack>
          <TimescaleRail />

          {TIMELINE_MILESTONES.map((milestone) => (
            <TimescaleItem key={milestone.year}>
              <TimescaleTick />
              <TimescaleAge>
                {milestone.year - TIMELINE_BIRTH_YEAR}
              </TimescaleAge>
              <TimescaleYear>{milestone.year}</TimescaleYear>
              {milestone.content && (
                <TimescaleContent className="typeset typeset-timescale">
                  <Markdown>{milestone.content}</Markdown>
                </TimescaleContent>
              )}
            </TimescaleItem>
          ))}
        </TimescaleTrack>
      </TimescaleViewport>
    </TimescaleRoot>
  )
}

type TimelineMilestone = {
  year: number
  content?: string
}

const TIMELINE_BIRTH_YEAR = 2002

const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    year: 2002,
    content: "Born in Bangladesh.",
  },
  { year: 2003 },
  { year: 2004 },
  { year: 2005 },
  { year: 2006 },
  { year: 2007 },
  { year: 2008 },
  { year: 2009 },
  { year: 2010 },
  { year: 2011 },
  { year: 2012 },
  { year: 2013 },
  { year: 2014 },
  { year: 2015 },
  { year: 2016 },
  { year: 2017 },
  { year: 2018 },
  {
    year: 2019,
    content:
      "Discovered computer programming and began learning web development fundamentals.",
  },
  {
    year: 2020,
    content:
      "Enrolled in Diploma in Computer Science & Engineering at Gazipur Ideal Polytechnic Institute.",
  },
  {
    year: 2021,
    content:
      "Mastered modern JavaScript (ES6+), React, and full-stack development with Node.js and MongoDB.",
  },
  {
    year: 2022,
    content:
      "Started building complex full-stack web applications and freelancing for international clients.",
  },
  {
    year: 2023,
    content:
      "Joined Qwik IT as a Frontend Developer. Built responsive client applications and modern UI components.",
  },
  {
    year: 2024,
    content:
      "Graduated with a Diploma in Engineering (Computer Science & Engineering). Developed ZapCash, QuickHire, and Zentask.",
  },
  {
    year: 2025,
    content:
      "Joined Softvence as Front-End Developer. Promoted to Team Leader at Softvence, mentoring engineers.",
  },
  {
    year: 2026,
    content:
      "Founded NaxtBrand as Lead Engineer. Launched [xhakil.vercel.app](https://xhakil.vercel.app).",
  },
]
