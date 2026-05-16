# H1S97X's Blog 重构愿景文档

> 最后更新: 2025-05-16
> 状态: 规划中 (待迭代确认)

---

## 一、项目愿景

将 H1S97X's Blog 打造成 **Hexo 生态的标杆博客项目**。

### 核心目标

| 目标 | 说明 |
|------|------|
| **流程规范** | Git Flow 分支管理、PR + Code Review、自动化 CI/CD |
| **代码高质量** | ESLint + Prettier + TypeScript 检查、单元测试、lint-staged |
| **高可维护性** | 清晰的目录结构、完善的文档、自动化的工具链 |
| **高解耦架构** | 主应用 + 插件化设计，类似 VSCode 扩展机制 |

### 对标参考

- VSCode 的扩展架构设计
- Hexo 官方主题的代码组织
- 现代前端工程的最佳实践

---

## 二、架构设计

### 2.1 整体架构

```
┌─────────────────────────────────────────────────────────┐
│                    H1S97X's Blog                         │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────┐    │
│  │              Core (核心层)                        │    │
│  │  - Hexo 基础配置                                  │    │
│  │  - 主题基础 (Stellar)                             │    │
│  │  - 基础脚本和过滤器                               │    │
│  └─────────────────────────────────────────────────┘    │
│                           │                              │
│                           ▼                              │
│  ┌─────────────────────────────────────────────────┐    │
│  │            Plugins (插件层) [可插拔]             │    │
│  │  ┌───────────┐ ┌───────────┐ ┌───────────┐      │    │
│  │  │ 代码高亮  │ │  数学公式  │ │  Mermaid  │ ...  │    │
│  │  │  插件    │ │  插件    │ │   插件   │      │    │
│  │  └───────────┘ └───────────┘ └───────────┘      │    │
│  │  ┌───────────┐ ┌───────────┐ ┌───────────┐      │    │
│  │  │  图表插件 │ │  音乐播放  │ │  评论系统  │ ...  │    │
│  │  │          │ │          │ │          │      │    │
│  │  └───────────┘ └───────────┘ └───────────┘      │    │
│  └─────────────────────────────────────────────────┘    │
│                           │                              │
│                           ▼                              │
│  ┌─────────────────────────────────────────────────┐    │
│  │           Content (内容层)                       │    │
│  │  - 博客文章 (source/_posts)                      │    │
│  │  - 笔记 (source/notes)                           │    │
│  │  - Coding 题解 (source/coding)                   │    │
│  └─────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────┤
│  Infrastructure (基础设施)                               │
│  - CI/CD Pipeline                                       │
│  - Git Hooks (Husky + lint-staged)                      │
│  - 开发工具链                                           │
└─────────────────────────────────────────────────────────┘
```

### 2.2 插件化设计原则

```
插件隔离原则:
├── 每个插件独立目录
├── 插件配置独立文件 (configs/plugin-*.yml)
├── 插件脚本独立目录 (plugins/plugin-name/scripts)
├── 插件测试独立目录 (plugins/plugin-name/test)
└── 插件声明在 package.json 的独立字段
```

---

## 三、Git 工作流

### 3.1 分支命名规范

| 分支类型 | 命名格式 | 示例 |
|---------|---------|------|
| feature | `feature/<ticket>-<描述>` | `feature/123-add-code-highlight` |
| fix | `fix/<ticket>-<描述>` | `fix/456-fix-math-render` |
| hotfix | `hotfix/<ticket>-<描述>` | `hotfix/789-fix-deploy-error` |
| refactor | `refactor/<描述>` | `refactor/split-plugins` |
| docs | `docs/<描述>` | `docs/update-readme` |

### 3.2 PR 规范

```
PR 流程:
1. 从 develop 创建功能分支
2. 开发 + 测试
3. 提交 PR 到 develop
4. Code Review (至少 1 人 approve)
5. Squash and merge
6. 自动部署到 staging
7. 手动合并到 main 发布
```

### 3.3 Commit Message 规范

```
格式: <type>(<scope>): <subject>

type:
├── feat: 新功能
├── fix: 修复 bug
├── docs: 文档更新
├── style: 代码格式
├── refactor: 重构
├── perf: 性能优化
├── test: 测试
├── chore: 构建/工具

示例:
feat(plugins): 添加代码高亮插件
fix(contact): 修复 quot 标签渲染错误
refactor(ci): 统一使用 pnpm
```

---

## 四、质量保障

### 4.1 代码检查

| 检查项 | 工具 | 说明 |
|-------|------|------|
| JavaScript | ESLint | 代码规范 + Prettier 格式化 |
| Markdown | textlint | 中文错别字 + 术语规范 |
| Git Commit | commitlint | commit message 格式 |
| 安全 | audit-ci | 依赖安全审计 |
| 链接 | check-links | 死链检测 |

### 4.2 测试策略

