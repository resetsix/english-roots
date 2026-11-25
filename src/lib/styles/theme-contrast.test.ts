import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { PALETTE_PRESETS } from '$lib/stores/preferences.svelte'
import {
  contrastRatio,
  resolveColorOnBackground,
  rgbToOklab,
  type Rgb,
} from '$lib/utils/color-contrast'

const varsCss = readFileSync(
  join(process.cwd(), 'src/lib/styles/vars.css'),
  'utf8',
)
const globalCss = readFileSync(
  join(process.cwd(), 'src/lib/styles/global.css'),
  'utf8',
)
const animationCss = readFileSync(
  join(process.cwd(), 'src/lib/styles/animation.css'),
  'utf8',
)
const appHtml = readFileSync(join(process.cwd(), 'src/app.html'), 'utf8')

type Palette = Record<string, string>

function parseDeclarations(body: string): Palette {
  return Object.fromEntries(
    [...body.matchAll(/--([\w-]+):\s*([^;]+);/g)].map((match) => [
      match[1],
      match[2].trim(),
    ]),
  )
}

function readPalettes() {
  const palettes = new Map<string, Palette>()
  const base = {
    light: parseDeclarations(varsCss.match(/^:root \{([\s\S]*?)\n\}/m)![1]),
    dark: parseDeclarations(
      varsCss.match(/^:root\.dark \{([\s\S]*?)\n\}/m)![1],
    ),
  }

  for (const preset of PALETTE_PRESETS) {
    for (const mode of ['light', 'dark'] as const) {
      const selector =
        mode === 'dark'
          ? `:root.dark[data-palette='${preset}']`
          : `:root[data-palette='${preset}']`
      const block = varsCss.match(
        new RegExp(
          `^${selector.replace(/[.[\]]/g, '\\$&')} \\{([^}]*)\\}`,
          'm',
        ),
      )
      const overrides =
        preset === 'default' || !block ? {} : parseDeclarations(block[1])

      palettes.set(`${preset}/${mode}`, { ...base[mode], ...overrides })
    }
  }

  return palettes
}

const palettes = readPalettes()

function color(palette: Palette, token: string, background: Rgb): Rgb {
  const raw = palette[`color-${token}`]
  const resolved = resolveColorOnBackground(raw, background)
  if (!resolved) {
    throw new Error(`无法解析 --color-${token}: ${raw}`)
  }
  return resolved
}

describe.each([...palettes.entries()])('theme palette %s', (_key, palette) => {
  const primary = color(palette, 'bg-primary', [0, 0, 0])
  const secondary = color(palette, 'bg-secondary', primary)
  const tertiary = color(palette, 'bg-tertiary', primary)

  it('keeps 4-tier text contrast hierarchy readable and distinct', () => {
    const tiers = ['primary', 'secondary', 'tertiary', 'quaternary'].map(
      (tier) => contrastRatio(color(palette, `text-${tier}`, primary), primary),
    )

    expect(tiers[0]).toBeGreaterThanOrEqual(12)
    expect(tiers[1]).toBeGreaterThanOrEqual(8)
    expect(tiers[2]).toBeGreaterThanOrEqual(5)
    expect(
      contrastRatio(color(palette, 'text-tertiary', secondary), secondary),
    ).toBeGreaterThanOrEqual(4.5)
    expect(
      contrastRatio(color(palette, 'text-tertiary', tertiary), tertiary),
    ).toBeGreaterThanOrEqual(4.5)
    expect(tiers[3]).toBeGreaterThanOrEqual(3.2)
    expect(tiers[3]).toBeLessThanOrEqual(4.5)

    expect(tiers[0] - tiers[1]).toBeGreaterThanOrEqual(2)
    expect(tiers[1] - tiers[2]).toBeGreaterThanOrEqual(1.5)
    expect(tiers[2] - tiers[3]).toBeGreaterThanOrEqual(1)
  })

  it('orders border tokens monotonically in OKLab lightness distance', () => {
    const primaryL = rgbToOklab(primary)[0]
    const distances = [
      'border',
      'border-secondary',
      'border-tertiary',
      'border-quaternary',
    ].map((token) =>
      Math.abs(rgbToOklab(color(palette, token, primary))[0] - primaryL),
    )

    for (let i = 1; i < distances.length; i += 1) {
      expect(distances[i]).toBeGreaterThan(distances[i - 1])
    }
  })

  it('keeps hover surface bg-tertiary clearly elevated (~2x step) over bg-secondary', () => {
    const primaryL = rgbToOklab(primary)[0]
    const secondaryDelta = Math.abs(rgbToOklab(secondary)[0] - primaryL)
    const tertiaryDelta = Math.abs(rgbToOklab(tertiary)[0] - primaryL)

    expect(tertiaryDelta).toBeGreaterThanOrEqual(secondaryDelta * 1.6)
    expect(tertiaryDelta).toBeGreaterThanOrEqual(0.05)
    expect(
      contrastRatio(color(palette, 'text-primary', tertiary), tertiary),
    ).toBeGreaterThanOrEqual(10)
  })

  it('keeps accent, morpheme chips, and feedback semantic colors WCAG AA (>= 4.5:1)', () => {
    const accent = color(palette, 'accent', primary)
    const accentFg = color(palette, 'accent-foreground', accent)
    const accentTint: Rgb = [
      Math.round(accent[0] * 0.1 + primary[0] * 0.9),
      Math.round(accent[1] * 0.1 + primary[1] * 0.9),
      Math.round(accent[2] * 0.1 + primary[2] * 0.9),
    ]

    expect(contrastRatio(accentFg, accent)).toBeGreaterThanOrEqual(4.5)
    expect(contrastRatio(accent, primary)).toBeGreaterThanOrEqual(4.5)
    expect(contrastRatio(accent, accentTint)).toBeGreaterThanOrEqual(4.5)

    for (const [fgToken, bgToken] of [
      ['prefix', 'prefix-bg'],
      ['root', 'root-bg'],
      ['suffix', 'suffix-bg'],
      ['success', 'success-bg'],
      ['danger', 'danger-bg'],
      ['warning', 'warning-bg'],
    ] as const) {
      const fg = color(palette, fgToken, primary)
      const bg = color(palette, bgToken, primary)
      expect(contrastRatio(fg, primary)).toBeGreaterThanOrEqual(4.5)
      expect(contrastRatio(fg, bg)).toBeGreaterThanOrEqual(4.5)
    }
  })
})

