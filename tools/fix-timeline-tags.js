#!/usr/bin/env node

/**
 * 修复Timeline标签工具
 * 将旧的 {% timenode %} 语法转换为Stellar主题支持的 <!-- node --> 语法
 */

const fs = require('fs');
const path = require('path');

class TimelineTagFixer {
  constructor() {
    this.rootDir = process.cwd();
    this.errors = [];
    this.warnings = [];
    this.fixed = [];
  }

  /**
   * 扫描并修复所有文件
   */
  fixAllFiles() {
    console.log('🔧 开始修复Timeline标签...\n');

    const files = this.findMarkdownFiles(path.join(this.rootDir, 'source'));
    
    for (const file of files) {
      this.fixFile(file);
    }

    this.showResults();
  }

  /**
   * 查找所有Markdown文件
   */
  findMarkdownFiles(dir) {
    let files = [];
    
    try {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          files = files.concat(this.findMarkdownFiles(fullPath));
        } else if (item.endsWith('.md')) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      this.errors.push(`扫描目录失败: ${dir} - ${error.message}`);
    }
    
    return files;
  }

  /**
   * 修复单个文件
   */
  fixFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // 检查是否包含需要修复的标签
      if (!content.includes('{% timenode') && !content.includes('{% endtimenode')) {
        return;
      }

      console.log(`🔍 修复文件: ${path.relative(this.rootDir, filePath)}`);
      
      let newContent = content;
      let changeCount = 0;

      // 替换 {% timenode 标题 %} 为 <!-- node 标题 -->
      newContent = newContent.replace(/{% timenode (.*?) %}/g, (match, title) => {
        changeCount++;
        return `<!-- node ${title} -->`;
      });

      // 删除 {% endtimenode %}
      newContent = newContent.replace(/{% endtimenode %}/g, () => {
        changeCount++;
        return '';
      });

      if (changeCount > 0) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        this.fixed.push(`${path.relative(this.rootDir, filePath)}: ${changeCount} 处修改`);
      }

    } catch (error) {
      this.errors.push(`修复文件失败: ${filePath} - ${error.message}`);
    }
  }

  /**
   * 显示修复结果
   */
  showResults() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 Timeline标签修复结果\n');

    if (this.fixed.length > 0) {
      console.log('✅ 修复的文件:');
      this.fixed.forEach(item => console.log(`   ${item}`));
      console.log();
    }

    if (this.warnings.length > 0) {
      console.log('⚠️  警告:');
      this.warnings.forEach(item => console.log(`   ${item}`));
      console.log();
    }

    if (this.errors.length > 0) {
      console.log('❌ 错误:');
      this.errors.forEach(item => console.log(`   ${item}`));
      console.log();
    }

    console.log('📋 修复总结:');
    console.log(`   修复文件: ${this.fixed.length}`);
    console.log(`   警告: ${this.warnings.length}`);
    console.log(`   错误: ${this.errors.length}`);

    if (this.errors.length === 0) {
      console.log('\n🎉 Timeline标签修复完成！');
    } else {
      console.log('\n💡 请检查上述错误并手动修复');
    }
  }
}

// 主程序
function main() {
  const fixer = new TimelineTagFixer();
  fixer.fixAllFiles();
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = TimelineTagFixer;