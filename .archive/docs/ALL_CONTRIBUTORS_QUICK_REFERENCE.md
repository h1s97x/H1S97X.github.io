# All Contributors 快速参考

## 快速命令

### 添加贡献者

```bash
# 交互式添加
npm run contributors:add

# 直接添加
npx all-contributors add <username> <type>

# 添加多种贡献
npx all-contributors add <username> <type1,type2,type3>
```

### 生成列表

```bash
npm run contributors:generate
```

### 检查配置

```bash
npm run contributors:check
```

## 常用贡献类型

| 类型 | Emoji | 说明 |
|------|-------|------|
| code | 💻 | 代码贡献 |
| doc | 📖 | 文档贡献 |
| design | 🎨 | 设计贡献 |
| bug | 🐛 | Bug 报告 |
| ideas | 💡 | 想法建议 |
| test | ⚠️ | 测试 |
| tool | 🔧 | 工具开发 |
| maintenance | 🚧 | 维护工作 |
| question | 🤔 | 回答问题 |
| review | 💬 | 代码审查 |

## 使用示例

### 添加代码贡献者

```bash
npx all-contributors add h1s97x code
```

### 添加文档贡献者

```bash
npx all-contributors add contributor doc
```

### 添加多种贡献

```bash
npx all-contributors add kiro code,doc,design
```

### 在 PR 中使用 Bot

```
@all-contributors please add @username for code, doc
```

## 工作流程

1. **有人贡献** → 2. **添加贡献者** → 3. **自动更新 README** → 4. **推送到远程**

```bash
# 步骤 2
npx all-contributors add username type

# 步骤 4
git push origin main
```

## 配置文件

位置：`.all-contributorsrc`

关键配置：
- `imageSize`: 头像大小（默认 100）
- `contributorsPerLine`: 每行显示数量（默认 7）
- `commit`: 是否自动提交（默认 true）

## 故障排除

### 命令找不到
```bash
npm install
npx all-contributors add username code
```

### README 未更新
```bash
# 检查标记
grep "ALL-CONTRIBUTORS" README.md

# 手动生成
npx all-contributors generate
```

### 头像不显示
```bash
# 验证用户名
curl https://api.github.com/users/username
```

## 完整文档

详细说明请查看：
- [ALL_CONTRIBUTORS_GUIDE.md](./ALL_CONTRIBUTORS_GUIDE.md)
- [ISSUE_ALL_CONTRIBUTORS.md](./ISSUE_ALL_CONTRIBUTORS.md)

## 在线资源

- [官网](https://allcontributors.org/)
- [Emoji Key](https://allcontributors.org/docs/en/emoji-key)
- [CLI 文档](https://allcontributors.org/docs/en/cli/overview)
