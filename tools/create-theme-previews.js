#!/usr/bin/env node

/**
 * 创建主题预览图片占位符
 */

const fs = require('fs');
const path = require('path');

const themes = ['stellar', 'anzhiyu', 'butterfly', 'icarus', 'diaspora', 'default'];
const previewsDir = path.join(__dirname, '../source/img/theme-previews');

// 确保目录存在
if (!fs.existsSync(previewsDir)) {
  fs.mkdirSync(previewsDir, { recursive: true });
}

// 创建简单的 SVG 占位符
function createSVGPlaceholder(themeName, width = 300, height = 200) {
  const colors = {
    'stellar': '#6366f1',
    'anzhiyu': '#ff6b6b',
    'butterfly': '#4ecdc4',
    'icarus': '#45b7d1',
    'diaspora': '#96ceb4',
    'default': '#95a5a6'
  };
  
  const color = colors[themeName] || colors.default;
  const displayName = themeName.charAt(0).toUpperCase() + themeName.slice(1);
  
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${color}"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" font-weight="bold" 
        text-anchor="middle" dominant-baseline="middle" fill="white">
    ${displayName}
  </text>
  <text x="50%" y="70%" font-family="Arial, sans-serif" font-size="14" 
        text-anchor="middle" dominant-baseline="middle" fill="rgba(255,255,255,0.8)">
    主题预览
  </text>
</svg>`;
}

// 为每个主题创建占位符
themes.forEach(theme => {
  const svgContent = createSVGPlaceholder(theme);
  const filePath = path.join(previewsDir, `${theme}.svg`);
  
  fs.writeFileSync(filePath, svgContent);
  console.log(`已创建 ${theme} 主题预览占位符: ${filePath}`);
});

console.log('\n✅ 所有主题预览占位符创建完成！');
console.log('📝 提示：您可以稍后用实际的主题截图替换这些 SVG 文件');