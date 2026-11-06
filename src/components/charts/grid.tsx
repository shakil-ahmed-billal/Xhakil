"use client"

import { useId } from "react"
import { GridColumns, GridRows } from "@visx/grid"

import { chartCssVars, useChart } from "./chart-context"

export interface GridProps {
  horizontal?: boolean

  vertical?: boolean

  numTicksRows?: number

  numTicksColumns?: number

  rowTickValues?: number[]

  stroke?: string

  strokeOpacity?: number

  strokeWidth?: number

  strokeDasharray?: string

  fadeHorizontal?: boolean

  fadeVertical?: boolean
}

export function Grid({
  horizontal = true,
  vertical = false,
  numTicksRows = 5,
  numTicksColumns = 10,
  rowTickValues,
  stroke = chartCssVars.grid,
  strokeOpacity = 1,
  strokeWidth = 1,
  strokeDasharray = "4,4",
  fadeHorizontal = true,
  fadeVertical = false,
}: GridProps) {
  const { xScale, yScale, innerWidth, innerHeight, orientation, barScale } =
    useChart()

  const isHorizontalBarChart = orientation === "horizontal" && barScale

  const columnScale = isHorizontalBarChart ? yScale : xScale
  const uniqueId = useId()

  const hMaskId = `grid-rows-fade-${uniqueId}`
  const hGradientId = `${hMaskId}-gradient`

  const vMaskId = `grid-cols-fade-${uniqueId}`
  const vGradientId = `${vMaskId}-gradient`

  return (
    <g className="chart-grid">
      {horizontal && fadeHorizontal && (
        <defs>
          <linearGradient id={hGradientId} x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" style={{ stopColor: "white", stopOpacity: 0 }} />
            <stop offset="10%" style={{ stopColor: "white", stopOpacity: 1 }} />
            <stop offset="90%" style={{ stopColor: "white", stopOpacity: 1 }} />
            <stop
              offset="100%"
              style={{ stopColor: "white", stopOpacity: 0 }}
            />
          </linearGradient>
          <mask id={hMaskId}>
            <rect
              fill={`url(#${hGradientId})`}
              height={innerHeight}
              width={innerWidth}
              x="0"
              y="0"
            />
          </mask>
        </defs>
      )}

      {vertical && fadeVertical && (
        <defs>
          <linearGradient id={vGradientId} x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "white", stopOpacity: 0 }} />
            <stop offset="10%" style={{ stopColor: "white", stopOpacity: 1 }} />
            <stop offset="90%" style={{ stopColor: "white", stopOpacity: 1 }} />
            <stop
              offset="100%"
              style={{ stopColor: "white", stopOpacity: 0 }}
            />
          </linearGradient>
          <mask id={vMaskId}>
            <rect
              fill={`url(#${vGradientId})`}
              height={innerHeight}
              width={innerWidth}
              x="0"
              y="0"
            />
          </mask>
        </defs>
      )}

      {horizontal && (
        <g mask={fadeHorizontal ? `url(#${hMaskId})` : undefined}>
          <GridRows
            numTicks={rowTickValues ? undefined : numTicksRows}
            scale={yScale}
            stroke={stroke}
            strokeDasharray={strokeDasharray}
            strokeOpacity={strokeOpacity}
            strokeWidth={strokeWidth}
            tickValues={rowTickValues}
            width={innerWidth}
          />
        </g>
      )}
      {vertical && columnScale && typeof columnScale === "function" && (
        <g mask={fadeVertical ? `url(#${vMaskId})` : undefined}>
          <GridColumns
            height={innerHeight}
            numTicks={numTicksColumns}
            scale={columnScale}
            stroke={stroke}
            strokeDasharray={strokeDasharray}
            strokeOpacity={strokeOpacity}
            strokeWidth={strokeWidth}
          />
        </g>
      )}
    </g>
  )
}

Grid.displayName = "Grid"

export default Grid
