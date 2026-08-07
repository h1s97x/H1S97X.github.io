#!/usr/bin/env node

/**
 * Almagest主题配置验证工具
 * 验证主题配置的正确性和完整性
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

class AlmagestThemeValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.info = [];
  }

  /**
   * 验证主题配置
   */
  async validate() {
    console.log('🔍 开始验证Almagest主题配置...\n');

    try {
      // 验证主配置文件
      await this.validateMainConfig();

      // 验证主题目录
      await this.validateThemeFiles();

      // 输出验证结果
      this.outputResults();
    } catch (error) {
      console.error('❌ 验证过程中发生错误:', error.message);
      process.exit(1);
    }
  }

  /**
   * 验证主配置文件
   */
  async validateMainConfig() {
    const configPath = '_config.yml';

    if (!fs.existsSync(configPath)) {
      this.errors.push('主配置文件 _config.yml 不存在');
      return;
    }

    try {
      const configContent = fs.readFileSync(configPath, 'utf8');
      const config = yaml.load(configContent);

      // 检查主题设置
      if (config.theme !== 'almagest') {
        this.errors.push(
          `主题设置错误: 期望 'almagest', 实际 '${config.theme}'`
        );
      } else {
        this.info.push('✅ 主题设置正确: almagest');
      }

      // 检查 theme_config
      if (config.theme_config && typeof config.theme_config === 'object') {
        this.info.push('✅ theme_config 已配置');
        const requiredFields = ['title', 'author', 'language', 'url'];
        requiredFields.forEach((field) => {
          if (!config[field]) {
            this.warnings.push(`建议设置 ${field} 字段`);
          } else {
            this.info.push(`✅ ${field}: ${config[field]}`);
          }
        });
      } else {
        this.warnings.push('未配置 theme_config（建议在 _config.yml 中覆盖主题配置）');
      }
    } catch (error) {
      this.errors.push(`解析主配置文件失败: ${error.message}`);
    }
  }

  /**
   * 验证主题文件存在性
   */
  async validateThemeFiles() {
    const themePath = 'themes/almagest';

    if (!fs.existsSync(themePath)) {
      this.errors.push('Almagest主题目录不存在: themes/almagest');
      return;
    }

    // 检查主题关键文件
    const requiredFiles = [
      'package.json',
      '_config.yml',
      'layout/index.ejs',
      'source/css/main.styl',
      'source/js/theme.js',
      'scripts/tags.js',
    ];

    requiredFiles.forEach((file) => {
      const filePath = path.join(themePath, file);
      if (fs.existsSync(filePath)) {
        this.info.push(`✅ 主题文件存在: ${file}`);
      } else {
        this.errors.push(`主题文件缺失: ${file}`);
      }
    });

    // 检查主题版本
    const packagePath = path.join(themePath, 'package.json');
    if (fs.existsSync(packagePath)) {
      try {
        const packageContent = fs.readFileSync(packagePath, 'utf8');
        const packageInfo = JSON.parse(packageContent);
        this.info.push(`✅ 主题版本: ${packageInfo.version || 'unknown'}`);
      } catch {
        this.warnings.push('无法读取主题版本信息');
      }
    }
  }

  /**
   * 输出验证结果
   */
  outputResults() {
    console.log('\n📊 验证结果汇总:\n');

    // 输出错误
    if (this.errors.length > 0) {
      console.log('❌ 错误:');
      this.errors.forEach((error) => console.log(`   ${error}`));
      console.log();
    }

    // 输出警告
    if (this.warnings.length > 0) {
      console.log('⚠️ 警告:');
      this.warnings.forEach((warning) => console.log(`   ${warning}`));
      console.log();
    }

    // 输出信息
    if (this.info.length > 0) {
      console.log('ℹ️ 配置信息:');
      this.info.forEach((info) => console.log(`   ${info}`));
      console.log();
    }

    // 总结
    if (this.errors.length === 0) {
      console.log('🎉 Almagest主题配置验证通过!');
      if (this.warnings.length > 0) {
        console.log(`💡 有 ${this.warnings.length} 个建议可以优化配置`);
      }
    } else {
      console.log(`💥 发现 ${this.errors.length} 个错误需要修复`);
      process.exit(1);
    }
  }
}

// 主函数
async function main() {
  const validator = new AlmagestThemeValidator();
  await validator.validate();
}

// 如果直接运行此脚本
if (require.main === module) {
  main().catch((err) => {
    console.error('验证失败:', err);
    process.exit(1);
  });
}

module.exports = AlmagestThemeValidator;
