# 决策：主动回忆闪卡、两步学习流与旧数据无损迁移

Status: implemented
Date: 2026-11-25

## 问题

1. 旧版闪卡页默认把词根释义与例词全部摊开，剥夺了主动回忆（Active Recall）过程，且切页后位置重置为第 1 张；
2. 旧版学习页在同一屏上方展示例词、下方紧跟同词测验，且答完题前隐藏「下一个」按钮，锁死浏览自由度；
3. 旧版 300 条数据混为扁平 `1–300` 列表，未区分前缀/词根/后缀与复习状态；删除数据与导入报错使用原生 `window.confirm` / `window.alert`；关闭顶栏发音开关会隐藏全站所有发音按钮导致用户困惑。

## 决策

1. **闪卡回归主动回忆（`src/routes/flashcard/+page.svelte`）**：
   - 正面默认只展示词素、类型、语源与可选「偷看一个例词提示（不剧透中文）」；
   - 按 `Space` 或点击翻面核对后，提供 `1 没记住`（本轮 3 张后重现、重置复习盒）/ `2 模糊`（box 1，明日待复习）/ `3 记住了`（升级掌握、推进 Leitner 间隔：0 / 1 / 3 / 7 / 21 天）；自动记忆卡组位置。
2. **沉浸学习拆为「精读」与「合卷自测」两步（`src/routes/learn/+page.svelte`）**：
   - 自由切换顺序 / 未掌握 / 待复习 / 分类 / 随机队列，随时可前后翻页或一键标记掌握（`M`）；
   - 按 `Space` 或点「测一测」切换至合卷自测态，自动收起上方例词拆解防止剧透，支持 `1–4` 键作答与 `Enter` 切下一组。
3. **显式点击发音直接发声 + 跨页不断音（`src/lib/stores/audio.svelte.ts`）**：
   - 卡片上的发音按钮始终可见，点击即按当前口音（顶栏一键切换 `美`/`英`）发声，且在 SvelteKit 客户端切页期间音频不断。
4. **旧版 `localStorage` 无损迁移（`progress.svelte.ts` & `preferences.svelte.ts`）**：
   - 继续读写 `wordRootProgress`、`wordRootAchievements`、`wordRootSettings`；
   - `readingTheme: 'classic'` 自动映射 `palette: 'warm-sand'`，`readingTheme: 'book'` 映射 `palette: 'default'`；缺失的 `reviewQueue` / `flashcardIndex` 自动平滑补齐；
   - 全部确认与反馈改用 `ConfirmModal` 与 `ToastHost`，彻底移除 `alert` / `confirm`。

## 已考虑的替代方案

- **引入重型第三方 FSRS 排程库**：对 300 组词素而言 5 档 Leitner 间隔零依赖、透明易懂且完全覆盖日常复习节奏，无需增加额外包体。
- **重置全新的 `localStorage` 键名**：会清空老用户已有的掌握记录与连续天数，故坚持复用原键名并做结构化兼容迁移。

## 后果或验收条件

- 守门测试：`pnpm vitest run src/lib/stores/progress.test.ts src/lib/utils/shortcuts.test.ts`。
- 兼容验证：导入旧版备份 JSON 与迁移旧版 `readingTheme` 均无数据丢失。
