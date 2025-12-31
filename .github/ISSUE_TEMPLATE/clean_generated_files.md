---
name: 清理Hexo生成的静态文件
about: 清理项目中的Hexo生成文件，只保留源码和项目框架
title: '[CLEANUP] 清理Hexo生成的静态文件，准备源码分支'
labels: 'cleanup, structure, deployment, maintenance'
assignees: ''
---

## 🎯 任务目标

清理项目中所有由Hexo生成的静态文件，只保留源码和项目框架，为实施GitHub分支分离方案做准备。

## 📋 需要清理的文件类型

### 🗂️ 生成的HTML文件和目录
- `public/` - Hexo生成的完整静态网站目录
- `index.html` - 根目录首页文件
- `2020/`, `2023/`, `2024/`, `2025/` - 年份归档目录
- `archives/` - 归档页面目录
- `categories/` - 分类页面目录  
- `tags/` - 标签页面目录
- `page/` - 分页目录
- `search/` - 搜索页面目录

### 📄 生成的配置和索引文件
- `atom.xml` - RSS订阅文件
- `search.xml` - 搜索索引文件
- `sitemap.xml` - 网站地图
- `sitemap.txt` - 文本格式网站地图
- `db.json` - Hexo数据库文件
- `CNAME` - GitHub Pages域名配置（如果是生成的）

### 🎨 生成的静态资源
- `css/` - 样式文件目录（生成的）
- `js/` - JavaScript文件目录（生成的）
- `img/` - 图片资源目录（生成的）
- `music/` - 音乐文件目录（生成的）
- `assets/` - 其他资源文件（生成的）
- `photoswipe/` - 图片查看器资源

### 🔧 临时和缓存文件
- `*.log` - 日志文件
- `.deploy_git/` - Git部署临时目录
- `node_modules/` - 依赖包目录（保留但添加到.gitignore）

## ✅ 需要保留的源码文件

### 📝 内容源文件
- `source/` - Markdown文章源文件目录
- `scaffolds/` - 文章模板目录

### 🎨 主题和配置
- `themes/` - 主题文件目录
- `_config.yml` - Hexo主配置文件
- `_config.*.yml` - 主题配置文件

### 🛠️ 开发工具
- `tools/` - 开发工具脚本目录
- `test/` - 测试文件目录
- `package.json` - 项目依赖配置
- `package-lock.json` - 依赖锁定文件
- `eslint.config.js` - ESLint配置

### 📚 项目文档
- `docs/` - 项目文档目录
- `README.md` - 项目说明文件
- `DEPLOYMENT_CHECKLIST.md` - 部署检查清单
- `FILE_ORGANIZATION_GUIDE.md` - 文件组织指南
- `STELLAR_CONFIG_GUIDE.md` - Stellar主题配置指南

### ⚙️ 配置文件
- `.github/` - GitHub配置目录
- `.gitignore` - Git忽略规则
- `.husky/` - Git钩子配置

## 🔍 清理前状态检查

### 当前项目结构分析
```bash
# 统计生成文件数量
find . -name "*.html" -not -path "./source/*" -not -path "./themes/*" | wc -l
find . -name "*.xml" -not -path "./source/*" | wc -l
find . -type d -name "20*" | wc -l
```

### 预计清理的文件数量
- **HTML文件**: 约180+个生成的页面文件
- **目录**: 约20+个生成的目录
- **配置文件**: 约8个生成的配置和索引文件
- **总计**: 预计清理200+个文件和目录

## 🛠️ 清理执行计划

### 阶段一：自动化清理（推荐）
```bash
# 使用准备好的工具脚本
npm run prepare-source

# 或者直接运行
node tools/prepare-source-branch.js
```

### 阶段二：手动清理（备选）
```bash
# 删除生成的HTML目录
rm -rf public/ 2020/ 2023/ 2024/ 2025/
rm -rf archives/ categories/ tags/ page/ search/

# 删除生成的静态资源
rm -rf css/ js/ img/ music/ assets/ photoswipe/

# 删除生成的配置文件
rm -f index.html atom.xml search.xml sitemap.xml sitemap.txt db.json

# 删除临时文件
rm -rf .deploy_git/ *.log
```

### 阶段三：更新.gitignore
确保以下规则存在于.gitignore中：
```gitignore
# Hexo generated files
public/
db.json
*.log
.deploy_git/

# Generated static files
index.html
atom.xml
search.xml
sitemap.xml
sitemap.txt
CNAME

# Year directories (generated)
2020/
2023/
2024/
2025/
archives/
categories/
tags/
page/
search/
css/
js/
img/
music/
assets/
photoswipe/

# Node.js
node_modules/
```

## ⚠️ 注意事项

### 🔒 安全提醒
1. **备份重要文件**: 清理前确保重要的自定义文件已备份
2. **检查自定义资源**: 确认css/、js/、img/等目录中没有手动添加的重要文件
3. **验证主题文件**: 确保themes/目录中的自定义修改不会丢失

### 📝 清理后验证
1. **源码完整性**: 确认source/目录中的所有文章文件完整
2. **配置文件**: 确认_config.yml等配置文件未被误删
3. **工具脚本**: 确认tools/目录中的脚本文件完整
4. **构建测试**: 运行`npm run build`确认可以正常生成静态文件

## 📊 预期效果

### 🎯 清理后的项目结构
```
├── source/                 # 文章源文件 ✅
├── themes/                 # 主题文件 ✅
├── tools/                  # 工具脚本 ✅
├── test/                   # 测试文件 ✅
├── docs/                   # 项目文档 ✅
├── .github/                # GitHub配置 ✅
├── _config.yml             # 主配置 ✅
├── package.json            # 依赖配置 ✅
├── .gitignore              # 忽略规则 ✅
└── (无生成文件)            # 清理完成 🎉
```

### 📈 预期收益
1. **仓库体积减小**: 减少200+个生成文件
2. **版本控制清晰**: 只追踪源码变更
3. **构建速度提升**: 减少Git操作的文件数量
4. **协作体验改善**: 避免生成文件的合并冲突

## 🔄 后续步骤

清理完成后的下一步操作：

1. **提交清理结果**:
   ```bash
   git add .
   git commit -m "clean: remove generated files, prepare source branch"
   ```

2. **推送到远程**:
   ```bash
   git push origin master
   ```

3. **创建部署分支**:
   ```bash
   # 使用自动化部署脚本
   npm run deploy
   ```

4. **配置GitHub Pages**:
   - 在仓库设置中将Pages源设置为gh-pages分支
   - 验证自动部署流程正常工作

## 📋 检查清单

- [ ] 备份重要的自定义文件
- [ ] 运行清理脚本或手动清理
- [ ] 验证源码文件完整性
- [ ] 更新.gitignore文件
- [ ] 测试构建流程
- [ ] 提交清理结果
- [ ] 推送到远程仓库
- [ ] 创建部署分支
- [ ] 配置GitHub Pages
- [ ] 验证网站正常访问

---

**优先级**: 高  
**预估工作量**: 30分钟  
**技术难度**: 低  
**影响范围**: 整个项目结构  
**风险等级**: 低（有备份和恢复机制）