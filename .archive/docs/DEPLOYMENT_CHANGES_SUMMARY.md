# 部署配置更改总结

## 更改概述

将部署方式从"覆盖历史"改为"增量更新，保留历史"。

## 修改的文件

### 1. `.github/workflows/deploy.yml`

**更改**: `force_orphan: true` → `force_orphan: false`

**效果**: 保留 gh-pages 分支的提交历史

### 2. `.github/workflows/incremental-deploy.yml` (新增)

**功能**: 
- 只监听 `source/` 目录变化
- 增量部署，保留历史
- 支持手动触发

### 3. `tools/deploy.js`

**更改**: 
- 部署前先 `git pull` 拉取最新更改
- 不使用 `--force` 推送
- 更详细的提交信息

## 核心改进

| 项目 | 之前 | 现在 |
|------|------|------|
| 提交历史 | ❌ 每次覆盖 | ✅ 完整保留 |
| 部署方式 | Force push | 增量更新 |
| 可回滚性 | ❌ 不可回滚 | ✅ 可回滚 |
| 历史追溯 | ❌ 无法追溯 | ✅ 完整追溯 |

## 使用方法

### 自动部署（推荐）

```bash
git push origin master
# GitHub Actions 自动部署
```

### 增量部署

```bash
# 修改 source 目录
vim source/_posts/new-post.md
git push origin master
# 自动触发增量部署
```

### 本地部署

```bash
npm run deploy
```

## 验证

```bash
# 查看 gh-pages 历史
git log origin/gh-pages --oneline -10

# 应该看到多个提交，而不是只有一个
```

## 优势

1. **安全**: 不会丢失历史记录
2. **可追溯**: 可以查看每次部署的内容
3. **可回滚**: 出问题可以快速回滚
4. **高效**: 增量部署更快

## 注意事项

- GitHub Pages 设置确保指向 `gh-pages` 分支
- 定期检查 gh-pages 分支大小
- 必要时可以清理过多的历史提交

---

**详细文档**: 参见 `docs/INCREMENTAL_DEPLOYMENT.md`
