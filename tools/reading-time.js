'use strict';

/* global hexo */

/**
 * Hexo Injector: 阅读时间 & 字数统计
 * 通过客户端 JS 注入到文章页面的 #post-meta 区域
 * 兼容 Stellar 主题，无需修改主题文件
 */

hexo.extend.injector.register('body_end', () => {
  return `
<script>
(function() {
  // 只在文章页面执行
  var article = document.querySelector('.md-text.content');
  var meta = document.getElementById('post-meta');
  if (!article || !meta) return;

  // 计算字数（中文按字计算，英文按词计算）
  var text = article.innerText || article.textContent || '';
  var cnChars = (text.match(/[\\u4e00-\\u9fa5]/g) || []).length;
  var enWords = text.replace(/[\\u4e00-\\u9fa5]/g, ' ')
    .split(/\\s+/)
    .filter(function(w) { return w.length > 0; }).length;
  var totalWords = cnChars + enWords;

  // 阅读时间（中文 300 字/分钟，英文 200 词/分钟）
  var minutes = Math.ceil(cnChars / 300 + enWords / 200);
  if (minutes < 1) minutes = 1;

  // 格式化字数
  var wordStr = totalWords >= 1000
    ? (totalWords / 1000).toFixed(1) + 'k'
    : totalWords;

  // 注入到 post-meta
  var span = document.createElement('span');
  span.className = 'text wordcount';
  span.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:3px;opacity:0.6"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' +
    '约 ' + wordStr + ' 字 · ' + minutes + ' 分钟阅读';
  span.style.cssText = 'opacity:0.6;font-size:0.85em;margin-left:8px;';

  meta.appendChild(span);
})();
</script>`;
}, 'post');
