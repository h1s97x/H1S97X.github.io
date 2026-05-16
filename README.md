# H1S97X's Blog

个人技术博客，使用 Hexo + Stellar 主题构建。

[![Powered by Hexo](https://img.shields.io/badge/Powered%20by-Hexo-blue?style=flat-square)](https://hexo.io/)
[![Theme Stellar](https://img.shields.io/badge/Theme-Stellar-orange?style=flat-square)](https://github.com/xaoxuu/hexo-theme-stellar)

## 技术栈

- **框架**: Hexo 8.x
- **主题**: Stellar 1.33.x
- **包管理器**: pnpm

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
themes/stellar/  # 主题 (submodule)
scripts/         # 自定义脚本 (filters, tags, generators)
tools/           # 工具脚本
docs/            # 开发文档
```

## 贡献指南

欢迎提交 Issue 和 Pull Request。

## License

MIT
