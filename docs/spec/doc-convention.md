# 文档结构与命名规范

> 文档版本/日期：v1.0 / 2026-11-25
> 真相源对照：当前文件树以仓库为准；代码契约以源码、`package.json` 及测试为准；UI 规范以 `docs/ui/README.md` 为准。
> 状态：定稿。

## 1. 目标

文档必须让开发者或 AI 在动手改代码前快速回答六个问题：

1. 这项能力属于哪个模块或域？
2. 既有用户行为、视觉基线与不可回退的红线是什么？
3. 状态、数据真源和生命周期由谁拥有？
4. 文件应该放在哪里，依赖与生成产物边界是什么？
5. 历史上哪些方案被明确否决或踩坑回退，为什么？
6. 用什么最小定向验证证明改动无回归？

文档不是代码的逐行复述，也不是写完后的流水账。规范定义边界与历史意图，代码与测试证明规范已落地。

## 2. 语言与写作约定

本项目全仓规范文档统一使用**纯中文单语**维护，不拆分中英双份文件：

- 中文正文使用中文标点（`，。！？；：`），中英文之间、中文与数字之间保留空格（例如 `使用 Svelte 5 Runes`、`对比度 >= 4.5:1`）。
- 文件名、目录名、代码标识符、CSS 变量、命令和 commit hash 保持英文原样，不翻译。
- 涉及防回退条款时，尽量附带对应守门测试路径或量化阈值，避免空泛口号。

## 3. 目录结构

```text
AGENTS.md                               # 跨工具通用的仓库协作入口（薄入口，指向 docs/）
GEMINI.md                               # Antigravity / Gemini 速查与按 diff 定向验证表
docs/
├── README.md                           # 唯一正式文档索引
├── spec/                               # 跨域工程规范与变更流程
│   ├── doc-convention.md               # 本文档
│   └── change-workflow.md              # 变更分级、改前核对、定向验证与交付审计
├── app/                                # 全局工程架构与模块边界
│   └── architecture.md
├── ui/                                 # 视觉主题、对比度、交互契约与高频红线
│   ├── README.md
│   ├── theme-and-contrast.md
│   └── interactions.md
└── decisions/                          # 非平凡设计决策（ADR）的生命周期记录
    ├── proposed/                       # 提案中（按需创建）
    ├── implemented/                    # 已落地，作为后续改动的硬约束
    └── rejected/                       # 明确否决（按需创建）
```

不要为了填满目录而创建空文件夹或空模板；只有在确实有对应文档时才创建子目录。

## 4. 统一文档头

`docs/` 下的正式规范文档（`README.md`、`spec/`、`app/`、`ui/`）第一段引用块统一包含：

```markdown
> 文档版本/日期：vX.Y / YYYY-MM-DD
> 真相源对照：对应源码、配置、脚本或测试文件
> 状态：讨论稿 / 定稿 / 修订中 / 已废弃
```

## 5. 真相源规则

| 主题                       | 权威真相源                                                                                            |
| :------------------------- | :---------------------------------------------------------------------------------------------------- |
| 路由与静态预渲染端点       | `src/routes/**`、`svelte.config.js`                                                                   |
| 主题颜色、字体与对比度门禁 | `src/lib/styles/vars.css`、`src/lib/styles/tailwind.css` 与 `src/lib/styles/theme-contrast.test.ts`   |
| 全局样式与滚动/动效契约    | `src/lib/styles/global.css`、`src/lib/styles/animation.css` 与 `src/app.html`                         |
| 300 条词素数据真源         | `src/lib/data/wordRoots.ts`、`src/lib/data/wordRootReplacements.ts` 与 `scripts/audit-word-roots.mjs` |
| 客户端状态与兼容契约       | `src/lib/stores/*.svelte.ts` 与 `src/lib/stores/progress.test.ts`                                     |
| 依赖与脚本命令             | `package.json`、`pnpm-workspace.yaml`、`pnpm-lock.yaml`                                               |
| 历史意图与不可回退红线     | `docs/decisions/implemented/` 与 `docs/ui/`                                                           |

文档与代码发生冲突时：

1. 先通过代码、测试与 `git log` 判断「是文档过期，还是代码意外回归」。
2. **禁止**仅以“通用最佳实践不是这样”为由，未经核对就推翻 `docs/decisions/implemented/` 里记录的已确认决策。
3. 确认正确意图后，在同一变更中同步修正代码或文档。

## 6. 决策记录（ADR）规范

满足以下任一条件时，应在 `docs/decisions/<status>/YYYY-MM-DD-<topic>.md` 记录决策：

- 改变全局视觉体系、主题对比度阶梯、字体加载策略或基础排版；
- 改变滚动手感、锁滚机制、快捷键、搜索、学习/闪卡核心认知流程或路由架构；
- 调整数据真源、静态分片策略或核心框架依赖；
- 明确否决某种看似“常规/更优雅”的替代方案。

固定结构：`Status`、`Date`、`问题`、`决策`、`已考虑的替代方案`、`后果或验收条件`。

## 7. 索引纪律

`docs/README.md` 是唯一正式索引。新增、移动或废弃正式文档必须在同一变更中同步更新 `docs/README.md`。
