# 快速部署指南

## 三种部署方式

### 1️⃣ 自动部署（推荐）

```bash
git push origin master
```

✅ 自动触发  
✅ 完整构建  
✅ 保留历史

### 2️⃣ 增量部署

```bash
# 修改 source 目录
vim source/_posts/new-post.md
git add source/
git commit -m "feat: 新文章"
git push origin master
```

✅ 只在 source 变化时触发  
✅ 更快的部署  
✅ 保留历史

### 3️⃣ 本地部署

```bash
npm run deploy
```

✅ 立即部署  
✅ 本地控制  
✅ 保留历史

## 核心改进

| 特性 | 之前 | 现在 |
|------|------|------|
| 提交历史 | ❌ 覆盖 | ✅ 保留 |
| 可回滚 | ❌ 否 | ✅ 是 |
| 可追溯 | ❌ 否 | ✅ 是 |

## 验证部署

```bash
# 查看历史
git log origin/gh-pages --oneline -5

# 检查网站
curl -I https://h1s97x.github.io
```

## 常用命令

```bash
# 查看部署状态
git log origin/gh-pages -3

# 手动触发增量部署
# GitHub → Actions → Incremental Deploy → Run workflow

# 预览部署（不实际执行）
node tools/deploy.js --dry-run

# 回滚到上一个版本
git checkout gh-pages
git revert HEAD
git push origin gh-pages
```

## 故障排除

### 网站没更新？

1. 检查 GitHub Pages 设置 → 确保指向 `gh-pages`
2. 等待 1-5 分钟
3. 清除浏览器缓存

### 推送被拒绝？

```bash
git checkout gh-pages
git pull origin gh-pages
git push origin gh-pages
```

## 详细文档

📖 完整说明: `docs/INCREMENTAL_DEPLOYMENT.md`  
📋 更改总结: `docs/DEPLOYMENT_CHANGES_SUMMARY.md`

---

**提示**: 所有部署方式现在都保留完整的提交历史！
