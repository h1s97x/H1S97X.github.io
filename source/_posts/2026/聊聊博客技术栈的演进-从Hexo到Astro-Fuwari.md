---
title: 聊聊博客技术栈的演进：从 Hexo 到 Astro + Fuwari
date: 2026-10-14 10:00:00
updated: 2026-10-14 10:00:00
categories:
  - 思考
tags: [博客, 技术栈, Hexo, Astro, Fuwari, 静态站点生成器]
description: "从自己博客的迁移规划出发，顺手梳理一下这些年博客技术栈的演进，以及 Astro + Fuwari 这套方案到底‘新’在哪。"
---

最近在整理博客的重构计划，想把它从 **Hexo + Almagest** 迁到 **Astro + Fuwari**。顺便琢磨了一下：这套技术栈算“新”吗？博客世界这些年又走到了哪一步？把想法记下来，权当一篇随笔。

## 先回答：Astro + Fuwari 新吗？

相对于我现在用的 Hexo，它明显是**新一代**的方案。拉一条粗略时间线：

| 技术 | 首发 | 定位 | 现状 |
|------|------|------|------|
| Hexo | 2016 | Node 系老牌静态站点生成器（SSG） | 成熟稳定，但已进入维护期，增量更新少 |
| Astro | 2021（1.0 在 2022-08） | 新一代“群岛架构”框架 | 当下最热门的 SSG 之一，生态活跃 |
| Fuwari | 约 2023 年中 | Astro 生态头部博客主题 | 很新，是 Astro 博客主题里 star 最高的几个之一 |

所以 **Astro + Fuwari 属于当前世代的方案**，Hexo + Almagest 属于上一代。这次迁移本质是“从老牌 SSG 跨到群岛架构框架”，方向没错。

## 博客世界的几次跃迁

把视野拉宽一点，博客的技术底座大概经历了这么几步：

1. **静态手写的远古时代** → 动态 CMS（WordPress 一家独大，但要服务器和数据库，慢还容易被黑）。
2. **第一代 SSG 复兴（约 2008–2016）**：Jekyll 带火“Git + Markdown + 静态托管”，GitHub Pages 推波助澜；随后 Hexo（2016，对中文用户极友好）、Hugo（2013，Go 编写、速度炸裂）登场。
3. **前端框架入侵（2015–2020）**：Gatsby（React）、VuePress、Nuxt Content 把组件化带进文档站，但“默认带一堆 JS”导致首屏重、SEO 一般。
4. **群岛架构 / 零 JS 时代（2021 至今）**：**Astro** 是标志。核心理念——默认输出纯 HTML，**只有需要交互的组件才 hydrate（群岛）**，首屏零 JS、SEO 友好，同时还能用 React / Vue / Svelte 写组件。

## 当下生态的几个趋势

这些趋势正好和我自己的迁移方案对得上：

- **默认零 JS + 按需 hydrate**：正是方案里“零 JS 首屏、SEO 友好”卖点的来源。
- **Content Collections 取代裸 Markdown 目录**：用 `defineCollection` + zod 给 frontmatter 做 schema 校验，比 Hexo 裸 frontmatter 规范得多，现在是主流做法。
- **Expressive Code / Shiki**：VSCode 同款高亮，对我那 184 个 `.py` 题解是刚需，确实比 Hexo 的 highlight.js 强一档。
- **Pagefind 搜索**：Astro 静态站首选的“构建期生成索引”方案，替代 Hexo 的客户端全文检索。
- **主题/本体分离**：用 submodule 引 `fuwari-theme`，和 Hugo/PaperMod、Hexo/Almagest 的“主题独立仓库”心智一致，是成熟模式。
- **部署**：Astro 产物 `dist/` 直接丢 GitHub Pages / Vercel / Netlify，CI 切换成本很低。

## 一点冷静的提醒

新不等于无代价的“升级”，迁移里有几处要权衡：

- **Fuwari 是单 category 模型**，而我原 Hexo 有多级 `categories`（比如 `coding/sliding-window-two-pointers/...`）。方案里“只取第一级、其余并入 tags”是可行妥协，但 96 道题解的层级导航体验会退化，这点值得再想想。
- **URL 兼容**：160 篇旧 URL 在 GitHub Pages 上若路径变了，外链和 SEO 会掉，需要在 `astro.config.mjs` 严控 `redirects`。
- **心智成本**：Astro 的 Content Collections + 组件化，比 Hexo“丢个 md 就出页”门槛高一点，但换来可维护性和类型安全，长期划算。

## 小结

这次选型不激进，属于**当前主流偏新一档**，方向上没有踩坑风险，主要工作量在内容迁移和路由 / URL 对齐。等 `fuwari-theme` 主题仓库建好、submodule 接上，先用 feature 分支把 Phase 0–2 跑通，和现有 Hexo 站做并行预览对比，确认无回归再切域名——这才是稳妥的节奏。

博客技术年年新，但“把想说的话安安稳稳写下来、还能被搜到”这件事，十年没变过。技术栈换了，记录的初心别换就好。
