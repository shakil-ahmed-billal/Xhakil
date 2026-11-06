"use client"

import { motion, useReducedMotion } from "motion/react"
import { useTheme } from "next-themes"

import { SpinningCircularText } from "@/registry/components/spinning-circular-text"

const TEXT = "Built with care by shakil • "
const DURATION = 4

export function SpinningCircularTextDemo2() {
  const shouldReduceMotion = useReducedMotion()
  const { resolvedTheme } = useTheme()

  return (
    <SpinningCircularText
      text={TEXT}
      charSpacing={1.2}
      className="size-[round(up,var(--sc-container-size),var(--spacing))] [--color:var(--muted-foreground)] [--shimmering-color:var(--foreground)]"
      spinClassName="duration-[12s] motion-reduce:animate-none"
      renderChar={(char, index) =>
        shouldReduceMotion ? (
          <span className="text-(--shimmering-color)">{char}</span>
        ) : (
          <motion.span
            key={resolvedTheme}
            animate={{
              color: [
                "var(--color)",
                "var(--shimmering-color)",
                "var(--color)",
              ],
            }}
            transition={{
              duration: DURATION,
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: TEXT.length * 0.03,
              delay: (index * DURATION) / TEXT.length,
              ease: "easeInOut",
            }}
          >
            {char}
          </motion.span>
        )
      }
    />
  )
}
