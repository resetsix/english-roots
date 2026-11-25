import { describe, expect, it, vi } from 'vitest'
import {
  bindGlobalShortcuts,
  isComposingEvent,
  isEditableTarget,
  isEscapeKey,
  isQuestionMarkKey,
  matchGlobalShortcut,
} from '$lib/utils/shortcuts'

function makeEvent(
  overrides: Partial<KeyboardEvent> & { target?: EventTarget | null },
): KeyboardEvent {
  return {
    key: '',
    code: '',
    keyCode: 0,
    metaKey: false,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    repeat: false,
    defaultPrevented: false,
    isComposing: false,
    target: document.body,
    ...overrides,
  } as KeyboardEvent
}

describe('global shortcut guards and triggers', () => {
  const closed = {
    searchOpen: false,
    shortcutsOpen: false,
    confirmOpen: false,
  }

  it('blocks IME composition events (isComposing or keyCode 229)', () => {
    expect(isComposingEvent(makeEvent({ key: '/', isComposing: true }))).toBe(
      true,
    )
    expect(isComposingEvent(makeEvent({ key: 'k', keyCode: 229 }))).toBe(true)
    expect(
      matchGlobalShortcut(
        makeEvent({ key: 'k', metaKey: true, isComposing: true }),
        closed,
        false,
      ),
    ).toBeNull()
  })

  it('guards single-key shortcuts inside inputs while allowing Cmd/Ctrl+K and Esc', () => {
    const input = document.createElement('input')
    document.body.append(input)
    expect(isEditableTarget(input)).toBe(true)

    expect(
      matchGlobalShortcut(
        makeEvent({ key: '/', target: input }),
        closed,
        false,
      ),
    ).toBeNull()
    expect(
      matchGlobalShortcut(
        makeEvent({ key: '?', target: input }),
        closed,
        false,
      ),
    ).toBeNull()
    expect(
      matchGlobalShortcut(
        makeEvent({ key: 'T', shiftKey: true, target: input }),
        closed,
        false,
      ),
    ).toBeNull()
    expect(
      matchGlobalShortcut(
        makeEvent({ key: 'k', metaKey: true, target: input }),
        closed,
        false,
      ),
    ).toBe('toggle-search')
    expect(
      matchGlobalShortcut(
        makeEvent({ key: 'Escape', code: 'Escape', target: input }),
        { ...closed, searchOpen: true },
        true,
      ),
    ).toBe('close-overlay')
    // Active IME composition in search input defers first Escape to IME
    expect(
      matchGlobalShortcut(
        makeEvent({
          key: 'Process',
          code: 'Escape',
          isComposing: true,
          target: input,
        }),
        { ...closed, searchOpen: true },
        true,
      ),
    ).toBeNull()

    input.remove()
  })

  it('respects blocking overlays for /, ?, and Cmd+K and supports full-width ？', () => {
    expect(matchGlobalShortcut(makeEvent({ key: '/' }), closed, false)).toBe(
      'open-search',
    )
    expect(
      matchGlobalShortcut(makeEvent({ key: '/' }), closed, true),
    ).toBeNull()
    expect(matchGlobalShortcut(makeEvent({ key: '?' }), closed, false)).toBe(
      'toggle-shortcuts',
    )
    expect(matchGlobalShortcut(makeEvent({ key: '？' }), closed, false)).toBe(
      'toggle-shortcuts',
    )
    expect(
      matchGlobalShortcut(
        makeEvent({ key: 'T', code: 'KeyT', shiftKey: true }),
        closed,
        false,
      ),
    ).toBe('cycle-theme')
    expect(
      matchGlobalShortcut(
        makeEvent({ key: 'T', code: 'KeyT', shiftKey: true }),
        { ...closed, shortcutsOpen: true },
        true,
      ),
    ).toBeNull()
    expect(
      matchGlobalShortcut(
        makeEvent({ key: 'k', ctrlKey: true }),
        { ...closed, confirmOpen: true },
        true,
      ),
    ).toBeNull()
  })

  it('closes modal on Escape in capture phase even under Chinese IME Process or defaultPrevented', () => {
    const closeOverlay = vi.fn()
    const toggleShortcuts = vi.fn()
    const cycleTheme = vi.fn()
    const unbind = bindGlobalShortcuts({
      getContext: () => ({
        searchOpen: false,
        shortcutsOpen: true,
        confirmOpen: false,
      }),
      closeOverlay,
      toggleSearch: vi.fn(),
      openSearch: vi.fn(),
      toggleShortcuts,
      cycleTheme,
    })

    // Standard Escape
    document.body.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Escape',
        code: 'Escape',
        bubbles: true,
        cancelable: true,
      }),
    )
    expect(closeOverlay).toHaveBeenCalledTimes(1)

    // macOS Chinese IME Process + code='Escape' + isComposing=true
    document.body.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Process',
        code: 'Escape',
        isComposing: true,
        bubbles: true,
        cancelable: true,
      }),
    )
    expect(closeOverlay).toHaveBeenCalledTimes(2)

    // Already defaultPrevented (e.g. browser extension)
    const prevented = new KeyboardEvent('keydown', {
      key: 'Escape',
      code: 'Escape',
      bubbles: true,
      cancelable: true,
    })
    prevented.preventDefault()
    document.body.dispatchEvent(prevented)
    expect(closeOverlay).toHaveBeenCalledTimes(3)

    // Full-width ？ toggles shortcuts modal closed
    document.body.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: '？',
        bubbles: true,
        cancelable: true,
      }),
    )
    expect(toggleShortcuts).toHaveBeenCalledTimes(1)

    unbind()
  })

  it('recognizes Escape and question mark variants', () => {
    expect(isEscapeKey({ key: 'Escape', code: 'Escape' })).toBe(true)
    expect(isEscapeKey({ key: 'Esc', code: '' })).toBe(true)
    expect(isEscapeKey({ key: 'Process', code: 'Escape' })).toBe(true)
    expect(
      isQuestionMarkKey({
        key: '？',
        code: 'Slash',
        shiftKey: true,
        metaKey: false,
        ctrlKey: false,
        altKey: false,
      }),
    ).toBe(true)
  })
})
