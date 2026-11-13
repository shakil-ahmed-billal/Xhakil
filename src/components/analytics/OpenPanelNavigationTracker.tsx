"use client"

import { Suspense, useEffect, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"

import { trackEvent } from "@/lib/events"
import { op } from "@/lib/openpanel"

let lastGlobalPathSignature = ""
let lastGlobalPathTime = 0

function OpenPanelNavigationTrackerInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const lastPathRef = useRef<string | null>(null)

  useEffect(() => {
    if (typeof window === "undefined" || !pathname) return

    // Avoid duplicate screen_view on React StrictMode remounts or rapid triggers
    const currentSignature = `${pathname}?${searchParams.toString()}`
    const now = Date.now()
    if (
      lastPathRef.current === currentSignature ||
      (lastGlobalPathSignature === currentSignature &&
        now - lastGlobalPathTime < 600)
    ) {
      return
    }
    lastPathRef.current = currentSignature
    lastGlobalPathSignature = currentSignature
    lastGlobalPathTime = now

    // 1. Extract UTM & Attribution Parameters
    const utmSource = searchParams.get("utm_source")?.trim()
    const utmMedium = searchParams.get("utm_medium")?.trim()
    const utmCampaign = searchParams.get("utm_campaign")?.trim()
    const utmTerm = searchParams.get("utm_term")?.trim()
    const utmContent = searchParams.get("utm_content")?.trim()
    const refParam =
      searchParams.get("ref")?.trim() || searchParams.get("via")?.trim()

    // 2. Build Attribution & Context Properties
    const globalContext: Record<string, string | number | boolean | null> = {
      path: pathname,
      referrer:
        typeof document !== "undefined" ? document.referrer || null : null,
      page_title:
        typeof document !== "undefined" ? document.title || null : null,
      screen_width: typeof window !== "undefined" ? window.innerWidth : null,
      screen_height: typeof window !== "undefined" ? window.innerHeight : null,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null,
    }

    if (utmSource) globalContext.utm_source = utmSource
    if (utmMedium) globalContext.utm_medium = utmMedium
    if (utmCampaign) globalContext.utm_campaign = utmCampaign
    if (utmTerm) globalContext.utm_term = utmTerm
    if (utmContent) globalContext.utm_content = utmContent
    if (refParam) globalContext.ref_code = refParam

    // 3. Attach Global Properties to OpenPanel Session
    try {
      const win = window as unknown as {
        op?: (cmd: string, arg?: unknown) => void
      }
      if (typeof win.op === "function") {
        win.op("setGlobalProperties", globalContext)
      }
      op.setGlobalProperties(
        globalContext as Parameters<typeof op.setGlobalProperties>[0]
      )
    } catch {}

    // 4. Emit standard screen_view for OpenPanel Reports, Pageviews & Live Dashboard
    trackEvent({
      name: "screen_view",
      properties: {
        path: pathname,
        title: typeof document !== "undefined" ? document.title : undefined,
        referrer:
          typeof document !== "undefined"
            ? document.referrer || undefined
            : undefined,
        utm_source: utmSource || undefined,
        utm_medium: utmMedium || undefined,
        utm_campaign: utmCampaign || undefined,
        utm_term: utmTerm || undefined,
        utm_content: utmContent || undefined,
        ref: refParam || undefined,
      },
    })
  }, [pathname, searchParams])

  return null
}

export function OpenPanelNavigationTracker() {
  return (
    <Suspense fallback={null}>
      <OpenPanelNavigationTrackerInner />
    </Suspense>
  )
}
