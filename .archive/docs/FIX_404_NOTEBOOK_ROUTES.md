# 修复 Notebook 路由 404 问题

## 问题描述

访问 `/coding/` 和 `/notes/` 路由时出现 404 错误，但子页面（如 `/coding/1-two-sum/`）可以正常访问。

## 问题原因

`source/coding/` 和 `source/notes/` 目录下缺少 `index.md` 文件，导致 Hexo 不会生成对应的 `index.html`。

当用户访问 `/coding/` 时，GitHub Pages 会查找 `/coding/index.html`，找不到就返回 404。

## 目录结构

### 问题状态

```
source/
├── coding/
│   └── 1-two-sum/
│       └── index.md  ✅ 有
├── notes/
│   └── git-help/
│       └── index.md  ✅ 有
└── blog/
    └── (文章)

public/
├── coding/
│   ├── 1-two-sum/
│   │   └── index.html  ✅ 生成了
│   └── index.html  ❌ 缺失！
├── notes/
│   ├── git-help/
│   │   └── index.html  ✅ 生成了
│   └── index.html  ❌ 缺失！
```

### 解决后

```
source/
├── coding/
│   ├── index.md  ✅ 新增
│   └── 1-two-sum/
│       └── index.md
├── notes/
│   ├── index.md  ✅ 新增
│   └── git-help/
│       └── index.md

public/
├── coding/
│   ├── index.html  ✅ 生成了
│   └── 1-two-sum/
│       └── index.html
├── notes/
│   ├── index.html  ✅ 生成了
│   └── git-help/
│       └── index.html
```

## 解决方案

### 1. 创建 coding/index.md

**文件**: `source/coding/index.md`

```markdown
---
layout: notebook
title: Coding
notebook: coding
seo_title: Coding Problems & Solutions
comment: false
---

这里记录了我的算法练习和编程问题解决方案。

主要包括：

- LeetCode 题解
- 算法实现
- 数据结构练习
- 编程技巧总结
```

### 2. 创建 notes/index.md

**文件**: `source/notes/index.md`

```markdown
---
layout: notebook
title: Notes
notebook: notes
seo_title: Technical Notes & Learning Records
comment: false
---

这里记录了我的学习笔记和技术总结。

主要包括：

- 技术文档
- 学习笔记
- 工具使用指南
- 开发经验总结
```

### 3. 重新构建和部署

```bash
# 清理旧文件
npm run clean

# 重新构建
npm run build

# 验证生成的文件
ls public/coding/index.html
ls public/notes/index.html

# 部署
npm run deploy
# 或
git add source/coding/index.md source/notes/index.md
git commit -m "fix: 添加 coding 和 notes 索引页面，修复 404 问题"
git push origin master
```

## Front Matter 说明

### layout: notebook

使用 Stellar 主题的 notebook 布局，会自动：

- 显示该 notebook 下的所有文章列表
- 按标签分组
- 显示标签图标（根据 `_config_stellar.yml` 中的 `notebook.tagcons` 配置）

### notebook: coding/notes

指定 notebook 名称，用于：

- 筛选该 notebook 下的文章
- 生成面包屑导航
- 侧边栏显示

### comment: false

索引页面通常不需要评论功能。

## 验证

### 本地验证

```bash
# 启动本地服务器
npm run server

# 访问以下 URL
http://localhost:4000/coding/
http://localhost:4000/notes/
http://localhost:4000/coding/1-two-sum/
http://localhost:4000/notes/git-help/
```

### 线上验证

部署后访问：

- https://h1s97x.github.io/coding/
- https://h1s97x.github.io/notes/
- https://h1s97x.github.io/coding/1-two-sum/
- https://h1s97x.github.io/notes/git-help/

## 为什么会出现这个问题？

### Hexo 的工作原理

1. Hexo 扫描 `source/` 目录
2. 对于每个 `.md` 文件，生成对应的 `.html` 文件
3. 对于目录，只有包含 `index.md` 才会生成 `index.html`

### GitHub Pages 的路由规则

1. 访问 `/coding/` 时，查找 `/coding/index.html`
2. 如果找不到，返回 404
3. 不会自动列出目录内容（与本地文件系统不同）

### 为什么子页面能访问？

- `/coding/1-two-sum/` 对应 `/coding/1-two-sum/index.html`
- 这个文件存在，所以可以正常访问

## 其他 Notebook 目录

如果你还有其他 notebook 目录（如 `blog/`），也需要确保有 `index.md`：

```bash
# 检查是否有 index.md
ls source/blog/index.md

# 如果没有，创建一个
cat > source/blog/index.md << 'EOF'
---
layout: notebook
title: Blog
notebook: blog
seo_title: Blog Posts
comment: false
---

这里是我的博客文章。
EOF
```

## 最佳实践

### 1. 创建新 Notebook 时

```bash
# 创建目录
mkdir source/new-notebook

# 立即创建 index.md
cat > source/new-notebook/index.md << 'EOF'
---
layout: notebook
title: New Notebook
notebook: new-notebook
comment: false
---

描述这个 notebook 的内容。
EOF
```

### 2. 使用脚本自动创建

创建 `tools/create-notebook.js`：

```javascript
const fs = require("fs");
const path = require("path");

function createNotebook(name, title, description) {
  const dir = path.join("source", name);
  const indexFile = path.join(dir, "index.md");

  // 创建目录
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // 创建 index.md
  const content = `---
layout: notebook
title: ${title}
notebook: ${name}
comment: false
---

${description}
`;

  fs.writeFileSync(indexFile, content);
  console.log(`✅ Created ${indexFile}`);
}

// 使用示例
// createNotebook('projects', 'Projects', '我的项目集合');
```

### 3. 添加到 package.json

```json
{
  "scripts": {
    "notebook:create": "node tools/create-notebook.js"
  }
}
```

## 相关配置

### \_config.yml

```yaml
# 确保 skip_render 不包含 notebook 目录
skip_render:
  # - coding/**
  # - notes/**
```

### \_config_stellar.yml

```yaml
notebook:
  tagcons:
    # 为 notebook 标签配置图标
    coding: solar:code-linear
    notes: solar:document-linear
```

## 故障排除

### 问题 1: 创建了 index.md 但还是 404

**检查**:

1. 是否重新构建了？`npm run build`
2. 是否重新部署了？`npm run deploy`
3. 清除浏览器缓存
4. 等待 GitHub Pages 更新（1-5 分钟）

### 问题 2: index.html 生成了但内容为空

**检查**:

1. Front matter 格式是否正确？
2. `layout: notebook` 是否拼写正确？
3. Stellar 主题是否正确安装？

### 问题 3: 显示样式不对

**检查**:

1. `layout: notebook` 是否正确？
2. Stellar 主题版本是否最新？
3. 主题配置是否正确？

## 总结

**问题**: 访问 `/coding/` 和 `/notes/` 出现 404

**原因**: 缺少 `source/coding/index.md` 和 `source/notes/index.md`

**解决**: 创建这两个文件，使用 `layout: notebook`

**验证**:

```bash
npm run clean
npm run build
ls public/coding/index.html  # 应该存在
ls public/notes/index.html   # 应该存在
npm run deploy
```

**预防**: 创建新 notebook 目录时，立即创建 `index.md`

---

**创建日期**: 2024-02-13  
**状态**: 已修复
