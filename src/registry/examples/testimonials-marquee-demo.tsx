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

export default function TestimonialsMarqueeDemo() {
  return (
    <div className="w-full bg-background">
      <Marquee
        data-slot="marquee"
        className="border-y border-line [&_.rfm-initial-child-container]:items-stretch! [&_.rfm-marquee]:items-stretch!"
      >
        <MarqueeFade side="left" />
        <MarqueeFade side="right" />

        <MarqueeContent>
          {TESTIMONIALS.map((item) => (
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
    </div>
  )
}

const TESTIMONIALS = [
  {
    authorAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    authorName: "Marcus Vance",
    authorTagline: "CTO at ApexDigital",
    url: "https://linkedin.com/in/shakil-ahmed-billal",
    quote:
      "Shakil rebuilt our core SaaS portal with Next.js and Prisma. The architecture is modular and blazingly fast.",
  },
  {
    authorAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    authorName: "Sarah Jenkins",
    authorTagline: "VP of Product at CloudNest",
    url: "https://linkedin.com/in/shakil-ahmed-billal",
    quote:
      "One of the most dependable full-stack engineers we’ve worked with. Proactive problem solver with high standards.",
  },
  {
    authorAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    authorName: "Daniel Kim",
    authorTagline: "Founder & CEO at HyperScale",
    url: "https://linkedin.com/in/shakil-ahmed-billal",
    quote:
      "Shakil's full-stack expertise is top tier. From Postgres database optimization to backend auth, everything was flawless.",
  },
  {
    authorAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    authorName: "Elena Rostova",
    authorTagline: "Product Lead at Finova",
    url: "https://linkedin.com/in/shakil-ahmed-billal",
    quote:
      "He took our Figma design system and delivered a pixel-perfect, accessible dashboard well ahead of schedule.",
  },
  {
    authorAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
    authorName: "Liam Davies",
    authorTagline: "Co-Founder at SwiftFlow",
    url: "https://linkedin.com/in/shakil-ahmed-billal",
    quote:
      "Shakil helped us scale our MVP to handle over 100k active users without a hitch. His Next.js skills are world-class.",
  },
  {
    authorAvatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
    authorName: "Chloe Martin",
    authorTagline: "Engineering Manager at SyncWave",
    url: "https://linkedin.com/in/shakil-ahmed-billal",
    quote:
      "Shakil delivers clean, maintainable TypeScript that our in-house team loved reading. Zero bloat and rock-solid tests.",
  },
  {
    authorAvatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80",
    authorName: "Alex Lindqvist",
    authorTagline: "Founder at SaaSLaunch",
    url: "https://linkedin.com/in/shakil-ahmed-billal",
    quote:
      "Shakil engineered our workflow engine from scratch. His speed, architectural clarity, and problem-solving saved us months.",
  },
]
