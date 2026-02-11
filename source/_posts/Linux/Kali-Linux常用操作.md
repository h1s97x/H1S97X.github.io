---
title: Kali Linux常用操作
date: '2025-12-27 23:46:11'
---
### 1、Kali Linux中的文件系统

通过系统界面可以看到一个“file system”，这个就是文件系统，双击点开，会看到如下界面：

右侧就是该文件下的文件系统目录

![img](https://pic4.zhimg.com/v2-55331ca8b332d67f44278abbfef2c337_b.webp?consumer=ZHI_MENG)

重点文件的说明，从上到下，从左到右：

bin：二进制可执行文件的目录

boot：用来存放Linux操作系统的内核和在引导过程中使用的文件

dev：dev是设备（device）的英文缩写，在这个目录中包含Linux操作系统中使用的所有外部设备。

etc：配置文件存放的目录，如人员的用户名/密码文件、各种服务的起始文件等。

home：系统默认的用户home目录，当新增账户时，用户的home目录都存放在该目录下

lib：系统使用函数库的目录，程序在执行过程中，调用的一些额外参数时就需要函数库的协助，后面32或者64是根据不同系统调用来区分的

media：挂载的媒体设备目录，一般讲外部设备挂载到这里，例如插入的U盘

mnt：用于存放挂载存储设备的挂载目录，如磁盘等

opt：该目录用来安装附加软件包，是用户级的程序目录

proc：这是一种特殊的、由软件创建的文件系统，内核使用它向外界导出信息，只存在内存中，而不占用外存空间。

root：root用户的目录

run：是临时文件系统，存储系统启动以来的信息。当系统重启时，这个目录下的文件被删掉或清除

sbin：该目录用于存放root用户使用的可执行命令

srv：服务启动之后需要访问的数据目录

sys：该目录下是系统及内核重要的操作内容

tmp：一般用户或正在执行的程序临时存放文件的目录，任何用户都可以访问，重要数据不可存放在该目录下

usr：应用程序存放的目录，usr/bin用于存放应用程序；usr/share用于存放共享数据；usr/lib用于存放不能直接运行的，却是许多应用程序运行所必需的一些函数库文件。

var：该目录用于存放系统执行过程中经常变化的文件。

### 2、Kali Linux 常用命令

#### 2.1 与文件目录相关的命令（pwd、cd、ls）

•PWD命令是Print Working Directory（打印工作目录）的缩写，其功能是显示当前工作目录。

•cd是Change Directory（更改目录）的缩写，其功能是将活动目录更改为指定的路径。

•ls命令用于显示指定工作目录下之内容（列出当前工作目录所含之文件及子目录)。

•locate命令用于查找符合条件的文件。

•whereis命令也用于查找文件。

•which命令会在环境变量$PATH设置的目录里查找符合条件的文件。 

•mkdir是make directory（创建目录）的缩写，用于创建新的目录。

•cp: 复制文件或目录，语法为“cp 源文件 目标文件”

•rmdir用来删除一个空的目录，rm 命令来删除非空目录。

#### 2.2 文件查看命令（cat、head、tail、nl、grep）

cat命令用来显示文件内容，语法为“cat 目录项”，cat命令可以在屏幕上显示文件，可以合并文件，还可以建立文本文件。

另外head、tail、nl、more和less命令也可以用来浏览文件。

grep 命令用于查找文件里符合条件的字符串。

more 命令类似 cat ，不过会以一页一页的形式显示，更方便使用者逐页阅读，使用者在阅读时可以按空格键（space）来显示下一页，按 b 键来返回（back）一页显示。

less 与 more 类似，但使用 less 可以随意浏览文件，下面是使用less参数显示文件内容之后，使用者可以进行的一些操作。

#### 2.3 网络相关命令（ifconfig、ip addr show等）

Kali Linux 2同时支持net-tools和iproute2，所以可以使用这两种命令来完成对网络的配置和查看。如果要查看设备的网络连接信息，可以使用“ip addr”和“sudo ifconifg”

ip命令中常用的方法有：

•ip addr show：显示网络信息；

•ip route show：显示路由，如果直接用route命令，也可以查看到路由信息

•ip neigh show：显示arp表，地址解析协议，即ARP（Address Resolution Protocol），是根据IP地址获取物理地址的一个TCP/IP协议。

**ifconfig：可以查看整个网络信息，例如IP地址，子网掩码等等**



#### 2.4 进程控制命令（ps）

进程指的是程序正在运行的一个实例。Kali Linux 2中提供了对进程控制的命令。ps命令用于显示当前进程 (process) 的状态ps 的参数非常多, 在此仅列出几个常用的参数并介绍含义。

 -A 列出所有的进程

 -w 显示加宽可以显示较多的信息

 -au 显示较详细的信息

 -aux 显示所有（包含其他使用者）的进程

#### 2.5 Kali中的服务管理（service）

在Linux术语中，服务指的是在运行在后台等待使用的应用程序。Service命令用于对系统服务进行管理，比如启动（start）、停止（stop）、重启（restart）、查看状态（status）等。在Kali linux2中预装了很多服务。在Kali Linux中的有些服务可以通过GUI停止和启动，就像在Windows或Mac里一样。但是，也有些服务需要使用命令行管理。我们在这里介绍管理基本服务的语法：

service servicename start|stop|restart

#### 2.6 Kali中的shell脚本

Shell脚本与Windows/Dos下的批处理相似，也就是用各类命令预先放入到一个文件中，方便一次性执行的一个程序文件，主要是方便进行设置或者管理用的。Shell 脚本的编写跟 JavaScript、php 编程一样，只要有一个能编写代码的文本编辑器和一个能解释执行的脚本解释器就可以了。

那么打开一个编辑器，输入以下内容。

```
\#! /bin/bash

echo "Hello, Kali!"
```

将该文件保存为HelloKali，不需要后缀名。

当前我们还不能执行这个脚本，这是因为该脚本的权限导致的。这里可以使用ls -l命令来查看这个文件的权限。当前这个文件只有w和r权限，是不能执行的，这里需要为它添加一个可执行的权限。

chmod 755 HelloKali

再次使用ls -l查看，可以看到它具有了可执行权限。

kali > ./HelloKali

这里的./ 可以理解为在当前目录下查找文件。

按下回车可以看到屏幕上输出：

Hello, Kali!

这表明当前程序已经成功执行。



Nmap脚本：找出子网 192.168.1.0/24 内所有开放了445端口的主机

```
\#! /bin/bash

nmap -sT 192.168.1.0/24 -p 445 >/dev/null -oG EternalBluescan
cat EternalBluescan | grep open > EternalBluescan2
cat EternalBluescan2
```

将该文件保存为EternalBluescanner.sh，然后执行：

```
kali > ./EternalBluescanner.sh
```

### Linux命令：查看服务器IP地址

1.查看当前登录的服务器的ip地址：

```bash
# 主机的 ip
hostname -i

hostname -I
```

2.ifconfig

```bash
# 显示当前系统中所有网络接口的配置信息，包括IP地址、子网掩码和网关等。
ifconfig
```

3.ip addr

```
# 列出当前系统中所有网络接口的详细信息，包括IP地址、子网掩码和网关等。
ip addr

ip a
# 或者
ip a | more

```

4.nmcli命令

```
# 显示网络管理器中所有网络设备的信息，包括IP地址、子网掩码和网关等
nmcli device show
```

