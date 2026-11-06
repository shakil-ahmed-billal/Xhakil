"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

declare global {
  interface Window {
    _carbonads?: {
      refresh: () => void
    }
  }
}

const SCRIPT_ID = "_carbonads_js"

export type CarbonAdsProps = {
  serve: string

  placement: string

  format?: "cover" | "responsive"
  className?: string
}

export function CarbonAds({
  serve,
  placement,
  format = "responsive",
  className,
}: CarbonAdsProps) {
  const pathname = usePathname()
  const containerRef = useRef<HTMLDivElement>(null)
  const [blocked, setBlocked] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const script = document.getElementById(SCRIPT_ID)
    if (script) {
      if (container.contains(script) && script.dataset.loaded) {
        window._carbonads?.refresh()
      }
      return
    }

    const el = document.createElement("script")
    el.id = SCRIPT_ID
    el.async = true
    el.type = "text/javascript"
    el.src = `//cdn.carbonads.com/carbon.js?serve=${serve}&placement=${placement}&format=${format}`
    el.onload = () => {
      el.dataset.loaded = "true"
    }
    el.onerror = () => setBlocked(true)
    container.appendChild(el)
  }, [pathname, serve, placement, format])

  if (blocked) return null

  return (
    <div
      ref={containerRef}
      data-slot="carbon-ads"
      data-format={format}
      className={cn("min-h-39 data-[format=cover]:min-h-70", className)}
    />
  )
}
