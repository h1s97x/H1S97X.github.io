---
title: 把博客技术栈讲透：从 Hexo 到 Astro，到底变了什么（避坑版）
date: 2026-10-14 11:30:00
updated: 2026-10-14 11:30:00
categories:
  - 思考
tags: [博客, 技术栈, Hexo, Astro, 静态站点生成器, 群岛架构, 避坑]
description: "从构建管线、渲染模型、内容建模、代码高亮、搜索几个维度讲清 Astro 相比传统 SSG 到底变了什么，并给出迁移到 Astro 的真实坑位。"
---

Astro 常被概括为“快、SEO 好、零 JS”，但结论背后是具体机制。这篇从构建管线、渲染模型、内容建模、代码高亮、搜索几个维度拆开讲，能落地的部分都给例子。

## 一、SSG 到底在干什么

先把“静态站点生成器”四个字还原成一条流水线，后面所有对比都建立在它之上：

```
Markdown/资源  ──┐
模板/布局      ──┼──►  解析  ──►  数据 + 模板渲染  ──►  纯 HTML/CSS/JS  ──►  丢到任意静态托管
配置/插件      ──┘
```

关键区别从来不是“能不能出静态页”，而是**三件事在什么时候发生**：

1. **模板求值（渲染）**在构建期还是运行期？
2. **交互逻辑（JS）**以什么粒度、多少体积发到浏览器？
3. **内容结构（frontmatter）**有没有被当“数据”建模和校验？

这三点决定了速度、SEO、可维护性。下面三代 SSG 的差异，本质就是这三点的不同答案。

## 二、三代渲染模型：差异在这里

### 1. 传统 SSG（Jekyll / Hexo / Hugo）

构建期把“模板 + 数据”全部求值成 HTML，**产物里没有框架运行时**。交互（评论、搜索、暗色切换）靠你自己塞一段原生 JS 或 jQuery 时代遗留脚本。

- 优点：首屏就是 HTML，SEO 天然好，托管随便找个空间都行。
- 代价：想要组件化复用？没有。想写个带状态的小组件？得手写 DOM 操作。

### 2. SPA 入侵（Gatsby / Nuxt Content / 早期 VuePress）

把 React/Vue 整套搬进来，**整页 hydration**：浏览器下载框架运行时 + 整页组件树，再“水合”成可交互。

- 代价：首屏要下载并求值一坨 JS，水合慢；SEO 得靠预渲染或 SSR 补。
- 讽刺点：一个纯内容博客，为此付出的是接近应用的运行时成本。

### 3. 群岛架构（Astro）

核心一句话：**默认输出 0KB JS 的纯 HTML，只有标了“需要交互”的组件才被 hydrate，且各自独立成“岛”**。

```astro
---
// 整页是静态 HTML，下面这个按钮才是“岛”
---
<Counter client:visible />   {/* 仅当滚动进视口才下载并水合该组件 */}
```

`client:*` 指令决定了 hydrate 时机：`load`（立即）、`idle`（浏览器空闲）、`visible`（进视口）、`media`（匹配媒体查询时）。博客里 99% 的内容不需要 hydrate，于是首屏 JS 趋近于 0。

> 对比结论：Hexo 是“全静态、交互靠手写 JS”；Astro 是“默认全静态、按需 hydrate、还能用 React/Vue/Svelte 写组件”。后者在保留前者 SEO 优势的同时，把组件化能力补回来了。

## 三、用维度说话，不喊口号

| 维度 | Hexo（传统 SSG） | Astro（群岛架构） | 说明 |
|------|------------------|-------------------|------|
| 首屏 JS | 视主题，常见数十~上百 KB | 默认 0 KB，仅交互岛有 | SEO / LCP 直接受益 |
| 构建速度 | 全量渲染，百篇级秒~十秒级 | Vite + 增量 + 缓存，大站优势明显 | 内容越多差距越大 |
| 内容建模 | 裸 frontmatter，无校验 | Content Collections + zod 校验 | 见第四节 |
| 组件复用 | 无（靠 include/partial） | 完整 UI 框架组件 | DX 质变 |
| 代码高亮 | highlight.js（正则/class） | Shiki / Expressive Code | 见第五节 |
| 搜索 | 客户端全文（lunr 等） | 构建期索引 Pagefind | 见第六节 |
| 部署 | 任意静态空间 | 任意静态空间 / Vercel / Netlify | 无差异 |

注意：**速度不是 Astro 的“魔法”**，而是“不发 JS + 增量构建”的必然结果。如果主题里塞满客户端交互，Astro 也能变慢——架构只给下限，不保证上限。

