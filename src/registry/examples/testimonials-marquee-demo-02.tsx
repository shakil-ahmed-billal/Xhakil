import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/kibo-ui/marquee"
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

export default function TestimonialsMarqueeDemo2() {
  return (
    <div className="w-full space-y-4 bg-background [&_.rfm-initial-child-container]:items-stretch! [&_.rfm-marquee]:items-stretch!">
      {[TESTIMONIALS_1, TESTIMONIALS_2].map((list, index) => (
        <Marquee key={index} className="border-y border-line">
          <MarqueeFade side="left" />
          <MarqueeFade side="right" />

          <MarqueeContent direction={index % 2 === 1 ? "right" : "left"}>
            {list.map((item) => (
              <MarqueeItem
                key={item.url}
                className="mx-0 h-full w-xs border-r border-line"
              >
                <a
                  className="block h-full transition-[background-color] ease-out hover:bg-accent/20"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Testimonial>
                    <TestimonialQuote className="font-serif">
                      <p>{item.quote}</p>
                    </TestimonialQuote>

                    <TestimonialAuthor>
                      <TestimonialAvatar>
                        <TestimonialAvatarImg src={item.authorAvatar} />
                        <TestimonialAvatarRing />
                      </TestimonialAvatar>

                      <TestimonialAuthorName>
                        {item.authorName}
                      </TestimonialAuthorName>

                      <TestimonialAuthorTagline>
                        {item.authorTagline}
                      </TestimonialAuthorTagline>
                    </TestimonialAuthor>
                  </Testimonial>
                </a>
              </MarqueeItem>
            ))}
          </MarqueeContent>
        </Marquee>
      ))}
    </div>
  )
}

const TESTIMONIALS_1 = [
  {
    authorAvatar: "/avatars/avatar-01.svg",
    authorName: "Marcus Vance",
    authorTagline: "CTO at ApexDigital",
    url: "https://linkedin.com/in/shakil-ahmed-billal",
    quote:
      "Shakil rebuilt our core SaaS portal with Next.js and Prisma. The architecture is modular and blazingly fast.",
  },
  {
    authorAvatar: "/avatars/avatar-02.svg",
    authorName: "Sarah Jenkins",
    authorTagline: "VP of Product at CloudNest",
    url: "https://linkedin.com/in/shakil-ahmed-billal",
    quote:
      "One of the most dependable full-stack engineers we’ve worked with. Proactive problem solver with high standards.",
  },
  {
    authorAvatar: "/avatars/avatar-03.svg",
    authorName: "Daniel Kim",
    authorTagline: "Founder & CEO at HyperScale",
    url: "https://linkedin.com/in/shakil-ahmed-billal",
    quote:
      "Shakil's full-stack expertise is top tier. From Postgres database optimization to backend auth, everything was flawless.",
  },
  {
    authorAvatar: "/avatars/avatar-04.svg",
    authorName: "Elena Rostova",
    authorTagline: "Product Lead at Finova",
    url: "https://linkedin.com/in/shakil-ahmed-billal",
    quote:
      "He took our Figma design system and delivered a pixel-perfect, accessible dashboard well ahead of schedule.",
  },
  {
    authorAvatar: "/avatars/avatar-05.svg",
    authorName: "Liam Davies",
    authorTagline: "Co-Founder at SwiftFlow",
    url: "https://linkedin.com/in/shakil-ahmed-billal",
    quote:
      "Shakil helped us scale our MVP to handle over 100k active users without a hitch. His Next.js skills are world-class.",
  },
  {
    authorAvatar: "/avatars/avatar-06.svg",
    authorName: "Chloe Martin",
    authorTagline: "Engineering Manager at SyncWave",
    url: "https://linkedin.com/in/shakil-ahmed-billal",
    quote:
      "Shakil delivers clean, maintainable TypeScript that our in-house team loved reading. Zero bloat and rock-solid tests.",
  },
  {
    authorAvatar: "/avatars/avatar-07.svg",
    authorName: "Alex Lindqvist",
    authorTagline: "Founder at SaaSLaunch",
    url: "https://linkedin.com/in/shakil-ahmed-billal",
    quote:
      "Shakil engineered our workflow engine from scratch. His speed, architectural clarity, and problem-solving saved us months.",
  },
]

const TESTIMONIALS_2 = [
  {
    authorAvatar: "/avatars/avatar-08.svg",
    authorName: "Michael Chang",
    authorTagline: "Founder at QuickSaaS",
    url: "https://linkedin.com/in/shakil-ahmed-billal",
    quote: "Exceptional engineering and super clean code!",
  },
  {
    authorAvatar: "/avatars/avatar-09.svg",
    authorName: "Hannah Schmidt",
    authorTagline: "Product Lead at BerlinWorks",
    url: "https://linkedin.com/in/shakil-ahmed-billal",
    quote: "Pixel-perfect implementation of our design.",
  },
  {
    authorAvatar: "/avatars/avatar-10.svg",
    authorName: "Benjamin Carter",
    authorTagline: "Head of Growth at ElevateHQ",
    url: "https://linkedin.com/in/shakil-ahmed-billal",
    quote: "Delivered our MVP two weeks ahead of time!",
  },
  {
    authorAvatar: "/avatars/avatar-11.svg",
    authorName: "Jessica Taylor",
    authorTagline: "COO at OmniTrack",
    url: "https://linkedin.com/in/shakil-ahmed-billal",
    quote: "Brilliant engineer. The portal is lightning fast.",
  },
  {
    authorAvatar: "/avatars/avatar-12.svg",
    authorName: "Thomas Evans",
    authorTagline: "Lead Engineer at PeakVelocity",
    url: "https://linkedin.com/in/shakil-ahmed-billal",
    quote: "Top-tier Next.js and TypeScript execution.",
  },
  {
    authorAvatar: "/avatars/avatar-13.svg",
    authorName: "Lucas Rossi",
    authorTagline: "Founder at ByteCraft Studio",
    url: "https://linkedin.com/in/shakil-ahmed-billal",
    quote: "Best contractor experience we have had so far.",
  },
]
