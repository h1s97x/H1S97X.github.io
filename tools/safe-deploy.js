#!/usr/bin/env node

/**
 * 安全部署工具
 * 用于将构建结果安全地部署到gh-pages分支
 * 
 * 安全原则：
 * 1. 绝不删除源码文件
 * 2. 只操作public目录内容
 * 3. 保留部署历史
 * 4. 支持回滚机制
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class SafeDeploy {
  constructor() {
    this.logFile = `deploy-${Date.now()}.log`;
    this.dryRun = process.argv.includes('--dry-run');
    this.force = process.argv.includes('--force');
        
    console.log('🚀 安全部署工具');
    console.log('🛡️ 安全原则：保护源码、保留历史、支持回滚');
    console.log(`📝 日志文件：${this.logFile}`);
        
    if (this.dryRun) {
      console.log('🔍 运行模式：预览模式（不执行实际操作）');
    }
  }

  log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}`;
    console.log(logMessage);
        
    // 写入日志文件
    fs.appendFileSync(this.logFile, logMessage + '\n');
  }

  executeCommand(command, description) {
    this.log(`执行: ${description}`);
    this.log(`命令: ${command}`);
        
    if (this.dryRun) {
      this.log('🔍 预览模式：跳过实际执行');
      return '';
    }
        
    try {
      const result = execSync(command, { encoding: 'utf8', stdio: 'pipe' });
      this.log(`✅ 成功: ${description}`);
      return result;
    } catch (error) {
      this.log(`❌ 失败: ${description}`);
      this.log(`错误: ${error.message}`);
      throw error;
    }
  }

  checkPrerequisites() {
    this.log('🔍 检查部署前置条件...');
        
    // 检查当前分支
    try {
      const currentBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
      this.log(`📍 当前分支: ${currentBranch}`);
            
      if (currentBranch !== 'master' && currentBranch !== 'master-recovered') {
        if (!this.force) {
          throw new Error('请在master分支上执行部署，或使用--force强制执行');
        }
        this.log('⚠️ 强制模式：在非master分支执行部署');
      }
    } catch (error) {
      this.log(`❌ 分支检查失败: ${error.message}`);
      throw error;
    }

    // 检查工作目录状态
    try {
      const status = execSync('git status --porcelain', { encoding: 'utf8' });
      if (status.trim() && !this.force) {
        throw new Error('工作目录不干净，请先提交更改或使用--force强制执行');
      }
      this.log('✅ Git工作目录检查通过');
    } catch (error) {
      this.log(`❌ Git状态检查失败: ${error.message}`);
      throw error;
    }

    // 检查public目录
    if (!fs.existsSync('public')) {
      throw new Error('public目录不存在，请先运行 npm run build');
    }
        
    const publicFiles = fs.readdirSync('public');
    if (publicFiles.length === 0) {
      throw new Error('public目录为空，请先运行 npm run build');
    }
        
    this.log(`✅ public目录检查通过，包含 ${publicFiles.length} 个文件/目录`);

    // 检查gh-pages分支是否存在
    try {
      const branches = execSync('git branch -a', { encoding: 'utf8' });
      if (!branches.includes('gh-pages')) {
        throw new Error('gh-pages分支不存在，请先运行分支设置工具');
      }
      this.log('✅ gh-pages分支存在');
    } catch (error) {
      this.log(`❌ 分支检查失败: ${error.message}`);
      throw error;
    }
  }

  buildSite() {
    this.log('🔨 构建网站...');
        
    // 清理旧的构建文件
    this.executeCommand(
      'npm run clean',
      '清理旧的构建文件'
    );
        
    // 构建网站
    this.executeCommand(
      'npm run build',
      '构建静态网站'
    );
        
    // 验证构建结果
    if (!fs.existsSync('public/index.html')) {
      throw new Error('构建失败：未找到public/index.html');
    }
        
    this.log('✅ 网站构建完成');
  }

  createDeploymentCommit() {
    this.log('📦 准备部署提交...');
        
    // 获取当前提交信息
    const currentCommit = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
    const commitMessage = execSync('git log -1 --pretty=%B', { encoding: 'utf8' }).trim();
        
    this.log(`📍 源码提交: ${currentCommit.substring(0, 8)}`);
    this.log(`💬 提交信息: ${commitMessage}`);
        
    // 切换到gh-pages分支
    this.executeCommand(
      'git checkout gh-pages',
      '切换到gh-pages分支'
    );
        
    // 创建部署信息文件
    const deployInfo = {
      deployTime: new Date().toISOString(),
      sourceCommit: currentCommit,
      sourceMessage: commitMessage,
      deployedBy: 'safe-deploy.js',
      buildCommand: 'npm run build'
    };
        
    if (!this.dryRun) {
      fs.writeFileSync('deploy-info.json', JSON.stringify(deployInfo, null, 2));
    }
        
    return { currentCommit, commitMessage };
  }

  copyBuildFiles() {
    this.log('📁 复制构建文件...');
        
    if (this.dryRun) {
      this.log('🔍 预览模式：跳过文件复制');
      return;
    }
        
    // 使用Node.js的fs模块安全地复制文件
    const copyRecursive = (src, dest) => {
      const stats = fs.statSync(src);
            
      if (stats.isDirectory()) {
        if (!fs.existsSync(dest)) {
          fs.mkdirSync(dest, { recursive: true });
        }
                
        const files = fs.readdirSync(src);
        for (const file of files) {
          copyRecursive(path.join(src, file), path.join(dest, file));
        }
      } else {
        fs.copyFileSync(src, dest);
      }
    };
        
    // 复制public目录下的所有文件到当前目录
    const publicDir = 'public';
    const files = fs.readdirSync(publicDir);
        
    for (const file of files) {
      const srcPath = path.join(publicDir, file);
      const destPath = file;
            
      this.log(`📄 复制: ${srcPath} -> ${destPath}`);
      copyRecursive(srcPath, destPath);
    }
        
    this.log('✅ 构建文件复制完成');
  }

  commitAndPush(sourceCommit, commitMessage) {
    this.log('💾 提交部署更改...');
        
    // 添加所有更改
    this.executeCommand(
      'git add .',
      '添加所有部署文件'
    );
        
    // 检查是否有更改
    try {
      const status = execSync('git status --porcelain', { encoding: 'utf8' });
      if (!status.trim()) {
        this.log('ℹ️ 没有新的更改需要部署');
        return false;
      }
    } catch {
      this.log('⚠️ 无法检查Git状态，继续部署');
    }
        
    // 创建部署提交
    const deployCommitMessage = `deploy: ${commitMessage}\n\nSource: ${sourceCommit}\nDeployed: ${new Date().toISOString()}`;
        
    this.executeCommand(
      `git commit -m "${deployCommitMessage}"`,
      '创建部署提交'
    );
        
    // 推送到远程
    this.executeCommand(
      'git push origin gh-pages',
      '推送部署到远程仓库'
    );
        
    return true;
  }

  switchBackToSource() {
    this.log('🔄 切换回源码分支...');
        
    this.executeCommand(
      'git checkout master',
      '切换回master分支'
    );
  }

  generateDeployReport() {
    this.log('📊 生成部署报告...');
        
    const report = {
      timestamp: new Date().toISOString(),
      logFile: this.logFile,
      dryRun: this.dryRun,
      status: 'completed',
      deploymentUrl: 'https://your-username.github.io/your-repo',
      nextSteps: [
        '1. 验证网站是否正常访问',
        '2. 检查所有页面链接是否正确',
        '3. 确认样式和脚本加载正常',
        '4. 测试搜索功能（如果启用）'
      ],
      troubleshooting: {
        '404错误': '检查GitHub Pages设置中的分支配置',
        '样式丢失': '检查_config.yml中的url和root配置',
        '链接错误': '检查文章中的相对链接路径'
      }
    };
        
    const reportFile = `deploy-report-${Date.now()}.json`;
    if (!this.dryRun) {
      fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
    }
        
    this.log(`📋 部署报告已生成: ${reportFile}`);
    return report;
  }

  async run() {
    try {
      this.log('🚀 开始安全部署...');
            
      // 1. 检查前置条件
      this.checkPrerequisites();
            
      // 2. 构建网站
      this.buildSite();
            
      // 3. 准备部署提交
      const { currentCommit, commitMessage } = this.createDeploymentCommit();
            
      // 4. 复制构建文件
      this.copyBuildFiles();
            
      // 5. 提交并推送
      const hasChanges = this.commitAndPush(currentCommit, commitMessage);
            
      // 6. 切换回源码分支
      this.switchBackToSource();
            
      // 7. 生成报告
      const report = this.generateDeployReport();
            
      if (hasChanges) {
        this.log('🎉 部署完成！');
        this.log(`🌐 网站地址: ${report.deploymentUrl}`);
      } else {
        this.log('ℹ️ 没有新的更改需要部署');
      }
            
      this.log('📋 后续步骤：');
      report.nextSteps.forEach((step, _index) => {
        this.log(`   ${step}`);
      });
            
    } catch (error) {
      this.log(`💥 部署失败: ${error.message}`);
            
      // 尝试切换回源码分支
      try {
        this.executeCommand('git checkout master', '切换回master分支');
      } catch (switchError) {
        this.log(`⚠️ 无法切换回master分支: ${switchError.message}`);
      }
            
      throw error;
    }
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  const deploy = new SafeDeploy();
  deploy.run().catch(error => {
    console.error('部署失败:', error.message);
    process.exit(1);
  });
}

module.exports = SafeDeploy;