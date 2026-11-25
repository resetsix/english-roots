export type FontPreset = 'default' | 'lxgw-wenkai-screen'

let serialQueue: Promise<void> = Promise.resolve()
const loadedPresets = new Set<FontPreset>(['default'])

function nextFrame() {
  return new Promise<void>((resolve) => {
    if (typeof requestAnimationFrame === 'function') {
      requestAnimationFrame(() => resolve())
    } else {
      resolve()
    }
  })
}

async function waitForFontReady(family: string, timeoutMs = 2600) {
  if (typeof document === 'undefined' || !('fonts' in document)) return
  try {
    const loadPromise = document.fonts.load(`400 16px "${family}"`, '词根树')
    await Promise.race([
      loadPromise,
      new Promise((resolve) => setTimeout(resolve, timeoutMs)),
    ])
  } catch {
    // Graceful fallback to system font if network or font subsystem fails
  }
}

/**
 * 串行 FIFO 按需加载非默认 CJK 字体分片 CSS。
 * 对齐 blog-main CJK 字体 ADR：禁止并行动态加载多份字体 CSS，
 * 避免 Blink 触发 FontFaceCache::ClearCSSConnected() 导致整页跨帧闪白。
 */
export function ensureFontPresetLoaded(preset: FontPreset): Promise<void> {
  if (preset === 'default' || loadedPresets.has(preset)) {
    return Promise.resolve()
  }

  serialQueue = serialQueue
    .then(async () => {
      if (loadedPresets.has(preset)) return
      if (preset === 'lxgw-wenkai-screen') {
        await import('$lib/styles/lxgw-wenkai-screen.css')
        await nextFrame()
        await waitForFontReady('LXGW WenKai Screen')
      }
      loadedPresets.add(preset)
    })
    .catch(() => {})

  return serialQueue
}

export function isFontPresetLoaded(preset: FontPreset): boolean {
  return loadedPresets.has(preset)
}
