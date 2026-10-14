---
title: 一文搞懂 SSR、SSG、CSR：前端渲染技术到底差在哪
date: 2026-10-14 14:00:00
updated: 2026-10-14 14:00:00
categories:
  - 思考
tags: [前端, 渲染, SSR, SSG, CSR, 群岛架构, ISR]
description: "梳理 CSR / SSR / SSG 三种渲染模式的本质差异，建立统一认知框架，并补全群岛架构、ISR、Hybrid 等现代演化与选型思路。"
---

CSR、SSR、SSG 是前端渲染的三种基本模式。名字好背，但真要选型不迷糊，得先想清一件事：**HTML 到底由谁、在什么时候生成**。抓住这一条，所有差异都自洽了。

## 〇、统一框架：HTML 在“哪一端、什么时刻”生成

三种技术本质不是“谁快谁慢”，而是同一份 HTML 由谁、在何时拼出来：

| 渲染方式 | HTML 生成时机 | 生成地点 | 浏览器拿到什么 | 交互能力 |
|---------|--------------|---------|---------------|---------|
| **CSR** | 客户端运行时 | 用户浏览器 | 空壳 HTML + 大 JS 包 | 完整（JS 全权负责） |
| **SSR** | 每次请求时 | 服务器 | 完整 HTML（仍需 JS 水合） | 水合后完整 |
| **SSG** | 构建时（一次） | CI / 构建机 | 现成静态 HTML | 默认无，按需加 |

一句话记忆：**CSR 是“浏览器现做”，SSR 是“服务器现炒”，SSG 是“提前做好端上来”**。

## 一、CSR（客户端渲染）

### 原理
服务器发一个几乎为空的 HTML（带一个挂载点和一大包 JS）。浏览器下载并执行 JS 后，框架才把组件树渲染进 DOM。

```jsx
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')).render(<App />);
```

这一步执行之前，页面是白的。

### 常见误区
- “CSR 响应速度快”要分两层看：HTML 文件本身小、秒下，但**真正的首屏内容要等 JS 下载 + 解析 + 执行**，所以白屏反而长。准确说：部署简单、交互强，首屏与 SEO 吃亏。
- 白屏根因：关键渲染路径被 JS 阻塞。
- SEO：Google 能执行 JS 后抓取，但有延迟与配额；对其他引擎不友好。内容型站点不宜押宝 CSR 的 SEO。

### 适用
重交互的 SPA（后台、仪表盘）、不需被收录的内部工具。

## 二、SSR（服务器端渲染）

### 原理
请求到服务器 → Node 跑框架的服务端渲染 API 把组件转成 HTML 流 → 流式返回 → 浏览器先看内容，再由同款 JS 水合成可交互。

```jsx
import { renderToPipeableStream } from 'react-dom/server';
import App from './App';

const stream = renderToPipeableStream(<App />, {
  bootstrapScripts: ['/client.js'],
});
```

### 要点与坑
- SSR 返回的 HTML 只是“先有内容”，交互仍需客户端 JS 水合，否则按钮点了没反应。
- 服务器压力可缓解：把渲染结果缓存到 CDN / 边缘节点，命中缓存时和 SSG 一样快。
- 服务端代码**不能访问 `window` / `document` / `localStorage`**，这类逻辑必须放进 `useEffect` 或动态导入，否则在 Node 端拿到 `undefined` 甚至崩。
- 高频坑：**水合不匹配（hydration mismatch）**——服务端和客户端首屏渲染不一致（时间、随机数），React 会报警并可能整段重渲染。

### 适用
首屏内容重要 + 需要个性化/实时数据（电商详情、社交动态、登录态页）。

## 三、SSG（静态站点生成）

### 原理
构建期把“模板 + 数据”渲染成静态 HTML，部署后 CDN 直接返回。请求时无服务端计算，最快、最安全。

```astro
export async function getStaticPaths() {
  const posts = await getCollection('posts');
  return posts.map((p) => ({ params: { slug: p.slug } }));
}
const { slug } = Astro.params;
const post = await getCollection('posts', (p) => p.slug === slug);
```
```astro
<article>{post.data.title}</article>
```

### 常见误解
- “每次更新都要重建并部署整站”过时了。现代 SSG（Astro / Hugo）有增量构建与缓存，只重渲变化页；配合 CDN 失效，更新成本远低于“重建整站”。
- “动态性受限”不绝对。SSG 页面默认静态 HTML，但可叠加客户端 JS 或群岛架构，需要交互的局部才 hydrate。

### 适用
内容更新不频繁、对性能/安全/SEO 敏感的站点：博客、文档、营销页、官网。

## 四、现代演化：三种常被测评忽略的模式

### 1. 群岛架构 / 部分水合（Astro）
SSG 页面默认 **0KB JS**，只有标了 `client:*` 的组件才作为“岛”单独 hydrate，互相独立：

```astro
<Counter client:visible />
```

把“SSG 的速度”和“组件化交互”统一了，内容站天然适合。

### 2. ISR（增量静态再生成）
SSG + 定时/按需重渲染：页面先以静态形式服务，后台按间隔（或请求触发）重新生成，化解“频繁更新不适合 SSG”的顾虑。

### 3. Hybrid（Next / Nuxt）
同一框架内**按页面**选 SSR / SSG / CSR。营销页走 SSG，用户页走 SSR，后台走 CSR。

### 总表

| 方式 | 首屏 JS | 适合更新频率 | SEO | 代表 |
|------|--------|-------------|-----|------|
| CSR | 大 | 高 | 弱 | React SPA |
| SSR | 中（水合） | 高（实时） | 强 | Next SSR 模式 |
| SSG | 0（默认） | 低 | 强 | Hexo / Hugo / Astro |
| Islands | 0 + 按需 | 低 | 强 | Astro |
| ISR | 0 + 按需 | 中高 | 强 | Next.js |
| Hybrid | 看页面 | 任意 | 强 | Next / Nuxt |

## 五、怎么选

- 内容站 / 博客 / 文档 → SSG；想要零 JS 首屏又想要组件化就上 **Astro（Islands）**。
- 需要实时/个性化数据 → SSR，记得加缓存。
- 重交互后台 → CSR（或 SSR + 水合）。
- 电商/大促，既要快又要常变 → ISR 或 Hybrid。
- 已在纯 SSG 且满意 → 不必迁，Hexo/Hugo 仍是稳的选择。

## 六、回到自己的博客

我正在把博客从 **Hexo（纯 SSG）** 迁到 **Astro（SSG + Islands）**：内容仍是构建期生成、首屏零 JS、SEO 不变；唯一区别是“想要交互的局部”（评论、搜索、暗色切换）才 hydrate 成岛。这不是换个更花哨的框架，而是把“SSG 的速度”和“现代组件化 DX”用群岛架构捏到一起——上面第二节到第四节的原理，正是这次迁移的底层逻辑。

缩写背再多，不如想清一件事：**你的 HTML，到底是谁、在什么时候生成的。**想明白这个，选型不会再被口号带跑。
