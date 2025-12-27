# 主题切换器功能文档

## 概述

主题切换器是一个前端功能，允许用户在不同的 Hexo 主题之间动态切换，无需重新构建网站。

## 功能特性

### 🎨 核心功能
- **动态主题切换**: 无刷新切换主题
- **主题预览**: 每个主题都有预览图
- **用户偏好保存**: 记住用户选择的主题
- **响应式设计**: 支持桌面端和移动端
- **平滑过渡**: 主题切换时的动画效果

### 🛠️ 技术特性
- **多主题构建**: 自动为每个主题生成独立资源
- **资源管理**: 动态加载/卸载主题资源
- **错误处理**: 优雅处理主题加载失败
- **性能优化**: 按需加载主题资源

## 支持的主题

当前支持以下主题：

| 主题名称 | 显示名称 | 描述 | 状态 |
|---------|---------|------|------|
| stellar | Stellar | 简洁优雅的现代主题 | ✅ 支持 |
| anzhiyu | AnZhiYu | 美观的个人博客主题 | ✅ 支持 |
| butterfly | Butterfly | 功能丰富的蝴蝶主题 | ✅ 支持 |
| icarus | Icarus | 响应式的简约主题 | ✅ 支持 |
| diaspora | Diaspora | 摄影风格的主题 | ✅ 支持 |

## 使用方法

### 用户使用

1. **打开主题切换器**
   - 点击页面右上角的主题切换按钮
   - 按钮显示当前主题名称和调色板图标

2. **选择主题**
   - 在弹出的面板中浏览可用主题
   - 每个主题显示预览图、名称和描述
   - 点击任意主题进行切换

3. **主题切换**
   - 切换过程中会显示加载状态
   - 切换完成后显示成功消息
   - 用户选择会自动保存到本地存储

### 开发者集成

1. **引入主题切换器**
   ```html
   <script src="/js/theme-switcher.js"></script>
   ```

2. **监听主题切换事件**
   ```javascript
   document.addEventListener('themeChanged', (e) => {
     console.log('主题已切换到:', e.detail.theme);
   });
   ```

3. **手动切换主题**
   ```javascript
   // 获取主题切换器实例
   const switcher = window.themeSwitcher;
   
   // 切换到指定主题
   switcher.switchTheme('anzhiyu');
   ```

## 构建配置

### 多主题构建

使用多主题构建脚本为所有主题生成资源：

```bash
# 构建所有主题
npm run build:multi-theme

# 构建指定主题
npm run build:theme stellar

# 列出可用主题
node scripts/build-multi-theme.js --list
```

### 构建流程

1. **备份配置**: 保存原始 `_config.yml`
2. **循环构建**: 为每个主题更新配置并构建
3. **资源复制**: 将主题资源复制到独立目录
4. **配置生成**: 生成主题配置 JSON 文件
5. **恢复配置**: 恢复原始配置文件

### 目录结构

```
public/
├── themes/
│   ├── stellar/
│   │   ├── css/
│   │   └── js/
│   ├── anzhiyu/
│   │   ├── css/
│   │   └── js/
│   └── ...
├── theme-config.json
└── js/
    └── theme-switcher.js
```

## 配置选项

### 主题配置

在 `theme-switcher.js` 中配置可用主题：

```javascript
this.availableThemes = [
  {
    name: 'stellar',
    displayName: 'Stellar',
    description: '简洁优雅的现代主题',
    preview: '/img/theme-previews/stellar.jpg'
  },
  // 更多主题...
];
```

### 样式自定义

主题切换器的样式可以通过 CSS 变量自定义：

```css
.theme-switcher {
  --switcher-bg: rgba(255, 255, 255, 0.9);
  --switcher-border: rgba(0, 0, 0, 0.1);
  --switcher-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  --accent-color: #6366f1;
}
```

## API 参考

### ThemeSwitcher 类

#### 构造函数
```javascript
new ThemeSwitcher()
```

#### 方法

##### `switchTheme(themeName)`
切换到指定主题
- **参数**: `themeName` (string) - 主题名称
- **返回**: Promise
- **示例**: `switcher.switchTheme('anzhiyu')`

##### `getCurrentTheme()`
获取当前主题名称
- **返回**: string
- **示例**: `const theme = switcher.getCurrentTheme()`

##### `getThemeDisplayName(themeName)`
获取主题显示名称
- **参数**: `themeName` (string) - 主题名称
- **返回**: string
- **示例**: `const name = switcher.getThemeDisplayName('stellar')`

#### 事件

##### `themeChanged`
主题切换完成时触发
```javascript
document.addEventListener('themeChanged', (e) => {
  console.log('新主题:', e.detail.theme);
});
```

## 添加新主题

### 1. 安装主题
将新主题放入 `themes/` 目录

### 2. 添加预览图
在 `source/img/theme-previews/` 目录添加主题预览图

### 3. 更新配置
在 `theme-switcher.js` 的 `availableThemes` 数组中添加主题配置

### 4. 重新构建
运行多主题构建命令生成新主题的资源

## 故障排除

### 常见问题

1. **主题切换失败**
   - 检查主题资源文件是否存在
   - 查看浏览器控制台错误信息
   - 确认主题配置正确

2. **预览图不显示**
   - 检查图片文件路径
   - 确认图片文件存在
   - 检查图片格式是否支持

3. **样式冲突**
   - 检查主题间的 CSS 冲突
   - 确认主题资源正确加载/卸载
   - 清除浏览器缓存

### 调试模式

启用调试模式查看详细日志：

```javascript
// 在浏览器控制台中启用调试
localStorage.setItem('theme-switcher-debug', 'true');
```

## 性能优化

### 资源优化
- 主题资源按需加载
- 使用 CSS 和 JS 压缩
- 启用浏览器缓存

### 用户体验
- 平滑的切换动画
- 加载状态指示
- 错误处理和重试机制

## 浏览器兼容性

| 浏览器 | 版本要求 | 支持状态 |
|--------|---------|---------|
| Chrome | 60+ | ✅ 完全支持 |
| Firefox | 55+ | ✅ 完全支持 |
| Safari | 12+ | ✅ 完全支持 |
| Edge | 79+ | ✅ 完全支持 |
| IE | - | ❌ 不支持 |

## 更新日志

### v1.0.0 (2025-12-28)
- ✨ 初始版本发布
- 🎨 支持 5 个主题切换
- 📱 响应式设计
- 💾 用户偏好保存
- 🔧 多主题构建脚本

## 贡献指南

欢迎贡献代码和建议！请查看 [CONTRIBUTING.md](../CONTRIBUTING.md) 了解详细信息。

## 许可证

本项目采用 MIT 许可证，详见 [LICENSE](../LICENSE) 文件。