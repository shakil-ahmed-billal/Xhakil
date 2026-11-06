"use client"

import { motion, useReducedMotion } from "motion/react"
import { useTheme } from "next-themes"

import { SpinningCircularText } from "@/registry/components/spinning-circular-text"

const TEXT = "CRAFTED WITH CARE BY SHAKIL • "
const DURATION = 4

export function SiteFooterBuiltBySpinner() {
  const shouldReduceMotion = useReducedMotion()
  const { resolvedTheme } = useTheme()

  return (
    <SpinningCircularText
      text={TEXT}
      charSpacing={1.2}
      className="[--color:var(--muted-foreground)] [--shimmering-color:var(--foreground)]"
      spinClassName="duration-[12s] motion-reduce:animate-none"
      renderChar={(char, index) =>
        shouldReduceMotion ? (
          <span className="text-(--shimmering-color)" suppressHydrationWarning>
            {char}
          </span>
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
