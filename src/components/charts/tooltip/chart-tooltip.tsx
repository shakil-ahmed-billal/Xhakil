/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable react-hooks/refs */
"use client"

import { useMemo } from "react"
import { format } from "date-fns"
import { motion, useSpring } from "motion/react"

import { useIsClient } from "@/hooks/use-is-client"

import { chartCssVars, useChart } from "../chart-context"
import { DateTicker } from "./date-ticker"
import { TooltipBox } from "./tooltip-box"
import { TooltipContent, type TooltipRow } from "./tooltip-content"
import { TooltipDot } from "./tooltip-dot"
import { TooltipIndicator } from "./tooltip-indicator"

const crosshairSpringConfig = { stiffness: 300, damping: 30 }

export interface ChartTooltipProps {
  showDatePill?: boolean

  showCrosshair?: boolean

  showDots?: boolean

  indicatorColor?: string | ((point: Record<string, unknown>) => string)

  content?: (props: {
    point: Record<string, unknown>
    index: number
  }) => React.ReactNode

  rows?: (point: Record<string, unknown>) => TooltipRow[]

  rowLabels?: Record<string, string>

  children?: React.ReactNode

  className?: string
}

export function ChartTooltip({
  showDatePill = true,
  showCrosshair = true,
  showDots = true,
  indicatorColor: indicatorColorProp,
  content,
  rows: rowsRenderer,
  rowLabels,
  children,
  className = "",
}: ChartTooltipProps) {
  const {
    tooltipData,
    width,
    height,
    innerHeight,
    margin,
    columnWidth,
    lines,
    xAccessor,
    dateLabels,
    containerRef,
    orientation,
    barXAccessor,
  } = useChart()

  const isHorizontal = orientation === "horizontal"

  const mounted = useIsClient()

  const visible = tooltipData !== null
  const x = tooltipData?.x ?? 0
  const xWithMargin = x + margin.left

  const firstLineDataKey = lines[0]?.dataKey
  const firstLineY = firstLineDataKey
    ? (tooltipData?.yPositions[firstLineDataKey] ?? 0)
    : 0
  const yWithMargin = firstLineY + margin.top

  const animatedX = useSpring(xWithMargin, crosshairSpringConfig)

  animatedX.set(xWithMargin)

  const tooltipRows = useMemo(() => {
    if (!tooltipData) {
      return []
    }

    if (rowsRenderer) {
      return rowsRenderer(tooltipData.point)
    }

    return lines.map((line) => ({
      color: line.stroke,
      label: rowLabels?.[line.dataKey] || line.dataKey,
      value: (tooltipData.point[line.dataKey] as number) ?? 0,
    }))
  }, [tooltipData, lines, rowLabels, rowsRenderer])

  const indicatorColor = useMemo(() => {
    if (indicatorColorProp == null) {
      return chartCssVars.crosshair
    }
    if (typeof indicatorColorProp === "function") {
      return tooltipData
        ? indicatorColorProp(tooltipData.point)
        : chartCssVars.crosshair
    }
    return indicatorColorProp
  }, [indicatorColorProp, tooltipData])

  const title = useMemo(() => {
    if (!tooltipData) {
      return undefined
    }

    if (barXAccessor) {
      return barXAccessor(tooltipData.point)
    }

    return format(xAccessor(tooltipData.point), "EEE, d MMM")
  }, [tooltipData, barXAccessor, xAccessor])

  const container = containerRef.current
  if (!(mounted && container)) {
    return null
  }

  const { createPortal } = require("react-dom") as typeof import("react-dom")

  const tooltipContent = (
    <>
      {showCrosshair && (
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          height="100%"
          width="100%"
        >
          <g transform={`translate(${margin.left},${margin.top})`}>
            <TooltipIndicator
              colorEdge={indicatorColor}
              colorMid={indicatorColor}
              columnWidth={columnWidth}
              fadeEdges
              height={innerHeight}
              visible={visible}
              width="line"
              x={x}
            />
          </g>
        </svg>
      )}

      {showDots && visible && !isHorizontal && (
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          height="100%"
          width="100%"
        >
          <g transform={`translate(${margin.left},${margin.top})`}>
            {lines.map((line) => (
              <TooltipDot
                color={line.stroke}
                key={line.dataKey}
                strokeColor={chartCssVars.background}
                visible={visible}
                x={tooltipData?.xPositions?.[line.dataKey] ?? x}
                y={tooltipData?.yPositions[line.dataKey] ?? 0}
              />
            ))}
          </g>
        </svg>
      )}

      <TooltipBox
        className={className}
        containerHeight={height}
        containerRef={containerRef}
        containerWidth={width}
        top={isHorizontal ? undefined : margin.top}
        visible={visible}
        x={xWithMargin}
        y={isHorizontal ? yWithMargin : margin.top}
      >
        {content && tooltipData
          ? content({
              point: tooltipData.point,
              index: tooltipData.index,
            })
          : !content && (
              <TooltipContent rows={tooltipRows} title={title}>
                {children}
              </TooltipContent>
            )}
      </TooltipBox>

      {showDatePill && dateLabels.length > 0 && visible && !isHorizontal && (
        <motion.div
          className="pointer-events-none absolute z-50"
          style={{
            left: animatedX,
            transform: "translateX(-50%)",
            bottom: 4,
          }}
        >
          <DateTicker
            currentIndex={tooltipData?.index ?? 0}
            labels={dateLabels}
            visible={visible}
          />
        </motion.div>
      )}
    </>
  )

  return createPortal(tooltipContent, container)
}

ChartTooltip.displayName = "ChartTooltip"

export default ChartTooltip
