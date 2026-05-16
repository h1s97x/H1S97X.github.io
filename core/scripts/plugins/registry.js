/**
 * Plugin Registry - 插件注册中心
 *
 * 自动发现并加载 plugins/ 目录下的插件
 * 参考 VSCode 扩展机制
 */

'use strict';

const fs = require('fs');
const path = require('path');

/**
 * 加载所有插件
 * @param {string} pluginsDir - 插件目录路径
 * @returns {Object} 加载的插件映射
 */
function loadPlugins(pluginsDir) {
  const plugins = {};
  const pluginDirs = fs.readdirSync(pluginsDir);

  pluginDirs.forEach(pluginName => {
    const pluginPath = path.join(pluginsDir, pluginName);

    // 跳过模板和隐藏目录
    if (pluginName.startsWith('_') || pluginName.startsWith('.')) {
      return;
    }

    // 检查是否为目录
    if (!fs.statSync(pluginPath).isDirectory()) {
      return;
    }

    // 检查插件入口文件
    const indexPath = path.join(pluginPath, 'index.js');
    if (!fs.existsSync(indexPath)) {
      hexo.log.warn(`Plugin ${pluginName}: index.js not found, skipping`);
      return;
    }

    try {
      const plugin = require(indexPath)(hexo);

      // 注册插件的各个部分
      if (plugin.filter) {
        registerFilter(hexo, pluginName, plugin.filter);
      }

      if (plugin.tag) {
        registerTag(hexo, pluginName, plugin.tag);
      }

      if (plugin.generator) {
        registerGenerator(hexo, pluginName, plugin.generator);
      }

      if (plugin.helper) {
        registerHelper(hexo, pluginName, plugin.helper);
      }

      if (plugin.config) {
        registerConfig(hexo, pluginName, plugin.config);
      }

      plugins[pluginName] = plugin;
      hexo.log.info(`Plugin loaded: ${pluginName}`);

    } catch (err) {
      hexo.log.error(`Failed to load plugin ${pluginName}:`, err);
    }
  });

  return plugins;
}

/**
 * 注册过滤器
 */
function registerFilter(hexo, pluginName, filters) {
  const filterList = Array.isArray(filters) ? filters : [filters];
  filterList.forEach(filter => {
    hexo.extend.filter.register(
      filter.name || `${pluginName}:filter`,
      filter.handler,
      filter.priority || 10
    );
  });
}

/**
 * 注册标签
 */
function registerTag(hexo, pluginName, tags) {
  const tagList = Array.isArray(tags) ? tags : [tags];
  tagList.forEach(tag => {
    const options = tag.ends ? { ends: true } : {};
    hexo.extend.tag.register(tag.name, tag.handler, options);
  });
}

/**
 * 注册生成器
 */
function registerGenerator(hexo, pluginName, generators) {
  const generatorList = Array.isArray(generators) ? generators : [generators];
  generatorList.forEach(generator => {
    hexo.extend.generator.register(generator.name, generator.handler);
  });
}

/**
 * 注册辅助函数
 */
function registerHelper(hexo, pluginName, helpers) {
  Object.keys(helpers).forEach(name => {
    hexo.extend.helper.register(`${pluginName}:${name}`, helpers[name]);
  });
}

/**
 * 注册配置
 */
function registerConfig(hexo, pluginName, config) {
  if (hexo.config.plugins) {
    hexo.config.plugins[pluginName] = config;
  } else {
    hexo.config.plugins = { [pluginName]: config };
  }
}

module.exports = loadPlugins;
