# 修复 GitHub Pages 部署问题

## 问题描述

1. **CI/CD 更新 gh-pages 但网站不更新**
   - GitHub Actions 成功部署到 `gh-pages` 分支
   - 但网站内容没有更新
   
2. **hexo d 清除 master 分支历史**
   - 使用 `hexo deploy` 后 master 分支的提交记录被清空
   - 源代码丢失

## 根本原因

### 分支配置混乱

当前配置：
- **源代码分支**: `master` 和 `develop`
- **CI/CD 部署目标**: `gh-pages` 分支
- **hexo deploy 目标**: `master` 分支
- **GitHub Pages 源**: `master` 分支（推测）

问题：
- CI/CD 部署到 `gh-pages`，但 Pages 读取 `master`
- hexo deploy 部署到 `master`，覆盖源代码

## 推荐方案：三分支策略

### 分支规划

```
develop (开发分支)
    ↓
  master (主分支/源代码)
    ↓
gh-pages (部署分支/静态文件)
    ↓
GitHub Pages (网站)
```

### 具体配置

#### 1. 修改 Hexo 部署配置

**修改 `_config.yml`**：

```yaml
# Deployment
deploy:
  type: git
  repo: git@github.com:h1s97x/H1S97X.github.io.git
  branch: gh-pages  # 改为 gh-pages
```

**优势**：
- 源代码保留在 master/develop
- 静态文件部署到 gh-pages
- 不会覆盖源代码

#### 2. 修改 GitHub Pages 设置

**在 GitHub 仓库设置中**：

1. 进入仓库 Settings
2. 找到 Pages 部分
3. Source 选择：
   - Branch: `gh-pages`
   - Folder: `/ (root)`
4. 保存

**或者使用 GitHub Actions 自动配置**：

在 `.github/workflows/deploy.yml` 中已经配置了：
```yaml
- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v4
  with:
    publish_branch: gh-pages
```

#### 3. 更新 CI/CD 工作流（可选优化）

**修改 `.github/workflows/deploy.yml`**：

```yaml
- name: Deploy to GitHub Pages
  if: github.event_name == 'push' && (github.ref == 'refs/heads/main' || github.ref == 'refs/heads/master')
  uses: peaceiris/actions-gh-pages@v4
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./public
    publish_branch: gh-pages
    force_orphan: true  # 保持，减小 gh-pages 分支大小
    user_name: 'github-actions[bot]'
    user_email: 'github-actions[bot]@users.noreply.github.com'
    commit_message: 'deploy: ${{ github.event.head_commit.message }}'
    # 添加 CNAME 文件（如果有自定义域名）
    cname: your-domain.com  # 可选
```

## 实施步骤

### Step 1: 备份当前代码

```bash
# 确保所有更改已提交
git add .
git commit -m "chore: backup before deployment fix"
git push origin develop
git push origin master
```

### Step 2: 修改 Hexo 配置

编辑 `_config.yml`：

```yaml
deploy:
  type: git
  repo: git@github.com:h1s97x/H1S97X.github.io.git
  branch: gh-pages  # 修改这里
```

提交更改：

```bash
git add _config.yml
git commit -m "fix: 修改部署分支为 gh-pages，避免覆盖源代码"
git push origin develop
```

### Step 3: 配置 GitHub Pages

1. 访问 `https://github.com/h1s97x/H1S97X.github.io/settings/pages`
2. 在 "Source" 部分：
   - Branch: 选择 `gh-pages`
   - Folder: 选择 `/ (root)`
3. 点击 Save

### Step 4: 清理并重新部署

```bash
# 清理旧的部署文件
npm run clean

# 重新构建
npm run build

# 部署到 gh-pages
hexo deploy
# 或
npm run deploy
```

### Step 5: 验证部署

1. 检查 gh-pages 分支：
   ```bash
   git fetch origin
   git log origin/gh-pages -5
   ```

2. 等待 1-2 分钟，访问网站：
   ```
   https://h1s97x.github.io
   ```

3. 检查 GitHub Actions：
   - 访问 Actions 标签页
   - 查看最新的工作流运行状态

## 验证清单

- [ ] `_config.yml` 中 deploy.branch 改为 `gh-pages`
- [ ] GitHub Pages 设置源为 `gh-pages` 分支
- [ ] master 分支包含源代码
- [ ] gh-pages 分支包含静态文件
- [ ] 网站可以正常访问
- [ ] CI/CD 工作流正常运行

