/**
 * 实测加锁前后视口宽度差值并按需补白（遵循 blog-main 锁滚 ADR）。
 * 兼顾 scrollbar-gutter: stable 与 overlay 滚动条，避免开弹层时页面横跳或双倍留白。
 */

let lockCount = 0
let previousOverflow = ''
let previousPaddingRight = ''

export function lockBodyScroll() {
  if (typeof document === 'undefined') return
  lockCount += 1
  if (lockCount > 1) return

  const body = document.body
  const root = document.documentElement
  const widthBefore = root.clientWidth

  previousOverflow = body.style.overflow
  previousPaddingRight = body.style.paddingRight

  body.style.overflow = 'hidden'
  const widthAfter = root.clientWidth
  const delta = widthAfter - widthBefore

  if (delta > 0) {
    const computedPaddingRight =
      parseFloat(window.getComputedStyle(body).paddingRight) || 0
    body.style.paddingRight = `${computedPaddingRight + delta}px`
  }
}

export function unlockBodyScroll() {
  if (typeof document === 'undefined' || lockCount === 0) return
  lockCount -= 1
  if (lockCount > 0) return

  const body = document.body
  body.style.overflow = previousOverflow
  body.style.paddingRight = previousPaddingRight
}
