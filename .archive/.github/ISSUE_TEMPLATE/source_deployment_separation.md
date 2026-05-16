---
name: 开发内容与部署内容分离
about: 将博客开发源码与Hexo生成的静态文件分离，优化项目结构和部署流程
title: '[STRUCTURE] 开发内容与部署内容分离方案设计'
labels: 'structure, deployment, workflow, enhancement'
assignees: ''
---

## 🎯 问题描述

当前博客项目将开发源码（Markdown文件、配置文件、工具脚本等）与Hexo生成的静态文件混合在同一个仓库中，导致：

1. **仓库体积庞大**：包含大量生成的静态文件
2. **版本控制混乱**：源码变更与生成文件变更混在一起
3. **部署复杂**：需要在同一分支管理开发和部署内容
4. **协作困难**：贡献者需要处理生成文件的冲突

## 📋 当前项目结构分析

### 开发内容（需要版本控制）
```
├── source/                 # Markdown文章源文件
├── themes/                 # 主题文件
├── tools/                  # 开发工具脚本
├── test/                   # 测试文件
├── .github/                # GitHub配置
├── _config.yml             # Hexo主配置
├── _config.*.yml           # 主题配置文件
├── package.json            # 依赖管理
├── scaffolds/              # 文章模板
└── 各种文档和配置文件
```

### 生成内容（部署用）
```
├── public/                 # 生成的静态网站
├── db.json                 # Hexo数据库
├── node_modules/           # 依赖包
└── 各种生成的临时文件
```

## 🔄 方案对比分析

## 方案一：GitHub分支分离

### 📁 结构设计
- **`main`分支**：存储开发源码
- **`gh-pages`分支**：存储生成的静态文件
- **可选`dev`分支**：开发测试分支

### ✅ 优点
1. **清晰分离**：开发和部署内容完全分开
2. **GitHub Pages原生支持**：可直接从gh-pages分支部署
3. **版本控制清晰**：源码变更历史清晰可见
4. **仓库体积小**：main分支只包含源码
5. **标准做法**：符合GitHub Pages最佳实践
6. **自动化友好**：CI/CD可以自动推送到gh-pages

### ❌ 缺点
1. **学习成本**：需要理解分支概念和操作
2. **操作复杂**：需要切换分支进行不同操作
3. **同步问题**：两个分支需要保持同步
4. **本地管理**：需要管理多个分支的本地副本

### 🛠️ 实施方案
```bash
# 1. 清理当前分支，只保留源码
git rm -r public/ db.json node_modules/
git add .
git commit -m "Clean up generated files from main branch"

# 2. 创建gh-pages分支用于部署
git checkout --orphan gh-pages
git rm -rf .
# 生成静态文件并提交
hexo generate
cp -r public/* .
git add .
git commit -m "Initial deployment"

# 3. 设置自动化部署
# 使用GitHub Actions在main分支更新时自动构建并推送到gh-pages
```

---

## 方案二：项目结构分离

### 📁 结构设计
```
├── src/                    # 开发源码目录
│   ├── source/            # 文章源文件
│   ├── themes/            # 主题文件
│   ├── tools/             # 工具脚本
│   ├── test/              # 测试文件
│   ├── _config.yml        # 配置文件
│   └── package.json       # 依赖管理
├── dist/                   # 生成文件目录（.gitignore）
│   └── public/            # 静态网站文件
├── deploy/                 # 部署相关文件
│   ├── .github/           # 部署用的GitHub Actions
│   └── deploy.sh          # 部署脚本
├── docs/                   # 项目文档
└── .gitignore             # 忽略生成文件
```

### ✅ 优点
1. **目录清晰**：开发和生成内容在不同目录
2. **单分支管理**：所有内容在同一分支
3. **操作简单**：不需要切换分支
4. **本地友好**：本地开发体验更好
5. **灵活配置**：可以精确控制哪些文件被版本控制
6. **渐进式迁移**：可以逐步调整结构

