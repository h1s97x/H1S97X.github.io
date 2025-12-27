#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

function generateTitleFromFilename(filename) {
  // 从文件名生成标题
  const basename = path.basename(filename, '.md');
  
  // 移除特殊字符并转换为更友好的标题
  let title = basename
    .replace(/[-_]/g, ' ')  // 替换连字符和下划线为空格
    .replace(/\s+/g, ' ')   // 合并多个空格
    .trim();
  
  // 首字母大写
  title = title.charAt(0).toUpperCase() + title.slice(1);
  
  return title;
}

function generateDateFromPath(_filePath) {
  // 尝试从路径中提取日期信息，如果没有则使用当前日期
  const now = new Date();
  return now.toISOString().split('T')[0] + ' ' + now.toTimeString().split(' ')[0];
}

function fixMissingTitles() {
  const { checkMissingTitles } = require('./find-missing-titles');
  const missingTitles = checkMissingTitles();
  
  if (missingTitles.length === 0) {
    console.log('✅ 没有需要修复的文件!');
    return;
  }
  
  console.log(`\n🔧 开始修复 ${missingTitles.length} 个文件...\n`);
  
  let fixedCount = 0;
  let skippedCount = 0;
  
  missingTitles.forEach((item, _index) => {
    try {
      const filePath = item.file;
      const content = fs.readFileSync(filePath, 'utf8');
      const parsed = matter(content);
      
      // 如果文件没有内容，跳过
      if (!item.hasContent) {
        console.log(`⏭️  跳过空文件: ${filePath}`);
        skippedCount++;
        return;
      }
      
      // 生成标题
      const generatedTitle = generateTitleFromFilename(filePath);
      
      // 更新front matter
      parsed.data.title = generatedTitle;
      
      // 如果没有日期，添加日期
      if (!parsed.data.date) {
        parsed.data.date = generateDateFromPath(filePath);
      }
      
      // 重新构建文件内容
      const newContent = matter.stringify(parsed.content, parsed.data);
      
      // 写回文件
      fs.writeFileSync(filePath, newContent, 'utf8');
      
      console.log(`✅ 修复: ${filePath}`);
      console.log(`   新标题: "${generatedTitle}"`);
      fixedCount++;
      
    } catch (error) {
      console.error(`❌ 修复失败 ${item.file}: ${error.message}`);
    }
  });
  
  console.log('\n📊 修复完成:');
  console.log(`   ✅ 成功修复: ${fixedCount} 个文件`);
  console.log(`   ⏭️  跳过: ${skippedCount} 个文件`);
  console.log(`   ❌ 失败: ${missingTitles.length - fixedCount - skippedCount} 个文件`);
}

if (require.main === module) {
  fixMissingTitles();
}

module.exports = { fixMissingTitles };