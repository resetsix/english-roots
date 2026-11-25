# 决策：六组主题对比度阶梯与词素语义色守门

Status: implemented
Date: 2026-11-25

## 问题

1. 旧版只有两套暖黄纸色主题，默认 `book` 主题甚至完全不支持深色模式；全屏 20px 方格底纹、装饰边线与四层边框套娃带来强烈视觉噪音；
2. 颜色靠大量随机 `color-mix` 拼凑，缺乏系统化的文字对比度阶梯和自动化校验，难以保证前缀、词根、后缀与答题反馈色在亮/暗双模式下全部清晰可读。

## 决策

1. **建立 3 套克制调色板（`default`、`warm-sand`、`ink`）× 亮/暗双模式 = 6 组完整主题**（`src/lib/styles/vars.css`），彻底移除方格底纹、装饰边线与冗余英文 Kicker。
2. **建立与 `blog-main` 一致的四级表面与四级文字对比度阶梯**：
   - `text-primary` on `bg-primary >= 12:1`
   - `text-secondary` on `bg-primary >= 8:1`（且与 primary 差 `>= 2`）
   - `text-tertiary` on `bg-primary >= 5.0:1`、on `bg-secondary >= 4.5:1`（与 secondary 差 `>= 1.5`）
   - `text-quaternary` on `bg-primary` **刻意控在 `3.2–4.5:1`**（仅用于弱装饰符号，与 tertiary 差 `>= 1.0`）
   - 4 级边框（`border` → `border-quaternary`）沿 OKLab 明度距离严格递增。
3. **词素与反馈语义色全量 WCAG AA 守门**：`prefix` / `root` / `suffix` / `success` / `danger` / `warning` 在 `bg-primary` 与各自浅底胶囊 `*-bg` 上均强制 `>= 4.5:1`；`accent-foreground` on `accent` 及 `accent` on `accent/10` 同样 `>= 4.5:1`。
4. **防闪白预绘制链**：`src/app.html` 首绘前内联脚本 + `vars.css` 预水合暗色媒体查询回退 + `preferences.svelte.ts` 响应式同步 `<meta name="theme-color">`。

## 已考虑的替代方案

- **将 `text-quaternary` 也统一拉高到 >= 4.5:1**：会让极弱符号与元数据失去视觉落差，压扁四级阅读层级，故否决。
- **保留复古手账方格背景**：与高效查词和长时学习场景冲突，且叠加双层 `sticky backdrop-filter` 拖累合成性能，故彻底移除。

## 后果或验收条件

- 任何对 `src/lib/styles/vars.css` 或 `tailwind.css` 的调色改动都必须通过 `pnpm test:contrast`。
