# H1S97X's Blog — 基于 Fuwari 的迁移方案（主题/本体分离）

> 目标：将当前 **Hexo 8.1 + Almagest 主题** 博客迁移到 **Astro + Fuwari** 技术栈。
> 核心架构：**主题与博客本体彻底分离** —— Fuwari 作为独立主题仓库维护，博客仓库通过 **submodule** 对接，与现有 `themes/almagest` 的心智模型完全一致。

---

## 〇、目标架构（两仓库分离）

> ⚠️ **架构原则**：不把整套 Fuwari 模板塞进博客仓库子目录（那是 PR #27 的错误做法，臃肿且难维护）。主题层与内容/配置层分离为两个仓库，各自独立演进。

```
┌─ 主题仓库（独立）  h1s97x/fuwari-theme   ← 新增
│    └─ Fuwari 模板的「主题层」源码：
│         src/components/   src/layouts/   src/ui/
│         Tailwind 样式      i18n/          主题自身依赖 package.json
│       （不含博客内容 src/content/ 与站点配置 config.ts）
│
└─ 博客本体（当前仓库） H1S97X.github.io
      ├─ src/content/       ← 160 篇内容（life / notes / coding / about）
      ├─ src/config.ts      ← 博客自己的站点配置（标题/头像/导航/菜单）
      ├─ src/pages/         ← /blog /notes /coding 路由（按 category 过滤）
      ├─ themes/fuwari-theme ← submodule 引用主题
      ├─ public/            ← 静态资源（favicon / calf.png）
      ├─ .github/ .cnb.yml  ← CI/CD（lint → test → build → security）
      ├─ astro.config.mjs   ← 引用主题
      └─ tools/             ← 迁移脚本 migrate-fuwari.mjs
```

**分工明确**：
- **主题仓库**：组件 / 布局 / UI / i18n / 样式（通用能力）—— 独立演进、独立 build
- **博客本体**：内容 + 站点配置 + 路由 + CI（每个博客自己的东西）—— 只关心内容与站点
- 好处：主题升级、加功能、换配色只在主题仓库动；博客侧只更新 submodule 版本。与 `themes/almagest` 玩法一致。

---

## 一、为什么选 Fuwari

Fuwari 与当前 Almagest 主题高度契合，迁移体验最平滑：

| 对比维度 | 当前 Hexo + Almagest | Fuwari (Astro) |
|---|---|---|
| 视觉风格 | 卡片式 + 深色模式 + 柔和配色 | 卡片式 + 亮/暗双模式 + 可自定义主题色 |
| 代码高亮 | highlight.js | **Expressive Code**（VSCode 同款 Shiki） |
| 搜索 | hexo-generator-searchdb → XML | **Pagefind**（零配置静态搜索） |
| RSS | hexo-generator-feed | **@astrojs/rss** 原生 |
| 公式 | markdown-it-katex | **rehype-katex** |
| Markdown 扩展 | 插件拼装 | **Admonitions + GitHub 卡片** 开箱即用 |
| 构建性能 | 全量渲染 | 原生增量 + 缓存，快 2-5 倍 |
| 内容管理 | front-matter 散漫 | **Content Collections + zod schema 校验** |

**关键优势**：Fuwari 用 `src/content/posts/` 组织内容、YAML front-matter 与 Hexo 高度兼容，Markdown 资产几乎零改动即可搬入。且主题本身是开源 Astro 主题，天然适合拆成独立主题仓库。

---

## 二、迁移全景图

```
现有 Hexo 项目 (source/)                   迁移后博客本体 (src/content/)
──────────────────────                    ─────────────────────────────
source/_posts/  (6 篇生活记录)      ──►    src/content/posts/life/   (category: 生活)
source/notes/   (53 篇技术笔记)     ──►    src/content/posts/notes/  (category: 笔记)
source/coding/  (96 道题解)         ──►    src/content/posts/coding/ (category: 编程题解)
source/about/   (1 篇关于)          ──►    src/content/spec/about.md
```

