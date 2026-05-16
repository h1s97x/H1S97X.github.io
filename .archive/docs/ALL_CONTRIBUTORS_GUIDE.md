# All Contributors 使用指南

本指南详细说明如何在项目中使用 All Contributors 工具管理贡献者。

## 目录

1. [简介](#简介)
2. [快速开始](#快速开始)
3. [添加贡献者](#添加贡献者)
4. [贡献类型](#贡献类型)
5. [配置说明](#配置说明)
6. [工作流程](#工作流程)
7. [最佳实践](#最佳实践)
8. [故障排除](#故障排除)

## 简介

[All Contributors](https://allcontributors.org/) 是一个开源项目贡献者管理规范，帮助项目：
- 记录和展示各类贡献者
- 自动化管理贡献者列表
- 使用统一的贡献类型标准
- 激励社区参与

## 快速开始

### 安装

项目已安装 all-contributors-cli：

```bash
npm install
```

### 添加第一个贡献者

```bash
# 交互式添加
npx all-contributors add

# 或直接指定
npx all-contributors add username code
```

### 生成贡献者列表

```bash
npx all-contributors generate
```

## 添加贡献者

### 方法 1: 交互式命令（推荐新手）

```bash
npx all-contributors add
```

按提示输入：
1. **GitHub 用户名**：贡献者的 GitHub 用户名
2. **贡献类型**：从列表中选择（可多选，用逗号分隔）

示例：
```
? Who is the contributor? h1s97x
? What type of contribution? code, doc, design
```

### 方法 2: 命令行直接添加（推荐熟练用户）

```bash
# 基本语法
npx all-contributors add <username> <contribution1,contribution2,...>

# 示例
npx all-contributors add h1s97x code
npx all-contributors add kiro code,doc
npx all-contributors add contributor bug,ideas
```

### 方法 3: GitHub Bot（推荐用于 PR）

在 Pull Request 或 Issue 中评论：

```
@all-contributors please add @username for code, doc
```

Bot 会自动：
1. 添加贡献者到配置文件
2. 更新 README.md
3. 创建提交

## 贡献类型

### 常用类型

| Emoji | 类型 | 说明 | 使用场景 |
|-------|------|------|----------|
| 💻 | code | 代码 | 提交代码、修复 Bug |
| 📖 | doc | 文档 | 编写/改进文档 |
| 🎨 | design | 设计 | UI/UX 设计 |
| 💡 | ideas | 想法 | 提出新功能想法 |
| 🐛 | bug | Bug 报告 | 报告 Bug |
| 🤔 | question | 问答 | 回答问题 |
| 🚧 | maintenance | 维护 | 项目维护工作 |
| 🔧 | tool | 工具 | 开发工具 |
| 🌍 | translation | 翻译 | 翻译文档 |
| ⚠️ | test | 测试 | 编写测试 |

### 完整类型列表

| Emoji | 类型 | 说明 |
|-------|------|------|
| 📝 | blog | 博客文章 |
| 💬 | review | 代码审查 |
| 🎤 | talk | 演讲/分享 |
| 📹 | video | 视频教程 |
| 👀 | infra | 基础设施 |
| 📆 | eventOrganizing | 活动组织 |
| 💵 | financial | 财务支持 |
| 🔍 | fundingFinding | 寻找资金 |
| 🚇 | platform | 平台支持 |
| 🔌 | plugin | 插件开发 |
| 📢 | promotion | 推广 |
| 🔒 | security | 安全 |
| 🎓 | tutorial | 教程 |
| 📓 | userTesting | 用户测试 |
| 💼 | business | 商业开发 |
| 🖋 | content | 内容创作 |
| 🤝 | mentoring | 指导 |
| 🚀 | projectManagement | 项目管理 |

完整列表：https://allcontributors.org/docs/en/emoji-key

## 配置说明

### 配置文件位置

`.all-contributorsrc`

### 配置项说明

```json
{
  "projectName": "H1S97X.github.io",
  "projectOwner": "H1S97X",
  "repoType": "github",
  "repoHost": "https://github.com",
  "files": ["README.md"],
  "imageSize": 100,
  "commit": true,
  "commitConvention": "angular",
  "contributors": [],
  "contributorsPerLine": 7,
  "linkToUsage": true
}
```

| 字段 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| projectName | string | 项目名称 | - |
| projectOwner | string | 项目所有者 | - |
| repoType | string | 仓库类型（github/gitlab） | github |
| repoHost | string | 仓库地址 | https://github.com |
| files | array | 要更新的文件列表 | ["README.md"] |
| imageSize | number | 头像大小（像素） | 100 |
| commit | boolean | 是否自动提交 | false |
| commitConvention | string | 提交信息规范 | none |
| contributors | array | 贡献者列表 | [] |
| contributorsPerLine | number | 每行显示贡献者数量 | 7 |
| linkToUsage | boolean | 是否链接到使用说明 | false |

### 自定义配置

#### 修改头像大小

```json
{
  "imageSize": 80
}
```

适用场景：
- 小头像（60-80px）：节省空间
- 中头像（100px）：默认，平衡美观和空间
- 大头像（120-150px）：突出贡献者

#### 修改每行显示数量

```json
{
  "contributorsPerLine": 5
}
```

建议：
- 5-6 个：适合移动端
- 7 个：默认，适合桌面端
- 8-10 个：适合宽屏

#### 更新多个文件

```json
{
  "files": [
    "README.md",
    "docs/CONTRIBUTORS.md",
    "CONTRIBUTING.md"
  ]
}
```

#### 自定义提交信息

```json
{
  "commit": true,
  "commitConvention": "angular",
  "commitType": "docs"
}
```

提交信息格式：
```
docs: add @username as a contributor
```

## 工作流程

### 场景 1: 合并代码 PR

```bash
# 1. 审查并合并 PR
git merge pr-branch

# 2. 添加贡献者
npx all-contributors add contributor-name code

# 3. 推送更新
git push origin main
```

### 场景 2: 文档改进

```bash
# 1. 收到文档 PR
# 2. 在 PR 中评论
@all-contributors please add @contributor for doc

# 3. Bot 自动处理
# 4. 合并 PR
```

### 场景 3: Bug 报告

```bash
# 1. 用户报告了有价值的 Bug
# 2. 添加为贡献者
npx all-contributors add reporter-name bug

# 3. 在 Issue 中感谢
# 4. 推送更新
```

### 场景 4: 批量添加

```bash
# 添加多个贡献者
npx all-contributors add user1 code
npx all-contributors add user2 doc
npx all-contributors add user3 design

# 一次性生成
npx all-contributors generate

# 提交
git add .
git commit -m "docs: add contributors"
git push
```

## 最佳实践

### 1. 及时添加

✅ **推荐**：
- 在合并 PR 时立即添加
- 在关闭有价值的 Issue 时添加

❌ **避免**：
- 等到项目结束才批量添加
- 遗漏小的贡献

### 2. 准确标记

✅ **推荐**：
```bash
# 代码贡献
npx all-contributors add user code

# 文档改进
npx all-contributors add user doc

# 多种贡献
npx all-contributors add user code,doc,test
```

❌ **避免**：
```bash
# 标记不准确
npx all-contributors add user code  # 实际只改了文档
```

### 3. 使用自动化

✅ **推荐**：
- 在 PR 中使用 Bot
- 配置自动提交
- 使用 npm scripts

❌ **避免**：
- 完全手动管理
- 忘记更新

### 4. 保持一致

✅ **推荐**：
- 使用统一的贡献类型
- 遵循提交规范
- 定期检查配置

❌ **避免**：
- 随意使用贡献类型
- 不一致的命名

### 5. 定期维护

```bash
# 每月检查一次
npm run contributors:check

# 重新生成（如果手动修改了配置）
npm run contributors:generate

# 验证 README 格式
cat README.md | grep "ALL-CONTRIBUTORS"
```

## 故障排除

### 问题 1: 命令找不到

**现象**：
```
'all-contributors' is not recognized as an internal or external command
```

**原因**：
- 未安装依赖
- 未使用 npx

**解决**：
```bash
# 安装依赖
npm install

# 使用 npx
npx all-contributors add username code
```

### 问题 2: 配置文件错误

**现象**：
```
Error: Invalid configuration
```

**原因**：
- JSON 格式错误
- 缺少必需字段

**解决**：
```bash
# 验证 JSON 格式
cat .all-contributorsrc | jq .

# 检查必需字段
# - projectName
# - projectOwner
# - files
```

### 问题 3: README 未更新

**现象**：
添加贡献者后 README 没有变化

**原因**：
- 缺少注释标记
- 文件路径错误

**解决**：
```bash
# 1. 检查 README 中是否有标记
grep "ALL-CONTRIBUTORS" README.md

# 2. 确认标记格式正确
# <!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
# <!-- ALL-CONTRIBUTORS-LIST:END -->

# 3. 手动生成
npx all-contributors generate
```

### 问题 4: 头像不显示

**现象**：
贡献者头像显示为占位符或 404

**原因**：
- GitHub 用户名错误
- 网络问题
- API 缓存

**解决**：
```bash
# 1. 验证用户名
curl https://api.github.com/users/username

# 2. 检查配置
cat .all-contributorsrc | jq '.contributors'

# 3. 重新生成
npx all-contributors generate
```

### 问题 5: 自动提交失败

**现象**：
```
Error: Command failed: git commit
```

**原因**：
- Git 未配置
- 没有更改
- 权限问题

**解决**：
```bash
# 1. 配置 Git
git config user.name "Your Name"
git config user.email "your@email.com"

# 2. 检查是否有更改
git status

# 3. 手动提交
git add .
git commit -m "docs: add contributors"
```

### 问题 6: 贡献类型不生效

**现象**：
添加的贡献类型没有显示对应的 emoji

**原因**：
- 类型名称拼写错误
- 使用了不支持的类型

**解决**：
```bash
# 查看支持的类型
npx all-contributors add --help

# 使用正确的类型名称
# 正确: code, doc, design
# 错误: coding, document, ui
```

## 高级用法

### 批量导入贡献者

创建脚本 `scripts/import-contributors.js`：

```javascript
const { exec } = require('child_process');

const contributors = [
  { name: 'user1', types: ['code', 'doc'] },
  { name: 'user2', types: ['design'] },
  { name: 'user3', types: ['bug', 'ideas'] }
];

contributors.forEach(({ name, types }) => {
  const command = `npx all-contributors add ${name} ${types.join(',')}`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error adding ${name}:`, error);
      return;
    }
    console.log(`Added ${name} for ${types.join(', ')}`);
  });
});
```

运行：
```bash
node scripts/import-contributors.js
```

### 自定义模板

修改 `.all-contributorsrc`：

```json
{
  "badgeTemplate": "[![All Contributors](https://img.shields.io/badge/all_contributors-<%= contributors.length %>-orange.svg?style=for-the-badge)](#contributors-)",
  "contributorTemplate": "<%= contributor %>"
}
```

### 集成到 CI/CD

在 `.github/workflows/contributors.yml`：

```yaml
name: Update Contributors

on:
  pull_request:
    types: [closed]

jobs:
  update:
    if: github.event.pull_request.merged == true
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npx all-contributors add ${{ github.event.pull_request.user.login }} code
      - run: npx all-contributors generate
      - uses: stefanzweifel/git-auto-commit-action@v4
        with:
          commit_message: "docs: add contributor"
```

## 相关资源

- [All Contributors 官网](https://allcontributors.org/)
- [CLI 文档](https://allcontributors.org/docs/en/cli/overview)
- [Emoji Key](https://allcontributors.org/docs/en/emoji-key)
- [GitHub Bot](https://allcontributors.org/docs/en/bot/overview)
- [规范说明](https://github.com/all-contributors/all-contributors)

## 常见问题

### Q: 如何移除贡献者？

A: 手动编辑 `.all-contributorsrc`，从 `contributors` 数组中删除对应项，然后运行 `npx all-contributors generate`。

### Q: 可以修改已添加的贡献类型吗？

A: 可以。手动编辑 `.all-contributorsrc`，修改贡献者的 `contributions` 数组，然后重新生成。

### Q: 支持私有仓库吗？

A: 支持。配置 `repoHost` 和 `repoType` 即可。

### Q: 如何自定义头像？

A: All Contributors 使用 GitHub 头像，无法自定义。但可以修改 `imageSize` 调整大小。

### Q: 可以在多个文件中显示吗？

A: 可以。在 `files` 数组中添加多个文件路径。

## 总结

All Contributors 是一个强大的贡献者管理工具，通过：
- 🎯 规范化的贡献类型
- 🤖 自动化的管理流程
- 🎨 美观的展示效果
- 🌍 社区广泛认可

帮助项目更好地记录和展示每一位贡献者的付出。

开始使用：
```bash
npx all-contributors add your-name code
```
