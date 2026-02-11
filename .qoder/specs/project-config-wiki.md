# Dev Guide Wiki 实施计划

## 概述

为 Hexo + Stellar 博客创建名为 `dev-guide` 的 Wiki 项目，作为开发者配置参考文档。
使用 Stellar 主题的 wiki 布局系统，带左侧文档树导航和右侧目录。

## 涉及文件

### 配置文件（修改）

1. **`source/_data/wiki.yml`** - 注册新 wiki 项目
2. **`source/_data/wiki/dev-guide.yml`** - 新建 wiki 项目元数据

### Wiki 页面（新建，共 10 页）

所有页面位于 `source/_posts/` 下，使用 `wiki: dev-guide` 和 `layout: wiki`。

| # | 文件路径 | 标题 | order | 内容说明 |
|---|---------|------|-------|---------|
| 1 | `wiki/dev-guide/index.md` | 开发者指南 | 1 | 首页导览，三大模块入口，版本说明 |
| 2 | `wiki/dev-guide/site-config.md` | 站点配置 API | 2 | `_config.yml` 所有字段参考（站点信息、URL、目录、写作、分页、搜索、RSS、部署） |
| 3 | `wiki/dev-guide/theme-overview.md` | 主题配置概览 | 3 | Stellar 配置文件说明、sidebar(logo/menubar)、site_tree、article、notebook |
| 4 | `wiki/dev-guide/theme-style.md` | 样式与定制 | 4 | style 全部字段（主题模式、字体、圆角、色彩、背景、代码块、标题前缀），CSS 覆盖技巧 |
| 5 | `wiki/dev-guide/theme-plugins.md` | 插件与服务 | 5 | tag_plugins 用法、plugins 配置（fancybox/mathjax/mermaid/copycode 等）、comments、search、data_services |
| 6 | `wiki/dev-guide/template-post.md` | Post 博客文章模板 | 6 | scaffolds/post.md 详解，所有字段说明，分类体系，写作示例 |
| 7 | `wiki/dev-guide/template-wiki.md` | Wiki 文档模板 | 7 | scaffolds/wiki.md 详解，wiki 项目创建流程，排序与关联 |
| 8 | `wiki/dev-guide/template-page.md` | Page 与 Topic 模板 | 8 | scaffolds/page.md + scaffolds/topic.md，独立页面和专栏用法 |
| 9 | `wiki/dev-guide/template-draft.md` | Draft 草稿与 Obsidian 模板 | 9 | scaffolds/draft.md + source/_templates/ 三个 Obsidian 模板说明 |
| 10 | `wiki/dev-guide/front-matter-ref.md` | Front-matter 速查表 | 10 | 所有可用 front-matter 字段按用途分类的完整参考表 |

## 关键实现细节

### 1. wiki.yml 修改

```yaml
- stellar
- dev-guide
```

### 2. dev-guide.yml 内容

```yaml
name: Dev Guide
title: 开发者指南
subtitle: '配置参考 & 开发文档 | Hexo 8.1.1 + Stellar v1.33.1'
icon: solar:code-square-bold-duotone
description: Hexo + Stellar 主题的完整配置 API、主题定制指南和文章模板参考。
repo: h1s97x/H1S97X.github.io
base_dir: /wiki/dev-guide/
```

### 3. 每个页面的标准 front-matter

```yaml
---
title: 页面标题
wiki: dev-guide
layout: wiki
order: X
---
```

不需要重复设置 `menu_id`/`leftbar`/`rightbar`，因为主题 `site_tree.wiki` 已全局配置。

### 4. 内容编写原则

- 以配置字段为核心，表格化展示字段名、类型、默认值、说明
- 关键字段附带 YAML 代码示例
- 使用 Stellar 的 `{% note %}` 标签标注注意事项
- 使用 `{% copy %}` 标签提供可复制的配置片段
- 避免冗长解释，保持简洁直接的 API 文档风格
- 每页控制在合理长度，聚焦单一主题

### 5. 内容来源

文档内容基于项目实际配置文件提取：
- `_config.yml` (136 行) - 站点配置
- `themes/stellar/_config.yml` (725 行) - 主题配置
- `scaffolds/` 目录下 5 个模板文件
- `source/_templates/` 目录下 3 个 Obsidian 模板

## 实施步骤

1. 创建 `source/_data/wiki/dev-guide.yml`
2. 修改 `source/_data/wiki.yml` 添加 dev-guide
3. 创建 `source/_posts/wiki/dev-guide/` 目录
4. 按顺序创建 10 个 wiki 页面（index -> site-config -> theme-overview -> theme-style -> theme-plugins -> template-post -> template-wiki -> template-page -> template-draft -> front-matter-ref）
5. 运行 `hexo server` 验证 wiki 页面渲染正确

## 验证方法

1. `npm run build` - 确认构建无报错
2. `npm run server` - 本地预览检查：
   - 访问 `/wiki/` 确认 dev-guide 项目出现在 wiki 列表
   - 访问 `/wiki/dev-guide/` 确认首页正常
   - 检查左侧文档树导航是否按 order 正确排序
   - 检查右侧 TOC 是否正确生成
   - 点击每个页面确认内容渲染正常
