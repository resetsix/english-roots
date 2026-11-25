export interface TooltipRect {
  top: number
  left: number
  right: number
  bottom: number
  width: number
  height: number
}

export interface TooltipSize {
  width: number
  height: number
}

export interface TooltipViewport {
  width: number
  height: number
}

export interface TooltipLayout {
  top: number
  left: number
  isAbove: boolean
}

interface GetTooltipLayoutOptions {
  anchorRect: TooltipRect
  tooltipSize: TooltipSize
  viewport: TooltipViewport
  offset?: number
  padding?: number
  preferredPlacement?: 'top' | 'bottom'
}

function clamp(value: number, min: number, max: number): number {
  if (value < min) return min
  if (value > max) return max
  return value
}

export function getTooltipLayout({
  anchorRect,
  tooltipSize,
  viewport,
  offset = 6,
  padding = 8,
  preferredPlacement = 'top',
}: GetTooltipLayoutOptions): TooltipLayout {
  const anchorCenterX = anchorRect.left + anchorRect.width / 2
  const maxLeft = Math.max(
    padding,
    viewport.width - padding - tooltipSize.width,
  )
  const left = clamp(anchorCenterX - tooltipSize.width / 2, padding, maxLeft)

  const fitsAbove = anchorRect.top - tooltipSize.height - offset >= padding
  const fitsBelow =
    anchorRect.bottom + tooltipSize.height + offset <= viewport.height - padding
  const isAbove =
    preferredPlacement === 'top'
      ? fitsAbove || !fitsBelow
      : !(fitsBelow || !fitsAbove)

  const unclampedTop = isAbove
    ? anchorRect.top - tooltipSize.height - offset
    : anchorRect.bottom + offset
  const maxTop = Math.max(
    padding,
    viewport.height - padding - tooltipSize.height,
  )
  const top = clamp(unclampedTop, padding, maxTop)

  return { top, left, isAbove }
}
