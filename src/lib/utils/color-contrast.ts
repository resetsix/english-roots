/**
 * 颜色对比度工具：WCAG 2.x 相对亮度对比度 + OKLab 明度距离计算。
 * 供主题色板自动化单测（theme-contrast.test.ts）使用。
 */

export type Rgb = readonly [number, number, number]

const HEX_COLOR_PATTERN = /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i
const RGBA_PATTERN =
  /^rgba\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)$/i
const OKLCH_PATTERN =
  /^oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+)(%?))?\s*\)$/i

export function parseHexColor(
  value: string,
): { rgb: Rgb; alpha: number } | null {
  const match = value.trim().match(HEX_COLOR_PATTERN)
  if (!match) return null

  let hex = match[1]
  if (hex.length === 3) {
    hex = [...hex].map((char) => char + char).join('')
  }

  return {
    rgb: [0, 2, 4].map((index) =>
      parseInt(hex.slice(index, index + 2), 16),
    ) as unknown as Rgb,
    alpha: hex.length === 8 ? parseInt(hex.slice(6), 16) / 255 : 1,
  }
}

export function resolveColorOnBackground(
  value: string,
  background: Rgb,
): Rgb | null {
  if (!value) return null

  const hex = parseHexColor(value)
  if (hex) return blend(hex.rgb, hex.alpha, background)

  const rgba = value.trim().match(RGBA_PATTERN)
  if (rgba) {
    const rgb = [Number(rgba[1]), Number(rgba[2]), Number(rgba[3])] as const
    return blend(rgb, Number(rgba[4]), background)
  }

  const oklch = value.trim().match(OKLCH_PATTERN)
  if (oklch) {
    const rawL = Number(oklch[1])
    const lightness = oklch[2] === '%' ? rawL / 100 : rawL
    const chroma = Number(oklch[3])
    const hueRad = (Number(oklch[4]) * Math.PI) / 180
    const a = chroma * Math.cos(hueRad)
    const b = chroma * Math.sin(hueRad)
    const rgb = oklabToRgb([lightness, a, b])
    const rawAlpha = oklch[5] !== undefined ? Number(oklch[5]) : 1
    const alpha = oklch[6] === '%' ? rawAlpha / 100 : rawAlpha
    return blend(rgb, alpha, background)
  }

  return null
}

function blend(rgb: Rgb, alpha: number, background: Rgb): Rgb {
  return rgb.map(
    (value, index) => value * alpha + background[index] * (1 - alpha),
  ) as unknown as Rgb
}

function toLinear(channel: number) {
  const value = channel / 255
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
}

function fromLinear(value: number) {
  const clamped = Math.min(1, Math.max(0, value))
  return Math.round(
    (clamped <= 0.0031308
      ? 12.92 * clamped
      : 1.055 * clamped ** (1 / 2.4) - 0.055) * 255,
  )
}

export function relativeLuminance([r, g, b]: Rgb) {
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)
}

export function contrastRatio(foreground: Rgb, background: Rgb) {
  const [lighter, darker] = [
    relativeLuminance(foreground),
    relativeLuminance(background),
  ].sort((a, b) => b - a)
  return (lighter + 0.05) / (darker + 0.05)
}

export function rgbToOklab([r, g, b]: Rgb): [number, number, number] {
  const [lr, lg, lb] = [toLinear(r), toLinear(g), toLinear(b)]
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb)
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb)
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb)

  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ]
}

export function oklabToRgb([lightness, a, b]: readonly [
  number,
  number,
  number,
]): Rgb {
  const l = (lightness + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m = (lightness - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s = (lightness - 0.0894841775 * a - 1.291485548 * b) ** 3

  return [
    fromLinear(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    fromLinear(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    fromLinear(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
  ]
}
