/**
 * 主题切换器
 * 支持动态切换 Hexo 主题而无需重新构建
 */

class ThemeSwitcher {
  constructor() {
    this.availableThemes = [
      {
        name: 'stellar',
        displayName: 'Stellar',
        description: '简洁优雅的现代主题',
        preview: '/img/theme-previews/stellar.svg'
      },
      {
        name: 'anzhiyu',
        displayName: 'AnZhiYu',
        description: '美观的个人博客主题',
        preview: '/img/theme-previews/anzhiyu.svg'
      },
      {
        name: 'butterfly',
        displayName: 'Butterfly',
        description: '功能丰富的蝴蝶主题',
        preview: '/img/theme-previews/butterfly.svg'
      },
      {
        name: 'icarus',
        displayName: 'Icarus',
        description: '响应式的简约主题',
        preview: '/img/theme-previews/icarus.svg'
      },
      {
        name: 'diaspora',
        displayName: 'Diaspora',
        description: '摄影风格的主题',
        preview: '/img/theme-previews/diaspora.svg'
      }
    ];
    
    this.currentTheme = this.getCurrentTheme();
    this.init();
  }

  /**
   * 初始化主题切换器
   */
  init() {
    this.createSwitcherUI();
    this.bindEvents();
    this.loadThemePreferences();
  }

  /**
   * 获取当前主题
   */
  getCurrentTheme() {
    return localStorage.getItem('selected-theme') || 'stellar';
  }

  /**
   * 创建主题切换器 UI
   */
  createSwitcherUI() {
    const switcherHTML = `
      <div id="theme-switcher" class="theme-switcher">
        <button id="theme-switcher-btn" class="theme-switcher-btn" title="切换主题">
          <i class="fas fa-palette"></i>
          <span class="theme-name">${this.getThemeDisplayName(this.currentTheme)}</span>
        </button>
        <div id="theme-switcher-panel" class="theme-switcher-panel">
          <div class="theme-switcher-header">
            <h3>选择主题</h3>
            <button id="theme-switcher-close" class="theme-switcher-close">×</button>
          </div>
          <div class="theme-switcher-content">
            ${this.generateThemeOptions()}
          </div>
        </div>
      </div>
    `;

    // 插入到页面中
    document.body.insertAdjacentHTML('beforeend', switcherHTML);
    
    // 添加样式
    this.injectStyles();
  }

  /**
   * 生成主题选项
   */
  generateThemeOptions() {
    return this.availableThemes.map(theme => `
      <div class="theme-option ${theme.name === this.currentTheme ? 'active' : ''}" 
           data-theme="${theme.name}">
        <div class="theme-preview">
          <img src="${theme.preview}" alt="${theme.displayName}" 
               onerror="this.src='/img/theme-previews/default.svg'">
        </div>
        <div class="theme-info">
          <h4>${theme.displayName}</h4>
          <p>${theme.description}</p>
        </div>
        <div class="theme-status">
          ${theme.name === this.currentTheme ? '<i class="fas fa-check"></i>' : ''}
        </div>
      </div>
    `).join('');
  }

  /**
   * 获取主题显示名称
   */
  getThemeDisplayName(themeName) {
    const theme = this.availableThemes.find(t => t.name === themeName);
    return theme ? theme.displayName : themeName;
  }

