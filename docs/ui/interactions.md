# 全局交互契约

> 文档版本/日期：v1.0 / 2026-11-25
> 真相源对照：`src/routes/+layout.svelte`、`src/lib/components/`、`src/lib/utils/shortcuts.ts`、`src/lib/utils/scroll-lock.ts`。
> 状态：定稿；涉及跨页面交互调整时同步更新本文。

## 1. 滚动阻尼、锁滚与回顶

- **根容器防回弹**：`html` 与 `body` 声明 `overscroll-behavior-x: none; overscroll-behavior-y: none;`，`html` 声明 `scrollbar-gutter: stable` 与 `scroll-padding-top: 5.5rem`。
- **外壳防瞬时溢出**：`+layout.svelte` 外壳保留 `min-h-dvh flex-col overflow-y-clip`，裁切入场动效引发的瞬时纵向滚动条而不破坏 `position: sticky`。
- **实测锁滚防横跳**：所有模态框（`CommandSearchModal`、`ShortcutsModal`、`ConfirmModal`）统一调用 `src/lib/utils/scroll-lock.ts`，实测加锁前后 `clientWidth` 差值并按需补白。
- **顶栏滚动接管**：词根详情页（`/roots/[id]`）滚过主标题后，顶栏左侧平滑切换为当前词素名与核心释义，点击平滑返回顶部。
- **回到顶部浮钮**：滚动超过 `320px` 时以 GPU 合成位移动效显现，点击平滑回顶（遵循 `prefers-reduced-motion`）。

## 2. 链接下划线三层层级

1. **显式句内链接（`.link-inline`）**：默认虚线下划线，悬停/激活/聚焦转为实线；
2. **普通列表、面包屑与页脚链接**：默认无下划线，悬停/激活/聚焦出现实线；
3. **顶栏导航、整卡入口、徽章与按钮链接（`.no-underline`）**：全程无下划线，仅通过底色/边框/文字色反馈。

## 3. 全局 `⌘K` 搜索与快捷键守卫

- 顶栏搜索按钮在 `mouseenter` / `focus` 时预拉取 `/data/roots-index.json`。
- 全局及页面快捷键统一经过 `src/lib/utils/shortcuts.ts` 守卫：
  - 弹层打开时在 `window` **捕获阶段**优先拦截 `Escape`（兼容 `Escape` / `Esc` / `code === 'Escape'`，无视 `defaultPrevented` 与输入法 `Process`/`isComposing`；仅当搜索框内处于输入法组词态时把首次 `Esc` 留给输入法）；
  - 普通快捷键过滤 `defaultPrevented`、`repeat` 与输入法组合态（`isComposing`、`keyCode === 229`、`key === 'Process'`），`?` 兼容全角 `？` 与 `Shift + Slash`；
  - 单键/组合快捷键（`/`、`?`、`Shift+T`、`Space`、`1–4`、`←/→`、`M`、`A`）在输入框聚焦或存在阻塞弹窗时自动跳过，其中 `Shift+T` 循环切换「跟随系统 / 浅色 / 深色」主题；
  - `⌘K` / `Ctrl+K` 在确认弹窗等阻塞遮罩激活时不强行抢占。

## 4. 核心学习交互流

- **词根库 (`/roots`)**：筛选条件（`q`、`kind`、`origin`、`status`）经 `replaceState` 与 URL Query 双向同步；每批增量展示 36 张卡片并启用 `content-visibility: auto`。
- **跨页上下文记忆与返回定位**：经 `navigation.svelte.ts` 在同会话 `sessionStorage` (`wordRootNavMemory`) 中维护基于栈的返回轨迹——从词根库、学习、闪卡、进度或首页进入 `/roots/[id]` 时，详情页左上角统一以 `‹ 返回<来源>` 与悬浮说明回指真实来源（直达链接无前置历史时仅显示 `‹ 词根库`）；在详情页点击「相关词素」或经 `⌘K` 跳往另一条词素时将当前词素压入返回栈，左上角切换为 `‹ 返回 <上一个词素> ｜ <原始入口>`，点击返回或浏览器后退可逐级回到上一条并恢复滚动位置与对应相关词素卡片的 `locate-pulse` 聚焦脉冲（水平翻看上下相邻词素保持同层不压栈）；返回 `/roots`、`/`、`/progress` 时自动补齐列表已展开批次、避开固定顶栏与吸顶筛选条恢复位置，并对目标词素卡片触发一次性 `1450ms` 的 `locate-pulse` 光晕（卡片高亮期间临时释放 `content-visibility: visible` 避免外圈阴影被裁切，无焦点劫持，遵循 `prefers-reduced-motion`）；顶栏「探索」入口自动带回上次筛选视图；`/learn` 与 `/flashcard` 离开后返回可恢复队列模式、乱序序列、当前位置及自测/翻面状态。
- **学习 (`/learn`)**：自由切换队列与前后翻页，不锁死操作；分离「精读」与「自测（`Space`）」两阶段，自测自动隐藏例词防止剧透，支持 `1–4` 秒选、`Enter` 切题、`M` 切掌握、`A` 朗读首词。
- **闪卡 (`/flashcard`)**：正面默认仅展示词素、类型、语源与可选「提示一个例词」；按 `Space` 或点击翻面后展示释义与拆解，通过 `1 没记住`（3 张后重现）/ `2 模糊`（明日复习）/ `3 记住了`（标记掌握）驱动 Leitner 复习调度；支持手机左右滑动手势。
- **跨页不断音**：单词发音经 `audio.svelte.ts` 全局单例播放，SvelteKit 客户端路由切换期间音频平滑延续，点击发音按钮直接发声。
- **非阻塞反馈与统一提示气泡**：状态反馈统一使用顶部居中去重 `ToastHost`，破坏性操作统一使用 `ConfirmModal`，禁止 `window.alert` / `window.confirm`；所有悬浮提示统一通过 `data-tooltip` 交由根布局唯一 `GlobalTooltip.svelte` 渲染为 `.ui-tooltip` 极简卡片（120ms 首次悬停延迟、相邻 0ms 切换、触屏抑制、边缘自动翻转），禁止遗留原生 `title=` 属性。
- **主题瞬切防拖影**：亮暗模式或调色板实际切换时，经 `html.theme-switching` 瞬时禁用 `transition` 并强制同步重排，双 `requestAnimationFrame` 后恢复，避免卡片与背景变色不同步。
