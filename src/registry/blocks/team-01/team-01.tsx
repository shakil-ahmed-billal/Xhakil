import { GlowCard, GlowCardGrid } from "@/registry/components/glow-card-grid"

export default function Team01() {
  return (
    <div className="container px-4 py-8">
      <GlowCardGrid className="lg:grid-cols-4">
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
    name: "Evil Rabbit",
    handle: "@evilrabbit_",
    avatar: "/avatars/avatar-02.svg",
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
    name: "Aaron",
    handle: "@aaronmahlke",
    avatar: "/avatars/avatar-07.svg",
  },
  {
    name: "Shakil Ahmed",
    handle: "@itzxhakil",
    avatar: "/profile/shakil.webp",
  },
]
