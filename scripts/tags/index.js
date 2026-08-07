'use strict';

// Almagest 主题已内置 note/alert/button/asset_code 标签，
// 这里加载本站为兼容旧 Stellar 内容而保留的通用短代码（quot/timeline/checkbox/box/copy）。
require('./almagest-compat')(hexo);

// 已移除（不再依赖 Stellar，且站点内容 0 使用）：
// - animcube  （动画魔方，Stellar 专属）
// - badge_github（GitHub 徽章，Stellar 专属）
// - invert   （暗色反转，Stellar 专属）
// asset_code 由 Almagest 主题 scripts/tags.js 提供，无需在此注册。
