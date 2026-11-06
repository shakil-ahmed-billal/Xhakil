import { LogosSwap } from "@/registry/components/logos-swap"

const DEMO_LOGOS = [
  { name: "Alpha", label: "Alpha" },
  { name: "Beta", label: "Beta" },
  { name: "Gamma", label: "Gamma" },
  { name: "Delta", label: "Delta" },
  { name: "Epsilon", label: "Epsilon" },
  { name: "Zeta", label: "Zeta" },
]

export default function LogosSwapDemo() {
  return (
    <LogosSwap
      columnCount={6}
      className="w-full max-w-2xl gap-x-2 gap-y-4 text-foreground [--column-count:2] sm:[--column-count:3]"
    >
      {DEMO_LOGOS.map((item) => (
        <div
          key={item.name}
          className="flex h-12 w-full items-center justify-center rounded-lg border bg-muted/40 font-mono text-sm font-semibold"
        >
          {item.label}
        </div>
      ))}
    </LogosSwap>
  )
}
