# H1S97X's Blog

个人技术博客，使用 Hexo + Almagest 主题构建，托管于 GitHub Pages。

[![Powered by Hexo](https://img.shields.io/badge/Powered%20by-Hexo-blue?style=flat-square)](https://hexo.io/)
[![Theme Almagest](https://img.shields.io/badge/Theme-Almagest-purple?style=flat-square)](https://cnb.cool/h1s97x/hexo-theme-almagest)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20.19.0-green?style=flat-square)](https://nodejs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/h1s97x/H1S97X.github.io/pulls)

## 技术栈

- **框架**: Hexo 8.x
- **主题**: Almagest (hexo-theme-almagest)
- **包管理器**: pnpm (禁止 npm/Yarn)

## 快速开始

```bash
# 安装依赖
pnpm install

# 本地预览
pnpm run server

# 构建
pnpm run build

# 部署
pnpm run deploy
```

## 开发命令

| 命令 | 说明 |
|------|------|
| `pnpm run server` | 启动本地预览 |
| `pnpm run build` | 生成静态文件 |
| `pnpm run deploy` | 部署到 GitHub Pages |
| `pnpm run lint` | ESLint 检查 |
| `pnpm run test` | 运行测试 |
| `pnpm run validate` | 运行所有验证 |

## 项目结构

```
source/          # 博客内容 (文章、笔记、题解)
themes/almagest/  # 主题 (submodule)
scripts/         # 自定义脚本 (filters, tags, generators)
tools/           # 工具脚本
docs/            # 开发文档
```

更多开发与维护说明，请参考 [AGENTS.md](AGENTS.md) 与 [docs/](docs/)。

## 贡献指南

欢迎提交 Issue 和 Pull Request。

## License

本项目基于 [MIT License](LICENSE) 开源，版权所有 © 2024-2026 [H1S97X](https://github.com/h1s97x)。
