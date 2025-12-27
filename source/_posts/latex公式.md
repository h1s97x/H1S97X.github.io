---
title: latex公式
date: 2023-08-21 17:33:39
updated: 2023-08-21 17:33:39
tags:
---

> Introduction

 LaTeX，作为广义上的计算机标记语言（比如HTML），它继承了计算机语言的光荣传统，通过一些简单的代码表达出精确的含义，具有不二义性。其文章排版的结果可以完全按照你的想法来，不仅解决了玄学问题，渲染出来的文章优美；同时，其还可以通过简单的语法写出优雅高贵的数学公式，目前Markdown也已经支持LaTeX语法的公式

 > 数学模式
 - 行内公式：嵌入在行内，适用于简单短小的公式
 `$ f(x) = a+b $`
  $ f(x) = a+b $
 - 块级公式：居中独占一行，适用于比较长或重要的公式

 `$$ f(x) = a+b $$`
 $$ f(x) = a+b $$
 `$$ f(x) = a - b \tag{1.1} $$`
$$ f(x) = a - b \tag{1.1} $$
 - 公式中的空格均会被忽略，可以使用命令\quad或\qquad实现
 - 在行间公式中，命令\tag{n}可以进行手动编号


> 数学结构
### 简单运算
拉丁字母、阿拉伯数字和 +-\*/= 运算符均可以直接输入获得
命令:
- \cdot 表示乘法的圆点
- \neq 表示不等号
- \equiv 表示恒等号
- \bmod 表示取模
`$$ x+2-3*4/6=4/y + x\cdot y $$`
$$ x+2-3*4/6=4/y + x\cdot y $$
`$$ 0 \neq 1 \quad x \equiv x \quad 1 = 9 \bmod 2 $$`
$$ 0 \neq 1 \quad x \equiv x \quad 1 = 9 \bmod 2 $$

### 根号、分式
命令：
- \sqrt 表示平方根
- \sqrt[n] 表示n次方根
- \frac 表示分式
`$$\sqrt{x} + \sqrt{x^{2}+\sqrt{y}} = \sqrt[3]{k_{i}} - \frac{x}{m}$$`
$$\sqrt{x} + \sqrt{x^{2}+\sqrt{y}} = \sqrt[3]{k_{i}} - \frac{x}{m}$$

### 向量
命令：
- \vec表示向量
- \overrightarrow 表示箭头向右的向量
- \overleftarrow 表示箭头向左的向量
`$$\vec{a} + \overrightarrow{AB} + \overleftarrow{DE}$$`
$$\vec{a} + \overrightarrow{AB} + \overleftarrow{DE}$$

### 积分、极限、求和、乘积
命令：
- \int 表示积分
- \lim 表示极限
- \sum 表示求和
- \prod 表示乘积
- ^与_ 表示上、下限
`$$  \lim_{x \to \infty} x^2_{22} - \int_{1}^{5}x\mathrm{d}x + \sum_{n=1}^{20} n^{2} = \prod_{j=1}^{3} y_{j}  + \lim_{x \to -2} \frac{x-2}{x} $$`
$$  \lim_{x \to \infty} x^2_{22} - \int_{1}^{5}x\mathrm{d}x + \sum_{n=1}^{20} n^{2} = \prod_{j=1}^{3} y_{j}  + \lim_{x \to -2} \frac{x-2}{x} $$

### 间隔符号
命令：
- \+空格
- \quad
- \qquad
这三种写入方式所呈现的效果是——**间隔依次增大**
`$x\ y$`
$x\ y$
`$x\quad y$`
$x\quad y$
`$x\qquad y$`
$x\qquad y$

### 上下标
命令：
- \_ 表示下标
- ^ 表示上标
- ' 表示求导
上下标内容不止一个字符时，需用大括号括起来。
`$$ a_{ij}^{2} + b^3_{2}=x^{t} + y' + x''_{12} $$`
$$ a_{ij}^{2} + b^3_{2}=x^{t} + y' + x''_{12} $$

### 上下标记
命令：
- \overline 在表达式上方画出水平线
- \underline 在表达式下方画出水平线
- \overbrace 在表达式上方给出一个水平的大括号
- \underbrace 在表达式下方给出一个水平的大括号
`$$\overline{x+y} \qquad \underline{a+b}$$`
$$\overline{x+y} \qquad \underline{a+b}$$
`$$\overbrace{1+2+\cdots+n}^{n个} \qquad \underbrace{a+b+\cdots+z}_{26}$$`
$$\overbrace{1+2+\cdots+n}^{n个} \qquad \underbrace{a+b+\cdots+z}_{26}$$

### 三圆点
命令：
- \ldots 点位于基线上
- \cdots 点设置为居中
- \vdots 使其垂直
- \ddots 对角线排列
`$$ x_{1},x_{2},\ldots,x_{5}  \quad x_{1} + x_{2} + \cdots + x_{n} $$`
$$ x_{1},x_{2},\ldots,x_{5}  \quad x_{1} + x_{2} + \cdots + x_{n} $$

### 重音符号
命令：
- \hat
- \bar
- \tilde
`$ \hat{x} $`
$ \hat{x} $
`$ \bar{x} $`
$ \bar{x} $
`$ \tilde{x} $`
$ \tilde{x} $

## 运算符

![](https://pic1.zhimg.com/80/v2-da3e717cf670582fbfbdddee33073524_720w.webp "希腊字母")

### 在Markdown里插入希腊字母

如果直接在公式块中是可以直接显示的。$$
\phi
$$

如果想在文字中嵌入，输入 $\phi$。

typora，设置 文件—>偏好设置—>Markdown，勾上 “内联公式”

[【Markdown笔记】Markdown中添加和使用希腊字母_dadalaohua的博客-CSDN博客](https://blog.csdn.net/u012028275/article/details/115057245)

______________________________________________________________

### 参考
<a href="https://blog.csdn.net/CaptainD_W/article/details/116570636?ydreferer=aHR0cHM6Ly9jbi5iaW5nLmNvbS8%3D">在 Markdown(.md)文件中写入各种漂亮的 LaTex公式</a>
<a href="https://zhuanlan.zhihu.com/p/450465546">Markdown/LaTeX 数学公式和符号表</a>
<a href="https://www.overleaf.com/learn">权威参考</a>
<a href="https://zhuanlan.zhihu.com/p/110756681">LaTeX 公式篇</a>
