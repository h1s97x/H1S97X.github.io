#!/usr/bin/env node

/**
 * 文章迁移脚本
 * 将 source/_posts/ 下的文章按年份重新组织
 * 
 * 用法: node tools/migrate-posts.js
 */

const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, '../source/_posts');
const BACKUP_DIR = path.join(__dirname, '../.archive/posts-backup-' + Date.now());

// 创建备份目录
function createBackup() {
  console.log('📦 创建备份...');
  fs.cpSync(POSTS_DIR, BACKUP_DIR, { recursive: true });
  console.log(`✅ 备份已创建: ${BACKUP_DIR}`);
}

// 从 frontmatter 提取日期
function extractDate(content) {
  const match = content.match(/^date:\s*(.+)$/m);
  if (match) {
    const dateStr = match[1].trim().replace(/['"]/g, '');
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      return date.getFullYear();
    }
  }
  return null;
}

// 获取所有文章文件
function getAllPosts() {
  const posts = [];
  
  function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walk(filePath);
      } else if (file.endsWith('.md')) {
        posts.push(filePath);
      }
    }
  }
  
  walk(POSTS_DIR);
  return posts;
}

// 迁移文章
function migratePosts() {
  console.log('\n🚀 开始迁移文章...\n');
  
  const posts = getAllPosts();
  console.log(`找到 ${posts.length} 篇文章\n`);
  
  const migrations = [];
  
  for (const postPath of posts) {
    const content = fs.readFileSync(postPath, 'utf8');
    const year = extractDate(content);
    
    if (!year) {
      console.log(`⚠️  无法提取日期: ${postPath}`);
      continue;
    }
    
    const fileName = path.basename(postPath);
    const targetDir = path.join(POSTS_DIR, String(year));
    const targetPath = path.join(targetDir, fileName);
    
    // 检查是否需要迁移
    const currentDir = path.dirname(postPath);
    if (currentDir === targetDir) {
      console.log(`✓ 已在正确位置: ${fileName}`);
      continue;
    }
    
    migrations.push({
      from: postPath,
      to: targetPath,
      year: year,
      fileName: fileName
    });
  }
  
  if (migrations.length === 0) {
    console.log('\n✅ 所有文章已在正确位置');
    return;
  }
  
  console.log(`\n📋 需要迁移 ${migrations.length} 篇文章:\n`);
  
  // 按年份分组显示
  const byYear = {};
  for (const m of migrations) {
    if (!byYear[m.year]) byYear[m.year] = [];
    byYear[m.year].push(m);
  }
  
  for (const [year, posts] of Object.entries(byYear)) {
    console.log(`📁 ${year}/ (${posts.length} 篇)`);
    for (const p of posts) {
      console.log(`   - ${p.fileName}`);
    }
  }
  
  // 执行迁移
  console.log('\n🔄 执行迁移...\n');
  
  for (const m of migrations) {
    // 创建目标目录
    if (!fs.existsSync(path.dirname(m.to))) {
      fs.mkdirSync(path.dirname(m.to), { recursive: true });
    }
    
    // 移动文件
    fs.renameSync(m.from, m.to);
    console.log(`✓ ${m.fileName} → ${m.year}/`);
  }
  
  // 清理空目录
  console.log('\n🧹 清理空目录...\n');
  
  const dirs = fs.readdirSync(POSTS_DIR);
  for (const dir of dirs) {
    const dirPath = path.join(POSTS_DIR, dir);
    if (fs.statSync(dirPath).isDirectory()) {
      const files = fs.readdirSync(dirPath);
      if (files.length === 0) {
        fs.rmdirSync(dirPath);
        console.log(`✓ 删除空目录: ${dir}/`);
      }
    }
  }
  
  console.log('\n✅ 迁移完成!\n');
  console.log(`📦 备份位置: ${BACKUP_DIR}`);
  console.log('💡 如需回滚，请从备份恢复\n');
}

// 主函数
function main() {
  console.log('=== 文章迁移脚本 ===\n');
  
  // 检查是否存在 _posts 目录
  if (!fs.existsSync(POSTS_DIR)) {
    console.error('❌ _posts 目录不存在');
    process.exit(1);
  }
  
  // 创建备份
  createBackup();
  
  // 执行迁移
  migratePosts();
}

main();
