# 决策：中文字体采用 unicode-range 分片与串行按需加载

Status: implemented
Date: 2026-11-25

## 问题

旧版全站默认将 `LXGW WenKai Screen`（霞鹜文楷）设为正文字体，并将 867 行 `@font-face` 静态打入全局 CSS（共享 CSS 达 **66 KB**）。访客首次打开任意页面即触发多个 ~64 KB WOFF2 分片并发请求，带来明显的带宽开销与换字重排抖动（历史上曾反复折腾 CDN、全量包与透明度遮罩 hack）。

## 决策

参考 `blog-main` 的 CJK 字体加载与分片 ADR（`2026-06-19-cjk-font-loading-and-subsetting.md`）：

1. **默认零阻塞正文字体**：采用 `Inter Variable`（仅 latin normal/italic 两条规则，`src/lib/styles/font-inter-latin.css`，剔除 12 条冗余语种规则）+ 系统无衬线中文字体。默认配置下首屏 **0 KB CJK 字体下载**。
2. **霞鹜文楷改为按偏好串行按需加载**：
   - 保留 `static/fonts/lxgw-wenkai-screen/` 下 31 个 `unicode-range` WOFF2 分片与 `src/lib/styles/lxgw-wenkai-screen.css`；
   - 严禁在 `global.css` 或 `app.html` 中静态引入 `lxgw-wenkai-screen.css`；
   - 仅当用户在 `/progress` 选中「霞鹜文楷」时，经 `src/lib/utils/font-loader.ts` 的**全局串行 FIFO 队列**动态 `import()`，等待 1 帧 `rAF` 并检测字体就绪后再切换 `data-font-preset="lxgw-wenkai-screen"`，避免并行插入样式表触发 Blink `FontFaceCache::ClearCSSConnected()` 导致整页跨帧空白。
3. **禁止对中文字体做静态单文件小字典裁剪**：避免出现非常用汉字缺字回退造成中文字形混排割裂。

## 已考虑的替代方案

- **全站默认常驻霞鹜文楷**：拖慢首屏绘制并造成换字跳动，不利于高频查词工具定位，故降级为偏好可选项。
- **使用第三方公共字体 CDN**：受网络波动与稳定性影响大，不如本地 `static/fonts/` 长缓存（`immutable`）可控。

## 后果或验收条件

- 共享主 CSS 体积大幅下降（< 25 KB），默认主题首屏无任何本地 CJK WOFF2 请求。
- 守门测试：`src/lib/styles/theme-contrast.test.ts` 断言 `global.css` 与 `app.html` 不包含 `lxgw-wenkai-screen.css`。
