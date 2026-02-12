#!/usr/bin/env node

/**
 * 源码分支准备工具
 * 用于清理生成文件，准备纯净的源码分支
 */

const fs = require('fs');
const path = require('path');

class SourceBranchPreparer {
  constructor() {
    this.rootDir = process.cwd();
    this.generatedFiles = [
      // 生成的HTML文件和目录
      'public/',
      'db.json',
      '*.log',
      '.deploy_git/',
            
      // 生成的静态文件
      'index.html',
      'atom.xml',
      'search.xml',
      'sitemap.xml',
      'sitemap.txt',
            
      // 年份目录（生成的）
      '2020/',
      '2023/',
      '2024/',
      '2025/',
            
      // 其他生成目录
      'archives/',
      'categories/',
      'tags/',
      'page/',
      'search/',
      'css/',
      'js/',
      'img/',
      'music/',
      'assets/',
      'photoswipe/'
    ];
        
    this.sourceFiles = [
      'source/',
      'themes/',
      'tools/',
      'test/',
      '.github/',
      'docs/',
      'scaffolds/',
      '_config*.yml',
      'package.json',
      'package-lock.json',
      '.gitignore',
      'README.md',
      'eslint.config.js',
      '.husky/',
      'DEPLOYMENT_CHECKLIST.md',
      'FILE_ORGANIZATION_GUIDE.md',
      'STELLAR_CONFIG_GUIDE.md'
    ];
  }

  /**
     * 检查文件是否存在
     */
  fileExists(filePath) {
    try {
      return fs.existsSync(path.join(this.rootDir, filePath));
    } catch {
      return false;
    }
  }

  /**
     * 删除文件或目录
     */
  removeFile(filePath) {
    const fullPath = path.join(this.rootDir, filePath);
    try {
      if (fs.existsSync(fullPath)) {
        const stats = fs.statSync(fullPath);
        if (stats.isDirectory()) {
          fs.rmSync(fullPath, { recursive: true, force: true });
          console.log(`✅ 删除目录: ${filePath}`);
        } else {
          fs.unlinkSync(fullPath);
          console.log(`✅ 删除文件: ${filePath}`);
        }
        return true;
      }
    } catch (error) {
      console.error(`❌ 删除失败 ${filePath}: ${error.message}`);
      return false;
    }
    return false;
  }

  /**
     * 扫描并删除生成文件
     */
  cleanGeneratedFiles() {
    console.log('🧹 开始清理生成文件...\n');
        
    let deletedCount = 0;
    let skippedCount = 0;

    for (const pattern of this.generatedFiles) {
      if (pattern.includes('*')) {
        // 处理通配符模式
        const dir = path.dirname(pattern) || '.';
        const fileName = path.basename(pattern);
                
        try {
          const dirPath = path.join(this.rootDir, dir);
          if (fs.existsSync(dirPath)) {
            const files = fs.readdirSync(dirPath);
            for (const file of files) {
              if (fileName === '*' || file.match(fileName.replace('*', '.*'))) {
                const filePath = path.join(dir, file);
                if (this.removeFile(filePath)) {
                  deletedCount++;
                }
              }
            }
          }
        } catch (error) {
          console.error(`❌ 扫描目录失败 ${dir}: ${error.message}`);
        }
      } else {
        // 处理具体文件/目录
        if (this.fileExists(pattern)) {
          if (this.removeFile(pattern)) {
            deletedCount++;
          }
        } else {
          skippedCount++;
        }
      }
    }

    console.log('\n📊 清理统计:');
    console.log(`   删除文件/目录: ${deletedCount} 个`);
    console.log(`   跳过不存在: ${skippedCount} 个`);
        
    return { deleted: deletedCount, skipped: skippedCount };
  }

  /**
     * 检查源码分支状态
     */
  checkStatus() {
    console.log('📋 源码分支状态检查\n');
        
    console.log('🔍 生成文件检查:');
    let generatedExists = 0;
    for (const pattern of this.generatedFiles) {
      if (!pattern.includes('*') && this.fileExists(pattern)) {
        console.log(`   ⚠️  存在: ${pattern}`);
        generatedExists++;
      }
    }
        
    if (generatedExists === 0) {
      console.log('   ✅ 无生成文件');
    }

    console.log('\n📁 源码文件检查:');
    let sourceExists = 0;
    for (const pattern of this.sourceFiles) {
      if (!pattern.includes('*') && this.fileExists(pattern)) {
        console.log(`   ✅ 存在: ${pattern}`);
        sourceExists++;
      }
    }

    console.log('\n📊 状态总结:');
    console.log(`   生成文件: ${generatedExists} 个`);
    console.log(`   源码文件: ${sourceExists} 个`);
        
    if (generatedExists === 0) {
      console.log('   🎉 源码分支已准备就绪！');
    } else {
      console.log('   ⚠️  需要清理生成文件');
    }

    return { generatedExists, sourceExists };
  }

