---
name: 开发内容与部署内容分离方案 v2.0
about: 重新设计安全的源码与部署分离策略
title: '[FEATURE] 开发内容与部署内容分离 - 安全重构版'
labels: ['enhancement', 'infrastructure', 'safety']
assignees: ''
---

## 📋 问题描述

当前项目将源码文件和Hexo生成的静态文件混合在同一个仓库中，需要将开发内容与部署内容进行分离，以提高项目管理效率和部署安全性。

**注意：本次重构将采用完全安全的方式，绝不使用任何删除命令！**

## 🎯 目标

- [x] 分离源码和生成文件
- [x] 保持Git历史完整性
- [x] 简化部署流程
- [x] 提高项目可维护性
- [x] 确保数据安全，零删除操作

## 🔄 方案对比

### 方案一：双分支策略（推荐）
**优点：**
- ✅ 保持单一仓库，管理简单
- ✅ 源码和部署完全分离
- ✅ 支持自动化部署
- ✅ Git历史清晰
- ✅ 安全性高，无删除风险

**缺点：**
- ⚠️ 需要理解分支概念
- ⚠️ 初次设置稍复杂

**实现方式：**
- `master` 分支：存储源码（source/, _config.yml, package.json等）
- `gh-pages` 分支：存储生成的静态文件
- GitHub Actions自动化部署

### 方案二：双仓库策略
**优点：**
- ✅ 完全物理分离
- ✅ 权限控制更精细
- ✅ 源码仓库更干净

**缺点：**
- ❌ 需要管理两个仓库
- ❌ 部署配置更复杂
- ❌ 协作成本增加

### 方案三：目录结构分离
**优点：**
- ✅ 实现简单
- ✅ 单仓库管理

**缺点：**
- ❌ 仍然混合存储
- ❌ 仓库体积大
- ❌ 部署时需要过滤

## 🚀 推荐实施方案：安全双分支策略

### 阶段一：准备工作
1. **备份当前状态**
   ```bash
   git tag backup-$(date +%Y%m%d-%H%M%S)
   git push origin --tags
   ```

2. **清理生成文件**（使用.gitignore，不删除）
   - 更新.gitignore忽略public/目录
   - 使用git rm --cached移除跟踪（保留文件）

3. **优化源码结构**
   - 确保所有源文件在正确位置
   - 验证配置文件完整性

### 阶段二：分支设置
1. **创建部署分支**
   ```bash
   git checkout --orphan gh-pages
   git rm -rf . --cached  # 只移除Git跟踪，不删除文件
   ```

2. **配置GitHub Pages**
   - 设置gh-pages为部署分支
   - 配置自定义域名（如需要）

### 阶段三：自动化部署
1. **GitHub Actions工作流**
   - 监听master分支推送
   - 自动构建并部署到gh-pages
   - 支持构建状态通知

2. **本地开发流程**
   - 在master分支进行开发
   - 推送后自动触发部署
   - 无需手动管理生成文件

## 📁 最终目录结构

### master分支（源码）
```
├── source/           # 文章源文件
├── themes/          # 主题文件
├── _config.yml      # 主配置
├── _config.stellar.yml  # 主题配置
├── package.json     # 依赖配置
├── tools/           # 开发工具
├── .github/         # GitHub配置
└── docs/           # 文档
```

### gh-pages分支（部署）
```
├── index.html      # 生成的首页
├── archives/       # 归档页面
├── categories/     # 分类页面
├── tags/          # 标签页面
├── css/           # 样式文件
├── js/            # 脚本文件
└── ...            # 其他生成文件
```

## 🔧 实施工具

### 1. 分支管理脚本
```javascript
// tools/setup-branches.js
// 安全的分支设置脚本，无删除操作
```

### 2. 部署脚本
```javascript
// tools/deploy-safe.js  
// 安全的部署脚本，只添加不删除
```

### 3. GitHub Actions工作流
```yaml
# .github/workflows/deploy.yml
# 自动化部署配置
```

## ✅ 验收标准

- [ ] master分支只包含源码文件
- [ ] gh-pages分支只包含生成文件
- [ ] GitHub Actions部署正常工作
- [ ] 网站访问正常
- [ ] 所有历史数据完整保留
- [ ] 零数据丢失，零删除操作

## 🛡️ 安全保障

1. **多重备份**
   - Git标签备份
   - 远程仓库备份
   - 本地文件备份

2. **渐进式实施**
   - 分阶段执行
   - 每步验证
   - 可随时回滚

3. **零删除原则**
   - 绝不使用rm命令
   - 只使用git操作
   - 保留所有历史

## 📝 注意事项

- ⚠️ 实施前必须完整备份
- ⚠️ 分步骤执行，每步验证
- ⚠️ 遇到问题立即停止
- ⚠️ 保持与用户的实时沟通

## 🔗 相关资源

- [GitHub Pages文档](https://docs.github.com/en/pages)
- [GitHub Actions文档](https://docs.github.com/en/actions)
- [Hexo部署文档](https://hexo.io/docs/one-command-deployment)

---

**创建时间：** 2025-12-28
**优先级：** 高
**预估工时：** 2-3小时
**风险等级：** 低（采用安全策略）