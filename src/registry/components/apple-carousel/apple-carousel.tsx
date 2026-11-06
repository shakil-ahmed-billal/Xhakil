"use client"

import {
  Children,
  createContext,
  isValidElement,
  use,
  useEffect,
  useEffectEvent,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react"
import type { ComponentProps, KeyboardEvent, RefObject } from "react"
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
} from "motion/react"
import type { AnimationPlaybackControls, Transition } from "motion/react"

import { cn } from "@/lib/utils"

const CLONE_COUNT = 4

const SETTLE_DELAY = 150

const SCROLL_BASE_DURATION = 0.5
const SCROLL_EXTRA_CARD_DURATION = 0.1
const SCROLL_MAX_DURATION = 0.9

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"

function subscribeReducedMotion(callback: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY)
  mql.addEventListener("change", callback)
  return () => mql.removeEventListener("change", callback)
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false
  )
}

const subscribeNothing = () => () => {}

function useIsHydrated() {
  return useSyncExternalStore(
    subscribeNothing,
    () => true,
    () => false
  )
}

function getSlides(viewport: HTMLElement) {
  return Array.from(viewport.firstElementChild?.children ?? []) as HTMLElement[]
}

function getSnapLeft(viewport: HTMLElement, slide: HTMLElement) {
  let left: number
  if (getComputedStyle(slide).scrollSnapAlign.startsWith("start")) {
    const padding = parseFloat(
      getComputedStyle(viewport).scrollPaddingInlineStart
    )
    left = slide.offsetLeft - (padding || 0)
  } else {
    left = slide.offsetLeft - (viewport.clientWidth - slide.offsetWidth) / 2
  }

  const maxLeft = viewport.scrollWidth - viewport.clientWidth
  return Math.min(Math.max(left, 0), maxLeft)
}

function getNearestSlide(viewport: HTMLElement, currentIndex: number) {
  let nearest: HTMLElement | undefined
  let minDistance = Infinity

  for (const slide of getSlides(viewport)) {
    const distance = Math.abs(
      getSnapLeft(viewport, slide) - viewport.scrollLeft
    )

    const isTie = Math.abs(distance - minDistance) < 1
    if (
      (distance < minDistance && !isTie) ||
      (isTie && slide.dataset.index === String(currentIndex))
    ) {
      minDistance = distance
      nearest = slide
    }
  }

  return nearest
}

function getRealSlide(viewport: HTMLElement, index: number) {
  return getSlides(viewport).find(
    (slide) =>
      !slide.hasAttribute("data-clone") && slide.dataset.index === String(index)
  )
}

type AppleCarouselContextValue = {
  id: string
  index: number
  loop: boolean
  isPlaying: boolean
  prefersReducedMotion: boolean
  viewportRef: RefObject<HTMLDivElement | null>
  progressFillRef: RefObject<HTMLSpanElement | null>
  goTo: (index: number) => void
  play: () => void
  pause: () => void
}

const AppleCarouselContext = createContext<AppleCarouselContextValue | null>(
  null
)

function useAppleCarousel() {
  const context = use(AppleCarouselContext)
  if (!context) {
    throw new Error("AppleCarousel parts must be used within AppleCarouselRoot")
  }
  return context
}

type AppleCarouselItemState = {
  index: number

  isCurrent: boolean

  isClone: boolean
}

const AppleCarouselItemContext = createContext<Omit<
  AppleCarouselItemState,
  "isCurrent"
> | null>(null)

function useAppleCarouselItem(): AppleCarouselItemState {
  const { index: currentIndex } = useAppleCarousel()
  const item = use(AppleCarouselItemContext)
  if (!item) {
    throw new Error(
      "useAppleCarouselItem must be used inside an item of AppleCarouselContent"
    )
  }

  return { ...item, isCurrent: item.index === currentIndex }
}

const AppleCarouselTabContext = createContext<{
  index: number
  count: number
} | null>(null)

type Playback = "auto" | "playing" | "paused"

type AppleCarouselRootProps = ComponentProps<"div"> & {
  duration?: number

  loop?: boolean
}

