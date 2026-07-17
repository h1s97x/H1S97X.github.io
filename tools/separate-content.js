#!/usr/bin/env node

/**
 * 内容分离脚本
 * 将技术文章迁移到 notes/ 目录
 * 为所有文章添加 categories 字段
 */

const fs = require("fs");
const path = require("path");

// 定义技术文章列表（需要迁移到 notes/）
const techArticles = [
  // 技术文章
  "CDN介绍与使用.md",
  "Linux基础.md",
  "latex公式.md",
  "密码学整合.md",
  "CE修改器入门.md",
  "'种子'下载与相关内容.md",
  "Scrapy爬虫.md",
  "markdown使用.md",
  "外挂分析与实现.md",
  "git版本控制.md",
  "网络防范.md",
  "Alist本地部署.md",
  "破解相关.md",
  "文件管理.md",
  "从0开始写插件-油猴.md",
  "稚晖君开源——ElectronBot-Mini-Desktop-Robot.md",
  "DIY设计知识.md",
  "网站设计-效果实现与代码.md",
  "RSS订阅.md",
  "访问外网-梯子.md",
  "UML统一建模语言.md",
  "实习内容.md",
  "terms-新名词.md",
  "Python与密码学.md",
  "python密码学实验.md",
  "csdn屏蔽未登录用户的复制功能.md",
  "一些困难和解决方案.md",
  "一些可供学习的个人博客或网站.md",
  "从0开始学习制作mod.md",
  "KeePass-使用指南.md",
  "浏览器功能插件.md",
  "HTTrack介绍.md",
  "HTTrack 简单使用.md",
  "Kali-Linux常用操作.md",
  "被动扫描.md",
  "GDPR_zh.md",
  "zenkitx-flutter-journey.md",
  // 游戏攻略
  "皇帝成长计划2h5-攻略.md",
  "攻略-黑暗之魂3.md",
  "jack-hf2-2-游戏攻略.md",
  "CE修改器入门.md",
  "破解相关.md",
  "外挂分析与实现.md",
  "Minecraft.md",
];

// 定义分类映射
const categoryMap = {
  "CDN介绍与使用.md": "技术",
  "Linux基础.md": "Linux",
  "latex公式.md": "技术",
  "密码学整合.md": "技术",
  "CE修改器入门.md": "游戏",
  "'种子'下载与相关内容.md": "技术",
  "Scrapy爬虫.md": "技术",
  "markdown使用.md": "技术",
  "外挂分析与实现.md": "游戏",
  "git版本控制.md": "技术",
  "网络防范.md": "技术",
  "Alist本地部署.md": "技术",
  "破解相关.md": "游戏",
  "文件管理.md": "技术",
  "从0开始写插件-油猴.md": "技术",
  "稚晖君开源——ElectronBot-Mini-Desktop-Robot.md": "技术",
  "DIY设计知识.md": "技术",
  "网站设计-效果实现与代码.md": "技术",
  "RSS订阅.md": "技术",
  "访问外网-梯子.md": "技术",
  "UML统一建模语言.md": "技术",
  "实习内容.md": "技术",
  "terms-新名词.md": "技术",
  "皇帝成长计划2h5-攻略.md": "游戏",
  "攻略-黑暗之魂3.md": "游戏",
  "jack-hf2-2-游戏攻略.md": "游戏",
  "Python与密码学.md": "技术",
  "python密码学实验.md": "技术",
  "csdn屏蔽未登录用户的复制功能.md": "技术",
  "一些困难和解决方案.md": "技术",
  "一些可供学习的个人博客或网站.md": "技术",
  "从0开始学习制作mod.md": "技术",
  "KeePass-使用指南.md": "技术",
  "浏览器功能插件.md": "技术",
  "HTTrack介绍.md": "技术",
  "HTTrack 简单使用.md": "技术",
  "Kali-Linux常用操作.md": "Linux",
  "被动扫描.md": "技术",
  "GDPR_zh.md": "技术",
  "zenkitx-flutter-journey.md": "技术",
  "Minecraft.md": "游戏",
  "对时事的一些看法.md": "生活",
  "近来的苦恼.md": "生活",
  "我的第一篇文章.md": "生活",
  "鲁迅先生.md": "生活",
  "一些想法和解决方案.md": "生活",
  "观星指南.md": "生活",
};

