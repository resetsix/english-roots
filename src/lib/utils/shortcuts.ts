export type GlobalShortcutAction =
  | 'toggle-search'
  | 'open-search'
  | 'toggle-shortcuts'
  | 'cycle-theme'
  | 'close-overlay'
  | null

export interface GlobalShortcutContext {
  searchOpen: boolean
  shortcutsOpen: boolean
  confirmOpen: boolean
}

export interface GlobalShortcutHandlers {
  getContext: () => GlobalShortcutContext
  closeOverlay: () => void
  toggleSearch: () => void
  openSearch: () => void
  toggleShortcuts: () => void
  cycleTheme: () => void
}

export function isEscapeKey(
  event: Pick<KeyboardEvent, 'key' | 'code'>,
): boolean {
  return (
    event.key === 'Escape' || event.key === 'Esc' || event.code === 'Escape'
  )
}

export function isQuestionMarkKey(
  event: Pick<
    KeyboardEvent,
    'key' | 'code' | 'shiftKey' | 'metaKey' | 'ctrlKey' | 'altKey'
  >,
): boolean {
  if (event.metaKey || event.ctrlKey || event.altKey) return false
  return (
    event.key === '?' ||
    event.key === '？' ||
    (event.shiftKey && event.code === 'Slash')
  )
}

export function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  if (target.isContentEditable) return true
  return Boolean(
    target.closest('input, textarea, select, [contenteditable="true"]'),
  )
}

export function isComposingEvent(event: KeyboardEvent): boolean {
  return event.isComposing || event.keyCode === 229 || event.key === 'Process'
}

export function hasBlockingOverlay(): boolean {
  if (typeof document === 'undefined') return false
  return Boolean(
    document.querySelector(
      '[data-modal-overlay="true"], [role="dialog"][aria-modal="true"]',
    ),
  )
}

export function isApplePlatform(): boolean {
  if (typeof navigator === 'undefined') return true
  return /Mac|iPhone|iPad|iPod/i.test(
    navigator.platform || navigator.userAgent || '',
  )
}

export function getScrollBehavior(): ScrollBehavior {
  if (typeof window === 'undefined' || !window.matchMedia) return 'auto'
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? 'auto'
    : 'smooth'
}

function shouldDeferEscapeToSearchIme(
  event: KeyboardEvent,
  ctx: GlobalShortcutContext,
): boolean {
  return (
    ctx.searchOpen &&
    !ctx.confirmOpen &&
    !ctx.shortcutsOpen &&
    isEditableTarget(event.target) &&
    event.isComposing
  )
}

export function matchGlobalShortcut(
  event: KeyboardEvent,
  ctx: GlobalShortcutContext,
  overlayPresent = hasBlockingOverlay(),
): GlobalShortcutAction {
  const anyOverlay =
    ctx.searchOpen || ctx.shortcutsOpen || ctx.confirmOpen || overlayPresent

  if (isEscapeKey(event) && anyOverlay) {
    if (shouldDeferEscapeToSearchIme(event, ctx)) return null
    return 'close-overlay'
  }

  if (event.defaultPrevented || event.repeat || isComposingEvent(event)) {
    return null
  }

  if (
    (event.metaKey || event.ctrlKey) &&
    !event.altKey &&
    !event.shiftKey &&
    event.key.toLowerCase() === 'k'
  ) {
    if (!ctx.searchOpen && (ctx.confirmOpen || overlayPresent)) {
      return null
    }
    return 'toggle-search'
  }

  if (
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    isEditableTarget(event.target)
  ) {
    return null
  }

  if (event.key === '/' && !anyOverlay) {
    return 'open-search'
  }

  if (
    event.shiftKey &&
    !anyOverlay &&
    (event.key.toLowerCase() === 't' || event.code === 'KeyT')
  ) {
    return 'cycle-theme'
  }

  if (isQuestionMarkKey(event) && !ctx.searchOpen && !ctx.confirmOpen) {
    if (!ctx.shortcutsOpen && overlayPresent) return null
    return 'toggle-shortcuts'
  }

  return null
}

/**
 * 全局快捷键调度器（单一所有权）：
 * 弹层打开时在 window 捕获阶段优先拦截 Escape，避免被中文输入法 Process/isComposing 或浏览器扩展吞掉。
 */
export function bindGlobalShortcuts(
  handlers: GlobalShortcutHandlers,
): () => void {
  const onOverlayEscapeCapture = (event: KeyboardEvent) => {
    if (!isEscapeKey(event)) return
    const ctx = handlers.getContext()
    if (!ctx.searchOpen && !ctx.shortcutsOpen && !ctx.confirmOpen) return
    if (shouldDeferEscapeToSearchIme(event, ctx)) return

    event.preventDefault()
    event.stopPropagation()
    handlers.closeOverlay()
  }

  const onKeyDown = (event: KeyboardEvent) => {
    const action = matchGlobalShortcut(event, handlers.getContext())
    if (!action) return

    event.preventDefault()
    if (action === 'close-overlay') handlers.closeOverlay()
    else if (action === 'toggle-search') handlers.toggleSearch()
    else if (action === 'open-search') handlers.openSearch()
    else if (action === 'toggle-shortcuts') handlers.toggleShortcuts()
    else if (action === 'cycle-theme') handlers.cycleTheme()
  }

  window.addEventListener('keydown', onOverlayEscapeCapture, true)
  window.addEventListener('keydown', onKeyDown)
  return () => {
    window.removeEventListener('keydown', onOverlayEscapeCapture, true)
    window.removeEventListener('keydown', onKeyDown)
  }
}
