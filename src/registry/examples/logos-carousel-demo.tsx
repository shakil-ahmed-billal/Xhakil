import { LogosCarousel } from "@/registry/components/logos-carousel"

const DEMO_LOGOS = [
  { name: "Alpha", label: "Alpha" },
  { name: "Beta", label: "Beta" },
  { name: "Gamma", label: "Gamma" },
  { name: "Delta", label: "Delta" },
  { name: "Epsilon", label: "Epsilon" },
  { name: "Zeta", label: "Zeta" },
]

export default function LogosCarouselDemo() {
  return (
    <LogosCarousel className="w-full py-4 text-foreground">
      {DEMO_LOGOS.map((item) => (
        <div
          key={item.name}
          className="flex h-12 w-28 items-center justify-center rounded-lg border bg-muted/40 font-mono text-sm font-semibold"
        >
          {item.label}
        </div>
      ))}
    </LogosCarousel>
  )
}
