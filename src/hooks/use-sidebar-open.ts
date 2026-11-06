"use client"

import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"

const sidebarOpenAtom = atomWithStorage<boolean>(
  "sidebarOpen",
  true,
  undefined,
  {
    getOnInit: true,
  }
)

export function useSidebarOpen() {
  const [isOpen, setIsOpen] = useAtom(sidebarOpenAtom)

  const toggleSidebar = () => {
    const nextOpen = !isOpen
    document.documentElement.dataset.sidebarOpen = String(nextOpen)
    setIsOpen(nextOpen)
  }

  return { isOpen, toggleSidebar }
}
