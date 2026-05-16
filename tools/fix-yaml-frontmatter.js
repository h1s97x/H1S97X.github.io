#!/usr/bin/env node
/**
 * 修复文章 YAML 头问题的脚本
 * 
 * 处理的问题:
 * 1. 移除 categories: - null
 * 2. 移除空的 categories/tags
 * 3. 规范化日期格式
 */

const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '..', 'source', '_posts');

// 统计信息
const stats = {
  processed: 0,
  fixed: {
    nullCategories: 0,
    emptyCategories: 0,
    emptyTags: 0,
    addedTags: 0,
    addedUpdated: 0,
  },
  errors: [],
};

/**
 * 解析 YAML 头
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    return { frontmatter: '', body: content, raw: '' };
  }
  
  const raw = match[0];
  const frontmatter = match[1];
  const body = content.slice(raw.length);
  
  return { frontmatter, body, raw };
}

/**
 * 解析 YAML 行
 */
function parseYamlLines(lines) {
  const result = {
    title: null,
    date: null,
    updated: null,
    categories: [],
    tags: [],
    comments: null,
    keywords: null,
    description: null,
    mathjax: null,
    mermaid: null,
    hidden: null,
    aside: null,
    toc: null,
    top: null,
    sticky: null,
    icons: null,
    other: {},
  };
  
  let currentKey = null;
  let i = 0;
  
  while (i < lines.length) {
    const line = lines[i];
    
    // 空白行
    if (line.trim() === '') {
      i++;
      continue;
    }
    
    // 数组项 (categories/tags)
    if (line.match(/^(\s+)-\s/)) {
      const match = line.match(/^(\s*)-\s(.*)/);
      const indent = match[1].length;
      const value = match[2].trim();
      
      if (indent === 2 && currentKey && Array.isArray(result[currentKey])) {
        if (value && value !== 'null') {
          result[currentKey].push(value);
        }
      }
      i++;
      continue;
    }
    
    // 键值对
    const kvMatch = line.match(/^(\w+):\s*(.*)/);
    if (kvMatch) {
      const key = kvMatch[1];
      let value = kvMatch[2].trim();
      
      currentKey = key;
      
      // 处理不同的键
      switch (key) {
        case 'title':
          result.title = value;
          break;
        case 'date':
        case 'updated':
          result[key] = value;
          break;
        case 'categories':
        case 'tags':
          if (value && value !== 'null') {
            result[key].push(value);
          }
          currentKey = key;
          break;
        case 'comments':
        case 'mathjax':
        case 'mermaid':
        case 'hidden':
        case 'aside':
        case 'toc':
        case 'top':
        case 'sticky':
          result[key] = value === 'true' ? true : value === 'false' ? false : value;
          break;
        case 'keywords':
        case 'description':
        case 'icons':
          result[key] = value;
          break;
        default:
          result.other[key] = value;
      }
    }
    
    i++;
  }
  
  return result;
}

/**
 * 序列化 YAML
 */
function serializeYaml(data) {
  const lines = [];
  
  // 按固定顺序输出
  const order = [
    'title', 'date', 'updated', 'categories', 'tags',
    'comments', 'keywords', 'description', 'mathjax', 'mermaid',
    'hidden', 'aside', 'toc', 'top', 'sticky', 'icons'
  ];
  
  for (const key of order) {
    if (data[key] !== null && data[key] !== undefined) {
      if (Array.isArray(data[key])) {
        if (data[key].length > 0) {
          lines.push(`${key}:`);
          for (const item of data[key]) {
            lines.push(`  - ${item}`);
          }
        }
        // 不输出空的数组
      } else if (data[key] === true) {
        lines.push(`${key}: true`);
      } else if (data[key] === false) {
        lines.push(`${key}: false`);
      } else {
        lines.push(`${key}: ${data[key]}`);
      }
    }
  }
  
  // 其他字段按字母顺序
  const otherKeys = Object.keys(data.other).sort();
  for (const key of otherKeys) {
    if (!order.includes(key)) {
      lines.push(`${key}: ${data.other[key]}`);
    }
  }
  
  return lines.join('\n');
}

/**
 * 修复文件
 */
function fixFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { frontmatter, body, raw } = parseFrontmatter(content);
    
    if (!frontmatter) {
      console.log(`⚠️  跳过 (无 YAML 头): ${filePath}`);
      return;
    }
    
    const lines = frontmatter.split('\n');
    const data = parseYamlLines(lines);
    
    let modified = false;
    
    // 1. 移除 categories: - null
    if (data.categories.includes('null')) {
      data.categories = data.categories.filter(c => c !== 'null');
      modified = true;
      stats.fixed.nullCategories++;
      console.log(`✓  移除 null category: ${filePath}`);
    }
    
    // 2. 移除空的 categories
    if (data.categories.length === 0 && lines.some(l => l.includes('categories:'))) {
      // categories 行存在但数组为空
      modified = true;
      stats.fixed.emptyCategories++;
    }
    
    // 3. 确保有 tags (如果不是空的)
    if (data.tags.length === 0) {
      // 只有当原来没有 tags 行时才添加
      if (!lines.some(l => l.includes('tags:'))) {
        // 不强制添加 tags，保持原样
      }
    }
    
    // 4. 移除空的 tags
    if (data.tags.length === 0 && lines.some(l => l.includes('tags:'))) {
      modified = true;
      stats.fixed.emptyTags++;
    }
    
    // 5. 添加 updated (如果缺失且 date 存在)
    if (!data.updated && data.date) {
      data.updated = data.date;
      modified = true;
      stats.fixed.addedUpdated++;
      console.log(`✓  添加 updated: ${filePath}`);
    }
    
    if (modified) {
      const newFrontmatter = serializeYaml(data);
      const newContent = `---\n${newFrontmatter}\n---\n${body}`;
      fs.writeFileSync(filePath, newContent);
      stats.processed++;
    }
  } catch (err) {
    stats.errors.push({ file: filePath, error: err.message });
    console.error(`✗  错误: ${filePath} - ${err.message}`);
  }
}

/**
 * 遍历文章目录
 */
function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      // 跳过隐藏目录
      if (!entry.name.startsWith('.')) {
        walkDir(fullPath);
      }
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      fixFile(fullPath);
    }
  }
}

// 执行
console.log('🔧 开始修复文章 YAML 头...\n');
walkDir(postsDir);

console.log('\n📊 统计:');
console.log(`  处理文件: ${stats.processed}`);
console.log(`  移除 null categories: ${stats.fixed.nullCategories}`);
console.log(`  移除空 categories: ${stats.fixed.emptyCategories}`);
console.log(`  移除空 tags: ${stats.fixed.emptyTags}`);
console.log(`  添加 updated: ${stats.fixed.addedUpdated}`);

if (stats.errors.length > 0) {
  console.log('\n❌ 错误:');
  for (const err of stats.errors) {
    console.log(`  ${err.file}: ${err.error}`);
  }
}

console.log('\n✅ 完成!');
