# 参考博客分析报告

> 参考项目: https://github.com/calfzhou/gocalf.com

## 整体架构

```
gocalf.com/
├── source/
│   ├── _posts/          # 博客文章 (10篇)
│   │   ├── 2024/        # 按年份组织
│   │   ├── 2025/
│   │   └── 2026/
│   ├── notes/           # 笔记 (43篇)
│   │   ├── git-cheats/
│   │   ├── hexo/
│   │   └── ...
│   ├── coding/          # 编程题解 (359篇)
│   │   ├── 1-two-sum/
│   │   ├── 100-same-tree/
│   │   └── ...
│   └── about/           # 关于页面
```

## 三种内容类型

| 类型 | 目录 | frontmatter | 用途 |
|------|------|-------------|------|
| **Post** | `_posts/YYYY/` | `type: story` | 博客文章、生活记录 |
| **Note** | `notes/slug/` | `notebook: notes` | 技术笔记、知识整理 |
| **Coding** | `coding/slug/` | `notebook: coding` | LeetCode 题解 |

## 关键设计

### 1. 文章 Frontmatter

```yaml
# Post
---
title: Hello World
type: story
date: 2024-04-13 11:02:06
updated: 2024-04-14 23:12:28
---

# Note
---
title: Git Cheats
notebook: notes
tags: [it/git]
date: 2025-12-28 15:21:24
---

# Coding
---
title: 1. Two Sum
notebook: coding
tags: [easy]
date: 2024-11-09 20:49:16
---
```

### 2. URL 结构

```yaml
permalink: blog/:year/:month/:day/:title/
```

- 博客：`/blog/2024/04/13/hello-world/`
- 笔记：`/notes/git-cheats/`
- 编程：`/coding/1-two-sum/`

### 3. 管理工具 (Makefile)

```bash
make post slug=hello-world title='Hello World'  # 创建博客
make note slug=git-cheats title='Git Cheats'    # 创建笔记
make coding slug=1-two-sum title='Two Sum'      # 创建题解
```

### 4. 模板系统 (scaffolds/)

- `post.md` - 博客模板
- `note.md` - 笔记模板
- `coding.md` - 编程题解模板（含 LeetCode 格式）

## 统计

| 类型 | 数量 |
|------|------|
| Posts | 10 |
| Notes | 43 |
| Coding | 359 |
| **总计** | **412** |

## 对比我们的博客

| 方面 | gocalf.com | 我们的博客 |
|------|------------|-----------|
| 内容类型 | 3种（post/note/coding） | 1种（混合） |
| 文章组织 | 按年份 | 按主题目录 |
| 分类方式 | frontmatter tags | 目录结构 |
| 模板系统 | 有 scaffolds | 无 |
| 管理工具 | Makefile | 无 |

## 建议方案

1. **区分内容类型：**
   - `_posts/` - 博客文章（按年份）
   - `notes/` - 技术笔记（按主题）
   - `coding/` - 编程题解（可选）

2. **添加 scaffolds 模板**

3. **添加 Makefile 管理命令**

4. **更新 frontmatter 格式**
