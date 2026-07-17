---
title: 玩转kali
date: "2025-12-27 23:46:11"
updated: 2026-07-17 00:08:29
categories:
  - 生活
---

[TOC]

## 参考资料

### 参考书

| 图书名称:     | Kali Linux: Assuring Security by Penetration Testing                             |     |
| ------------- | -------------------------------------------------------------------------------- | --- |
| 封面图片:     | ![封面](https://jobrest.gitbooks.io/kali-linux-cn/content/assets/feng_mian.jpeg) |     |
| 出版印刷时间: | 2015-2                                                                           |     |
| 出版社:       | 人民邮电出版社                                                                   |     |
| 图书作者:     | Lee Allen / Tedi Heriyanto / Shakeel Ali 著                                      |     |
| 译者          | Archer 译                                                                        |     |
| ISBN:         | 9787115378446                                                                    |     |

| 图书名称:     | Kali Linux2 网络渗透测试实践指南 第 2 版                                                                 |     |
| ------------- | -------------------------------------------------------------------------------------------------------- | --- |
| 封面图片:     | ![Kali Linux2 网络渗透测试实践指南 第2版](https://img1.doubanio.com/view/subject/s/public/s34261078.jpg) |     |
| 出版印刷时间: | 2021-3                                                                                                   |     |
| 出版社:       | 人民邮电出版社                                                                                           |     |
| 图书作者:     | 李华峰 著                                                                                                |     |
| ISBN:         | 9787115555410                                                                                            |     |

### 友链

书籍在线阅读地址：[Kali Linux 渗透测试的艺术（中文版） | Kali Linux 渗透测试的艺术（中文版） (gitbooks.io)](https://jobrest.gitbooks.io/kali-linux-cn/content/index.html)

官网：[Kali Linux 操作系统 |渗透测试和道德黑客 Linux 发行版](https://www.kali.org/)

文档：[Kali Docs | Kali Linux Documentation](https://www.kali.org/docs/)

## 前言

### 何为玩转 kali？

当然是想随心所欲，让“所见即所得”，让“所想立即实现”，那么此篇就是完成这个任务。

## 第 1 章 Kali Linux 入门

### 1.1 Kali 的发展简史

Kali Linux（Kali）是专门用于渗透测试的 Linux 操作系统，它由 BackTrack 发展而来。在整合了 IWHAX、WHOPPIX 和 Auditor 这 3 种渗透测试专用 Live Linux 之后，BackTrack 正式改名为 Kali Linux。

BackTrack 是相当著名的 Linux 发行版本。在 BackTrack 发布 4.0 预览版的时候，它的下载次数已经超过了 400 万次。

Kali Linux 1.0 版于 2013 年 3 月 12 日问世。在 5 天之后，官方为修复 USB 键盘的支持问题而发布了 1.0.1 版。在这短短的 5 天之内，Kali 的下载次数就超过了 9 万次。

根据官网的介绍（http://docs.kali.org/introduction/what-is-kali-linux）， Kali 的主要特色有：

● 它是基于 Debian 的 Linux 发行版；

● 它集成 300 多个渗透测试程序；

● 它支持绝大多数的无线网卡；

● 它修改了内核以支持（无线）数据包注入；

● 所有的软件包都有研发团队的 PGP 签名；

● 用户可以自制满足各自需求的 Kali Linux 发行版；

● 支持基于 ARM 的硬件系统。

### 1.2 Kali Linux 工具包

Kali Linux 含有可用于渗透测试的各种工具。这些工具程序大体可以分为以下几类。

● 信息收集：这类工具可用来收集目标的 DNS、IDS/IPS、网络扫描、操作系统、路由、SSL、SMB、VPN、VoIP、SNMP 信息和 E-mail 地址。

● 漏洞评估：这类工具都可以扫描目标系统上的漏洞。部分工具可以检测 Cisco 网络系统缺陷，有些还可以评估各种数据库系统的安全问题。很多模糊测试软件都属于漏洞评估工具。

● Web 应用：即与 Web 应用有关的工具。它包括 CMS（内容管理系统）扫描器、数据库漏洞利用程序、Web 应用模糊测试、Web 应用代理、Web 爬虫及 Web 漏洞扫描器。

● 密码攻击：无论是在线攻击还是离线破解，只要是能够实施密码攻击的工具都属于密码攻击类工具。

● 漏洞利用：这类工具可以利用在目标系统中发现的漏洞。攻击网络、Web 和数据库漏洞的软件，都属于漏洞利用（exploitation）工具。Kali 中的某些软件可以针对漏洞情况进行社会工程学攻击。

● 网络监听：这类工具用于监听网络和 Web 流量。网络监听需要进行网络欺骗，所以 Ettercap 和 Yersinia 这类软件也归于这类软件。

● 访问维护：这类工具帮助渗透人员维持他们对目标主机的访问权。某些情况下，渗透人员必须先获取主机的最高权限才能安装这类软件。这类软件包括用于在 Web 应用和操作系统安装后门的程序，以及隧道类工具。

● 报告工具：如果您需要撰写渗透测试的报告文件，您应该用得上这些软件。

● 系统服务：这是渗透人员在渗透测试时可能用到的常见服务类软件，它包括 Apache 服务、MySQL 服务、SSH 服务和 Metasploit 服务。

为了降低渗透测试人员筛选工具的难度，Kali Linux 单独划分了一类软件——Top 10 Security Tools，即 10 大首选安全工具。这 10 大工具分别是 aircrack-ng、burp-suite、hydra、john、maltego、metasploit、nmap、sqlmap、wireshark 和 zaproxy。

除了可用于渗透测试的各种工具以外，Kali Linux 还整合了以下几类工具。

● 无线攻击：可攻击蓝牙、RFID/NFC 和其他无线设备的工具。

● 逆向工程：可用于调试程序或反汇编的工具。

● 压力测试：用于各类压力测试的工具集。它们可测试网络、无线、Web 和 VoIP 系统的负载能力。

● 硬件破解：用于调试 Android 和 Arduino 程序的工具。

● 法证调查：即电子取证的工具。它的各种工具可以用于制作硬盘磁盘镜像、文件分析、硬盘镜像分析。如需使用这类程序，首先要在启动菜单里选择 Kali Linux Forensics | No Drives or Swap Mount。在开启这个选项以后，Kali Linux 不会自动加载硬盘驱动器，以保护硬盘数据的完整性。

### 1.3 下载 Kali Linux

下载是第一步要做的事情，经常使用计算机的人对下载肯定不陌生，但要想面向大众还是要解释清楚。

- [x] 待补充

- [x] 验证哈希值

##### 在虚拟机里使用 VM 镜像安装 Kali Linux

Kali Linux 的 iso 镜像和虚拟机 vmx 文件等在 Kali 官网都有，直接下载就可以，而且下载速度也不赖。

这里我推荐直接下载 Kali 官方的虚拟机 vmx 文件，下载好了直接打开就能用，免去了很多配置环节。之前也尝试过用 iso 镜像做 VMware，但试了几次遇到很多麻烦，因此就不搞了。

> 使用硬盘镜像方式安装 Kali Linux 之后，系统的默认设置值如下所示。
>
> ● 硬盘容量：30 GB。
>
> ● 联网方式：NAT。
>
> ● 用户名：root。
>
> ● 密码：toor。
>
> 如果要把 Kali 当做渗透测试平台使用，应当避免以 NAT 方式接入网络。本文推荐您以桥接（bridged）方式联网。
>
> 在配置 Kali VM 的时候，应当尽快更改默认密码。

#### portable Kali Linux

- [x] 未实操，待修改

安装 Kali Linux 的第三种方法，就是把它安装到 USB 闪存里。通常，人们把安装在闪存上的 Kali Linux 叫做 portable（便携）Kali Linux。按照 Kali 官方文件的说法，这种安装方式的启动和安装速度最快，是 Kali 研发人员最喜欢的安装方式。相比在硬盘上安装，只能在一台机器上启动 Kali 系统而言，装有 Kali Linux 的闪存盘可以在所有支持 USB 启动的主机上使用 Kali 系统。

这种安装方法同样适合在内存卡（SSD、SDHC、SDXC 等）上安装 Kali Linux。

很多工具都可以制作 portable Kali Linux。其中，Rufus（http://rufus.akeo.ie）就不错。这个工具只能在Windows操作系统下运行。

其他可从 ISO 镜像文件制作可启动 USB 的工具如下所示：

● Win32DiskImager（https://launchpad.net/win32-image-writer）；

● Universal USB Installer（http://www.pendrivelinux.com/universal-usbinstaller-easy-as-1-2-3/）；

● Linux Live USB Creator（http://www.linuxliveusb.com)

在制作 portable Kali Linux 之前，您需要准备好几样素材。

● Kali Linux 的 ISO 镜像文件：虽然您可以使用启动磁盘创建工具直接下载镜像文件，但是我们仍然认为提前下载好 ISO 镜像文件，再用 Rufus 使用镜像文件比较稳妥。

● USB 闪存盘：您需要一个容量足够大的 USB 闪存盘。我们推荐您使用 16GB 以上的闪存盘。

在下载 Rufus 之后，在 Windows 里双击 rufus.exe 文件就可以运行它。它会显示出程序界面。

如果您使用的是基于 UNIX 的操作系统，您可以直接使用 dd 指令创建可启动闪存盘。例如：

dd if=kali-linux-1.0.1-i386.iso of=/dev/sdb bs=512k

此处的/dev/sdb 应当是您 USB 闪存盘的设备名称。

使用 Rufus 创建可启动的 Kali USB 闪存盘的设置如下。

● Device：选择 USB 闪存驱动器。本例中，它是 Windows 系统的 E 盘。

● Partition scheme and target system type：设置为 MBR partition scheme for BIOS or UEFI computers。

● Create a bootable disk using：设置为 ISO Image 并使用右侧磁盘图标选取 ISO 镜像文件。

然后点击 Start 创建可启动闪存盘。

在完成这些步骤之后，如果您想要立即测试 USB 闪存盘，则应在保存好所有文件的情况下重启计算机。您可能需要配置计算机的 BIOS，使其从 USB 磁盘启动计算机。如果没有问题的话，您应该可以通过 USB 闪存盘启动 Kali Linux 系统。

在 USB 闪存盘上安装系统之后，如果您想要让系统能够保存您所更改的文件（即 persistence capabilities），您可参照 Kali 官方文档进行设置。请参见 Adding Persistence to Your Kali Live USB，地址为http://docs.kali.org/installation/kali-linux-live-usb-install

### 1.4 虚拟机配置

#### 1.4.1 设置中文

刚下好 kali linux，就被全英文劝退可不太好。一看到密密麻麻的英文就敲起了退堂鼓，所以首先把系统语言设置成中文。

Learn more：[Kali Linux 系统设置中文语言环境-1_kali 中文设置-CSDN 博客](https://blog.csdn.net/KNIGH_YUN/article/details/105543094)

具体步骤：

```
sudo dpkg-reconfigure locales
```

选择语言，使用空格键选中。选择 en_US.UTF-8、zh_CN.GBK、zh_CN.UTF-8

![img](https://img-blog.csdnimg.cn/4346e90fd26c4a17835bcd4d3ddc6474.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5riFNzc=,size_20,color_FFFFFF,t_70,g_se,x_16)

选中 zh_CN.UTF-8 为默认语言。

![img](https://img-blog.csdnimg.cn/8fc88465e1ee4af9b87e0f029e8c2859.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5riFNzc=,size_20,color_FFFFFF,t_70,g_se,x_16)

```
sudo apt-get install ttf-wqy-microhei ttf-wqy-zenhei xfonts-wqy
```

下载字体

重启虚拟机。

![设置中文界面](D:/hexo/source/_posts/img/Network-attack/kali-settings-zh_en.png)

当然，以上方法并非唯一方法，如果安装了图形界面也可以直接在设置里修改语言（X-windows），或者通过 CLI 修改系统配置文件。

#### 1.4.2 网络设置

1．配置有线网络

无论是通过 VMware 磁盘镜像还是通过 ISO 镜像安装 Kali Linux，默认情况下 Kali Linux 接入网络的方式都是 NAT（网络地址转换）。在 NAT 方式下，Kali Linux 的虚拟机可以通过物理主机联入外部网络，而外部网络甚至是物理主机自身都无法直接访问安装有 Kali Linux 的虚拟机。

进行实地的渗透测试时，您可能需要把网络结构变更为 Bridged Adapter。

如需使用桥接连接，首先要使物理主机与网络设备连接，例如路由器或交换机。同时，接入的网络里应当有 DHCP 服务，以分配 IP 地址给虚拟机。

您可能已经注意到了，通过 DHCP 获取的 IP 地址并不是固定的 IP 地址，这种 IP 地址在一定时间后可能会发生变化。如果 Kali Linux 通过 DHCP 获取 IP 地址，在超过固定周期（DHCP 的租赁时间）之后，DHCP 会重新给虚拟机分配一次 IP 地址。重新分配的 IP 地址可能和上次分配的 IP 地址相同，也可能不同。

如果虚拟机需要使用固定的 IP 地址，应该修改虚拟机的网络设置文件/etc/network/interfaces。

默认情况下，Kali Linux 的网络设置文件如下。

```
auto lo

iface lo inet loopback
```

这个配置文件指定所有网卡都通过 DHCP 获取 IP 地址。如需为虚拟机绑定固定 IP 地址，就不得不对这个文件进行相应修改。

```
auto eth0

iface eth0 inet static

address 10.0.2.15

netmask 255.255.255.0

network 10.0.2.0

broadcast 10.0.2.255

gateway 10.0.2.2
```

上述文件令第一个有线网卡 eth0 绑定了 IP 地址 10.0.2.15。您可能需要根据实际情况修改上述设置。

![](D:/hexo/source/_posts/img/Network-attack/kali-查看网络配置.png)

手动设置网络：

![](D:/hexo/source/_posts/img/Network-attack/kali-网络配置.png)

error：

配置了域名服务器后导致 ping 其他网站都无法解析域名。

#### 1.5.3 文件夹共享

#### 1.5.4 快照备份

一旦您把虚拟机配置到理想的可工作状态，我们建议您立刻对虚拟机进行快照备份。万一日后出现配置故障，可利用快照备份把虚拟机迅速恢复到正常工作状态。

#### 1.5.5 导出虚拟机

人们时常需要以文件形式备份虚拟机，或通过这种方法把虚拟机分享给他人使用。VirtualBox 的虚拟机导出功能简化了这种操作。在关闭需要导出的虚拟机之后，在菜单栏选中 File | Export Appliance 就可导出所选的虚拟机。

### 1.5 系统更新

Kali Linux 由操作系统内核和数百个软件构成。如果需要使用软件的最新功能，您就需要将其更新到最新的版本。

我们建议您仅从 Kali Linux 官方的软件仓库（repository）进行更新。

在您安装和配置好 Kali Linux 之后，就应当立即进行系统更新。因为 Kali 是基于 Debian 的操作系统，您需要使用 Debian 的指令（apt-get）进行系统更新。

更新指令 apt-get 会查询/etc/apt/sources.list 文件，从中获取更新服务器的信息。您需要确定这个文件指定了正确的升级服务器。

默认情况下，Kali Linux 的 sources.list 文件包含下述信息。

#### 其他：apt 更换国内源

Kali Linux 会从系统默认的软件源去安装软件，但默认的软件源速度通常比较慢（国外的源），因此需要将其替换成国内的源。

以下是常用的国内源网站：

[阿里云镜像开源镜像站（已经更换地址）](https://opsx.alibaba.com/mirror?lang=zh-CN)
[阿里云镜像开源社区镜像站（新地址）](https://developer.aliyun.com/mirror/)
[网易开源镜像站](http://mirrors.163.com/.help/ubuntu.html)
[清华大学开源镜像站](https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/)
[中科大开源镜像站](https://mirrors.ustc.edu.cn/)

修改方式：apt 源的文件位置：/etc/apt/sources.list

> 注意：是/etc/apt/sources.list，不是/etc/apt/source.list（非常重要）

```
sudo cp /etc/apt/sources.list /etc/apt/sources.bak1
#第一个参数时拷贝的文件路径和文件名称,第二个是拷贝到(粘贴)的文件路径和文件名

sudo mousepad /etc/apt/sources.list
#用mousepad可以直接从系统粘贴板粘贴，比vim和vi更方便操作

# 官方源
# deb http://http.kali.org/kali kali-rolling main non-free contrib
# deb-src http://http.kali.org/kali kali-rolling main non-free contrib
#根据需要自己选一个，中科大的还可以
#中科大
deb http://mirrors.ustc.edu.cn/kali kali-rolling main non-free contrib
deb-src http://mirrors.ustc.edu.cn/kali kali-rolling main non-free contrib
#阿里云
#deb http://mirrors.aliyun.com/kali kali-rolling main non-free contrib
#deb-src http://mirrors.aliyun.com/kali kali-rolling main non-free contrib
#清华大学
#deb http://mirrors.tuna.tsinghua.edu.cn/kali kali-rolling main contrib non-free
#deb-src https://mirrors.tuna.tsinghua.edu.cn/kali kali-rolling main contrib non-free
#浙大
#deb http://mirrors.zju.edu.cn/kali kali-rolling main contrib non-free
#deb-src http://mirrors.zju.edu.cn/kali kali-rolling main contrib non-free
#东软大学
#deb http://mirrors.neusoft.edu.cn/kali kali-rolling/main non-free contrib
#deb-src http://mirrors.neusoft.edu.cn/kali kali-rolling/main non-free contrib
#重庆大学
#deb http://http.kali.org/kali kali-rolling main non-free contrib
#deb-src http://http.kali.org/kali kali-rolling main non-free contrib
```

> 注：vim 和 vi 的操作习惯很"程序员风格"，不熟悉的情况下很难使用，以下是一个 vim 操作的视频
>
> [VIM 快速入门之常用命令解析 1,VIM 复制，粘贴，剪切，替换，查找\_哔哩哔哩\_bilibili](https://www.bilibili.com/video/BV1YY4y1n75r/?vd_source=206a091077ff783d662b49e64cc9589d)

一个小插曲：我之前的 Kali 虚拟机就是因为 vim 操作不当修改了 root 文件，加上安装了很多包之后经常卡顿死机，所以重新装了一个新的，实在是血的教训。

更新完之后：

```
apt-get update 更新索引

apt-get upgrade 更新软件

apt-get dist-upgrade 升级

apt-get clean 删除缓存包

apt-get autoclean 删除未安装的deb包
```

error:

![](D:/hexo/source/_posts/img/Network-attack/apt-无法解析域名.png)

目前网络配置有问题，解决后再写 xia'wen
