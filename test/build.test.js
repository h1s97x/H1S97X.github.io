const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

describe('Build Tests', () => {
  const publicDir = path.join(__dirname, '../public');
  
  beforeAll(() => {
    // 清理并重新构建
    try {
      execSync('npx hexo clean', { stdio: 'inherit' });
      execSync('npx hexo generate', { stdio: 'inherit' });
    } catch (error) {
      console.error('Build failed:', error.message);
      throw error;
    }
  }, 30000); // 增加超时时间到30秒
  
  test('Build should generate public directory', () => {
    expect(fs.existsSync(publicDir)).toBe(true);
  });
  
  test('Index.html should be generated', () => {
    const indexPath = path.join(publicDir, 'index.html');
    expect(fs.existsSync(indexPath)).toBe(true);
    
    if (fs.existsSync(indexPath)) {
      const content = fs.readFileSync(indexPath, 'utf8');
      expect(content.length).toBeGreaterThan(0);
      expect(content).toContain('<html');
      expect(content).toContain('</html>');
    }
  });
  
  test('All required assets should be generated', () => {
    const requiredAssets = [
      'css',
      'js',
      'archives',
      'categories',
      'tags'
    ];
    
    requiredAssets.forEach(asset => {
      const assetPath = path.join(publicDir, asset);
      expect(fs.existsSync(assetPath)).toBe(true);
    });
  });
  
  test('Sitemap should be generated', () => {
    const sitemapPath = path.join(publicDir, 'sitemap.xml');
    expect(fs.existsSync(sitemapPath)).toBe(true);
    
    if (fs.existsSync(sitemapPath)) {
      const content = fs.readFileSync(sitemapPath, 'utf8');
      expect(content).toContain('<?xml');
      expect(content).toContain('<urlset');
    }
  });
  
  test('RSS feed should be generated', () => {
    const feedPath = path.join(publicDir, 'atom.xml');
    expect(fs.existsSync(feedPath)).toBe(true);
    
    if (fs.existsSync(feedPath)) {
      const content = fs.readFileSync(feedPath, 'utf8');
      expect(content).toContain('<?xml');
      expect(content).toContain('<feed');
    }
  });
});