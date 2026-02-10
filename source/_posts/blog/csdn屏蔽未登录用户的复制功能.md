---
title: csdn屏蔽未登录用户的复制功能
date: 2023-08-19 16:11:01
updated: 2023-08-19 16:11:01
tags:
---
# 文本复制
## 一.屏蔽复制原理
### 1.1 <code>CSS</code> user-select

<pre class="line-numbers code-pre" data-title="user-select可屏蔽复制哦！" lang="zh-Hans-CN" data-prismjs-copy="复制文本" data-prismjs-copy-error="按Ctrl+C复制" data-prismjs-copy-success="文本已复制！"><code class="language-css">.user-select-none {
  user-select: none; /* 别看了，就是我屏蔽了你的复制功能。将none改为text即可恢复复制 */
}
</code></pre>
## 二、断点调试
### 2.1 整理资源
   <p>在开始前，我们需要先整理一下这个复制功能会涉及到哪些因素。</p>
    <p>既然是复制，那就离不开快捷键<code>Ctrl+C</code>。既然有<code>Ctrl</code>键，那就可能会有<code>ctrlKey</code>事件，还有可能会有键盘码<code>keyCode</code>。除此之外，复制的话需要先选中内容，那就需要<code>document.selection</code>和<code>window.getSelection()</code>事件。还有那个一复制就出现的登录框。</p>
    <p>事实上，他还用了<code>jquery</code>中的<code>copy</code>事件。好尴尬呀，我竟然忘记了这个。</p>
    <p>有了上述提到的这些资源后，我便开始了一个个定位分析。这个分析过程是非常复杂的，也走了不少弯路。</p>

### 2.2为什么一复制就出现登录框？
   <p>我原以为他是把<code>document.selection</code>事件改写了，所以上来我就把目标定位到了关键字<code>document.selection</code>上。</p>
    <p>一堆断点下来，发现这个没什么用处。看来我的常识经验在这次判断中误导了我。</p>
    <p>后面又挨个把上面提到的资源都测试了下，结果发现<strong>原来复制跟登录框有关</strong>！相关代码见下方↓↓↓</p>
    <pre class="line-numbers code-pre" data-title="n函数" lang="zh-Hans-CN" data-prismjs-copy="复制文本" data-prismjs-copy-error="按Ctrl+C复制" data-prismjs-copy-success="文本已复制！"><code class="language-js">var n = function() {
  window.csdn.loginBox.show({
    spm: "1001.2101.3001.9440"
  })
};
$("#content_views").unbind("keydown").bind("keydown", function(e) {
  if (e.ctrlKey &amp;&amp; 67 == e.keyCode)
    return n(),
    !1
}),
$("#content_views").unbind("copy").bind("copy", function(e) {
  return n(),
  !1
})
</code></pre>

<p>执行copy事件时会触发登录框.png ↓↓↓<img data-original="https://img.alicdn.com/imgextra/i4/759415648/O1CN01JhttG11rappRGkEBf_!!759415648.png" data-src="/img/2023-06-13/执行copy事件时会触发登录框.png" class="img-bg lazy" alt="执行copy事件时会触发登录框" title="执行copy事件时会触发登录框" /></p>
    <p>注意这里有一个<code>copy</code>复制事件。他先用<code>unbind</code>来解绑<code>copy</code>复制事件，紧接着又重新绑定了<code>copy</code>复制事件。重点是下面的一行代码。</p>
    <pre class="line-numbers code-pre" data-title="关键函数n↓↓↓" lang="zh-Hans-CN" data-prismjs-copy="复制文本" data-prismjs-copy-error="按Ctrl+C复制" data-prismjs-copy-success="文本已复制！"><code class="language-js">return n(),
!1
</code></pre>
    <p>这行代码乍看起来可能有些不太习惯，我们用<code>if</code>进行改写下吧。</p>
    <pre class="line-numbers code-pre" data-title="用if来改写↓↓↓" lang="zh-Hans-CN" data-prismjs-copy="复制文本" data-prismjs-copy-error="按Ctrl+C复制" data-prismjs-copy-success="文本已复制！"><code class="language-js">if (n()) {
  return true
} else {
  return false
}
</code></pre>
    <p>由于函数<code>n()</code>调用了登录弹窗显示方法且没有直接的返回值，所以默认返回<code>undefined</code>。由于<code>undefined</code>条件不成立，所以会直接进入<code>else</code>条件中。也就相当于在执行<code>copy</code>复制事件时，直接返回了<code>return false</code>。这就是为什么在复制后粘贴时无任何内容的根本原因！</p>

