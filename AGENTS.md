# H1S97X's Blog - Agent 规范

## 项目概述

Astro 静态博客项目，使用 Fuwari 主题（vendored 副本，后期抽成 h1s97x/fuwari-theme 子模块）。由 Hexo 迁移而来，详见 docs/MIGRATION_ASTRO.md。主要功能是技术分享与生活记录。

**项目愿景**: 将此项目打造成 Astro 生态的标杆博客，具备流程规范、代码高质量、高可维护性和高解耦架构。

## 技术栈

- **框架**: Astro 5.x（TypeScript，构建基于 Vite）
- **主题**: Fuwari（saicaca/fuwari，MIT，当前 vendored 于本仓，后期抽子模块）
- **语言**: Node.js >= 20.19.0；内容用 Markdown/MDX
- **包管理器**: pnpm (强制使用，禁止 npm/Yarn)

## 核心设计原则

### 简洁务实

对于博客项目，保持简单：

- 内容用 Markdown 写在 `src/content/posts/`，单页写在 `src/content/spec/`
- 主题/组件在 `src/`（Fuwari vendored），定制优先改 `src/components`、`astro.config.mjs`
- 迁移/工具脚本放在 `tools/` 目录
- 配置集中在 `src/config.ts`（站点/导航/个人资料/评论）与 `astro.config.mjs`（集成/重定向）

## Git 工作流

### 分支管理

| 分支类型 | 命名格式                  | 示例                     |
| -------- | ------------------------- | ------------------------ |
| feature  | `feature/<ticket>-<描述>` | `feature/123-add-plugin` |
| fix      | `fix/<ticket>-<描述>`     | `fix/456-fix-render`     |
| hotfix   | `hotfix/<ticket>-<描述>`  | `hotfix/789-fix-deploy`  |
| refactor | `refactor/<描述>`         | `refactor/plugins`       |

### Commit Message 规范

```
<type>(<scope>): <subject>

type: feat | fix | docs | style | refactor | perf | test | chore
```

### PR 流程

1. 从 `main` 创建功能分支（如 `feature/astro-migration`）
2. 开发 + 本地 `pnpm build` 验证
3. 提交 PR 到 `main`
4. Code Review
5. Squash and merge
6. 合并后由 `.cnb.yml` rebase 同步到 GitHub，触发 GitHub Actions 部署到 Pages

## CI/CD 要求

- 所有 CI 必须使用 pnpm
- GitHub Actions（`.github/workflows/`）：
  - `build.yml` — `astro check` + `astro build`（Node 22/23 矩阵）
  - `biome.yml` — Biome 代码检查（Lint）
  - `codeql.yml` — CodeQL 安全扫描
  - `deploy.yml` — `main` 推送后构建并部署 GitHub Pages
- 分支命名与 commit message 规范见上

## 当前状态

### 已完成 ✅

- **框架迁移**：Hexo + Almagest → Astro 5 + Fuwari（vendored 于 `src/`）
- **内容迁移**：158 篇内容迁入 `src/content/posts/`（含图片资源），frontmatter 标准化
- **路由统一**：单流 `/posts/<slug>/`，旧 `/blog/年/月/日/`、`/notes/`、`/coding/` 由 `tools/redirects.json` 301 重定向
- **功能补齐**：giscus 评论、Pagefind 搜索、sitemap、RSS、明暗主题切换
- **部署链路**：`.cnb.yml` rebase 同步到 GitHub → GitHub Actions 部署 Pages

### 待处理

- 主题定制（视觉/配色）
- 主题抽成 `h1s97x/fuwari-theme` 子模块（P5，暂缓）

详见: `docs/MIGRATION_ASTRO.md`

## 目录结构 (当前)

```
.
├── .cnb.yml                 # CNB 流水线（同步到 GitHub / PR 处理人）
├── .github/workflows/       # GitHub Actions（build / biome / codeql / deploy）
├── src/
│   ├── config.ts            # 站点配置（标题/导航/个人资料/评论）
│   ├── content/
│   │   ├── posts/           # 文章（Content Collections）
│   │   └── spec/            # 关于页等单页
│   ├── pages/               # 路由（/、/archive/、/posts/<slug>/、/about/）
│   ├── components/          # 主题组件（Fuwari vendored）
│   └── layouts/             # 布局（Fuwari vendored）
├── public/                  # 静态资源（图片）
├── tools/
│   ├── migrate-fuwari.mjs   # Hexo → Astro 迁移脚本
│   └── redirects.json       # 旧链接 301 映射
├── astro.config.mjs         # Astro 配置（集成 / 重定向）
├── pagefind.yml             # Pagefind 搜索索引配置
└── package.json
```

### 内容分离策略

| 类型      | 目录                 | 用途                     |
| --------- | -------------------- | ------------------------ |
| **Posts** | `src/content/posts/` | 全部文章（生活/技术/题解） |
| **Spec**  | `src/content/spec/`  | 关于页等单页             |

> 内容由迁移脚本 `tools/migrate-fuwari.mjs` 从 Hexo 迁移而来；脚本会清空并重建 `src/content/posts/`，因此**手写新文章要放在该目录之外的备份，或改脚本行为后再增删**。

### 路由结构

```
/              - 首页（文章分页流）
/archive/      - 归档（按年份 + 标签/分类筛选）
/posts/<slug>/ - 文章详情
/about/        - 关于页面
```

## 运行命令

| 命令             | 说明                                  |
| ---------------- | ------------------------------------- |
| `pnpm dev`       | 启动本地预览（默认 4321）             |
| `pnpm build`     | 构建（`dist/`）并生成 Pagefind 搜索索引 |
| `pnpm check`     | `astro check` 类型与内容检查          |
| `pnpm lint`      | Biome 检查                            |
| `pnpm type-check`| `tsc --noEmit` 类型检查               |

## 常见问题

1. **主题（Fuwari）**: 当前 vendored 于本仓 `src/`，后期抽成 `h1s97x/fuwari-theme` 子模块（见 docs/MIGRATION_ASTRO.md）
2. **构建失败**: 先 `pnpm install` 再 `pnpm build`；Content Collections 的 frontmatter 校验失败会直接报错

## Coze 平台配置

- **preview_enable**: enabled
- **端口**: 5000
- **deploy.kind**: service
- **deploy.flavor**: web