> ⚠️ **Fuwari 默认是「单一 posts Collection + category/tags 分类」模型**，而当前项目是「4 个独立路由分区」。迁移时需用 **category + 目录前缀** 来还原 /blog /notes /coding 三类路由（见 §四 Phase 3）。

---

## 三、前置准备与版本

| 项目 | 版本要求 |
|---|---|
| Node.js | ≥ 20（当前 20.19.0 ✅） |
| pnpm | ≥ 9（当前强制使用 pnpm ✅） |
| Astro | ≥ 5.x |
| Fuwari | 最新 main |

**主题来源**：从 [saicaca/fuwari](https://github.com/saicaca/fuwari) fork 或 `pnpm create fuwari@latest` 拉取，随后剥离出主题层源码，作为独立主题仓库 `h1s97x/fuwari-theme`。

---

## 四、分阶段迁移步骤

### Phase 0 — 建立主题仓库（前置，0.5 天）⭐

1. 新建独立仓库 `h1s97x/fuwari-theme`。
2. 从 Fuwari 模板（或复用 PR #27 已跑通的 `fuwari/` 骨架）迁出**主题层源码**：
   ```
   src/components/   src/layouts/   src/ui/
   Tailwind 样式     i18n/          package.json   astro.config.mjs
   ```
   - 复用 PR #27 里已定制的配置成果：`astro.config.mjs` 的 `site: https://h1s97x.github.io`、`base: '/'`
   - **不含**：博客内容 `src/content/`、站点配置 `config.ts`（这些属博客本体）
3. 主题仓库独立跑通 `pnpm install` + `pnpm build`。

### Phase 1 — 博客仓库接入主题（0.5 天）

1. 博客仓库用 submodule 引入主题：
   ```bash
   git submodule add https://cnb.cool/h1s97x/fuwari-theme.git themes/fuwari-theme
   ```
2. `.gitmodules` 与现有 Almagest 结构对齐：
   ```
   [submodule "themes/fuwari-theme"]
     path = themes/fuwari-theme
     url  = https://cnb.cool/h1s97x/fuwari-theme.git
   ```
3. 博客本体配置 `src/config.ts`（站点标题、副标题、`lang: zh_CN`、主题色、头像复用 `source/images/calf.png`、导航栏、Profile GitHub/RSS）。可直接复用 PR #27 里的 `config.ts` 定制内容。

### Phase 2 — 内容资产迁移（1-2 天）⭐ 核心

写一个迁移脚本 `tools/migrate-fuwari.mjs`（可用 Node 的 `gray-matter` 解析）：

#### 2.1 front-matter 字段映射

| Hexo 字段 | Fuwari 字段 | 处理方式 |
|---|---|---|
| `title` | `title` | 直接映射 |
| `date` | `published` | 取日期部分，需 `z.date()` 合法格式 |
| `updated` | `updated` | 直接映射 |
| `categories` | `category` | 取第一项（Fuwari 只支持单一 category） |
| `tags` | `tags` | 直接映射 |
| `description` | `description` | 直接映射 |
| `notebook` | —（删除） | 迁移后由目录前缀 / category 承载 |
| `leetcode` / `studyplan` | —（保留在正文或自定义字段） | Fuwari schema 默认无此字段，可扩展示例见 §六 |

#### 2.2 分内容类型迁移

**A. 生活记录 `source/_posts/2023/*.md` → `src/content/posts/life/`**
```yaml
title: 鲁迅先生
published: 2023-08-28
category: 生活
tags: [生活]
description: ...
```
> 目录前缀 `life/` 用于区分路由，正文无需改动。

**B. 技术笔记 `source/notes/**/*.md` → `src/content/posts/notes/`**
```yaml
title: Minecraft
published: 2025-12-27
category: 笔记
tags: [游戏]
description: ...
```
> 原 notes 下按主题有子目录，迁移后可用 **文件目录层级** 保留（Fuwari 支持 posts 下任意嵌套）。

**C. 编程题解 `source/coding/**/index.md` → `src/content/posts/coding/`** ⚠️ 重点

coding 是最特殊的一块：每道题一个目录，含 `index.md` + `solution*.py` + `solution_test.py`。

- **迁移 index.md**：保留 front-matter，补 `category: 编程题解`
- **代码文件处理**：Fuwari 的 `Expressive Code` 支持代码高亮，但**不原生支持 Hexo 的 `{% asset_code %}` 标签**。两种方案：
  - **方案 A（推荐）**：在**主题仓库**新增 `<CodeBlock file="...">` 组件（读同目录 `.py` 交给 Expressive Code 高亮），博客侧零负担
  - **方案 B**：迁移脚本把 `solution*.py` 内容内联进 `index.md` 的 fenced code block

> **目录结构**：为保留「题单分组」，可将 `sliding-window-two-pointers/01-fixed-sliding-window/...` 的层级映射为
> `src/content/posts/coding/sliding-window-two-pointers/01-fixed-sliding-window/...`
> Fuwari 的 `getCollection` 可按目录过滤，天然支持题单分组。

### Phase 3 — 路由与页面（1 天）

Fuwari 默认只提供 Home / Archive / About。为还原 4 类路由，需在**博客本体**的 `src/pages/` 新增：

| 目标路由 | 实现方式 |
|---|---|
| `/` （首页） | 复用 Fuwari 默认 `[...page].astro`，过滤 `category !== 编程题解` |
| `/blog/` | 新增 `src/pages/blog/[...page].astro`，过滤 `category == 生活` |
| `/notes/` | 新增 `src/pages/notes/[...page].astro`，过滤 `category == 笔记` |
| `/coding/` | 新增 `src/pages/coding/[...page].astro`，过滤 `category == 编程题解` |
| `/archive/` | 复用 Fuwari 默认 archive |
| `/about/` | 复用 Fuwari 默认 about（读 `spec/about.md`） |

> 这三个新页面可复制 Fuwari 的 `[...page].astro`，只改过滤条件。导航栏在博客本体的 `config.ts` 的 `navBarConfig` 添加链接：Home / Blog / Notes / Coding / Archive / About。

### Phase 4 — 功能补齐（0.5-1 天）

| 当前功能 | 处理 | 归属 |
|---|---|---|
| giscus 评论 | 新增 `Giscus.astro` 组件（官方无内置，需自建，giscus 注入 script，不依赖框架，成本低） | **主题仓库**（通用能力） |
| sitemap | 加 `@astrojs/sitemap` 集成 | **主题仓库** |
| 站点标题 / 导航 / RSS 地址 / 主题色 | 在博客本体 `config.ts` 配置 | **博客本体** |
| 代码高亮 | ✅ Expressive Code 已内置 | 主题仓库 |
| KaTeX 公式 | ✅ 内置 rehype-katex | 主题仓库 |
| 搜索 | ✅ Pagefind 已内置（`pnpm build` 自动索引） | 主题仓库 |
| RSS | ✅ 已内置 `rss.xml.ts` | 主题仓库 |
| 阅读时间 / TOC | ✅ 内置 | 主题仓库 |

### Phase 5 — CI/CD 与部署（0.5 天）

1. 复用现有 `.github/workflows/ci.yml`，把 `pnpm run build` 换成 `pnpm astro build`（产物在 `dist/`）
2. GitHub Pages 部署：`astro.config.mjs` 设 `base: '/'`（若部署到项目子路径则设对应 base）
3. 沿用现有 commitlint / lint-staged / 分支保护规范（**无需改**，直接搬过来）
4. 可选：改用 Vercel / Cloudflare Pages（Fuwari 官方推荐，性能更佳）

---

## 五、迁移脚本设计（`tools/migrate-fuwari.mjs`）

```js
// 伪代码：核心逻辑
import { readFileSync, writeFileSync } from 'node:fs';
import matter from 'gray-matter';

function hexoToFuwari(frontmatter) {
  const { date, updated, categories, tags, description, ...rest } = frontmatter;
  return {
    title: frontmatter.title,
    published: date?.slice(0, 10),       // '2023-08-28 11:27:18' → '2023-08-28'
    updated: updated?.slice(0, 10),
    category: categories?.[0] ?? '',
    tags: tags ?? [],
    description: description ?? '',
    // 自定义字段（coding）：按需补充到 fuwari schema
    ...(frontmatter.leetcode && { leetcode: frontmatter.leetcode }),
    ...(frontmatter.studyplan && { studyplan: frontmatter.studyplan }),
  };
}

// 遍历 source/_posts, source/notes, source/coding
// 1. 按 §四-2 的目录前缀决定 category 与落点
// 2. 重写 front-matter 并写入 src/content/posts/...
// 3. 对 coding：额外处理 solution*.py（内联 或 生成 CodeBlock 引用）
```

---

## 六、需要扩展的 Fuwari 定制点

1. **content/config.ts 扩展 schema**（支持 coding 自定义字段，属博客本体）：
```ts
const postsCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		published: z.date(),
		category: z.string().optional().nullable().default(""),
		// + 自定义
		leetcode: z.number().optional(),
		studyplan: z.string().optional(),
		// ...其余 Fuwari 默认字段
	}),
});
```

2. **CodeBlock 组件**（属**主题仓库**）：新增 `src/components/widget/CodeBlock.astro` 读取本地 `.py` 文件并交给 Expressive Code 高亮。

3. **Giscus 组件**（属**主题仓库**）：新增 `src/components/widget/Giscus.astro`，注入 giscus 评论脚本，在 `posts/[...slug].astro` 中引入。

---

## 七、验收清单

- [ ] `pnpm build` 成功，`dist/` 生成
- [ ] 路由 `/` `/blog/` `/notes/` `/coding/` `/about/` 均可达
- [ ] 160 篇内容全部迁入（6 posts + 53 notes + 96 coding + 1 about）
- [ ] 代码高亮（Python 题解）正常
- [ ] 搜索（Pagefind）可检索全部内容
- [ ] RSS / sitemap 生成正确
- [ ] giscus 评论正常
- [ ] 深色 / 亮色模式切换正常
- [ ] GitHub Pages 部署成功

---

## 八、风险与应对

| 风险 | 应对 |
|---|---|
| `{% asset_code %}` 标签失效 | 用方案 B 内联，或自建 CodeBlock 组件 |
| Fuwari 单一 category 限制（原有多级 categories） | 只取第一级，其余并入 tags |
| 96 道 coding 题解目录层级深 | 保留目录层级映射，用 getCollection 过滤 |
| Hexo 特有插件（如 duplicates/alias）失效 | 迁移时用静态路由替代 |
| 旧 URL 失效（SEO / 外链） | 在 astro.config.mjs 配 redirects 或保留同路径 |
| **submodule 更新心智** | 与 Almagest 一致：主题改动需 `git submodule update` / 提交主题仓库 |

---

## 九、排期建议

| 阶段 | 耗时 | 里程碑 |
|---|---|---|
| Phase 0 建主题仓库 | 0.5 天 | `h1s97x/fuwari-theme` 独立 build 跑通 |
| Phase 1 博客接入 submodule | 0.5 天 | 博客引用主题，本地能跑 |
| Phase 2 内容迁移 | 1-2 天 | 160 篇内容全部可渲染 |
| Phase 3 路由 | 1 天 | 4 类路由可达 |
| Phase 4 功能补齐 | 0.5-1 天 | giscus / sitemap 等 |
| Phase 5 CI/CD | 0.5 天 | GitHub Pages 部署成功 |
| **合计** | **4-5 天** | 可灰度上线 |

> 建议：先在 feature 分支上完成 Phase 0-2，即可对现有 Hexo 站做**并行预览对比**，确认无回归再切换域名。
