---
title: markdown使用
date: 2023-08-27 22:34:19
updated: 2023-08-27 22:34:19
tags:
---
[TOC]



## 参考链接

[Markdown语法](https://markdown.com.cn)

## Markdown语法

<table class="table table-bordered">
    <thead class="thead-light">
        <tr>
            <th>元素</th> 
            <th>Markdown 语法</th>
        </tr>
    </thead> 
    <tbody>
        <tr>
            <td><a href="">标题（Heading）</a></td> 
            <td><code># H1<br>## H2<br>### H3</code></td>
        </tr> 
        <tr>
            <td><a href="">粗体（Bold）</a></td> <td><code>**bold text**</code></td></tr> 
        <tr>
            <td><a href="">斜体（Italic）</a></td> 
            <td><code>*italicized text*</code></td>
        </tr> 
        <tr>
            <td><a href="">引用块（Blockquote）</a></td> 
            <td><code>&gt; blockquote</code></td>
        </tr> 
        <tr>
            <td><a href="">有序列表（Ordered List）</a></td>
            <td><code>1. First item</code><br> <code>2. Second item</code><br> <code>3. Third item</code><br></td>
        </tr>
        <tr>
            <td><a href="">无序列表（Unordered List）</a></td> 
            <td><code>
          - First item<br>
          - Second item<br>
          - Third item<br></code></td>
        </tr> 
        <tr>
            <td><a href="">代码（Code）</a></td> <td><code>`code`</code></td>
            </tr>
        <tr>
            <td><a href="">分隔线（Horizontal Rule）</a></td>
            <td><code>---</code></td>
        </tr> 
        <tr>
            <td><a href="">链接（Link）</a></td> <td><code>[title](https://www.example.com)</code></td>
        </tr> 
        <tr>
            <td><a href="">图片（Image）</a></td> <td><code>![alt text](image.jpg)</code></td>
        </tr>
    </tbody>
</table>


- 添加图片
`![图片alt](图片链接 "图片title")`
- 超链接
`[超链接显示名](超链接地址 "超链接title")`
- 完成标记
`- [x] content`
- 改变字体颜色
`$\color{设置颜色} {文本内容} $`
```
设置颜色：有三种表现形式
1.直接用对应颜色的英文表示，如Blue（纯蓝）、Red（纯红）、Pink（粉红）等（首字母大小写都行）。
2.rgb三原色(红绿蓝)：rgb(0,0,0)（黑色） 每一项0-255变化，全0为黑，全255为白。
3.十六进制表示法：如#000000(黑色)、#ffffff(白色)、#008000（绿色）
```
一句话多个颜色，则用\隔开，其中，颜色代码可以随意更换

- 注意：在 HTML 块级标签内不能使用 Markdown 语法。例如 `<p>italic and **bold**</p>` 将不起作用。
- <p>italic and **bold**</p>



