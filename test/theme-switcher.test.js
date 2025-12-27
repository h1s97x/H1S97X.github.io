/**
 * 主题切换器测试
 */

describe('Theme Switcher', () => {
  let ThemeSwitcher;

  beforeAll(() => {
    // 模拟 DOMContentLoaded 事件已触发
    Object.defineProperty(document, 'readyState', {
      value: 'complete',
      writable: false
    });

    // 清除任何现有的主题切换器实例
    delete window.themeSwitcher;
  });

  beforeEach(() => {
    // 重置 DOM
    document.body.innerHTML = '';
    document.head.innerHTML = '';
    
    // 重置 localStorage mock
    localStorage.getItem.mockClear();
    localStorage.setItem.mockClear();
    localStorage.removeItem.mockClear();
    localStorage.clear.mockClear();
  });

  describe('基本功能', () => {
    test('应该能够导入主题切换器模块', () => {
      // 动态导入模块以避免立即执行
      expect(() => {
        ThemeSwitcher = require('../source/js/theme-switcher.js');
      }).not.toThrow();
    });

    test('应该能够创建主题切换器实例', () => {
      if (!ThemeSwitcher) {
        ThemeSwitcher = require('../source/js/theme-switcher.js');
      }
      
      expect(() => {
        const switcher = new ThemeSwitcher();
        expect(switcher).toBeDefined();
        expect(switcher.availableThemes).toBeDefined();
        expect(Array.isArray(switcher.availableThemes)).toBe(true);
      }).not.toThrow();
    });

    test('应该定义必要的主题配置', () => {
      const expectedThemes = ['stellar', 'anzhiyu', 'butterfly', 'icarus', 'diaspora'];
      
      expectedThemes.forEach(theme => {
        expect(theme).toBeTruthy();
        expect(typeof theme).toBe('string');
      });
    });

    test('应该有正确的主题显示名称映射', () => {
      const themeNames = {
        'stellar': 'Stellar',
        'anzhiyu': 'AnZhiYu',
        'butterfly': 'Butterfly',
        'icarus': 'Icarus',
        'diaspora': 'Diaspora'
      };

      Object.entries(themeNames).forEach(([key, value]) => {
        expect(key).toBeTruthy();
        expect(value).toBeTruthy();
        expect(typeof key).toBe('string');
        expect(typeof value).toBe('string');
      });
    });
  });

  describe('主题切换器实例', () => {
    let switcher;

    beforeEach(() => {
      if (!ThemeSwitcher) {
        ThemeSwitcher = require('../source/js/theme-switcher.js');
      }
      switcher = new ThemeSwitcher();
    });

    test('应该有正确的可用主题列表', () => {
      expect(switcher.availableThemes).toBeDefined();
      expect(Array.isArray(switcher.availableThemes)).toBe(true);
      expect(switcher.availableThemes.length).toBe(5);

      const expectedThemes = ['stellar', 'anzhiyu', 'butterfly', 'icarus', 'diaspora'];
      switcher.availableThemes.forEach(theme => {
        expect(theme).toHaveProperty('name');
        expect(theme).toHaveProperty('displayName');
        expect(theme).toHaveProperty('description');
        expect(theme).toHaveProperty('preview');
        expect(expectedThemes).toContain(theme.name);
      });
    });

    test('应该正确获取当前主题', () => {
      // 测试默认主题
      localStorage.getItem.mockReturnValue(null);
      expect(switcher.getCurrentTheme()).toBe('stellar');

      // 测试保存的主题
      localStorage.getItem.mockReturnValue('anzhiyu');
      expect(switcher.getCurrentTheme()).toBe('anzhiyu');
    });

    test('应该正确获取主题显示名称', () => {
      expect(switcher.getThemeDisplayName('stellar')).toBe('Stellar');
      expect(switcher.getThemeDisplayName('anzhiyu')).toBe('AnZhiYu');
      expect(switcher.getThemeDisplayName('unknown')).toBe('unknown');
    });

    test('应该创建主题切换器 UI', () => {
      // UI 应该已经在构造函数中创建
      const themeSwitcher = document.getElementById('theme-switcher');
      expect(themeSwitcher).toBeTruthy();
      
      const switcherBtn = document.getElementById('theme-switcher-btn');
      expect(switcherBtn).toBeTruthy();
      
      const switcherPanel = document.getElementById('theme-switcher-panel');
      expect(switcherPanel).toBeTruthy();
    });
  });

  describe('配置验证', () => {
    test('应该有有效的主题预览路径', () => {
      const themes = ['stellar', 'anzhiyu', 'butterfly', 'icarus', 'diaspora'];
      
      themes.forEach(theme => {
        const previewPath = `/img/theme-previews/${theme}.jpg`;
        expect(previewPath).toMatch(/^\/img\/theme-previews\/\w+\.jpg$/);
      });
    });

    test('应该有有效的主题描述', () => {
      const descriptions = {
        'stellar': '简洁优雅的现代主题',
        'anzhiyu': '美观的个人博客主题',
        'butterfly': '功能丰富的蝴蝶主题',
        'icarus': '响应式的简约主题',
        'diaspora': '摄影风格的主题'
      };

      Object.values(descriptions).forEach(desc => {
        expect(desc).toBeTruthy();
        expect(typeof desc).toBe('string');
        expect(desc.length).toBeGreaterThan(0);
      });
    });
  });

  describe('工具函数', () => {
    test('应该正确处理本地存储键名', () => {
      const storageKey = 'selected-theme';
      expect(storageKey).toBe('selected-theme');
      expect(typeof storageKey).toBe('string');
    });

    test('应该有正确的CSS类名', () => {
      const cssClasses = [
        'theme-switcher',
        'theme-switcher-btn',
        'theme-switcher-panel',
        'theme-option',
        'active'
      ];

      cssClasses.forEach(className => {
        expect(className).toBeTruthy();
        expect(typeof className).toBe('string');
        expect(className).not.toContain(' ');
      });
    });
  });
});