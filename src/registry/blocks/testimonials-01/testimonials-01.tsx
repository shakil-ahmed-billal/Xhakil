import type { TestimonialType } from "@/registry/blocks/testimonials-01/components/testimonial-list"
import { TestimonialList } from "@/registry/blocks/testimonials-01/components/testimonial-list"

export default function Testimonials01() {
  return (
    <div className="flex flex-col gap-2 [&_.rfm-initial-child-container]:items-stretch! [&_.rfm-marquee]:items-stretch!">
      <TestimonialList data={TESTIMONIALS_1} />
      <TestimonialList data={TESTIMONIALS_2} direction="right" />
    </div>
  )
}

const TESTIMONIALS_1: TestimonialType[] = [
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
  {
    authorAvatar: "/avatars/avatar-08.svg",
    authorName: "Rachel Adams",
    authorTagline: "COO at BuildCraft Systems",
    url: "https://linkedin.com/in/shakil-ahmed-billal",
    quote:
      "Responsive, transparent, and remarkably skilled. Shakil diagnosed and resolved critical concurrency bottlenecks.",
  },
]

const TESTIMONIALS_2: TestimonialType[] = [
  {
    authorAvatar: "/avatars/avatar-09.svg",
    authorName: "Michael Chang",
    authorTagline: "Founder at QuickSaaS",
    url: "https://linkedin.com/in/shakil-ahmed-billal",
    quote: "Exceptional engineering and super clean code!",
  },
  {
    authorAvatar: "/avatars/avatar-10.svg",
    authorName: "Hannah Schmidt",
    authorTagline: "Product Lead at BerlinWorks",
    url: "https://linkedin.com/in/shakil-ahmed-billal",
    quote: "Pixel-perfect implementation of our design.",
  },
  {
    authorAvatar: "/avatars/avatar-11.svg",
    authorName: "Benjamin Carter",
    authorTagline: "Head of Growth at ElevateHQ",
    url: "https://linkedin.com/in/shakil-ahmed-billal",
    quote: "Delivered our MVP two weeks ahead of time!",
  },
  {
    authorAvatar: "/avatars/avatar-12.svg",
    authorName: "Jessica Taylor",
    authorTagline: "COO at OmniTrack",
    url: "https://linkedin.com/in/shakil-ahmed-billal",
    quote: "Brilliant engineer. The portal is lightning fast.",
  },
  {
    authorAvatar: "/avatars/avatar-13.svg",
    authorName: "Thomas Evans",
    authorTagline: "Lead Engineer at PeakVelocity",
    url: "https://linkedin.com/in/shakil-ahmed-billal",
    quote: "Top-tier Next.js and TypeScript execution.",
  },
  {
    authorAvatar: "/avatars/avatar-14.svg",
    authorName: "Lucas Rossi",
    authorTagline: "Founder at ByteCraft Studio",
    url: "https://linkedin.com/in/shakil-ahmed-billal",
    quote: "Best contractor experience we have had so far.",
  },
  {
    authorAvatar: "/avatars/avatar-15.svg",
    authorName: "Emily Davis",
    authorTagline: "Director of Ops at StackWave",
    url: "https://linkedin.com/in/shakil-ahmed-billal",
    quote: "Flawless API design and rock-solid code.",
  },
  {
    authorAvatar: "/avatars/avatar-16.svg",
    authorName: "Gabriel Santos",
    authorTagline: "CTO at LumaTech",
    url: "https://linkedin.com/in/shakil-ahmed-billal",
    quote: "Incredible velocity and attention to detail.",
  },
  {
    authorAvatar: "/avatars/avatar-17.svg",
    authorName: "Priya Sharma",
    authorTagline: "Product Director at NovaScale",
    url: "https://linkedin.com/in/shakil-ahmed-billal",
    quote: "Outstanding work on our internal dashboard!",
  },
]
