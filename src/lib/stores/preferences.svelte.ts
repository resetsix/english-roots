import {
  ensureFontPresetLoaded,
  isFontPresetLoaded,
  type FontPreset,
} from '$lib/utils/font-loader'

export const SETTINGS_STORAGE_KEY = 'wordRootSettings'

export type ColorMode = 'system' | 'light' | 'dark'
export type PalettePreset = 'default' | 'warm-sand' | 'ink'
export type AudioAccent = 'us' | 'uk'
export type { FontPreset }

export interface UserSettings {
  colorMode: ColorMode
  palette: PalettePreset
  fontPreset: FontPreset
  audioEnabled: boolean
  audioAccent: AudioAccent
}

export const PALETTE_PRESETS: readonly PalettePreset[] = [
  'default',
  'warm-sand',
  'ink',
] as const

export const COLOR_MODES: readonly ColorMode[] = [
  'system',
  'light',
  'dark',
] as const

export const COLOR_MODE_LABELS: Record<ColorMode, string> = {
  system: '跟随系统',
  light: '浅色模式',
  dark: '深色模式',
}

export const FONT_PRESETS: readonly FontPreset[] = [
  'default',
  'lxgw-wenkai-screen',
] as const

const THEME_META_COLORS: Record<
  PalettePreset,
  { light: string; dark: string }
> = {
  default: { light: '#fcfcfc', dark: '#18181b' },
  'warm-sand': { light: '#faf8f2', dark: '#1e1b17' },
  ink: { light: '#f7f9fb', dark: '#11151c' },
}

export function createDefaultSettings(): UserSettings {
  return {
    colorMode: 'system',
    palette: 'default',
    fontPreset: 'default',
    audioEnabled: true,
    audioAccent: 'us',
  }
}

export function normalizeSettings(raw: unknown): UserSettings {
  const defaults = createDefaultSettings()
  if (!raw || typeof raw !== 'object') return defaults

  const input = raw as Record<string, unknown>
  const colorMode: ColorMode =
    input.colorMode === 'light' ||
    input.colorMode === 'dark' ||
    input.colorMode === 'system'
      ? input.colorMode
      : input.themeMode === 'light' ||
          input.themeMode === 'dark' ||
          input.themeMode === 'system'
        ? input.themeMode
        : defaults.colorMode

  let palette: PalettePreset = defaults.palette
  if (
    input.palette === 'default' ||
    input.palette === 'warm-sand' ||
    input.palette === 'ink'
  ) {
    palette = input.palette
  } else if (input.readingTheme === 'classic') {
    palette = 'warm-sand'
  } else if (input.readingTheme === 'book') {
    palette = 'default'
  }

  const fontPreset: FontPreset =
    input.fontPreset === 'lxgw-wenkai-screen' ? 'lxgw-wenkai-screen' : 'default'

  const audioEnabled =
    typeof input.audioEnabled === 'boolean'
      ? input.audioEnabled
      : defaults.audioEnabled

  const audioAccent: AudioAccent = input.audioAccent === 'uk' ? 'uk' : 'us'

  return {
    colorMode,
    palette,
    fontPreset,
    audioEnabled,
    audioAccent,
  }
}

function isBrowser() {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined'
}

