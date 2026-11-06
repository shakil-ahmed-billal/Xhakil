/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import {
  createContext,
  useContext,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from "react"
import type { scaleBand, scaleLinear, scaleTime } from "@visx/scale"
import type { Transition } from "motion/react"

import type { ChartSelection } from "./use-chart-interaction"

type ScaleLinear<Output, _Input = number> = ReturnType<
  typeof scaleLinear<Output>
>
type ScaleTime<Output, _Input = Date | number> = ReturnType<
  typeof scaleTime<Output>
>
type ScaleBand<Domain extends { toString(): string }> = ReturnType<
  typeof scaleBand<Domain>
>

export const chartCssVars = {
  background: "var(--chart-background)",
  foreground: "var(--chart-foreground)",
  foregroundMuted: "var(--chart-foreground-muted)",
  label: "var(--chart-label)",
  linePrimary: "var(--chart-line-primary)",
  lineSecondary: "var(--chart-line-secondary)",
  crosshair: "var(--chart-crosshair)",
  grid: "var(--chart-grid)",
  indicatorColor: "var(--chart-indicator-color)",
  indicatorSecondaryColor: "var(--chart-indicator-secondary-color)",
  markerBackground: "var(--chart-marker-background)",
  markerBorder: "var(--chart-marker-border)",
  markerForeground: "var(--chart-marker-foreground)",
  badgeBackground: "var(--chart-marker-badge-background)",
  badgeForeground: "var(--chart-marker-badge-foreground)",
  segmentBackground: "var(--chart-segment-background)",
  segmentLine: "var(--chart-segment-line)",
}

export const defaultScatterColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
] as const

export interface Margin {
  top: number
  right: number
  bottom: number
  left: number
}

export interface TooltipData {
  point: Record<string, unknown>

  index: number

  x: number

  yPositions: Record<string, number>

  xPositions?: Record<string, number>
}

export interface LineConfig {
  dataKey: string
  stroke: string
  strokeWidth: number
}

export interface ChartContextValue {
  data: Record<string, unknown>[]

  xScale: ScaleTime<number, number>
  yScale: ScaleLinear<number, number>

  width: number
  height: number
  innerWidth: number
  innerHeight: number
  margin: Margin

  columnWidth: number

  tooltipData: TooltipData | null
  setTooltipData: Dispatch<SetStateAction<TooltipData | null>>

  containerRef: RefObject<HTMLDivElement | null>

  lines: LineConfig[]

  isLoaded: boolean
  animationDuration: number

  animationEasing?: string

  enterTransition?: Transition

  revealEpoch?: number

  xAccessor: (d: Record<string, unknown>) => Date

  dateLabels: string[]

  selection?: ChartSelection | null

  clearSelection?: () => void

  barScale?: ScaleBand<string>

  bandWidth?: number

  hoveredBarIndex?: number | null

  setHoveredBarIndex?: (index: number | null) => void

  barXAccessor?: (d: Record<string, unknown>) => string

  orientation?: "vertical" | "horizontal"

  stacked?: boolean

  stackOffsets?: Map<number, Map<string, number>>

  hoveredCandleIndex?: number | null

  setHoveredCandleIndex?: (index: number | null) => void

  composedBarDataKeys?: string[]

  composedBarSize?: number

  composedMaxBarSize?: number

  composedBarGap?: number

  composedStacked?: boolean

  composedStackOffsets?: Map<number, Map<string, number>>

  composedStackGap?: number
}

const ChartContext = createContext<ChartContextValue | null>(null)

export function ChartProvider({
  children,
  value,
}: {
  children: React.ReactNode
  value: ChartContextValue
}) {
  return <ChartContext.Provider value={value}>{children}</ChartContext.Provider>
}

export function useChart(): ChartContextValue {
  const context = useContext(ChartContext)
  if (!context) {
    throw new Error(
      "useChart must be used within a ChartProvider. " +
        "Make sure your component is wrapped in <LineChart>, <AreaChart>, <BarChart>, or <ComposedChart>."
    )
  }
  return context
}

export default ChartContext
