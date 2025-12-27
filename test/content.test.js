const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

describe('Content Tests', () => {
  const postsDir = path.join(__dirname, '../source/_posts');
  
  // 获取所有 markdown 文件
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
  
  test('All markdown files should have valid front matter', () => {
    const markdownFiles = getAllMarkdownFiles(postsDir);
    
    expect(markdownFiles.length).toBeGreaterThan(0);
    
    markdownFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      
      expect(() => {
        const parsed = matter(content);
        
        // 检查必需的 front matter 字段
        if (Object.keys(parsed.data).length > 0) {
          expect(parsed.data).toHaveProperty('title');
          expect(parsed.data.title).toBeTruthy();
          
          if (parsed.data.date) {
            expect(new Date(parsed.data.date)).toBeInstanceOf(Date);
          }
          
          if (parsed.data.tags) {
            expect(Array.isArray(parsed.data.tags)).toBe(true);
          }
          
          if (parsed.data.categories) {
            expect(typeof parsed.data.categories === 'string' || Array.isArray(parsed.data.categories)).toBe(true);
          }
        }
        
      }).not.toThrow();
    });
  });
  
  test('All markdown files should have content', () => {
    const markdownFiles = getAllMarkdownFiles(postsDir);
    
    markdownFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      const parsed = matter(content);
      
      expect(parsed.content.trim().length).toBeGreaterThan(0);
    });
  });
  
  test('No broken internal links', () => {
    const markdownFiles = getAllMarkdownFiles(postsDir);
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    
    markdownFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      const parsed = matter(content);
      let match;
      
      while ((match = linkRegex.exec(parsed.content)) !== null) {
        const link = match[2];
        
        // 检查相对路径链接
        if (link.startsWith('./') || link.startsWith('../')) {
          const linkPath = path.resolve(path.dirname(file), link);
          expect(fs.existsSync(linkPath)).toBe(true);
        }
      }
    });
  });
});