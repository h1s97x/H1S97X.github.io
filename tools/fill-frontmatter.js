#!/usr/bin/env node
/**
 * 批量补齐文章 frontmatter 的 description 和 tags
 *
 * 用法: node tools/fill-frontmatter.js
 *
 * 行为:
 *  - 遍历 source/ 下的文章(_posts 与 notes 目录下的 index.md)
 *  - 跳过页面文件(source/about、notes/index、coding/index、search、tags、contact)
 *  - 为缺失 description 的文章自动提取正文前 100 字符(去除 Markdown/模板语法)
 *  - 为缺失 tags 的文章按规则表(按文件名关键词匹配)打标签
 *  - 幂等: 已有 description/tags 的文章不覆盖
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SOURCE = path.join(ROOT, 'source');

// 页面文件(不处理)
const PAGE_FILES = [
  'source/about/index.md',
  'source/notes/index.md',
  'source/coding/index.md',
  'source/search/index.md',
  'source/tags/index.md',
  'source/contact/index.md',
];

/** 列出 source 下所有 md 文件(绝对路径) */
function listMarkdownFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...listMarkdownFiles(full));
    } else if (entry.name.endsWith('.md')) {
      results.push(full);
    }
  }
  return results;
}

/** 解析 frontmatter: 返回 { fmText, raw } */
function parseFrontmatter(content) {
  if (!content.startsWith('---\n')) return null;
  const end = content.indexOf('\n---', 4);
  if (end === -1) return null;
  const fmText = content.slice(4, end);
  const raw = {};
  for (const line of fmText.split('\n')) {
    if (!line.trim() || line.startsWith('#')) continue;
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const val = line.slice(idx + 1).trim();
    if (key && !raw[key]) raw[key] = val;
  }
  return { fmText, raw };
}

/** 从正文提取干净文本(去 Markdown 语法与模板标签) */
function extractDescription(body) {
  return body
    .replace(/\{%[^%]*%\}/g, '') // 去 Stellar 模板语法
    .replace(/^#{1,6}\s.*$/gm, '') // 去标题
    .replace(/^>\s.*$/gm, '') // 去引用
    .replace(/^[-*+]\s+.*$/gm, '') // 去列表项
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // 链接只留文字
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '') // 去图片
    .replace(/[`*_~|]/g, '') // 去行内符号
    .replace(/\s+/g, ' ')
    .trim();
}

// 标签规则: [关键词, [标签...]]（目录名与标题关键词均匹配）
const TAG_RULES = [
  [/杀戮尖塔|炉石|战网|Minecraft|mod|黑暗之魂|魂3|魂学|皇帝成长|CE修改器|jack-hf/i, ['游戏']],
  [/two-sum|leetcode|算法/i, ['算法']],
  [/密码学|加密|解密|网络防范|被动扫描|扫描|安全|外挂|破解|csdn屏蔽|隐私|GDPR|gdpr|passive-scan|csdn-copy|python-cryptography/i, ['安全']],
  [/git/i, ['git']],
  [/Kali|kali|Linux|linux|用户权限|文件管理|重置密码/i, ['Linux']],
  [/alist|CDN|cdn|服务器|server|域名|部署/i, ['服务器']],
  [/scrapy|爬虫|油猴|插件|zenkitx|uml|diy|Markdown|markdown|seo|latex|browser-plugins|electronbot|访问外网|梯子/i, ['工具']],
  [/HTTrack|网站克隆|WizTree|KeePass|RSS|种子|下载|浏览器|wiztree|keepass|rss|httrack/i, ['工具']],
  [/学习|实习|困难|解决方案|博客|网站|terms|新名词|learning-blogs|difficulties/i, ['经验']],
  [/鲁迅|观星|我的第一篇文章|一些想法|对时事|近来的苦恼|生活/i, ['随笔']],
];

/** 按文件名匹配标签 */
function inferTags(filename) {
  for (const [re, tags] of TAG_RULES) {
    if (re.test(filename)) return tags;
  }
  return ['随笔'];
}

/** 重新序列化 frontmatter(追加缺失字段, 不重排已有字段) */
function serialize(fmText, fm, description, tags) {
  let text = fmText;
  const hasDesc = fm.has('description') && String(fm.get('description')).trim() !== '';
  const hasTags = fm.has('tags') && String(fm.get('tags')).trim() !== '';
  if (!hasDesc) {
    const line = 'description: ' + JSON.stringify(description);
    if (fm.has('description')) {
      text = text.replace(/^description:.*$/m, line);
    } else {
      text += '\n' + line;
    }
  }
  if (!hasTags) {
    const line = 'tags: [' + tags.join(', ') + ']';
    if (fm.has('tags')) {
      text = text.replace(/^tags:.*$/m, line);
    } else {
      text += '\n' + line;
    }
  }
  return text;
}

function main() {
  const files = listMarkdownFiles(SOURCE);
  let updated = 0;
  let skipped = 0;
  for (const file of files) {
    const rel = path.relative(ROOT, file).replace(/\\/g, '/');
    if (PAGE_FILES.includes(rel) || rel.startsWith('source/_templates/')) {
      skipped += 1;
      continue;
    }
    const content = fs.readFileSync(file, 'utf8');
    const parsed = parseFrontmatter(content);
    if (!parsed) {
      skipped += 1;
      continue;
    }
    const { fmText, raw } = parsed;
    const fm = new Map(Object.entries(raw));
    const hasDesc = fm.has('description') && String(fm.get('description')).trim() !== '';
    const hasTags = fm.has('tags') && String(fm.get('tags')).trim() !== '';
    if (hasDesc && hasTags) {
      skipped += 1;
      continue;
    }
    const body = content.slice(content.indexOf('\n---', 4) + 4);
    const description = hasDesc ? '' : extractDescription(body).slice(0, 80);
    const tags = hasTags ? [] : inferTags(rel);
    const newFm = serialize(fmText, fm, description, tags);
    const newContent = content.slice(0, 4) + newFm + content.slice(content.indexOf('\n---', 4));
    fs.writeFileSync(file, newContent, 'utf8');
    updated += 1;
    console.log(`✓ ${rel} -> tags:[${tags.join(', ')}]`);
  }
  console.log(`\n完成: 更新 ${updated} 篇, 跳过 ${skipped} 篇`);
}

main();
