# H1S97X's Blog - 重构指南

## 项目目标

打造一个**流程规范、代码高质量、易于维护**的 Hexo 博客项目。

## 目录结构

```
/workspace/projects/
├── source/                   # 博客内容
├── themes/stellar/           # 主题 (submodule)
├── scripts/                  # Hexo 脚本
├── tools/                    # 工具脚本
├── _config.yml              # Hexo 主配置
├── _config.stellar.yml      # 主题配置
├── package.json
└── .github/workflows/       # CI/CD
```

## 已完成的重构

### Phase 1: 问题修复
- [x] 修复 contact/index.md 渲染错误
- [x] 移除废弃依赖 (hexo-renderer-jade/marked)
- [x] 清理未使用主题 (butterfly/next/anzhiyu)
- [x] CI 统一使用 pnpm
- [x] 修复 CI 分支名 (master → main)
- [x] 更新过时依赖

### Phase 2: 流程规范化
- [x] 完善 commitlint 配置
- [x] 优化 lint-staged 配置
- [x] 创建 PR 模板
- [x] 设置分支保护规则

### Phase 3: 质量提升 (进行中)
- [ ] 简化 CI workflow
- [ ] 完善文档
- [ ] 自动化测试覆盖

## 分支管理

| 分支类型 | 命名格式 | 示例 |
|---------|---------|------|
| feature | `feature/<描述>` | `feature/add-sitemap` |
| fix | `fix/<描述>` | `fix/contact-render` |
| chore | `chore/<描述>` | `chore/update-deps` |
| refactor | `refactor/<描述>` | `refactor/cleanup-config` |

## Commit Message 规范

```
<type>(<scope>): <subject>

feat(auth): 添加登录功能
fix(contact): 修复渲染错误
docs(readme): 更新文档
style(css): 格式化样式
refactor(config): 重构配置
perf(build): 优化构建速度
test(post): 添加文章测试
chore(deps): 更新依赖
```

## PR 流程

1. 从 main 创建功能分支
2. 开发 + 测试
3. 提交 PR 到 main
4. Code Review
5. Squash and merge

## 常见问题

1. **Nunjucks 渲染错误**: 确保运行 `pnpm install` 初始化 submodule
2. **多渲染器冲突**: 只保留 hexo-renderer-markdown-it
3. **CI 失败**: 检查 pnpm 版本和 Node.js 版本

## 注意事项

- 使用 pnpm 管理依赖
- CI 必须使用 pnpm
- 分支命名遵循规范
- Commit message 符合 commitlint 规则
