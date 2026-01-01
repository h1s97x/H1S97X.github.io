#!/usr/bin/env node

/**
 * Scaffold管理工具
 * 用于验证、更新和管理Hexo scaffold模板
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

class ScaffoldManager {
  constructor() {
    this.rootDir = process.cwd();
    this.scaffoldsDir = path.join(this.rootDir, 'scaffolds');
    this.scaffolds = [];
    this.errors = [];
    this.warnings = [];
    this.passed = [];
  }

  /**
   * 扫描所有scaffold文件
   */
  scanScaffolds() {
    console.log('🔍 扫描scaffold模板文件...\n');

    if (!fs.existsSync(this.scaffoldsDir)) {
      this.errors.push('scaffolds目录不存在');
      return;
    }

    const files = fs.readdirSync(this.scaffoldsDir)
      .filter(file => file.endsWith('.md'))
      .sort();

    if (files.length === 0) {
      this.warnings.push('未找到scaffold模板文件');
      return;
    }

    console.log(`📋 发现 ${files.length} 个scaffold模板:`);
    files.forEach(file => {
      console.log(`   - ${file}`);
      this.scaffolds.push({
        name: path.basename(file, '.md'),
        file: file,
        path: path.join(this.scaffoldsDir, file)
      });
    });
    console.log();
  }

  /**
   * 验证scaffold模板
   */
  validateScaffolds() {
    console.log('✅ 验证scaffold模板...\n');

    for (const scaffold of this.scaffolds) {
      console.log(`🔍 验证: ${scaffold.file}`);
      this.validateScaffold(scaffold);
      console.log();
    }
  }

  /**
   * 验证单个scaffold
   */
  validateScaffold(scaffold) {
    try {
      const content = fs.readFileSync(scaffold.path, 'utf8');
      
      // 检查基本结构
      this.checkBasicStructure(scaffold, content);
      
      // 检查front-matter
      this.checkFrontMatter(scaffold, content);
      
      // 检查Stellar主题特性
      this.checkStellarFeatures(scaffold, content);
      
      // 检查内容指导
      this.checkContentGuidance(scaffold, content);
      
    } catch (error) {
      this.errors.push(`${scaffold.file}: 读取失败 - ${error.message}`);
    }
  }

  /**
   * 检查基本结构
   */
  checkBasicStructure(scaffold, content) {
    // 检查是否有front-matter
    if (!content.startsWith('---')) {
      this.errors.push(`${scaffold.file}: 缺少front-matter开始标记`);
      return;
    }

    const parts = content.split('---');
    if (parts.length < 3) {
      this.errors.push(`${scaffold.file}: front-matter格式不正确`);
      return;
    }

    this.passed.push(`${scaffold.file}: 基本结构正确`);
  }

  /**
   * 检查front-matter
   */
  checkFrontMatter(scaffold, content) {
    // 修改正则表达式以匹配多行front-matter
    const frontMatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/m);
    if (!frontMatterMatch) {
      this.errors.push(`${scaffold.file}: 无法找到front-matter`);
      return;
    }

    // 对于scaffold模板，我们检查字段是否存在，而不是解析YAML
    const frontMatterText = frontMatterMatch[1];
    
    // 检查必需字段
    const requiredFields = this.getRequiredFields(scaffold.name);
    for (const field of requiredFields) {
      if (frontMatterText.includes(`${field}:`)) {
        this.passed.push(`${scaffold.file}: 包含字段 "${field}"`);
      } else {
        this.warnings.push(`${scaffold.file}: 缺少推荐字段 "${field}"`);
      }
    }

    // 检查Stellar特有字段
    const stellarFields = ['layout', 'menu_id', 'leftbar', 'rightbar'];
    const stellarFieldCount = stellarFields.filter(field => 
      frontMatterText.includes(`${field}:`)
    ).length;
    
    if (stellarFieldCount > 0) {
      this.passed.push(`${scaffold.file}: 包含 ${stellarFieldCount} 个Stellar主题配置字段`);
    } else {
      this.warnings.push(`${scaffold.file}: 缺少Stellar主题配置字段`);
    }

    this.passed.push(`${scaffold.file}: front-matter格式正确`);
  }

  /**
   * 获取必需字段
   */
  getRequiredFields(scaffoldName) {
    const fieldMap = {
      'post': ['title', 'date', 'categories', 'tags'],
      'page': ['title', 'date'],
      'draft': ['title', 'categories', 'tags'],
      'wiki': ['title', 'date', 'wiki'],
      'topic': ['title', 'date', 'topic']
    };
    
    return fieldMap[scaffoldName] || ['title'];
  }

  /**
   * 检查Stellar主题特性
   */
  checkStellarFeatures(scaffold, content) {
    const stellarFeatures = [
      'layout',
      'menu_id', 
      'leftbar',
      'rightbar',
      'mathjax',
      'mermaid',
      'cover',
      'banner'
    ];

    let featureCount = 0;
    for (const feature of stellarFeatures) {
      if (content.includes(feature)) {
        featureCount++;
      }
    }

    if (featureCount >= 3) {
      this.passed.push(`${scaffold.file}: 包含 ${featureCount} 个Stellar特性`);
    } else {
      this.warnings.push(`${scaffold.file}: 仅包含 ${featureCount} 个Stellar特性，建议增加更多`);
    }
  }

  /**
   * 检查内容指导
   */
  checkContentGuidance(scaffold, content) {
    const hasComments = content.includes('<!--') && content.includes('-->');
    const hasGuidance = content.includes('指南') || content.includes('说明') || content.includes('建议');
    
    if (hasComments && hasGuidance) {
      this.passed.push(`${scaffold.file}: 包含内容编写指导`);
    } else {
      this.warnings.push(`${scaffold.file}: 缺少内容编写指导`);
    }
  }

  /**
   * 生成使用统计
   */
  generateUsageStats() {
    console.log('📊 生成使用统计...\n');

    const postsDir = path.join(this.rootDir, 'source/_posts');
    if (!fs.existsSync(postsDir)) {
      console.log('⚠️  _posts目录不存在，跳过统计');
      return;
    }

    const stats = {
      total: 0,
      byLayout: {},
      byCategory: {},
      withStellarFeatures: 0
    };

    const files = this.getAllMarkdownFiles(postsDir);
    stats.total = files.length;

    for (const file of files) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
        
        if (frontMatterMatch) {
          const frontMatter = yaml.load(frontMatterMatch[1]);
          
          // 统计布局类型
          const layout = frontMatter.layout || 'post';
          stats.byLayout[layout] = (stats.byLayout[layout] || 0) + 1;
          
          // 统计分类
          if (frontMatter.categories) {
            const categories = Array.isArray(frontMatter.categories) 
              ? frontMatter.categories 
              : [frontMatter.categories];
            
            for (const category of categories) {
              if (category) {
                stats.byCategory[category] = (stats.byCategory[category] || 0) + 1;
              }
            }
          }
          
          // 统计Stellar特性使用
          const stellarFeatures = ['menu_id', 'leftbar', 'rightbar', 'mathjax', 'mermaid'];
          const hasStellarFeatures = stellarFeatures.some(feature => 
            Object.prototype.hasOwnProperty.call(frontMatter, feature)
          );
          
          if (hasStellarFeatures) {
            stats.withStellarFeatures++;
          }
        }
      } catch {
        // 忽略解析错误的文件
      }
    }

    this.displayStats(stats);
  }

  /**
   * 获取所有Markdown文件
   */
  getAllMarkdownFiles(dir) {
    let files = [];
    
    try {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          files = files.concat(this.getAllMarkdownFiles(fullPath));
        } else if (item.endsWith('.md')) {
          files.push(fullPath);
        }
      }
    } catch {
      // 忽略访问错误
    }
    
    return files;
  }

  /**
   * 显示统计信息
   */
  displayStats(stats) {
    console.log('📈 内容统计信息:');
    console.log(`   总文章数: ${stats.total}`);
    console.log(`   使用Stellar特性: ${stats.withStellarFeatures} (${(stats.withStellarFeatures/stats.total*100).toFixed(1)}%)`);
    
    console.log('\n📋 布局类型分布:');
    Object.entries(stats.byLayout)
      .sort(([,a], [,b]) => b - a)
      .forEach(([layout, count]) => {
        const percentage = (count/stats.total*100).toFixed(1);
        console.log(`   ${layout}: ${count} (${percentage}%)`);
      });
    
    console.log('\n🏷️  分类分布 (前10):');
    Object.entries(stats.byCategory)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .forEach(([category, count]) => {
        const percentage = (count/stats.total*100).toFixed(1);
        console.log(`   ${category}: ${count} (${percentage}%)`);
      });
  }

  /**
   * 显示验证结果
   */
  showResults() {
    console.log('='.repeat(60));
    console.log('📊 Scaffold验证结果\n');

    if (this.passed.length > 0) {
      console.log('✅ 通过的检查项:');
      this.passed.forEach(item => console.log(`   ${item}`));
      console.log();
    }

    if (this.warnings.length > 0) {
      console.log('⚠️  警告项:');
      this.warnings.forEach(item => console.log(`   ${item}`));
      console.log();
    }

    if (this.errors.length > 0) {
      console.log('❌ 错误项:');
      this.errors.forEach(item => console.log(`   ${item}`));
      console.log();
    }

    // 总结
    const total = this.passed.length + this.warnings.length + this.errors.length;
    console.log('📋 检查总结:');
    console.log(`   通过: ${this.passed.length}/${total}`);
    console.log(`   警告: ${this.warnings.length}/${total}`);
    console.log(`   错误: ${this.errors.length}/${total}`);

    if (this.errors.length === 0) {
      console.log('\n🎉 所有scaffold模板验证通过！');
    } else {
      console.log('\n💡 建议修复上述错误以确保模板正常使用');
    }

    this.provideSuggestions();
  }

  /**
   * 提供改进建议
   */
  provideSuggestions() {
    console.log('\n💡 Scaffold优化建议:');
    console.log('   1. 确保所有模板包含必要的front-matter字段');
    console.log('   2. 添加Stellar主题特有配置选项');
    console.log('   3. 提供清晰的内容编写指导');
    console.log('   4. 使用合理的默认值和示例');
    console.log('   5. 保持模板的一致性和可维护性');
    
    console.log('\n📚 相关文档:');
    console.log('   - Stellar主题文档: https://xaoxuu.com/wiki/stellar/');
    console.log('   - Hexo Scaffolds: https://hexo.io/docs/writing#Scaffolds');
    console.log('   - Front-matter: https://hexo.io/docs/front-matter');
  }

  /**
   * 列出可用模板
   */
  listScaffolds() {
    console.log('📋 可用的Scaffold模板:\n');

    for (const scaffold of this.scaffolds) {
      console.log(`📄 ${scaffold.name}.md`);
      
      try {
        const content = fs.readFileSync(scaffold.path, 'utf8');
        const frontMatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/m);
        
        if (frontMatterMatch) {
          const frontMatterText = frontMatterMatch[1];
          
          // 从front-matter文本中提取layout
          const layoutMatch = frontMatterText.match(/layout:\s*(\w+)/);
          const layout = layoutMatch ? layoutMatch[1] : 'post';
          
          const description = this.getScaffoldDescription(scaffold.name);
          
          console.log(`   布局: ${layout}`);
          console.log(`   用途: ${description}`);
          console.log(`   使用: hexo new ${scaffold.name} "文章标题"`);
        } else {
          console.log('   状态: 解析失败');
        }
      } catch {
        console.log('   状态: 读取失败');
      }
      
      console.log();
    }
  }

  /**
   * 获取模板描述
   */
  getScaffoldDescription(name) {
    const descriptions = {
      'post': '博客文章，支持完整的Stellar主题特性',
      'page': '静态页面，如关于页面、友链页面等',
      'draft': '草稿文章，用于内容创作和修改',
      'wiki': 'Wiki文档，用于结构化的技术文档',
      'topic': '专栏文章，用于系列化的主题内容'
    };
    
    return descriptions[name] || '自定义模板';
  }

  /**
   * 执行主要功能
   */
  run() {
    const args = process.argv.slice(2);
    const command = args[0] || 'validate';

    console.log('🛠️  Scaffold管理工具\n');
    console.log('='.repeat(50));

    this.scanScaffolds();

    if (this.errors.length > 0) {
      this.showResults();
      return;
    }

    switch (command) {
    case 'validate':
      this.validateScaffolds();
      this.showResults();
      break;
        
    case 'list':
      this.listScaffolds();
      break;
        
    case 'stats':
      this.generateUsageStats();
      break;
        
    case 'all':
      this.validateScaffolds();
      this.generateUsageStats();
      this.showResults();
      break;
        
    default:
      this.showHelp();
    }
  }

  /**
   * 显示帮助信息
   */
  showHelp() {
    console.log('📖 Scaffold管理工具使用说明\n');
    console.log('用法:');
    console.log('  node tools/manage-scaffolds.js [命令]\n');
    console.log('命令:');
    console.log('  validate  验证所有scaffold模板 (默认)');
    console.log('  list      列出可用的scaffold模板');
    console.log('  stats     生成内容使用统计');
    console.log('  all       执行所有检查');
    console.log('  help      显示此帮助信息\n');
    console.log('功能:');
    console.log('  • 验证scaffold模板格式');
    console.log('  • 检查Stellar主题特性支持');
    console.log('  • 生成内容使用统计');
    console.log('  • 提供优化建议');
    console.log('\n示例:');
    console.log('  node tools/manage-scaffolds.js validate');
    console.log('  npm run scaffolds:validate');
    console.log('  npm run scaffolds:list');
  }
}

// 主程序
function main() {
  const manager = new ScaffoldManager();
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    manager.showHelp();
  } else {
    manager.run();
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = ScaffoldManager;