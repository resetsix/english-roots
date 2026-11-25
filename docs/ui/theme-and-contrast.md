# 主题、对比度与字体规范

> 文档版本/日期：v1.0 / 2026-11-25
> 真相源对照：`src/lib/styles/vars.css`、`src/lib/styles/tailwind.css`、`src/lib/styles/theme-contrast.test.ts`、`src/lib/utils/font-loader.ts`。
> 状态：定稿。

## 1. 调色板体系（3 套预设 × 亮暗 = 6 组主题）

通过 `<html class="light|dark">` 与 `<html data-palette="warm-sand|ink">`（默认省略）组合切换：

| 预设 ID     | 名称 | 气质定位                           |
| :---------- | :--- | :--------------------------------- |
| `default`   | 默认 | 素白与深炭灰，中性克制、对比均衡   |
| `warm-sand` | 暖沙 | 温润纸页感与低刺眼暖棕，陶土红强调 |
| `ink`       | 墨灰 | 冷纸青灰与宣墨基调，青黛蓝强调     |

首屏通过 `src/app.html` 在样式表前注入内联预绘制脚本与预水合暗色媒体查询回退块，杜绝暗色模式首屏及 404 页面闪白。

## 2. 表面层级与四级文字对比度阶梯

全部 6 组调色板均由 `src/lib/styles/theme-contrast.test.ts` 自动守门：

| Token / 组合                                                            | 约束基准                                            | 用途                                                                               |
| :---------------------------------------------------------------------- | :-------------------------------------------------- | :--------------------------------------------------------------------------------- |
| `text-primary` on `bg-primary`                                          | `>= 12:1`                                           | 主标题、词素主体、核心例词                                                         |
| `text-secondary` on `bg-primary`                                        | `>= 8:1`（与 primary 差 `>= 2`）                    | 释义、解析正文、常规导航                                                           |
| `text-tertiary` on `bg-primary` / `bg-secondary`                        | `>= 5.0:1` / `>= 4.5:1`（与 secondary 差 `>= 1.5`） | 元数据、标签、快捷键提示、禁用按钮文字                                             |
| `text-quaternary` on `bg-primary`                                       | **刻意控在 `3.2–4.5:1`**（与 tertiary 差 `>= 1.0`） | 仅用于极弱装饰符号（`+`、`→`、占位提示），严禁用于交互操作或落在 `bg-secondary` 上 |
| `border` → `border-quaternary`                                          | OKLab 明度距离严格单调递增                          | 区分默认细边、悬停态与分区界线                                                     |
| `accent-foreground` on `accent`、`accent` on `bg-primary` / `accent/10` | `>= 4.5:1`                                          | 主按钮与选中态可读                                                                 |
| `prefix / root / suffix` on 各自 `*-bg` 与 `bg-primary`                 | `>= 4.5:1`                                          | 前缀（暖赤）、词根（群青）、后缀（松石）语义胶囊                                   |
| `success / danger / warning` on 各自 `*-bg` 与 `bg-primary`             | `>= 4.5:1`                                          | 答题反馈、掌握徽章、易错提示与闪卡三档自评                                         |

## 3. 字体加载与分片策略

对应决策：[中文字体采用 unicode-range 分片与串行按需加载](../decisions/implemented/2026-11-25-cjk-font-on-demand-loading.md)

- **默认字体（`default`）**：`Inter Variable`（仅 latin normal/italic 两条规则，见 `src/lib/styles/font-inter-latin.css`）+ 系统无衬线中文字体。首屏 0 个 CJK WOFF2 下载。
- **霞鹜文楷（`lxgw-wenkai-screen`）**：31 个本地 WOFF2 `unicode-range` 分片位于 `static/fonts/lxgw-wenkai-screen/`，仅当用户在 `/progress` 选中时由 `src/lib/utils/font-loader.ts` 通过串行 FIFO 队列动态 `import('$lib/styles/lxgw-wenkai-screen.css')` 并等待就绪后切换 `data-font-preset`。
