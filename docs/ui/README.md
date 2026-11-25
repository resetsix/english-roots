# UI 视觉与交互规范入口

> 文档版本/日期：v1.0 / 2026-11-25
> 真相源对照：CSS 变量以 `src/lib/styles/vars.css`、`tailwind.css` 与 `global.css` 为准；历史决策以 `docs/decisions/implemented/` 为准。
> 状态：定稿；改动任何可见样式、主题、动效、滚动、字体、快捷键或交互前必读。

改动任何界面前，请按顺序确认：

1. [主题与对比度规范](theme-and-contrast.md) - 3 套调色板 × 亮暗 6 组主题、四级文字对比度阶梯、词素语义色与字体按需加载策略。
2. [全局交互契约](interactions.md) - 滚动阻尼与实测锁滚、链接三层下划线、全局 `⌘K` 搜索、快捷键守卫、闪卡主动回忆与两步学习流程。

## 1. 高频误撤红线速查表

以下行为均由对应 ADR 与自动化测试守门，**未经用户明确同意并修订 ADR 前，严禁在优化或重构中回退**：

| 不可随意改动的点                                                                 | 所在位置                                                             | 为什么必须保留                                       | 决策依据                                                                                       |
| :------------------------------------------------------------------------------- | :------------------------------------------------------------------- | :--------------------------------------------------- | :--------------------------------------------------------------------------------------------- |
| 根容器 `overscroll-behavior-x/y: none` 与 `scrollbar-gutter: stable`             | `src/lib/styles/global.css`                                          | 抑制移动端橡皮筋回弹，稳定桌面滚动条槽位             | [主题对比度 ADR](../decisions/implemented/2026-11-25-theme-contrast-and-morpheme-palette.md)   |
| `scroll-lock.ts` 实测宽度差值补白 + 布局外壳 `overflow-y-clip`                   | `src/lib/utils/scroll-lock.ts`、`src/routes/+layout.svelte`          | 避免弹层开关时页面横跳或双倍留白，且不破坏 `sticky`  | [主动回忆与学习流 ADR](../decisions/implemented/2026-11-25-active-recall-and-learning-flow.md) |
| `text-quaternary` 在主背景严格控在 `3.2–4.5`、`text-tertiary >= 5.0`             | `src/lib/styles/vars.css`、`theme-contrast.test.ts`                  | 保持四级视觉层级，弱装饰符号不与元数据混成一层       | [主题对比度 ADR](../decisions/implemented/2026-11-25-theme-contrast-and-morpheme-palette.md)   |
| 霞鹜文楷禁止静态引入全局 CSS，仅允许串行按需加载                                 | `src/lib/utils/font-loader.ts`、`theme-contrast.test.ts`             | 默认首屏 0 CJK 字体下载，防止 Blink 字体缓存清空闪白 | [CJK 字体按需加载 ADR](../decisions/implemented/2026-11-25-cjk-font-on-demand-loading.md)      |
| `/roots` 首屏仅预渲染 12 张卡 + `.root-explorer-card` `content-visibility: auto` | `src/routes/roots/+page.server.ts`、`global.css`                     | 消除旧版 949 KB 巨型列表 HTML 与长列表重排卡顿       | [SvelteKit 静态架构 ADR](../decisions/implemented/2026-11-25-sveltekit-static-architecture.md) |
| 闪卡正面默认隐匿中文释义与例词；学习页分离精读与合卷自测                         | `src/routes/flashcard/+page.svelte`、`src/routes/learn/+page.svelte` | 保障主动回忆效果，禁止退回默认剧透答案               | [主动回忆与学习流 ADR](../decisions/implemented/2026-11-25-active-recall-and-learning-flow.md) |

## 2. 日常 UI 编写纪律

- **语义色优先**：组件统一使用 `tailwind.css` 暴露的语义 token（`bg-bg-primary`、`text-text-secondary`、`border-border`、`text-prefix`、`text-root`、`text-suffix` 等），禁止硬编码单主题色值。
- **纯 Svelte 5 Runes**：全仓组件只使用 `$props()`、`$state()`、`$derived()`、`$effect()` 与原生事件属性（`onclick` 等）。
- **单一拆词与弹窗组件**：例词拆解统一复用 `ExampleCard.svelte` 与 `MorphemeFormula.svelte`；提示与确认统一经 `ui.toast()` / `ui.confirm()`，禁止 `window.alert` / `window.confirm`。
- **动效降级与双端适配**：所有动效遵循 `prefers-reduced-motion: reduce`；移动端输入控件保持 `16px` 防止 iOS 缩放。

## 3. UI 专项验证命令

```bash
pnpm test:contrast
```
