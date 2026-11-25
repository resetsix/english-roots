import { flushSync, mount, tick, unmount } from 'svelte'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import GlobalTooltip from '$lib/components/GlobalTooltip.svelte'
import { getTooltipLayout } from '$lib/utils/tooltip-position'

function makePointerEvent(
  type: string,
  pointerType: 'mouse' | 'touch' = 'mouse',
) {
  const event = new Event(type, { bubbles: true, cancelable: true })
  Object.defineProperty(event, 'pointerType', { value: pointerType })
  return event
}

describe('GlobalTooltip & tooltip-position', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    document.body.innerHTML = ''
  })

  it('positions above anchor by default and flips below when near top edge', () => {
    const above = getTooltipLayout({
      anchorRect: {
        top: 120,
        left: 200,
        right: 240,
        bottom: 152,
        width: 40,
        height: 32,
      },
      tooltipSize: { width: 100, height: 24 },
      viewport: { width: 800, height: 600 },
    })
    expect(above.isAbove).toBe(true)
    expect(above.top).toBe(90)
    expect(above.left).toBe(170)

    const flipped = getTooltipLayout({
      anchorRect: {
        top: 8,
        left: 4,
        right: 36,
        bottom: 40,
        width: 32,
        height: 32,
      },
      tooltipSize: { width: 120, height: 24 },
      viewport: { width: 375, height: 667 },
    })
    expect(flipped.isAbove).toBe(false)
    expect(flipped.top).toBe(46)
    expect(flipped.left).toBe(8)
  })

  it('opens after 120ms hover delay, switches immediately to sibling, rescues native title, and hides on Escape or touch', async () => {
    const target = document.createElement('div')
    document.body.appendChild(target)
    const instance = mount(GlobalTooltip, { target })
    flushSync()

    const btn1 = document.createElement('button')
    btn1.setAttribute('data-tooltip', '回到顶部')
    btn1.getBoundingClientRect = () =>
      ({
        top: 100,
        left: 100,
        right: 132,
        bottom: 132,
        width: 32,
        height: 32,
      }) as DOMRect

    const btn2 = document.createElement('button')
    btn2.setAttribute('title', '快捷键 (?)')
    btn2.getBoundingClientRect = () =>
      ({
        top: 100,
        left: 160,
        right: 192,
        bottom: 132,
        width: 32,
        height: 32,
      }) as DOMRect

    document.body.append(btn1, btn2)

    btn1.dispatchEvent(makePointerEvent('pointerover', 'mouse'))
    expect(target.querySelector('[role="tooltip"]')).toBeNull()

    vi.advanceTimersByTime(120)
    flushSync()
    await tick()

    const tip1 = target.querySelector('[role="tooltip"]')
    expect(tip1?.textContent?.trim()).toBe('回到顶部')
    expect(btn1.getAttribute('aria-describedby')).toBe('global-ui-tooltip')

    // Moving directly to adjacent element switches immediately (0ms) and rescues native title
    btn2.dispatchEvent(makePointerEvent('pointerover', 'mouse'))
    flushSync()
    await tick()

    const tip2 = target.querySelector('[role="tooltip"]')
    expect(tip2?.textContent?.trim()).toBe('快捷键 (?)')
    expect(btn2.hasAttribute('title')).toBe(false)
    expect(btn2.getAttribute('data-tooltip')).toBe('快捷键 (?)')

    // Escape closes tooltip
    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape' }),
    )
    flushSync()
    expect(target.querySelector('[role="tooltip"]')).toBeNull()

    // Touch suppresses tooltip opening
    btn1.dispatchEvent(makePointerEvent('pointerdown', 'touch'))
    btn1.dispatchEvent(makePointerEvent('pointerover', 'touch'))
    vi.advanceTimersByTime(200)
    flushSync()
    expect(target.querySelector('[role="tooltip"]')).toBeNull()

    void unmount(instance)
  })
})
