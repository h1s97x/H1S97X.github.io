# 快速修复部署问题

## 当前状态

✅ **好消息**：你的 `_config.yml` 已经配置正确！

```yaml
deploy:
  branch: gh-pages  # ✅ 正确
```

## 问题根源

**GitHub Pages 设置可能配置错误**

你的 CI/CD 部署到 `gh-pages`，但 GitHub Pages 可能配置读取的是 `master` 分支。

## 立即修复（2 分钟）

### Step 1: 检查 GitHub Pages 设置

1. 访问：`https://github.com/h1s97x/H1S97X.github.io/settings/pages`

2. 查看 "Source" 部分，应该是：
   ```
   Branch: gh-pages
   Folder: / (root)
   ```

3. 如果不是，修改为：
   - Branch: 选择 `gh-pages`
   - Folder: 选择 `/ (root)`
   - 点击 **Save**

### Step 2: 等待生效

- GitHub Pages 更新需要 1-5 分钟
- 清除浏览器缓存或使用无痕模式访问

### Step 3: 验证

访问你的网站：`https://h1s97x.github.io`

## 为什么 hexo d 有效而 CI/CD 无效？

### hexo d 的行为

```bash
hexo deploy
```

1. 构建静态文件到 `public/`
2. 推送到 `gh-pages` 分支（根据 _config.yml）
3. **如果 GitHub Pages 设置是 gh-pages**：网站更新 ✅
4. **如果 GitHub Pages 设置是 master**：网站不更新 ❌

### CI/CD 的行为

```yaml
# .github/workflows/deploy.yml
publish_branch: gh-pages
```

1. 构建静态文件
2. 推送到 `gh-pages` 分支
3. **如果 GitHub Pages 设置是 gh-pages**：网站更新 ✅
4. **如果 GitHub Pages 设置是 master**：网站不更新 ❌

### 结论

**两者行为一致**，问题在于 GitHub Pages 的设置！

## 检查清单

```bash
# 1. 检查 gh-pages 分支是否有最新内容
git fetch origin
git log origin/gh-pages -3

# 2. 检查 gh-pages 分支的文件
git checkout gh-pages
ls -la
# 应该看到 index.html, css/, js/ 等静态文件

# 3. 返回开发分支
git checkout develop
```

## 如果还是不行

### 方案 A: 强制重新部署

```bash
# 清理并重新部署
npm run clean
npm run build
hexo deploy --force

# 或使用 CI/CD
git commit --allow-empty -m "chore: trigger deployment"
git push origin master
```

### 方案 B: 检查 CNAME 文件

如果你使用自定义域名：

```bash
# 检查 source/CNAME 文件
cat source/CNAME

# 应该包含你的域名，例如：
# yourdomain.com
```

### 方案 C: 检查 GitHub Actions 日志

1. 访问：`https://github.com/h1s97x/H1S97X.github.io/actions`
2. 查看最新的工作流运行
3. 检查是否有错误

## 常见错误

### 错误 1: 404 Not Found

**原因**：GitHub Pages 设置的分支没有 `index.html`

**解决**：
1. 确认 gh-pages 分支有 index.html
2. 确认 GitHub Pages 设置指向 gh-pages

### 错误 2: 显示旧内容

**原因**：浏览器缓存或 CDN 缓存

**解决**：
```bash
# 清除浏览器缓存
Ctrl + Shift + Delete

# 或使用无痕模式
Ctrl + Shift + N (Chrome)
Ctrl + Shift + P (Firefox)
```

### 错误 3: CSS/JS 加载失败

**原因**：URL 配置错误

**解决**：检查 `_config.yml`：
```yaml
url: https://h1s97x.github.io  # 确保正确
root: /  # 确保是 /
```

## 推荐的部署流程

### 日常开发（使用 CI/CD）

```bash
# 1. 开发
git checkout develop
# ... 修改文件 ...

# 2. 提交
git add .
git commit -m "feat: 新功能"
git push origin develop

# 3. 合并到 master（通过 PR）
# 在 GitHub 创建 PR: develop → master

# 4. 自动部署
# master 更新后，GitHub Actions 自动部署
```

### 紧急修复（使用 hexo d）

```bash
# 1. 快速修改
git checkout master
# ... 修改文件 ...

# 2. 构建并部署
npm run clean
npm run build
hexo deploy

# 3. 提交源代码
git add .
git commit -m "fix: 紧急修复"
git push origin master
```

## 验证部署成功

### 检查 gh-pages 分支

```bash
git fetch origin
git log origin/gh-pages -1 --oneline
# 应该看到最新的部署提交
```

### 检查网站内容

```bash
# 访问网站
curl -I https://h1s97x.github.io
# 应该返回 200 OK

# 检查特定文件
curl https://h1s97x.github.io/index.html | head -20
```

### 检查 GitHub Pages 状态

访问：`https://github.com/h1s97x/H1S97X.github.io/deployments`

应该看到最新的部署记录。

## 总结

**核心问题**：GitHub Pages 设置的源分支不正确

**解决方案**：
1. ✅ 确认 `_config.yml` 的 `deploy.branch` 是 `gh-pages`（已正确）
2. ⚠️ 修改 GitHub Pages 设置为 `gh-pages` 分支
3. ✅ 等待 1-5 分钟生效

**验证**：
- gh-pages 分支有最新内容
- GitHub Pages 设置指向 gh-pages
- 网站显示最新内容

## 需要帮助？

如果按照以上步骤还是不行，请提供：
1. GitHub Pages 设置截图
2. GitHub Actions 最新运行日志
3. `git log origin/gh-pages -3` 的输出
4. 网站访问的错误信息

---

**创建日期**: 2025-02-11  
**状态**: 待验证
