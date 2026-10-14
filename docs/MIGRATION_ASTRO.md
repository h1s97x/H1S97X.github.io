# 博客迁移方案：Hexo → Astro（+ Fuwari 主题）

> 本文是迁移的**完整执行方案**，整合了重构 Issue #29 的执行计划与前期调研结论。
> 当前决策：**框架用 Astro，主题用 Fuwari，但独立主题仓库（submodule）暂缓创建**，先完成本体迁移与功能，主题仓库作为后期优化。
> 本文取代早期草稿（PR #26 的 `docs/MIGRATION_FUWARI.md`），作为当前权威方案。

---

## 一、决策摘要

| 项 | 结论 |
|----|------|
| 框架 | **Astro**（TypeScript 编写，构建基于 Vite，群岛架构 / 零 JS 首屏） |
| 主题 | **Fuwari**（Astro 生态头部博客主题） |
| 架构 | 主题 / 本体分离（最终态以 submodule 引用 `h1s97x/fuwari-theme`） |
| 维护方 | Astro 由 Fred Schott 等创建；**2026-01 Cloudflare 收购团队，继续开源、独立演进** |
| 当前范围 | **不建独立主题仓库**：先 vendored 使用 Fuwari 源码，跑通本体迁移；主题独立仓库放后期 |
| 部署 | 产物 `dist/` 直接丢 GitHub Pages / Cloudflare Pages（Vite 构建，CI 切换成本低） |

### 为什么是 Astro
- 默认输出纯 HTML、**首屏 0KB JS**（仅交互组件按需 hydrate），SEO 友好。
- 内容建模用 **Content Collections + zod** 校验 frontmatter，类型安全。
- 代码高亮用 **Shiki / Expressive Code**（VS Code 同款着色，构建期、零运行时），对 184 个 `.py` 题解是刚需。
- 组件化 DX：交互局部可用 React / Vue / Svelte 任意框架，不绑定。
- 被 Cloudflare 背书，长期有保障。

---

## 二、目标架构（最终态）

```
H1S97X.github.io  (博客本体)
├─ src/
│  ├─ content/            ← 158 篇内容（posts / spec）
│  ├─ pages/              ← 单流路由（/ /archive/ /posts /about）
│  └─ config.ts           ← 站点配置（标题/导航/个人资料/评论）
├─ themes/fuwari-theme    ← submodule（后期独立仓库 h1s97x/fuwari-theme）
├─ public/                ← 静态资源（favicon / calf.png）
├─ .github/  .cnb.yml     ← CI/CD（lint → test → build → security）
├─ tools/                 ← 迁移脚本 migrate-fuwari.mjs
└─ astro.config.mjs       ← 引用主题 + redirects
```

---

## 三、过渡架构（当前阶段，主题仓库暂缓）

不立即建 `h1s97x/fuwari-theme`，改用 **vendored 主题源码**：

1. 把 Fuwari 源码作为起点复制到本仓库的 `src/`（或独立标记的 `theme-src/`）下，直接定制。
2. 本体与主题源码同仓演进，省去 submodule 管理心智。
3. **后期（P5）** 稳定后，再把定制好的主题层抽取到 `h1s97x/fuwari-theme`，切回 submodule 引用，回归 Issue #29 最终架构。

> 这样既不阻塞迁移主线的推进，又避免过早维护两个仓库的协调成本。

---

## 四、内容迁移映射

| 原（Hexo） | 目标（Astro） |
|-----------|--------------|
| `source/_posts/`（生活，6 篇） | `src/content/posts/life/` |
| `source/notes/`（笔记，53 篇） | `src/content/posts/notes/` |
| `source/coding/`（题解，96 篇） | `src/content/posts/coding/` |
| `source/about/` | `src/content/spec/about.md` 或 `src/pages/about.astro` |
| frontmatter: `date`/`categories`/`tags` | `published`/`category`/`tags`（zod schema 校验） |
| `{% asset_code %}` 标签 | `<CodeBlock file>` 组件（读同目录 `.py`，交 Expressive Code） |

### Content Collections schema（博客本体 `src/content/config.ts`）
```ts
import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    category: z.string().optional().default(''),
    tags: z.array(z.string()).default([]),
    description: z.string().optional().default(''),
    leetcode: z.number().optional(),      // coding 自定义字段
    studyplan: z.string().optional(),
  }),
});

export const collections = { posts };
```

### 迁移脚本 `tools/migrate-fuwari.mjs`
- 用 `gray-matter` 解析 Hexo frontmatter，做字段映射（见上表）。
- 遍历 `source/_posts`、`source/notes`、`source/coding`，按目录前缀决定 `category` 与落点。
- 对 `coding`：额外处理 `solution*.py`——方案 A 生成 `<CodeBlock>` 引用，方案 B 内联进 fenced block。
- 多级 `categories` 只取第一级当 `category`，其余并入 `tags`。

---

## 五、路由还原（实际落地：单流）

迁移过程中把原计划的 `/blog` `/notes` `/coding` 三条并行路由**收敛为单流**，减少重复入口：

| 路由 | 实现 |
|------|------|
| `/` | 首页，全部文章分页流（`src/pages/[...page].astro`） |
| `/archive/` | 归档，按年份分组 + 标签/分类筛选（`src/pages/archive.astro`） |
| `/posts/<slug>/` | 文章详情（`src/pages/posts/[...slug].astro`） |
| `/about/` | 关于页（`src/pages/about.astro`） |

