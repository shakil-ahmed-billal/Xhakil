import type { Metadata } from "next"

import { NotFound as PageNotFound } from "@/components/not-found"

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return <PageNotFound />
}
