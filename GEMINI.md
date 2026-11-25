# GEMINI.md

本仓库的 Antigravity / Gemini 协作速查。根目录 `AGENTS.md` 中的全部规则均适用；如与 `docs/` 冲突，以 `docs/` 为准，并顺手同步本文件。

## 1. 必读与决策优先级

- 正式文档唯一索引：`docs/README.md`（纯中文单语，不建英文副本）。
- 改任何 UI、样式、动效、滚动、字体、快捷键、闪卡或数据分片前，先看 `docs/ui/README.md` 与 `docs/decisions/implemented/`。
- 已落地的核心红线（**未经用户明确同意不得回退**）：
  - **Svelte 5 纯 Runes 模式**：`svelte.config.js` 开启 `runes: true`，禁止使用 `export let`、`$: `、`on:click`、`<slot>`；
  - **静态数据分片**：`wordRoots.ts` 仅限服务端/预渲染模块导入，`/`、`/roots`、`/progress` 与 `/roots/[id]` 客户端 JS 禁止打入 263 KB 全量词根数据；
  - **零阻塞默认字体 + 霞鹜文楷串行按需加载**：`src/lib/styles/lxgw-wenkai-screen.css` 禁止静态引入 `global.css` 或 `app.html`，仅经 `src/lib/utils/font-loader.ts` 串行加载；
  - **6 组主题对比度门禁**：`text-quaternary` 严格控在 `3.2–4.5`，`text-tertiary >= 5.0`，前缀/词根/后缀及反馈色全部 `>= 4.5:1`，由 `src/lib/styles/theme-contrast.test.ts` 守门；
  - **滚动手感与防横跳**：保留 `overscroll-behavior-x/y: none`、`scrollbar-gutter: stable`、`scroll-lock.ts` 实测宽度差值补白、布局外壳 `overflow-y-clip` 及移动端输入框 `16px` 防缩放；
  - **主动回忆体验**：闪卡默认隐藏中文释义与例词；学习模式分离「精读」与「合卷自测」；消灭原生 `window.alert` / `window.confirm`。

## 2. 按 `git diff` 定向验证表

日常迭代默认跑与改动面匹配的窄验证，跨切面底座变更或明确要求时再跑全量 `pnpm build`：

| 改动路径                                                                                      | 最小必跑检查                                                              |
| :-------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------ |
| 仅 `docs/**`、`AGENTS.md`、`GEMINI.md`、`README.md`                                           | `git diff --check` + 检查相对路径链接                                     |
| `src/lib/styles/vars.css`、`tailwind.css`、`global.css`、`animation.css`、`src/app.html`      | `pnpm test:contrast`                                                      |
| `src/lib/data/wordRoots.ts`、`wordRootReplacements.ts`、`taxonomy.ts`、`root-index.server.ts` | `pnpm audit:word-roots` + `pnpm vitest run src/lib/data/taxonomy.test.ts` |
| `src/lib/utils/search.ts`                                                                     | `pnpm vitest run src/lib/utils/search.test.ts`                            |
| `src/lib/stores/progress.svelte.ts`、`preferences.svelte.ts`                                  | `pnpm vitest run src/lib/stores/progress.test.ts` + `pnpm type-check`     |
| `src/lib/utils/shortcuts.ts`、`src/routes/+layout.svelte`                                     | `pnpm vitest run src/lib/utils/shortcuts.test.ts` + `pnpm type-check`     |
| `src/lib/components/**`、`src/routes/**`                                                      | `pnpm type-check` + 相关单测                                              |

## 3. 仓库常见坑位

- **静态输出约束**：`@sveltejs/adapter-static` 输出至 `build/`，全站 `prerender = true`、`trailingSlash = 'never'`，不可引入依赖运行时 Node Server 的接口。
- **静态资源目录**：SvelteKit 静态资源位于 `static/`（非 `public/`），字体分片路径为 `static/fonts/lxgw-wenkai-screen/`。
- **包管理与构建脚本**：使用 `pnpm`，`esbuild` 构建白名单在 `pnpm-workspace.yaml`（`allowBuilds`）。
- **Git 纪律**：未经用户明确要求，不执行 `git commit` 或 `git push`。