function AppleCarouselRoot({
  duration = 5000,
  loop = true,
  className,
  ...props
}: AppleCarouselRootProps) {
  const id = useId()
  const viewportRef = useRef<HTMLDivElement>(null)
  const progressFillRef = useRef<HTMLSpanElement>(null)

  const [index, setIndex] = useState(0)
  const [playback, setPlayback] = useState<Playback>("auto")
  const isInView = useInView(viewportRef, { amount: 0.25 })
  const prefersReducedMotion = usePrefersReducedMotion()
  const isPlaying =
    isInView &&
    (playback === "playing" || (playback === "auto" && !prefersReducedMotion))

  const ignoreScrollUntilRef = useRef(0)
  const scrollAnimationRef = useRef<AnimationPlaybackControls | null>(null)
  const progressAnimationRef = useRef<Animation | null>(null)
  const scrollLeft = useMotionValue(0)

  const play = () => {
    const timing = progressAnimationRef.current?.effect?.getComputedTiming()
    if (timing?.progress === 1) goTo(0)
    setPlayback("playing")
  }

  const pause = () => setPlayback("paused")

  const isOwnScroll = () =>
    scrollAnimationRef.current !== null ||
    performance.now() < ignoreScrollUntilRef.current

  const writeScrollLeft = (value: number) => {
    const viewport = viewportRef.current
    if (!viewport) return
    ignoreScrollUntilRef.current = performance.now() + SETTLE_DELAY
    viewport.scrollLeft = value
  }

  useMotionValueEvent(scrollLeft, "change", writeScrollLeft)

  const setScrollAnimation = (controls: AnimationPlaybackControls | null) => {
    scrollAnimationRef.current = controls

    viewportRef.current?.toggleAttribute("data-animating", controls !== null)
  }

  const stopScrollAnimation = () => {
    scrollAnimationRef.current?.stop()
    setScrollAnimation(null)
  }

  const syncFromScroll = () => {
    if (scrollAnimationRef.current) return
    const viewport = viewportRef.current
    const slide = viewport && getNearestSlide(viewport, index)
    if (slide) setIndex(Number(slide.dataset.index))
  }

  const wrapFromClone = () => {
    const viewport = viewportRef.current
    const slide = viewport && getNearestSlide(viewport, index)
    if (!viewport || !slide?.hasAttribute("data-clone")) return

    const realSlide = getRealSlide(viewport, Number(slide.dataset.index))
    if (realSlide) writeScrollLeft(getSnapLeft(viewport, realSlide))
  }

  const scrollToSlide = (slide: HTMLElement) => {
    const viewport = viewportRef.current
    if (!viewport) return

    setIndex(Number(slide.dataset.index))

    const to = getSnapLeft(viewport, slide)
    const distance = Math.abs(to - viewport.scrollLeft)

    if (prefersReducedMotion || distance < 1) {
      stopScrollAnimation()
      writeScrollLeft(to)
      wrapFromClone()
      return
    }

    if (!scrollAnimationRef.current) scrollLeft.jump(viewport.scrollLeft)

    const cardsToTravel = Math.max(distance / slide.offsetWidth, 1)
    const controls = animate(scrollLeft, to, {
      type: "spring",
      bounce: 0,
      visualDuration: Math.min(
        SCROLL_BASE_DURATION + (cardsToTravel - 1) * SCROLL_EXTRA_CARD_DURATION,
        SCROLL_MAX_DURATION
      ),
      onComplete: () => {
        if (scrollAnimationRef.current !== controls) return
        setScrollAnimation(null)
        wrapFromClone()
      },
    })
    setScrollAnimation(controls)
  }

  const goTo = (next: number) => {
    const viewport = viewportRef.current
    const slide = viewport && getRealSlide(viewport, next)
    if (slide) scrollToSlide(slide)
  }

  const goNext = () => {
    const viewport = viewportRef.current
    if (!viewport) return
    const next = getNearestSlide(viewport, index)?.nextElementSibling
    if (next instanceof HTMLElement) scrollToSlide(next)
    else pause()
  }

  const onViewportScroll = useEffectEvent(() => {
    if (isPlaying && !isOwnScroll()) pause()
    syncFromScroll()
  })

  const onViewportSettled = useEffectEvent(() => {
    if (!isOwnScroll()) wrapFromClone()
  })

  const onViewportInput = useEffectEvent(() => {
    stopScrollAnimation()
    pause()
  })

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    let frame: number | null = null
    let settleTimer: ReturnType<typeof setTimeout> | undefined

    const handleScroll = () => {
      if (frame === null) {
        frame = requestAnimationFrame(() => {
          frame = null
          onViewportScroll()
        })
      }

      clearTimeout(settleTimer)
      settleTimer = setTimeout(onViewportSettled, SETTLE_DELAY)
    }

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) onViewportInput()
    }

    viewport.addEventListener("scroll", handleScroll, { passive: true })
    viewport.addEventListener("scrollend", onViewportSettled)
    viewport.addEventListener("pointerdown", onViewportInput)
    viewport.addEventListener("wheel", handleWheel, { passive: true })

    return () => {
      viewport.removeEventListener("scroll", handleScroll)
      viewport.removeEventListener("scrollend", onViewportSettled)
      viewport.removeEventListener("pointerdown", onViewportInput)
      viewport.removeEventListener("wheel", handleWheel)
      if (frame !== null) cancelAnimationFrame(frame)
      clearTimeout(settleTimer)
    }
  }, [])

  const onProgressFinish = useEffectEvent(goNext)

  useEffect(() => {
    const animation = new Animation(
      new KeyframeEffect(
        progressFillRef.current,
        [{ scale: "0 1" }, { scale: "1 1" }],
        { duration, fill: "forwards" }
      )
    )
    animation.onfinish = onProgressFinish
    progressAnimationRef.current = animation

    return () => {
      animation.cancel()
      progressAnimationRef.current = null
    }
  }, [index, duration])

  useEffect(() => {
    const animation = progressAnimationRef.current
    if (!animation) return
    if (isPlaying) animation.play()
    else animation.pause()
  }, [index, duration, isPlaying])

  return (
    <AppleCarouselContext
      value={{
        id,
        index,
        loop,
        isPlaying,
        prefersReducedMotion,
        viewportRef,
        progressFillRef,
        goTo,
        play,
        pause,
      }}
    >
      <div
        data-slot="apple-carousel"
        data-playing={isPlaying ? "" : undefined}
        className={cn("@container relative w-full", className)}
        {...props}
      />
    </AppleCarouselContext>
  )
}

