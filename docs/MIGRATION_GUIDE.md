# 目录迁移指南

> 最后更新: 2025-05-16

---

## 迁移映射

| 原路径 | 新路径 | 状态 |
|-------|-------|------|
| `source/_posts` | `content/posts` | 待迁移 |
| `source/notes` | `content/notes` | 待迁移 |
| `source/coding` | `content/coding` | 待迁移 |
| `scripts/` | `core/scripts/` | 待迁移 |
| `themes/stellar/` | `core/stellar/` | 保留软链接 |
| `tools/` | `tools/` | 保持不变 |

---

## 迁移步骤

### 1. 备份

```bash
# 创建备份
cp -r source/_posts source/_posts.bak
```

### 2. 迁移内容目录

```bash
# 移动博客文章
mv source/_posts/* content/posts/

# 移动笔记
mv source/notes/* content/notes/

# 移动题解
mv source/coding/* content/coding/
```

### 3. 更新 Hexo 配置

修改 `_config.yml`:

```yaml
# 旧的配置
source_dir: source

# 新的配置
source_dir: content
```

### 4. 迁移脚本

```bash
# 移动核心脚本
mv scripts/* core/scripts/

# 更新脚本引用
```

### 5. 更新软链接

```bash
# 创建软链接指向主题
ln -s ../../themes/stellar core/stellar
```

---

## 风险提示

- 修改 source_dir 会影响所有主题资源路径
- 建议先在小范围测试后再全量迁移
- 确保 _config.yml 中的相对路径配置正确
