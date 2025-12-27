---
title: CDN介绍与使用
categories:
  - null
date: 2023-08-28 15:50:42
updated: 2023-08-28 15:50:42
tags:
---
[在线CDN工具](https://www.jsdelivr.com/)

## CDN介绍
More Info：[详解](https://zhuanlan.zhihu.com/p/28940451)



### 内容导引

某视频APP实现1千万用户同时在线观看。

如果大家观看的是1080p清晰度的视频（理论上需要4Mbps带宽），那么，累计需要的流量带宽是10,000,000×4Mbps=40,000,000Mbps=40Tbps。

对于优酷、爱奇艺这样的互联网视频内容提供商来说，这无疑是非常巨大的流量压力。
我们普通计算机的网卡，是1Gbps的带宽。如果优酷有一台超级服务器，那么，这台超级服务器就需要4万块网卡，而且必须百分之百跑满速度，才能够实现这1千万用户的流畅观看。
对于一些实力不够的服务商，或者突发流量陡增的情况，就会造成拥塞，从而导致卡顿和延时。
有这么一个说法：当用户打开一个页面，等待超过4秒，他就会关闭这个页面。也就是说，这个用户就会流失。

**控制时延**

无疑是现代信息科技的重要指标，CDN的意图就是尽可能的减少资源在转发、传输、链路抖动等情况下顺利保障信息的连贯性

因为这项技术是把内容进行了分发，所以，它的名字就叫做:Content Delivery Network或Content Ddistribute Network，即**内容分发网络**

**CDN=更智能的镜像+缓存+流量导流。**
### 原理

CDN这个技术其实说起来并不复杂，最初的核心理念，就是将内容缓存在终端用户附近。
内容源不是远么？那么，我们就在靠近用户的地方，建一个缓存服务器，把远端的内容，复制一份，放在这里，不就OK了？

<img class="ztext-gif" width="640" role="presentation" src="https://pic1.zhimg.com/v2-aa9f483b52208241bcbbe6ce95028344_b.webp" data-thumbnail="https://pic1.zhimg.com/v2-aa9f483b52208241bcbbe6ce95028344_b.jpg" data-size="normal" alt="动图" style="display: block;">



<img src="https://pic4.zhimg.com/80/v2-5793aec83fc645e002a1cd70ab7209a3_720w.webp" data-rawwidth="600" data-rawheight="344" width="600" data-original="https://pic4.zhimg.com/v2-5793aec83fc645e002a1cd70ab7209a3_r.jpg" data-actualsrc="https://pic4.zhimg.com/v2-5793aec83fc645e002a1cd70ab7209a3_b.jpg" data-original-token="v2-5793aec83fc645e002a1cd70ab7209a3" height="344" data-lazy-status="ok">

> 基础架构：最简单的CDN网络由一个DNS服务器和几台缓存服务器组成：
> <ol>
> <li data-pid="dSiR9k7k">当用户点击网站页面上的内容URL，经过本地DNS系统解析，DNS系统会最终将域名的解析权交给CNAME指向的CDN专用DNS服务器。</li><br>
> <li data-pid="YLuTZzbQ">CDN的DNS服务器将CDN的全局负载均衡设备IP地址返回用户。</li><br>
> <li data-pid="mDHYloMm">用户向CDN的全局负载均衡设备发起内容URL访问请求。</li><br>
> <li data-pid="RgkWzDfb">CDN全局负载均衡设备根据用户IP地址，以及用户请求的内容URL，选择一台用户所属区域的区域负载均衡设备，告诉用户向这台设备发起请求。</li><br>
> <li data-pid="zk1INIt4">区域负载均衡设备会为用户选择一台合适的缓存服务器提供服务，选择的依据包括：根据用户IP地址，判断哪一台服务器距用户最近；根据用户所请求的URL中携带的内容名称，判断哪一台服务器上有用户所需内容；查询各个服务器当前的负载情况，判断哪一台服务器尚有服务能力。基于以上这些条件的综合分析之后，区域负载均衡设备会向全局负载均衡设备返回一台缓存服务器的IP地址。</li><br>
> <li data-pid="pHzVNgJr">全局负载均衡设备把服务器的IP地址返回给用户。</li><br>
> <li data-pid="H9lyFGfp">用户向缓存服务器发起请求，缓存服务器响应用户请求，将用户所需内容传送到用户终端。如果这台缓存服务器上并没有用户想要的内容，而区域均衡设备依然将它分配给了用户，那么这台服务器就要向它的上一级缓存服务器请求内容，直至追溯到网站的源服务器将内容拉到本地。</li>
> </ol>

[通俗介绍——非常推荐](https://zhuanlan.zhihu.com/p/52362950)
[简要介绍](https://www.zhihu.com/question/491891705)
[较全面介绍——不太好懂](https://zhuanlan.zhihu.com/p/28940451)


