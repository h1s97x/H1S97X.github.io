# 工作流程文档

## 🌳 分支策略

### 主要分支
- **master**: 生产环境分支，自动部署到 GitHub Pages
- **develop**: 开发分支，用于集成新功能
- **feature/***: 功能分支，从 develop 分出
- **hotfix/***: 热修复分支，从 master 分出
- **release/***: 发布分支，从 develop 分出

### 分支命名规范
- `feature/功能名称`: 新功能开发
- `fix/问题描述`: Bug 修复
- `docs/文档更新`: 文档相关更新
- `style/样式调整`: 样式或 UI 调整
- `refactor/重构描述`: 代码重构
- `test/测试相关`: 测试相关更改
- `chore/维护任务`: 维护任务

## 🔄 开发流程

### 1. 新功能开发
```bash
# 1. 切换到 develop 分支并更新
git checkout develop
git pull origin develop

# 2. 创建功能分支
git checkout -b feature/new-feature

# 3. 开发并提交
git add .
git commit -m "feat(feature): add new feature description"

# 4. 推送分支
git push origin feature/new-feature

# 5. 创建 Pull Request 到 develop 分支
```

### 2. Bug 修复
```bash
# 1. 从相应分支创建修复分支
git checkout develop  # 或 master (紧急修复)
git checkout -b fix/bug-description

# 2. 修复并提交
git add .
git commit -m "fix(component): fix bug description"

# 3. 推送并创建 PR
git push origin fix/bug-description
```

### 3. 发布流程
```bash
# 1. 从 develop 创建发布分支
git checkout develop
git checkout -b release/v1.0.0

# 2. 更新版本号和文档
# 3. 测试和修复
# 4. 合并到 master 和 develop
```

## 🧪 测试策略

### 自动化测试
- **单元测试**: Jest 测试框架
- **内容测试**: 验证 Markdown 文件格式
- **构建测试**: 验证 Hexo 构建过程
- **链接检查**: 验证外部链接有效性
- **安全扫描**: npm audit 和 audit-ci

### 测试命令
```bash
npm test              # 运行所有测试
npm run test:watch    # 监视模式运行测试
npm run test:coverage # 生成覆盖率报告
npm run check-links   # 检查链接
npm run lint          # 代码检查
npm run validate      # 完整验证
```

## 🚀 部署流程

### 环境说明
- **开发环境**: 本地开发服务器
- **测试环境**: develop 分支自动部署到 staging
- **生产环境**: master 分支自动部署到 GitHub Pages

### 部署触发条件
- **Staging**: 推送到 develop 分支
- **Production**: 推送到 master 分支

### 手动部署
```bash
# 本地预览
npm run server

# 构建并部署到生产环境
npm run build
npm run deploy
```

## 📋 代码规范

### Commit 消息格式
```
type(scope): description

type: feat, fix, docs, style, refactor, test, chore
scope: 影响的模块或组件
description: 简短描述 (50字符以内)
```

### 示例
```
feat(blog): add new post about CI/CD
fix(theme): fix mobile responsive issue
docs(readme): update installation guide
style(css): improve button styling
refactor(config): simplify configuration structure
test(content): add markdown validation tests
chore(deps): update dependencies
```

## 🔍 代码审查

### PR 审查清单
- [ ] 代码符合项目规范
- [ ] 测试通过
- [ ] 文档已更新
- [ ] 无安全漏洞
- [ ] 性能影响评估
- [ ] 向后兼容性

### 审查流程
1. 创建 Pull Request
2. 自动化测试运行
3. 代码审查
4. 修改和讨论
5. 批准并合并

## 🛠 开发工具

### 必需工具
- Node.js 18+ 
- Git
- 代码编辑器 (VS Code 推荐)

### 推荐插件 (VS Code)
- ESLint
- Prettier
- GitLens
- Markdown All in One
- Hexo Utils

## 📚 相关文档
- [Hexo 官方文档](https://hexo.io/docs/)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [Jest 测试文档](https://jestjs.io/docs/getting-started)