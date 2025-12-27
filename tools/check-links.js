#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

class LinkChecker {
  constructor() {
    this.brokenLinks = [];
    this.checkedUrls = new Set();
  }

  async checkUrl(url) {
    if (this.checkedUrls.has(url)) {
      return true;
    }

    return new Promise((resolve) => {
      const client = url.startsWith('https:') ? https : http;
      
      const req = client.get(url, (res) => {
        this.checkedUrls.add(url);
        resolve(res.statusCode >= 200 && res.statusCode < 400);
      });

      req.on('error', () => {
        this.checkedUrls.add(url);
        resolve(false);
      });

      req.setTimeout(5000, () => {
        req.destroy();
        this.checkedUrls.add(url);
        resolve(false);
      });
    });
  }

  async checkMarkdownFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
      const linkText = match[1];
      const linkUrl = match[2];

      // 跳过锚点链接和相对路径
      if (linkUrl.startsWith('#') || linkUrl.startsWith('./') || linkUrl.startsWith('../')) {
        continue;
      }

      // 检查外部链接
      if (linkUrl.startsWith('http://') || linkUrl.startsWith('https://')) {
        console.log(`Checking: ${linkUrl}`);
        const isValid = await this.checkUrl(linkUrl);
        
        if (!isValid) {
          this.brokenLinks.push({
            file: filePath,
            text: linkText,
            url: linkUrl
          });
        }
      }
    }
  }

  async checkAllFiles() {
    const postsDir = path.join(__dirname, '../source/_posts');
    
    const getAllMarkdownFiles = (dir) => {
      const files = [];
      
      const traverse = (currentDir) => {
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
      };
      
      traverse(dir);
      return files;
    };

    const markdownFiles = getAllMarkdownFiles(postsDir);
    
    console.log(`Checking ${markdownFiles.length} markdown files...`);
    
    for (const file of markdownFiles) {
      console.log(`Processing: ${path.relative(process.cwd(), file)}`);
      await this.checkMarkdownFile(file);
    }

    if (this.brokenLinks.length > 0) {
      console.error('\n❌ Broken links found:');
      this.brokenLinks.forEach(link => {
        console.error(`  File: ${path.relative(process.cwd(), link.file)}`);
        console.error(`  Text: ${link.text}`);
        console.error(`  URL: ${link.url}\n`);
      });
      process.exit(1);
    } else {
      console.log('\n✅ All links are valid!');
    }
  }
}

if (require.main === module) {
  const checker = new LinkChecker();
  checker.checkAllFiles().catch(console.error);
}

module.exports = LinkChecker;