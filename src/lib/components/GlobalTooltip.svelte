<script lang="ts">
  import { onMount, tick } from 'svelte'
  import { isEscapeKey } from '$lib/utils/shortcuts'
  import {
    getTooltipLayout,
    type TooltipLayout,
    type TooltipRect,
  } from '$lib/utils/tooltip-position'

  const POINTER_OPEN_DELAY_MS = 120
  const TOUCH_SUPPRESS_WINDOW_MS = 700
  const TOOLTIP_OFFSET_PX = 6
  const TOOLTIP_ID = 'global-ui-tooltip'

  interface ActiveTooltip {
    target: Element
    text: string
    anchorRect: TooltipRect
  }

  let active = $state<ActiveTooltip | null>(null)
  let layout = $state<TooltipLayout | null>(null)
  let tooltipEl = $state<HTMLDivElement | null>(null)

  let isMultiline = $derived(
    Boolean(active && (active.text.includes('\n') || active.text.length > 28)),
  )

  let openTimer: number | null = null
  let pendingTarget: Element | null = null
  let lastTouchAt = -Infinity
  let observer: MutationObserver | null = null

  function toTooltipRect(rect: DOMRect): TooltipRect {
    return {
      top: rect.top,
      left: rect.left,
      right: rect.right,
      bottom: rect.bottom,
      width: rect.width,
      height: rect.height,
    }
  }

  function getTooltipText(element: Element): string {
    return element.getAttribute('data-tooltip')?.trim() ?? ''
  }

  function isRecentTouch(): boolean {
    return Date.now() - lastTouchAt < TOUCH_SUPPRESS_WINDOW_MS
  }

  function promoteNativeTitle(element: Element): boolean {
    const rawTitle = element.getAttribute('title')?.trim()
    if (!rawTitle) return false
    element.setAttribute('data-tooltip', rawTitle)
    element.removeAttribute('title')
    return true
  }

  function findTooltipTrigger(rawTarget: EventTarget | null): Element | null {
    if (!(rawTarget instanceof Element)) return null

    const candidate = rawTarget.closest(
      '[data-tooltip], [title]:not(iframe):not(link)',
    )
    if (!candidate) return null

    if (candidate.hasAttribute('title') && !candidate.matches('iframe, link')) {
      promoteNativeTitle(candidate)
    }

    return getTooltipText(candidate) ? candidate : null
  }

  function clearOpenTimer() {
    if (openTimer !== null) {
      window.clearTimeout(openTimer)
      openTimer = null
    }
    pendingTarget = null
  }

  function disconnectObserver() {
    observer?.disconnect()
    observer = null
  }

  function detachAria(target: Element | null) {
    if (target && target.getAttribute('aria-describedby') === TOOLTIP_ID) {
      target.removeAttribute('aria-describedby')
    }
  }

  function hide() {
    clearOpenTimer()
    disconnectObserver()
    detachAria(active?.target ?? null)
    active = null
    layout = null
  }

  async function measureAndPosition() {
    await tick()
    if (!active || !tooltipEl) return
    const rect = active.target.getBoundingClientRect()
    const tipRect = tooltipEl.getBoundingClientRect()
    layout = getTooltipLayout({
      anchorRect: toTooltipRect(rect),
      tooltipSize: {
        width: tipRect.width || tooltipEl.offsetWidth || 80,
        height: tipRect.height || tooltipEl.offsetHeight || 24,
      },
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      offset: TOOLTIP_OFFSET_PX,
    })
  }

  function openForTarget(target: Element) {
    clearOpenTimer()
    if (!target.isConnected) {
      hide()
      return
    }
    const text = getTooltipText(target)
    if (!text) {
      hide()
      return
    }

    const rect = target.getBoundingClientRect()
    if (active && active.target !== target) {
      detachAria(active.target)
    }

    if (!target.hasAttribute('aria-describedby')) {
      target.setAttribute('aria-describedby', TOOLTIP_ID)
    }

    active = {
      target,
      text,
      anchorRect: toTooltipRect(rect),
    }

    disconnectObserver()
    if (typeof MutationObserver !== 'undefined') {
      observer = new MutationObserver(() => {
        if (!active || active.target !== target) return
        const nextText = getTooltipText(target)
        if (!nextText || !target.isConnected) {
          hide()
          return
        }
        if (nextText !== active.text) {
          active = { ...active, text: nextText }
          void measureAndPosition()
        }
      })
      observer.observe(target, {
        attributes: true,
        attributeFilter: ['data-tooltip'],
      })
    }

    void measureAndPosition()
  }

  onMount(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'touch') {
        lastTouchAt = Date.now()
      }
      hide()
    }

    const onPointerOver = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || isRecentTouch()) return
      const trigger = findTooltipTrigger(event.target)
      if (!trigger) return
      if (active?.target === trigger || pendingTarget === trigger) return

      clearOpenTimer()
      if (active) {
        openForTarget(trigger)
      } else {
        pendingTarget = trigger
        openTimer = window.setTimeout(() => {
          openTimer = null
          pendingTarget = null
          openForTarget(trigger)
        }, POINTER_OPEN_DELAY_MS)
      }
    }

    const onPointerOut = (event: PointerEvent) => {
      const trigger = findTooltipTrigger(event.target)
      if (!trigger) return
      const related = event.relatedTarget
      if (related instanceof Node && trigger.contains(related)) return
      clearOpenTimer()
      if (active?.target === trigger) {
        hide()
      }
    }

    const onFocusIn = (event: FocusEvent) => {
      if (isRecentTouch()) return
      const trigger = findTooltipTrigger(event.target)
      if (!trigger) return
      let focusVisible = true
      try {
        focusVisible = trigger.matches(':focus-visible')
      } catch {
        focusVisible = true
      }
      if (!focusVisible) return
      openForTarget(trigger)
    }

    const onFocusOut = (event: FocusEvent) => {
      if (!active) return
      const related = event.relatedTarget
      if (related instanceof Node && active.target.contains(related)) return
      hide()
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (active && isEscapeKey(event)) {
        hide()
      }
    }

    const onScroll = () => {
      if (active || openTimer !== null) hide()
    }

    const onResize = () => {
      if (active) void measureAndPosition()
    }

    document.addEventListener('pointerdown', onPointerDown, true)
    document.addEventListener('pointerover', onPointerOver, true)
    document.addEventListener('pointerout', onPointerOut, true)
    document.addEventListener('focusin', onFocusIn, true)
    document.addEventListener('focusout', onFocusOut, true)
    document.addEventListener('keydown', onKeyDown, true)
    window.addEventListener('scroll', onScroll, true)
    window.addEventListener('resize', onResize)

    return () => {
      hide()
      document.removeEventListener('pointerdown', onPointerDown, true)
      document.removeEventListener('pointerover', onPointerOver, true)
      document.removeEventListener('pointerout', onPointerOut, true)
      document.removeEventListener('focusin', onFocusIn, true)
      document.removeEventListener('focusout', onFocusOut, true)
      document.removeEventListener('keydown', onKeyDown, true)
      window.removeEventListener('scroll', onScroll, true)
      window.removeEventListener('resize', onResize)
    }
  })
</script>

{#if active}
  <div
    bind:this={tooltipEl}
    id={TOOLTIP_ID}
    role="tooltip"
    class="ui-tooltip"
    data-visible={layout ? 'true' : 'false'}
    data-multiline={isMultiline ? 'true' : 'false'}
    style={layout
      ? `top:${Math.round(layout.top)}px;left:${Math.round(layout.left)}px;`
      : 'top:-9999px;left:-9999px;'}
  >
    {active.text}
  </div>
{/if}
