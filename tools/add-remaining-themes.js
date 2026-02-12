#!/usr/bin/env node

/**
 * 添加剩余主题子模块的脚本
 * 用于在网络稳定时添加AnZhiYu和Stellar主题
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class ThemeSubmoduleManager {
  constructor() {
    this.rootDir = process.cwd();
    this.remainingThemes = [
      {
        name: 'anzhiyu',
        url: 'https://github.com/anzhiyu-c/hexo-theme-anzhiyu.git',
        path: 'themes/anzhiyu',
        description: 'AnZhiYu主题 - 基于Butterfly主题的个人定制版本'
      },
      {
        name: 'stellar',
        url: 'https://github.com/xaoxuu/hexo-theme-stellar.git',
        path: 'themes/stellar',
        description: 'Stellar主题 - 内置文档系统的简约博客主题'
      }
    ];
  }

  /**
     * 执行命令并返回结果
     */
  execCommand(command, options = {}) {
    try {
      const result = execSync(command, {
        cwd: this.rootDir,
        encoding: 'utf8',
        stdio: 'inherit',
        ...options
      });
      return result;
    } catch (error) {
      console.error(`❌ 命令执行失败: ${command}`);
      console.error(error.message);
      throw error;
    }
  }

  /**
     * 检查网络连接
     */
  async checkNetworkConnection() {
    console.log('🔍 检查网络连接...\n');
        
    for (const theme of this.remainingThemes) {
      try {
        console.log(`📡 测试连接: ${theme.url}`);
        this.execCommand(`git ls-remote ${theme.url} HEAD`, { stdio: 'pipe' });
        console.log(`✅ ${theme.name} 主题仓库连接正常`);
      } catch {
        console.log(`❌ ${theme.name} 主题仓库连接失败`);
        return false;
      }
    }
        
    console.log('\n🎉 所有主题仓库连接正常！\n');
    return true;
  }

  /**
     * 检查主题是否已存在
     */
  checkThemeExists(themePath) {
    return fs.existsSync(path.join(this.rootDir, themePath));
  }

  /**
     * 添加单个主题子模块
     */
  addThemeSubmodule(theme) {
    console.log(`📦 添加 ${theme.name} 主题子模块...`);
    console.log(`   仓库: ${theme.url}`);
    console.log(`   路径: ${theme.path}`);
        
    try {
      // 检查是否已存在
      if (this.checkThemeExists(theme.path)) {
        console.log(`⚠️  ${theme.path} 已存在，跳过添加`);
        return false;
      }

      // 添加子模块
      this.execCommand(`git submodule add ${theme.url} ${theme.path}`);
      console.log(`✅ ${theme.name} 主题添加成功`);
      return true;
    } catch {
      console.error(`❌ ${theme.name} 主题添加失败`);
      return false;
    }
  }

  /**
     * 添加所有剩余主题
     */
  addAllRemainingThemes() {
    console.log('🚀 开始添加剩余主题子模块\n');
        
    let successCount = 0;
    let failCount = 0;

    for (const theme of this.remainingThemes) {
      console.log('='.repeat(50));
      if (this.addThemeSubmodule(theme)) {
        successCount++;
      } else {
        failCount++;
      }
      console.log();
    }

    console.log('='.repeat(50));
    console.log('📊 添加结果统计:');
    console.log(`   成功: ${successCount} 个主题`);
    console.log(`   失败: ${failCount} 个主题`);

    if (successCount > 0) {
      console.log('\n📋 后续操作:');
      console.log('   1. git submodule update --init --recursive');
      console.log('   2. git add .');
      console.log('   3. git commit -m "feat(themes): 添加剩余主题子模块"');
      console.log('   4. git push origin master');
    }

    return { successCount, failCount };
  }

  /**
     * 初始化所有子模块
     */
  initializeSubmodules() {
    console.log('🔄 初始化所有子模块...\n');
        
    try {
      this.execCommand('git submodule update --init --recursive');
      console.log('✅ 子模块初始化完成');
    } catch (error) {
      console.error('❌ 子模块初始化失败');
      throw error;
    }
  }

  /**
     * 检查子模块状态
     */
  checkSubmoduleStatus() {
    console.log('📋 检查子模块状态...\n');
        
    try {
      this.execCommand('git submodule status');
    } catch {
      console.error('❌ 无法获取子模块状态');
    }
  }

  /**
     * 更新.gitmodules文件说明
     */
  updateGitmodulesComments() {
    const gitmodulesPath = path.join(this.rootDir, '.gitmodules');
        
    if (!fs.existsSync(gitmodulesPath)) {
      console.log('⚠️  .gitmodules 文件不存在');
      return;
    }

    let content = fs.readFileSync(gitmodulesPath, 'utf8');
        
    // 添加文件头注释
    const header = `# Hexo主题子模块配置
# 管理多个热门Hexo主题，支持快速切换和更新
# 
# 使用方法:
# 1. 初始化子模块: git submodule update --init --recursive
# 2. 更新子模块: git submodule update --remote
# 3. 切换主题: 修改_config.yml中的theme字段
#
# 主题列表:
# - butterfly: 美观、功能丰富的主题
# - next: 优雅、简洁的主题  
# - anzhiyu: 基于Butterfly的定制主题
# - stellar: 内置文档系统的简约主题
#

`;

    if (!content.startsWith('# Hexo主题子模块配置')) {
      content = header + content;
      fs.writeFileSync(gitmodulesPath, content);
      console.log('✅ 更新 .gitmodules 文件注释');
    }
  }

  /**
     * 显示使用指南
     */
  showUsageGuide() {
    console.log('📖 主题子模块使用指南\n');
        
    console.log('🔄 子模块管理命令:');
    console.log('   git submodule update --init --recursive  # 初始化所有子模块');
    console.log('   git submodule update --remote            # 更新所有子模块');
    console.log('   git submodule status                     # 查看子模块状态');
    console.log();
        
    console.log('🎨 主题切换方法:');
    console.log('   在 _config.yml 中修改 theme 字段:');
    console.log('   theme: butterfly  # 使用Butterfly主题');
    console.log('   theme: next       # 使用Next主题');
    console.log('   theme: anzhiyu    # 使用AnZhiYu主题');
    console.log('   theme: stellar    # 使用Stellar主题');
    console.log();
        
    console.log('📝 主题配置文件:');
    console.log('   _config.butterfly.yml  # Butterfly主题配置');
    console.log('   _config.next.yml       # Next主题配置');
    console.log('   _config.anzhiyu.yml    # AnZhiYu主题配置');
    console.log('   _config.stellar.yml    # Stellar主题配置');
    console.log();
        
    console.log('🔗 主题文档链接:');
    for (const theme of this.remainingThemes) {
      console.log(`   ${theme.name}: ${theme.url}`);
    }
  }

  /**
     * 执行完整的添加流程
     */
  async run() {
    console.log('🎨 Hexo主题子模块管理工具\n');
    console.log('='.repeat(50));

    try {
      // 1. 检查网络连接
      const networkOk = await this.checkNetworkConnection();
      if (!networkOk) {
        console.log('❌ 网络连接不稳定，请稍后重试');
        console.log('💡 建议检查网络连接或使用VPN');
        return;
      }

      // 2. 添加剩余主题
      const result = this.addAllRemainingThemes();
            
      if (result.successCount > 0) {
        // 3. 初始化子模块
        console.log('='.repeat(50));
        this.initializeSubmodules();
                
        // 4. 更新.gitmodules注释
        console.log('\n' + '='.repeat(50));
        this.updateGitmodulesComments();
                
        // 5. 检查最终状态
        console.log('\n' + '='.repeat(50));
        this.checkSubmoduleStatus();
      }

      // 6. 显示使用指南
      console.log('\n' + '='.repeat(50));
      this.showUsageGuide();

    } catch (error) {
      console.error('\n❌ 执行过程中出现错误:');
      console.error(error.message);
      process.exit(1);
    }
  }
}

// 主程序
async function main() {
  const manager = new ThemeSubmoduleManager();
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    manager.showUsageGuide();
  } else if (args.includes('--check')) {
    await manager.checkNetworkConnection();
  } else if (args.includes('--status')) {
    manager.checkSubmoduleStatus();
  } else {
    await manager.run();
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main().catch(error => {
    console.error('❌ 程序异常退出:', error.message);
    process.exit(1);
  });
}

module.exports = ThemeSubmoduleManager;