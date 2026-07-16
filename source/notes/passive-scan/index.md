---
title: 被动扫描
date: 2026-07-17 00:12:52
updated: 2026-07-17 00:12:52
categories:
  - 生活
---

### 什么是被动扫描?

被动扫描主要指的是在目标无法察觉的情况下进行的信息收集，比如我们如果想了解一个远在天边的人，你会怎么做呢？显然我们可以选择在搜索引擎去搜索这个名字。其实这就是一次对目标的被动扫描。最经典的被动扫描技术其实要数“Google hack”技术，但是这种技术在我们所处的大陆地区暂时无法使用。在这一章中我们来介绍 3 个极为优秀的信息收集工具：

- Maltego
- sn0int
- ZoomEye

### 被动扫描的范围

那么信息的收集要从哪几方面来下手呢？以目标 a.test.com 为例，我们就可以想方设法来获取如下的一些信息：

1）目标网站所有者的信息，例如姓名、地址、电话、电子邮件等。

2）目标网站相关的电子邮箱。

3）目标网站用户的社交信息，也就是该网站工作人员的微博、QQ、论坛发帖（这些都是国内渗透测试的标准，国外的话一般是推特、Youtube 之类）。

4）a.test.com 指向网站的 DNS 信息，是否使用了 CDN（Content Delivery Network，内容分发网络）、网站应用级入侵防御系统（Web Application Firewall，WAF）等设备。

5）test.com 的子域名信息。

### Maltego

Maltego 是一款十分令人惊喜的信息收集软件。这款工具可以通过域名注册、搜索引擎、社交网络、电子邮件等各种渠道收集目标的信息。

Kali Linux 2 中包含 Maltego，但是需要用户自行注册才能使用。

#### 注册

> 注意：因为 Maltego 是国外网站，注册信息填写后出现页面 404 不能直接访问。所以需要在火狐/谷歌浏览器上添加 redirector 插件，创建新的 director 就行了。
>
> [kali 之 maltego 注册-CSDN 博客](https://blog.csdn.net/u010784611/article/details/109740060)
>
> [注册 Maltego 显示 ReCaptcha is not valid，解决 Google 验证码服务 reCaptcha 失效问题\_the recaptcha token provided is not valid or has e-CSDN 博客](https://blog.csdn.net/u010784611/article/details/109732876)

犯了个蠢，注册后注意邮箱激活，不然就会出现下图的情况：（警告：你的账户未激活）

![image-20231122164458195](D:/hexo/source/_posts/img/image-20231122164458195.png)

启动方法：

启动 Maltogo 的方法很简单，Kali Linux 2 中已经安装了 Maltego，只需要 Applications/01-Information Gathering/maltegoce 就可以打开这个工具:

![image-20231122163158810](D:/hexo/source/_posts/img/image-20231122163158810.png)

打开的 Maltego 工作界面分成 3 个部分，最上方是菜单栏，这里面包含了所有的功能，左侧 Entity Palette 包含了所有的对象（例如设备、域名、IP 地址等），右侧是收集到的信息，如下图：

![image-20231122164810001](D:/hexo/source/_posts/img/image-20231122164810001.png)

接下来进入实战：

先点击左上角工具栏里的 New 创建一个 Graph。

Maltego 的使用是自动化的，你只需要提供要进行调查的内容。例如这里我们要调查的是www.testfire.net这个域名，那么我们就可以在左侧的Entity Palette 列表的 Infarastructure 分类中选择 Domain，并拖动 Domain 到右侧的空白区中：

![image-20231122165335173](D:/hexo/source/_posts/img/image-20231122165335173.png)

在空白区将看到一个名为 maltego.com 的域对象，双击这个对象，就可以修改其内容。

然后我们可以有多种调查的方式，这里面选择一种最为常用的方式，也就是 Maltego 提供的自动化信息收集，在选择了空白区的 maltego.com 之后，然后单击最左侧的 Run View 按钮，在切换出来的 Machines 菜单中提供了 Maltego 提供的几种比较经典的信息收集方式，这里最为常用的是 Footprint 系列，其中后面的数字越大，调查的深度也就越大，这里我们以其中的 Footprint L1 为例。

![image-20231122165101545](D:/hexo/source/_posts/img/image-20231122165101545.png)

选中了 Footprint L1 之后，单击右侧的 run 按钮即可，收集到的结果如图（如果使用的是免费版本的话，那么节点数是有限制的）：

![image-20231122165523854](D:/hexo/source/_posts/img/image-20231122165523854.png)

换个其他的域名试试：

![image-20231122165715200](D:/hexo/source/_posts/img/image-20231122165715200.png)

### sn0int

安装：

```
apt install debian-keyring
```

### Shodan 和 ZoomEye

我认为最好的工具就是 Shodan 和 ZoomEye，它们都是网络安全人员十分喜爱的搜索引擎。不同于 Google 的是，诸如 Baidu 等用于搜索网站页面的引擎，它们的目的是搜索网络上指定类型的设备。

Shodan 和 ZoomEye 的使用方法都十分简单，它们都提供了图形化的操作界面，不过如果正确地使用这两个工具，我们还必须掌握“关键词”的用法。这个“关键词”的用法其实和 Google、Baidu 十分相似，只要你能正确地使用这些关键词，就可以快速在网络上找到那些你所需要的设备,比如轻松地找出位于非洲的一些没有设置口令的服务器。

随着互联网的快速发展，连接到整个网络上的不再只有计算机，各种各样的设备都出现在了这个时代的大舞台上。路由器、交换机、电话系统、网络打印机、工业控制设备、嵌入式系统、安保设备等都可以通过互联网进行访问，一方面为使用者带来了极大的便利，但另一方面，这些设备都暴露在互联网上，也带来了极大的安全隐患。

除了一些确实需要连入互联网的设备（例如网络摄像头）之外，我们经常会发现很多时候，用户并不是故意将设备连接到互联网上的。一些经验不够丰富的工作人员在对这些设备进行配置的时候，往往是在不经意间完成了到互联网的连接。后果更为严重的是，这些用户经常会使用系统默认的用户名和密码，甚至有些设备的密码为空。这种设备一旦被黑客发现，后果将不堪设想。

#### ZoomEye

https://www.zoomeye.org/
