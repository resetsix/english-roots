export type ToastVariant = 'info' | 'success' | 'error'

export interface ToastItem {
  id: string
  message: string
  variant: ToastVariant
}

export interface ConfirmOptions {
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  danger?: boolean
}

export interface HeaderScrollContext {
  title: string
  subtitle?: string
}

interface InternalConfirmState extends ConfirmOptions {
  resolve: (accepted: boolean) => void
}

const toastTimers = new Map<string, ReturnType<typeof setTimeout>>()

class UIStore {
  searchOpen = $state(false)
  shortcutsOpen = $state(false)
  confirmState = $state<InternalConfirmState | null>(null)
  toasts = $state<ToastItem[]>([])
  headerContext = $state<HeaderScrollContext | null>(null)
  showHeaderContext = $state(false)

  private lastFocusBeforeModal: HTMLElement | null = null

  get hasOpenOverlay(): boolean {
    return this.searchOpen || this.shortcutsOpen || this.confirmState !== null
  }

  private captureFocusBeforeModal() {
    if (this.hasOpenOverlay) return
    this.lastFocusBeforeModal =
      typeof document !== 'undefined' &&
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null
  }

  private restoreFocusIfClosed() {
    if (this.hasOpenOverlay) return
    if (this.lastFocusBeforeModal?.isConnected) {
      this.lastFocusBeforeModal.focus({ preventScroll: true })
    }
    this.lastFocusBeforeModal = null
  }

  openSearch() {
    this.captureFocusBeforeModal()
    this.shortcutsOpen = false
    this.searchOpen = true
  }

  closeSearch() {
    if (!this.searchOpen) return
    this.searchOpen = false
    this.restoreFocusIfClosed()
  }

  toggleSearch() {
    if (this.searchOpen) {
      this.closeSearch()
    } else {
      this.openSearch()
    }
  }

  openShortcuts() {
    this.captureFocusBeforeModal()
    this.searchOpen = false
    this.shortcutsOpen = true
  }

  closeShortcuts() {
    if (!this.shortcutsOpen) return
    this.shortcutsOpen = false
    this.restoreFocusIfClosed()
  }

  toggleShortcuts() {
    if (this.shortcutsOpen) {
      this.closeShortcuts()
    } else {
      this.openShortcuts()
    }
  }

  confirm(options: ConfirmOptions): Promise<boolean> {
    if (this.confirmState) {
      this.confirmState.resolve(false)
    }
    this.captureFocusBeforeModal()
    return new Promise<boolean>((resolve) => {
      this.confirmState = {
        confirmLabel: '确认',
        cancelLabel: '取消',
        danger: false,
        ...options,
        resolve,
      }
    })
  }

  resolveConfirm(accepted: boolean) {
    if (!this.confirmState) return
    const resolver = this.confirmState.resolve
    this.confirmState = null
    this.restoreFocusIfClosed()
    resolver(accepted)
  }

  closeTopOverlay() {
    if (this.confirmState) {
      this.resolveConfirm(false)
      return
    }
    if (this.searchOpen) {
      this.closeSearch()
      return
    }
    if (this.shortcutsOpen) {
      this.closeShortcuts()
    }
  }

  toast(options: {
    id?: string
    message: string
    variant?: ToastVariant
    durationMs?: number
  }): string {
    const id =
      options.id ??
      `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
    const item: ToastItem = {
      id,
      message: options.message,
      variant: options.variant ?? 'info',
    }

    const prev = toastTimers.get(id)
    if (prev) clearTimeout(prev)

    const existing = this.toasts.findIndex((entry) => entry.id === id)
    if (existing >= 0) {
      this.toasts = this.toasts.map((entry, idx) =>
        idx === existing ? item : entry,
      )
    } else {
      this.toasts = [...this.toasts.slice(-2), item]
    }

    const duration = options.durationMs ?? 2400
    if (duration > 0) {
      toastTimers.set(
        id,
        setTimeout(() => {
          this.dismissToast(id)
        }, duration),
      )
    }
    return id
  }

  dismissToast(id: string) {
    const timer = toastTimers.get(id)
    if (timer) {
      clearTimeout(timer)
      toastTimers.delete(id)
    }
    this.toasts = this.toasts.filter((item) => item.id !== id)
  }

  setHeaderContext(context: HeaderScrollContext | null) {
    this.headerContext = context
    if (!context) {
      this.showHeaderContext = false
    }
  }

  setShowHeaderContext(visible: boolean) {
    this.showHeaderContext = Boolean(this.headerContext) && visible
  }
}

export const ui = new UIStore()
