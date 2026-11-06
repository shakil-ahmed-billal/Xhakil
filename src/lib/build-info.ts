import { SOURCE_CODE_GITHUB_URL } from "@/config/site"
import { USER } from "@/features/portfolio/data/user"

import packageJson from "../../package.json"

const SHORT_SHA_LENGTH = 7

export type BuildEnvironment = "production" | "preview" | "development"

export type BuildInfo = {
  commitShortSha: string | null

  commitUrl: string | null
  environment: BuildEnvironment

  date: string
}

const dateFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: USER.timeZone,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
})

const BUILD_DATE = dateFormatter.format(
  process.env.BUILD_TIMESTAMP
    ? new Date(process.env.BUILD_TIMESTAMP)
    : new Date()
)

function resolveEnvironment(): BuildEnvironment {
  const vercelEnv = process.env.VERCEL_ENV
  return vercelEnv === "production" || vercelEnv === "preview"
    ? vercelEnv
    : "development"
}

export function getBuildInfo(): BuildInfo {
  const environment = resolveEnvironment()
  const commitSha = process.env.VERCEL_GIT_COMMIT_SHA

  return {
    commitShortSha: commitSha?.slice(0, SHORT_SHA_LENGTH) ?? null,
    commitUrl:
      commitSha && environment !== "development"
        ? `${SOURCE_CODE_GITHUB_URL}/commit/${commitSha}`
        : null,
    environment,
    date: BUILD_DATE,
  }
}

const STACK_DEPENDENCIES = [
  "next",
  "react",
  "@base-ui/react",
  "shadcn",
  "tailwindcss",
]

const declaredVersions: Record<string, string | undefined> = {
  ...packageJson.dependencies,
  ...packageJson.devDependencies,
}

export type StackEntry = {
  name: string
  version: string
}

export function getStack(): StackEntry[] {
  return STACK_DEPENDENCIES.flatMap((name) => {
    const version = declaredVersions[name]?.replace(/^[^\d]*/, "")
    return version ? [{ name, version }] : []
  })
}
