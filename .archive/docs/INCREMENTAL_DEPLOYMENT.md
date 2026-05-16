# 增量部署配置说明

## 概述

本次更新实现了增量部署功能，保留 gh-pages 分支的完整提交历史，不再使用 force push 覆盖历史记录。

## 更改内容

### 1. 修改现有工作流（deploy.yml）

**文件**: `.github/workflows/deploy.yml`

**更改**:
```yaml
force_orphan: false  # 从 true 改为 false
```

**效果**:
- 保留 gh-pages 分支的提交历史
- 每次部署创建新的提交，而不是覆盖整个分支
- 可以追溯历史部署记录

### 2. 新增增量部署工作流（incremental-deploy.yml）

**文件**: `.github/workflows/incremental-deploy.yml`

**特性**:
- 只监听 `source/` 目录的变化
- 检测到 source 目录有更改才触发部署
- 保留完整的 git 历史
- 支持手动触发

**触发条件**:
```yaml
on:
  push:
    branches: [ main, master, develop ]
    paths:
      - 'source/**'  # 只监听 source 目录
  workflow_dispatch:  # 支持手动触发
```

**工作流程**:
1. 检测 source 目录是否有变化
2. 如果有变化，构建静态文件
3. 增量更新到 gh-pages 分支
4. 保留提交历史

### 3. 修改本地部署脚本（deploy.js）

**文件**: `tools/deploy.js`

**更改**:
- 部署前先拉取 gh-pages 最新更改
- 使用 `git add -A` 而不是 `git add .`
- 不使用 `--force` 推送
- 创建更详细的提交信息

**新的部署流程**:
```javascript
1. 切换到 gh-pages 分支
2. 拉取最新更改（git pull）
3. 清理旧文件
4. 复制新的静态文件
5. 提交更改（保留历史）
6. 推送到远程（不使用 --force）
7. 切回原分支
```

## 使用方法

### 方式 1: 自动部署（推荐）

**触发条件**: 推送到 master 或 main 分支

```bash
# 在 develop 分支开发
git checkout develop
# ... 修改文件 ...
git add .
git commit -m "feat: 新功能"
git push origin develop

# 合并到 master（通过 PR 或直接合并）
git checkout master
git merge develop
git push origin master

# GitHub Actions 自动部署
```

### 方式 2: 增量部署工作流

**触发条件**: source 目录有变化

```bash
# 修改 source 目录下的文件
vim source/_posts/new-post.md
git add source/
git commit -m "feat: 新文章"
git push origin master

# 自动触发增量部署
```

**手动触发**:
1. 访问 GitHub Actions 页面
2. 选择 "Incremental Deploy to GitHub Pages"
3. 点击 "Run workflow"

### 方式 3: 本地部署

```bash
# 使用 npm 脚本
npm run deploy

# 或直接运行脚本
node tools/deploy.js

# 预览模式（不实际部署）
node tools/deploy.js --dry-run
```

## 两个工作流的区别

### deploy.yml（全量部署）

**触发**: 推送到 master/main 分支

**特点**:
- 完整构建所有文件
- 适合大规模更新
- 运行完整的测试和验证

**使用场景**:
- 主题配置更新
- 大量文章更新
- 依赖包更新
- 重大功能发布

### incremental-deploy.yml（增量部署）

**触发**: source 目录有变化

**特点**:
- 只在 source 变化时触发
- 更快的部署速度
- 节省 CI/CD 资源

**使用场景**:
- 发布新文章
- 修改现有文章
- 更新页面内容
- 日常内容更新

## 提交历史对比

### 之前（force push）

```
gh-pages 分支:
commit abc123 (HEAD -> gh-pages)
    deploy: 2024-02-12

# 每次部署都覆盖历史，只有一个提交
```

### 现在（增量更新）

```
gh-pages 分支:
commit def456 (HEAD -> gh-pages)
    deploy: incremental update 2024-02-12 15:30

commit abc123
    deploy: incremental update 2024-02-12 10:00

commit xyz789
    deploy: incremental update 2024-02-11 18:00

# 保留完整的部署历史
```

## 优势

### 1. 历史可追溯

- 可以查看每次部署的具体内容
- 可以回滚到任意历史版本
- 便于问题排查和审计

### 2. 更安全

- 不会意外丢失内容
- 可以对比不同版本的差异
- 支持 git revert 回滚

### 3. 更灵活

