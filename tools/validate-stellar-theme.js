#!/usr/bin/env node

/**
 * Stellar主题配置验证工具
 * 验证主题配置的正确性和完整性
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

class StellarThemeValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.info = [];
  }

  /**
     * 验证主题配置
     */
  async validate() {
    console.log('🔍 开始验证Stellar主题配置...\n');

    try {
      // 验证主配置文件
      await this.validateMainConfig();
            
      // 验证Stellar主题配置文件
      await this.validateStellarConfig();
            
      // 验证主题文件存在性
      await this.validateThemeFiles();
            
      // 验证依赖包
      await this.validateDependencies();
            
      // 输出验证结果
      this.outputResults();
            
    } catch (error) {
      console.error('❌ 验证过程中发生错误:', error.message);
      process.exit(1);
    }
  }

  /**
     * 验证主配置文件
     */
  async validateMainConfig() {
    const configPath = '_config.yml';
        
    if (!fs.existsSync(configPath)) {
      this.errors.push('主配置文件 _config.yml 不存在');
      return;
    }

    try {
      const configContent = fs.readFileSync(configPath, 'utf8');
      const config = yaml.load(configContent);
            
      // 检查主题设置
      if (config.theme !== 'stellar') {
        this.errors.push(`主题设置错误: 期望 'stellar', 实际 '${config.theme}'`);
      } else {
        this.info.push('✅ 主题设置正确: stellar');
      }
            
      // 检查基本配置
      const requiredFields = ['title', 'author', 'language', 'url'];
      requiredFields.forEach(field => {
        if (!config[field]) {
          this.warnings.push(`建议设置 ${field} 字段`);
        } else {
          this.info.push(`✅ ${field}: ${config[field]}`);
        }
      });
            
      // 检查搜索配置
      if (config.search && config.search.path) {
        this.info.push('✅ 搜索功能已配置');
      } else {
        this.warnings.push('建议配置搜索功能');
      }
            
    } catch (error) {
      this.errors.push(`解析主配置文件失败: ${error.message}`);
    }
  }

  /**
     * 验证Stellar主题配置文件
     */
  async validateStellarConfig() {
    const configPath = '_config_stellar.yml';
        
    if (!fs.existsSync(configPath)) {
      this.errors.push('Stellar主题配置文件 _config_stellar.yml 不存在');
      return;
    }

    try {
      const configContent = fs.readFileSync(configPath, 'utf8');
      const config = yaml.load(configContent);
            
      // 验证基本信息
      if (config.stellar && config.stellar.version) {
        this.info.push(`✅ Stellar版本: ${config.stellar.version}`);
      }
            
      // 验证导航菜单
      if (config.menubar && config.menubar.items && config.menubar.items.length > 0) {
        this.info.push(`✅ 导航菜单已配置 (${config.menubar.items.length} 个项目)`);
                
        // 检查必要的菜单项
        const menuItems = config.menubar.items.map(item => item.id || item.title);
        const requiredMenus = ['post', 'categories', 'tags', 'archives'];
        requiredMenus.forEach(menu => {
          if (menuItems.includes(menu)) {
            this.info.push(`✅ 必要菜单项 '${menu}' 已配置`);
          } else {
            this.warnings.push(`建议添加菜单项 '${menu}'`);
          }
        });
      } else {
        this.warnings.push('导航菜单未配置');
      }
            
      // 验证站点结构
      if (config.site_tree) {
        this.info.push('✅ 站点结构已配置');
                
        // 检查重要页面配置
        const importantPages = ['home', 'index_blog', 'post'];
        importantPages.forEach(page => {
          if (config.site_tree[page]) {
            this.info.push(`✅ ${page} 页面配置已设置`);
          } else {
            this.warnings.push(`建议配置 ${page} 页面`);
          }
        });
      }
            
      // 验证搜索配置
      if (config.search && config.search.service) {
        this.info.push(`✅ 搜索服务: ${config.search.service}`);
      } else {
        this.warnings.push('建议配置搜索功能');
      }
            
      // 验证评论系统
      if (config.comments && config.comments.service) {
        this.info.push(`✅ 评论系统: ${config.comments.service}`);
      } else {
        this.info.push('ℹ️ 评论系统未配置 (可选)');
      }
            
      // 验证插件配置
      if (config.plugins) {
        const enabledPlugins = Object.keys(config.plugins).filter(
          plugin => config.plugins[plugin] && config.plugins[plugin].enable
        );
        if (enabledPlugins.length > 0) {
          this.info.push(`✅ 已启用插件: ${enabledPlugins.join(', ')}`);
        } else {
          this.info.push('ℹ️ 未启用任何插件');
        }
      }
            
    } catch (error) {
      this.errors.push(`解析Stellar配置文件失败: ${error.message}`);
    }
  }

  /**
     * 验证主题文件存在性
     */
  async validateThemeFiles() {
    const themePath = 'themes/stellar';
        
    if (!fs.existsSync(themePath)) {
      this.errors.push('Stellar主题目录不存在: themes/stellar');
      return;
    }
        
    // 检查主题关键文件
    const requiredFiles = [
      'package.json',
      'layout/index.ejs',
      'source/css/main.styl',
      'source/js/main.js'
    ];
        
    requiredFiles.forEach(file => {
      const filePath = path.join(themePath, file);
      if (fs.existsSync(filePath)) {
        this.info.push(`✅ 主题文件存在: ${file}`);
      } else {
        this.warnings.push(`主题文件缺失: ${file}`);
      }
    });
        
    // 检查主题版本
    const packagePath = path.join(themePath, 'package.json');
    if (fs.existsSync(packagePath)) {
      try {
        const packageContent = fs.readFileSync(packagePath, 'utf8');
        const packageInfo = JSON.parse(packageContent);
        this.info.push(`✅ 主题版本: ${packageInfo.version || 'unknown'}`);
      } catch {
        this.warnings.push('无法读取主题版本信息');
      }
    }
  }

  /**
     * 验证依赖包
     */
  async validateDependencies() {
    const packagePath = 'package.json';
        
    if (!fs.existsSync(packagePath)) {
      this.warnings.push('package.json 文件不存在');
      return;
    }
        
    try {
      const packageContent = fs.readFileSync(packagePath, 'utf8');
      const packageInfo = JSON.parse(packageContent);
            
      // 检查Hexo版本
      if (packageInfo.dependencies && packageInfo.dependencies.hexo) {
        this.info.push(`✅ Hexo版本: ${packageInfo.dependencies.hexo}`);
      } else {
        this.warnings.push('Hexo依赖未找到');
      }
            
      // 检查推荐的依赖包
      const recommendedDeps = {
        'hexo-generator-searchdb': '搜索功能',
        'hexo-generator-feed': 'RSS订阅',
        'hexo-generator-sitemap': '站点地图',
        'hexo-filter-mermaid-diagrams': 'Mermaid图表'
      };
            
      Object.entries(recommendedDeps).forEach(([dep, desc]) => {
        if (packageInfo.dependencies && packageInfo.dependencies[dep]) {
          this.info.push(`✅ ${desc}依赖: ${dep}`);
        } else {
          this.info.push(`ℹ️ 可选依赖 ${dep} (${desc}) 未安装`);
        }
      });
            
    } catch (err) {
      this.warnings.push(`解析package.json失败: ${err.message}`);
    }
  }

  /**
     * 输出验证结果
     */
  outputResults() {
    console.log('\n📊 验证结果汇总:\n');
        
    // 输出错误
    if (this.errors.length > 0) {
      console.log('❌ 错误:');
      this.errors.forEach(error => console.log(`   ${error}`));
      console.log();
    }
        
    // 输出警告
    if (this.warnings.length > 0) {
      console.log('⚠️ 警告:');
      this.warnings.forEach(warning => console.log(`   ${warning}`));
      console.log();
    }
        
    // 输出信息
    if (this.info.length > 0) {
      console.log('ℹ️ 配置信息:');
      this.info.forEach(info => console.log(`   ${info}`));
      console.log();
    }
        
    // 总结
    if (this.errors.length === 0) {
      console.log('🎉 Stellar主题配置验证通过!');
      if (this.warnings.length > 0) {
        console.log(`💡 有 ${this.warnings.length} 个建议可以优化配置`);
      }
    } else {
      console.log(`💥 发现 ${this.errors.length} 个错误需要修复`);
      process.exit(1);
    }
  }
}

// 主函数
async function main() {
  const validator = new StellarThemeValidator();
  await validator.validate();
}

// 如果直接运行此脚本
if (require.main === module) {
  main().catch(err => {
    console.error('验证失败:', err);
    process.exit(1);
  });
}

module.exports = StellarThemeValidator;