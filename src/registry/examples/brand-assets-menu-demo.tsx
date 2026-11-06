"use client"

import Link from "next/link"

import { getMarkSVG, SiteMark } from "@/components/site-mark"
import { getWordmarkSVG } from "@/components/site-wordmark"
import { BrandAssetsMenu } from "@/registry/components/brand-assets-menu"

export default function BrandAssetsMenuDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <BrandAssetsMenu
        logomark={<SiteMark />}
        logomarkSVG={getMarkSVG()}
        logotypeSVG={getWordmarkSVG()}
        brandGuidelinesURL="https://xhakil.vercel.app/blog/xhakil-brand"
        brandAssetsURL="https://xhakil.vercel.app/xhakil-brand.zip"
      >
        <Link href="/" aria-label="Home">
          <SiteMark className="h-8 text-foreground" />
        </Link>
      </BrandAssetsMenu>

      <div className="text-sm text-muted-foreground">
        <span className="hidden pointer-fine:inline-block">
          Right-click the logo
        </span>
        <span className="hidden pointer-coarse:inline-block">
          Press & hold the logo
        </span>
      </div>
    </div>
  )
}
