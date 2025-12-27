---
title: 程序员最爱的网站克隆爬取工具- HTTrack
date: 2020-03-25 13:29:38
tags: [工具, 爬虫, HTTrack]
categories: 工具
---

有一些专门针对网站克隆爬取的软件，如 WebZip、awwwb.com 等等，据说挺好用的。这里我给大家介绍一款程序员最爱的网站克隆爬取工具 - HTTrack，而且是开源的。

# 什么是 HTTrack？

HTTrack 是一个免费并易于使用的线下浏览器工具，全称是 HTTrack Website Copier for Windows，它能够让你从互联网上下载指定的网站进行线下浏览 (离线浏览)，也可以用来收集信息 (甚至有网站使用隐藏的密码文件)，一些仿真度极高的伪网站（为了骗取用户密码），也是使用类似工具做的。浏览线下站点和线上并没有什么不同。

HTTrack 同样可以进行线下线上站点同步，支持断点续传。HTTrack 是一个可全面配置并包括全面的帮助系统的工具。对于传统的像存在 Robots.txt 的网站，如果程序运行的时候不做限制，在默认的环境下程序不会把网站镜像，简单来说 HTTPrack 跟随基本的 JavaScript 或者 APPLet、flash 中的链接，对于复杂的链接（使用函数和表达式创建的链接）或者服务器端的 ImageMap 则不能镜像。一般不用挖的太深就能获取目标信息比如网站的物理地址，电话号码，电子邮箱地址，运营时间，商业关系，员工的姓名，与社会关系，以及公开的一些花絮。做渗透测试时新闻其实也很重要，公司时常会公开一些自己感到骄傲的事情，这些报到中可能会泄露有用的信息，企业兼并服务器运转的情况等等。

用 Httrack 可以将一个网站拷贝下来，以此进行下线的探测发现，以此减少对目标网站的直接交互。Httrack 的使用很简单，只需要根据其向导按步骤进行就好了。

# 安装

HTTrack 已经被预安装在以下 Linux 系统中：

- [BackBox Linux](http://www.backbox.org/)
- [Kali Linux](http://www.kali.org/)
- [Pentoo](http://www.pentoo.ch/)
- [SamuraiWTF](http://samurai.inguardians.com/)
- [BlackArch](http://blackarch.org/)

如没有可以自行参考以下的安装方式进行下载安装。

### HTTrack 的安装和使用

HTTrack 支持 Windows、Linux 和 MacOS 等主流的操作系统，且针对 Windows 而言，HTTrack 有可视化界面的支持，效果如下：

![程序员最爱的网站克隆爬取工具- HTTrack](https://cdn.learnku.com/uploads/images/202003/25/46135/ZAiXId8zaR.png!large)

#### Windows 下安装:

通过 http://www.httrack.com/page/2/en/index.html，Download 下载对应的版本即可。

#### Linux 下安装:

```php
# Debian/Ubuntu下安装
sudo apt install httrack
# CentOS/Fedora下安装
sudo yum install httrack
# Gentoo下安装
sudo emerge httrack
```

#### Mac OSX 下安装:

```php
sudo port install httrack
# 或者
brew install httrack
```

#### 直接通过源码编译下安装:

```php
git clone https://github.com/xroche/httrack.git --recurse
cd httrack
./configure --prefix=$HOME/usr && make -j8 && make install
```

具体参考：[http://www.httrack.com/page/2/en/index.htm...](http://www.httrack.com/page/2/en/index.html)

常用的参数选项可以通过 `httrack --help` 查看。

# 爬取一个网站

测试站地址： https://****.com

```
xdl@xdl-virtual-machine:~/Downloads$ htt
httrack    httxt2dbm  
xdl@xdl-virtual-machine:~/Downloads$ httrack 

Welcome to HTTrack Website Copier (Offline Browser) 3.49-2
Copyright (C) 1998-2017 Xavier Roche and other contributors
To see the option list, enter a blank line or try httrack --help

Enter project name :jiayu

Base path (return=/home/xdl/websites/) :

Enter URLs (separated by commas or blank spaces) :https://localhost.com

Action:
(enter)    1    Mirror Web Site(s)
    2    Mirror Web Site(s) with Wizard
    3    Just Get Files Indicated
    4    Mirror ALL links in URLs (Multiple Mirror)
    5    Test Links In URLs (Bookmark Test)
    0    Quit
: 

Proxy (return=none) :

You can define wildcards, like: -*.gif +www.*.com/*.zip -*img_*.zip
Wildcards (return=none) :

You can define additional options, such as recurse level (-r<number>), separated by blank spaces
To see the option list, type help
Additional options (return=none) :

---> Wizard command line: httrack https://localhost.com  -O "/home/xdl/websites/jiayu"  -%v  

Ready to launch the mirror? (Y/n) :y

Mirror launched on Wed, 25 Mar 2020 13:29:38 by HTTrack Website Copier/3.49-2 [XR&CO'2014]
mirroring https://localhost.com with the wizard help..
Done.
Thanks for using HTTrack!
* 
```

## 参数解析

```php
# 1. 输入待生成的项目名称
Enter project name :progit
# 2. 输入待保存的项目所在的路径
Base path (return=/Users/apple/websites/) :/Users/apple/Desktop
# 3. 输入需要克隆的网站的 url
Enter URLs (separated by commas or blank spaces) :https://progit.bootcss.com/

Action:
(enter)    1    Mirror Web Site(s)
    2    Mirror Web Site(s) with Wizard
    3    Just Get Files Indicated
    4    Mirror ALL links in URLs (Multiple Mirror)
    5    Test Links In URLs (Bookmark Test)
    0    Quit
:
# 4. 没有特别要求直接回车即可
Proxy (return=none) :

You can define wildcards, like: -*.gif +www.*.com/*.zip -*img_*.zip
# 5. 没有特别要求直接回车即可
Wildcards (return=none) :

You can define additional options, such as recurse level (-r<number>), separated by blank spaces
To see the option list, type help
# 6. 没有特别要求直接回车即可
Additional options (return=none) :

---> Wizard command line: httrack https://progit.bootcss.com/  -O "/Users/apple/Desktop/progit"  -%v

Ready to launch the mirror? (Y/n) :Y

Mirror launched on Thu, 15 Aug 2019 11:54:40 by HTTrack Website Copier/3.49-2 [XR&CO'2014]
mirroring https://progit.bootcss.com/ with the wizard help..
Done.
Thanks for using HTTrack!
*
```