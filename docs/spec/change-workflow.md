# 变更工作流与验证纪律

> 文档版本/日期：v1.0 / 2026-11-25
> 真相源对照：文档规则见 `docs/spec/doc-convention.md`；全局架构见 `docs/app/architecture.md`；UI 约束见 `docs/ui/README.md`。
> 状态：定稿；适用于人工与 AI 协作者的所有代码与文档改动。

## 1. 核心顺序

```text
核对现状与历史决策
  -> 明确边界与方案
  -> 最小外科式实现
  -> 按 diff 定向验证
  -> 同步文档与 docs/README.md
```

核心原则：**先查历史，再动手改。** 防止在“常规优化 / 无障碍清理 / 重构”中无意回退已验证的性能、对比度与学习体验设计。

## 2. 变更分级

| 级别                      | 典型例子                                                    | 文档与决策要求                                                                       |
| :------------------------ | :---------------------------------------------------------- | :----------------------------------------------------------------------------------- |
| 机械                      | 局部文案微调、新增或修订词素例词数据                        | 不新增规范；改数据必跑 `pnpm audit:word-roots`                                       |
| 局部修复                  | 单点逻辑 bug、边界条件修正，不改变既有契约                  | 补齐回归单测                                                                         |
| 功能                      | 新页面、新筛选维度、新学习模式或新偏好项                    | 更新受影响的 `docs/app/`、`docs/ui/` 并同步 `docs/README.md`                         |
| 横切 / 架构与视觉交互调整 | 主题对比度、字体策略、滚动/锁滚、快捷键、数据分片、路由架构 | 先核对 `docs/decisions/implemented/`；若新增或修订关键取舍，在同一变更补齐或更新 ADR |

## 3. 改前核对清单（防误撤红线）

动手编辑代码前，确认以下五件事：

1. **查决策**：是否触及 `docs/decisions/implemented/` 中的红线（Svelte 5 纯 Runes、静态 JSON 分片、零阻塞默认字体、六组对比度阶梯、闪卡主动回忆默认隐匿等）？
2. **查所有权**：对应能力是否已有唯一 Store 或组件 owner（`preferences`、`progress`、`audio`、`ui`、`dataCache`、`ExampleCard`、`MorphemeFormula`）？禁止另起第二套平行监听或重复拆词模板。
3. **查分片边界**：任何客户端页面或共享模块是否意外直接导入了 `src/lib/data/wordRoots.ts`（会导致 263 KB 全量包回流）？
4. **查旧数据兼容**：改动 `localStorage` 读写时，是否仍无损兼容旧版 `wordRootProgress` / `wordRootAchievements` / `wordRootSettings`？
5. **需求有歧义或需推翻旧决策时**：先向用户说明冲突点与权衡，确认后再改。

## 4. 按 `git diff` 定向验证矩阵

日常迭代与常规提交默认只跑与改动直接相关的窄验证；仅在根布局、核心底座、依赖升级或用户明确要求时运行全量 `pnpm build`：

| 改动路径                                                                                      | 最小必跑检查                                                              |
| :-------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------ |
| 仅 `docs/**`、`AGENTS.md`、`GEMINI.md`、`README.md`                                           | `git diff --check` + 检查相对路径链接                                     |
| `src/lib/styles/**`、`src/app.html`                                                           | `pnpm test:contrast`                                                      |
| `src/lib/data/wordRoots.ts`、`wordRootReplacements.ts`、`taxonomy.ts`、`root-index.server.ts` | `pnpm audit:word-roots` + `pnpm vitest run src/lib/data/taxonomy.test.ts` |
| `src/lib/utils/search.ts`                                                                     | `pnpm vitest run src/lib/utils/search.test.ts`                            |
| `src/lib/stores/progress.svelte.ts`、`preferences.svelte.ts`                                  | `pnpm vitest run src/lib/stores/progress.test.ts` + `pnpm type-check`     |
| `src/lib/utils/shortcuts.ts`、`src/routes/+layout.svelte`                                     | `pnpm vitest run src/lib/utils/shortcuts.test.ts` + `pnpm type-check`     |
| `src/lib/components/**`、`src/routes/**`                                                      | `pnpm type-check` + 相关单测                                              |

汇报验证结果时，必须明确说明跑了哪些窄检查、哪些检查未运行。

## 5. 交付前完成审计

1. 改动行全部直接服务于当前需求，未误撤 `docs/decisions/implemented/` 红线，未引入 Svelte 4 旧语法。
2. 公共契约、UI 红线或架构边界变化时，已同步更新对应文档与 `docs/README.md`。
3. 未在未经用户明确要求时自行执行 `git commit` 或 `git push`。