  /**
   * 绑定事件
   */
  bindEvents() {
    const switcherBtn = document.getElementById('theme-switcher-btn');
    const switcherPanel = document.getElementById('theme-switcher-panel');
    const closeBtn = document.getElementById('theme-switcher-close');

    // 打开/关闭面板
    switcherBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      switcherPanel.classList.toggle('active');
    });

    // 关闭面板
    closeBtn.addEventListener('click', () => {
      switcherPanel.classList.remove('active');
    });

    // 点击外部关闭面板
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#theme-switcher')) {
        switcherPanel.classList.remove('active');
      }
    });

    // 主题选择
    switcherPanel.addEventListener('click', (e) => {
      const themeOption = e.target.closest('.theme-option');
      if (themeOption) {
        const themeName = themeOption.dataset.theme;
        this.switchTheme(themeName);
      }
    });

    // 键盘支持
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        switcherPanel.classList.remove('active');
      }
    });
  }

  /**
   * 切换主题
   */
  async switchTheme(themeName) {
    if (themeName === this.currentTheme) return;

    try {
      // 显示加载状态
      this.showLoading();

      // 移除当前主题样式
      this.removeCurrentThemeStyles();

      // 加载新主题样式
      await this.loadThemeStyles(themeName);

      // 更新当前主题
      this.currentTheme = themeName;

      // 保存用户偏好
      localStorage.setItem('selected-theme', themeName);

      // 更新 UI
      this.updateUI(themeName);

      // 隐藏加载状态
      this.hideLoading();

      // 关闭面板
      document.getElementById('theme-switcher-panel').classList.remove('active');

      // 触发主题切换事件
      this.dispatchThemeChangeEvent(themeName);

      // 显示成功消息
      this.showMessage(`已切换到 ${this.getThemeDisplayName(themeName)} 主题`, 'success');

    } catch (error) {
      console.error('主题切换失败:', error);
      this.hideLoading();
      this.showMessage('主题切换失败，请稍后重试', 'error');
    }
  }

  /**
   * 移除当前主题样式
   */
  removeCurrentThemeStyles() {
    // 移除主题相关的 CSS 文件
    const themeStyles = document.querySelectorAll('link[data-theme]');
    themeStyles.forEach(link => link.remove());

    // 移除主题相关的 class
    document.body.className = document.body.className
      .replace(/theme-\w+/g, '')
      .trim();
  }

  /**
   * 加载主题样式
   */
  async loadThemeStyles(themeName) {
    return new Promise((resolve, reject) => {
      // 创建主题样式链接
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `/themes/${themeName}/css/main.css`;
      link.setAttribute('data-theme', themeName);
      
      link.onload = () => {
        // 添加主题 class 到 body
        document.body.classList.add(`theme-${themeName}`);
        resolve();
      };
      
      link.onerror = () => {
        reject(new Error(`无法加载主题 ${themeName} 的样式文件`));
      };

      // 插入到 head 中
      document.head.appendChild(link);
    });
  }

  /**
   * 更新 UI
   */
  updateUI(themeName) {
    // 更新按钮文本
    const themeNameSpan = document.querySelector('.theme-name');
    if (themeNameSpan) {
      themeNameSpan.textContent = this.getThemeDisplayName(themeName);
    }

    // 更新主题选项状态
    document.querySelectorAll('.theme-option').forEach(option => {
      const isActive = option.dataset.theme === themeName;
      option.classList.toggle('active', isActive);
      
      const statusDiv = option.querySelector('.theme-status');
      statusDiv.innerHTML = isActive ? '<i class="fas fa-check"></i>' : '';
    });
  }

  /**
   * 显示加载状态
   */
  showLoading() {
    const switcherBtn = document.getElementById('theme-switcher-btn');
    switcherBtn.classList.add('loading');
    switcherBtn.disabled = true;
  }

  /**
   * 隐藏加载状态
   */
  hideLoading() {
    const switcherBtn = document.getElementById('theme-switcher-btn');
    switcherBtn.classList.remove('loading');
    switcherBtn.disabled = false;
  }

  /**
   * 显示消息
   */
  showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `theme-switcher-message ${type}`;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    // 显示动画
    setTimeout(() => messageDiv.classList.add('show'), 100);
    
    // 自动隐藏
    setTimeout(() => {
      messageDiv.classList.remove('show');
      setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
  }

  /**
   * 触发主题切换事件
   */
  dispatchThemeChangeEvent(themeName) {
    const event = new CustomEvent('themeChanged', {
      detail: { theme: themeName }
    });
    document.dispatchEvent(event);
  }

  /**
   * 加载主题偏好设置
   */
  loadThemePreferences() {
    const savedTheme = localStorage.getItem('selected-theme');
    if (savedTheme && savedTheme !== this.currentTheme) {
      this.switchTheme(savedTheme);
    }
  }

  /**
   * 注入样式
   */
  injectStyles() {
    const styles = `
      .theme-switcher {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      .theme-switcher-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 16px;
        background: rgba(255, 255, 255, 0.9);
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 25px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        color: #333;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }

      .theme-switcher-btn:hover {
        background: rgba(255, 255, 255, 1);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        transform: translateY(-1px);
      }

      .theme-switcher-btn.loading {
        opacity: 0.7;
        cursor: not-allowed;
      }

      .theme-switcher-btn i {
        font-size: 16px;
        color: #6366f1;
      }

      .theme-switcher-panel {
        position: absolute;
        top: 60px;
        right: 0;
        width: 400px;
        max-height: 500px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: all 0.3s ease;
        overflow: hidden;
      }

      .theme-switcher-panel.active {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }

      .theme-switcher-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #f0f0f0;
        background: #f8f9fa;
      }

      .theme-switcher-header h3 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: #333;
      }

      .theme-switcher-close {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #666;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.2s ease;
      }

      .theme-switcher-close:hover {
        background: rgba(0, 0, 0, 0.1);
        color: #333;
      }

      .theme-switcher-content {
        max-height: 400px;
        overflow-y: auto;
        padding: 10px;
      }

      .theme-option {
        display: flex;
        align-items: center;
        padding: 15px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        border: 2px solid transparent;
      }

      .theme-option:hover {
        background: #f8f9fa;
      }

      .theme-option.active {
        background: #e8f2ff;
        border-color: #6366f1;
      }

      .theme-preview {
        width: 60px;
        height: 40px;
        border-radius: 6px;
        overflow: hidden;
        margin-right: 15px;
        flex-shrink: 0;
      }

      .theme-preview img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .theme-info {
        flex: 1;
      }

      .theme-info h4 {
        margin: 0 0 5px 0;
        font-size: 16px;
        font-weight: 600;
        color: #333;
      }

      .theme-info p {
        margin: 0;
        font-size: 14px;
        color: #666;
      }

      .theme-status {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .theme-status i {
        color: #6366f1;
        font-size: 16px;
      }

      .theme-switcher-message {
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
      }

      .theme-switcher-message.show {
        opacity: 1;
        transform: translateX(0);
      }

      .theme-switcher-message.success {
        background: #10b981;
      }

      .theme-switcher-message.error {
        background: #ef4444;
      }

      .theme-switcher-message.info {
        background: #6366f1;
      }

      /* 移动端适配 */
      @media (max-width: 768px) {
        .theme-switcher {
          top: 10px;
          right: 10px;
        }

        .theme-switcher-panel {
          width: calc(100vw - 20px);
          right: -10px;
        }

        .theme-option {
          padding: 12px;
        }

        .theme-preview {
          width: 50px;
          height: 35px;
          margin-right: 12px;
        }

        .theme-info h4 {
          font-size: 15px;
        }

        .theme-info p {
          font-size: 13px;
        }
      }

      /* 暗色模式支持 */
      @media (prefers-color-scheme: dark) {
        .theme-switcher-btn {
          background: rgba(30, 30, 30, 0.9);
          border-color: rgba(255, 255, 255, 0.1);
          color: #fff;
        }

        .theme-switcher-btn:hover {
          background: rgba(30, 30, 30, 1);
        }

        .theme-switcher-panel {
          background: #1f1f1f;
          color: #fff;
        }

        .theme-switcher-header {
          background: #2a2a2a;
          border-color: #404040;
        }

        .theme-switcher-header h3 {
          color: #fff;
        }

        .theme-switcher-close {
          color: #ccc;
        }

        .theme-switcher-close:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }

        .theme-option:hover {
          background: #2a2a2a;
        }

        .theme-option.active {
          background: #1e3a8a;
        }

        .theme-info h4 {
          color: #fff;
        }

        .theme-info p {
          color: #ccc;
        }
      }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  }
}

// 初始化主题切换器
if (typeof document !== 'undefined' && document.readyState !== 'loading') {
  // 如果 DOM 已经加载完成，立即初始化
  window.themeSwitcher = new ThemeSwitcher();
} else if (typeof document !== 'undefined') {
  // 否则等待 DOM 加载完成
  document.addEventListener('DOMContentLoaded', () => {
    window.themeSwitcher = new ThemeSwitcher();
  });
}

// 导出供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ThemeSwitcher;
}