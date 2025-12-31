#!/usr/bin/env node

/**
 * 自动部署脚本
 * 用于将博客部署到 GitHub Pages (gh-pages 分支)
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

class BlogDeployer {
    constructor() {
        this.rootDir = process.cwd();
        this.publicDir = path.join(this.rootDir, 'public');
        this.currentBranch = '';
        this.isDryRun = process.argv.includes('--dry-run');
    }

    /**
     * 执行命令并返回结果
     */
    execCommand(command, options = {}) {
        try {
            const result = execSync(command, {
                cwd: this.rootDir,
                encoding: 'utf8',
                stdio: this.isDryRun ? 'pipe' : 'inherit',
                ...options
            });
            return result.toString().trim();
        } catch (error) {
            console.error(`❌ 命令执行失败: ${command}`);
            console.error(error.message);
            throw error;
        }
    }

    /**
     * 检查Git仓库状态
     */
    checkGitStatus() {
        console.log('🔍 检查Git仓库状态...\n');

        // 检查是否在Git仓库中
        try {
            this.execCommand('git rev-parse --git-dir', { stdio: 'pipe' });
        } catch (error) {
            throw new Error('当前目录不是Git仓库');
        }

        // 获取当前分支
        this.currentBranch = this.execCommand('git branch --show-current', { stdio: 'pipe' });
        console.log(`📍 当前分支: ${this.currentBranch}`);

        // 检查是否有未提交的更改
        const status = this.execCommand('git status --porcelain', { stdio: 'pipe' });
        if (status) {
            console.log('⚠️  检测到未提交的更改:');
            console.log(status);
            
            if (!this.isDryRun) {
                const readline = require('readline');
                const rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout
                });

                return new Promise((resolve) => {
                    rl.question('是否继续部署？(y/N): ', (answer) => {
                        rl.close();
                        if (answer.toLowerCase() !== 'y') {
                            console.log('❌ 部署已取消');
                            process.exit(0);
                        }
                        resolve();
                    });
                });
            }
        } else {
            console.log('✅ 工作目录干净');
        }

        // 检查远程仓库
        try {
            const remoteUrl = this.execCommand('git remote get-url origin', { stdio: 'pipe' });
            console.log(`🔗 远程仓库: ${remoteUrl}`);
        } catch (error) {
            console.log('⚠️  未配置远程仓库');
        }

        console.log();
    }

    /**
     * 构建静态文件
     */
    buildSite() {
        console.log('🔨 构建静态网站...\n');

        if (this.isDryRun) {
            console.log('🔍 [预览模式] 跳过实际构建');
            return;
        }

        // 清理旧文件
        console.log('🧹 清理旧文件...');
        this.execCommand('npm run clean');

        // 生成静态文件
        console.log('📦 生成静态文件...');
        this.execCommand('npm run build');

        // 检查生成结果
        if (!fs.existsSync(this.publicDir)) {
            throw new Error('静态文件生成失败，public目录不存在');
        }

        const files = fs.readdirSync(this.publicDir);
        console.log(`✅ 生成完成，共 ${files.length} 个文件/目录`);
        console.log();
    }

    /**
     * 检查gh-pages分支是否存在
     */
    checkGhPagesBranch() {
        try {
            this.execCommand('git show-ref --verify --quiet refs/heads/gh-pages', { stdio: 'pipe' });
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * 创建gh-pages分支
     */
    createGhPagesBranch() {
        console.log('🌿 创建 gh-pages 分支...\n');

        if (this.isDryRun) {
            console.log('🔍 [预览模式] 跳过分支创建');
            return;
        }

        try {
            // 创建孤立分支
            this.execCommand('git checkout --orphan gh-pages');
            
            // 清空所有文件
            this.execCommand('git rm -rf .');
            
            // 创建初始提交
            fs.writeFileSync('README.md', '# GitHub Pages\n\n这是自动生成的部署分支。\n');
            this.execCommand('git add README.md');
            this.execCommand('git commit -m "Initial commit for gh-pages"');
            
            // 推送到远程
            this.execCommand('git push origin gh-pages');
            
            // 切回原分支
            this.execCommand(`git checkout ${this.currentBranch}`);
            
            console.log('✅ gh-pages 分支创建成功');
        } catch (error) {
            console.error('❌ 创建 gh-pages 分支失败');
            // 尝试切回原分支
            try {
                this.execCommand(`git checkout ${this.currentBranch}`);
            } catch (e) {
                console.error('❌ 无法切回原分支，请手动检查');
            }
            throw error;
        }
        console.log();
    }

    /**
     * 部署到gh-pages分支
     */
    deployToGhPages() {
        console.log('🚀 部署到 gh-pages 分支...\n');

        if (this.isDryRun) {
            console.log('🔍 [预览模式] 跳过实际部署');
            console.log('将要执行的操作:');
            console.log('  1. 切换到 gh-pages 分支');
            console.log('  2. 清空分支内容');
            console.log('  3. 复制 public/ 目录内容');
            console.log('  4. 提交并推送更改');
            console.log('  5. 切回原分支');
            return;
        }

        try {
            // 切换到gh-pages分支
            console.log('📍 切换到 gh-pages 分支...');
            this.execCommand('git checkout gh-pages');

            // 清空分支内容（保留.git目录）
            console.log('🧹 清空分支内容...');
            const files = fs.readdirSync(this.rootDir).filter(file => file !== '.git');
            for (const file of files) {
                const filePath = path.join(this.rootDir, file);
                if (fs.statSync(filePath).isDirectory()) {
                    fs.rmSync(filePath, { recursive: true, force: true });
                } else {
                    fs.unlinkSync(filePath);
                }
            }

            // 复制public目录内容到根目录
            console.log('📋 复制静态文件...');
            const publicFiles = fs.readdirSync(this.publicDir);
            for (const file of publicFiles) {
                const srcPath = path.join(this.publicDir, file);
                const destPath = path.join(this.rootDir, file);
                
                if (fs.statSync(srcPath).isDirectory()) {
                    this.copyDirectory(srcPath, destPath);
                } else {
                    fs.copyFileSync(srcPath, destPath);
                }
            }

            // 添加所有文件到Git
            console.log('📝 提交更改...');
            this.execCommand('git add .');

            // 检查是否有更改
            const status = this.execCommand('git status --porcelain', { stdio: 'pipe' });
            if (status) {
                // 创建提交信息
                const commitMessage = `deploy: ${new Date().toISOString().split('T')[0]}`;
                this.execCommand(`git commit -m "${commitMessage}"`);

                // 推送到远程
                console.log('🚀 推送到远程仓库...');
                this.execCommand('git push origin gh-pages');

                console.log('✅ 部署成功！');
            } else {
                console.log('ℹ️  没有更改需要部署');
            }

        } catch (error) {
            console.error('❌ 部署失败');
            throw error;
        } finally {
            // 切回原分支
            try {
                console.log(`📍 切回 ${this.currentBranch} 分支...`);
                this.execCommand(`git checkout ${this.currentBranch}`);
            } catch (error) {
                console.error('❌ 无法切回原分支，请手动检查');
            }
        }

        console.log();
    }

    /**
     * 递归复制目录
     */
    copyDirectory(src, dest) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }

        const files = fs.readdirSync(src);
        for (const file of files) {
            const srcPath = path.join(src, file);
            const destPath = path.join(dest, file);

            if (fs.statSync(srcPath).isDirectory()) {
                this.copyDirectory(srcPath, destPath);
            } else {
                fs.copyFileSync(srcPath, destPath);
            }
        }
    }

    /**
     * 显示部署结果
     */
    showResult() {
        console.log('🎉 部署完成！\n');
        
        try {
            const remoteUrl = this.execCommand('git remote get-url origin', { stdio: 'pipe' });
            const repoName = remoteUrl.split('/').pop().replace('.git', '');
            const username = remoteUrl.split('/').slice(-2, -1)[0].split(':').pop();
            
            console.log('📋 部署信息:');
            console.log(`   仓库: ${username}/${repoName}`);
            console.log(`   分支: gh-pages`);
            console.log(`   网址: https://${username}.github.io/${repoName}`);
            console.log();
            console.log('⏰ 注意: GitHub Pages 可能需要几分钟时间更新');
            console.log('🔗 可以在仓库的 Settings > Pages 中查看部署状态');
        } catch (error) {
            console.log('✅ 部署已完成，请在 GitHub 仓库中查看');
        }
    }

    /**
     * 执行完整部署流程
     */
    async deploy() {
        console.log('🚀 开始自动部署流程\n');
        console.log('='.repeat(50));

        try {
            // 1. 检查Git状态
            await this.checkGitStatus();

            // 2. 构建静态文件
            console.log('='.repeat(50));
            this.buildSite();

            // 3. 检查并创建gh-pages分支
            console.log('='.repeat(50));
            if (!this.checkGhPagesBranch()) {
                console.log('📋 gh-pages 分支不存在，将创建新分支');
                this.createGhPagesBranch();
            } else {
                console.log('✅ gh-pages 分支已存在');
                console.log();
            }

            // 4. 部署到gh-pages分支
            console.log('='.repeat(50));
            this.deployToGhPages();

            // 5. 显示结果
            console.log('='.repeat(50));
            this.showResult();

        } catch (error) {
            console.error('\n❌ 部署失败:');
            console.error(error.message);
            process.exit(1);
        }
    }

    /**
     * 显示帮助信息
     */
    showHelp() {
        console.log('📖 自动部署工具使用说明\n');
        console.log('用法:');
        console.log('  node tools/deploy.js [选项]\n');
        console.log('选项:');
        console.log('  --dry-run   预览模式，不执行实际操作');
        console.log('  --help      显示此帮助信息\n');
        console.log('功能:');
        console.log('  • 自动构建 Hexo 静态网站');
        console.log('  • 创建或更新 gh-pages 分支');
        console.log('  • 部署到 GitHub Pages');
        console.log('  • 自动切换分支和清理文件\n');
        console.log('示例:');
        console.log('  node tools/deploy.js --dry-run  # 预览部署过程');
        console.log('  node tools/deploy.js            # 执行实际部署');
        console.log('  npm run deploy                  # 使用npm脚本');
    }
}

// 主程序
async function main() {
    const deployer = new BlogDeployer();
    const args = process.argv.slice(2);

    if (args.includes('--help') || args.includes('-h')) {
        deployer.showHelp();
    } else {
        await deployer.deploy();
    }
}

// 如果直接运行此脚本
if (require.main === module) {
    main().catch(error => {
        console.error('❌ 程序异常退出:', error.message);
        process.exit(1);
    });
}

module.exports = BlogDeployer;