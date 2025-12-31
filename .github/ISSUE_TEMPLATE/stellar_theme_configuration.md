---
name: Stellar主题配置优化
about: 根据_config.stellar.yml配置文件优化Stellar主题的路由、导航和功能设置
title: '[CONFIG] 优化Stellar主题配置和路由设置'
labels: 'configuration, stellar-theme, routing, enhancement'
assignees: ''
---

## 🎯 配置目标

基于当前的 `_config.stellar.yml` 配置文件，优化Stellar主题的路由结构、导航菜单和功能设置，以适应重组后的博客文件结构。

## 📋 当前配置状态

### 主要配置文件
- `_config.yml` - Hexo主配置
- `_config.stellar.yml` - Stellar主题配置

### 当前路由设置
```yaml
# 当前路由配置
tag_dir: blog/tags
archive_dir: blog/archives  
category_dir: blog/categories
permalink: :year/:month/:day/:title/
```

### 当前导航菜单
```yaml
menubar:
  items:
    - id: post
      title: 博客
      url: /
    - id: wiki  
      title: 文档
      url: /wiki/
    - id: explore
      title: 探索
      url: /explore/
    - id: social
      title: 社交
      url: /friends/
```

## 🔧 需要优化的配置项

### 1. 路由结构优化
- [ ] **分类路由**: 适配新的分类结构
  - `tech-development/` - 技术开发
  - `system-operations/` - 系统运维
  - `gaming-world/` - 游戏世界
  - `academic-learning/` - 学术学习
  - `personal-essays/` - 个人随笔

- [ ] **标签路由**: 优化标签页面路径
- [ ] **归档路由**: 调整归档页面结构
- [ ] **永久链接**: 优化文章URL格式

### 2. 导航菜单配置
- [ ] **主导航**: 根据新分类调整菜单项
- [ ] **子导航**: 添加分类子菜单
- [ ] **图标设置**: 为每个菜单项配置合适的图标
- [ ] **颜色主题**: 统一菜单项的颜色方案

### 3. 页面布局配置
- [ ] **首页布局**: 优化首页左右侧栏
- [ ] **文章页布局**: 配置文章页面的侧栏组件
- [ ] **分类页布局**: 设置分类列表页面布局
- [ ] **标签页布局**: 配置标签页面显示

### 4. 搜索功能配置
- [ ] **本地搜索**: 配置搜索范围和字段
- [ ] **搜索排除**: 设置不被搜索的内容
- [ ] **搜索结果**: 优化搜索结果显示

### 5. 评论系统配置
- [ ] **评论服务**: 选择并配置评论系统
- [ ] **评论样式**: 自定义评论区样式
- [ ] **评论权限**: 设置评论权限和审核

## 📝 具体配置任务

### 任务1: 路由重构
```yaml
# 建议的新路由配置
category_dir: categories
tag_dir: tags  
archive_dir: archives
permalink: :category/:title/
```

### 任务2: 导航菜单重构
```yaml
menubar:
  items:
    - id: home
      title: 首页
      url: /
      icon: solar:home-bold-duotone
    - id: tech
      title: 技术
      url: /categories/tech-development/
      icon: solar:code-bold-duotone
    - id: system
      title: 运维
      url: /categories/system-operations/
      icon: solar:server-bold-duotone
    - id: gaming
      title: 游戏
      url: /categories/gaming-world/
      icon: solar:gameboy-bold-duotone
    - id: about
      title: 关于
      url: /about/
      icon: solar:user-bold-duotone
```

### 任务3: 侧栏组件配置
```yaml
site_tree:
  home:
    leftbar: welcome, recent, categories
    rightbar: tags, timeline
  post:
    leftbar: related, recent
    rightbar: toc, tags
```

### 任务4: 搜索配置优化
```yaml
search:
  service: local_search
  local_search:
    field: all
    path: /search.json
    content: true
    skip_search:
      - _assets/*
      - backup_posts/*
```

## 🎨 样式和主题配置

### 颜色方案
- [ ] **主题色**: 调整主色调配置
- [ ] **强调色**: 设置强调色和链接色
- [ ] **分类色**: 为不同分类设置专属颜色

### 字体配置
- [ ] **中文字体**: 优化中文显示字体
- [ ] **代码字体**: 配置代码块字体
- [ ] **字号设置**: 调整各级标题和正文字号

### 布局样式
- [ ] **卡片圆角**: 统一卡片圆角样式
- [ ] **间距设置**: 优化页面元素间距
- [ ] **响应式**: 确保移动端适配

## 🔌 插件和功能配置

### 必需插件
- [ ] **代码高亮**: 配置代码块高亮主题
- [ ] **数学公式**: 启用KaTeX或MathJax
- [ ] **图片放大**: 配置Fancybox
- [ ] **复制代码**: 启用代码复制功能

### 可选功能
- [ ] **阅读统计**: 配置文章阅读量统计
- [ ] **文章推荐**: 启用相关文章推荐
- [ ] **社交分享**: 配置分享按钮
- [ ] **RSS订阅**: 优化RSS配置

## 📊 SEO和性能优化

### SEO配置
- [ ] **站点地图**: 优化sitemap生成规则
- [ ] **Open Graph**: 配置社交媒体分享
- [ ] **结构化数据**: 添加JSON-LD结构化数据

### 性能优化
- [ ] **资源压缩**: 启用CSS/JS压缩
- [ ] **图片懒加载**: 配置图片延迟加载
- [ ] **CDN配置**: 优化静态资源CDN

## 🧪 测试验证

### 功能测试
- [ ] **导航测试**: 验证所有导航链接正常
- [ ] **搜索测试**: 测试搜索功能完整性
- [ ] **分类测试**: 验证分类页面显示正确
- [ ] **标签测试**: 检查标签页面功能

### 兼容性测试
- [ ] **桌面端**: Chrome, Firefox, Safari, Edge
- [ ] **移动端**: iOS Safari, Android Chrome
- [ ] **响应式**: 不同屏幕尺寸适配

### 性能测试
- [ ] **加载速度**: 页面加载时间 < 3秒
- [ ] **构建时间**: Hexo构建时间优化
- [ ] **资源大小**: 静态资源大小控制

## 📚 参考资源

- [Stellar主题官方文档](https://xaoxuu.com/wiki/stellar/)
- [Hexo配置文档](https://hexo.io/docs/configuration.html)
- [当前配置文件](_config.stellar.yml)
- [博客分类结构](FILE_ORGANIZATION_GUIDE.md)

## 🎯 验收标准

- [ ] 所有导航链接正常工作
- [ ] 分类和标签页面正确显示
- [ ] 搜索功能完整可用
- [ ] 移动端完美适配
- [ ] 页面加载性能良好
- [ ] SEO配置完整有效

## 📅 实施计划

### 第一阶段 (1-2天)
- 路由和导航配置
- 基础布局调整

### 第二阶段 (1-2天)  
- 插件和功能配置
- 样式主题优化

### 第三阶段 (1天)
- 测试验证和调优
- 文档更新

## 🔗 相关Issue

- 博客文件重组 (已完成)
- 主题切换功能 (#feature_request_theme_switcher)

## 📝 备注

此配置优化将显著提升博客的用户体验和功能完整性，确保Stellar主题能够充分发挥其功能特性，同时与重组后的文件结构完美配合。

---

**优先级**: 高  
**预估工作量**: 3-4 天  
**技术难度**: 中等  
**依赖项**: 博客文件重组完成