"use client"

import { useEffect, useId, useRef } from "react"
import type { Transition } from "motion/react"
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react"

import { metalClickSound } from "@/lib/soundcn/metal-click"
import { useSound } from "@/hooks/soundcn/use-sound"

const transition: Transition = {
  type: "spring",
  mass: 0.5,
  damping: 18,
  stiffness: 200,
}

const ISOMETRIC_ANGLE = Math.PI / 6
const ANGLE_RADIUS = 88
const ANGLE_VERTEX = { x: 443.9, y: 0.58 }
const ANGLE_START = { x: ANGLE_VERTEX.x + ANGLE_RADIUS, y: ANGLE_VERTEX.y }
const ANGLE_END = {
  x: ANGLE_VERTEX.x + ANGLE_RADIUS * Math.cos(ISOMETRIC_ANGLE),
  y: ANGLE_VERTEX.y + ANGLE_RADIUS * Math.sin(ISOMETRIC_ANGLE),
}
const ANGLE_LABEL = {
  x: ANGLE_VERTEX.x + (ANGLE_RADIUS + 18) * Math.cos(ISOMETRIC_ANGLE / 2),
  y: ANGLE_VERTEX.y + (ANGLE_RADIUS + 18) * Math.sin(ISOMETRIC_ANGLE / 2),
}

const ANGLE_ARROW = "M0 0 8-3v6Z"

