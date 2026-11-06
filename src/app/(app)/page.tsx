import type { Metadata } from "next"
import type { ProfilePage, WithContext } from "schema-dts"

import { AD_PLACEMENTS, CARBON_ADS } from "@/config/ads"
import { JSON_LD_ID } from "@/config/json-ld"
import { JsonLdScript } from "@/lib/json-ld"
import { absoluteUrl, cn } from "@/lib/utils"
import { FloatingCarbonAds } from "@/components/floating-carbon-ads"
import { Blog } from "@/features/portfolio/components/blog"
import { Education } from "@/features/portfolio/components/education"
import { Experiences } from "@/features/portfolio/components/experiences"
import { FrameWidthDimension } from "@/features/portfolio/components/frame-width-dimension"
import { GitHubContributions } from "@/features/portfolio/components/github-contributions"
import { Hello } from "@/features/portfolio/components/hello"
import { Overview } from "@/features/portfolio/components/overview"
import { ProfileHeader } from "@/features/portfolio/components/profile-header"
import { Projects } from "@/features/portfolio/components/projects"
import { SeparatorHeightDimension } from "@/features/portfolio/components/separator-height-dimension"
import { SocialLinks } from "@/features/portfolio/components/social-links"
import { TechStack } from "@/features/portfolio/components/tech-stack"
import { Testimonials } from "@/features/portfolio/components/testimonials"
import { USER } from "@/features/portfolio/data/user"

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
}

export default function HomePage() {
  return (
    <>
      <JsonLdScript data={getProfilePageJsonLd()} />
      {CARBON_ADS && AD_PLACEMENTS.home && <FloatingCarbonAds />}

      <div className="[--separator-height:--spacing(8)] **:data-[slot=panel]:scroll-mt-[calc(var(--header-height)+var(--separator-height))]">
        <div className="mx-auto md:max-w-3xl">
          <FrameWidthDimension />
          <ProfileHeader />
          <Separator>
            <SeparatorHeightDimension className="hidden lg:block" height={32} />
          </Separator>

          <Overview />
          <SocialLinks />
          <GitHubContributions />
          <Separator />

          <Hello />
          <Testimonials />
          <Separator />

          <Blog />
          <Separator />

          <TechStack />
          <Separator />

          <Experiences />
          <Separator />

          <Education />
          <Separator />

          <Projects />
        </div>
      </div>
    </>
  )
}

function getProfilePageJsonLd(): WithContext<ProfilePage> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": absoluteUrl("/"),
    dateCreated: new Date(USER.dateCreated).toISOString(),
    dateModified: new Date(USER.dateModified || "2026-03-24").toISOString(),

    mainEntity: { "@id": JSON_LD_ID.person },
  }
}

function Separator({ className, children }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "stripe-divider h-(--separator-height) w-full border-x border-x-line",
        className
      )}
    >
      {children}
    </div>
  )
}
