/**
 * 文章分类脚本
 * 将散落在 _posts 根目录的文章分类到对应子目录
 */

const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '../source/_posts');

// 分类规则
const categories = {
  Tech: [
    'Linux基础', 'git版本控制', 'Python与密码学', 'Scrapy爬虫',
    'UML统一建模语言', 'WizTree', 'markdown使用', 'python密码学实验',
    '浏览器功能插件', 'HTTrack', 'GD', 'py'
  ],
  Server: [
    'Alist', 'CDN', 'KeePass', 'RSS', '梯子', '文件管理',
    'FRP', '服务器', '域名', 'nginx'
  ],
  Game: [
    'CE修改器', 'mod', '外挂', '破解', '游戏攻略', '黄油',
    'Playnite', 'Elden', 'CSGO', 'GTA'
  ],
  Course: [
    'CTF', '汇编语言', '数据库', '网络攻防', '软件工程',
    '计算机', '课程', '实验', '网络安全', '病毒'
  ],
  Life: [
    '实习', '苦恼', '想法', '鲁迅', '看法', '博客',
    '个人', '观星', 'DIY', 'terms', '稚晖'
  ]
};

function classifyFile(filename) {
  const lowerName = filename.toLowerCase();
  
  for (const [category, keywords] of Object.entries(categories)) {
    for (const keyword of keywords) {
      if (lowerName.includes(keyword.toLowerCase())) {
        return category;
      }
    }
  }
  return 'Other'; // 未分类
}

// 创建目录并移动文件
function organizePosts() {
  // 确保分类目录存在
  const categories = ['Tech', 'Server', 'Game', 'Course', 'Life', 'Other'];
  for (const cat of categories) {
    const dir = path.join(postsDir, cat);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${cat}/`);
    }
  }
  
  // 获取根目录的 md 文件
  const files = fs.readdirSync(postsDir)
    .filter(f => f.endsWith('.md') && !fs.statSync(path.join(postsDir, f)).isDirectory());
  
  let moved = 0;
  const results = { Tech: 0, Server: 0, Game: 0, Course: 0, Life: 0, Other: 0 };
  
  for (const file of files) {
    const category = classifyFile(file);
    const src = path.join(postsDir, file);
    const dest = path.join(postsDir, category, file);
    
    fs.renameSync(src, dest);
    results[category]++;
    moved++;
    console.log(`Moved: ${file} -> ${category}/`);
  }
  
  console.log('\n=== Summary ===');
  for (const [cat, count] of Object.entries(results)) {
    console.log(`${cat}: ${count} files`);
  }
  console.log(`Total: ${moved} files`);
}

organizePosts();
