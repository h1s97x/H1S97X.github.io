# Stellar 主题配置指南

本指南详细介绍 Stellar 主题的所有配置选项，帮助你快速定制自己的博客。

## 配置文件位置

主题配置文件位于项目根目录：`_config_stellar.yml`

## 配置模块总览

Stellar 主题配置分为以下几个主要模块：

### 基础结构配置
- [侧边栏配置](./配置管理/侧边栏配置.md) - Logo、主导航菜单
- [站点结构配置](./配置管理/站点结构配置.md) - 页面布局、侧边栏组件

### 内容配置
- [文章配置](./配置管理/文章配置.md) - 文章类型、封面、摘要、许可协议
- [笔记本配置](./配置管理/笔记本配置.md) - 笔记本和笔记页面配置

### 功能配置
- [搜索配置](./配置管理/搜索配置.md) - 本地搜索、Algolia 搜索
- [评论系统配置](./配置管理/评论系统配置.md) - Giscus、Twikoo、Waline、Artalk 等

### 外观配置
- [样式配置](./配置管理/样式配置.md) - 主题色、字体、圆角、代码高亮
- [页脚配置](./配置管理/页脚配置.md) - 社交链接、站点地图、版权信息

### 扩展配置
- [标签插件配置](./配置管理/标签插件配置.md) - Note、Image、Timeline 等标签插件
- [插件配置](./配置管理/插件配置.md) - Fancybox、Katex、Mermaid 等第三方插件
- [数据服务配置](./配置管理/数据服务配置.md) - 内置服务和 API 配置

## 快速开始

### 1. 基础配置

最小化配置示例：

```yaml
######## Sidebar ########
logo:
  avatar: '[{config.avatar}](/about/)'
  title: '[{config.title}](/)' 
  subtitle: '{config.subtitle}'

menubar:
  columns: 4
  items:
    - id: post
      icon: solar:documents-bold-duotone
      title: 博客
      url: /

######## Main ########
site_tree:
  home:
    leftbar: welcome, recent
    rightbar: toc

######## Article ########
article:
  license: '本文采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 许可协议'

######## Search ########
search:
  service: local_search

######## Comments ########
comments:
  service: giscus
```

### 2. 推荐配置流程

1. **配置侧边栏** - 设置 Logo 和导航菜单
2. **配置站点结构** - 定义各类页面的布局
3. **配置搜索** - 启用本地搜索或 Algolia
4. **配置评论** - 选择并配置评论系统
5. **配置样式** - 自定义主题色和字体
6. **配置插件** - 按需启用功能插件

## 配置最佳实践

### 使用配置继承

Stellar 主题支持从 `_config.yml` 继承配置：

```yaml
logo:
  avatar: '[{config.avatar}](/about/)'  # 使用站点配置的头像
  title: '[{config.title}](/)' # 使用站点配置的标题
```

### 分层覆盖

配置优先级（从高到低）：
1. 文章 front-matter
2. 笔记本 YAML 配置
3. `_config_stellar.yml` 主题配置
4. 主题默认配置

### 环境配置

可以为不同环境创建不同的配置文件：

```bash
# 开发环境
hexo server

# 预发布环境
hexo server --config _config.yml,_config.staging.yml

# 生产环境
hexo generate
```

## 配置验证

使用内置工具验证配置：

```bash
# 验证 Stellar 主题配置
npm run stellar:validate

# 测试构建
npm run stellar:test
```

## 常见问题

### 配置不生效？

1. 检查 YAML 语法是否正确（注意缩进）
2. 清理缓存重新构建：`npm run clean && npm run build`
3. 检查是否被 front-matter 覆盖

### 如何调试配置？

1. 使用 `hexo server` 本地预览
2. 查看浏览器控制台错误信息
3. 检查生成的 HTML 源码

## 相关资源

- [Stellar 官方文档](https://xaoxuu.com/wiki/stellar/)
- [Hexo 官方文档](https://hexo.io/docs/)
- [配置 API 参考](../API参考/配置API.md)
- [主题定制指南](./主题定制.md)

## 更新日志

- 2025-02-11: 创建配置指南，重构配置文档结构
