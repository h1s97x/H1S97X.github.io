---
title: Alist本地部署
date: 2023-09-12 21:38:55
updated: 2023-09-12 21:38:55
categories:
  - 技术
---


### 目录
1.<a href="#Alist手动下载">Alist下载</a>
2.<a href="#添加存储"></a>添加存储

### Alist手动下载
**[【Alist】Alist V3 "全新版本" 使用 安装/启动 教程！](https://www.bilibili.com/video/BV1BP411G7q9/?spm_id_from=333.788&vd_source=206a091077ff783d662b49e64cc9589d)**
[官网下载地址](https://github.com/alist-org/alist/releases)
当你看到 `start server@0.0.0.0:5244` 的输出，之后没有报错，说明操作成功。 第一次运行时会输出初始密码。程序默认监听 5244 端口。现在打开`http://ip:5244` 可以看到登录页面
``` windows scoop
# 安装
scoop install alist
# 运行
alist server
```
**安装SCOOP**

[勺子安装程序/安装：📥下一代勺子（取消）安装程序 (github.com)](https://github.com/ScoopInstaller/Install)

[#Scoop windows下的包管理器-CSDN博客](https://blog.csdn.net/qq_40302536/article/details/116097541)

[scoop: 国内镜像版 (gitee.com)](https://gitee.com/squallliu/scoop)

[搭建 Windows 统一开发环境（Scoop） - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/128955118)

``` powershell
# 通过设置环境变量来配置自定义目录
$env:SCOOP="D:\Program Files (x86)\Scoop"
[Environment]::SetEnvironmentVariable('SCOOP', $env:SCOOP, 'User')
$env:SCOOP_GLOBAL='D:\Program Files (x86)\Scoop\GlobalScoopApps'
[Environment]::SetEnvironmentVariable('SCOOP_GLOBAL', $env:SCOOP_GLOBAL, 'Machine')
# -RunAsAdmin 以管理员身份运行 （不用管理员下载的话每次都连不上网页）
iex "& {$(irm get.scoop.sh)} -RunAsAdmin"

iwr -useb https://gitee.com/glsnames/scoop-installer/raw/master/bin/install.ps1 | iex
```



**守护进程**
用 .VBS 脚本启动和停止，分别创建两个脚本 分别是 启动.vbs 和 停止.vbs
``` start.vbs
Dim ws
Set ws = Wscript.CreateObject("Wscript.Shell")
ws.run "alist.exe server",vbhide
Wscript.quit

```
``` stop.vbs
Dim ws
Set ws = Wscript.CreateObject("Wscript.Shell")
ws.run "taskkill /f /im alist.exe",0
Wscript.quitx

```

### 添加存储
#### 挂载路径
唯一标识，即要挂载到的位置，如果要挂载到根目录，就是 `/`
#### 启用签名
对文件进行签名加密(不会需要密码)，仅对本驱动生效，如果别的没启用签名也没设置签名全部和元信息加密其他的不会进行签名

使用场景：不想开启全部签名，也不想设置元信息加密，只想对某驱动进行签名加密防止被扫

影响范围：设置-->全局-->签名所有 > 元信息目录加密 > 单驱动签名


### Alist美化
**[【Alist】Alist v3 美化教程（1）- bilibili ](https://www.bilibili.com/video/BV1Wg41187Bf/?spm_id_from=333.788&vd_source=206a091077ff783d662b49e64cc9589d)**
[AList V3前端UI自定义美化教程](https://blog.imoeq.com/alist-v3-ui-modify/)
[萌站](https://www.moepan.cf/?page=1)
[萌国ICP备案申请](https://icp.gov.moe/join.php)
<!-- <a href="https://icp.gov.moe/?keyword=20232014" target="_blank">萌ICP备20232014号</a> -->

[LeanCloud - 评论区](https://console.leancloud.cn/apps/NL7uAvKyvA7yraOpwgN9irQf-gzGzoHsz/)

```
<style>
<!-- 右上菜单按钮改透明(不分亮色或暗色背景) -->
.hope-c-ivMHWx-hZistB-cv.hope-icon-button{background-color: rgba(255, 255, 255,0.3) !important;}
<!-- 侧边选单改透明后(不分亮色或暗色背景) -->
.hope-c-PJLV-ijgzmFG-css{background-color: rgba(255, 255, 255, 0.5)!important;}
<!-- 使用背景图(亮色背景) -->
.hope-ui-light{background-image: url("https://s2.loli.net/2023/03/01/dYQMrXeK8GVihP3.jpg")!important;background-repeat:no-repeat;background-size:cover;background-attachment:fixed;background-position-x:center;}
<!-- 使用背景图(暗色背景) -->
.hope-ui-dark {background-image: url("https://s2.loli.net/2023/03/01/dYQMrXeK8GVihP3.jpg") !important;background-repeat:no-repeat;background-size:cover;background-attachment:fixed;background-position-x:center;}
<!-- 透明(非毛玻璃)(亮色背景) -->
.hope-ui-light .hope-c-PJLV-ikEIIxw-css{background:rgba(255,255,255,0.2)!important;backdrop-filter:blur(10px)!important;}
.obj-box.hope-stack.hope-c-dhzjXW.hope-c-PJLV.hope-c-PJLV-igScBhH-css{background-color: rgba(255, 255, 255, 0.5) !important;}
.hope-c-PJLV.hope-c-PJLV-ikSuVsl-css{background-color: rgba(255, 255, 255, 0.5)!important;}
.hope-ui-light pre{background-color: rgba(255, 255, 255, 0.1)!important;}
<!-- 透明(非毛玻璃)(暗色背景) -->
.hope-ui-dark .hope-c-PJLV-ikEIIxw-css{background: rgb(0 0 0 / 10%) !important;}
.obj-box.hope-stack.hope-c-dhzjXW.hope-c-PJLV.hope-c-PJLV-iigjoxS-css{background-color:rgb(0 0 0 / 50%) !important;}
.hope-c-PJLV.hope-c-PJLV-iiuDLME-css{background-color:rgb(0 0 0 / 50%) !important;}
.hope-ui-dark pre{background-color: rgb(0 0 0 / 10%) !important;}
</style>
```
### Alist设置
#### 搜索/索引
[搜索/索引 - alist文档](https://alist.nn.ci/zh/guide/advanced/search.html)
##### 如何使用
按照以下步骤开启搜索:
转到索引页，选择一个搜索索引，并单击保存;
保存索引后，单击构建索引来构建索引;
现在你可以通过点击页面右上角的搜索块或使用快捷键Ctrl + K来搜索文件
##### 忽略路径
构建索引期间跳过填写的路径，一行一个路径，可多行填写

#### 用户
##### 忘记密码怎么办？
如果您是站点的所有者，您可以通过在终端中运行 ./alist admin 来获取管理员账号信息。
否则，您可以要求站点所有者重置密码。

3.25.0以上版本将密码改成加密方式存储的hash值，无法直接反算出密码，如果忘记了密码只能通过重新 `随机生成` 或者 `手动设置`
```
# 随机生成一个密码
./alist admin random
# 手动设置一个密码,`NEW_PASSWORD`是指你需要设置的密码
./alist admin set NEW_PASSWORD

```

### Aria2 离线下载
[Aria2 安装和使用全教程](https://blog.csdn.net/qq_55058006/article/details/115570993)
[抛弃迅雷，Aria2 新手入门](https://zhuanlan.zhihu.com/p/37021947)

### Alist部署到服务器

### 反向代理

## nginx

[教你快速使用nginx部署网站 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/94151597)

[Nginx详解（一文带你搞懂Nginx）-CSDN博客](https://blog.csdn.net/hyfsbxg/article/details/122322125)

在网站配置文件的 server 字段中添加

```conf
location / {
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
  proxy_set_header Host $http_host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header Range $http_range;
	proxy_set_header If-Range $http_if_range;
  proxy_redirect off;
  proxy_pass http://127.0.0.1:5244;
  # the max size of file to upload
  client_max_body_size 20000m;
}
```

最后重载Nginx配置

```
ngingx -s reload
```

最新进展 2023.10.05 
失败，以下是报错内容

[nginx worker_connections are not enough - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/603165779)

设置后仍未解决，应该是其他问题

#### 内网穿透

什么是内网穿透？
众所周知，得益于 NAT（Network Address Translator 网络地址转换）技术的存在，使得全球互联网可连接的计算机数能够远远超过 43 亿台。其原理就是在本地网络中使用私有地址（内网 IP），在连接互联网时使转而使用全局 IP 地址（公网 IP），这样，多个计算机就可以共用一个 IP 地址，从而达到减缓 IPV4 地址损耗的目的。

大伙可以打开命令行输入 `ifconfig | grep inet` 找到自己的内网 IP 地址，你的 IP 一定是在 192.168.0.0～192.168.255.255 这个区间里面，这是因为 TCP/IP 协议专门设定了内网 IP 地址的范围：

A 类 - 10.0.0.0/8：10.0.0.0～10.255.255.255
B 类 - 172.16.0.0/12：172.16.0.0～172.31.255.255
C 类 - 192.168.0.0/16：192.168.0.0～192.168.255.255
仅靠这个内网 IP 地址是无法上网的，需要通过 NAT 路由器转成公网 IP 才行，可以通过 `curl cip.cc` 来查看自己电脑的出口公网 IP 地址。

回忆一下，当我们在本地进行开发的时候，是不是都是通过 127.0.0.1:端口号 来访问服务的？其实也可以通过 内网 IP:端口号 进行访问，当然别人是没法通过这个地址正常访问的。

那这时候可能有小伙伴要问了，NAT 路由器不是会将内网 IP 转成公网 IP 吗？直接通过个 公网 IP:端口号 难道不能访问这个本地服务吗？

很遗憾，不能。

使用 NAT 绑定的公网 IP 直接进行访问，就意味着所有请求的 IP 报文中的目的 IP 地址都是这个公网 IP，那么 NAT 路由器无法区分这个请求到底要转发到内网的哪一台机器，这会导致端口冲突问题。

因此，如果这个时候你想要把这个服务开放给互联网上的其他人进行访问，你有两种方案：

- 将该服务部署到云服务器
- 内网穿透，将当前的内网 IP 和一个可访问的公网 IP 建立联系，使得别人可以通过公网 IP 访问你的本地主机
本地服务开放给公网访问这个需求在做微信开发的时候还是非常常见的，因为微信的各种回调函数都要求是公网可以访问的地址，总不能每在本地改一次代码就部署一次云服务器吧，不说费时间了，调试起来也很麻烦，所以内网穿透还是非常必要的。

说了这么多，总结下什么是内网穿透？

一般情况下，私有网络中的计算机无法被公网访问，因为它们的 IP 地址是内网 IP，不能直接被公网访问。内网穿透技术通过将公网上的请求转发到内网中的计算机上，从而实现了内网计算机与外网之间的数据通信。内网穿透技术主要应用于需要远程控制、远程访问、文件共享等场景，以便在安全性、便捷性和实用性方面取得平衡。

内网穿透实现方案
实现内网穿透的方法有很多，下面介绍四种常见的实现：

端口映射（Port forwarding）
反向代理（Reverse proxy）
VPN（Virtual Private Network，虚拟专用网络）
NAT 穿透（NAT Traversal）
[五种永久免费 内网穿透傻瓜式使用 - z-7 - 博客园 (cnblogs.com)](https://www.cnblogs.com/liyangit-bky/articles/13993007.html)

Cloudflare使用：
[Get started with Cloudflare · Cloudflare Docs](https://developers.cloudflare.com/learning-paths/get-started/#live_website)

[cloudflare tunnel 详细介绍 —— 面向cloudflare的网站搭建,1分钟快速启动一个有ssl证书的wordpress博客 - 私は萌いQ(˘•ω•˘) (imoeq.com)](https://blog.imoeq.com/cloudflare-argo-tunnel/)

[用 Cloudflare Tunnel 进行内网穿透 | Re:Linked (outv.im)](https://blog.outv.im/2021/cloudflared-tunnel/)


**Cloudflare 添加域名的常见问题**
1、域名记录怎么填？

我们一般设置两条分别指向服务器 IP 地址的 A 记录即可，示例如下：

第一条：Name：@，IPv4 address：服务器 IP
第二条：Name：www，IPv4 address：服务器 IP
这样就把 example.com 和 www.example.com 两个域名都指向服务器了，待解析生效后就可以在网络上访问到了。

更详细的内容可以参考《Namesilo DNS 域名解析教程和常见问题解决方法汇总》。

2、如何修改域名服务器？

域名服务器需要在购买域名的商家的管理后台修改，由于不同商家的后台界面不同，没法统一说明。

一般可以看下 DNS 设置、Change Nameservers 之类的选项里有没有。

以 Namesilo 为例，可以参考《Namesilo 域名购买及使用教程》里的第四步 “设置 DNS 服务器” 部分。

3、修改域名服务器后，Cloudflare 检测不到

DNS 生效需要一定时间，确认自己修改无误后，耐心等待一段时间，再点击 “重新检测”。

4、如何查看自己的域名服务器？

我们可以自己查询下域名服务器，以确定是否设置生效。CMD 运行 nslookup -qt=ns 域名 -> 回车，nameserver 后面的就是域名服务器地址。

5、开启 Cloudflare CDN 后网站访问速度反而变慢了？

Cloudflare 的 CDN 节点大多在国外（免费版），国内用户访问速度不稳定，国外访问速度很快。

比较适合主要面向国外访客的网站（如外贸站点等）；或者不在意速度，想节省源站资源的情况；或者主要想使用它的保护功能的用户。

```
.\cloudflared.exe login
.\cloudflared tunnel create h1s97x
.\cloudflared tunnel token h1s97x
.\cloudflared tunnel --no-autoupdate run --token eyJhIjoiYWNiYzYxYjNmMTY1ZmYwOTc2NDFlYTg4Nzk5YzllYjEiLCJzIjoieUtnZG5IUEJSc1RkVHNWTFBmaWJ3Sy9pakVlZ2dRTkNCTThuODFHcXpQOD0iLCJ0IjoiNGJlMTgyNmYtYzU4Yi00MTg0LTliNmQtMTc4OWQwMzk1NzE1In0= --url http://127.0.0.1:5200
```
最新进展 2023.10.05 
失败，以下是报错内容
```
2023-10-05T08:23:57Z INF Starting tunnel tunnelID=4be1826f-c58b-4184-9b6d-1789d0395715
2023-10-05T08:23:57Z INF Version 2023.8.2
2023-10-05T08:23:57Z INF GOOS: windows, GOVersion: go1.20.6, GoArch: amd64
2023-10-05T08:23:57Z INF Settings: map[no-autoupdate:true token:***** url:http://127.0.0.1:5200]
2023-10-05T08:23:57Z INF cloudflared will not automatically update on Windows systems.
2023-10-05T08:23:57Z INF Generated Connector ID: cceee48e-8705-4429-a886-7170dc75b683
2023-10-05T08:23:57Z INF Initial protocol quic
2023-10-05T08:23:57Z INF ICMP proxy will use 10.27.214.21 as source for IPv4
2023-10-05T08:23:58Z INF ICMP proxy will use 2001:da8:7001:2000::7a8b in zone WLAN as source for IPv6
2023-10-05T08:23:58Z INF cloudflared does not support loading the system root certificate pool on Windows. Please use --origin-ca-pool <PATH> to specify the path to the certificate pool
2023-10-05T08:23:58Z INF Starting metrics server on 127.0.0.1:53456/metrics
2023-10-05T08:24:03Z INF

===================================================================================
You are hitting an error while using the experimental post-quantum tunnels feature.

Please check:

   https://pqtunnels.cloudflareresearch.com

for known problems.
===================================================================================


2023-10-05T08:24:03Z ERR Failed to create new quic connection error="failed to dial to edge with quic: timeout: no recent network activity" connIndex=0 event=0 ip=198.41.200.73
2023-10-05T08:24:03Z INF Retrying connection in up to 2s connIndex=0 event=0 ip=198.41.200.73
2023-10-05T08:24:09Z ERR Failed to create new quic connection error="failed to dial to edge with quic: timeout: no recent network activity" connIndex=0 event=0 ip=198.41.192.77
2023-10-05T08:24:09Z INF Retrying connection in up to 4s connIndex=0 event=0 ip=198.41.192.77
```

##### sunny-ngrok

[Sunny-Ngrok内网穿透服务](https://www.ngrok.cc/user.html)

[五分钟免费获得自己的永久域名，免费！永久！-腾讯云开发者社区-腾讯云 (tencent.com)](https://cloud.tencent.com/developer/article/2073189)