  /**
     * 更新.gitignore文件
     */
  updateGitignore() {
    const gitignorePath = path.join(this.rootDir, '.gitignore');
    const requiredRules = [
      '# Hexo generated files',
      'public/',
      'db.json',
      '*.log',
      '.deploy_git/',
      '',
      '# Generated static files',
      'index.html',
      'atom.xml',
      'search.xml',
      'sitemap.xml',
      'sitemap.txt',
      'CNAME',
      '',
      '# Year directories (generated)',
      '2020/',
      '2023/',
      '2024/',
      '2025/',
      'archives/',
      'categories/',
      'tags/',
      'page/',
      'search/',
      'css/',
      'js/',
      'img/',
      'music/',
      'assets/',
      'photoswipe/',
      '',
      '# Node.js',
      'node_modules/',
      '',
      '# IDE',
      '.idea/',
      '.vscode/',
      '',
      '# Temporary files',
      '*.tmp',
      '*.temp'
    ];

    try {
      let existingContent = '';
      if (fs.existsSync(gitignorePath)) {
        existingContent = fs.readFileSync(gitignorePath, 'utf8');
      }

      // 检查是否需要更新
      const hasAllRules = requiredRules.every(rule => 
        rule === '' || rule.startsWith('#') || existingContent.includes(rule)
      );

      if (!hasAllRules) {
        const newContent = existingContent + '\n\n' + requiredRules.join('\n') + '\n';
        fs.writeFileSync(gitignorePath, newContent);
        console.log('✅ 更新 .gitignore 文件');
        return true;
      } else {
        console.log('✅ .gitignore 文件已是最新');
        return false;
      }
    } catch (error) {
      console.error(`❌ 更新 .gitignore 失败: ${error.message}`);
      return false;
    }
  }

  /**
     * 执行完整的源码分支准备
     */
  prepare() {
    console.log('🚀 开始准备源码分支\n');
        
    // 1. 检查当前状态
    const status = this.checkStatus();
        
    if (status.generatedExists === 0) {
      console.log('\n✅ 源码分支已经是干净的，无需清理');
      return;
    }

    // 2. 清理生成文件
    console.log('\n' + '='.repeat(50));
    this.cleanGeneratedFiles();

    // 3. 更新.gitignore
    console.log('\n' + '='.repeat(50));
    console.log('📝 更新 .gitignore 文件...\n');
    this.updateGitignore();

    // 4. 最终检查
    console.log('\n' + '='.repeat(50));
    console.log('🔍 最终状态检查...\n');
    this.checkStatus();

    console.log('\n🎉 源码分支准备完成！');
    console.log('\n📋 下一步操作:');
    console.log('   1. git add .');
    console.log('   2. git commit -m "clean: prepare source branch"');
    console.log('   3. git push origin master');
    console.log('   4. 创建 gh-pages 分支进行部署');
  }

  /**
     * 显示帮助信息
     */
  showHelp() {
    console.log('📖 源码分支准备工具使用说明\n');
    console.log('用法:');
    console.log('  node tools/prepare-source-branch.js [选项]\n');
    console.log('选项:');
    console.log('  --status    检查当前源码分支状态');
    console.log('  --help      显示此帮助信息');
    console.log('  (无参数)    执行完整的源码分支准备\n');
    console.log('功能:');
    console.log('  • 清理 Hexo 生成的静态文件');
    console.log('  • 删除临时文件和缓存');
    console.log('  • 更新 .gitignore 规则');
    console.log('  • 保留所有源码文件\n');
    console.log('示例:');
    console.log('  node tools/prepare-source-branch.js --status');
    console.log('  node tools/prepare-source-branch.js');
  }
}

// 主程序
function main() {
  const preparer = new SourceBranchPreparer();
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    preparer.showHelp();
  } else if (args.includes('--status')) {
    preparer.checkStatus();
  } else {
    preparer.prepare();
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = SourceBranchPreparer;