function getSystemDark(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

let cancelThemeTransitionCleanup: (() => void) | null = null

function suppressTransitionsForThemeChange(root: HTMLElement) {
  cancelThemeTransitionCleanup?.()
  cancelThemeTransitionCleanup = null

  root.classList.add('theme-switching')

  return () => {
    void root.offsetHeight

    if (
      typeof window !== 'undefined' &&
      typeof window.requestAnimationFrame === 'function'
    ) {
      let frame2 = 0
      const frame1 = window.requestAnimationFrame(() => {
        frame2 = window.requestAnimationFrame(() => {
          root.classList.remove('theme-switching')
          cancelThemeTransitionCleanup = null
        })
      })
      cancelThemeTransitionCleanup = () => {
        window.cancelAnimationFrame(frame1)
        if (frame2) window.cancelAnimationFrame(frame2)
      }
      return
    }

    const timer = setTimeout(() => {
      root.classList.remove('theme-switching')
      cancelThemeTransitionCleanup = null
    }, 0)
    cancelThemeTransitionCleanup = () => clearTimeout(timer)
  }
}

class PreferencesStore {
  settings = $state<UserSettings>(createDefaultSettings())
  systemDark = $state(false)
  loadingFont = $state(false)
  private initialized = false
  private fontToken = 0

  resolvedDark = $derived(
    this.settings.colorMode === 'dark' ||
      (this.settings.colorMode === 'system' && this.systemDark),
  )

  init() {
    if (!isBrowser()) return

    this.systemDark = getSystemDark()
    this.loadFromStorage()
    this.applyToDocument()

    if (this.initialized) return
    this.initialized = true

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', (event) => {
      this.systemDark = event.matches
      if (this.settings.colorMode === 'system') {
        this.applyToDocument()
      }
    })
  }

  loadFromStorage() {
    if (!isBrowser()) return
    try {
      const raw = localStorage.getItem(SETTINGS_STORAGE_KEY)
      this.settings = raw
        ? normalizeSettings(JSON.parse(raw))
        : createDefaultSettings()
    } catch {
      this.settings = createDefaultSettings()
    }
  }

  private persist() {
    if (!isBrowser()) return
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(this.settings))
  }

  applyToDocument() {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    const resolved: 'light' | 'dark' = this.resolvedDark ? 'dark' : 'light'
    const previousResolved: 'light' | 'dark' | null = root.classList.contains(
      'dark',
    )
      ? 'dark'
      : root.classList.contains('light')
        ? 'light'
        : null
    const previousPalette = root.dataset.palette ?? 'default'
    const visualChanged =
      previousResolved !== null &&
      (previousResolved !== resolved ||
        previousPalette !== this.settings.palette)
    const restoreTransitions = visualChanged
      ? suppressTransitionsForThemeChange(root)
      : null

    root.classList.remove('light', 'dark')
    root.classList.add(resolved)
    root.style.colorScheme = resolved

    if (this.settings.palette === 'default') {
      delete root.dataset.palette
    } else {
      root.dataset.palette = this.settings.palette
    }

    const themeColor = THEME_META_COLORS[this.settings.palette][resolved]
    let meta = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]',
    )
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'theme-color'
      document.head.appendChild(meta)
    }
    meta.content = themeColor

    restoreTransitions?.()

    const targetFont = this.settings.fontPreset
    if (targetFont === 'default') {
      this.loadingFont = false
      delete root.dataset.fontPreset
      return
    }

    if (isFontPresetLoaded(targetFont)) {
      this.loadingFont = false
      root.dataset.fontPreset = targetFont
      return
    }

    const token = ++this.fontToken
    this.loadingFont = true
    void ensureFontPresetLoaded(targetFont).then(() => {
      if (token !== this.fontToken) return
      this.loadingFont = false
      if (this.settings.fontPreset === targetFont) {
        document.documentElement.dataset.fontPreset = targetFont
      }
    })
  }

  update(patch: Partial<UserSettings>) {
    this.settings = normalizeSettings({ ...this.settings, ...patch })
    this.persist()
    this.applyToDocument()
  }

  setColorMode(colorMode: ColorMode) {
    this.update({ colorMode })
  }

  toggleDarkMode(): 'light' | 'dark' {
    const next: 'light' | 'dark' = this.resolvedDark ? 'light' : 'dark'
    this.setColorMode(next)
    return next
  }

  cycleColorMode(): ColorMode {
    const idx = COLOR_MODES.indexOf(this.settings.colorMode)
    const next = COLOR_MODES[(idx + 1) % COLOR_MODES.length] ?? 'system'
    this.setColorMode(next)
    return next
  }

  setPalette(palette: PalettePreset) {
    this.update({ palette })
  }

  setFontPreset(fontPreset: FontPreset) {
    this.update({ fontPreset })
  }

  setAudioAccent(audioAccent: AudioAccent) {
    this.update({ audioAccent })
  }

  toggleAudioAccent(): AudioAccent {
    const next: AudioAccent = this.settings.audioAccent === 'us' ? 'uk' : 'us'
    this.setAudioAccent(next)
    return next
  }

  setAudioEnabled(audioEnabled: boolean) {
    this.update({ audioEnabled })
  }

  importSettings(raw: unknown) {
    this.settings = normalizeSettings(raw)
    this.persist()
    this.applyToDocument()
  }

  reset() {
    this.settings = createDefaultSettings()
    if (isBrowser()) {
      localStorage.removeItem(SETTINGS_STORAGE_KEY)
    }
    this.applyToDocument()
  }
}

export const preferences = new PreferencesStore()
