import { useSyncExternalStore } from "react"

const SCROLLED_OFFSET = 400

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true })
  return () => window.removeEventListener("scroll", onChange)
}

export function useIsScrolled(offset = SCROLLED_OFFSET) {
  return useSyncExternalStore<boolean | null>(
    subscribe,
    () => window.scrollY >= offset,
    () => null
  )
}