export function ShakilMarkIsometric() {
  const id = useId()
  const ids = {
    facePattern: `shakil-face-pattern-${id}`,
    faceFill: `shakil-face-fill-${id}`,
    stroke: `shakil-stroke-${id}`,
    radialGradient: `shakil-radial-gradient-${id}`,
  }

  const ref = useRef<SVGSVGElement>(null)

  const [play] = useSound(metalClickSound)

  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(ref, { margin: "80px" })

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const cx = useSpring(useTransform(mouseX, [0, 1], [0, 556]), {
    stiffness: 300,
    damping: 30,
    mass: 0.1,
  })

  const cy = useSpring(useTransform(mouseY, [0, 1], [0, 354]), {
    stiffness: 300,
    damping: 30,
    mass: 0.1,
  })

  useEffect(() => {
    if (shouldReduceMotion || !isInView) {
      return
    }

    if (window.matchMedia("(hover: none)").matches) {
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth)
      mouseY.set(e.clientY / window.innerHeight)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [shouldReduceMotion, isInView, mouseX, mouseY])

  return (
    <motion.svg
      ref={ref}
      className="h-auto w-full touch-manipulation overflow-visible [--pattern:color-mix(in_oklab,var(--foreground)_12%,var(--background))] [--stroke:color-mix(in_oklab,var(--foreground)_16%,var(--background))]"
      viewBox="0 0 556 354"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      initial="normal"
      whileTap="pressed"
      onTap={() => play()}
    >
      <defs>
        <pattern
          id={ids.facePattern}
          x="0"
          y="0"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M-1 1l2 -2M0 10l10 -10M9 11l2 -2"
            stroke="var(--pattern)"
            strokeWidth="1"
          />
        </pattern>

        <motion.g
          id={ids.faceFill}
          variants={{
            normal: {
              y: 0,
            },
            pressed: {
              y: 16,
            },
          }}
          transition={transition}
        >
          <path d="M177.86 141.38L310.88 218.18L266.54 243.78L177.86 192.58L155.69 205.38L244.37 256.58L133.52 320.58L0.50 243.78L44.84 218.18L133.52 269.38L155.69 256.58L67.01 205.38Z" />

          <path d="M443.91 0.58L554.76 64.58L499.33 96.58L388.48 32.58Z" />
          <path
            d="M333.05 0.58L554.76 128.58L388.48 224.58L333.05 192.58L388.48 160.58L277.63 96.58L222.20 128.58L166.78 96.58ZM388.48 32.58L499.33 96.58L443.91 128.58L333.05 64.58Z"
            fillRule="evenodd"
          />
        </motion.g>

        <motion.path
          id={ids.stroke}
          variants={{
            normal: {
              d: [
                "M177.86 141.38 L310.88 218.18 L266.54 243.78 L177.86 192.58 L155.69 205.38 L244.37 256.58 L133.52 320.58 L0.50 243.78 L44.84 218.18 L133.52 269.38 L155.69 256.58 L67.01 205.38 Z",
                "M310.88 218.18 V250.18",
                "M266.54 243.78 V275.78",
                "M177.86 192.58 V224.58",
                "M155.69 205.38 V237.38",
                "M244.37 256.58 V288.58",
                "M133.52 320.58 V352.58",
                "M0.50 243.78 V275.78",
                "M67.01 205.38 V237.38",
                "M310.88 250.18 L266.54 275.78 L177.86 224.58 L155.69 237.38",
                "M244.37 288.58 L133.52 352.58 L0.50 275.78",

                "M443.91 0.58 L554.76 64.58 L499.33 96.58 L388.48 32.58 Z",
                "M333.05 0.58 L554.76 128.58 L388.48 224.58 L333.05 192.58 L388.48 160.58 L277.63 96.58 L222.20 128.58 L166.78 96.58 Z",
                "M388.48 32.58 L499.33 96.58 L443.91 128.58 L333.05 64.58 Z",
                "M554.76 64.58 V96.58",
                "M554.76 128.58 V160.58",
                "M388.48 224.58 V256.58",
                "M333.05 192.58 V224.58",
                "M388.48 160.58 V192.58",
                "M277.63 96.58 V128.58",
                "M222.20 128.58 V160.58",
                "M166.78 96.58 V128.58",
                "M388.48 32.58 V64.58",
                "M333.05 64.58 V96.58",
                "M499.33 96.58 V128.58",
                "M554.76 160.58 L388.48 256.58 L333.05 224.58 L388.48 192.58 L277.63 128.58 L222.20 160.58 L166.78 128.58",
                "M333.05 96.58 L388.48 64.58 L499.33 128.58 L554.76 96.58",
              ].join(""),
            },
            pressed: {
              d: [
                "M177.86 157.38 L310.88 234.18 L266.54 259.78 L177.86 208.58 L155.69 221.38 L244.37 272.58 L133.52 336.58 L0.50 259.78 L44.84 234.18 L133.52 285.38 L155.69 272.58 L67.01 221.38 Z",
                "M310.88 234.18 V250.18",
                "M266.54 259.78 V275.78",
                "M177.86 208.58 V224.58",
                "M155.69 221.38 V237.38",
                "M244.37 272.58 V288.58",
                "M133.52 336.58 V352.58",
                "M0.50 259.78 V275.78",
                "M67.01 221.38 V237.38",
                "M310.88 250.18 L266.54 275.78 L177.86 224.58 L155.69 237.38",
                "M244.37 288.58 L133.52 352.58 L0.50 275.78",

                "M443.91 16.58 L554.76 80.58 L499.33 112.58 L388.48 48.58 Z",
                "M333.05 16.58 L554.76 144.58 L388.48 240.58 L333.05 208.58 L388.48 176.58 L277.63 112.58 L222.20 144.58 L166.78 112.58 Z",
                "M388.48 48.58 L499.33 112.58 L443.91 144.58 L333.05 80.58 Z",
                "M554.76 80.58 V96.58",
                "M554.76 144.58 V160.58",
                "M388.48 240.58 V256.58",
                "M333.05 208.58 V224.58",
                "M388.48 176.58 V192.58",
                "M277.63 112.58 V128.58",
                "M222.20 144.58 V160.58",
                "M166.78 112.58 V128.58",
                "M388.48 48.58 V64.58",
                "M333.05 80.58 V96.58",
                "M499.33 112.58 V128.58",
                "M554.76 160.58 L388.48 256.58 L333.05 224.58 L388.48 192.58 L277.63 128.58 L222.20 160.58 L166.78 128.58",
                "M333.05 96.58 L388.48 64.58 L499.33 128.58 L554.76 96.58",
              ].join(""),
            },
          }}
          transition={transition}
        />

        <motion.radialGradient
          id={ids.radialGradient}
          cx={cx}
          cy={cy}
          r="200"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            className="dark:[stop-color:#fff]"
            stopColor="var(--color-zinc-700)"
          />
          <stop
            className="dark:[stop-color:var(--color-zinc-600)]"
            offset="1"
            stopColor="var(--color-zinc-400)"
            stopOpacity="0"
          />
        </motion.radialGradient>
      </defs>

      <g className="stroke-line" strokeWidth="1" strokeDasharray="4 2">
        <path d="M-477.55 756.57L1254.51 -243.41" />

        <path d="M977.37 788.58L-754.67 -211.42" />
        <path d="M1143.65 692.58L-588.39 -307.42" />
      </g>

      <g className="fill-background" fillRule="evenodd" clipRule="evenodd">
        <motion.path
          variants={{
            normal: {
              d: "M310.88 218.18L266.54 243.78L177.86 192.58L155.69 205.38L155.69 237.38L177.86 224.58L266.54 275.78L310.88 250.18Z",
            },
            pressed: {
              d: "M310.88 234.18L266.54 259.78L177.86 208.58L155.69 221.38L155.69 237.38L177.86 224.58L266.54 275.78L310.88 250.18Z",
            },
          }}
          transition={transition}
        />

        <motion.path
          variants={{
            normal: {
              d: "M155.69 256.58L67.01 205.38L67.01 237.38L155.69 288.58Z",
            },
            pressed: {
              d: "M155.69 272.58L67.01 221.38L67.01 237.38L155.69 288.58Z",
            },
          }}
          transition={transition}
        />

        <motion.path
          variants={{
            normal: {
              d: "M244.37 256.58L133.52 320.58L0.50 243.78L0.50 275.78L133.52 352.58L244.37 288.58Z",
            },
            pressed: {
              d: "M244.37 272.58L133.52 336.58L0.50 259.78L0.50 275.78L133.52 352.58L244.37 288.58Z",
            },
          }}
          transition={transition}
        />

        <motion.path
          variants={{
            normal: {
              d: "M554.76 128.58L388.48 224.58L333.05 192.58L388.48 160.58L277.63 96.58L222.20 128.58L166.78 96.58L166.78 128.58L222.20 160.58L277.63 128.58L388.48 192.58L333.05 224.58L388.48 256.58L554.76 160.58Z",
            },
            pressed: {
              d: "M554.76 144.58L388.48 240.58L333.05 208.58L388.48 176.58L277.63 112.58L222.20 144.58L166.78 112.58L166.78 128.58L222.20 160.58L277.63 128.58L388.48 192.58L333.05 224.58L388.48 256.58L554.76 160.58Z",
            },
          }}
          transition={transition}
        />

        <motion.path
          variants={{
            normal: {
              d: "M333.05 64.58L388.48 32.58L499.33 96.58L554.76 64.58L554.76 96.58L499.33 128.58L388.48 64.58L333.05 96.58Z",
            },
            pressed: {
              d: "M333.05 80.58L388.48 48.58L499.33 112.58L554.76 80.58L554.76 96.58L499.33 128.58L388.48 64.58L333.05 96.58Z",
            },
          }}
          transition={transition}
        />
      </g>

      <use href={`#${ids.faceFill}`} className="fill-background" />
      <use href={`#${ids.faceFill}`} fill={`url(#${ids.facePattern})`} />

      <use href={`#${ids.stroke}`} stroke="var(--stroke)" />
      <use href={`#${ids.stroke}`} stroke={`url(#${ids.radialGradient})`} />

      <g
        className="pointer-events-none text-dimension max-sm:hidden"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      >
        <path
          d={`M${ANGLE_VERTEX.x} ${ANGLE_VERTEX.y}H${ANGLE_START.x + 12}`}
        />
        <path
          d={`M${ANGLE_START.x} ${ANGLE_START.y}A${ANGLE_RADIUS} ${ANGLE_RADIUS} 0 0 1 ${ANGLE_END.x} ${ANGLE_END.y}`}
        />

        <path
          className="fill-background"
          d={ANGLE_ARROW}
          transform={`translate(${ANGLE_START.x} ${ANGLE_START.y}) rotate(90)`}
        />
        <path
          className="fill-background"
          d={ANGLE_ARROW}
          transform={`translate(${ANGLE_END.x} ${ANGLE_END.y}) rotate(-60)`}
        />
        <text
          className="fill-dimension-foreground font-mono select-none"
          x={ANGLE_LABEL.x}
          y={ANGLE_LABEL.y}
          stroke="none"
          fontSize="12"
          textAnchor="middle"
          dominantBaseline="central"
        >
          30°
        </text>
      </g>
    </motion.svg>
  )
}
