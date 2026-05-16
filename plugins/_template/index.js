/**
 * Plugin Template - 插件模板
 *
 * 复制此模板创建新插件
 *
 * 插件结构:
 * ├── index.js          # 插件入口
 * ├── package.json      # 插件依赖
 * ├── scripts/          # 脚本目录
 * │   ├── filters/      # 过滤器
 * │   ├── tags/         # 标签
 * │   └── generators/   # 生成器
 * ├── configs/          # 配置目录
 * │   └── plugin-xxx.yml
 * ├── templates/        # 模板目录
 * ├── assets/           # 静态资源
 * └── test/             # 测试目录
 */

'use strict';

module.exports = function(hexo) {
  return {
    // 过滤器
    filter: [
      {
        name: 'xxx-filter',
        handler: require('./scripts/filters/xxx-filter'),
        priority: 10
      }
    ],

    // 标签
    tag: [
      {
        name: 'xxx-tag',
        handler: require('./scripts/tags/xxx-tag'),
        ends: false
      }
    ],

    // 生成器
    generator: [
      {
        name: 'xxx-generator',
        handler: require('./scripts/generators/xxx-generator')
      }
    ],

    // 辅助函数
    helper: {
      xxxHelper: require('./scripts/helpers/xxx-helper')
    },

    // 配置
    config: {
      enabled: true,
      option1: 'value1'
    }
  };
};
