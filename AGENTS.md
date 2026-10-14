# H1S97X's Blog - Agent 规范

## 项目概述

Astro 静态博客，使用 Fuwari 主题。主题已抽离为独立 npm 包 `astro-theme-fuwari`（CNB 制品库发布，MIT；原作者 saicaca/fuwari），博客仓仅保留内容与最少配置。由 Hexo 迁移而来，详见 docs/MIGRATION_ASTRO.md。

**项目愿景**: 将此项目打造成 Astro 生态的标杆博客，具备流程规范、代码高质量、高可维护性和高解耦架构。

## 技术栈

- **框架**: Astro 5.x（TypeScript，构建基于 Vite）
- **主题**: Fuwari（saicaca/fuwari，MIT），以独立包 `astro-theme-fuwari` 经 CNB 制品库引入，博客仓不持有主题代码
- **语言**: Node.js >= 20.19.0；内容用 Markdown/MDX
- **包管理器**: pnpm（强制使用，禁止 npm/Yarn；preinstall 有 only-allow 校验）

## 核心设计原则

### 简洁务实

- 内容用 Markdown 写在 `src/content/posts/`，单页写在 `src/content/spec/`
- 主题代码（路由/布局/组件/样式）在 `astro-theme-fuwari` 包内，由 `astro.config.mjs` 通过集成注入；定制主题在主题仓库进行
- 迁移/工具脚本放在 `tools/` 目录
- 站点配置集中在 `astro.config.mjs`（集成/重定向/评论）；内容集合 schema 见 `src/content/config.ts`

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
  - `ci.yml` — PR 触发，单 Node 22，`pnpm install --frozen-lockfile` + `astro check` + `astro build`
  - `deploy.yml` — `main` 推送后 `actions/deploy-pages` 部署到 `github-pages` 环境（Pages 源 = GitHub Actions）
- `ci.yml` / `deploy.yml` 均注入 `CNB_TOKEN`（Secrets），用于从 CNB 制品库安装私有主题包
- 分支命名与 commit message 规范见上

## 当前状态

### 已完成 ✅

- **框架迁移**: Hexo + Almagest → Astro 5 + Fuwari
- **内容迁移**: 158 篇内容迁入 `src/content/posts/`（含图片资源），frontmatter 标准化
- **主题抽离**: Fuwari 抽成独立包 `astro-theme-fuwari`（CNB npm 制品库），博客仅依赖 `^0.1.1`
- **路由统一**: 单流 `/posts/<slug>/`，旧 `/blog/`、`/notes/`、`/coding/` 由 `tools/redirects.json` 301 重定向（约 160 条）
- **功能补齐**: giscus 评论、Pagefind 搜索、sitemap、RSS、明暗主题切换
- **部署链路**: `.cnb.yml` rebase 同步到 GitHub → GitHub Actions 部署 Pages（Actions 模式）

### 待处理 / Roadmap

- 评论系统增强：评估 Giscus/Utterances 配置与样式细化（当前已有 giscus 集成）
- 多语言（i18n）：现仅 zh-cn，后续按需引入
- 主题视觉/配色定制（在 `astro-theme-fuwari` 仓库进行）

详见: `docs/MIGRATION_ASTRO.md`

## 目录结构 (当前)

```
.
├── .cnb.yml                 # CNB 流水线（同步到 GitHub / PR 处理人）
├── .github/workflows/       # GitHub Actions（ci.yml / deploy.yml）
├── src/
│   ├── content/
│   │   ├── posts/           # 文章（Content Collections）
│   │   ├── spec/            # 关于页等单页
│   │   └── config.ts        # 内容集合 schema 定义（re-export 主题 collections）
│   └── （无 pages/components/layouts —— 主题代码在 astro-theme-fuwari 包内）
├── public/                  # 静态资源（图片 / 图标）
├── tools/
│   ├── migrate-fuwari.mjs   # Hexo → Astro 迁移脚本
│   └── redirects.json       # 旧链接 301 映射
├── astro.config.mjs         # Astro 配置（主题集成注入 / 重定向 / 评论）
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

| 命令                | 说明                                       |
| ------------------- | ------------------------------------------ |
| `pnpm dev`          | 启动本地预览（默认 4321）                  |
| `pnpm build`        | 构建（`dist/`）并生成 Pagefind 搜索索引    |
| `pnpm check`        | `astro check` 类型与内容检查               |
| `pnpm lint`         | Biome 检查                                 |
| `pnpm type-check`   | `tsc --noEmit` 类型检查                    |

## 常见问题

1. **主题（Fuwari）**: 独立包 `astro-theme-fuwari`（CNB 制品库）。改主题 → 主题仓升版 `npm publish` → 博客 `pnpm update astro-theme-fuwari` 并提交 lockfile。
2. **构建失败**: 先 `pnpm install` 再 `pnpm build`；Content Collections 的 frontmatter 校验失败会直接报错。CI 装包需 `CNB_TOKEN`，本地 shell 也需该环境变量。

## Coze 平台配置

- **preview_enable**: enabled
- **端口**: 5000
- **deploy.kind**: service
- **deploy.flavor**: web
