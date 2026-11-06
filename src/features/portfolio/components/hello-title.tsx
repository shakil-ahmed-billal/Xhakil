"use client"

import { useSyncExternalStore } from "react"

import { InlineScript } from "@/components/inline-script"
import { PanelTitle } from "@/features/portfolio/components/panel"

const ID = "hello"
const SSR_TEXT = "Hello"

export function HelloTitle() {
  const greeting = useSyncExternalStore(
    () => () => {},
    getGreeting,
    () => SSR_TEXT
  )

  return (
    <>
      <PanelTitle
        as="div"
        id={`${ID}-greeting`}
        aria-hidden
        suppressHydrationWarning
      >
        {greeting}
      </PanelTitle>

      <InlineScript html={getInlineScript(`${ID}-greeting`)} />
    </>
  )
}

function getGreeting() {
  const hour = new Date().getHours()
  if (hour >= 0 && hour < 12) return "Good morning"
  if (hour >= 12 && hour < 17) return "Good afternoon"
  return "Good evening"
}

function runGreetingScript(elementId: string, compute: typeof getGreeting) {
  try {
    const el = document.getElementById(elementId)
    if (el) el.textContent = compute()
  } catch {}
}

function getInlineScript(elementId: string) {
  return `(${runGreetingScript.toString()})(${JSON.stringify(elementId)},${getGreeting.toString()})`
}
