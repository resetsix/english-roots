import { flushSync, mount, tick, unmount } from 'svelte'
import { afterEach, describe, expect, it } from 'vitest'
import ConfirmModal from '$lib/components/ConfirmModal.svelte'
import ShortcutsModal from '$lib/components/ShortcutsModal.svelte'
import { ui } from '$lib/stores/ui.svelte'
import { bindGlobalShortcuts } from '$lib/utils/shortcuts'

describe('ShortcutsModal and ConfirmModal accessibility & Escape integration', () => {
  afterEach(() => {
    ui.resolveConfirm(false)
    ui.closeShortcuts()
    document.body.innerHTML = ''
  })

  it('closes mounted ShortcutsModal on Escape, IME Process+Escape, and restores focus safely', () => {
    const triggerBtn = document.createElement('button')
    triggerBtn.textContent = '快捷键'
    document.body.appendChild(triggerBtn)
    triggerBtn.focus()

    const target = document.createElement('div')
    document.body.appendChild(target)

    const instance = mount(ShortcutsModal, { target })
    const unbind = bindGlobalShortcuts({
      getContext: () => ({
        searchOpen: ui.searchOpen,
        shortcutsOpen: ui.shortcutsOpen,
        confirmOpen: ui.confirmState !== null,
      }),
      closeOverlay: () => ui.closeTopOverlay(),
      toggleSearch: () => ui.toggleSearch(),
      openSearch: () => ui.openSearch(),
      toggleShortcuts: () => ui.toggleShortcuts(),
      cycleTheme: () => {},
    })

    ui.openShortcuts()
    flushSync()
    expect(target.querySelector('[role="dialog"]')).not.toBeNull()

    const closeBtn = target.querySelector<HTMLButtonElement>(
      'button[aria-label="关闭快捷键面板"]',
    )
    expect(closeBtn).not.toBeNull()
    closeBtn?.focus()

    closeBtn?.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Escape',
        code: 'Escape',
        bubbles: true,
        cancelable: true,
      }),
    )
    flushSync()
    expect(ui.shortcutsOpen).toBe(false)
    expect(target.querySelector('[role="dialog"]')).toBeNull()
    expect(document.activeElement).toBe(triggerBtn)

    // Re-open and close with macOS Chinese IME Process + code='Escape' + isComposing
    ui.openShortcuts()
    flushSync()
    expect(target.querySelector('[role="dialog"]')).not.toBeNull()

    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Process',
        code: 'Escape',
        isComposing: true,
        bubbles: true,
        cancelable: true,
      }),
    )
    flushSync()
    expect(ui.shortcutsOpen).toBe(false)
    expect(target.querySelector('[role="dialog"]')).toBeNull()

    // Re-open, detach previous trigger button, then close with already-prevented Escape
    ui.openShortcuts()
    flushSync()
    triggerBtn.remove()

    const prevented = new KeyboardEvent('keydown', {
      key: 'Escape',
      code: 'Escape',
      bubbles: true,
      cancelable: true,
    })
    prevented.preventDefault()
    window.dispatchEvent(prevented)
    flushSync()
    expect(ui.shortcutsOpen).toBe(false)
    expect(target.querySelector('[role="dialog"]')).toBeNull()

    unbind()
    void unmount(instance)
  })

  it('auto-focuses cancel button, traps Tab, and resolves false on Escape in ConfirmModal', async () => {
    const target = document.createElement('div')
    document.body.appendChild(target)

    const instance = mount(ConfirmModal, { target })
    const unbind = bindGlobalShortcuts({
      getContext: () => ({
        searchOpen: ui.searchOpen,
        shortcutsOpen: ui.shortcutsOpen,
        confirmOpen: ui.confirmState !== null,
      }),
      closeOverlay: () => ui.closeTopOverlay(),
      toggleSearch: () => ui.toggleSearch(),
      openSearch: () => ui.openSearch(),
      toggleShortcuts: () => ui.toggleShortcuts(),
      cycleTheme: () => {},
    })

    const promise = ui.confirm({
      title: '清除本地数据？',
      description: '测试确认框',
      confirmLabel: '清除',
      cancelLabel: '取消',
      danger: true,
    })
    flushSync()
    await tick()

    const buttons = target.querySelectorAll<HTMLButtonElement>('button')
    expect(buttons).toHaveLength(2)
    expect(document.activeElement).toBe(buttons[0])

    // Shift+Tab from first button wraps to last button
    buttons[0].dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Tab',
        shiftKey: true,
        bubbles: true,
        cancelable: true,
      }),
    )
    expect(document.activeElement).toBe(buttons[1])

    // Escape closes and resolves false
    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Escape',
        code: 'Escape',
        bubbles: true,
        cancelable: true,
      }),
    )
    flushSync()
    await expect(promise).resolves.toBe(false)
    expect(target.querySelector('[role="dialog"]')).toBeNull()

    unbind()
    void unmount(instance)
  })
})
