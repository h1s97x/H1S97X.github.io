#!/usr/bin/env node

/**
 * 多主题构建脚本
 * 为每个主题生成独立的 CSS 和 JS 文件
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class MultiThemeBuilder {
  constructor() {
    this.themesDir = path.join(__dirname, '../themes');
    this.publicDir = path.join(__dirname, '../public');
    this.configFile = path.join(__dirname, '../_config.yml');
    this.originalConfig = null;
  }

  /**
   * 获取可用主题列表
   */
  getAvailableThemes() {
    try {
      const themes = fs.readdirSync(this.themesDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
        .filter(name => name !== '.git' && !name.startsWith('.'));
      
      console.log(`发现 ${themes.length} 个主题:`, themes.join(', '));
      return themes;
    } catch (error) {
      console.error('读取主题目录失败:', error);
      return [];
    }
  }

  /**
   * 备份原始配置
   */
  backupConfig() {
    try {
      this.originalConfig = fs.readFileSync(this.configFile, 'utf8');
      console.log('已备份原始配置文件');
    } catch (error) {
      console.error('备份配置文件失败:', error);
      throw error;
    }
  }

  /**
   * 恢复原始配置
   */
  restoreConfig() {
    if (this.originalConfig) {
      try {
        fs.writeFileSync(this.configFile, this.originalConfig);
        console.log('已恢复原始配置文件');
      } catch (error) {
        console.error('恢复配置文件失败:', error);
      }
    }
  }

  /**
   * 更新配置文件中的主题
   */
  updateThemeConfig(themeName) {
    try {
      let config = fs.readFileSync(this.configFile, 'utf8');
      config = config.replace(/^theme:\s*.+$/m, `theme: ${themeName}`);
      fs.writeFileSync(this.configFile, config);
      console.log(`已更新配置文件，当前主题: ${themeName}`);
    } catch (error) {
      console.error('更新配置文件失败:', error);
      throw error;
    }
  }

  /**
   * 构建指定主题
   */
  buildTheme(themeName) {
    console.log(`\n开始构建主题: ${themeName}`);
    
    try {
      // 更新配置文件
      this.updateThemeConfig(themeName);
      
      // 清理之前的构建
      execSync('npx hexo clean', { stdio: 'inherit' });
      
      // 生成静态文件
      execSync('npx hexo generate', { stdio: 'inherit' });
      
      // 复制主题特定的资源文件
      this.copyThemeAssets(themeName);
      
      console.log(`主题 ${themeName} 构建完成`);
      
    } catch (error) {
      console.error(`构建主题 ${themeName} 失败:`, error.message);
      throw error;
    }
  }

  /**
   * 复制主题资源文件
   */
  copyThemeAssets(themeName) {
    const themePublicDir = path.join(this.publicDir, 'themes', themeName);
    const themeCssDir = path.join(this.publicDir, 'css');
    const themeJsDir = path.join(this.publicDir, 'js');
    
    try {
      // 创建主题目录
      if (!fs.existsSync(themePublicDir)) {
        fs.mkdirSync(themePublicDir, { recursive: true });
      }
      
      // 复制 CSS 文件
      if (fs.existsSync(themeCssDir)) {
        const themeCssTarget = path.join(themePublicDir, 'css');
        this.copyDirectory(themeCssDir, themeCssTarget);
      }
      
      // 复制 JS 文件
      if (fs.existsSync(themeJsDir)) {
        const themeJsTarget = path.join(themePublicDir, 'js');
        this.copyDirectory(themeJsDir, themeJsTarget);
      }
      
      console.log(`已复制主题 ${themeName} 的资源文件`);
      
    } catch (error) {
      console.error('复制主题资源失败:', error);
    }
  }

  /**
   * 递归复制目录
   */
  copyDirectory(src, dest) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    const entries = fs.readdirSync(src, { withFileTypes: true });
    
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      
      if (entry.isDirectory()) {
        this.copyDirectory(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }

  /**
   * 构建所有主题
   */
  async buildAllThemes() {
    const themes = this.getAvailableThemes();
    
    if (themes.length === 0) {
      console.log('没有找到可用的主题');
      return;
    }

    // 备份原始配置
    this.backupConfig();

    try {
      for (const theme of themes) {
        await this.buildTheme(theme);
      }
      
      console.log('\n✅ 所有主题构建完成！');
      
      // 生成主题配置文件
      this.generateThemeConfig(themes);
      
    } catch (error) {
      console.error('\n❌ 构建过程中出现错误:', error);
    } finally {
      // 恢复原始配置
      this.restoreConfig();
    }
  }

  /**
   * 生成主题配置文件
   */
  generateThemeConfig(themes) {
    const config = {
      themes: themes.map(theme => ({
        name: theme,
        displayName: this.getThemeDisplayName(theme),
        description: this.getThemeDescription(theme),
        preview: `/img/theme-previews/${theme}.jpg`,
        cssPath: `/themes/${theme}/css/main.css`,
        jsPath: `/themes/${theme}/js/main.js`
      })),
      default: themes[0] || 'stellar',
      buildTime: new Date().toISOString()
    };

    const configPath = path.join(this.publicDir, 'theme-config.json');
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    
    console.log('已生成主题配置文件:', configPath);
  }

  /**
   * 获取主题显示名称
   */
  getThemeDisplayName(themeName) {
    const displayNames = {
      'stellar': 'Stellar',
      'anzhiyu': 'AnZhiYu',
      'butterfly': 'Butterfly',
      'icarus': 'Icarus',
      'diaspora': 'Diaspora'
    };
    
    return displayNames[themeName] || themeName.charAt(0).toUpperCase() + themeName.slice(1);
  }

  /**
   * 获取主题描述
   */
  getThemeDescription(themeName) {
    const descriptions = {
      'stellar': '简洁优雅的现代主题',
      'anzhiyu': '美观的个人博客主题',
      'butterfly': '功能丰富的蝴蝶主题',
      'icarus': '响应式的简约主题',
      'diaspora': '摄影风格的主题'
    };
    
    return descriptions[themeName] || `${themeName} 主题`;
  }
}

// 主函数
async function main() {
  console.log('🎨 多主题构建器');
  console.log('================');
  
  const builder = new MultiThemeBuilder();
  
  // 检查命令行参数
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
用法: node build-multi-theme.js [选项]

选项:
  --theme <name>    构建指定主题
  --all            构建所有主题 (默认)
  --list           列出可用主题
  --help, -h       显示帮助信息

示例:
  node build-multi-theme.js --all
  node build-multi-theme.js --theme stellar
  node build-multi-theme.js --list
    `);
    return;
  }
  
  if (args.includes('--list')) {
    const themes = builder.getAvailableThemes();
    console.log('可用主题:');
    themes.forEach(theme => console.log(`  - ${theme}`));
    return;
  }
  
  const themeIndex = args.indexOf('--theme');
  if (themeIndex !== -1 && args[themeIndex + 1]) {
    const themeName = args[themeIndex + 1];
    console.log(`构建单个主题: ${themeName}`);
    
    builder.backupConfig();
    try {
      await builder.buildTheme(themeName);
      console.log('✅ 主题构建完成！');
    } catch (error) {
      console.error('❌ 构建失败:', error);
    } finally {
      builder.restoreConfig();
    }
  } else {
    // 默认构建所有主题
    await builder.buildAllThemes();
  }
}

// 运行主函数
if (require.main === module) {
  main().catch(console.error);
}

module.exports = MultiThemeBuilder;