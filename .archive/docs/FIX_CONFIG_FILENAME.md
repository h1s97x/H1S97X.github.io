# 修复配置文件命名问题

## 问题描述

Stellar 主题配置文件命名不一致：

- 旧文件名：`_config_stellar.yml` (使用下划线)
- 新文件名：`_config.stellar.yml` (使用点号)

Hexo 的标准命名约定是使用点号（如 `_config.theme.yml`），所以需要统一改为 `_config.stellar.yml`。

## 修改内容

### 1. 更新验证脚本

**文件**: `tools/validate-stellar-theme.js`

**更改**:

```javascript
// 旧代码
const configPath = "_config_stellar.yml";

// 新代码
const configPath = "_config.stellar.yml";
```

### 2. 文件重命名

```bash
# 如果还没有重命名，执行：
mv _config_stellar.yml _config.stellar.yml
```

## Hexo 配置文件命名约定

### 标准命名格式

```
_config.yml              # 主配置文件
_config.theme.yml        # 主题配置（通用格式）
_config.stellar.yml      # Stellar 主题配置
_config.anzhiyu.yml      # AnZhiYu 主题配置
_config.staging.yml      # 环境配置
```

### 为什么使用点号？

1. **Hexo 官方约定**: Hexo 文档推荐使用 `_config.theme.yml` 格式
2. **更清晰的层级**: 点号表示"配置的子类型"
3. **与其他配置一致**: 如 `_config.staging.yml`
4. **避免混淆**: 下划线通常用于单词分隔，点号用于层级分隔

## 验证修复

### 测试验证脚本

```bash
npm run stellar:validate
```

**预期输出**:

```
🔍 开始验证Stellar主题配置...
✅ 主题设置正确: stellar
✅ Stellar版本: 1.33.1
🎉 Stellar主题配置验证通过!
```

### 测试构建

```bash
npm run clean
npm run build
```

**预期**: 构建成功，没有配置文件找不到的错误

### 测试部署

```bash
npm run deploy
```

**预期**: 部署成功

## CI/CD 影响

### GitHub Actions 工作流

两个工作流都会调用 `npm run stellar:validate`：

1. `.github/workflows/deploy.yml`
2. `.github/workflows/incremental-deploy.yml`

**修复后**: 验证步骤可以正常通过

### 验证步骤

```yaml
- name: Validate Stellar theme configuration
  run: npm run stellar:validate
```

## 相关文件

### 需要更新的文件

- [x] `tools/validate-stellar-theme.js` - 验证脚本
- [x] `_config_stellar.yml` → `_config.stellar.yml` - 重命名配置文件

### 不需要更新的文件

以下文件中的引用是文档说明，不影响功能：

- `docs/*.md` - 文档文件
- `.qoder/repowiki/**/*.md` - Wiki 文档

## 其他主题配置

如果你有其他主题，也应该使用相同的命名约定：

```bash
# 正确的命名
_config.butterfly.yml
_config.next.yml
_config.fluid.yml

# 不推荐的命名
_config_butterfly.yml
_config_next.yml
_config_fluid.yml
```

## 迁移指南

如果你有旧的配置文件，按以下步骤迁移：

### 1. 备份旧配置

```bash
cp _config_stellar.yml _config_stellar_back.yml
```

### 2. 重命名文件

```bash
mv _config_stellar.yml _config.stellar.yml
```

### 3. 更新 Git

```bash
git add _config.stellar.yml
git rm _config_stellar.yml
git commit -m "refactor: 重命名配置文件为 Hexo 标准格式"
```

### 4. 验证

```bash
npm run stellar:validate
npm run build
```

### 5. 清理备份

```bash
# 确认一切正常后
rm _config_stellar_back.yml
```

## 故障排除

### 问题 1: 验证失败

**错误**: `Stellar主题配置文件 _config.stellar.yml 不存在`

**解决**:

```bash
# 检查文件是否存在
ls -la _config*.yml

# 如果文件名不对，重命名
mv _config_stellar.yml _config.stellar.yml
```

### 问题 2: 构建失败

**错误**: `Cannot find module '_config_stellar.yml'`

**解决**:

1. 检查是否有脚本硬编码了旧文件名
2. 搜索所有引用：`grep -r "_config_stellar" .`
3. 更新所有引用为 `_config.stellar`

### 问题 3: CI/CD 失败

**错误**: GitHub Actions 验证步骤失败

**解决**:

1. 确保 `_config.stellar.yml` 已提交到仓库
2. 确保 `tools/validate-stellar-theme.js` 已更新
3. 重新触发工作流

## 最佳实践

### 1. 配置文件命名

```
✅ 推荐
_config.yml
_config.stellar.yml
_config.staging.yml

❌ 不推荐
_config_stellar.yml
_config-stellar.yml
config.stellar.yml
```

### 2. 主题切换

如果你使用多个主题：

```yaml
# _config.yml
theme: stellar

# 对应的配置文件
_config.stellar.yml
```

切换主题时：

```yaml
# _config.yml
theme: butterfly

# 对应的配置文件
_config.butterfly.yml
```

### 3. 环境配置

```yaml
# _config.yml - 基础配置
url: https://example.com

# _config.staging.yml - 测试环境
url: https://staging.example.com

# 使用
hexo server --config _config.yml,_config.staging.yml
```

## 总结

**问题**: 配置文件命名不符合 Hexo 约定

**原因**: 使用了下划线 `_config_stellar.yml` 而不是点号 `_config.stellar.yml`

**解决**:

1. 重命名配置文件
2. 更新验证脚本中的引用

**验证**:

```bash
npm run stellar:validate  # ✅ 通过
npm run build             # ✅ 成功
npm run deploy            # ✅ 成功
```

**影响**: CI/CD 工作流现在可以正常运行

---

**创建日期**: 2024-02-13  
**状态**: 已修复
