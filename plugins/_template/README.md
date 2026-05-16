# Plugin: XXX

> 插件描述

## 功能

- 功能 1
- 功能 2

## 安装

```bash
# 将此目录复制到 plugins/ 目录
cp -r plugins/plugin-xxx ../your-blog/plugins/
```

## 配置

在 `_config.yml` 中添加:

```yaml
plugins:
  plugin-xxx:
    enabled: true
    option1: value1
```

## 使用

### 标签用法

```
{% xxx-tag arg1 arg2 %}
```

### 配置示例

```yaml
# _config.yml
```

## 开发

```bash
# 运行测试
pnpm test

# 构建
pnpm build
```

## License

MIT
