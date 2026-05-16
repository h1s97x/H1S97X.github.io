# Git 提交信息 - 修复配置文件命名

## 提交标题

```
fix: 修复 Stellar 配置文件命名，添加 notebook 索引页面
```

## 提交详情

```
fix: 修复 Stellar 配置文件命名，添加 notebook 索引页面

## 主要更改

### 1. 修复配置文件命名
- 更新 tools/validate-stellar-theme.js 中的配置文件路径
- 从 _config_stellar.yml 改为 _config.stellar.yml
- 符合 Hexo 官方命名约定

### 2. 添加 notebook 索引页面
- 创建 source/coding/index.md
- 创建 source/notes/index.md
- 修复访问 /coding/ 和 /notes/ 时的 404 问题

### 3. 修复 ESLint 问题
- 添加 Hexo scripts 的全局变量配置
- 修复 scripts/filters/md_path_to_permalink.js 的分号问题
- 修复 tools/deploy.js 的错误处理
- 排除 source/assets 目录的 lint 检查

### 4. 优化工作流触发逻辑
- deploy.yml: 排除 source 目录，避免重复触发
- incremental-deploy.yml: 只监听 source 目录
- 两个工作流互斥，避免冲突

## 影响范围

- CI/CD 验证步骤
- 本地开发验证
- Notebook 路由访问
- 代码质量检查

## 测试

- [x] npm run stellar:validate 通过
- [x] npm run lint 通过
- [x] npm run build 成功
- [x] 本地访问 /coding/ 和 /notes/ 正常

## 相关文档

- docs/FIX_CONFIG_FILENAME.md - 配置文件命名修复说明
- docs/FIX_404_NOTEBOOK_ROUTES.md - Notebook 404 问题修复
- docs/WORKFLOW_TRIGGER_LOGIC.md - 工作流触发逻辑说明

## 文件变更

### 修改的文件
- tools/validate-stellar-theme.js
- eslint.config.js
- scripts/filters/md_path_to_permalink.js
- tools/deploy.js
- .github/workflows/deploy.yml
- .github/workflows/incremental-deploy.yml

### 新增的文件
- source/coding/index.md
- source/notes/index.md
- docs/FIX_CONFIG_FILENAME.md
- docs/FIX_404_NOTEBOOK_ROUTES.md
- docs/WORKFLOW_TRIGGER_LOGIC.md
- docs/COMMIT_CONFIG_FIX.md
```

## 执行提交

```bash
# 添加所有更改
git add .

# 提交
git commit -F docs/COMMIT_CONFIG_FIX.md

# 推送
git push origin master
```

## 或使用简短版本

```bash
git add .
git commit -m "fix: 修复 Stellar 配置文件命名，添加 notebook 索引页面

- 更新验证脚本配置文件路径为 _config.stellar.yml
- 创建 coding 和 notes 索引页面，修复 404
- 修复 ESLint 配置和代码问题
- 优化工作流触发逻辑，避免重复部署

详见: docs/FIX_CONFIG_FILENAME.md, docs/FIX_404_NOTEBOOK_ROUTES.md"

git push origin master
```
