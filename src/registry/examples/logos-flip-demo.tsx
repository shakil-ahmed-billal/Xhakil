import { LogosFlip } from "@/registry/components/logos-flip"

const DEMO_LOGOS = [
  { name: "Alpha", label: "Alpha" },
  { name: "Beta", label: "Beta" },
  { name: "Gamma", label: "Gamma" },
  { name: "Delta", label: "Delta" },
  { name: "Epsilon", label: "Epsilon" },
  { name: "Zeta", label: "Zeta" },
  { name: "Eta", label: "Eta" },
  { name: "Theta", label: "Theta" },
]

export default function LogosFlipDemo() {
  return (
    <LogosFlip className="w-full text-foreground [--column-count:2] sm:[--column-count:4]">
      {DEMO_LOGOS.map((item) => (
        <div
          key={item.name}
          className="flex h-12 w-full items-center justify-center rounded-lg border bg-muted/40 font-mono text-sm font-semibold"
        >
          {item.label}
        </div>
      ))}
    </LogosFlip>
  )
}
