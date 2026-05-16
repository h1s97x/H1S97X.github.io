# Git 提交信息

## 提交标题

```
feat: 实现增量部署，保留 gh-pages 提交历史
```

## 提交详情

```
feat: 实现增量部署，保留 gh-pages 提交历史

## 更改内容

### 1. 修改现有部署工作流
- 文件: .github/workflows/deploy.yml
- 更改: force_orphan: true → false
- 效果: 保留 gh-pages 分支的完整提交历史

### 2. 新增增量部署工作流
- 文件: .github/workflows/incremental-deploy.yml
- 功能: 只监听 source/ 目录变化，增量部署
- 特性: 保留历史、支持手动触发

### 3. 优化本地部署脚本
- 文件: tools/deploy.js
- 更改: 部署前拉取最新更改，不使用 force push
- 效果: 增量更新，保留完整 git 历史

## 核心改进

- ✅ 保留 gh-pages 分支的完整提交历史
- ✅ 支持增量部署（只在 source 变化时触发）
- ✅ 不再使用 force push 覆盖历史
- ✅ 更安全、可追溯、可回滚

## 使用方法

### 自动部署
git push origin master  # 自动触发部署

### 增量部署
修改 source/ 目录后推送，自动触发增量部署

### 本地部署
npm run deploy  # 保留历史的本地部署

## 文档

- docs/INCREMENTAL_DEPLOYMENT.md - 详细配置说明
- docs/DEPLOYMENT_CHANGES_SUMMARY.md - 更改总结

## 影响范围

- CI/CD 工作流
- 本地部署脚本
- gh-pages 分支管理

## 测试

- [x] 修改 deploy.yml 配置
- [x] 创建 incremental-deploy.yml
- [x] 更新 deploy.js 脚本
- [x] 编写完整文档

## 相关 Issue

解决了 gh-pages 分支提交历史被覆盖的问题
```

## 执行提交

```bash
# 添加所有更改
git add .github/workflows/deploy.yml
git add .github/workflows/incremental-deploy.yml
git add tools/deploy.js
git add docs/INCREMENTAL_DEPLOYMENT.md
git add docs/DEPLOYMENT_CHANGES_SUMMARY.md
git add docs/COMMIT_DEPLOYMENT_CHANGES.md

# 提交
git commit -F docs/COMMIT_DEPLOYMENT_CHANGES.md

# 推送
git push origin develop
```

## 或使用简短版本

```bash
git add .
git commit -m "feat: 实现增量部署，保留 gh-pages 提交历史

- 修改 deploy.yml: force_orphan false，保留历史
- 新增 incremental-deploy.yml: 监听 source 目录变化
- 优化 deploy.js: 增量更新，不使用 force push
- 添加详细文档说明

详见: docs/INCREMENTAL_DEPLOYMENT.md"

git push origin develop
```
