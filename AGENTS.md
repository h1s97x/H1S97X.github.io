# H1S97X's Blog - Agent 规范

## 项目概述

Hexo 静态博客项目，使用 Stellar 主题。主要功能是技术分享与生活记录。

**项目愿景**: 将此项目打造成 Hexo 生态的标杆博客，具备流程规范、代码高质量、高可维护性和高解耦架构。

## 技术栈

- **框架**: Hexo 8.1.x
- **主题**: hexo-theme-stellar 1.33.x
- **语言**: Node.js >= 20.19.0
- **包管理器**: pnpm (强制使用，禁止 npm/yarn)

## 核心设计原则

### 简洁务实

对于博客项目，保持简单：
- 使用 Hexo 原生插件系统
- 自定义脚本放在 `scripts/` 目录
- 工具脚本放在 `tools/` 目录
- 配置文件使用 `_config.*.yml`

## Git 工作流

### 分支管理

| 分支类型 | 命名格式 | 示例 |
|---------|---------|------|
| feature | `feature/<ticket>-<描述>` | `feature/123-add-plugin` |
| fix | `fix/<ticket>-<描述>` | `fix/456-fix-render` |
| hotfix | `hotfix/<ticket>-<描述>` | `hotfix/789-fix-deploy` |
| refactor | `refactor/<描述>` | `refactor/plugins` |

### Commit Message 规范

```
<type>(<scope>): <subject>

type: feat | fix | docs | style | refactor | perf | test | chore
```

### PR 流程

1. 从 develop 创建功能分支
2. 开发 + 测试
3. 提交 PR 到 develop
4. Code Review
5. Squash and merge
6. 自动部署 staging
7. 手动合并 main 发布

## CI/CD 要求

- 所有 CI 必须使用 pnpm
- 必须包含: Lint → Test → Build → Security Scan
- 分支命名与 commit message 校验

## 当前状态

### 已完成 ✅

- 依赖清理 (移除未使用的 hexo-tag-aplayer, hexo-filter-mermaid-diagrams)
- 工具脚本清理 (移除 5 个重复/无用脚本)
- Workflows 简化 (保留 ci.yml, deploy.yml, pr-compliance.yml)
- 流程规范化 (commitlint, PR 模板, 分支保护)

### 待处理

- 主题配置优化
- 文档完善
- 测试覆盖率提升

详见: `docs/REFACTOR_GUIDE.md`

## 目录结构 (当前)

```
/workspace/projects/
├── .github/workflows/        # CI/CD 配置
├── source/                  # 博客内容
├── themes/stellar/          # 主题 (submodule)
├── scripts/                 # Hexo 脚本 (filters/tags/generators)
├── tools/                   # 工具脚本
├── _config.yml             # Hexo 主配置
├── _config.stellar.yml     # 主题配置
├── package.json
└── coze-scripts/           # Coze 平台脚本
```

## 运行命令

| 命令 | 说明 |
|------|------|
| `pnpm run build` | 生成静态网站 |
| `pnpm run server` | 启动本地预览 |
| `pnpm run lint` | ESLint 检查 |
| `pnpm run test` | 运行单元测试 |
| `pnpm run deploy` | 部署到 GitHub Pages |
| `pnpm run stellar:validate` | 验证 Stellar 主题配置 |

## 常见问题

1. **主题 submodule**: 使用 `pnpm run themes:init` 初始化
2. **构建失败**: 先运行 `pnpm run stellar:validate` 检查配置

## Coze 平台配置

- **preview_enable**: enabled
- **端口**: 5000
- **deploy.kind**: service
- **deploy.flavor**: web
