---
title: {{ title }}
date: {{ date }}
updated: {{ date }}
description: # Wiki文档描述

# Wiki配置
wiki: # Wiki项目名称 (必填)
layout: wiki
menu_id: wiki

# Stellar主题配置
leftbar: tree, related, recent # Wiki专用左侧栏
rightbar: ghrepo, toc # Wiki专用右侧栏

# 文档属性
# order: 1 # 文档排序权重
# pin: false # 是否置顶
# cover: # 封面图片
# banner: # 横幅图片

# 内容设置
# mathjax: true # 技术文档通常需要数学公式
# mermaid: true # 支持流程图和架构图
# comment: true # 是否启用评论
# share: true # 是否显示分享按钮

# SEO优化
keywords: # 关键词
# robots: index,follow
# sitemap: true

# 文档关联
# references: # 参考文档
#   - title: 相关文档标题
#     url: /wiki/project/related-doc/
# related: # 相关文章
#   - /posts/related-post/
---

<!-- 
Wiki文档编写指南：

1. Wiki用于创建结构化的文档项目，如：
   - 技术文档
   - 产品手册  
   - 教程系列
   - API文档

2. Wiki文档特点：
   - 有明确的项目归属
   - 支持文档树状结构
   - 便于版本管理和协作
   - 支持交叉引用

3. 文档结构建议：
   ## 概述
   简要介绍文档主题
   
   ## 快速开始
   提供快速上手指南
   
   ## 详细说明
   深入的技术细节
   
   ## 示例
   实际使用示例
   
   ## 参考
   相关链接和资源

4. Wiki专用标签插件：
   - {% link %} 文档链接
   - {% note %} 提示信息
   - {% checkbox %} 任务清单
   - {% timeline %} 版本历史

5. 发布前检查：
   - [ ] Wiki项目名称正确
   - [ ] 文档标题清晰
   - [ ] 内容结构合理
   - [ ] 链接和引用有效
   - [ ] 代码示例正确
-->