> 旧的 `/blog/年/月/日/`、`/notes/`、`/coding/`、`/archives/` 全部由 `tools/redirects.json` 生成 301 跳转到新地址。
> `draft: true` 的文章生产构建不会生成页面，对应旧链接统一回落到 `/archive/`，避免 404。

- **URL 兼容（高优先级）**：160 篇旧地址换框架后路径极易变，外链与搜索收录会掉。在 `astro.config.mjs` 配 `redirects` 或保留同路径，逐条核对。
- 当前仓库是 `H1S97X.github.io` **用户页**（根路径服务），`base` 默认 `/` 即可；若日后迁到项目页需配 `base`。

---

## 六、功能补齐

| 功能 | 方案 | 归属 |
|------|------|------|
| 代码高亮 | `@astrojs/expressive-code`（Shiki，构建期） | 主题/组件 |
| 搜索 | **Pagefind**（`postbuild` 扫 `dist/`，按需拉索引） | 博客（构建后） |
| 评论 | **giscus** 组件 | 主题/组件 |
| sitemap | `@astrojs/sitemap` | 博客（集成） |
| RSS | `@astrojs/rss` | 博客（集成） |
| 暗色/亮色 | Fuwari 内置 | 主题 |

---

## 七、CI/CD 切换

- `.github/workflows/ci.yml` 构建换成 `pnpm astro build`（产物 `dist/`）。
- `.cnb.yml` 同步切换；`commitlint` / `lint-staged` / 分支保护原样保留。
- 清理 Hexo 残留：`_config.yml`、`scripts/` 过滤器、`package.json` 里 30+ Hexo 依赖、`themes/almagest` submodule。
- 保留：lint → test → build → security 四阶段。

---

## 八、避坑清单

1. **Fuwari 单 category 模型** vs Hexo 多级 `categories`（如 `coding/sliding-window-two-pointers/...`）：取第一级当 `category`，其余并入 `tags`。最终收敛成单流后，题解层级导航由 `tags` 承担。
2. **`{% asset_code %}` 标签失效**：自建 `<CodeBlock file>` 组件读 `.py`，或迁移脚本内联。
3. **Hexo 特有插件失效**：`hexo-generator-alias`、`hexo-related-posts` 等 → 用 `redirects` + 静态路由替代。
4. **旧 URL / SEO 掉链**：`astro.config.mjs` 严控 `redirects`，逐条核对。
5. **submodule 更新心智**（后期）：主题改动需 `git submodule update` + 提交主题仓库版本。
6. **GitHub Pages base path**：用户页默认 `/`；项目页需配 `base` 与 `assetPrefix`。

---

## 九、分阶段执行（主题仓库暂缓）

| 阶段 | 内容 | 是否建主题仓库 |
|------|------|---------------|
| **P0 准备** | 初始化 Astro 工程；vendored 引入 Fuwari 源码；`pnpm dev` 跑通 | 否（vendored） |
| **P1 内容迁移** | 写 `migrate-fuwari.mjs`，迁移 160 篇到 Content Collections | 否 |
| **P2 路由** | 单流路由（`/` `/archive/` `/posts/<slug>/` `/about/`）+ `redirects` | 否 |
| **P3 功能** | giscus / sitemap / Pagefind / RSS / 暗色切换 | 否 |
| **P4 CI/CD** | 切 `astro build`、清理 Hexo 残留、GitHub Pages 部署成功 | 否 |
| **P5 主题仓库（暂缓）** | 抽取定制主题到 `h1s97x/fuwari-theme`，切 submodule 引用 | **是（后期）** |

> 建议：P0–P2 在 feature 分支完成后，即可与现有 Hexo 站做**并行预览对比**，确认无回归再切域名。

---

## 十、验收标准（已达成）

- [x] `pnpm build` 成功，`dist/` 生成。
- [x] 路由 `/` `/archive/` `/posts/<slug>/` `/about/` 均可达（单流）。
- [x] 158 篇内容全部迁入 `src/content/posts/`（含图片资源）。
- [x] 代码高亮（Python 题解）正常。
- [x] Pagefind 搜索可检索全部已发布内容。
- [x] RSS / sitemap 生成正确。
- [x] giscus 评论正常（仅文章页）。
- [x] 深色 / 亮色切换正常。
- [x] 旧 URL 经 `redirects` 全部可达（`draft` 旧链接回落 `/archive/`）。
- [x] GitHub Pages 部署链路就绪（`.cnb.yml` → GitHub Actions → Pages）。
- [x] Hexo 残留（`_config.yml`、`scripts/`、Hexo 依赖、`themes/almagest`）已删除。
- [ ] （后期）`h1s97x/fuwari-theme` 独立仓库就绪，submodule 引用跑通。

---

## 十一、关联

- Issue #29：Hexo → Astro + Fuwari 执行计划（最终架构 / submodule 心智）。
- PR #26：早期 `docs/MIGRATION_FUWARI.md` 草稿（已被本文取代）。
- 博客文章：CSR/SSR/SSG 渲染模式梳理、Astro 迁移避坑（见 `source/_posts/2026/`）。
