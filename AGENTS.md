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

### 高解耦架构

项目采用 **主应用 + 插件** 的架构设计，类似 VSCode 扩展机制：

```
core/           → 核心层 (Hexo 基础 + 主题核心)
plugins/        → 插件层 (可插拔功能模块)
content/        → 内容层 (博客、笔记、题解)
configs/        → 配置层 (解耦的配置文件)
```

### 插件化原则

每个插件应具备：
- 独立目录结构
- 独立配置文件
- 独立测试
- 可独立启用/禁用

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

### 已规划未实施

- 目录结构重构 (迁移到 core/plugins/content)
- 插件化拆分
- 配置解耦
- 测试覆盖率提升

详见: `docs/REFACTOR_GUIDE.md`

## 目录结构 (当前)

```
/workspace/projects/
├── source/                   # 内容 (待迁移)
├── themes/stellar/           # 主题 (submodule)
├── scripts/                  # Hexo 脚本
├── tools/                    # 工具脚本
├── configs/                  # 配置文件 (待创建)
├── plugins/                  # 插件目录 (待创建)
├── _config.yml              # Hexo 主配置
├── _config.stellar.yml      # 主题配置
├── package.json
└── coze-scripts/            # Coze 平台脚本
```

## 运行命令

| 命令 | 说明 |
|------|------|
| `pnpm run build` | 生成静态网站 |
| `pnpm run server` | 启动本地预览 |
| `pnpm run lint` | ESLint 检查 |
| `pnpm run test` | 运行单元测试 |

## 常见问题

1. **Nunjucks 渲染错误**: contact/index.md 中的 `{% quot %}` 标签需修复
2. **多渲染器**: 需清理 hexo-renderer-jade/marked
3. **未使用的主题**: butterfly/next/anzhiyu 需移除

## Coze 平台配置

- **preview_enable**: enabled
- **端口**: 5000
- **deploy.kind**: service
- **deploy.flavor**: web