function AppleCarouselContent({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  const { index, loop, viewportRef } = useAppleCarousel()
  const isHydrated = useIsHydrated()

  const items = Children.toArray(children).filter(isValidElement)
  const count = items.length

  const cloneCount =
    loop && isHydrated && count > 1 ? Math.min(CLONE_COUNT, count) : 0

  const alignToCurrent = useEffectEvent(() => {
    const viewport = viewportRef.current
    const slide = viewport && getRealSlide(viewport, index)
    if (viewport && slide) viewport.scrollLeft = getSnapLeft(viewport, slide)
  })

  useLayoutEffect(() => {
    alignToCurrent()
  }, [cloneCount])

  return (
    <div
      ref={viewportRef}
      data-slot="apple-carousel-content"
      className={cn(
        "relative no-scrollbar snap-x snap-mandatory overflow-x-auto overflow-y-hidden data-animating:snap-none",
        "[--apple-carousel-gap:--spacing(5)] [--apple-carousel-item-width:min(max(87.5cqw,var(--container-3xs)),var(--container-6xl))] [--apple-carousel-padding:max(6.25cqw,(100cqw-var(--container-6xl))/2)]",
        "@max-3xl:scroll-ps-(--apple-carousel-padding) @max-3xl:[--apple-carousel-item-width:calc(max(87.5cqw,var(--container-3xs))-var(--apple-carousel-gap))]",
        className
      )}
      {...props}
    >
      <ul
        role="list"
        data-slot="apple-carousel-list"
        className="mx-auto grid w-fit grid-flow-col gap-(--apple-carousel-gap) px-(--apple-carousel-padding)"
      >
        {items.slice(count - cloneCount).map((item, i) => (
          <AppleCarouselItemContext
            key={`${item.key}-leading`}
            value={{ index: count - cloneCount + i, isClone: true }}
          >
            {item}
          </AppleCarouselItemContext>
        ))}
        {items.map((item, i) => (
          <AppleCarouselItemContext
            key={item.key}
            value={{ index: i, isClone: false }}
          >
            {item}
          </AppleCarouselItemContext>
        ))}
        {items.slice(0, cloneCount).map((item, i) => (
          <AppleCarouselItemContext
            key={`${item.key}-trailing`}
            value={{ index: i, isClone: true }}
          >
            {item}
          </AppleCarouselItemContext>
        ))}
      </ul>
    </div>
  )
}

function AppleCarouselItem({ className, ...props }: ComponentProps<"li">) {
  const { id } = useAppleCarousel()
  const { index, isCurrent, isClone } = useAppleCarouselItem()

  return (
    <li
      id={isClone ? undefined : `${id}-item-${index}`}
      role={isClone ? undefined : "tabpanel"}
      aria-labelledby={isClone ? undefined : `${id}-tab-${index}`}

      inert={isClone || !isCurrent}
      tabIndex={isCurrent && !isClone ? 0 : -1}
      data-slot="apple-carousel-item"
      data-index={index}
      data-clone={isClone ? "" : undefined}
      data-current={isCurrent ? "" : undefined}
      className={cn(
        "relative h-152 w-(--apple-carousel-item-width) snap-center overflow-hidden rounded-4xl bg-muted data-clone:snap-always",
        "@max-5xl:h-140 @max-3xl:h-152 @max-3xl:snap-start",
        "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
        className
      )}
      {...props}
    />
  )
}

type AppleCarouselControlsProps = ComponentProps<"div"> & {
  size?: "default" | "sm"
}

function AppleCarouselControls({
  size = "default",
  className,
  ...props
}: AppleCarouselControlsProps) {
  return (
    <div
      data-slot="apple-carousel-controls"
      data-size={size}
      className={cn(
        "group/apple-carousel-controls flex items-center justify-center gap-3 pt-6 data-[size=sm]:gap-2 data-[size=sm]:pt-4",
        className
      )}
      {...props}
    />
  )
}

function AppleCarouselTabList({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  const tabs = Children.toArray(children).filter(isValidElement)

  return (
    <div
      role="tablist"
      data-slot="apple-carousel-tab-list"
      className={cn(
        "flex h-14 items-center rounded-full bg-muted px-4 group-data-[size=sm]/apple-carousel-controls:h-11 group-data-[size=sm]/apple-carousel-controls:px-3",
        className
      )}
      {...props}
    >
      {tabs.map((tab, index) => (
        <AppleCarouselTabContext
          key={tab.key}
          value={{ index, count: tabs.length }}
        >
          {tab}
        </AppleCarouselTabContext>
      ))}
    </div>
  )
}

function AppleCarouselTab({
  className,
  children,
  onClick,
  onFocus,
  onKeyDown,
  ...props
}: ComponentProps<"button">) {
  const {
    id,
    index: currentIndex,
    isPlaying,
    progressFillRef,
    goTo,
    pause,
  } = useAppleCarousel()
  const tab = use(AppleCarouselTabContext)
  if (!tab) {
    throw new Error(
      "AppleCarouselTab must be a direct child of AppleCarouselTabList"
    )
  }

  const { index, count } = tab
  const isCurrent = index === currentIndex

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event)
    if (event.defaultPrevented) return

    let next: number
    switch (event.key) {
      case "ArrowLeft":
        next = (index - 1 + count) % count
        break
      case "ArrowRight":
        next = (index + 1) % count
        break
      case "Home":
        next = 0
        break
      case "End":
        next = count - 1
        break
      default:
        return
    }

    event.preventDefault()
    goTo(next)
    event.currentTarget
      .closest('[role="tablist"]')
      ?.querySelectorAll<HTMLElement>('[role="tab"]')
      [next]?.focus()
  }

  return (
    <button
      type="button"
      role="tab"
      id={`${id}-tab-${index}`}
      aria-controls={`${id}-item-${index}`}
      aria-selected={isCurrent}
      tabIndex={isCurrent ? 0 : -1}
      data-slot="apple-carousel-tab"
      data-current={isCurrent ? "" : undefined}
      className={cn(
        "relative mx-2 size-2 overflow-hidden rounded-full bg-muted-foreground not-data-current:hover:bg-foreground",

        "transition-[width,background-color] duration-[400ms,150ms] ease-[cubic-bezier(0.645,0.045,0.355,1),ease]",
        "motion-reduce:transition-colors motion-reduce:duration-150 motion-reduce:ease-[ease]",
        "data-current:w-12 group-data-[size=sm]/apple-carousel-controls:data-current:w-6 @max-3xl:data-current:w-8",
        "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring",
        className
      )}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) goTo(index)
      }}
      onFocus={(event) => {
        onFocus?.(event)
        if (isPlaying && event.currentTarget.matches(":focus-visible")) pause()
      }}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <span
        ref={isCurrent ? progressFillRef : undefined}
        aria-hidden
        data-slot="apple-carousel-tab-progress"
        className="absolute inset-0 origin-left scale-x-0 rounded-[inherit] bg-foreground"
      />
      <span className="sr-only">{children}</span>
    </button>
  )
}

