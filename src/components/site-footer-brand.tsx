"use client"

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react"

import {
  Dimension,
  DimensionExtensionLine,
  DimensionLine,
} from "@/components/dimension"

const VIEWBOX_WIDTH = 1600

export function SiteFooterInteractiveLogotype() {
  const shouldReduceMotion = useReducedMotion()

  const gradientX1Raw = useMotionValue(0.5)
  const gradientX1 = useSpring(
    useTransform(gradientX1Raw, [0, 1], [0, VIEWBOX_WIDTH]),
    {
      stiffness: 150,
      damping: 25,
    }
  )

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return

    const containerRect = event.currentTarget.getBoundingClientRect()
    gradientX1Raw.set(
      (event.clientX - containerRect.left) / containerRect.width
    )
  }

  const handleMouseLeave = () => {
    if (shouldReduceMotion) return
    gradientX1Raw.set(0.5)
  }

  return (
    <>
      <div className="screen-line-bottom after:z-1 after:bg-foreground/15">
        <div
          className="overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex w-full translate-y-[20%] items-center justify-center">
            <svg
              className="container size-full max-h-72"
              viewBox="0 0 1600 1000"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <use href="#logotype-glyphs" fill="url(#logotype-hatch)" />

              <use href="#logotype-outline" className="stroke-background" />
              <use href="#logotype-glyphs" fill="url(#logotype-gradient)" />
              <use href="#logotype-outline" className="stroke-foreground/10" />
              <defs>
                <g id="logotype-glyphs">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M200 0h400v200H200ZM1000 0h400v200H1000ZM0 800h400v200H0ZM1000 500h400v200H1000ZM0 200h200v400H0ZM400 400h200v400H400ZM800 200h200v800H800ZM1400 200h200v800H1400ZM200 400h200v200H200Z"
                  />
                </g>

                <path
                  id="logotype-outline"
                  d="M200 0h400v200H200ZM1000 0h400v200H1000ZM0 800h400v200H0ZM1000 500h400v200H1000ZM0 200h200v400H0ZM400 400h200v400H400ZM800 200h200v800H800ZM1400 200h200v800H1400ZM200 400h200v200H200Z"
                  strokeWidth="3.5"
                />

                <pattern
                  id="logotype-hatch"
                  x="1"
                  y="1"
                  width="16"
                  height="16"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    className="stroke-line"
                    d="M-2 2l4-4M0 16l16-16M14 18l4-4"
                    strokeWidth="2"
                  />
                </pattern>

                <motion.linearGradient
                  id="logotype-gradient"
                  x1={gradientX1}
                  y1="1"
                  x2="800"
                  y2="999"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop
                    offset="0.625"
                    stopColor="var(--foreground)"
                    stopOpacity="0"
                  />
                  <stop offset="1" stopColor="var(--foreground)" />
                </motion.linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <div
          className="pointer-events-none absolute bottom-0 left-1/2 hidden h-px w-[50%] max-w-full -translate-x-1/2 dark:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0) 0%, rgba(228, 228, 231, 0.3) 50%, rgba(0, 0, 0, 0) 100%)",
          }}
          aria-hidden
        />
      </div>

      <LogotypeWidthDimension />
    </>
  )
}

function LogotypeWidthDimension() {
  return (
    <Dimension className="relative container mx-auto h-8">
      <DimensionExtensionLine className="top-1 bottom-0 left-0" />
      <DimensionExtensionLine className="top-1 right-0 bottom-0" />

      <DimensionLine className="absolute inset-x-0 bottom-0">
        {VIEWBOX_WIDTH}
      </DimensionLine>
    </Dimension>
  )
}
