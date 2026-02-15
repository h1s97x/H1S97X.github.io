'use strict';

const { alert } = require('@mdit/plugin-alert');
const { figure } = require('@mdit/plugin-figure');
const { obsidianImgSize } = require('@mdit/plugin-img-size');
// const { snippet } = require('@mdit/plugin-snippet');

module.exports.customize = (parser) => {
  parser.use(alert).use(figure).use(obsidianImgSize);

  // parser.use(snippet, {
  //   // `postPath` is provided by hexo-renderer-markdown-it
  //   // See: https://github.com/hexojs/hexo-renderer-markdown-it/blob/master/lib/renderer.js
  //   currentPath: (env) => env.postPath,
  // });
};

// 'use strict';

// // 添加 console.log 来检查导出结构
// const alertRaw = require('@mdit/plugin-alert');
// const figureRaw = require('@mdit/plugin-figure');
// const obsidianImageSizeRaw = require('@mdit/plugin-img-size');

// console.log("@mdit/plugin-alert raw export type:", typeof alertRaw);
// console.log("@mdit/plugin-alert raw export keys:", Object.keys(alertRaw));
// console.log("@mdit/plugin-alert raw export:", alertRaw);

// console.log("@mdit/plugin-figure raw export type:", typeof figureRaw);
// console.log("@mdit/plugin-figure raw export keys:", Object.keys(figureRaw));
// console.log("@mdit/plugin-figure raw export:", figureRaw);

// console.log("@mdit/plugin-img-size raw export type:", typeof obsidianImageSizeRaw);
// console.log("@mdit/plugin-img-size raw export keys:", Object.keys(obsidianImageSizeRaw));
// console.log("@mdit/plugin-img-size raw export:", obsidianImageSizeRaw);

// // 暂时注释掉实际的 use 调用，直到我们找到正确的加载方式
// module.exports.customize = (parser) => {
//   // parser.use(alertRaw.default || alertRaw); // 暂时注释
//   // parser.use(figureRaw.default || figureRaw); // 暂时注释
//   // parser.use(obsidianImageSizeRaw.default || obsidianImageSizeRaw); // 暂时注释

//   // parser.use(snippet, {
//   //   currentPath: (env) => env.postPath,
//   // });
// };