## 三、破解之道
### 3.1、法一：解绑copy事件
   <p>打开控制台，粘贴解绑<code>copy</code>复制事件的代码即可复制文件内容。</p>
    <pre class="line-numbers code-pre" data-title="解绑copy事件↓↓↓" lang="zh-Hans-CN" data-prismjs-copy="复制文本" data-prismjs-copy-error="按Ctrl+C复制" data-prismjs-copy-success="文本已复制！"><code class="language-js">$("#content_views").unbind("copy")
</code></pre>
    <p>然后我们就能轻松复制文章内的内容了。</p>
    <p>需要注意的是，如果是代码区块，还需要使用1.1中的方法解除<code>CSS</code>后才能复制哦~</p>

# 代码块复制
## 一、分析“登录后复制”按钮是如何工作的
 <h2 class="article-title">一、分析“登录后复制”按钮是如何工作的</h2>
    <p>先上一张图，我们在未登录时，鼠标移入代码块时，在右上角会显示一个“登录后复制”的按钮。点击按钮，就会弹出登录框。配图：弹出登录框.png↓↓↓ <img data-original="https://img.alicdn.com/imgextra/i3/759415648/O1CN01Vj2hcL1rappUOtaFe_!!759415648.png" data-src="/img/2023-06-24/弹出登录框.png" class="img-bg lazy" alt="弹出登录框" title="弹出登录框" /></p>
    <p>细心的看官会发现“登录后复制”对应的是一个类名为<code>.hljs-button</code>的<code>div</code>，而这个<code>dom</code>元素上并未绑定点击事件。配图：登录后复制按钮上未绑定事件.png↓↓↓ <img data-original="https://img.alicdn.com/imgextra/i2/759415648/O1CN01m0IYTg1rapphuavqt_!!759415648.png" data-src="/img/2023-06-24/登录后复制按钮上未绑定事件.png" class="img-bg lazy" alt="登录后复制按钮上未绑定事件" title="登录后复制按钮上未绑定事件" /></p>
    <p>这里补充一句，当我在测试此插件的时候，发现有的文章里面的代码块会跟本案例有些出入。但看官不用担心，因为逻辑是相通的，稍做修改即可破解复制权限的。如果实在搞不定，可以使用文末的插件哈。</p>
    <p>那他是怎么实现一点击就出现登录框的呢？</p>
    <h3 class="article-title article-title__sub">1.1、事件委托</h3>
    <p>实际上此处用的是<strong>事件委托</strong>来实现，昨天的那个<code>copy</code>也是一样的哈。即：把子元素的事件绑定到父元素上。</p>
    <p>核心代码就是<code>onclick</code>点击事件。</p>
    <pre class="line-numbers code-pre" data-title="click事件" lang="zh-Hans-CN" data-prismjs-copy="复制文本" data-prismjs-copy-error="按Ctrl+C复制" data-prismjs-copy-success="文本已复制！"><code class="language-js">onclick="mdcp.signin(event)"
</code></pre>
    <h3 class="article-title article-title__sub">1.2、登录后的变化</h3>
    <p>如果登录过后，此处就会变成“复制”两个字。</p>
    <p>此时<code>onclick</code>事件会发生变化。</p>
    <pre class="line-numbers code-pre" data-title="登录后的click事件↓↓↓" lang="zh-Hans-CN" data-prismjs-copy="复制文本" data-prismjs-copy-error="按Ctrl+C复制" data-prismjs-copy-success="文本已复制！"><code class="language-js">onclick="mdcp.copyCode(event)"
</code></pre>
    <p>所以说，我们只需要在未登录时让点击事件变成<code>copyCode</code>即可。</p>
    
<a href="https://www.yilingsj.com/xwzj/2023-06-13/copy-prohibited.html">文本复制-参考文章</a>
<a href="https://www.yilingsj.com/xwzj/2023-06-24/copy-csdn-code.html">代码块复制-参考文章</a>
