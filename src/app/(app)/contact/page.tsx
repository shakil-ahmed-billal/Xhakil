import type { Metadata } from "next"

import { USER } from "@/features/portfolio/data/user"
import { SITE_INFO } from "@/config/site"
import { ProfileCover } from "@/features/portfolio/components/profile-cover"
import { AvatarElectricEffect } from "@/features/portfolio/components/avatar-electric-effect"
import { SocialLinks } from "@/features/portfolio/components/social-links-v2"
import { ContactForm } from "@/features/portfolio/components/contact-form"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: `Contact | ${USER.displayName}`,
  description: `Get in touch with ${USER.displayName}. Find email, GitHub, LinkedIn, and other social profiles to connect.`,
  alternates: {
    canonical: "/contact",
  },
}

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    mainEntity: {
      "@type": "Person",
      name: USER.displayName,
      email: "shakil.dev99@gmail.com",
      url: SITE_INFO.url,
      sameAs: [
        "https://github.com/shakil-ahmed-billal",
        "https://linkedin.com/in/shakil-ahmed-billal",
      ],
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="mx-auto md:max-w-3xl *:[[id]]:scroll-mt-22">
        <div className="hidden md:block">
          <ProfileCover />
        </div>
        <Separator />
        <div className="flex flex-col md:flex-row gap-12 border-x border-edge p-6 md:p-12 screen-line-before screen-line-after">
          
          {/* Left Column: Avatar & Info */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-4">
              <AvatarElectricEffect>
                <img
                  className="size-16 rounded-full ring-2 ring-border ring-offset-2 ring-offset-background select-none sm:size-20"
                  alt={USER.displayName}
                  src={USER.avatar}
                  fetchPriority="high"
                />
              </AvatarElectricEffect>
              <div>
                <h1 className="text-xl font-semibold tracking-tight">
                  {USER.displayName}
                </h1>
                <p className="text-muted-foreground font-mono text-sm mt-1">{USER.jobTitle}</p>
              </div>
            </div>

            <div className="prose dark:prose-invert">
              <p className="text-muted-foreground leading-relaxed text-sm">
                I&apos;m always open to discussing product design work, architecture, or partnership opportunities.
                Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold tracking-tight mb-6">Send a Message</h2>
            <ContactForm />
          </div>
        </div>

        <Separator />
        
        <SocialLinks />
        <Separator />
      </div>
    </>
  )
}

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-full border-x border-edge",
        "before:absolute before:-left-[100vw] before:-z-1 before:h-8 before:w-[200vw]",
        "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56",
        className
      )}
    />
  )
}
