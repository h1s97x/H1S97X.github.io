---
name: 更新Scaffolds适配Stellar主题
about: 更新Hexo scaffolds模板以充分利用Stellar主题的功能特性
title: '[SCAFFOLDS] 更新scaffolds模板适配Stellar主题'
labels: ['enhancement', 'stellar-theme', 'scaffolds', 'templates']
assignees: ''
---

## 📋 任务描述

更新Hexo scaffolds模板文件，使其充分利用Stellar主题的功能特性，提供更丰富的front-matter配置选项和更好的内容创作体验。

## 🎯 目标

- [ ] 更新 `scaffolds/post.md` - 博客文章模板
- [ ] 更新 `scaffolds/page.md` - 页面模板  
- [ ] 更新 `scaffolds/draft.md` - 草稿模板
- [ ] 创建 `scaffolds/wiki.md` - Wiki文档模板
- [ ] 创建 `scaffolds/topic.md` - 专栏文章模板
- [ ] 创建工具脚本自动化scaffold管理

## 📝 需要添加的Stellar主题特性

### 基础配置
- [x] `title` - 文章标题
- [x] `date` - 创建日期
- [x] `updated` - 更新日期
- [x] `categories` - 分类
- [x] `tags` - 标签
- [ ] `description` - 文章描述/摘要
- [ ] `excerpt` - 自定义摘要
- [ ] `cover` - 封面图片
- [ ] `banner` - 横幅图片
- [ ] `poster` - 海报图片

### Stellar主题专用配置
- [ ] `layout` - 布局类型 (post/page/wiki/topic)
- [ ] `menu_id` - 导航菜单ID
- [ ] `leftbar` - 左侧栏配置
- [ ] `rightbar` - 右侧栏配置
- [ ] `topic` - 所属专栏
- [ ] `wiki` - 所属Wiki项目
- [ ] `references` - 参考链接
- [ ] `related` - 相关文章

### 内容增强
- [ ] `author` - 作者信息
- [ ] `license` - 许可协议
- [ ] `share` - 分享设置
- [ ] `comment` - 评论设置
- [ ] `mathjax` - 数学公式支持
- [ ] `mermaid` - 图表支持
- [ ] `pin` - 置顶设置
- [ ] `sticky` - 粘性设置

### SEO优化
- [ ] `keywords` - 关键词
- [ ] `canonical_url` - 规范URL
- [ ] `robots` - 搜索引擎指令
- [ ] `sitemap` - 站点地图设置

## 🛠️ 实施计划

### 阶段1: 更新现有模板
1. **post.md** - 博客文章模板
   - 添加Stellar主题专用字段
   - 包含常用的front-matter配置
   - 添加内容结构指导注释

2. **page.md** - 页面模板
   - 适配页面布局需求
   - 添加页面特有配置项

3. **draft.md** - 草稿模板
   - 简化配置，专注内容创作
   - 保留必要的基础字段

### 阶段2: 创建新模板
1. **wiki.md** - Wiki文档模板
   - Wiki项目专用配置
   - 文档结构化字段
   - 版本控制相关设置

2. **topic.md** - 专栏文章模板
   - 专栏系列配置
   - 文章序号和关联设置

### 阶段3: 工具和自动化
1. **scaffold管理工具**
   - 创建 `tools/manage-scaffolds.js`
   - 支持模板验证和更新
   - 提供模板使用统计

2. **npm脚本集成**
   - `scaffolds:validate` - 验证模板
   - `scaffolds:update` - 更新模板
   - `scaffolds:list` - 列出可用模板

## 📋 模板设计原则

### 1. 渐进式配置
- 基础模板包含必需字段
- 高级功能通过注释提供指导
- 支持快速创建和详细配置两种模式

### 2. 分类导向
- 根据内容类型提供不同模板
- 预设合适的分类和标签结构
- 引导内容组织最佳实践

### 3. Stellar主题优化
- 充分利用主题特性
- 提供主题专用配置选项
- 确保最佳显示效果

### 4. 开发体验
- 清晰的注释和说明
- 合理的默认值
- 易于定制和扩展

## 🔍 验证标准

### 功能验证
- [ ] 所有模板可以正常创建文章
- [ ] Stellar主题正确识别和渲染
- [ ] Front-matter字段生效
- [ ] 布局和样式正确显示

### 内容验证
- [ ] 模板包含必要的基础字段
- [ ] Stellar特性配置完整
- [ ] 注释清晰易懂
- [ ] 默认值合理

### 工具验证
- [ ] 管理工具正常运行
- [ ] npm脚本执行成功
- [ ] 模板验证通过
- [ ] 文档更新完整

## 📚 相关文档

- [Stellar主题文档](https://xaoxuu.com/wiki/stellar/)
- [Hexo Front-matter](https://hexo.io/docs/front-matter)
- [Hexo Scaffolds](https://hexo.io/docs/writing#Scaffolds)

## 🎯 预期效果

### 提升创作体验
- 快速创建结构化内容
- 减少重复配置工作
- 提供最佳实践指导

### 充分利用主题特性
- 启用Stellar主题所有功能
- 优化内容展示效果
- 提升用户体验

### 标准化内容结构
- 统一的front-matter格式
- 一致的分类和标签体系
- 规范的内容组织方式

## ✅ 完成标准

- [ ] 所有scaffold模板已更新
- [ ] 新模板创建完成
- [ ] 管理工具开发完成
- [ ] 文档更新完整
- [ ] 测试验证通过
- [ ] 与现有工作流集成

---

**优先级**: 🔥 高  
**预估工期**: 1-2天  
**依赖项**: Stellar主题配置完成  
**影响范围**: 内容创作工作流