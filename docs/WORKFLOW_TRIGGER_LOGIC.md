# 工作流触发逻辑说明

## 问题

如果两个工作流都监听 push 事件，更新文章时会同时触发两个 Action，造成：
- 资源浪费
- 可能的部署冲突
- 重复构建

## 解决方案

使用 `paths` 和 `paths-ignore` 让两个工作流互斥。

## 工作流分工

### deploy.yml（全量部署）

**触发条件**:
```yaml
on:
  push:
    branches: [ main, master, develop ]
    paths-ignore:
      - 'source/**'  # 忽略 source 目录
```

**负责处理**:
- ✅ 配置文件更改（`_config.yml`, `_config_stellar.yml`）
- ✅ 主题更新（`themes/`）
- ✅ 依赖更新（`package.json`, `package-lock.json`）
- ✅ 工作流更新（`.github/workflows/`）
- ✅ 脚本更新（`tools/`, `scripts/`）
- ✅ 其他非内容文件

**不处理**:
- ❌ source 目录的更改

### incremental-deploy.yml（增量部署）

**触发条件**:
```yaml
on:
  push:
    branches: [ main, master ]  # 只在主分支
    paths:
      - 'source/**'  # 只监听 source 目录
```

**负责处理**:
- ✅ 文章更新（`source/_posts/`）
- ✅ 页面更新（`source/about/`, `source/contact/`）
- ✅ 资源文件（`source/images/`, `source/assets/`）
- ✅ 所有 source 目录下的内容

**不处理**:
- ❌ source 目录外的更改

## 触发场景分析

### 场景 1: 只更新文章

```bash
vim source/_posts/new-article.md
git add source/_posts/new-article.md
git commit -m "feat: 新文章"
git push origin master
```

**触发**: ✅ `incremental-deploy.yml`  
**不触发**: ❌ `deploy.yml` (被 paths-ignore 排除)

### 场景 2: 只更新配置

```bash
vim _config.yml
git add _config.yml
git commit -m "chore: 更新配置"
git push origin master
```

**触发**: ✅ `deploy.yml`  
**不触发**: ❌ `incremental-deploy.yml` (不在 source 目录)

### 场景 3: 同时更新文章和配置

```bash
vim source/_posts/new-article.md
vim _config.yml
git add .
git commit -m "feat: 新文章 + 配置更新"
git push origin master
```

**触发**: ✅ 两个工作流都会触发  
**原因**: 同时修改了 source 和非 source 文件  
**结果**: 
- `incremental-deploy.yml` 处理 source 的更改
- `deploy.yml` 处理配置的更改
- 两者都会部署到 gh-pages，但不会冲突（都是增量更新）

### 场景 4: 更新主题

```bash
git submodule update --remote themes/stellar
git add themes/stellar
git commit -m "chore: 更新主题"
git push origin master
```

**触发**: ✅ `deploy.yml`  
**不触发**: ❌ `incremental-deploy.yml`

### 场景 5: 在 develop 分支开发

```bash
git checkout develop
vim source/_posts/draft.md
git add source/_posts/draft.md
git commit -m "draft: 草稿"
git push origin develop
```

**触发**: ✅ `deploy.yml` (develop 分支)  
**不触发**: ❌ `incremental-deploy.yml` (只监听 main/master)

### 场景 6: 手动触发

在 GitHub Actions 页面手动触发任一工作流。

**触发**: ✅ 选择的工作流  
**不触发**: ❌ 另一个工作流

## 工作流对比

| 特性 | deploy.yml | incremental-deploy.yml |
|------|-----------|----------------------|
| 触发分支 | main, master, develop | main, master |
| 监听路径 | 除 source 外的所有 | 只有 source |
| 部署速度 | 较慢（全量） | 较快（增量） |
| 适用场景 | 配置、主题、依赖更新 | 内容更新 |
| 手动触发 | ✅ 支持 | ✅ 支持 |

## 优势

### 1. 避免重复部署

- 更新文章时只触发增量部署
- 更新配置时只触发全量部署
- 节省 CI/CD 资源

### 2. 更快的部署

- 文章更新使用增量部署，更快
- 配置更新使用全量部署，更完整

### 3. 清晰的职责分工

- 每个工作流有明确的职责
- 易于维护和调试

### 4. 灵活性

- 可以手动触发任一工作流
- develop 分支也会触发全量部署（用于测试）

## 特殊情况处理

### 情况 1: 同时修改多个目录

如果一次提交同时修改了 source 和配置文件：

```bash
git add source/_posts/article.md _config.yml
git commit -m "feat: 文章 + 配置"
git push origin master
```

**结果**: 两个工作流都会触发

**是否有问题**: ❌ 没有问题
- 两者都使用 `force_orphan: false`
- 都是增量更新，不会冲突
- 最后一个完成的会包含所有更改

**建议**: 尽量分开提交
```bash
# 先提交配置
git add _config.yml
git commit -m "chore: 更新配置"
git push origin master

# 等待部署完成后，再提交文章
git add source/_posts/article.md
git commit -m "feat: 新文章"
git push origin master
```

