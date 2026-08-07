'use strict';

/**
 * Almagest 主题配置覆盖层
 *
 * Hexo 将 `theme_config` 与主题默认 `_config.yml` 做 deepMerge，
 * 对象字段（如 menu）会递归合并而非整组覆盖，导致主题默认菜单
 * （Home/Archives/...）与本站中文菜单并存。
 * 这里在 generate 前将本站配置整组覆盖，保证菜单/社交链接等符合预期。
 */

hexo.on('generateBefore', () => {
  const tc = hexo.config.theme_config || {};

  if (tc.menu) {
    hexo.theme.config.menu = tc.menu;
  }
  if (tc.social) {
    hexo.theme.config.social = tc.social;
  }
});