// 获取所有文章
function getAllArticles() {
  const articles = [];
  const postsDir = path.join(__dirname, "../source/_posts");

  function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        walkDir(filePath);
      } else if (file.endsWith(".md")) {
        articles.push({
          path: filePath,
          filename: file,
          year: path.basename(path.dirname(filePath)),
        });
      }
    }
  }

  walkDir(postsDir);
  return articles;
}

// 解析 frontmatter
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { frontmatter: {}, body: content };

  const frontmatter = {};
  const lines = match[1].split("\n");
  for (const line of lines) {
    const colonIndex = line.indexOf(":");
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();
      frontmatter[key] = value;
    }
  }

  return {
    frontmatter,
    body: content.substring(match[0].length),
  };
}

// 生成 frontmatter
function generateFrontmatter(frontmatter) {
  let result = "---\n";
  for (const [key, value] of Object.entries(frontmatter)) {
    if (Array.isArray(value)) {
      result += `${key}:\n`;
      for (const item of value) {
        result += `  - ${item}\n`;
      }
    } else {
      result += `${key}: ${value}\n`;
    }
  }
  result += "---\n";
  return result;
}

// 添加 categories 字段
function addCategory(filePath, category) {
  const content = fs.readFileSync(filePath, "utf8");
  const { frontmatter, body } = parseFrontmatter(content);

  if (!frontmatter.categories) {
    frontmatter.categories = [category];
    const newContent = generateFrontmatter(frontmatter) + body;
    fs.writeFileSync(filePath, newContent, "utf8");
    console.log(`  ✓ 添加分类: ${path.basename(filePath)} -> ${category}`);
  }
}

// 迁移文章到 notes/
function migrateToNotes(article) {
  const { path: filePath, filename } = article;
  const slug = filename
    .replace(".md", "")
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-");
  const notesDir = path.join(__dirname, "../source/notes", slug);

  // 创建目录
  if (!fs.existsSync(notesDir)) {
    fs.mkdirSync(notesDir, { recursive: true });
  }

  // 移动文件
  const newPath = path.join(notesDir, "index.md");
  fs.copyFileSync(filePath, newPath);
  fs.unlinkSync(filePath);

  console.log(`  ✓ 迁移: ${filename} -> notes/${slug}/index.md`);
  return newPath;
}

// 主函数
function main() {
  console.log("🚀 开始内容分离...\n");

  const articles = getAllArticles();
  console.log(`📚 找到 ${articles.length} 篇文章\n`);

  // 迁移技术文章到 notes/
  console.log("📦 迁移技术文章到 notes/...");
  let migratedCount = 0;
  for (const article of articles) {
    if (techArticles.includes(article.filename)) {
      migrateToNotes(article);
      migratedCount++;
    }
  }
  console.log(`\n✓ 迁移了 ${migratedCount} 篇文章\n`);

  // 为所有文章添加 categories
  console.log("🏷️  添加分类标签...");

  // 处理 notes/ 中的文章
  const notesDir = path.join(__dirname, "../source/notes");
  if (fs.existsSync(notesDir)) {
    const noteDirs = fs.readdirSync(notesDir);
    for (const dir of noteDirs) {
      const indexPath = path.join(notesDir, dir, "index.md");
      if (fs.existsSync(indexPath)) {
        const filename = path.basename(dir) + ".md";
        const category = categoryMap[filename] || "技术";
        addCategory(indexPath, category);
      }
    }
  }

  // 处理 _posts/ 中的文章
  const remainingArticles = getAllArticles();
  for (const article of remainingArticles) {
    const category = categoryMap[article.filename] || "生活";
    addCategory(article.path, category);
  }

  console.log("\n✅ 内容分离完成！");
  console.log("\n📊 统计:");
  console.log(`  - notes/: ${migratedCount} 篇技术文章`);
  console.log(`  - _posts/: ${remainingArticles.length} 篇生活记录`);
}

main();