### 情况 2: 需要强制全量部署

如果需要强制全量部署（包括 source）：

**方法 1**: 手动触发 deploy.yml
1. 访问 GitHub Actions
2. 选择 "Deploy Stellar Blog to GitHub Pages"
3. 点击 "Run workflow"

**方法 2**: 临时禁用 incremental-deploy.yml
```bash
# 重命名工作流文件
mv .github/workflows/incremental-deploy.yml .github/workflows/incremental-deploy.yml.disabled
git add .
git commit -m "chore: 临时禁用增量部署"
git push origin master

# 部署完成后恢复
mv .github/workflows/incremental-deploy.yml.disabled .github/workflows/incremental-deploy.yml
git add .
git commit -m "chore: 恢复增量部署"
git push origin master
```

**方法 3**: 使用本地部署
```bash
npm run deploy
```

### 情况 3: 只想测试不部署

使用 PR 而不是直接 push：

```bash
git checkout -b feature/test
# ... 修改文件 ...
git push origin feature/test
# 创建 PR，但不合并
```

PR 只会触发构建和测试，不会部署到 gh-pages。

## 监控和调试

### 查看触发的工作流

```bash
# 访问 GitHub Actions 页面
https://github.com/用户名/仓库名/actions

# 查看最近的运行
# 可以看到哪个工作流被触发了
```

### 查看工作流日志

1. 点击具体的工作流运行
2. 查看每个步骤的日志
3. 确认是否按预期执行

### 测试触发条件

```bash
# 测试 incremental-deploy
echo "test" >> source/_posts/test.md
git add source/_posts/test.md
git commit -m "test: 测试增量部署"
git push origin master
# 应该只触发 incremental-deploy.yml

# 测试 deploy
echo "test" >> _config.yml
git add _config.yml
git commit -m "test: 测试全量部署"
git push origin master
# 应该只触发 deploy.yml
```

## 最佳实践

### 1. 内容更新

```bash
# 只修改 source 目录
git add source/
git commit -m "feat: 新文章"
git push origin master
# ✅ 触发增量部署，快速
```

### 2. 配置更新

```bash
# 只修改配置文件
git add _config.yml _config_stellar.yml
git commit -m "chore: 更新配置"
git push origin master
# ✅ 触发全量部署，完整
```

### 3. 主题更新

```bash
# 更新主题子模块
git submodule update --remote
git add themes/
git commit -m "chore: 更新主题"
git push origin master
# ✅ 触发全量部署
```

### 4. 批量更新

```bash
# 分开提交
git add source/
git commit -m "feat: 批量更新文章"
git push origin master
# 等待部署完成

git add _config.yml
git commit -m "chore: 更新配置"
git push origin master
# ✅ 避免同时触发两个工作流
```

### 5. 开发测试

```bash
# 在 develop 分支测试
git checkout develop
# ... 修改 ...
git push origin develop
# ✅ 触发 deploy.yml，可以测试完整构建
# ❌ 不触发 incremental-deploy.yml
```

## 配置文件

### deploy.yml 关键配置

```yaml
on:
  push:
    branches: [ main, master, develop ]
    paths-ignore:
      - 'source/**'  # 关键：忽略 source
  pull_request:
    branches: [ main, master, develop ]
  workflow_dispatch:
```

### incremental-deploy.yml 关键配置

```yaml
on:
  push:
    branches: [ main, master ]  # 关键：只在主分支
    paths:
      - 'source/**'  # 关键：只监听 source
  workflow_dispatch:
```

## 故障排除

### 问题 1: 更新文章但没有触发部署

**检查**:
1. 是否在 main/master 分支？
2. 是否修改了 source 目录？
3. 是否正确推送到远程？

```bash
git branch  # 检查当前分支
git log origin/master -1  # 检查远程是否有最新提交
```

### 问题 2: 两个工作流都触发了

**原因**: 同时修改了 source 和非 source 文件

**解决**: 分开提交，或者接受两个都触发（不会冲突）

### 问题 3: 工作流没有触发

**检查**:
1. 工作流文件是否正确？
2. 是否有语法错误？
3. 是否被禁用？

```bash
# 验证工作流语法
npm run workflows:check

# 查看 GitHub Actions 设置
# Settings > Actions > General
```

## 总结

**核心原则**:
- `deploy.yml`: 处理配置、主题、依赖等（排除 source）
- `incremental-deploy.yml`: 只处理 source 目录内容

**优势**:
- ✅ 避免重复部署
- ✅ 更快的内容更新
- ✅ 清晰的职责分工
- ✅ 节省 CI/CD 资源

**注意**:
- 同时修改多个目录会触发两个工作流（但不会冲突）
- 建议分开提交不同类型的更改
- 都使用增量更新，保留历史

---

**创建日期**: 2024-02-12  
**更新日期**: 2024-02-12  
**状态**: 已优化
