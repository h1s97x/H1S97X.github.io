#!/usr/bin/env node

/**
 * Giscus配置助手脚本
 * 帮助快速配置Giscus评论系统
 */

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🎉 欢迎使用Giscus配置助手！');
console.log('这个脚本将帮助你快速配置Giscus评论系统。\n');

// 配置问题
const questions = [
  {
    key: 'repo',
    question: '请输入你的GitHub仓库 (格式: username/repo-name): ',
    validate: (input) => /^[\w.-]+\/[\w.-]+$/.test(input)
  },
  {
    key: 'repoId',
    question: '请输入仓库ID (从giscus.app获取): ',
    validate: (input) => input.length > 0
  },
  {
    key: 'category',
    question: '请输入讨论分类 (默认: Announcements): ',
    default: 'Announcements'
  },
  {
    key: 'categoryId',
    question: '请输入分类ID (从giscus.app获取): ',
    validate: (input) => input.length > 0
  },
  {
    key: 'lang',
    question: '请选择语言 (zh-CN/en/ja等，默认: zh-CN): ',
    default: 'zh-CN'
  },
  {
    key: 'theme',
    question: '请选择主题 (light/dark/preferred_color_scheme，默认: preferred_color_scheme): ',
    default: 'preferred_color_scheme'
  }
];

let config = {};
let currentQuestion = 0;

function askQuestion() {
  if (currentQuestion >= questions.length) {
    generateConfig();
    return;
  }

  const q = questions[currentQuestion];
  rl.question(q.question, (answer) => {
    // 使用默认值或验证输入
    if (!answer && q.default) {
      answer = q.default;
    }

    if (q.validate && !q.validate(answer)) {
      console.log('❌ 输入格式不正确，请重新输入。');
      askQuestion();
      return;
    }

    config[q.key] = answer;
    currentQuestion++;
    askQuestion();
  });
}

function generateConfig() {
  console.log('\n📝 生成配置文件...');

  // 生成giscus配置
  const giscusConfigTemplate = `/* Giscus评论系统配置 - 自动生成 */

// Giscus配置
const giscusConfig = {
  repo: '${config.repo}',
  repoId: '${config.repoId}',
  category: '${config.category}',
  categoryId: '${config.categoryId}',
  mapping: 'pathname',
  strict: '0',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'bottom',
  theme: '${config.theme}',
  lang: '${config.lang}',
  loading: 'lazy'
};

// 初始化Giscus评论
function initGiscusComments() {
  const commentContainer = document.getElementById('giscus-comments');
  if (!commentContainer) {
    console.warn('Giscus评论容器未找到');
    return;
  }

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

  commentContainer.innerHTML = '';
  commentContainer.appendChild(script);
}

// 主题切换
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
  handleThemeChange(mediaQuery);
}

// 懒加载评论
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
    rootMargin: '100px'
  });

  observer.observe(commentContainer);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  if ('IntersectionObserver' in window) {
    lazyLoadComments();
  } else {
    setTimeout(initGiscusComments, 1000);
  }

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

window.giscusConfig = giscusConfig;`;

  // 写入配置文件
  try {
    fs.writeFileSync('js/giscus-comments-configured.js', giscusConfigTemplate);
    console.log('✅ 配置文件已生成: js/giscus-comments-configured.js');

    // 生成HTML模板
    const htmlTemplate = `<!-- Giscus评论区域 - 添加到文章模板中 -->
<div class="comments-section">
  <h3>💬 评论</h3>
  <div id="giscus-comments"></div>
</div>

<!-- 在页面底部添加脚本引用 -->
<script src="/js/giscus-comments-configured.js"></script>`;

    fs.writeFileSync('giscus-template.html', htmlTemplate);
    console.log('✅ HTML模板已生成: giscus-template.html');

    // 生成部署说明
    const deployInstructions = `# Giscus部署说明

## 配置信息
- 仓库: ${config.repo}
- 仓库ID: ${config.repoId}
- 分类: ${config.category}
- 分类ID: ${config.categoryId}
- 语言: ${config.lang}
- 主题: ${config.theme}

## 部署步骤

1. 将 \`js/giscus-comments-configured.js\` 复制到你的博客主题的 js 目录
2. 将 \`giscus-template.html\` 中的HTML代码添加到你的文章模板中
3. 确保你的GitHub仓库已启用Discussions功能
4. 确保Giscus应用已安装到你的仓库

## 测试
访问你的博客文章页面，应该能看到评论区域。

## 故障排除
- 如果评论不显示，检查浏览器控制台是否有错误
- 确认GitHub仓库设置正确
- 验证Giscus应用权限

祝你使用愉快！🎉`;

    fs.writeFileSync('DEPLOY_INSTRUCTIONS.md', deployInstructions);
    console.log('✅ 部署说明已生成: DEPLOY_INSTRUCTIONS.md');

    console.log('\n🎉 配置完成！');
    console.log('\n📋 接下来的步骤：');
    console.log('1. 将生成的文件复制到你的博客主题目录');
    console.log('2. 按照 DEPLOY_INSTRUCTIONS.md 的说明进行部署');
    console.log('3. 测试评论功能是否正常工作');
    console.log('\n💡 提示：记得先在GitHub仓库中启用Discussions功能！');

  } catch (error) {
    console.error('❌ 生成配置文件时出错:', error.message);
  }

  rl.close();
}

// 开始配置
console.log('📋 请按照提示输入配置信息：\n');
askQuestion();