import { GlowCard, GlowCardGrid } from "@/registry/components/glow-card-grid"

export default function GlowCardGridDemo() {
  return (
    <div className="w-full p-4">
      <GlowCardGrid>
        {CARDS.map((card) => (
          <GlowCard
            key={card.name}
            name={card.name}
            handle={card.handle}
            avatar={card.avatar}
          />
        ))}
      </GlowCardGrid>
    </div>
  )
}

const CARDS = [
  {
    name: "shadcn",
    handle: "@shadcn",
    avatar: "/avatars/avatar-01.svg",
  },
  {
    name: "OrcDev",
    handle: "@orcdev",
    avatar: "/avatars/avatar-03.svg",
  },
  {
    name: "David Haz",
    handle: "@davidhaz",
    avatar: "/avatars/avatar-04.svg",
  },
  {
    name: "Shu",
    handle: "@shuding",
    avatar: "/avatars/avatar-05.svg",
  },
  {
    name: "Emil Kowalski",
    handle: "@emilkowalski",
    avatar: "/avatars/avatar-06.svg",
  },
  {
    name: "Shakil Ahmed",
    handle: "@itzxhakil",
    avatar: "/profile/shakil.webp",
  },
]
