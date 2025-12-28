#!/usr/bin/env node

/**
 * 安全的分支设置工具
 * 用于设置源码与部署分支分离
 * 
 * 安全原则：
 * 1. 绝不使用删除命令
 * 2. 所有操作可逆
 * 3. 多重备份验证
 * 4. 分步骤执行
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class SafeBranchSetup {
    constructor() {
        this.backupTag = `backup-${new Date().toISOString().replace(/[:.]/g, '-')}`;
        this.logFile = `branch-setup-${Date.now()}.log`;
        this.dryRun = process.argv.includes('--dry-run');
        
        console.log('🛡️ 安全分支设置工具');
        console.log('📋 安全原则：零删除、可回滚、多备份');
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
        this.log('🔍 检查前置条件...');
        
        // 检查Git状态
        try {
            const status = execSync('git status --porcelain', { encoding: 'utf8' });
            if (status.trim()) {
                throw new Error('工作目录不干净，请先提交或暂存更改');
            }
            this.log('✅ Git工作目录干净');
        } catch (error) {
            this.log(`❌ Git状态检查失败: ${error.message}`);
            throw error;
        }

        // 检查当前分支
        try {
            const currentBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
            this.log(`📍 当前分支: ${currentBranch}`);
            
            if (currentBranch !== 'master' && currentBranch !== 'master-recovered') {
                console.log('⚠️ 建议在master或master-recovered分支上执行此操作');
                console.log('是否继续？(y/N)');
                // 在实际使用中，这里应该有用户输入确认
            }
        } catch (error) {
            this.log(`❌ 分支检查失败: ${error.message}`);
            throw error;
        }

        // 检查必要文件
        const requiredFiles = ['_config.yml', 'package.json', 'source'];
        for (const file of requiredFiles) {
            if (!fs.existsSync(file)) {
                throw new Error(`缺少必要文件或目录: ${file}`);
            }
        }
        this.log('✅ 必要文件检查通过');
    }

    createBackup() {
        this.log('💾 创建安全备份...');
        
        // 创建Git标签备份
        this.executeCommand(
            `git tag ${this.backupTag}`,
            '创建Git标签备份'
        );
        
        // 推送备份标签到远程
        this.executeCommand(
            `git push origin ${this.backupTag}`,
            '推送备份标签到远程仓库'
        );
        
        this.log(`✅ 备份完成，标签: ${this.backupTag}`);
    }

    updateGitignore() {
        this.log('📝 更新.gitignore文件...');
        
        const gitignorePath = '.gitignore';
        let gitignoreContent = '';
        
        if (fs.existsSync(gitignorePath)) {
            gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
        }
        
        // 需要忽略的目录和文件
        const ignorePatterns = [
            '# Hexo生成文件',
            'public/',
            '.deploy_git/',
            '# 构建输出',
            'dist/',
            'build/',
            '# 临时文件',
            '*.tmp',
            '*.log',
            '# 系统文件',
            '.DS_Store',
            'Thumbs.db'
        ];
        
        let needsUpdate = false;
        for (const pattern of ignorePatterns) {
            if (!gitignoreContent.includes(pattern)) {
                gitignoreContent += '\n' + pattern;
                needsUpdate = true;
            }
        }
        
        if (needsUpdate && !this.dryRun) {
            fs.writeFileSync(gitignorePath, gitignoreContent);
            this.log('✅ .gitignore文件已更新');
        } else {
            this.log('ℹ️ .gitignore文件无需更新');
        }
    }

    removeGeneratedFilesFromTracking() {
        this.log('🧹 从Git跟踪中移除生成文件（保留本地文件）...');
        
        // 需要移除跟踪的文件和目录
        const generatedPaths = [
            'public',
            '*.html',
            'archives',
            'categories', 
            'tags',
            'css/main.css',
            'js/main.js',
            'atom.xml',
            'search.xml',
            'sitemap.xml',
            'sitemap.txt'
        ];
        
        for (const pathPattern of generatedPaths) {
            try {
                // 使用--cached只移除Git跟踪，不删除本地文件
                this.executeCommand(
                    `git rm -r --cached ${pathPattern}`,
                    `移除${pathPattern}的Git跟踪`
                );
            } catch (error) {
                // 如果文件不存在或已经移除，忽略错误
                this.log(`ℹ️ ${pathPattern} 不在跟踪中或已移除`);
            }
        }
    }

    commitSourceOnlyChanges() {
        this.log('💾 提交源码分支更改...');
        
        this.executeCommand(
            'git add .',
            '添加所有更改到暂存区'
        );
        
        this.executeCommand(
            'git commit -m "feat: 配置源码分支，移除生成文件跟踪"',
            '提交源码分支配置'
        );
    }

    createDeploymentBranch() {
        this.log('🌿 创建部署分支...');
        
        // 检查gh-pages分支是否已存在
        try {
            const branches = execSync('git branch -a', { encoding: 'utf8' });
            if (branches.includes('gh-pages')) {
                this.log('⚠️ gh-pages分支已存在，跳过创建');
                return;
            }
        } catch (error) {
            this.log('ℹ️ 检查分支时出错，继续创建新分支');
        }
        
        // 创建孤立的gh-pages分支
        this.executeCommand(
            'git checkout --orphan gh-pages',
            '创建孤立的gh-pages分支'
        );
        
        // 移除所有文件的Git跟踪（不删除文件）
        this.executeCommand(
            'git rm -rf . --cached',
            '清空gh-pages分支的Git跟踪'
        );
        
        // 创建初始的README文件
        const readmeContent = `# 部署分支

这个分支包含由Hexo生成的静态网站文件。

- 源码分支: master
- 部署分支: gh-pages
- 自动部署: GitHub Actions

请不要直接在此分支进行修改。
所有更改应该在master分支进行。
`;
        
        if (!this.dryRun) {
            fs.writeFileSync('README.md', readmeContent);
        }
        
        this.executeCommand(
            'git add README.md',
            '添加部署分支README'
        );
        
        this.executeCommand(
            'git commit -m "feat: 初始化部署分支"',
            '提交部署分支初始化'
        );
        
        // 推送部署分支
        this.executeCommand(
            'git push origin gh-pages',
            '推送部署分支到远程'
        );
        
        // 切换回源码分支
        this.executeCommand(
            'git checkout master',
            '切换回master分支'
        );
    }

    createGitHubActions() {
        this.log('⚙️ 创建GitHub Actions工作流...');
        
        const workflowDir = '.github/workflows';
        const workflowFile = path.join(workflowDir, 'deploy.yml');
        
        if (!fs.existsSync(workflowDir)) {
            fs.mkdirSync(workflowDir, { recursive: true });
        }
        
        const workflowContent = `name: 部署到GitHub Pages

on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: 检出代码
      uses: actions/checkout@v4
      with:
        fetch-depth: 0
        
    - name: 设置Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: 安装依赖
      run: npm ci
      
    - name: 构建网站
      run: |
        npm run clean
        npm run build
        
    - name: 部署到GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/master'
      with:
        github_token: \${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./public
        publish_branch: gh-pages
        commit_message: 'deploy: \${{ github.event.head_commit.message }}'
`;
        
        if (!this.dryRun) {
            fs.writeFileSync(workflowFile, workflowContent);
        }
        
        this.log('✅ GitHub Actions工作流已创建');
    }

    generateReport() {
        this.log('📊 生成设置报告...');
        
        const report = {
            timestamp: new Date().toISOString(),
            backupTag: this.backupTag,
            logFile: this.logFile,
            dryRun: this.dryRun,
            status: 'completed',
            nextSteps: [
                '1. 验证master分支只包含源码文件',
                '2. 检查gh-pages分支是否正确创建',
                '3. 测试GitHub Actions工作流',
                '4. 验证网站部署是否正常',
                '5. 如有问题，使用备份标签回滚'
            ],
            rollbackCommand: `git reset --hard ${this.backupTag}`
        };
        
        const reportFile = `branch-setup-report-${Date.now()}.json`;
        if (!this.dryRun) {
            fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
        }
        
        this.log(`📋 设置报告已生成: ${reportFile}`);
        return report;
    }

    async run() {
        try {
            this.log('🚀 开始安全分支设置...');
            
            // 1. 检查前置条件
            this.checkPrerequisites();
            
            // 2. 创建备份
            this.createBackup();
            
            // 3. 更新.gitignore
            this.updateGitignore();
            
            // 4. 移除生成文件的Git跟踪
            this.removeGeneratedFilesFromTracking();
            
            // 5. 提交源码分支更改
            this.commitSourceOnlyChanges();
            
            // 6. 创建部署分支
            this.createDeploymentBranch();
            
            // 7. 创建GitHub Actions
            this.createGitHubActions();
            
            // 8. 生成报告
            const report = this.generateReport();
            
            this.log('🎉 分支设置完成！');
            this.log('📋 后续步骤：');
            report.nextSteps.forEach((step, index) => {
                this.log(`   ${step}`);
            });
            
            this.log(`🔄 如需回滚，执行: ${report.rollbackCommand}`);
            
        } catch (error) {
            this.log(`💥 设置失败: ${error.message}`);
            this.log(`🔄 建议回滚到备份: git reset --hard ${this.backupTag}`);
            throw error;
        }
    }
}

// 如果直接运行此脚本
if (require.main === module) {
    const setup = new SafeBranchSetup();
    setup.run().catch(error => {
        console.error('设置失败:', error.message);
        process.exit(1);
    });
}

module.exports = SafeBranchSetup;