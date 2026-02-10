#!/usr/bin/env node

/**
 * 私有备份仓库设置脚本
 * 用于创建和配置与当前仓库同名的私有GitHub仓库
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class PrivateBackupSetup {
  constructor() {
    this.currentRepoName = this.getCurrentRepoName();
    this.privateRepoName = `${this.currentRepoName}-private-backup`;
    this.configPath = '.github/private-backup-config.json';
  }

  /**
     * 获取当前仓库名称
     */
  getCurrentRepoName() {
    try {
      const remoteUrl = execSync('git config --get remote.origin.url', { encoding: 'utf8' }).trim();
      const match = remoteUrl.match(/github\.com[:/]([^/]+)\/(.+?)(?:\.git)?$/);
      if (match) {
        return match[2];
      }
      throw new Error('无法解析仓库名称');
    } catch (error) {
      console.error('❌ 获取仓库名称失败:', error.message);
      process.exit(1);
    }
  }

  /**
     * 检查GitHub CLI是否已安装
     */
  checkGitHubCLI() {
    try {
      execSync('gh --version', { stdio: 'ignore' });
      return true;
    } catch {
      return false;
    }
  }

  /**
     * 检查GitHub CLI认证状态
     */
  checkGitHubAuth() {
    try {
      execSync('gh auth status', { stdio: 'ignore' });
      return true;
    } catch {
      return false;
    }
  }

  /**
     * 创建私有备份仓库
     */
  async createPrivateRepo() {
    console.log('🚀 开始创建私有备份仓库...');
        
    if (!this.checkGitHubCLI()) {
      console.error('❌ GitHub CLI 未安装。请先安装 GitHub CLI: https://cli.github.com/');
      console.log('💡 安装后运行: gh auth login');
      return false;
    }

    if (!this.checkGitHubAuth()) {
      console.error('❌ GitHub CLI 未认证。请运行: gh auth login');
      return false;
    }

    try {
      // 检查仓库是否已存在
      try {
        execSync(`gh repo view ${this.privateRepoName}`, { stdio: 'ignore' });
        console.log(`✅ 私有仓库 ${this.privateRepoName} 已存在`);
        return true;
      } catch {
        // 仓库不存在，继续创建
      }

      // 创建私有仓库
      console.log(`📦 创建私有仓库: ${this.privateRepoName}`);
      execSync(`gh repo create ${this.privateRepoName} --private --description "Private backup for ${this.currentRepoName}"`, 
        { stdio: 'inherit' });

      console.log('✅ 私有备份仓库创建成功');
      return true;
    } catch (error) {
      console.error('❌ 创建私有仓库失败:', error.message);
      return false;
    }
  }

  /**
     * 配置远程仓库连接
     */
  configureRemote() {
    console.log('🔗 配置远程仓库连接...');
        
    try {
      // 获取当前用户名
      const username = execSync('gh api user --jq .login', { encoding: 'utf8' }).trim();
      const remoteUrl = `https://github.com/${username}/${this.privateRepoName}.git`;

      // 检查是否已存在 backup 远程
      try {
        execSync('git remote get-url backup', { stdio: 'ignore' });
        console.log('🔄 更新现有的 backup 远程...');
        execSync(`git remote set-url backup ${remoteUrl}`);
      } catch {
        console.log('➕ 添加 backup 远程...');
        execSync(`git remote add backup ${remoteUrl}`);
      }

      console.log(`✅ 远程仓库配置完成: ${remoteUrl}`);
      return { username, remoteUrl };
    } catch (error) {
      console.error('❌ 配置远程仓库失败:', error.message);
      return null;
    }
  }

  /**
     * 验证仓库访问权限
     */
  async verifyAccess() {
    console.log('🔐 验证仓库访问权限...');
        
    try {
      // 测试推送权限
      execSync('git ls-remote backup', { stdio: 'ignore' });
      console.log('✅ 仓库访问权限验证成功');
      return true;
    } catch (error) {
      console.error('❌ 仓库访问权限验证失败:', error.message);
      console.log('💡 请检查 GitHub 认证状态和仓库权限');
      return false;
    }
  }

  /**
     * 生成访问令牌配置说明
     */
  generateTokenInstructions() {
    const instructions = `
# GitHub 访问令牌配置说明

## 为 GitHub Actions 配置访问令牌

1. **创建个人访问令牌 (PAT)**:
   - 访问: https://github.com/settings/tokens
   - 点击 "Generate new token" > "Generate new token (classic)"
   - 设置令牌名称: \`${this.privateRepoName}-backup-token\`
   - 选择权限:
     - \`repo\` (完整仓库访问权限)
     - \`workflow\` (工作流程权限)
   - 点击 "Generate token" 并复制令牌

2. **配置仓库 Secrets**:
   - 访问当前仓库的 Settings > Secrets and variables > Actions
   - 添加以下 secrets:
     - \`BACKUP_REPO_TOKEN\`: 刚创建的个人访问令牌
     - \`BACKUP_REPO_NAME\`: \`$(gh api user --jq .login)/${this.privateRepoName}\`

3. **验证配置**:
   - 手动触发 "Daily Repository Backup" 工作流程
   - 检查工作流程日志确认备份成功

## 本地配置 (可选)

如果需要本地脚本访问私有仓库，可以配置环境变量:

\`\`\`bash
# Windows (PowerShell)
$env:GITHUB_TOKEN = "your_token_here"

# Linux/macOS
export GITHUB_TOKEN="your_token_here"
\`\`\`

## 安全注意事项

- ⚠️  **永远不要**将访问令牌提交到代码仓库
- 🔒 定期轮换访问令牌 (建议每90天)
- 👥 只授予必要的最小权限
- 📝 为令牌添加描述性名称以便管理
`;

    return instructions;
  }

  /**
     * 保存配置信息
     */
  saveConfig(config) {
    console.log('💾 保存配置信息...');
        
    const configData = {
      privateRepoName: this.privateRepoName,
      remoteUrl: config.remoteUrl,
      username: config.username,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };

    // 确保 .github 目录存在
    const githubDir = path.dirname(this.configPath);
    if (!fs.existsSync(githubDir)) {
      fs.mkdirSync(githubDir, { recursive: true });
    }

    fs.writeFileSync(this.configPath, JSON.stringify(configData, null, 2));
    console.log(`✅ 配置已保存到: ${this.configPath}`);

    // 生成令牌配置说明
    const instructionsPath = '.github/BACKUP_TOKEN_SETUP.md';
    fs.writeFileSync(instructionsPath, this.generateTokenInstructions());
    console.log(`📋 令牌配置说明已保存到: ${instructionsPath}`);
  }

  /**
     * 执行完整设置流程
     */
  async setup() {
    console.log('🎯 开始设置私有备份仓库...');
    console.log(`📂 当前仓库: ${this.currentRepoName}`);
    console.log(`🔒 私有备份仓库: ${this.privateRepoName}`);
    console.log('');

    // 1. 创建私有仓库
    const repoCreated = await this.createPrivateRepo();
    if (!repoCreated) {
      return false;
    }

    // 2. 配置远程连接
    const remoteConfig = this.configureRemote();
    if (!remoteConfig) {
      return false;
    }

    // 3. 验证访问权限
    const accessVerified = await this.verifyAccess();
    if (!accessVerified) {
      return false;
    }

    // 4. 保存配置
    this.saveConfig(remoteConfig);

    console.log('');
    console.log('🎉 私有备份仓库设置完成!');
    console.log('');
    console.log('📋 下一步操作:');
    console.log('1. 查看 .github/BACKUP_TOKEN_SETUP.md 配置访问令牌');
    console.log('2. 在仓库 Settings > Secrets 中添加必要的 secrets');
    console.log('3. 测试运行备份工作流程');
    console.log('');
    console.log('💡 提示: 运行 npm run backup:test 测试备份功能');

    return true;
  }

  /**
     * 显示当前配置状态
     */
  showStatus() {
    console.log('📊 私有备份仓库状态:');
    console.log('');

    // 检查配置文件
    if (fs.existsSync(this.configPath)) {
      const config = JSON.parse(fs.readFileSync(this.configPath, 'utf8'));
      console.log('✅ 配置文件存在');
      console.log(`   📂 私有仓库: ${config.privateRepoName}`);
      console.log(`   🔗 远程URL: ${config.remoteUrl}`);
      console.log(`   👤 用户名: ${config.username}`);
      console.log(`   📅 创建时间: ${new Date(config.createdAt).toLocaleString()}`);
    } else {
      console.log('❌ 配置文件不存在');
    }

    // 检查远程仓库
    try {
      const remoteUrl = execSync('git remote get-url backup', { encoding: 'utf8' }).trim();
      console.log('✅ backup 远程已配置');
      console.log(`   🔗 URL: ${remoteUrl}`);
    } catch {
      console.log('❌ backup 远程未配置');
    }

    // 检查GitHub CLI
    if (this.checkGitHubCLI()) {
      console.log('✅ GitHub CLI 已安装');
      if (this.checkGitHubAuth()) {
        console.log('✅ GitHub CLI 已认证');
      } else {
        console.log('❌ GitHub CLI 未认证');
      }
    } else {
      console.log('❌ GitHub CLI 未安装');
    }
  }
}

// 命令行接口
if (require.main === module) {
  const args = process.argv.slice(2);
  const setup = new PrivateBackupSetup();

  if (args.includes('--status')) {
    setup.showStatus();
  } else if (args.includes('--help')) {
    console.log(`
使用方法: node tools/setup-private-backup.js [选项]

选项:
  --status    显示当前配置状态
  --help      显示此帮助信息

示例:
  node tools/setup-private-backup.js          # 执行完整设置
  node tools/setup-private-backup.js --status # 查看状态
`);
  } else {
    setup.setup().then(success => {
      process.exit(success ? 0 : 1);
    });
  }
}

module.exports = PrivateBackupSetup;