describe('global CSS & font isolation contracts', () => {
  it('enforces overscroll suppression, stable gutter, mobile 16px inputs, layered components, instant theme switch, unified tooltip, and reduced motion', () => {
    expect(globalCss).toContain('overscroll-behavior-x: none;')
    expect(globalCss).toContain('overscroll-behavior-y: none;')
    expect(globalCss).toContain('scrollbar-gutter: stable;')
    expect(globalCss).toContain('::-webkit-search-cancel-button')
    expect(globalCss).toContain('@layer components')
    expect(globalCss).toContain('.ui-tooltip')
    expect(globalCss).toMatch(
      /\.ui-icon-btn:hover\s*\{[\s\S]*?background-color:\s*var\(--color-bg-tertiary\)/,
    )
    expect(globalCss).toContain('html.theme-switching')
    expect(globalCss).toContain('transition: none !important;')
    expect(globalCss).toMatch(/color-mix\(\s*in oklab,/)
    expect(globalCss).not.toMatch(/color-mix\(\s*in oklch,/)
    expect(globalCss).toContain('@media (hover: hover) and (pointer: fine)')
    expect(globalCss).toContain('.root-explorer-card')
    expect(globalCss).toContain('content-visibility: auto;')
    expect(globalCss).toMatch(
      /@media\s*\(width\s*<\s*640px\)[\s\S]*font-size:\s*16px/,
    )
    expect(animationCss).toContain('prefers-reduced-motion: reduce')
    expect(animationCss).toContain('@keyframes locate-pulse')
    expect(animationCss).toContain("[data-locate-highlight='true']")

    const preHydrationDark =
      varsCss.match(/:root:not\(\.light\):not\(\.dark\)\s*\{([^}]*)\}/)?.[1] ??
      ''
    for (const token of [
      '--color-accent:',
      '--color-prefix:',
      '--color-root:',
      '--color-suffix:',
      '--color-success:',
      '--color-danger:',
      '--color-warning:',
    ]) {
      expect(preHydrationDark).toContain(token)
    }
  })

  it('prevents placeholder:text-text-quaternary contrast regressions in search inputs', () => {
    const rootsPage = readFileSync(
      join(process.cwd(), 'src/routes/roots/+page.svelte'),
      'utf8',
    )
    const searchModal = readFileSync(
      join(process.cwd(), 'src/lib/components/CommandSearchModal.svelte'),
      'utf8',
    )
    expect(rootsPage).not.toContain('placeholder:text-text-quaternary')
    expect(searchModal).not.toContain('placeholder:text-text-quaternary')
  })

  it('keeps LXGW WenKai Screen CSS out of static global styles and app shell', () => {
    expect(globalCss).not.toContain('lxgw-wenkai-screen.css')
    expect(appHtml).not.toContain('lxgw-wenkai-screen.css')
    expect(appHtml).toContain('wordRootSettings')
  })
})
