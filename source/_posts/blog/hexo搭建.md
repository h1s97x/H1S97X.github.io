---
title: hexo搭建
date: 2023-08-19 15:13:59
updated: 2023-08-19 15:13:59
tags:
---

[新手建站、搭建个人博客指南 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/361423810)

<a href="https://blog.csdn.net/Night__breeze/article/details/117599100">Hexo阶段一 -- 安装&部署到本地</a>

[使用hexo上传博客至Github（新的方向新的开始！）-CSDN博客](https://blog.csdn.net/qq_43669381/article/details/107823432)

[github page+hexo 绑定域名后页面显示404-CSDN博客](https://blog.csdn.net/Belingda/article/details/100635572)

```
.
├── _config.yml
├── package.json
├── scaffolds
├── source
|   ├── _drafts
|   └── _posts
└── themes
```

### Hexo博客新建&发布文章
[写作](https://hexo.io/zh-cn/docs/writing.html)
[Hexo博客教程（二）| 如何写作新文章并发布](https://cloud.tencent.com/developer/article/1662733)
#### 创建新文章

在网站根目录下打开命令行Git Bash Here，使用如下命令创建新文章：
```
hexo new <title>
```
执行该命令，Hexo会在/source/_posts目录下创建一篇新的文章。
#### Front-matter

打开 Hexo 创建的文章可以看到，文章开头有这样一段：

<img src="https://ask.qcloudimg.com/http-save/yehe-1088047/rpunttrv54.png" alt="">

这个使用---包括起来的内容称之为Front-matter，即前置信息，用于给 Hexo 渲染该 md 文档，除了这三项，还有很多的配置项可以自己添加：

<div class="table-wrapper"><table><thead><tr><th style="text-align: left;"><div><div class="table-header"><p>配置项</p></div></div></th><th style="text-align: left;"><div><div class="table-header"><p>意义</p></div></div></th></tr></thead><tbody><tr><td style="text-align: left;"><div><div class="table-cell"><p>title</p></div></div></td><td style="text-align: left;"><div><div class="table-cell"><p>网页文章标题</p></div></div></td></tr><tr><td style="text-align: left;"><div><div class="table-cell"><p>date</p></div></div></td><td style="text-align: left;"><div><div class="table-cell"><p>文章创建如期</p></div></div></td></tr><tr><td style="text-align: left;"><div><div class="table-cell"><p>comments</p></div></div></td><td style="text-align: left;"><div><div class="table-cell"><p>文章评论功能是否启动</p></div></div></td></tr><tr><td style="text-align: left;"><div><div class="table-cell"><p>tags</p></div></div></td><td style="text-align: left;"><div><div class="table-cell"><p>文章标签</p></div></div></td></tr><tr><td style="text-align: left;"><div><div class="table-cell"><p>categories</p></div></div></td><td style="text-align: left;"><div><div class="table-cell"><p>文章分类</p></div></div></td></tr><tr><td style="text-align: left;"><div><div class="table-cell"><p>keywords</p></div></div></td><td style="text-align: left;"><div><div class="table-cell"><p>文章关键字</p></div></div></td></tr></tbody></table></div>

生成文章

文章写好之后，首先清除掉旧的数据：

```
hexo clean
```

这个命令会清除掉之前生成的网页，即站点根目录下的<code>public</code>文件夹

然后使用如下命令生成新的页面：
```
hexo g
```
这个命令会将<code>source</code>文件夹下所有的md文件进行渲染，生成HTML页面，存放在<code>public</code>文件夹下
### Hexo博客 部署
[部署](https://hexo.io/zh-cn/docs/one-command-deployment.html)
Hexo 提供了快速方便的一键部署功能，让您只需一条命令就能将网站部署到服务器上。
```
$ hexo deploy
简写 hexo d
```
### Hexo博客 文章分类
[Hexo+Github博客教程：03添加分类](https://zhuanlan.zhihu.com/p/50787870)
打开命令行，进入博客所在文件夹。执行命令
```
$ hexo new page categories
```

### Hexo博客删除文章

#### 普通删除方式
Hexo正常删除文章的流程是先删除本地文件。

以原始文件：helloworld.md为例：

首先进入到source / _post 文件夹中，找到helloworld.md文件，在本地直接执行删除。

然后依次执行命令：
``` bash
hexo clean
```
```
hexo g
```
```
hexo d
```
这样就删除成功了

#### 已发布文章删除
如果你已经将文章git发布了，此时会在本地创建一个名为 .deploy_git的文件夹，并将生成的文件复制到该文件夹。

你需要删除本地的文章后，再删除 .deploy_git文件夹。

最后依次执行正常删除的命令。

[hexo删除文章](https://cloud.tencent.com/developer/article/2140491)

<h3>修改主题设置</h3>
<p>总体设置：修改Blog/themes/diaspora/_config.yml<br>
修改背景音乐：将 Blog/source/_posts 中对应文件的文件头mp3指向 Blog/themes/diaspora/audio/xxx.mp3 。<br>
修改封面：将 Blog/source/_posts 中对应文件的文件头cover指向 Blog/themes/diaspora/img/xxx.png 。<br>
</p>

### 域名解析

[个人博客第6篇——解析域名 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/103813944)

### 报错信息排查

##### Nunjucks Error

泄露（Escape）内容

Hexo 使用 [Nunjucks](https://mozilla.github.io/nunjucks/) 来解析文章（旧版本使用 [Swig](http://paularmstrong.github.io/swig/)，两者语法类似），内容若包含 `{{ }}` 或 `{% %}` 可能导致解析错误，您可以用 [`raw`](https://hexo.io/docs/tag-plugins#Raw) 标签包裹，single backtick `{{ }}` 或 triple backtick 来避免潜在问题发生。

[02_Hexo-出错排查-Nunjucks Error | 陈鹏的个人主页 (gitee.io)](https://mycpen.gitee.io/blog/posts/5162)





## 参考链接



[The world’s fastest framework for building websites | Hugo (gohugo.io)](https://gohugo.io/)