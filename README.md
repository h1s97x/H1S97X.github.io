# H1S97X's Blog

个人技术博客，使用 Astro + Fuwari 主题构建，托管于 GitHub Pages。

[![Powered by Astro](https://img.shields.io/badge/Powered%20by-Astro-1b1b1b?style=flat-square)](https://astro.build/)
[![Theme Fuwari](https://img.shields.io/badge/Theme-Fuwari-8b5cf6?style=flat-square)](https://github.com/saicaca/fuwari)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20.19.0-green?style=flat-square)](https://nodejs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/h1s97x/H1S97X.github.io/pulls)

## 技术栈

- **框架**: Astro 5.x (TypeScript / Vite)
- **主题**: Fuwari (saicaca/fuwari，MIT)，作为独立 npm 包 [astro-theme-fuwari](https://cnb.cool/h1s97x/astro-theme-fuwari) 经 CNB 制品库引入；博客仓不再 vendored 主题代码
- **包管理器**: pnpm (禁止 npm/Yarn)

> 本仓库由 Hexo 迁移而来，迁移方案见 [docs/MIGRATION_ASTRO.md](docs/MIGRATION_ASTRO.md)。

## 快速开始

```bash
# 安装依赖
pnpm install

# 本地预览
pnpm dev

# 构建（产物在 dist/，并自动生成 Pagefind 搜索索引）
pnpm build
```

## 开发命令

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 启动本地预览（默认 4321） |
| `pnpm build` | 构建到 `dist/` 并生成 Pagefind 搜索索引 |
| `pnpm check` | `astro check` 类型与内容检查 |
| `pnpm lint` | Biome 检查 |

> 部署由 CI 完成：合并到 `main` 后 `.cnb.yml` 同步到 GitHub，触发 `.github/workflows/deploy.yml` 发布到 GitHub Pages。

## 项目结构

```
src/
├── content/       # 内容（posts 文章 / spec 单页），含 config.ts 内容集合定义
└── styles/        # 站点自有样式（转载声明卡等）
astro.config.mjs   # Astro 配置 + 引入主题集成（fuwariTheme / fuwariIntegrations）
docs/              # 开发文档（含 Hexo→Astro 迁移方案）
```

> 主题代码（路由 / 布局 / 组件 / 样式）已抽离到独立包 `astro-theme-fuwari`，由 `astro.config.mjs` 通过集成注入，不在本仓维护。

更多开发与维护说明，请参考 [AGENTS.md](AGENTS.md) 与 [docs/](docs/)。

## 贡献指南

欢迎提交 Issue 和 Pull Request。

## License

本项目基于 [MIT License](LICENSE) 开源，版权所有 © 2023-2026 [H1S97X](https://github.com/h1s97x)。
