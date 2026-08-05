#!/usr/bin/env node
/**
 * 图片优化分析脚本
 * 扫描 source/images/ 下的图片，给出尺寸、体积、优化建议
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const IMAGES_DIR = path.join(__dirname, '..', 'source', 'images');
const KB = 1024;

function getImageFiles(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getImageFiles(full));
    } else if (/\.(png|jpe?g|gif|webp|svg)$/i.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

function analyze(filePath) {
  const stat = fs.statSync(filePath);
  const rel = path.relative(path.join(__dirname, '..'), filePath);
  const ext = path.extname(filePath).toLowerCase();
  const sizeKB = (stat.size / KB).toFixed(1);

  let dims;
  try {
    const out = execSync(`node -e 'const p=require("probe-image-size"); const s=p.sync(require("fs").readFileSync("${filePath.replace(/'/g, '')}")); console.log(s.width+"x"+s.height);'`, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
    dims = out.trim();
  } catch {
    dims = 'unknown';
  }

  const suggestions = [];
  if (stat.size > 100 * KB) suggestions.push('建议压缩至 100KB 以下');
  if (ext === '.png' && stat.size > 50 * KB) suggestions.push('考虑转 WebP 格式');
  if (!fs.existsSync(filePath.replace(ext, '.webp')) && stat.size > 30 * KB) {
    suggestions.push('可生成 WebP 版本');
  }

  return { rel, ext, sizeKB, dims, suggestions };
}

function main() {
  const files = getImageFiles(IMAGES_DIR);
  if (files.length === 0) {
    console.log('source/images/ 目录下没有找到图片');
    return;
  }

  console.log(`\n图片资源分析 (${files.length} 个文件)\n`);
  console.log('─'.repeat(80));

  let totalBytes = 0;
  const table = [];

  for (const f of files) {
    const info = analyze(f);
    totalBytes += fs.statSync(f).size;
    table.push(info);
    console.log(`文件: ${info.rel}`);
    console.log(`  格式: ${info.ext}  尺寸: ${info.dims}  体积: ${info.sizeKB} KB`);
    if (info.suggestions.length) {
      console.log(`  建议: ${info.suggestions.join('；')}`);
    }
    console.log('─'.repeat(80));
  }

  const totalKB = (totalBytes / KB).toFixed(1);
  const totalMB = (totalBytes / KB / KB).toFixed(2);
  console.log(`\n总计: ${totalKB} KB (${totalMB} MB)`);

  const oversized = table.filter(i => parseFloat(i.sizeKB) > 100);
  if (oversized.length) {
    console.log(`\n⚠️  ${oversized.length} 个文件超过 100KB，建议优化`);
  } else {
    console.log('\n✅ 所有图片体积合理');
  }

  console.log('\n优化工具推荐:');
  console.log('  - TinyPNG: https://tinypng.com/ (在线压缩)');
  console.log('  - Squoosh: https://squoosh.app/ (Google 在线工具)');
  console.log('  - sharp: npm i -g sharp && sharp -i input.png -o output.webp');
  console.log('  - pngquant: pngquant --quality=65-80 input.png');
}

main();