## 四、内容建模：被忽略的代际差

多数文章不提这点，但它最影响长期可维护性。Hexo 的 frontmatter 是“字符串字典”，写错字段名、漏字段，构建期不会报错，事后才发现排版崩了。

Astro 用 Content Collections 把内容当**带 schema 的数据**：

```ts
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    published: z.coerce.date(),
    category: z.string().optional().default(''),
    tags: z.array(z.string()).default([]),
    leetcode: z.number().optional(),      // 题解自定义字段
  }),
});

export const collections = { posts };
```

收益是实打实的：字段类型错 → 构建直接失败；IDE 自动补全；查询时 `getCollection('posts')` 返回的是带类型的对象，不用再 `frontmatter.xxx` 盲取。对于我这种 160 篇、还混着 96 道 coding 题解的内容量，schema 校验能挡掉大量回归。

## 五、代码高亮：Shiki 比 highlight.js 强在哪

常见说法是“Astro 高亮更好看”，没说原理。差异在**实现路径**：

- highlight.js：运行时用正则匹配语言语法，套 class，再由 CSS 上色。
- Shiki / Expressive Code：构建期用 **VS Code 同款 TextMate 语法 + 主题**做 AST 级着色，连行内 token 的颜色都和你在编辑器里看到的一致，且**不依赖运行时 JS**。

对 184 个 `.py` 题解这种“代码即内容”的场景，Shiki 是刚需级提升，而不是锦上添花。

## 六、搜索：构建期索引 vs 客户端全文

Hexo 系的搜索插件大多在**客户端**加载全站索引（lunr/index.json），内容多时索引文件本身就几十 KB~上百 KB，且首次输入才初始化。

Astro 配 **Pagefind**：在 `astro build` 后扫 `dist/`，生成压缩索引，**首屏不加载索引、用户输入时才按需拉分块**。内容越多，体验差距越明显。配置极简：

```js
// 构建后跑一次即可，无需在页面里塞大索引
// package.json: "postbuild": "pagefind --site dist"
```

## 七、迁移到 Astro 的真实坑（基于自己的方案）

光说好话是灌水，列几个我方案里已经踩/会踩的点：

1. **Fuwari 是单 category 模型**，而我原 Hexo 有多级 `categories`（如 `coding/sliding-window-two-pointers/...`）。只能取第一级当 category、其余并入 tags，96 道题解的层级导航会退化——这是架构性妥协，得想清楚接不接受。
2. **`{% asset_code %}` 标签直接失效**。Hexo 的 Nunjucks 标签在 Astro 里不存在。方案是自建 `<CodeBlock file>` 组件读同目录 `.py`，交给 Expressive Code；或迁移脚本把代码内联进 fenced block。
3. **Hexo 特有插件失效**：`hexo-generator-alias`（旧链跳转）、`hexo-related-posts` 等，迁移后要用 `astro.config.mjs` 的 `redirects` + 静态路由替代。
4. **旧 URL 与 SEO**：160 篇旧地址换框架后路径极易变，外链和搜索收录会掉。必须在 `astro.config.mjs` 严控 `redirects` 或保留同路径，这是高优先级风险。
5. **submodule 主题心智**：用 `themes/fuwari-theme` 引主题仓库，和现在 `themes/almagest` 一致，但主题一改就得 `git submodule update` + 提交主题仓库版本，别漏。
6. **GitHub Pages 的 base path**：Astro 默认假设站点在根路径，`/blog` 子路径部署要配 `base` 和 `assetPrefix`，否则资源 404。

## 八、怎么选，给个不废话的结论

- 纯记录、已在 Hexo 且满意 → **不迁也行**，Hexo 仍是稳的选择。
- 想要极致构建速度 + 不碰 JS 生态 → **Hugo**（Go 编写，大站快到离谱）。
- 想要组件化 + 现代 DX + 仍能写 React/Vue → **Astro**，当前最均衡的一档。
- 已经是重交互应用态 → Next.js / Nuxt。

我自己的情况：内容站、要类型安全的内容建模、184 个代码块要 Shiki、还想要零 JS 首屏——**Astro + Fuwari 是当下最贴合的一档**，主要工作量在内容迁移和 URL 对齐，不是技术风险。

技术栈年年新，但“写得稳、搜得到、迁得动”才是真需求。口号看懂了，坑位也看清了，剩下的就是按 feature 分支一步步跑通、和现有站并行对比、确认无回归再切。
