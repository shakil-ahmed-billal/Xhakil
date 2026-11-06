import type { Metadata } from "next"

import { ShakilMarkIsometric } from "@/features/portfolio/components/shakil-mark-isometric"

export const metadata: Metadata = {
  title: "Open Graph Preview",
  robots: {
    index: false,
    follow: false,
  },
}

export default function Page() {
  return (
    <div className="max-w-screen overflow-x-clip">
      <div className="mx-auto flex h-screen flex-col justify-center md:max-w-3xl">
        <ShakilMarkIsometric />
      </div>
    </div>
  )
}