### ❌ 缺点
1. **非标准做法**：不符合Hexo和GitHub Pages常规做法
2. **配置复杂**：需要修改Hexo配置路径
3. **部署复杂**：需要自定义部署脚本
4. **仓库体积**：如果不小心提交生成文件，仓库会变大
5. **工具兼容性**：某些Hexo插件可能不兼容自定义结构

### 🛠️ 实施方案
```bash
# 1. 创建新的目录结构
mkdir -p src dist deploy docs
mv source themes tools test _config*.yml package.json scaffolds src/
mv public dist/ 2>/dev/null || true

# 2. 更新配置文件路径
# 修改src/package.json中的脚本路径
# 修改Hexo配置文件中的路径设置

# 3. 更新.gitignore
echo "dist/" >> .gitignore
echo "node_modules/" >> .gitignore
echo "db.json" >> .gitignore

# 4. 创建部署脚本
# 在deploy/目录下创建自动化部署脚本
```

---

## 方案三：混合方案

### 📁 结构设计
- **主仓库**：开发源码（当前仓库重构）
- **部署仓库**：静态文件（新建username.github.io仓库）
- **本地结构**：优化的目录组织

### ✅ 优点
1. **最佳实践**：符合GitHub Pages标准
2. **完全分离**：开发和部署完全独立
3. **性能最优**：两个仓库都很轻量
4. **协作友好**：贡献者只需关注源码仓库
5. **部署灵活**：可以部署到多个平台

### ❌ 缺点
1. **管理复杂**：需要管理两个仓库
2. **成本较高**：需要额外的仓库和配置
3. **同步挑战**：两个仓库的同步需要自动化

---

## 🔧 技术实施细节

### GitHub Actions自动化部署
```yaml
name: Deploy Blog
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
    - name: Install dependencies
      run: npm install
    - name: Generate static files
      run: hexo generate
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./public
```

### 目录结构优化建议
```
# 推荐的.gitignore配置
node_modules/
public/
db.json
*.log
.deploy_git/
.idea/
.vscode/
*.tmp
*.temp
```

## 📊 方案对比表

| 特性 | 分支分离 | 结构分离 | 混合方案 |
|------|----------|----------|----------|
| 实施难度 | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ |
| 维护成本 | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| 标准化程度 | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| 本地开发体验 | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| 部署便利性 | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| 协作友好性 | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 仓库体积控制 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

## 🎯 推荐方案

### 🥇 首选：方案一（GitHub分支分离）
**适合场景**：标准博客项目，希望使用GitHub Pages
**理由**：标准做法，工具支持好，社区方案成熟

### 🥈 备选：方案三（混合方案）
**适合场景**：大型项目，需要多平台部署
**理由**：最灵活，但复杂度较高

### 🥉 保守：方案二（结构分离）
**适合场景**：不想改变太多，渐进式优化
**理由**：改动最小，但不够标准

## 📝 实施计划

### 阶段一：准备工作（1天）
- [ ] 备份当前项目
- [ ] 分析现有文件结构
- [ ] 确定最终方案

### 阶段二：结构调整（2-3天）
- [ ] 实施选定方案
- [ ] 更新配置文件
- [ ] 测试构建流程

### 阶段三：自动化配置（1-2天）
- [ ] 配置GitHub Actions
- [ ] 测试自动部署
- [ ] 优化工作流程

### 阶段四：文档和清理（1天）
- [ ] 更新项目文档
- [ ] 清理无用文件
- [ ] 验证最终效果

## 🔗 相关资源

- [GitHub Pages官方文档](https://docs.github.com/en/pages)
- [Hexo部署文档](https://hexo.io/docs/deployment)
- [GitHub Actions工作流程](https://docs.github.com/en/actions)

## 💬 讨论要点

1. **你更倾向于哪种方案？为什么？**
2. **对于学习成本和维护成本的权衡如何考虑？**
3. **是否需要保持与现有工作流程的兼容性？**
4. **对于自动化部署的需求程度如何？**

---

**优先级**: 中等  
**预估工作量**: 3-5天  
**技术难度**: 中等到高  
**影响范围**: 整个项目结构和工作流程