# 词根树（english-roots）

## 规范驱动与防误撤纪律

进行任何非平凡改动前，先阅读纯中文正式索引 `docs/README.md`，再按改动范围阅读对应的架构、变更流程、UI 契约与历史决策记录：

1. 站点工程架构与状态所有权：`docs/app/architecture.md`
2. 变更流程与定向验证：`docs/spec/change-workflow.md`
3. 文档结构与 ADR 规范：`docs/spec/doc-convention.md`
4. 可见界面与交互红线：`docs/ui/README.md`

**冲突裁决规则**：

- 本文件或工具专属说明（`GEMINI.md` 等）若与 `docs/` 冲突，**以 `docs/` 为准**，并顺手修正过期入口文件。
- `docs/decisions/implemented/` 中记录的历史已实施决策**高于新提出的“常规优化 / 无障碍清理 / 样式统一”建议**。不得在未核对对应 ADR 或 `git log` 的情况下擅自回退既有设计（例如纯 Svelte 5 Runes 语法红线、静态 JSON 分片索引、零阻塞默认字体与霞鹜文楷串行按需加载、`text-quaternary` 的 `3.2–4.5` 对比度阶梯、闪卡默认隐藏释义的主动回忆流等）。

## 文档维护约定（纯中文单语）

- 本仓库规范文档统一使用**纯中文单语**维护，不拆分中英双份。
- 涉及跨页面交互、视觉基线、字体/对比度/滚动/构建分片策略的重大取舍或踩坑回退，必须在 `docs/decisions/<proposed|implemented|rejected>/YYYY-MM-DD-<topic>.md` 留下决策记录。
- 新增、移动或废弃正式文档时，**必须在同一变更中同步更新 `docs/README.md`**。

## 代码与数据铁律

- **纯 Svelte 5 Runes 红线**：`svelte.config.js` 开启 `compilerOptions: { runes: true }`，全仓严禁混入 Svelte 4 旧语法（`export let`、`$: `、`on:click`、`<slot>`）。
- **单一数据真源**：300 条词素真源位于 `src/lib/data/wordRoots.ts` 与 `src/lib/data/wordRootReplacements.ts`；改动数据后必跑 `pnpm audit:word-roots`。
- **禁止把全量 `wordRoots.ts` 打入页面客户端包**：仅 `*.server.ts` 或预渲染端点可导入 `wordRoots.ts`；客户端列表与搜索按需拉取 `/data/roots-index.json`，学习与闪卡按需拉取 `/data/roots-full.json`。
- **单一所有权**：主题偏好归口 `preferences.svelte.ts`，进度与间隔复习归口 `progress.svelte.ts`，发音播放归口 `audio.svelte.ts`，弹层与 Toast 归口 `ui.svelte.ts`，词素公式与例词拆解统一复用 `MorphemeFormula.svelte` 与 `ExampleCard.svelte`。
- **无损兼容旧本地进度**：继续读写 `wordRootProgress`、`wordRootAchievements`、`wordRootSettings` 三个既有 `localStorage` 键名。
- **保留无关改动**：只改动与当前任务直接相关的文件；未经用户明确要求不执行 `git commit` 或 `git push`。
