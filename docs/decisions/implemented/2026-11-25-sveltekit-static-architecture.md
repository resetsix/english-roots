# 决策：由 Astro 迁移至 SvelteKit 2 + Svelte 5 静态架构与数据分片

Status: implemented
Date: 2026-11-25

## 问题

旧版仓库基于 Astro 5 + 手写散落 CSS + 页面内 `innerHTML` 字符串拼接，存在四项根本性架构瓶颈：

1. `/roots` 将全部 300 张卡片与冗长 `data-search` 一次性 SSR 进单个 HTML，体积高达 **949 KB**，前端搜索同步遍历全部 DOM 节点引发卡顿；
2. `/` 与 `/progress` 仅为了读取常量 `300` 直接导入 `wordRoots.ts`，把 **263 KB** 全量词根 JS 打进首屏客户端包；
3. 学习页、闪卡页、列表页与详情页各自手写 `innerHTML` 与事件绑定，例词拆解代码重复 4 份，且在 Astro `<ViewTransitions />` 软跳转下大面积失效；
4. 跨页面状态（音频播放、主题切换、`⌘K` 搜索索引缓存、Toast 提示）缺乏统一响应式所有权，切页即丢失或重复监听。

## 决策

1. **迁移至 SvelteKit 2 + Svelte 5（纯 Runes 模式：`compilerOptions.runes = true`）+ `@sveltejs/adapter-static`**，输出静态目录 `build/`，保持全站 `prerender = true`、`trailingSlash = 'never'`，兼容 Vercel / Netlify / Cloudflare Pages 零成本静态部署。
2. **构建期静态预渲染分片数据**：
   - `src/lib/data/root-index.server.ts` 仅在服务端/构建期读取 `wordRoots.ts`；
   - `/` 仅注入统计、精选 6 词与轻量 `heroExamples` / `rootTitles`；
   - `/progress` 仅注入统计与 ~8 KB `rootMetaMap`；
   - `/roots` 仅预渲染首批 12 张卡片（HTML < 60 KB），挂载后懒加载 `/data/roots-index.json` 并每批增量渲染 36 张；
   - `/roots/[id]` 通过 `entries()` 全量静态预渲染 300 页，每页仅含单条详情、上下邻条与 4 条关联推荐；
   - `/data/roots-index.json` 与 `/data/roots-full.json` 由预渲染 `+server.ts` 端点自动生成，零手工同步漂移。
3. **统一组件与全局 Store 单所有权**：全站共享 `MorphemeFormula.svelte`、`ExampleCard.svelte` 与 `src/lib/stores/*.svelte.ts`，彻底消灭 `innerHTML` 与跨页失效问题。

## 已考虑的替代方案

- **保留 Astro 5 + Preact Islands**：虽然能解决部分组件复用，但页面级状态、跨路由音频持续播放与全局弹层仍需借助 `transition:persist` 和自定义事件总线桥接，不如 SvelteKit 单一原生路由与 Runes Store 简洁彻底。
- **迁移至 Next.js**：本项目无后端数据库、SSR API 或 Server Actions 需求，引入 Next.js 会带来显著更大的基础运行时与构建开销，违背 KISS 原则。

## 后果或验收条件

- `/roots` HTML 从 949 KB 降至 < 60 KB；`/` 与 `/progress` 客户端包体 0 字节 `wordRoots.ts`；300 个 `/roots/[id]` 静态页完整生成。
- 守门检查：`pnpm audit:word-roots`、`pnpm type-check`、`pnpm test`、`pnpm build` 及 `build/` 产物体积核查。
