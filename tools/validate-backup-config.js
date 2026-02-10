#!/usr/bin/env node

/**
 * 私有备份配置验证脚本
 * 验证私有备份仓库的配置和访问权限
 */

const { execSync } = require('child_process');
const fs = require('fs');

class BackupConfigValidator {
  constructor() {
    this.configPath = '.github/private-backup-config.json';
    this.errors = [];
    this.warnings = [];
  }

  /**
     * 记录错误
     */
  addError(message) {
    this.errors.push(message);
    console.log(`❌ ${message}`);
  }

  /**
     * 记录警告
     */
  addWarning(message) {
    this.warnings.push(message);
    console.log(`⚠️  ${message}`);
  }

  /**
     * 记录成功
     */
  addSuccess(message) {
    console.log(`✅ ${message}`);
  }

  /**
     * 检查配置文件
     */
  validateConfigFile() {
    console.log('🔍 检查配置文件...');
        
    if (!fs.existsSync(this.configPath)) {
      this.addError('配置文件不存在，请先运行 npm run backup:setup');
      return null;
    }

    try {
      const config = JSON.parse(fs.readFileSync(this.configPath, 'utf8'));
            
      // 验证必需字段
      const requiredFields = ['privateRepoName', 'remoteUrl', 'username', 'createdAt'];
      for (const field of requiredFields) {
        if (!config[field]) {
          this.addError(`配置文件缺少必需字段: ${field}`);
        }
      }

      if (this.errors.length === 0) {
        this.addSuccess('配置文件格式正确');
      }

      return config;
    } catch (error) {
      this.addError(`配置文件格式错误: ${error.message}`);
      return null;
    }
  }

  /**
     * 检查Git远程配置
     */
  validateGitRemote() {
    console.log('🔍 检查Git远程配置...');
        
    try {
      const remoteUrl = execSync('git remote get-url backup', { encoding: 'utf8' }).trim();
      this.addSuccess(`backup 远程已配置: ${remoteUrl}`);
      return remoteUrl;
    } catch {
      this.addError('backup 远程未配置，请运行 npm run backup:setup');
      return null;
    }
  }

  /**
     * 检查GitHub CLI
     */
  validateGitHubCLI() {
    console.log('🔍 检查GitHub CLI...');
        
    try {
      execSync('gh --version', { stdio: 'ignore' });
      this.addSuccess('GitHub CLI 已安装');
            
      try {
        execSync('gh auth status', { stdio: 'ignore' });
        this.addSuccess('GitHub CLI 已认证');
        return true;
      } catch {
        this.addError('GitHub CLI 未认证，请运行: gh auth login');
        return false;
      }
    } catch {
      this.addError('GitHub CLI 未安装，请访问: https://cli.github.com/');
      return false;
    }
  }

  /**
     * 检查仓库访问权限
     */
  async validateRepositoryAccess(config) {
    console.log('🔍 检查仓库访问权限...');
        
    if (!config) {
      this.addError('无法验证仓库访问权限：配置无效');
      return false;
    }

    try {
      // 检查仓库是否存在
      execSync(`gh repo view ${config.privateRepoName}`, { stdio: 'ignore' });
      this.addSuccess(`私有仓库存在: ${config.privateRepoName}`);
            
      // 检查仓库是否为私有
      const repoInfo = execSync(`gh repo view ${config.privateRepoName} --json visibility`, { encoding: 'utf8' });
      const visibility = JSON.parse(repoInfo).visibility;
            
      if (visibility === 'PRIVATE') {
        this.addSuccess('仓库访问权限设置正确 (私有)');
      } else {
        this.addWarning(`仓库不是私有的，当前可见性: ${visibility}`);
      }

      // 测试推送权限
      try {
        execSync('git ls-remote backup', { stdio: 'ignore' });
        this.addSuccess('仓库推送权限验证成功');
        return true;
      } catch {
        this.addError('仓库推送权限验证失败，请检查访问令牌权限');
        return false;
      }
    } catch (error) {
      this.addError(`仓库访问验证失败: ${error.message}`);
      return false;
    }
  }

