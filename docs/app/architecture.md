# 站点工程架构

> 文档版本/日期：v1.0 / 2026-11-25
> 真相源对照：`svelte.config.js`、`vite.config.ts`、`package.json`、`src/routes/**`、`src/lib/**`。
> 状态：定稿。

## 1. 技术底座

- **应用框架**：SvelteKit 2 + Svelte 5（`compilerOptions: { runes: true }` 纯 Runes 模式），配合 `@sveltejs/adapter-static` 全站预渲染输出至 `build/`，零后端运行时依赖。
- **样式引擎**：Tailwind CSS v4（`@tailwindcss/vite`）+ CSS-first `@theme` 语义变量（`src/lib/styles/vars.css` + `tailwind.css`）。
- **测试与校验**：`svelte-check`（TypeScript strict）、Vitest（`happy-dom`）、`scripts/audit-word-roots.mjs` 与 Prettier（`prettier-plugin-svelte` + `prettier-plugin-tailwindcss`）。

## 2. 路由与预渲染端点地图

全局在 `src/routes/+layout.ts` 声明 `prerender = true`、`trailingSlash = 'never'`：

| 路径                     | 源码                                                     | 预渲染与数据策略                                                                                                          |
| :----------------------- | :------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| `/`                      | `src/routes/+page.server.ts` / `+page.svelte`            | 仅注入 `stats`、`featuredRoots`、`heroExamples` 与轻量 `rootTitles`（0 字节 `wordRoots.ts`）                              |
| `/roots`                 | `src/routes/roots/+page.server.ts` / `+page.svelte`      | 首屏仅预渲染前 12 张卡片（HTML < 60 KB），挂载后异步拉取 `/data/roots-index.json` 实现 300 条全量筛选与每批 36 张增量展示 |
| `/roots/[id]`            | `src/routes/roots/[id]/+page.server.ts` / `+page.svelte` | `entries()` 枚举 `1..300` 静态生成 300 页；每页仅序列化单条 `WordRoot` + 上下邻条 + 4 条关联推荐                          |
| `/learn`                 | `src/routes/learn/+page.svelte`                          | 静态壳 + 懒加载缓存 `/data/roots-full.json`，支持 `?index=N` / `?id=N` 续学                                               |
| `/flashcard`             | `src/routes/flashcard/+page.svelte`                      | 静态壳 + 复用缓存 `/data/roots-full.json`，主动回忆翻面与三档 Leitner 复习                                                |
| `/progress`              | `src/routes/progress/+page.server.ts` / `+page.svelte`   | 仅注入 `stats` 与轻量 `rootMetaMap`（~8 KB），彻底脱离 263 KB 全量数据                                                    |
| `/data/roots-index.json` | `src/routes/data/roots-index.json/+server.ts`            | 构建期预渲染轻量搜索与列表索引                                                                                            |
| `/data/roots-full.json`  | `src/routes/data/roots-full.json/+server.ts`             | 构建期预渲染全量词素学习包（仅 `/learn` 与 `/flashcard` 按需拉取）                                                        |

## 3. 数据真源与派生链路

```text
src/lib/data/wordRoots.ts + wordRootReplacements.ts (300 词素 / 1,125 例词唯一真源)
  ├── scripts/audit-word-roots.mjs          -> 数据完整性与小测一致性审计
  └── src/lib/data/root-index.server.ts     -> 仅构建期/服务端运行（前缀 45 / 词根 225 / 后缀 30）
        ├── /data/roots-index.json          -> 全局 ⌘K 搜索 & /roots 全量筛选
        ├── /data/roots-full.json           -> /learn & /flashcard 按需拉取
        ├── /roots/[id] (300 静态详情页)    -> 单条直出
        └── / & /progress                   -> 轻量统计与元数据切片
```

## 4. 客户端单一所有权表

| 能力领域                           | 唯一 Owner                                                              | 说明                                                                                                    |
| :--------------------------------- | :---------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------ |
| 主题、调色板、按需字体与口音偏好   | `src/lib/stores/preferences.svelte.ts` + `src/lib/utils/font-loader.ts` | 兼容旧键 `wordRootSettings`，同步 `<html>` 类名、属性与 `<meta name="theme-color">`                     |
| 学习进度、Leitner 复习盒与成就     | `src/lib/stores/progress.svelte.ts`                                     | 兼容旧键 `wordRootProgress` / `wordRootAchievements`，导出/严格校验导入/重置                            |
| 单词发音播放                       | `src/lib/stores/audio.svelte.ts`                                        | 全局唯一 `HTMLAudioElement`，SvelteKit 路由切换不断音                                                   |
| 弹层、确认框、Toast 与顶栏滚动标题 | `src/lib/stores/ui.svelte.ts` + `src/lib/utils/scroll-lock.ts`          | 彻底替代原生 `alert` / `confirm`，实测宽度差值防锁滚横跳                                                |
| 静态 JSON 懒加载缓存               | `src/lib/stores/data-cache.svelte.ts`                                   | 并发去重与悬停预加载                                                                                    |
| 全局键盘快捷键守卫                 | `src/lib/utils/shortcuts.ts`                                            | 过滤输入法组合态、表单聚焦与阻塞遮罩层                                                                  |
| 词素公式、知识解析与例词拆解展示   | `MorphemeFormula.svelte` + `ExampleCard.svelte` + `RootNotes.svelte`    | 全站唯一复用组件，禁止在页面内复制拆词模板                                                              |
| 全局悬停提示气泡                   | `src/lib/components/GlobalTooltip.svelte` + `tooltip-position.ts`       | 全站唯一 `data-tooltip` 委托提示层，统一 `.ui-tooltip` 风格并杜绝原生浏览器 `title`                     |
| 跨页导航记忆与返回定位             | `src/lib/stores/navigation.svelte.ts` + `src/lib/utils/locate-card.ts`  | 基于 `sessionStorage` (`wordRootNavMemory`) 记忆来源返回目标、列表增量批次、学习/闪卡进度及返回聚焦脉冲 |
