"use client"

import * as React from "react"

const Chart = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div className="relative" ref={ref} {...props} />
))
Chart.displayName = "Chart"

const ChartContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div className="absolute inset-0" ref={ref} {...props} />,
)
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div className="pointer-events-none absolute z-50" ref={ref} {...props} />,
)
ChartTooltip.displayName = "ChartTooltip"

const ChartTooltipContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div className="bg-popover text-popover-foreground rounded-md border p-2 shadow-md" ref={ref} {...props} />
  ),
)
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div className="flex items-center space-x-2" ref={ref} {...props} />,
)
ChartLegend.displayName = "ChartLegend"

const ChartLegendItem = React.forwardRef<
  HTMLDivElement,
  { name: string; color: string } & React.HTMLAttributes<HTMLDivElement>
>(({ name, color, className, ...props }, ref) => (
  <div className="flex items-center space-x-1" ref={ref} {...props}>
    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
    <span className="text-sm">{name}</span>
  </div>
))
ChartLegendItem.displayName = "ChartLegendItem"

const ChartGrid = React.forwardRef<SVGSVGElement, React.SVGAttributes<SVGSVGElement>>(
  ({ className, ...props }, ref) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className="absolute inset-0 h-full w-full stroke-muted opacity-50"
      ref={ref}
      {...props}
    >
      <defs>
        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M10 0H0V10" fill="none" stroke="currentColor" />
          <path d="M0 10H10V0" fill="none" stroke="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" strokeWidth="0.5" />
    </svg>
  ),
)
ChartGrid.displayName = "ChartGrid"

const ChartXAxis = React.forwardRef<HTMLDivElement, { dataKey: string } & React.HTMLAttributes<HTMLDivElement>>(
  ({ dataKey, className, ...props }, ref) => (
    <div className="absolute bottom-0 left-0 w-full text-center text-xs text-muted-foreground" ref={ref} {...props}>
      {dataKey}
    </div>
  ),
)
ChartXAxis.displayName = "ChartXAxis"

const ChartYAxis = React.forwardRef<
  HTMLDivElement,
  { domain?: [number, number] } & React.HTMLAttributes<HTMLDivElement>
>(({ domain, className, ...props }, ref) => (
  <div
    className="absolute top-0 left-0 h-full flex flex-col justify-between text-xs text-muted-foreground"
    ref={ref}
    {...props}
  >
    {domain ? (
      <>
        <div>{domain[1]}</div>
        <div>{(domain[1] + domain[0]) / 2}</div>
        <div>{domain[0]}</div>
      </>
    ) : null}
  </div>
))
ChartYAxis.displayName = "ChartYAxis"

const ChartLine = React.forwardRef<
  HTMLDivElement,
  { dataKey: string; stroke: string } & React.HTMLAttributes<HTMLDivElement>
>(({ dataKey, stroke, className, ...props }, ref) => <div ref={ref} {...props} />)
ChartLine.displayName = "ChartLine"

const ChartBar = React.forwardRef<
  HTMLDivElement,
  { dataKey: string; fill: string } & React.HTMLAttributes<HTMLDivElement>
>(({ dataKey, fill, className, ...props }, ref) => <div ref={ref} {...props} />)
ChartBar.displayName = "ChartBar"

const ChartArea = React.forwardRef<
  HTMLDivElement,
  { dataKey: string; fill: string; fillOpacity: number } & React.HTMLAttributes<HTMLDivElement>
>(({ dataKey, fill, fillOpacity, className, ...props }, ref) => <div ref={ref} {...props} />)
ChartArea.displayName = "ChartArea"

export {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
  ChartGrid,
  ChartXAxis,
  ChartYAxis,
  ChartLine,
  ChartBar,
  ChartArea,
}
