'use strict';

/**
 * Almagest 主题兼容层：补齐 Stellar 迁移后缺失的通用短代码。
 *
 * 说明：
 * - 主题已自带: note / alert / button / asset_code
 * - 本站 about / contact 页面仍使用 Stellar 的 quot / timeline / checkbox / box / copy，
 *   这里以纯 HTML + 轻量样式实现等价效果（不依赖 Stellar 主题资源）。
 *
 * 使用方式与 Stellar 保持一致：
 *   {% quot 文案 [icon:xxx] %}
 *   {% timeline 标题 %} ... {% endtimeline %}
 *   {% checkbox [checked:true] 文案 %} 子内容
 *   {% box [color:xxx] %} 内容 {% endbox %}
 *   {% copy 文案 %}
 *
 * 注意：本站 scripts/ 下的脚本由 Hexo 以带 hexo 参数的方式加载；
 * 本文件被 scripts/tags/index.js require，因此导出工厂函数接收 hexo 实例。
 */

module.exports = function (hexo) {
  hexo.extend.tag.register('quot', function (args) {
    const text = args.filter((a) => !a.startsWith('icon:')).join(' ') || '';
    const icon = (args.find((a) => a.startsWith('icon:')) || '').split(':')[1];
    const iconHtml = icon ? '<span class="quot-icon">#</span>' : '';
    return `<div class="blockquote-quot">${iconHtml}<span class="quot-text">${text}</span></div>`;
  });

  hexo.extend.tag.register('timeline', function (args, content) {
    const title = args.join(' ') || '';
    const inner = hexo.render.renderSync({ text: content, engine: 'markdown' });
    return `<div class="timeline"><div class="timeline-title">${title}</div><div class="timeline-body">${inner}</div></div>`;
  }, { ends: true });

  hexo.extend.tag.register('checkbox', function (args, content) {
    const checked = args.includes('checked:true');
    const label = args.filter((a) => !a.startsWith('checked:')).join(' ');
    const check = checked ? 'checked' : '';
    return `<div class="checkbox-item"><input type="checkbox" ${check} disabled><span class="checkbox-label">${label}</span>${
      content ? `<div class="checkbox-desc">${content}</div>` : ''
    }</div>`;
  }, { ends: true });

  hexo.extend.tag.register('box', function (args, content) {
    const inner = hexo.render.renderSync({ text: content, engine: 'markdown' });
    return `<div class="box-note">${inner}</div>`;
  }, { ends: true });

  hexo.extend.tag.register('copy', function (args) {
    const text = (args.join(' ') || '').replace(/\\n/g, '<br>');
    return `<div class="copy-note">${text}</div>`;
  });
};