const ICON_STROKE_WIDTH = 2.5

const PAUSE_ICON = {
  left: "M5.5 5.5L8.5 5.5L8.5 18.5L5.5 18.5Z",
  right: "M15.5 5.5L18.5 5.5L18.5 18.5L15.5 18.5Z",
} as const

const PLAY_ICON = {
  left: "M7.5 5.87L13 9.08L13 14.92L7.5 18.13Z",
  right: "M13 9.08L18.01 12L18.01 12L13 14.92Z",
} as const

const ICON_TRANSITION: Transition = {
  type: "spring",
  visualDuration: 0.3,
  bounce: 0,
}

const INSTANT_TRANSITION: Transition = { duration: 0 }

function AppleCarouselPlayButton({
  className,
  onClick,
  ...props
}: ComponentProps<"button">) {
  const { isPlaying, prefersReducedMotion, play, pause } = useAppleCarousel()

  const icon = isPlaying ? PAUSE_ICON : PLAY_ICON
  const transition = prefersReducedMotion ? INSTANT_TRANSITION : ICON_TRANSITION

  return (
    <button
      type="button"
      aria-label={isPlaying ? "Pause gallery" : "Play gallery"}
      data-slot="apple-carousel-play-button"
      className={cn(
        "flex size-14 items-center justify-center rounded-full bg-muted text-foreground group-data-[size=sm]/apple-carousel-controls:size-11",
        "transition-[background-color,scale] duration-150 ease-out hover:bg-muted/80 active:scale-97 motion-reduce:active:scale-100",
        "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring",
        className
      )}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        if (isPlaying) pause()
        else play()
      }}
      {...props}
    >
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={ICON_STROKE_WIDTH}
        strokeLinejoin="round"
        className="size-6 group-data-[size=sm]/apple-carousel-controls:size-5"
      >
        <motion.path
          initial={false}
          animate={{ d: icon.left }}
          transition={transition}
        />
        <motion.path
          initial={false}
          animate={{ d: icon.right }}
          transition={transition}
        />
      </svg>
    </button>
  )
}

export {
  AppleCarouselContent,
  AppleCarouselControls,
  AppleCarouselItem,
  AppleCarouselPlayButton,
  AppleCarouselRoot,
  AppleCarouselTab,
  AppleCarouselTabList,
  useAppleCarouselItem,
}
export type {
  AppleCarouselControlsProps,
  AppleCarouselItemState,
  AppleCarouselRootProps,
}