- 支持增量更新
- 可以选择性部署
- 减少不必要的构建

### 4. 更高效

- 增量部署更快
- 节省 CI/CD 资源
- 减少网络传输

## 验证部署

### 检查 gh-pages 分支历史

```bash
# 查看提交历史
git log origin/gh-pages --oneline -10

# 查看最近的更改
git log origin/gh-pages -3 --stat

# 对比两次部署的差异
git diff <commit1> <commit2>
```

### 检查部署状态

```bash
# 查看 GitHub Actions 运行状态
# 访问: https://github.com/用户名/仓库名/actions

# 查看 GitHub Pages 部署状态
# 访问: https://github.com/用户名/仓库名/deployments
```

### 验证网站内容

```bash
# 访问网站
curl -I https://用户名.github.io

# 检查特定文件的更新时间
curl -I https://用户名.github.io/2024/02/12/文章标题/
```

## 回滚操作

如果需要回滚到之前的版本：

```bash
# 1. 查看历史提交
git log origin/gh-pages --oneline

# 2. 回滚到指定提交
git checkout gh-pages
git reset --hard <commit-hash>
git push origin gh-pages --force

# 3. 或使用 revert（推荐）
git checkout gh-pages
git revert <commit-hash>
git push origin gh-pages
```

## 故障排除

### 问题 1: 推送被拒绝

**错误**: `! [rejected] gh-pages -> gh-pages (non-fast-forward)`

**原因**: 本地分支落后于远程分支

**解决**:
```bash
git checkout gh-pages
git pull origin gh-pages
# 解决冲突（如果有）
git push origin gh-pages
```

### 问题 2: 部署后网站没更新

**检查清单**:
1. GitHub Pages 设置是否指向 gh-pages 分支
2. gh-pages 分支是否有最新提交
3. 等待 1-5 分钟让 GitHub Pages 生效
4. 清除浏览器缓存

### 问题 3: 提交历史过多

如果 gh-pages 分支提交历史过多，可以定期清理：

```bash
# 创建新的孤立分支
git checkout --orphan gh-pages-new
git add -A
git commit -m "deploy: clean history"

# 删除旧分支
git branch -D gh-pages
git branch -m gh-pages

# 强制推送（谨慎！）
git push origin gh-pages --force
```

## 配置文件对比

### _config.yml

```yaml
# 部署配置（无需修改）
deploy:
  type: git
  repo: git@github.com:用户名/仓库名.git
  branch: gh-pages  # 目标分支
```

### deploy.yml

```yaml
# 关键配置
force_orphan: false  # ✅ 保留历史
keep_files: false    # 不保留旧文件
```

### incremental-deploy.yml

```yaml
# 关键配置
paths:
  - 'source/**'      # ✅ 只监听 source 目录
force_orphan: false  # ✅ 保留历史
```

## 最佳实践

### 1. 日常开发

```bash
# 在 develop 分支开发
git checkout develop
# ... 开发 ...
git commit -m "feat: 新功能"
git push origin develop
```

### 2. 发布内容

```bash
# 合并到 master
git checkout master
git merge develop
git push origin master

# 自动触发部署
```

### 3. 紧急修复

```bash
# 直接在 master 修改
git checkout master
# ... 修复 ...
git commit -m "fix: 紧急修复"
git push origin master

# 或使用本地部署
npm run deploy
```

### 4. 定期维护

```bash
# 每月检查一次 gh-pages 分支大小
git checkout gh-pages
du -sh .git

# 如果过大（>100MB），考虑清理历史
```

## 相关文档

- [GitHub Actions 文档](https://docs.github.com/actions)
- [GitHub Pages 文档](https://docs.github.com/pages)
- [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages)
- [Hexo 部署文档](https://hexo.io/docs/one-command-deployment)

## 总结

**核心改进**:
1. ✅ 保留 gh-pages 分支的完整提交历史
2. ✅ 支持增量部署（只在 source 变化时触发）
3. ✅ 不再使用 force push 覆盖历史
4. ✅ 更安全、可追溯、可回滚

**使用建议**:
- 日常内容更新：自动触发增量部署
- 重大更新：使用全量部署工作流
- 紧急情况：使用本地部署脚本

**注意事项**:
- 定期检查 gh-pages 分支大小
- 必要时清理过多的历史提交
- 保持 GitHub Pages 设置正确

---

**创建日期**: 2024-02-12  
**更新日期**: 2024-02-12  
**状态**: 已实施
