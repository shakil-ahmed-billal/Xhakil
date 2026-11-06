import type { Metadata } from "next"
import type { CollectionPage, WithContext } from "schema-dts"

import { JSON_LD_ID } from "@/config/json-ld"
import { X_HANDLE } from "@/config/site"
import { jsonLdBreadcrumbList, JsonLdScript } from "@/lib/json-ld"
import { absoluteUrl, cn } from "@/lib/utils"
import {
  PageHeading,
  PageHeadingTagline,
  PageHeadingTitle,
} from "@/components/page-heading"
import {
  Testimonial,
  TestimonialAuthor,
  TestimonialAuthorName,
  TestimonialAuthorTagline,
  TestimonialAvatar,
  TestimonialAvatarImg,
  TestimonialAvatarRing,
  TestimonialQuote,
} from "@/registry/components/testimonial"
import { Twemoji } from "@/registry/components/twemoji/twemoji"
import {
  TESTIMONIALS_1,
  TESTIMONIALS_2,
} from "@/features/portfolio/data/testimonials"

const title = "Testimonials"
const description = "Client feedback, recommendations, and reviews."

const ogImage = `/og/simple?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/testimonials",
  },
  openGraph: {
    url: "/testimonials",
    type: "website",
    images: {
      url: ogImage,
      width: 1200,
      height: 630,
      alt: title,
    },
  },
  twitter: {
    card: "summary_large_image",
    site: X_HANDLE,
    creator: X_HANDLE,
    images: [ogImage],
  },
}

const TESTIMONIALS = [...TESTIMONIALS_1, ...TESTIMONIALS_2].sort(
  (a, b) => Number(a.order ?? 999) - Number(b.order ?? 999)
)

function getTestimonialsPageJsonLd(): WithContext<CollectionPage> {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": absoluteUrl("/testimonials"),
    name: title,
    description,
    url: absoluteUrl("/testimonials"),
    isPartOf: { "@id": JSON_LD_ID.website },
    about: { "@id": JSON_LD_ID.person },
  }
}

export default function TestimonialsPage() {
  return (
    <>
      <JsonLdScript data={getTestimonialsPageJsonLd()} />
      <JsonLdScript
        data={jsonLdBreadcrumbList([
          {
            name: "Home",
            href: "/",
          },
          {
            name: "Testimonials",
            href: "/testimonials",
          },
        ])}
      />

      <div className="min-h-svh">
        <PageHeading>
          <PageHeadingTagline>Testimonials</PageHeadingTagline>
          <PageHeadingTitle>Client Feedback & Recommendations</PageHeadingTitle>
        </PageHeading>

        <div className="relative pt-4">
          <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
            <div className="border-r border-line" />
            <div className="border-l border-line" />
          </div>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {TESTIMONIALS.map((item) => (
              <li
                key={item.url}
                className={cn(
                  "group/testimonial",
                  "max-sm:screen-line-top max-sm:screen-line-bottom",
                  "sm:nth-[2n+1]:screen-line-top sm:nth-[2n+1]:screen-line-bottom"
                )}
              >
                <Testimonial className="relative transition-[background-color] ease-out hover:bg-accent-muted">
                  <TestimonialQuote className="font-serif text-base/snug">
                    <p>
                      <Twemoji className="grayscale transition-[filter] duration-300 ease-[cubic-bezier(0.42,0,0.58,1)] group-hover/testimonial:grayscale-0">
                        {item.quote}
                      </Twemoji>
                    </p>
                  </TestimonialQuote>

                  <TestimonialAuthor>
                    <TestimonialAvatar>
                      <TestimonialAvatarImg
                        className="grayscale transition-[filter] duration-300 ease-[cubic-bezier(0.42,0,0.58,1)] group-hover/testimonial:grayscale-0"
                        src={item.authorAvatar}
                        alt={item.authorName}
                      />
                      <TestimonialAvatarRing />
                    </TestimonialAvatar>

                    <TestimonialAuthorName>
                      <a href={item.url} target="_blank" rel="noopener">
                        <span className="absolute inset-0" aria-hidden />
                        {item.authorName}
                      </a>
                    </TestimonialAuthorName>
                    <TestimonialAuthorTagline>
                      {item.authorTagline}
                    </TestimonialAuthorTagline>
                  </TestimonialAuthor>
                </Testimonial>
              </li>
            ))}
          </ul>
        </div>

        <div className="h-4" />
      </div>
    </>
  )
}
