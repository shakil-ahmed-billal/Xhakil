"use client"

import dynamic from "next/dynamic"

import { useMediaQuery } from "@/hooks/use-media-query"

function Placeholder() {
  return <div className="h-150 w-200 ring-1 ring-border" />
}

const Game = dynamic(() => import("./component").then((mod) => mod.Daikanoid), {
  ssr: false,
  loading: Placeholder,
})

export function Daikanoid(props: React.ComponentProps<typeof Game>) {
  const isDesktop = useMediaQuery("(min-width: 64rem)")

  return isDesktop ? <Game {...props} /> : <Placeholder />
}
