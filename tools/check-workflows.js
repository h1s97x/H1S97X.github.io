#!/usr/bin/env node

/**
 * GitHub Actions 工作流检查工具
 * 验证所有工作流是否正确配置以支持Stellar主题
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

class WorkflowChecker {
  constructor() {
    this.workflowsDir = path.join(process.cwd(), '.github/workflows');
    this.errors = [];
    this.warnings = [];
    this.passed = [];
  }

  /**
   * 检查所有工作流文件
   */
  checkAllWorkflows() {
    console.log('🔍 检查GitHub Actions工作流配置...\n');

    if (!fs.existsSync(this.workflowsDir)) {
      this.errors.push('GitHub Actions工作流目录不存在');
      return this.showResults();
    }

    const workflowFiles = fs.readdirSync(this.workflowsDir)
      .filter(file => file.endsWith('.yml') || file.endsWith('.yaml'));

    if (workflowFiles.length === 0) {
      this.warnings.push('未找到工作流文件');
      return this.showResults();
    }

    console.log(`📋 发现 ${workflowFiles.length} 个工作流文件:`);
    workflowFiles.forEach(file => console.log(`   - ${file}`));
    console.log();

    // 检查每个工作流文件
    workflowFiles.forEach(file => {
      this.checkWorkflowFile(file);
    });

    this.showResults();
  }

  /**
   * 检查单个工作流文件
   */
  checkWorkflowFile(filename) {
    const filePath = path.join(this.workflowsDir, filename);
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const workflow = yaml.load(content);
      
      console.log(`🔍 检查工作流: ${filename}`);
      
      // 基础检查
      this.checkBasicStructure(filename, workflow);
      
      // Stellar主题特定检查
      this.checkStellarSupport(filename, workflow);
      
      console.log();
      
    } catch (error) {
      this.errors.push(`${filename}: 解析失败 - ${error.message}`);
    }
  }

  /**
   * 检查工作流基础结构
   */
  checkBasicStructure(filename, workflow) {
    // 检查必需字段
    if (!workflow.name) {
      this.warnings.push(`${filename}: 缺少工作流名称`);
    } else {
      this.passed.push(`${filename}: 工作流名称 "${workflow.name}"`);
    }

    if (!workflow.on) {
      this.errors.push(`${filename}: 缺少触发条件`);
    } else {
      this.passed.push(`${filename}: 触发条件已配置`);
    }

    if (!workflow.jobs || Object.keys(workflow.jobs).length === 0) {
      this.errors.push(`${filename}: 缺少作业定义`);
    } else {
      this.passed.push(`${filename}: 包含 ${Object.keys(workflow.jobs).length} 个作业`);
    }
  }

  /**
   * 检查Stellar主题支持
   */
  checkStellarSupport(filename, workflow) {
    const jobs = workflow.jobs || {};
    let hasSubmoduleSupport = false;
    let hasStellarValidation = false;
    let hasThemeInit = false;

    // 检查每个作业
    Object.entries(jobs).forEach(([_jobName, job]) => {
      const steps = job.steps || [];
      
      // 检查子模块支持
      steps.forEach(step => {
        if (step.uses === 'actions/checkout@v4' && step.with && step.with.submodules) {
          hasSubmoduleSupport = true;
        }
        
        if (step.run && step.run.includes('submodule update')) {
          hasThemeInit = true;
        }
        
        if (step.run && step.run.includes('stellar:validate')) {
          hasStellarValidation = true;
        }
      });
    });

    // 评估Stellar支持
    if (hasSubmoduleSupport) {
      this.passed.push(`${filename}: 支持Git子模块`);
    } else {
      this.warnings.push(`${filename}: 未启用Git子模块支持`);
    }

    if (hasThemeInit) {
      this.passed.push(`${filename}: 包含主题初始化`);
    } else {
      this.warnings.push(`${filename}: 缺少主题初始化步骤`);
    }

    if (hasStellarValidation) {
      this.passed.push(`${filename}: 包含Stellar配置验证`);
    } else {
      this.warnings.push(`${filename}: 缺少Stellar配置验证`);
    }

    // 检查部署相关配置
    this.checkDeploymentConfig(filename, workflow);
  }

  /**
   * 检查部署配置
   */
  checkDeploymentConfig(filename, workflow) {
    const jobs = workflow.jobs || {};
    let hasGitHubPagesDeployment = false;
    let hasProperBuildSteps = false;

    Object.entries(jobs).forEach(([_jobName, job]) => {
      const steps = job.steps || [];
      
      // 检查GitHub Pages部署
      steps.forEach(step => {
        if (step.uses && step.uses.includes('peaceiris/actions-gh-pages')) {
          hasGitHubPagesDeployment = true;
          
          // 检查部署配置
          if (step.with && step.with.publish_dir === './public') {
            this.passed.push(`${filename}: GitHub Pages部署配置正确`);
          } else {
            this.warnings.push(`${filename}: GitHub Pages部署目录可能不正确`);
          }
        }
        
        // 检查构建步骤
        if (step.run && (step.run.includes('npm run build') || step.run.includes('hexo generate'))) {
          hasProperBuildSteps = true;
        }
      });
    });

    if (hasGitHubPagesDeployment) {
      this.passed.push(`${filename}: 包含GitHub Pages部署`);
    }

    if (hasProperBuildSteps) {
      this.passed.push(`${filename}: 包含构建步骤`);
    }
  }

  /**
   * 显示检查结果
   */
  showResults() {
    console.log('='.repeat(60));
    console.log('📊 工作流检查结果\n');

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
      console.log('\n🎉 所有工作流都已正确配置支持Stellar主题！');
    } else {
      console.log('\n💡 建议修复上述错误以确保工作流正常运行');
    }

    // 提供改进建议
    this.provideSuggestions();
  }

  /**
   * 提供改进建议
   */
  provideSuggestions() {
    console.log('\n💡 Stellar主题工作流优化建议:');
    console.log('   1. 确保所有工作流都启用了Git子模块支持');
    console.log('   2. 在构建前添加Stellar配置验证步骤');
    console.log('   3. 使用 npm run stellar:test 进行完整测试');
    console.log('   4. 在部署前验证关键文件是否生成');
    console.log('   5. 添加构建统计信息以便监控');
    console.log('\n📚 相关文档:');
    console.log('   - Stellar主题文档: https://xaoxuu.com/wiki/stellar/');
    console.log('   - GitHub Actions文档: https://docs.github.com/actions');
    console.log('   - 部署指南: docs/STELLAR_DEPLOYMENT_GUIDE.md');
  }

  /**
   * 生成工作流状态报告
   */
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        total: this.passed.length + this.warnings.length + this.errors.length,
        passed: this.passed.length,
        warnings: this.warnings.length,
        errors: this.errors.length
      },
      details: {
        passed: this.passed,
        warnings: this.warnings,
        errors: this.errors
      },
      recommendations: [
        '启用Git子模块支持',
        '添加Stellar配置验证',
        '使用stellar:test进行测试',
        '验证构建输出文件',
        '添加构建统计信息'
      ]
    };

    const reportPath = 'workflow-check-report.json';
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n📄 详细报告已保存到: ${reportPath}`);
  }
}

// 主程序
function main() {
  const checker = new WorkflowChecker();
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    console.log('📖 GitHub Actions工作流检查工具\n');
    console.log('用法:');
    console.log('  node tools/check-workflows.js [选项]\n');
    console.log('选项:');
    console.log('  --report    生成详细的JSON报告');
    console.log('  --help      显示此帮助信息\n');
    console.log('功能:');
    console.log('  • 检查工作流文件语法');
    console.log('  • 验证Stellar主题支持');
    console.log('  • 检查子模块配置');
    console.log('  • 验证部署配置');
    console.log('  • 提供优化建议');
    return;
  }

  checker.checkAllWorkflows();

  if (args.includes('--report')) {
    checker.generateReport();
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = WorkflowChecker;