```
测试金字塔:
       ┌─────────┐
       │  E2E   │  (可选，CI 时跳过)
       │  Test  │
       ├─────────┤
       │  Unit  │  (tools 脚本 + 插件逻辑)
       │  Test  │
       └────────┘
       
覆盖要求:
├── 工具脚本: 70%+
├── Hexo 过滤器: 核心逻辑覆盖
└── 插件: 关键函数覆盖
```

### 4.3 CI/CD 流程

```
CI Pipeline:
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  Lint   │───▶│  Test   │───▶│  Build   │───▶│ Security │
│  Check  │    │  Unit   │    │  Test    │    │  Scan    │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
                                                     │
                                                     ▼
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  Deploy  │◀───│ Preview  │◀───│ Staging  │◀───│ Approve  │
│  Prod    │    │  Link    │    │ Deploy   │    │  (PR)    │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
```

---

## 五、目录结构规划

### 5.1 目标结构

```
h1s97x-blog/
├── .github/
│   └── workflows/          # GitHub Actions
├── configs/                # 配置文件 (解耦)
│   ├── _config.yml         # Hexo 主配置
│   ├── _config.stellar.yml # 主题配置
│   ├── plugins/            # 插件配置
│   │   ├── plugin-math.yml
│   │   ├── plugin-mermaid.yml
│   │   └── plugin-aplayer.yml
│   └── presets/            # 环境预设
│       ├── _config.dev.yml
│       └── _config.staging.yml
├── content/                # 内容 (统一目录)
│   ├── posts/              # 博客文章
│   ├── notes/              # 笔记
│   └── coding/             # 题解
├── core/                   # 核心层 (主应用)
│   ├── hexo/               # Hexo 基础
│   ├── stellar/            # 主题核心
│   └── scripts/            # 核心脚本 (filters, tags, generators)
├── plugins/                # 插件层 (可插拔)
│   ├── plugin-code-highlight/
│   ├── plugin-math/
│   ├── plugin-mermaid/
│   ├── plugin-diagrams/
│   └── plugin-seo/
├── tools/                  # 开发工具
│   ├── deploy.js
│   ├── validate-theme.js
│   └── ...
├── scaffolds/              # 文章模板
├── tests/                  # 测试
│   ├── unit/
│   └── integration/
├── package.json
├── pnpm-workspace.yaml     # pnpm 工作空间 (可选)
└── README.md
```

### 5.2 迁移映射

| 原目录 | 目标目录 | 说明 |
|-------|---------|------|
| `source/_posts` | `content/posts` | 统一内容目录 |
| `source/notes` | `content/notes` | |
| `source/coding` | `content/coding` | |
| `scripts/` | `core/scripts/` | 核心脚本 |
| `themes/stellar/` | `core/stellar/` | 主题作为核心 |
| `tools/` | `tools/` | 保持不变 |
| 散落插件逻辑 | `plugins/*/` | 插件化拆分 |

---

## 六、插件设计规范

### 6.1 插件结构

```
plugin-xxx/
├── package.json            # 插件依赖
├── scripts/                # 插件脚本
│   ├── filters/
│   ├── tags/
│   └── generators/
├── configs/
│   └── plugin-xxx.yml      # 插件配置
├── templates/              # EJS/Nunjucks 模板
├── assets/                 # 静态资源
├── test/
│   └── index.test.js
└── README.md
```

### 6.2 插件注册机制

```javascript
// plugins/plugin-xxx/index.js
module.exports = function(ctx) {
  return {
    // 过滤器
    filter: require('./scripts/filters/xxx'),
    // 标签
    tag: require('./scripts/tags/xxx'),
    // 生成器
    generator: require('./scripts/generators/xxx'),
    // 配置
    config: require('../configs/plugins/plugin-xxx')
  };
};
```

---

## 七、实施计划

### Phase 1: 基础设施 (TBD)
- [ ] 统一包管理器 (pnpm)
- [ ] 完善 Git Hooks
- [ ] 优化 CI/CD Pipeline
- [ ] 建立 commit message 规范

### Phase 2: 架构重构 (TBD)
- [ ] 目录结构重组
- [ ] 配置解耦
- [ ] 插件化拆分

### Phase 3: 质量提升 (TBD)
- [ ] 测试覆盖率提升
- [ ] 文档完善
- [ ] 自动化工具增强

---

## 八、待确认项

> 以下内容需要与用户迭代确认

1. **插件化粒度**: 插件拆分的细度 (按功能还是按类型?)
2. **pnpm workspace**: 是否使用 workspace 管理多包?
3. **内容目录**: 是否迁移到 `content/` 统一目录?
4. **测试框架**: Jest 还是 Vitest?
5. **部署策略**: GitHub Pages 还是其他?
6. **插件市场**: 是否需要支持第三方插件?

---

## 版本历史

| 版本 | 日期 | 更新内容 |
|-----|------|---------|
| v0.1 | 2025-05-16 | 初始版本，定义愿景和目标架构 |
