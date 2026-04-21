# 词词有据

原仓库地址：[https://github.com/joeseesun/word-root-workshop](https://github.com/joeseesun/word-root-workshop)

## 功能

- 学习模式：逐个学习词根、例词拆解和小测试。
- 闪卡模式：点击翻转，支持键盘左右切换和空格翻转。
- 词根索引：本地搜索词根、中文释义和例词，并按来源筛选。
- 词根详情：静态生成每个词根的详情页。
- 进度管理：学习数据保存在当前浏览器，记录掌握状态、等级、连续学习和成就。
- 数据备份：支持导出和导入本地学习数据 JSON。

## 技术栈

- Astro 静态输出
- TypeScript
- 原生 CSS，使用 `.word-root-app` 命名空间和局部变量隔离样式
- LocalStorage

## 本地运行

```bash
pnpm install
pnpm dev
```

## 构建

```bash
pnpm build
pnpm preview
```

## 项目结构

```text
word-root-workshop/
├── src/
│   ├── components/         # 公共 UI 组件
│   ├── data/               # 词根数据
│   ├── layouts/            # 页面布局
│   ├── lib/                # LocalStorage 等浏览器逻辑
│   ├── pages/              # Astro 路由页面
│   └── styles/             # 全局样式
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── vercel.json
```

## 数据说明

词根数据在 `src/data/wordRoots.ts` 中维护。当前包含 300 条记录，其中后段仍有占位数据，后续可以单独清洗或替换。

添加新词根时保持现有结构：

```ts
{
  id: 301,
  root: 'example',
  origin: 'Latin',
  meaning: '示例含义',
  meaningEn: 'example meaning',
  description: '词根说明',
  examples: [
    {
      word: 'example',
      breakdown: { prefix: 'ex', root: 'ample', suffix: '' },
      meaning: '例子',
      explanation: 'ex + ample = example',
    },
  ],
  quiz: {
    question: 'example 的意思是什么？',
    options: ['例子', '出口', '预测', '书写'],
    correctAnswer: 0,
  },
}
```