## 分支管理最佳实践

### 日常开发流程

```bash
# 1. 在 develop 分支开发
git checkout develop
# ... 进行开发 ...
git add .
git commit -m "feat: 新功能"
git push origin develop

# 2. 合并到 master（通过 PR）
# 在 GitHub 上创建 PR: develop → master

# 3. 自动部署（CI/CD）
# master 分支更新后，GitHub Actions 自动部署到 gh-pages

# 4. 或手动部署
git checkout master
git pull origin master
npm run clean
npm run build
hexo deploy
```

### 分支保护规则

建议在 GitHub 设置中配置：

1. **master 分支保护**：
   - 要求 PR 审查
   - 要求状态检查通过
   - 禁止强制推送

2. **gh-pages 分支**：
   - 允许强制推送（部署需要）
   - 不需要保护规则

## 常见问题

### Q1: 为什么 hexo deploy 会清空历史？

A: `hexo-deployer-git` 默认使用 `force push`，会覆盖目标分支的所有历史。这是为了保持部署分支干净，只包含最新的静态文件。

**解决方案**：将部署目标改为 `gh-pages`，不要部署到源代码分支。

### Q2: CI/CD 和 hexo deploy 有什么区别？

A: 
- **CI/CD**: 自动化，每次推送到 master 自动部署
- **hexo deploy**: 手动，本地构建后手动部署

**推荐**：
- 日常使用 CI/CD 自动部署
- 紧急修复时使用 hexo deploy 快速部署

### Q3: 如何恢复被覆盖的 master 分支？

A: 如果 master 分支被 hexo deploy 覆盖：

```bash
# 1. 查看 reflog 找到覆盖前的提交
git reflog

# 2. 恢复到覆盖前的状态
git reset --hard <commit-hash>

# 3. 强制推送（谨慎！）
git push origin master --force
```

**预防措施**：
- 定期备份重要分支
- 使用分支保护规则
- 不要将 hexo deploy 目标设为源代码分支

### Q4: 网站更新需要多久？

A: 
- **gh-pages 分支更新**: 立即
- **GitHub Pages 网站更新**: 1-5 分钟
- **CDN 缓存更新**: 可能需要 10-30 分钟

如果超过 10 分钟还没更新：
1. 检查 GitHub Pages 设置
2. 清除浏览器缓存
3. 使用无痕模式访问

### Q5: 如何同时保留多个部署分支？

A: 可以配置多个部署目标：

```yaml
deploy:
  - type: git
    repo: git@github.com:h1s97x/H1S97X.github.io.git
    branch: gh-pages
  - type: git
    repo: git@github.com:h1s97x/backup.git
    branch: master
```

## 推荐的完整工作流

### 方案 A: 纯 CI/CD（推荐）

```bash
# 开发
git checkout develop
# ... 开发 ...
git commit -m "feat: 新功能"
git push origin develop

# 发布
# 1. 创建 PR: develop → master
# 2. 合并 PR
# 3. GitHub Actions 自动部署到 gh-pages
# 4. 网站自动更新
```

**优势**：
- 完全自动化
- 有 PR 审查流程
- 有 CI 测试保障

### 方案 B: 混合模式

```bash
# 日常开发：使用 CI/CD
git push origin master
# → GitHub Actions 自动部署

# 紧急修复：使用 hexo deploy
npm run clean
npm run build
hexo deploy
# → 立即部署到 gh-pages
```

**优势**：
- 灵活性高
- 紧急情况可快速部署

## 相关文档

- [GitHub Pages 文档](https://docs.github.com/pages)
- [Hexo 部署文档](https://hexo.io/docs/one-command-deployment)
- [hexo-deployer-git](https://github.com/hexojs/hexo-deployer-git)

## 总结

**核心原则**：
1. **源代码** → master/develop 分支
2. **静态文件** → gh-pages 分支
3. **GitHub Pages** → 读取 gh-pages 分支

**关键配置**：
- `_config.yml`: `deploy.branch: gh-pages`
- GitHub Pages: Source = `gh-pages` 分支
- 分支保护: 保护 master，不保护 gh-pages

按照这个方案配置后：
- ✅ 源代码安全保存在 master
- ✅ CI/CD 和 hexo deploy 都部署到 gh-pages
- ✅ 网站正常更新
- ✅ 不会丢失提交历史
