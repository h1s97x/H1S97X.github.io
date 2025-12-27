/* Giscus评论系统集成 */

// Giscus配置
const giscusConfig = {
    repo: 'your-username/your-repo', // 替换为你的GitHub仓库
    repoId: 'your-repo-id', // 替换为你的仓库ID
    category: 'Announcements', // 讨论分类
    categoryId: 'your-category-id', // 替换为分类ID
    mapping: 'pathname', // 页面映射方式
    strict: '0', // 严格匹配
    reactionsEnabled: '1', // 启用反应
    emitMetadata: '0', // 发送元数据
    inputPosition: 'bottom', // 输入框位置
    theme: 'preferred_color_scheme', // 主题（自动跟随系统）
    lang: 'zh-CN', // 语言
    loading: 'lazy' // 懒加载
};

// 初始化Giscus评论
function initGiscusComments() {
    // 检查是否存在评论容器
    const commentContainer = document.getElementById('giscus-comments');
    if (!commentContainer) {
        console.warn('Giscus评论容器未找到');
        return;
    }

    // 创建giscus脚本
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', giscusConfig.repo);
    script.setAttribute('data-repo-id', giscusConfig.repoId);
    script.setAttribute('data-category', giscusConfig.category);
    script.setAttribute('data-category-id', giscusConfig.categoryId);
    script.setAttribute('data-mapping', giscusConfig.mapping);
    script.setAttribute('data-strict', giscusConfig.strict);
    script.setAttribute('data-reactions-enabled', giscusConfig.reactionsEnabled);
    script.setAttribute('data-emit-metadata', giscusConfig.emitMetadata);
    script.setAttribute('data-input-position', giscusConfig.inputPosition);
    script.setAttribute('data-theme', giscusConfig.theme);
    script.setAttribute('data-lang', giscusConfig.lang);
    script.setAttribute('data-loading', giscusConfig.loading);
    script.crossOrigin = 'anonymous';
    script.async = true;

    // 清空容器并添加脚本
    commentContainer.innerHTML = '';
    commentContainer.appendChild(script);
}

// 主题切换时更新Giscus主题
function updateGiscusTheme(theme) {
    const giscusFrame = document.querySelector('iframe.giscus-frame');
    if (giscusFrame) {
        giscusFrame.contentWindow.postMessage(
            { giscus: { setConfig: { theme: theme } } },
            'https://giscus.app'
        );
    }
}

// 监听系统主题变化
function watchThemeChange() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    function handleThemeChange(e) {
        const theme = e.matches ? 'dark' : 'light';
        updateGiscusTheme(theme);
    }
    
    mediaQuery.addListener(handleThemeChange);
    
    // 初始设置
    handleThemeChange(mediaQuery);
}

// 延迟加载评论（提高页面加载速度）
function lazyLoadComments() {
    const commentContainer = document.getElementById('giscus-comments');
    if (!commentContainer) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initGiscusComments();
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '100px' // 提前100px开始加载
    });

    observer.observe(commentContainer);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 如果支持IntersectionObserver，使用懒加载
    if ('IntersectionObserver' in window) {
        lazyLoadComments();
    } else {
        // 降级处理：直接加载
        setTimeout(initGiscusComments, 1000);
    }
    
    // 监听主题变化
    watchThemeChange();
});

// 为AJAX页面加载提供重新初始化功能
window.reinitGiscusComments = function() {
    setTimeout(function() {
        if ('IntersectionObserver' in window) {
            lazyLoadComments();
        } else {
            initGiscusComments();
        }
    }, 500);
};

// 导出配置供外部使用
window.giscusConfig = giscusConfig;