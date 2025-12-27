---
title: HTTrack 简单使用
date: '2025-12-27 23:46:11'
---
# HTTrack 简单使用

- **本文作者：** 李钰璕
- **本文链接：** [https://leeyuxun.github.io/HTTrack 简单使用.html](https://leeyuxun.github.io/HTTrack简单使用.html)

# 前言

`HTTrack` 是一个免费的（GPL，自由软件）和易于使用的离线浏览器工具。它可以爬取整站的网页，用于离线浏览，减少与目标系统交互。它可从 `Internet` 上下载万维网站点到本地目录，递归地构建所有目录，从服务器获取 `HTML`、图像和其他文件到本地。`HTTrack` 安排原始网站的相关链接结构。只需在浏览器中打开 “镜像” 网站的页面，即可从链接到链接浏览网站，就像在线查看网站一样。`HTTrack` 也可以更新现有的镜像站点，并恢复中断的下载。`HTTrack` 完全可配置，并具有集成的帮助系统。

# `HTTrack` 安装

```
root@kali:~# apt-get install httrack
```

# `HTTrack` 交互模式使用步骤

1. 创建目录存储复制网站

   ```
   root@kali:~# mkdir mywebsite
   ```

   [![img](https://raw.githubusercontent.com/Leeyuxun/pic-storage/main/img/20200117195447.png)](https://raw.githubusercontent.com/Leeyuxun/pic-storage/main/img/20200117195447.png)

2. 启动 `HTTrack`

   ```
   root@kali:~# httrack
   ```

   [![img](https://raw.githubusercontent.com/Leeyuxun/pic-storage/main/img/20200117172009.png)](https://raw.githubusercontent.com/Leeyuxun/pic-storage/main/img/20200117172009.png)

3. 输入项目名称

   ```
   Enter project name : blog	//blog为项目名称
   ```

   [![img](https://raw.githubusercontent.com/Leeyuxun/pic-storage/main/img/20200117171943.png)](https://raw.githubusercontent.com/Leeyuxun/pic-storage/main/img/20200117171943.png)

4. 选择存储网站目录

   ```
   Base path (return=/root/websites/) :/root/mywebsite
   ```

   [![img](https://raw.githubusercontent.com/Leeyuxun/pic-storage/main/img/20200117171926.png)](https://raw.githubusercontent.com/Leeyuxun/pic-storage/main/img/20200117171926.png)

5. 输入网站的 URL

   ```
   Enter URLs (separated by commas or blank spaces) :www.baidu.com
   ```

   [![img](https://raw.githubusercontent.com/Leeyuxun/pic-storage/main/img/20200117200710.png)](https://raw.githubusercontent.com/Leeyuxun/pic-storage/main/img/20200117200710.png)

6. 选择操作 (此处选择 2)

   ```
   Action:
   (enter) 1	Mirror Web Site(s)		//直接镜像站点
           2	Mirror Web Site(s) with Wizard		//用向导完成镜像
           3	Just Get Files Indicated		//只get某种特定的文件
           4	Mirror ALL links in URLs (Multiple Mirror)//镜像在这个url下所有的链接
           5	Test Links In URLs (Bookmark Test)	//测试在这个url下的链接
           0	Quit	//退出
   : 
   ```

   [![img](https://raw.githubusercontent.com/Leeyuxun/pic-storage/main/img/20200117200731.png)](https://raw.githubusercontent.com/Leeyuxun/pic-storage/main/img/20200117200731.png)

7. 指定是否在实施攻击时使用代理 (此处默认输入 none，不使用代理)

   ```
   Proxy (return=none) :
   ```

   [![img](https://raw.githubusercontent.com/Leeyuxun/pic-storage/main/img/20200117200756.png)](https://raw.githubusercontent.com/Leeyuxun/pic-storage/main/img/20200117200756.png)

8. 定义字符，爬取特定类型的数据 (此处输入 `*` 表示爬取全部类型数据)

   ```
   You can define wildcards, like: -*.gif +www.*.com/*.zip -*img_*.zip
   Wildcards (return=none) :*
   ```

   [![img](https://raw.githubusercontent.com/Leeyuxun/pic-storage/main/img/20200117200814.png)](https://raw.githubusercontent.com/Leeyuxun/pic-storage/main/img/20200117200814.png)

9. 设置更多选项，可以使用 `help` 查看 (此处选择默认)

   ```
   You can define additional options, such as recurse level (-r<number>), separated by blank spaces
   To see the option list, type help
   Additional options (return=none) :
   ```

   [![img](https://raw.githubusercontent.com/Leeyuxun/pic-storage/main/img/20200117200836.png)](https://raw.githubusercontent.com/Leeyuxun/pic-storage/main/img/20200117200836.png)

10. 开始克隆网站

    [![img](https://raw.githubusercontent.com/Leeyuxun/pic-storage/main/img/20200117200903.png)](https://raw.githubusercontent.com/Leeyuxun/pic-storage/main/img/20200117200903.png)

11. 查看克隆的文件

    [![img](https://raw.githubusercontent.com/Leeyuxun/pic-storage/main/img/20200117201137.png)](https://raw.githubusercontent.com/Leeyuxun/pic-storage/main/img/20200117201137.png)

备注：`httrack` 只能用于克隆静态内容，并且无法完全复制网站上的动态内容、中间部分 (数据库) 等内容。

# `HTTrack` 一般模式使用步骤

**语法**

```
httrack <URLs> [-option] [+<URL_FILTER>] [-<URL_FILTER>] [+<mime:MIME_FILTER>] [-<mime:MIME_FILTER>]
```

选项如下：（* 为默认值）

## 一般选项

```
O  镜像路径/缓存和日志文件路径
-O 镜像路径[,缓存和日志文件路径] (--path <param>)
```

## 行为选项

```
w  *镜像网站 (--mirror)
W	镜像网站，半自动 (asks questions) (--mirror-wizard)
g	只获取文件（保存在当前目录中） (--get-files)
i	使用缓存继续中断的镜像 (--continue)
Y	镜像所有位于第一级页面的链接 (镜像链接) (--mirrorlinks)
```

## 代理选项

```
P   代理使用 (-P proxy:port or -P user:pass@proxy:port) (--proxy <param>)
%f *使用ftp代理 (f0 don't use) (--httpproxy-ftp[=N])
%b  使用此本地主机名发出/发送请求 (-%b 主机名) (--bind <param>)
```

## 限制选项

```
rN	  将“镜像深度”设置为N (* r9999) (--depth[=N])
%eN   将“外部链接深度”设置为N (* %e0) (--ext-depth[=N])
mN    将非HTML文件的最大文件长度设置为N (--max-files[=N])
mN,N2 将非HTML文件的最大文件长度设置为N、将HTML文件的最大文件长度设置为N2
MN    将可上传/扫描的最大总长度设置为N (--max-size[=N])
EN    将最大镜像传输时间设置为N秒 (60=1 minute, 3600=1 hour) (--max-time[=N])
AN    将最大传输速率设置为N字节/秒 (1000=1KB/s max) (--max-rate[=N])
%cN   将最大连接数设置为N个/秒 (*%c10) (--connection-per-second[=N])
GN    设置如果达到N个字节，则暂停传输，并等待锁定文件被删除 (--max-pause[=N])
```

## 流量控制

```
cN  设置连接数为N (*c8) (--sockets[=N])
TN  设置关闭无响应链接N秒后超时 (--timeout)
RN  设置超时或非致命错误情况下的重试次数为N (*R1) (--retries[=N])
JN  流量阻塞控制，设置链路允许的最小传输速率为N字节/秒 (--min-rate[=N])
HN  如果：0=从不、1=超时、2=慢、3=超时或慢，则放弃主机 (--host-control[=N])
```

## 链接选项

```
%P        *扩展解析，尝试解析所有链接，即使是未知标记或Javascript标记 (%P0 don't use) (--extended-parsing[=N])
n          在html文件附近获取非html文件 (例如：位于外部的图像) (--near)
t          测试所有url（即使url被禁止） (--test)
%L <file>  添加位于此文本文件中的所有URL（每行一个URL）  (--list <param>)
%S <file>  添加位于此文本文件中的所有扫描规则（每行一个扫描规则） (--urllist <param>)
```

## 构建选项

```
NN	结构类型 (0 *原始结构, 1+: 详见下文) (--structure[=N])
    或用户定义的结构 (-N "%h%p/%n%q.%t")
%N  延迟类型检查，不进行任何链接测试，而是等待文件下载开始（实验性的）(N0 不使用，%N1 用于未知扩展名，*%N2 始终使用)
%D  缓存的延迟类型检查，不要在更新期间等待远程类型，以加快更新速度 (%D0 等待, * %D1 不等待) (--cached-delayed-type-check)
%M  生成RFC MIME封装的完整存档 (.mht) (--mime-html)
LN	长名称 (L1 *长名称 / L0 8-3 转换 / L2 ISO9660 兼容) (--long-names[=N])
KN	保留原始链接 (e.g. http://www.adr/link) (K0 *相对链接, K 绝对链接, K4 原始链接, K3 绝对URI链接, K5 透明代理链接) (--keep-links[=N])
x	用错误页替换外部html链接 (--replace-external)
%x	不包括受外部密码保护的网站的任何密码 (%x0 包括) (--disable-passwords)
%q *包含本地文件的查询字符串 (无用,仅供参考) (%q0 不包含) (--include-query-string)
o  *出错时生成输出html文件 (404..) (o0 不生成) (--generate-errors)
X  *更新后清除旧文件 (X0 保持删除) (--purge-old[=N])
%p	保留html文件“原样” (与'-K4 -%F ""'相同) (--preserve)
%T	链接转换为UTF-8 (--utf8-conversion)
```

## 蜘蛛选项

```
bN	接受cookies.txt中的cookies (0=不接受,* 1=接受) (--cookies[=N])
u	检查未知文档类型 (cgi,asp..) (u0 不检查, * u1 检查除了 /, u2 始终检查) (--check-type[=N])
j  *解析JAVA类 (j0 不解析, 位掩码: |1 解析默认值, |2 不解析.class文件 |4 不解析.js文件 |8 不越界解析) (--parse-java[=N])
sN	遵循robots.txt和meta robots标记 (0=never,1=sometimes,* 2=always, 3=always (even strict rules)) (--robots[=N])
%h  强制HTTP/1请求 (仅针对旧服务器或代理减少更新特性) (--http-10)
%k	尽可能使用keep alive，大大减少小文件和测试请求的延迟 (%k0 不使用) (--keep-alive)
%B  容忍请求 (在某些服务器上接受虚假响应，但不是标准的!) (--tolerant)
%s  更新非法入侵：在更新时限制重新传输的各种非法入侵(相同大小，虚假响应…) (--updatehack)
%u  url非法入侵：限制重复url的各种非法入侵 (strip //, www.foo.com==foo.com..) (--urlhack)
%A  假设一个类型(cgi,asp..)总是与一个mime类型链接 (-%A php3,cgi=text/html;dat,bin=application/x-zip) (--assume <param>)
     快捷方式：'--assume standard'相当于-%A php2 php3 php4 php cgi asp jsp pl cfm nsf=text/html
     也可以用于强制特定的文件类型：-assume foo.cgi=text/html
@iN	internet协议 (0=both ipv6+ipv4, 4=ipv4 only, 6=ipv6 only) (--protocol[=N])
%w  禁用特定的外部mime模块 (-%w htsswf -%w htsjava) (--disable-module <param>)
```

## 浏览器 ID

```
F   在HTTP头中发送的用户代理字段 (-F "user-agent name") (--user-agent <param>)
%R  在HTTP头中发送的默认referer字段 (--referer <param>)
%E  从以HTTP头发送的电子邮件地址 (--from <param>)
%F  Html代码中的页脚字符串 (-%F "Mirrored [from host %s [file %s [at %s]]]" (--footer <param>)
%l  首选语言 (-%l "fr, en, jp, *" (--language <param>)
%a  接受格式 (-%a "text/html,image/png;q=0.9,*/*;q=0.1" (--accept <param>)
%X  附加的HTTP标题行 (-%X "X-Magic: 42" (--headers <param>)
```

## 日志、索引、缓存

```
C   创建/使用缓存进行更新和重试 (C0 无缓存,C1 缓存优先,* C2 测试更新前) (--cache[=N])
k   将所有文件存储在缓存中 (如果文件在磁盘上，则此功能不可用) (--store-all-in-cache)
%n  不能重新下载本地删除的文件 (--do-not-recatch)
%v  在屏幕上显示下载的文件名(实时) - * %v1 缩写版 - %v2 完整 (--display)
Q   无日志-安静模式  (--do-not-log)
q   无问题-安静模式 (--quiet)
z   日志-附加信息 (--extra-log)
Z   日志-debug (--debug-log)
v   登录屏幕 (--verbose)
f  *登录文件 (--file-log)
f2  一个单一日志文件(--single-log)
I  *编制索引 (I0 不编制索引) (--index)
%i  为项目文件夹创建顶级索引 (* %i0 不创建) (--build-top-index)
%I  为此镜像创建可搜索索引 (* %I0 不创建) (--search-index)
```

## 专家选项

```
pN  优先模式: (* p3) (--priority[=N])
     p0 只扫描，不保存任何内容 (用于检查链接)
     p1 只保存html文件
     p2 只保存非html文件
    *p3 保存所有文件
     p7 先获取html文件，然后处理其他文件
S   保持在同一个目录 (--stay-on-same-dir)
D  *只能进入子目录 (--can-go-down)
U   只能进入父目录 (--can-go-up)
B   可以上下进入目录结构 (--can-go-up-and-down)
a  *保持在同一地址 (--stay-on-same-address)
d   保持在同一主域 (--stay-on-same-domain)
l   保持相同的TLD (eg: .com) (--stay-on-same-tld)
e   go everywhere on the web (--go-everywhere)
%H  在日志文件中调试HTTP头 (--debug-headers)
```

## 权威选项

（尽量避免使用）

```
#X  *使用优化引擎 (有限内存边界检查) (--fast-engine)
#0   过滤测试 (-#0 '*.gif' 'www.bar.com/foo.gif') (--debug-testfilters <param>)
#1   简化测试 (-#1 ./foo/bar/../foobar)
#2   类型测试 (-#2 /foo/bar.php)
#C   换成列表 (-#C '*.com/spider*.gif' (--debug-cache <param>)
#R   缓存修复 (损坏缓存) (--repair-cache)
#d   调试分析器 (--debug-parsing)
#E   在meta.zip中提取new.zip缓存元数据
#f   总是刷新日志文件 (--advanced-flushlogs)
#FN  过滤器的最大过滤数目 (--advanced-maxfilters[=N])
#h   版本信息 (--version)
#K   扫描标准输入 (debug) (--debug-scanstdin)
#L   最大链接数 (-#L1000000) (--advanced-maxlinks[=N])
#p   显示进度信息 (--advanced-progressinfo)
#P   抓取URL (--catch-url)
#R   旧的FTP例程 (debug) (--repair-cache)
#T   每分钟生成一次传输操作日志 (--debug-xfrstats)
#u   等待时间 (--advanced-wait)
#Z   每分钟生成传输速率的静态数据 (--debug-ratestats)
```

## 危险选项

（尽量避免使用）

```
%!  绕过旨在避免带宽滥用的内置安全限制 (带宽，并发连接) (--disable-security-limits)
```

危险选项，仅适用于专家；

谨慎使用；

## 命令行特定选项

```
V   执行每个文件后的系统命令 ($0 is the filename: -V "rm \$0") (--userdef-cmd <param>)
%W  使用外部库函数作为包装器 (-%W myfoo.so[,myparameters]) (--callback <param>)
```

## 选项 N 详情

```
N0 站点结构 (默认)
N1 HTML in web/, images/other files in web/images/
N2 HTML in web/HTML, images/other in web/images
N3 HTML in web/,  images/other in web/
N4 HTML in web/, images/other in web/xxx, where xxx is the file extension (all gif will be placed onto web/gif, for example)
N5 Images/other in web/xxx and HTML in web/HTML
N99 All files in web/, with random names (gadget !)
N100 站点结构，不包括www.domain.xxx/
N101 Identical to N1 exept that "web" is replaced by the site's name
N102 Identical to N2 exept that "web" is replaced by the site's name
N103 Identical to N3 exept that "web" is replaced by the site's name
N104 Identical to N4 exept that "web" is replaced by the site's name
N105 Identical to N5 exept that "web" is replaced by the site's name
N199 Identical to N99 exept that "web" is replaced by the site's name
N1001 Identical to N1 exept that there is no "web" directory
N1002 Identical to N2 exept that there is no "web" directory
N1003 Identical to N3 exept that there is no "web" directory (option set for g option)
N1004 Identical to N4 exept that there is no "web" directory
N1005 Identical to N5 exept that there is no "web" directory
N1099 Identical to N99 exept that there is no "web" directory
```

## 用户定义选项 N 详情

```
'%n' 没有文件类型的文件名 (ex: image)
'%N' 文件名，包括文件类型 (ex: image.gif)
'%t' 文件类型 (ex: gif)
'%p' 路径 [无结尾 /] (ex: /someimages)
'%h' 主机名 (ex: www.someweb.com)
'%M' URL MD5 (128位，32个ascii字节)
'%Q' 查询字符串MD5 (128位，32个ascii字节)
'%k' 完整查询字符串
'%r' 协议名 (ex: http)
'%q' 短查询字符串 (16位，4个ascii字节)
	 '%s?' 短名称版本 (ex: %sN)
'%[param]' 查询字符串中的param变量
'%[param:before:after:empty:notfound]' 高级变量提取
```

## 用户定义的选项 N 和高级变量提取详情

```
%[param:before:after:empty:notfound]
param    参数名称
before   如果找到参数，则在其前面加上字符串
after    找到参数后要追加的字符串
notfound 如果找不到参数，则替换字符串
empty    如果参数为空，则替换字符串
```

除第一个字段（参数名）外，所有字段都可以为空

## 选项 K 详情

```
K0  foo.cgi?q=45  ->  foo4B54.html?q=45 (relative URI, default)
K                 ->  http://www.foobar.com/folder/foo.cgi?q=45 (absolute URL) (--keep-links[=N])
K3                ->  /folder/foo.cgi?q=45 (absolute URI)
K4                ->  foo.cgi?q=45 (original URL)
K5                ->  http://www.foobar.com/folder/foo4B54.html?q=45 (transparent proxy URL)
```

## 快捷操作

```
--mirror      <URLs> *制作站点的镜像 (default)
--get         <URLs>  获取指定的文件，不要查找其他URL (-qg)
--list   <text file>  添加此文本文件中的所有URL (-%L)
--mirrorlinks <URLs>  镜像一级页面中的所有链接 (-Y)
--testlinks   <URLs>  测试页面中的链接 (-r1p0C0I0t)
--spider      <URLs>  爬取站点，用于测试链接:报告错误和警告 (-p0C0I0t)
--testsite    <URLs>  与--spider相同
--skeleton    <URLs>  创建镜像，但只获取html文件 (-p1)
--update              更新镜像，无需确认 (-iC2)
--continue            继续镜像，无需确认 (-iC1)

--catchurl            创建一个临时代理来捕获一个URL或一个表单post URL
--clean               删除缓存和日志文件

--http10              强制http/1.0请求 (-%h)
```

# 举例

1. 只镜像站点 `www.someweb.com/bob/`；

   ```
   httrack www.someweb.com/bob/
   ```

2. 将两个站点镜像在一起（带有共享链接），并接受.com 站点上的任何.jpg 文件；

   ```
   httrack www.someweb.com/bob/ www.anothertest.com/mike/ +*.com/*.jpg -mime:application/*
   ```

3. 从 bobby.html 开始获取所有文件，具有 6 个链接深度，并且可以在 web 上到处访问；

   ```
   httrack www.someweb.com/bob/bobby.html +* -r6
   ```

4. 使用代理在 `www.someweb.com/bob/bobby.html` 上运行爬虫；

   ```
   httrack www.someweb.com/bob/bobby.html --spider -P proxy.myhost.com:8080
   ```

5. 更新当前文件夹中的镜像 ；

   ```
   httrack --update
   ```

6. 进入交互模式；

   ```
   httrack
   ```

7. 在当前文件夹中继续镜像；

   ```
   httrack --continue
   ```

# 参考

[Httrack Users Guide](http://www.httrack.com/html/fcguide.html)
