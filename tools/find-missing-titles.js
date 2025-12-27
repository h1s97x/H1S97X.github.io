#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

function getAllMarkdownFiles(dir) {
  const files = [];
  
  function traverse(currentDir) {
    if (!fs.existsSync(currentDir)) return;
    
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (item.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  }
  
  traverse(dir);
  return files;
}

function checkMissingTitles() {
  const postsDir = path.join(__dirname, '../source/_posts');
  const markdownFiles = getAllMarkdownFiles(postsDir);
  const missingTitles = [];
  
  console.log(`检查 ${markdownFiles.length} 个markdown文件...\n`);
  
  markdownFiles.forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const parsed = matter(content);
      
      // 检查是否缺少title或title为空
      if (!parsed.data.title || parsed.data.title.trim() === '') {
        const relativePath = path.relative(process.cwd(), file);
        missingTitles.push({
          file: relativePath,
          title: parsed.data.title || '(未定义)',
          date: parsed.data.date || '(未定义)',
          hasContent: parsed.content.trim().length > 0
        });
      }
    } catch (error) {
      console.error(`处理文件时出错 ${file}: ${error.message}`);
    }
  });
  
  if (missingTitles.length > 0) {
    console.log('🚨 发现缺少标题的文章:');
    console.log('='.repeat(50));
    missingTitles.forEach((item, index) => {
      console.log(`${index + 1}. ${item.file}`);
      console.log(`   标题: ${item.title}`);
      console.log(`   日期: ${item.date}`);
      console.log(`   有内容: ${item.hasContent ? '是' : '否'}`);
      console.log('');
    });
    
    console.log(`总计: ${missingTitles.length} 个文件需要修复`);
  } else {
    console.log('✅ 所有文章都有有效的标题!');
  }
  
  return missingTitles;
}

if (require.main === module) {
  checkMissingTitles();
}

module.exports = { checkMissingTitles };