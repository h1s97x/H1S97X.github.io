/**
 * Jest 测试环境设置
 */

// 为主题切换器测试设置基本的 DOM 环境
if (typeof window === 'undefined') {
  // 创建基本的 DOM mock
  const mockElement = {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    appendChild: jest.fn(),
    removeChild: jest.fn(),
    insertAdjacentHTML: jest.fn(),
    querySelector: jest.fn(),
    querySelectorAll: jest.fn(() => []),
    getElementById: jest.fn(),
    createElement: jest.fn(() => mockElement),
    classList: {
      add: jest.fn(),
      remove: jest.fn(),
      toggle: jest.fn(),
      contains: jest.fn()
    },
    style: {},
    innerHTML: '',
    textContent: '',
    dataset: {},
    disabled: false,
    onload: null,
    onerror: null
  };

  // 设置全局变量
  global.window = {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    themeSwitcher: undefined
  };
  
  global.document = {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    getElementById: jest.fn(() => mockElement),
    querySelector: jest.fn(() => mockElement),
    querySelectorAll: jest.fn(() => [mockElement]),
    createElement: jest.fn(() => mockElement),
    body: mockElement,
    head: mockElement,
    readyState: 'complete',
    dispatchEvent: jest.fn()
  };

  global.HTMLElement = function() {};
  global.CustomEvent = function(type, options) {
    this.type = type;
    this.detail = options ? options.detail : undefined;
  };
  
  // 模拟 localStorage
  global.localStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn()
  };

  // 模拟 console 方法以避免测试输出噪音
  global.console = {
    ...console,
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn()
  };
}