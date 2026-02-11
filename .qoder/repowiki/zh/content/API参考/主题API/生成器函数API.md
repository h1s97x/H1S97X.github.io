# 生成器函数API

<cite>
**本文引用的文件**
- [themes/stellar/scripts/generators/404.js](file://themes/stellar/scripts/generators/404.js)
- [themes/stellar/scripts/generators/author.js](file://themes/stellar/scripts/generators/author.js)
- [themes/stellar/scripts/generators/categories.js](file://themes/stellar/scripts/generators/categories.js)
- [themes/stellar/scripts/generators/notebooks.js](file://themes/stellar/scripts/generators/notebooks.js)
- [themes/stellar/scripts/generators/search.js](file://themes/stellar/scripts/generators/search.js)
- [themes/stellar/scripts/generators/tags.js](file://themes/stellar/scripts/generators/tags.js)
- [themes/stellar/scripts/generators/topic.js](file://themes/stellar/scripts/generators/topic.js)
- [themes/stellar/scripts/generators/wiki.js](file://themes/stellar/scripts/generators/wiki.js)
- [themes/stellar/_config.yml](file://themes/stellar/_config.yml)
- [themes/stellar/layout/404.ejs](file://themes/stellar/layout/404.ejs)
- [themes/stellar/layout/categories.ejs](file://themes/stellar/layout/categories.ejs)
- [themes/stellar/layout/tags.ejs](file://themes/stellar/layout/tags.ejs)
- [themes/stellar/layout/index_wiki.ejs](file://themes/stellar/layout/index_wiki.ejs)
- [themes/stellar/layout/index_topic.ejs](file://themes/stellar/layout/index_topic.ejs)
- [themes/stellar/layout/notebooks.ejs](file://themes/stellar/layout/notebooks.ejs)
</cite>

## 目录
1. [简介](#简介)
2. [项目结构](#项目结构)
3. [核心组件](#核心组件)
4. [架构总览](#架构总览)
5. [详细组件分析](#详细组件分析)
6. [依赖分析](#依赖分析)
7. [性能考虑](#性能考虑)
8. [故障排查指南](#故障排查指南)
9. [结论](#结论)
10. [附录](#附录)

## 简介
本文件为 H1S97X 博客基于 Hexo 的主题“Stellar”所实现的页面生成器函数API参考文档。目标是系统化梳理并说明以下生成器的接口规范、路由配置、数据处理逻辑、模板选择与输出格式，并给出配置参数、URL 模式、SEO 优化选项、性能优化与缓存策略、增量更新机制，以及它们与 Hexo 静态站点生成流程的集成关系。

涉及的生成器包括：404、author、categories、notebooks、search、tags、topic、wiki。

## 项目结构
- 生成器集中位于主题目录下的 scripts/generators 目录，每个生成器以独立文件实现，遵循 Hexo generator 注册规范。
- 模板位于主题的 layout 目录，按页面类型命名，如 404.ejs、categories.ejs、tags.ejs、index_wiki.ejs、index_topic.ejs、notebooks.ejs 等。
- 主题配置位于 _config.yml，其中包含 site_tree、search、wiki、topic、notebook 等关键配置项，直接影响生成器的行为与输出路径。

```mermaid
graph TB
subgraph "主题配置"
CFG["_config.yml<br/>site_tree / search / wiki / topic / notebook"]
end
subgraph "生成器"
G404["404.js"]
GA["author.js"]
GCAT["categories.js"]
GN["notebooks.js"]
GS["search.js"]
GTAG["tags.js"]
GTOP["topic.js"]
GWIKI["wiki.js"]
end
subgraph "模板"
T404["layout/404.ejs"]
TCAT["layout/categories.ejs"]
TTAG["layout/tags.ejs"]
TWIKI["layout/index_wiki.ejs"]
TTOP["layout/index_topic.ejs"]
TN["layout/notebooks.ejs"]
end
CFG --> G404
CFG --> GA
CFG --> GCAT
CFG --> GN
CFG --> GS
CFG --> GTAG
CFG --> GTOP
CFG --> GWIKI
G404 --> T404
GA --> T404
GCAT --> TCAT
GTAG --> TTAG
GN --> TN
GWIKI --> TWIKI
GTOP --> TTOP
```

**图表来源**
- [themes/stellar/_config.yml](file://themes/stellar/_config.yml#L73-L152)
- [themes/stellar/scripts/generators/404.js](file://themes/stellar/scripts/generators/404.js#L5-L15)
- [themes/stellar/scripts/generators/author.js](file://themes/stellar/scripts/generators/author.js#L5-L27)
- [themes/stellar/scripts/generators/categories.js](file://themes/stellar/scripts/generators/categories.js#L5-L16)
- [themes/stellar/scripts/generators/notebooks.js](file://themes/stellar/scripts/generators/notebooks.js#L5-L73)
- [themes/stellar/scripts/generators/search.js](file://themes/stellar/scripts/generators/search.js#L6-L101)
- [themes/stellar/scripts/generators/tags.js](file://themes/stellar/scripts/generators/tags.js#L5-L16)
- [themes/stellar/scripts/generators/topic.js](file://themes/stellar/scripts/generators/topic.js#L5-L22)
- [themes/stellar/scripts/generators/wiki.js](file://themes/stellar/scripts/generators/wiki.js#L5-L39)
- [themes/stellar/layout/404.ejs](file://themes/stellar/layout/404.ejs#L1-L20)
- [themes/stellar/layout/categories.ejs](file://themes/stellar/layout/categories.ejs#L1-L24)
- [themes/stellar/layout/tags.ejs](file://themes/stellar/layout/tags.ejs#L1-L21)
- [themes/stellar/layout/index_wiki.ejs](file://themes/stellar/layout/index_wiki.ejs#L1-L44)
- [themes/stellar/layout/index_topic.ejs](file://themes/stellar/layout/index_topic.ejs#L1-L30)
- [themes/stellar/layout/notebooks.ejs](file://themes/stellar/layout/notebooks.ejs#L1-L9)

**章节来源**
- [themes/stellar/_config.yml](file://themes/stellar/_config.yml#L73-L152)
- [themes/stellar/scripts/generators/404.js](file://themes/stellar/scripts/generators/404.js#L5-L15)
- [themes/stellar/scripts/generators/author.js](file://themes/stellar/scripts/generators/author.js#L5-L27)
- [themes/stellar/scripts/generators/categories.js](file://themes/stellar/scripts/generators/categories.js#L5-L16)
- [themes/stellar/scripts/generators/notebooks.js](file://themes/stellar/scripts/generators/notebooks.js#L5-L73)
- [themes/stellar/scripts/generators/search.js](file://themes/stellar/scripts/generators/search.js#L6-L101)
- [themes/stellar/scripts/generators/tags.js](file://themes/stellar/scripts/generators/tags.js#L5-L16)
- [themes/stellar/scripts/generators/topic.js](file://themes/stellar/scripts/generators/topic.js#L5-L22)
- [themes/stellar/scripts/generators/wiki.js](file://themes/stellar/scripts/generators/wiki.js#L5-L39)

## 核心组件
- 404 生成器：注册名为“404”的生成器，输出错误页，使用主题配置中的错误页路径与菜单标识。
- author 生成器：遍历作者配置，为每位非隐藏作者生成归档页，使用 archive 布局。
- categories 生成器：当存在分类时，生成分类列表页；否则返回空。
- notebooks 生成器：生成笔记本列表页与各笔记本内按标签分页的笔记列表页，使用 hexo-pagination 处理分页。
- search 生成器：条件生成本地搜索 JSON，按配置过滤字段与路径，清理 HTML 并序列化输出。
- tags 生成器：当存在标签时，生成标签列表页；否则返回空。
- topic 生成器：生成专栏主页，使用 index_topic 布局。
- wiki 生成器：生成 wiki 主页及按标签筛选的 wiki 列表页，使用 index_wiki 布局。

**章节来源**
- [themes/stellar/scripts/generators/404.js](file://themes/stellar/scripts/generators/404.js#L5-L15)
- [themes/stellar/scripts/generators/author.js](file://themes/stellar/scripts/generators/author.js#L5-L27)
- [themes/stellar/scripts/generators/categories.js](file://themes/stellar/scripts/generators/categories.js#L5-L16)
- [themes/stellar/scripts/generators/notebooks.js](file://themes/stellar/scripts/generators/notebooks.js#L5-L73)
- [themes/stellar/scripts/generators/search.js](file://themes/stellar/scripts/generators/search.js#L6-L101)
- [themes/stellar/scripts/generators/tags.js](file://themes/stellar/scripts/generators/tags.js#L5-L16)
- [themes/stellar/scripts/generators/topic.js](file://themes/stellar/scripts/generators/topic.js#L5-L22)
- [themes/stellar/scripts/generators/wiki.js](file://themes/stellar/scripts/generators/wiki.js#L5-L39)

## 架构总览
生成器在 Hexo 构建阶段被调用，读取主题配置与本地数据，返回页面路由对象数组。每个路由对象包含：
- path：输出路径
- layout：使用的模板布局数组
- data：传递给模板的数据对象

模板通过 EJS 渲染，结合主题配置与页面元数据，最终生成静态 HTML。

```mermaid
sequenceDiagram
participant Hexo as "Hexo 构建器"
participant Gen as "生成器函数"
participant Locals as "本地数据(locals)"
participant Theme as "主题配置(_config.yml)"
participant Tpl as "模板(layout/*.ejs)"
Hexo->>Gen : 调用注册的生成器
Gen->>Theme : 读取 site_tree / search / wiki / topic 等配置
Gen->>Locals : 读取 posts / pages / tags / categories 等数据
Gen-->>Hexo : 返回路由数组 {path, layout, data}
Hexo->>Tpl : 渲染模板并写入静态文件
Tpl-->>Hexo : 输出 HTML
```

**图表来源**
- [themes/stellar/scripts/generators/404.js](file://themes/stellar/scripts/generators/404.js#L5-L15)
- [themes/stellar/scripts/generators/author.js](file://themes/stellar/scripts/generators/author.js#L5-L27)
- [themes/stellar/scripts/generators/categories.js](file://themes/stellar/scripts/generators/categories.js#L5-L16)
- [themes/stellar/scripts/generators/notebooks.js](file://themes/stellar/scripts/generators/notebooks.js#L5-L73)
- [themes/stellar/scripts/generators/search.js](file://themes/stellar/scripts/generators/search.js#L6-L101)
- [themes/stellar/scripts/generators/tags.js](file://themes/stellar/scripts/generators/tags.js#L5-L16)
- [themes/stellar/scripts/generators/topic.js](file://themes/stellar/scripts/generators/topic.js#L5-L22)
- [themes/stellar/scripts/generators/wiki.js](file://themes/stellar/scripts/generators/wiki.js#L5-L39)
- [themes/stellar/_config.yml](file://themes/stellar/_config.yml#L73-L152)

## 详细组件分析

### 404 生成器
- 注册名：404
- 路由配置：使用主题配置中的 site_tree.error_page['404'] 作为输出路径
- 模板：404.ejs
- 数据：包含 layout 与 menu_id，robots 设置为“none”
- SEO：通过模板设置 robots=noindex,follow，避免搜索引擎索引

```mermaid
flowchart TD
Start(["生成器入口"]) --> ReadCfg["读取主题配置 site_tree.error_page['404']"]
ReadCfg --> BuildRoute["构建路由对象<br/>path + layout=['404'] + data"]
BuildRoute --> Render["渲染 404.ejs"]
Render --> Output["输出 /404.html"]
```

**图表来源**
- [themes/stellar/scripts/generators/404.js](file://themes/stellar/scripts/generators/404.js#L5-L15)
- [themes/stellar/layout/404.ejs](file://themes/stellar/layout/404.ejs#L1-L20)
- [themes/stellar/_config.yml](file://themes/stellar/_config.yml#L143-L147)

**章节来源**
- [themes/stellar/scripts/generators/404.js](file://themes/stellar/scripts/generators/404.js#L5-L15)
- [themes/stellar/layout/404.ejs](file://themes/stellar/layout/404.ejs#L1-L20)
- [themes/stellar/_config.yml](file://themes/stellar/_config.yml#L143-L147)

### author 生成器
- 注册名：author
- 数据来源：主题配置中的 authors
- 逻辑：遍历作者，跳过 hidden=true 的作者，为每位作者生成归档页，使用 archive 布局
- 路由：使用作者配置中的 path 字段
- 模板：archive（对应模板文件未在本节列出）

```mermaid
flowchart TD
Start(["生成器入口"]) --> LoadAuthors["读取 theme.authors"]
LoadAuthors --> Loop{"遍历作者"}
Loop --> |hidden=true| Skip["跳过"]
Loop --> |hidden=false| Push["push 路由 {path, layout=['archive'], data}"]
Push --> Next["继续下一个作者"]
Skip --> Next
Next --> Done(["返回路由数组"])
```

**图表来源**
- [themes/stellar/scripts/generators/author.js](file://themes/stellar/scripts/generators/author.js#L5-L27)

**章节来源**
- [themes/stellar/scripts/generators/author.js](file://themes/stellar/scripts/generators/author.js#L5-L27)

### categories 生成器
- 注册名：categories
- 条件：当 locals.categories 非空时生成
- 路径：使用 hexo.config.category_dir + “/index.html”
- 模板：categories.ejs
- 数据：传递 locals.posts
- SEO：模板设置 robots=noindex,follow

```mermaid
flowchart TD
Start(["生成器入口"]) --> HasCats{"locals.categories 是否为空?"}
HasCats --> |否| ReturnEmpty["返回 {}"]
HasCats --> |是| BuildRoute["构建路由<br/>path=category_dir/index.html<br/>layout=['categories']<br/>data=locals.posts"]
BuildRoute --> Render["渲染 categories.ejs"]
Render --> Output["输出分类列表页"]
```

**图表来源**
- [themes/stellar/scripts/generators/categories.js](file://themes/stellar/scripts/generators/categories.js#L5-L16)
- [themes/stellar/layout/categories.ejs](file://themes/stellar/layout/categories.ejs#L1-L24)

**章节来源**
- [themes/stellar/scripts/generators/categories.js](file://themes/stellar/scripts/generators/categories.js#L5-L16)
- [themes/stellar/layout/categories.ejs](file://themes/stellar/layout/categories.ejs#L1-L24)

### notebooks 生成器
- 注册名：notebooks
- 数据来源：主题配置 notebooks.tree 与 locals.pages
- 逻辑要点：
  - 生成笔记本列表页（index.html）
  - 遍历 notebooks.tree，对每个笔记本：
    - 过滤 pages 中属于该笔记本的笔记
    - 按 pinned 优先与 order_by 排序
    - 为每个标签生成分页列表（使用 hexo-pagination）
- 分页：自定义 paginationWithEmpty 处理空集合的分页占位
- 模板：notebooks.ejs（列表页）、notes.ejs（笔记列表，模板文件未在本节列出）

```mermaid
flowchart TD
Start(["生成器入口"]) --> CheckTree{"notebooks.tree 是否为空?"}
CheckTree --> |是| ReturnEmpty["返回 []"]
CheckTree --> |否| Init["初始化 routes[]"]
Init --> AddIndex["添加笔记本列表页路由"]
AddIndex --> LoopNB["遍历 notebooks.tree"]
LoopNB --> Filter["过滤 pages 中属于该笔记本的笔记"]
Filter --> Sort["按 pinned 优先与 order_by 排序"]
Sort --> LoopTag["遍历该笔记本的 tagTree"]
LoopTag --> Slice["paginationWithEmpty(tag.path, notes, {layout:'notes', data:{...}})"]
Slice --> Push["routes.push(...)"]
Push --> NextNB["下一个笔记本"]
NextNB --> Done["返回 routes"]
```

**图表来源**
- [themes/stellar/scripts/generators/notebooks.js](file://themes/stellar/scripts/generators/notebooks.js#L5-L73)
- [themes/stellar/layout/notebooks.ejs](file://themes/stellar/layout/notebooks.ejs#L1-L9)

**章节来源**
- [themes/stellar/scripts/generators/notebooks.js](file://themes/stellar/scripts/generators/notebooks.js#L5-L73)
- [themes/stellar/layout/notebooks.ejs](file://themes/stellar/layout/notebooks.ejs#L1-L9)

### search 生成器
- 注册名：search_json_generator
- 条件：仅当 theme.config.search.service == 'local_search' 时生成
- 字段过滤：支持 field='post'|'page'|'all'
- 内容清洗：stripHTML、去除特定标签与实体、规范化空白
- 跳过规则：可通过 skip_search 模式匹配路径跳过索引
- 输出：JSON 字符串，路径由 theme.config.search.local_search.path 指定

```mermaid
flowchart TD
Start(["生成器入口"]) --> CheckService{"service == 'local_search'?"}
CheckService --> |否| ReturnEmpty["返回 {}"]
CheckService --> |是| SelectData["按 field 过滤 posts/pages"]
SelectData --> Iterate["遍历选中页面"]
Iterate --> MatchSkip{"skip_search 匹配?"}
MatchSkip --> |是| Skip["跳过"]
MatchSkip --> |否| Clean["stripHTML + 清洗内容"]
Clean --> BuildObj["构建索引对象 {title,path,content,tags,categories}"]
BuildObj --> PushRes["推入结果数组"]
PushRes --> Next["下一个页面"]
Next --> Serialize["JSON.stringify(res)"]
Serialize --> Return["返回 {path,data}"]
```

**图表来源**
- [themes/stellar/scripts/generators/search.js](file://themes/stellar/scripts/generators/search.js#L6-L101)
- [themes/stellar/_config.yml](file://themes/stellar/_config.yml#L206-L218)

**章节来源**
- [themes/stellar/scripts/generators/search.js](file://themes/stellar/scripts/generators/search.js#L6-L101)
- [themes/stellar/_config.yml](file://themes/stellar/_config.yml#L206-L218)

### tags 生成器
- 注册名：tags
- 条件：当 locals.tags 非空时生成
- 路径：使用 hexo.config.tag_dir + “/index.html”
- 模板：tags.ejs
- 数据：传递 locals.posts
- SEO：模板设置 robots=noindex,follow

```mermaid
flowchart TD
Start(["生成器入口"]) --> HasTags{"locals.tags 是否为空?"}
HasTags --> |否| ReturnEmpty["返回 {}"]
HasTags --> |是| BuildRoute["构建路由<br/>path=tag_dir/index.html<br/>layout=['tags']<br/>data=locals.posts"]
BuildRoute --> Render["渲染 tags.ejs"]
Render --> Output["输出标签列表页"]
```

**图表来源**
- [themes/stellar/scripts/generators/tags.js](file://themes/stellar/scripts/generators/tags.js#L5-L16)
- [themes/stellar/layout/tags.ejs](file://themes/stellar/layout/tags.ejs#L1-L21)

**章节来源**
- [themes/stellar/scripts/generators/tags.js](file://themes/stellar/scripts/generators/tags.js#L5-L16)
- [themes/stellar/layout/tags.ejs](file://themes/stellar/layout/tags.ejs#L1-L21)

### topic 生成器
- 注册名：index_topic
- 数据来源：主题配置 topic.tree
- 逻辑：若存在 topicIdList，则生成主页路由（index.html），使用 index_topic 布局
- 模板：index_topic.ejs

```mermaid
flowchart TD
Start(["生成器入口"]) --> CheckTree{"topic.tree 是否为空?"}
CheckTree --> |是| ReturnEmpty["返回 {}"]
CheckTree --> |否| BuildIndex["构建主页路由<br/>path=site_tree.index_topic.base_dir + '/index.html'<br/>layout=['index_topic']<br/>data={layout:'index_topic', menu_id}"]
BuildIndex --> Render["渲染 index_topic.ejs"]
Render --> Output["输出专栏主页"]
```

**图表来源**
- [themes/stellar/scripts/generators/topic.js](file://themes/stellar/scripts/generators/topic.js#L5-L22)
- [themes/stellar/layout/index_topic.ejs](file://themes/stellar/layout/index_topic.ejs#L1-L30)
- [themes/stellar/_config.yml](file://themes/stellar/_config.yml#L88-L90)

**章节来源**
- [themes/stellar/scripts/generators/topic.js](file://themes/stellar/scripts/generators/topic.js#L5-L22)
- [themes/stellar/layout/index_topic.ejs](file://themes/stellar/layout/index_topic.ejs#L1-L30)
- [themes/stellar/_config.yml](file://themes/stellar/_config.yml#L88-L90)

### wiki 生成器
- 注册名：wiki
- 数据来源：主题配置 wiki.tree 与 wiki.all_tags
- 逻辑：
  - 生成 wiki 主页（index.html），使用 index_wiki 布局
  - 若开启 all_tags，则为每个标签生成筛选页，传递 filter、tagName、title 等数据
- 模板：index_wiki.ejs

```mermaid
flowchart TD
Start(["生成器入口"]) --> CheckTree{"wiki.tree 是否为空?"}
CheckTree --> |是| ReturnEmpty["返回 {}"]
CheckTree --> |否| BuildIndex["构建主页路由<br/>path=site_tree.index_wiki.base_dir + '/index.html'<br/>layout=['index_wiki']<br/>data={layout:'index_wiki', menu_id, filter:false}"]
BuildIndex --> CheckTags{"wiki.all_tags 是否启用?"}
CheckTags --> |否| Done["返回路由数组"]
CheckTags --> |是| LoopTags["遍历 wiki.all_tags"]
LoopTags --> BuildFilter["为每个标签构建路由<br/>layout=['index_wiki'], data{filter:true, tagName, title}"]
BuildFilter --> Done
```

**图表来源**
- [themes/stellar/scripts/generators/wiki.js](file://themes/stellar/scripts/generators/wiki.js#L5-L39)
- [themes/stellar/layout/index_wiki.ejs](file://themes/stellar/layout/index_wiki.ejs#L1-L44)
- [themes/stellar/_config.yml](file://themes/stellar/_config.yml#L92-L96)

**章节来源**
- [themes/stellar/scripts/generators/wiki.js](file://themes/stellar/scripts/generators/wiki.js#L5-L39)
- [themes/stellar/layout/index_wiki.ejs](file://themes/stellar/layout/index_wiki.ejs#L1-L44)
- [themes/stellar/_config.yml](file://themes/stellar/_config.yml#L92-L96)

## 依赖分析
- 生成器与主题配置的耦合：
  - site_tree.*：控制页面路径与菜单标识
  - search.local_search.*：控制搜索字段、路径、内容与跳过规则
  - wiki.topic.notebook.*：控制 wiki、topic、notebook 的树形结构与菜单/侧栏配置
- 生成器与模板的耦合：
  - 每个生成器通过 layout 数组指定模板，模板负责渲染页面结构与 SEO 元数据
- 外部依赖：
  - hexo-pagination：用于 notebooks 的分页
  - hexo-util.stripHTML：用于 search 生成器的内容清洗

```mermaid
graph LR
CFG["_config.yml"] --> G404["404.js"]
CFG --> GA["author.js"]
CFG --> GCAT["categories.js"]
CFG --> GN["notebooks.js"]
CFG --> GS["search.js"]
CFG --> GTAG["tags.js"]
CFG --> GTOP["topic.js"]
CFG --> GWIKI["wiki.js"]
G404 --> T404["layout/404.ejs"]
GA --> T404
GCAT --> TCAT["layout/categories.ejs"]
GTAG --> TTAG["layout/tags.ejs"]
GN --> TN["layout/notebooks.ejs"]
GWIKI --> TWIKI["layout/index_wiki.ejs"]
GTOP --> TTOP["layout/index_topic.ejs"]
GN -.-> HP["hexo-pagination"]
GS -.-> HU["hexo-util.stripHTML"]
```

**图表来源**
- [themes/stellar/_config.yml](file://themes/stellar/_config.yml#L73-L152)
- [themes/stellar/scripts/generators/notebooks.js](file://themes/stellar/scripts/generators/notebooks.js#L11-L11)
- [themes/stellar/scripts/generators/search.js](file://themes/stellar/scripts/generators/search.js#L4-L4)

**章节来源**
- [themes/stellar/_config.yml](file://themes/stellar/_config.yml#L73-L152)
- [themes/stellar/scripts/generators/notebooks.js](file://themes/stellar/scripts/generators/notebooks.js#L11-L11)
- [themes/stellar/scripts/generators/search.js](file://themes/stellar/scripts/generators/search.js#L4-L4)

## 性能考虑
- 分页与大数据集
  - notebooks 使用 hexo-pagination，建议合理设置 per_page，避免单页过大导致内存与渲染压力。
  - 对空集合使用 paginationWithEmpty 占位，减少分支判断开销。
- 搜索索引生成
  - search 生成器按字段过滤与正则跳过，建议合理配置 skip_search，减少不必要的索引构建。
  - stripHTML 与内容清洗为 O(n) 操作，建议在内容体量较大时关注构建时间。
- 模板渲染
  - 模板中使用 partial 与 helper，注意避免重复计算与深层循环。
- 路由数量控制
  - author、wiki、notebooks 等生成器会按配置生成多个路由，建议在配置中精简不必要的条目。

[本节为通用性能建议，不直接分析具体文件]

## 故障排查指南
- 生成器未生效
  - 检查生成器是否正确注册（注册名与调用一致）
  - 检查主题配置中相关开关与路径是否正确
- 搜索索引为空
  - 确认 theme.config.search.service 是否为 'local_search'
  - 检查 field 配置与 skip_search 模式是否过于严格
  - 确认页面 front-matter 中 indexing 是否被设为 false
- 分类/标签页不生成
  - 确认 locals.categories/tags 是否存在数据
  - 检查 hexo.config.category_dir/tag_dir 是否正确
- 笔记本分页异常
  - 检查 notebooks.tree 与 notebook.per_page、order_by 配置
  - 确认 hexo-pagination 是否正常安装
- 404 页未生效
  - 检查 site_tree.error_page['404'] 路径与 robots 设置

**章节来源**
- [themes/stellar/scripts/generators/search.js](file://themes/stellar/scripts/generators/search.js#L6-L101)
- [themes/stellar/scripts/generators/categories.js](file://themes/stellar/scripts/generators/categories.js#L5-L16)
- [themes/stellar/scripts/generators/tags.js](file://themes/stellar/scripts/generators/tags.js#L5-L16)
- [themes/stellar/scripts/generators/notebooks.js](file://themes/stellar/scripts/generators/notebooks.js#L5-L73)
- [themes/stellar/scripts/generators/404.js](file://themes/stellar/scripts/generators/404.js#L5-L15)

## 结论
上述生成器围绕主题配置与 Hexo 本地数据，实现了博客、专栏、文档、笔记本、作者、分类、标签与搜索等页面的自动化生成。通过合理的配置与模板配合，可在保证 SEO 与可维护性的前提下，获得良好的构建性能与用户体验。建议在生产环境中：
- 明确各生成器的触发条件与输出路径
- 合理设置分页与搜索索引范围
- 保持配置与模板的一致性与最小化

[本节为总结性内容，不直接分析具体文件]

## 附录

### 生成器与模板映射表
- 404 → layout/404.ejs
- author → archive（模板文件未在本节列出）
- categories → layout/categories.ejs
- notebooks → layout/notebooks.ejs（列表页）、notes.ejs（笔记列表）
- search → JSON 输出（无模板）
- tags → layout/tags.ejs
- topic → layout/index_topic.ejs
- wiki → layout/index_wiki.ejs

**章节来源**
- [themes/stellar/layout/404.ejs](file://themes/stellar/layout/404.ejs#L1-L20)
- [themes/stellar/layout/categories.ejs](file://themes/stellar/layout/categories.ejs#L1-L24)
- [themes/stellar/layout/tags.ejs](file://themes/stellar/layout/tags.ejs#L1-L21)
- [themes/stellar/layout/index_wiki.ejs](file://themes/stellar/layout/index_wiki.ejs#L1-L44)
- [themes/stellar/layout/index_topic.ejs](file://themes/stellar/layout/index_topic.ejs#L1-L30)
- [themes/stellar/layout/notebooks.ejs](file://themes/stellar/layout/notebooks.ejs#L1-L9)