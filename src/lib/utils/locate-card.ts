const LOCATE_HIGHLIGHT_ATTR = 'data-locate-highlight'
const LOCATE_HIGHLIGHT_DURATION_MS = 1500

let activeHighlightedEl: HTMLElement | null = null
let activeHighlightTimer: number | null = null

export function waitForPaint(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  return new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => resolve())
    })
  })
}

export function getViewportTopObstruction(
  stickyEl?: HTMLElement | null,
): number {
  if (typeof window === 'undefined') return 72

  const header = document.querySelector<HTMLElement>('header')
  let bottom = header ? Math.max(0, header.getBoundingClientRect().bottom) : 56

  if (stickyEl) {
    const style = window.getComputedStyle(stickyEl)
    if (style.position === 'sticky' || style.position === 'fixed') {
      const rect = stickyEl.getBoundingClientRect()
      if (rect.top <= bottom + 8 && rect.bottom > bottom) {
        bottom = rect.bottom
      }
    }
  }

  return Math.round(bottom + 16)
}

export function scrollElementIntoComfortableView(
  element: HTMLElement,
  topOffset: number,
) {
  if (typeof window === 'undefined') return
  const rect = element.getBoundingClientRect()
  if (rect.width === 0 && rect.height === 0) return

  const bottomLimit = window.innerHeight - 24
  if (rect.top >= topOffset && rect.bottom <= bottomLimit) {
    return
  }

  const availableHeight = window.innerHeight - topOffset - 24
  const desiredTop =
    rect.height < availableHeight
      ? window.scrollY +
        rect.top -
        Math.max(topOffset, (window.innerHeight - rect.height) * 0.32)
      : window.scrollY + rect.top - topOffset

  window.scrollTo({
    top: Math.max(0, Math.round(desiredTop)),
    behavior: 'instant',
  })
}

export function clearLocatedHighlight() {
  if (activeHighlightTimer !== null && typeof window !== 'undefined') {
    window.clearTimeout(activeHighlightTimer)
    activeHighlightTimer = null
  }
  if (activeHighlightedEl) {
    activeHighlightedEl.removeAttribute(LOCATE_HIGHLIGHT_ATTR)
    activeHighlightedEl = null
  }
}

/**
 * One-shot gentle border/ring pulse on the card returned to (aligned with blog-main's
 * thought-image-locate-pulse: no focus ring, respects prefers-reduced-motion).
 */
export function highlightLocatedElement(element: HTMLElement | null) {
  if (!element || typeof window === 'undefined') return

  clearLocatedHighlight()
  element.removeAttribute(LOCATE_HIGHLIGHT_ATTR)
  // Force reflow so consecutive locates on the same card replay the pulse cleanly
  void element.offsetWidth
  element.setAttribute(LOCATE_HIGHLIGHT_ATTR, 'true')
  activeHighlightedEl = element

  activeHighlightTimer = window.setTimeout(() => {
    clearLocatedHighlight()
  }, LOCATE_HIGHLIGHT_DURATION_MS)
}