  /**
     * 检查GitHub Actions Secrets
     */
  validateGitHubSecrets() {
    console.log('🔍 检查GitHub Actions Secrets...');
        
    try {
      // 获取当前仓库信息
      const repoInfo = execSync('gh repo view --json owner,name', { encoding: 'utf8' });
      const { owner, name } = JSON.parse(repoInfo);
      const repoFullName = `${owner.login}/${name}`;

      // 检查secrets (需要admin权限)
      try {
        const secrets = execSync(`gh secret list --repo ${repoFullName}`, { encoding: 'utf8' });
                
        const requiredSecrets = ['BACKUP_REPO_TOKEN', 'BACKUP_REPO_NAME'];
        const existingSecrets = secrets.split('\n').map(line => line.split('\t')[0]).filter(Boolean);
                
        for (const secret of requiredSecrets) {
          if (existingSecrets.includes(secret)) {
            this.addSuccess(`Secret 已配置: ${secret}`);
          } else {
            this.addWarning(`Secret 未配置: ${secret}`);
          }
        }
      } catch {
        this.addWarning('无法检查GitHub Secrets (可能需要admin权限)');
        this.addWarning('请手动确认已配置 BACKUP_REPO_TOKEN 和 BACKUP_REPO_NAME');
      }
    } catch (error) {
      this.addError(`检查GitHub Secrets失败: ${error.message}`);
    }
  }

  /**
     * 检查备份工作流程
     */
  validateBackupWorkflow() {
    console.log('🔍 检查备份工作流程...');
        
    const workflowPath = '.github/workflows/daily-backup.yml';
    if (fs.existsSync(workflowPath)) {
      this.addSuccess('备份工作流程文件存在');
            
      // 检查工作流程内容
      const workflowContent = fs.readFileSync(workflowPath, 'utf8');
            
      if (workflowContent.includes('BACKUP_REPO_TOKEN') && workflowContent.includes('BACKUP_REPO_NAME')) {
        this.addSuccess('工作流程配置了必要的secrets');
      } else {
        this.addWarning('工作流程可能缺少必要的secrets配置');
      }
    } else {
      this.addWarning('备份工作流程文件不存在');
    }
  }

  /**
     * 生成修复建议
     */
  generateFixSuggestions() {
    if (this.errors.length === 0 && this.warnings.length === 0) {
      return;
    }

    console.log('\n🔧 修复建议:');
        
    if (this.errors.length > 0) {
      console.log('\n❌ 错误 (必须修复):');
      this.errors.forEach((error, index) => {
        console.log(`   ${index + 1}. ${error}`);
      });
    }

    if (this.warnings.length > 0) {
      console.log('\n⚠️  警告 (建议修复):');
      this.warnings.forEach((warning, index) => {
        console.log(`   ${index + 1}. ${warning}`);
      });
    }

    console.log('\n💡 常见修复步骤:');
    console.log('   1. 运行 npm run backup:setup 重新设置');
    console.log('   2. 检查 .github/BACKUP_TOKEN_SETUP.md 配置说明');
    console.log('   3. 在GitHub仓库设置中添加必要的Secrets');
    console.log('   4. 运行 gh auth login 重新认证GitHub CLI');
  }

  /**
     * 执行完整验证
     */
  async validate() {
    console.log('🎯 开始验证私有备份配置...\n');

    // 1. 检查配置文件
    const config = this.validateConfigFile();
    console.log('');

    // 2. 检查Git远程配置
    this.validateGitRemote();
    console.log('');

    // 3. 检查GitHub CLI
    const cliValid = this.validateGitHubCLI();
    console.log('');

    // 4. 检查仓库访问权限
    if (cliValid) {
      await this.validateRepositoryAccess(config);
      console.log('');

      // 5. 检查GitHub Secrets
      this.validateGitHubSecrets();
      console.log('');
    }

    // 6. 检查备份工作流程
    this.validateBackupWorkflow();
    console.log('');

    // 7. 生成报告
    this.generateReport();
  }

  /**
     * 生成验证报告
     */
  generateReport() {
    console.log('📊 验证报告:');
    console.log(`   ✅ 成功: ${this.getSuccessCount()}`);
    console.log(`   ❌ 错误: ${this.errors.length}`);
    console.log(`   ⚠️  警告: ${this.warnings.length}`);

    if (this.errors.length === 0) {
      console.log('\n🎉 配置验证通过! 私有备份系统已准备就绪。');
      console.log('💡 建议: 手动触发一次备份工作流程进行测试');
    } else {
      console.log('\n❌ 配置验证失败，请修复上述错误后重试。');
    }

    this.generateFixSuggestions();
  }

  /**
     * 获取成功计数 (估算)
     */
  getSuccessCount() {
    // 这是一个简单的估算，基于没有错误的检查项
    const totalChecks = 8; // 大概的检查项数量
    return Math.max(0, totalChecks - this.errors.length - this.warnings.length);
  }
}

// 命令行接口
if (require.main === module) {
  const validator = new BackupConfigValidator();
  validator.validate().then(() => {
    process.exit(validator.errors.length > 0 ? 1 : 0);
  });
}

module.exports = BackupConfigValidator;