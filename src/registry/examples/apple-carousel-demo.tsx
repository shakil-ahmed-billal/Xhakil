import {
  AppleCarouselContent,
  AppleCarouselControls,
  AppleCarouselItem,
  AppleCarouselPlayButton,
  AppleCarouselRoot,
  AppleCarouselTab,
  AppleCarouselTabList,
} from "@/registry/components/apple-carousel"

export default function AppleCarouselDemo() {
  return (
    <AppleCarouselRoot duration={3600}>
      <AppleCarouselContent>
        {ITEMS.map((item) => (
          <AppleCarouselItem
            key={item.image}
            tabIndex={-1}
            className="@max-3xl:h-96"
          >
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block size-full rounded-[inherit] select-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="size-full object-cover"
              />
            </a>
          </AppleCarouselItem>
        ))}
      </AppleCarouselContent>

      <AppleCarouselControls>
        <AppleCarouselTabList aria-label="Places in Viet Nam">
          {ITEMS.map((item) => (
            <AppleCarouselTab key={item.image}>{item.title}</AppleCarouselTab>
          ))}
        </AppleCarouselTabList>
        <AppleCarouselPlayButton />
      </AppleCarouselControls>
    </AppleCarouselRoot>
  )
}

const ITEMS = [
  {
    title: "Quang Ninh",
    image: "/images/screenshot-desktop-dark.png",
    href: "https://en.wikipedia.org/wiki/Quảng_Ninh_province",
  },
  {
    title: "An Giang",
    image: "/images/screenshot-desktop-dark.png",
    href: "https://en.wikipedia.org/wiki/An_Giang_province",
  },
  {
    title: "Ninh Binh",
    image: "/images/screenshot-desktop-dark.png",
    href: "https://en.wikipedia.org/wiki/Ninh_Bình_province",
  },
  {
    title: "Hue",
    image: "/images/screenshot-desktop-dark.png",
    href: "https://en.wikipedia.org/wiki/Huế",
  },
  {
    title: "Ninh Binh",
    image: "/images/screenshot-desktop-dark.png",
    href: "https://en.wikipedia.org/wiki/Ninh_Bình_province",
  },
  {
    title: "Ho Chi Minh City",
    image: "/images/screenshot-desktop-dark.png",
    href: "https://en.wikipedia.org/wiki/Ho_Chi_Minh_City",
  },
  {
    title: "Da Nang",
    image: "/images/screenshot-desktop-dark.png",
    href: "https://en.wikipedia.org/wiki/Da_Nang",
  },
]
