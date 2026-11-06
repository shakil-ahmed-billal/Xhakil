"use client"

import { useEffect, useRef } from "react"
import { animate, useMotionValue, type Transition } from "motion/react"

import { DEFAULT_CHART_ENTER_TRANSITION } from "./animation"

export function useMountProgress(
  enterTransition: Transition | undefined,
  delaySeconds: number,
  replayKey: number | string
) {
  const progress = useMotionValue(0)
  const transitionRef = useRef(enterTransition)
  // eslint-disable-next-line react-hooks/refs
  transitionRef.current = enterTransition

  useEffect(() => {
    progress.set(0)
    const controls = animate(progress, 1, {
      ...(transitionRef.current ?? DEFAULT_CHART_ENTER_TRANSITION),
      delay: delaySeconds,
    })
    return () => controls.stop()
  }, [delaySeconds, replayKey, progress])

  return progress
}
