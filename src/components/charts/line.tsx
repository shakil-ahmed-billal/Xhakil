"use client"

import { useCallback, useEffect, useId, useRef, useState } from "react"
import { curveNatural } from "@visx/curve"
import { LinePath } from "@visx/shape"
import { motion, useMotionTemplate, useSpring } from "motion/react"

import { chartCssVars, useChart } from "./chart-context"
import { ChartRevealClip } from "./chart-reveal-clip"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CurveFactory = any

export interface LineProps {
  dataKey: string

  stroke?: string

  strokeWidth?: number

  curve?: CurveFactory

  animate?: boolean

  fadeEdges?: boolean

  showHighlight?: boolean
}

export function Line({
  dataKey,
  stroke = chartCssVars.linePrimary,
  strokeWidth = 2.5,
  curve = curveNatural,
  animate = true,
  fadeEdges = true,
  showHighlight = true,
}: LineProps) {
  const {
    data,
    xScale,
    yScale,
    innerHeight,
    innerWidth,
    tooltipData,
    selection,
    isLoaded,
    enterTransition,
    revealEpoch,
    xAccessor,
  } = useChart()

  const pathRef = useRef<SVGPathElement>(null)
  const [pathLength, setPathLength] = useState(0)

  const [pathD, setPathD] = useState("")

  const reactId = useId()
  const gradientId = `line-gradient-${dataKey}-${reactId}`

  useEffect(() => {
    const path = pathRef.current
    if (!path) {
      return
    }
    setPathD(path.getAttribute("d") || "")
    if (animate) {
      const len = path.getTotalLength()
      if (len > 0) {
        setPathLength(len)
      }
    }
  }, [animate, data, innerWidth, innerHeight])

  const findLengthAtX = useCallback(
    (targetX: number): number => {
      const path = pathRef.current
      if (!path || pathLength === 0) {
        return 0
      }
      let low = 0
      let high = pathLength
      const tolerance = 0.5

      while (high - low > tolerance) {
        const mid = (low + high) / 2
        const point = path.getPointAtLength(mid)
        if (point.x < targetX) {
          low = mid
        } else {
          high = mid
        }
      }
      return (low + high) / 2
    },
    [pathLength]
  )

  const springConfig = { stiffness: 180, damping: 28 }
  const offsetSpring = useSpring(0, springConfig)
  const segmentLengthSpring = useSpring(0, springConfig)

  useEffect(() => {
    const segmentBounds = getSegmentBounds()
    offsetSpring.set(-segmentBounds.startLength)
    segmentLengthSpring.set(segmentBounds.segmentLength)

    function getSegmentBounds() {
      if (!pathRef.current || pathLength === 0) {
        return { startLength: 0, segmentLength: 0, isActive: false }
      }

      if (selection?.active) {
        const startLength = findLengthAtX(selection.startX)
        const endLength = findLengthAtX(selection.endX)
        return {
          startLength,
          segmentLength: endLength - startLength,
          isActive: true,
        }
      }

      if (!tooltipData) {
        return { startLength: 0, segmentLength: 0, isActive: false }
      }

      const idx = tooltipData.index
      const startIdx = Math.max(0, idx - 1)
      const endIdx = Math.min(data.length - 1, idx + 1)

      const startPoint = data[startIdx]
      const endPoint = data[endIdx]
      if (!(startPoint && endPoint)) {
        return { startLength: 0, segmentLength: 0, isActive: false }
      }

      const startX = xScale(xAccessor(startPoint)) ?? 0
      const endX = xScale(xAccessor(endPoint)) ?? 0

      const startLength = findLengthAtX(startX)
      const endLength = findLengthAtX(endX)

      return {
        startLength,
        segmentLength: endLength - startLength,
        isActive: true,
      }
    }
  }, [
    tooltipData,
    selection,
    data,
    xScale,
    pathLength,
    xAccessor,
    findLengthAtX,
    offsetSpring,
    segmentLengthSpring,
  ])

  const animatedDasharray = useMotionTemplate`${segmentLengthSpring} ${pathLength}`

  const getY = useCallback(
    (d: Record<string, unknown>) => {
      const value = d[dataKey]
      return typeof value === "number" ? (yScale(value) ?? 0) : 0
    },
    [dataKey, yScale]
  )

  const isHovering = tooltipData !== null || selection?.active === true

  return (
    <>
      {fadeEdges && (
        <defs>
          <linearGradient id={gradientId} x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" style={{ stopColor: stroke, stopOpacity: 0 }} />
            <stop offset="15%" style={{ stopColor: stroke, stopOpacity: 1 }} />
            <stop offset="85%" style={{ stopColor: stroke, stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: stroke, stopOpacity: 0 }} />
          </linearGradient>
        </defs>
      )}

      {animate && data.length > 1 ? (
        <defs>
          <ChartRevealClip
            clipPathId={`grow-clip-${dataKey}`}
            enterTransition={enterTransition}
            height={innerHeight + 20}
            revealEpoch={revealEpoch ?? 0}
            targetWidth={innerWidth}
          />
        </defs>
      ) : null}

      <g
        clipPath={
          animate && data.length > 1 ? `url(#grow-clip-${dataKey})` : undefined
        }
      >
        <motion.g
          animate={{ opacity: isHovering && showHighlight ? 0.3 : 1 }}
          initial={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <LinePath
            curve={curve}
            data={data}
            innerRef={pathRef}
            stroke={fadeEdges ? `url(#${gradientId})` : stroke}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
            x={(d) => xScale(xAccessor(d)) ?? 0}
            y={getY}
          />
        </motion.g>
      </g>

      {showHighlight && isHovering && isLoaded && pathD && (
        <motion.path
          animate={{ opacity: 1 }}
          d={pathD}
          exit={{ opacity: 0 }}
          fill="none"
          initial={{ opacity: 0 }}
          stroke={stroke}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          style={{
            strokeDasharray: animatedDasharray,
            strokeDashoffset: offsetSpring,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      )}
    </>
  )
}

Line.displayName = "Line"

export default Line
