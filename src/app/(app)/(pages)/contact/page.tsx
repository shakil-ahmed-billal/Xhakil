import type { Metadata } from "next"
import type { ContactPage as ContactPageSchema, WithContext } from "schema-dts"

import { JSON_LD_ID } from "@/config/json-ld"
import { X_HANDLE } from "@/config/site"
import { jsonLdBreadcrumbList, JsonLdScript } from "@/lib/json-ld"
import { absoluteUrl } from "@/lib/utils"
import {
  PageHeading,
  PageHeadingDescription,
  PageHeadingTagline,
  PageHeadingTitle,
} from "@/components/page-heading"
import { ContactForm } from "@/features/portfolio/components/contact-form"
import { SocialLinks } from "@/features/portfolio/components/social-links"
import { USER } from "@/features/portfolio/data/user"

const title = "Contact"
const description = `Get in touch with ${USER.displayName}. Find email, social profiles, or send a direct message.`

const ogImage = `/og/simple?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    url: "/contact",
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

function getContactPageJsonLd(): WithContext<ContactPageSchema> {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": absoluteUrl("/contact"),
    name: title,
    description,
    url: absoluteUrl("/contact"),
    mainEntity: { "@id": JSON_LD_ID.person },
  }
}

export default function ContactPage() {
  return (
    <>
      <JsonLdScript data={getContactPageJsonLd()} />
      <JsonLdScript
        data={jsonLdBreadcrumbList([
          {
            name: "Home",
            href: "/",
          },
          {
            name: "Contact",
            href: "/contact",
          },
        ])}
      />

      <div>
        <PageHeading>
          <PageHeadingTagline>Contact</PageHeadingTagline>
          <PageHeadingTitle>Let&apos;s build something great.</PageHeadingTitle>
          <PageHeadingDescription>{description}</PageHeadingDescription>
        </PageHeading>

        <div className="h-4" />
        <div className="screen-line-bottom h-px" />

        <div className="space-y-8 p-6 md:p-8">
          <div className="mx-auto max-w-xl">
            <h2 className="mb-4 text-base font-medium tracking-tight">
              Send a message
            </h2>
            <ContactForm />
          </div>
        </div>

        <div className="screen-line-top screen-line-bottom">
          <SocialLinks />
        </div>

        <div className="screen-line-top h-4" />
      </div>
    </>
  )
}
