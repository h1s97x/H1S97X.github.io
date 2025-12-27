## 快速清理 Windows 大文件，它比「老牌」更好用：WizTree | App +1



在 Windows 上，[存储感知](https://sspai.com/post/58167) 这个小功能可以自动地、按计划地清除无用的系统缓存文件和应用程序主动声明的缓存文件，[CCleaner](https://sspai.com/item/92) 这类第三方清理工具则可以清理掉更多不同软件留下来的垃圾。

但上述方法一般用于自动化、周期化的自动清理，针对一些一时有用、有意存放的大文件或无意间散落在磁盘里的冗余数据，分析、定位然后根据实际需求决定去留是更加保险的方法。

针对大文件扫描和分析，Windows 上比较老牌的工具有 [SpaceSniffer](https://sspai.com/post/42425)。2017 年 [@Jerry___](https://sspai.com/u/jfo2ptxo) 在他的文章中介绍说：SpaceSniffer 是一款免费便携的绿色软件，整体安装包只有 1.58MB……但到了 2021 年，距离 2016 年 10 月 2 日的最后一次更新已经有四年多的时间了，这样的  SpaceSniffer 放在今天使用，最直观的感受就是**慢、而且不够准确。**

例如，在 Windows 10 支持网盘的「[按需同步](https://sspai.com/post/58566)」功能后，OneDrive 的文件夹采用了 [特殊 NTFS 挂载点](https://sspai.com/link?target=https%3A%2F%2Funix.stackexchange.com%2Fquestions%2F404159%2Faccessing-onedrive-folder-on-windows-partition) 的方法挂载在硬盘上，这就使得 SpaceSniffer 无法扫描到；除此之外，SpaceSniffer 的基本扫描原理其实就是在硬盘内实实在在地检索文件大小，在固态硬盘上的扫描速度尚且可以接受，但如果在有很多小文件的机械硬盘上，搜索速度就肉眼可见地慢了下来。

![img](https://raw.githubusercontent.com/h1s97x/picture/main/Doc/6f93e853d433fc5fe630b4ae270735bf)

相比之下，今天要介绍的 WizTree 则在速度和新特性兼容上好了不少。

WizTree 在自家官网上号称最快的磁盘空间分析工具（The FASTEST Disk Space Analyser），虽然有点不太「广告法」，但实测下来它的快也是可以感知到的：WizTree 使用了与 Everything 相类似的技术，利用 NTFS 分区的特性直接读取 MFT 记录进行分析，达到了「秒排序」的效果。同时它也能够识别通过网络存储（Samba）挂载于 Windows 资源管理器中的驱动器。

具体的速度我录制了一个 GIF 来展示，注意 GIF 停止录制时右边的 SpaceSniffer 并未完成扫描：

![img](https://raw.githubusercontent.com/h1s97x/picture/main/Doc/aa09508bb17a1563ef30ed0ca39144a1.gif)

对于使用 NTFS 新特性的文件夹，WizTree 可以通过「大小」「分配」两个不同的属性来分辨文件是否已经被「释放空间」。这两个概念你可以这样理解：

- 「大小」即文件的大小，在没有使用「按需同步」时，它与文件的占用空间理论上一致
- 「分配」即文件被分配的空间。如果一个文件在 OneDrive 云端存在，但没有被下载到本地，或文件被主动释放空间。这一类情况下文件被「分配」的空间将会是 0

如下图，我的OneDrive 中存放着一些已经被「释放」的系统镜像，它们的大小可以正常显示，「分配」一栏也能正确显示分配（占用）空间为 0.

![img](https://cdn.sspai.com/2021/01/02/article/1aaf27c4326caeb1005f861b83f7b04d?imageView2/2/w/1120/q/90/interlace/1/ignore-error/1)

当然，对于没有明显「捷径」可走的 FAT / exFAT 分区，WizTree 的表现也不错。以下是一个综合的性能测试表格：

|                              | SpaceSniffer | WizTree |
| ---------------------------- | ------------ | ------- |
| 机械，exFAT                  | 11.15s       | 8.02s   |
| 机械，NTFS                   | 24.23s       | 5.24s   |
| 固态，NTFS（NVMe，系统分区） | 76.97s       | 2.53s   |
| 固态，exFAT（Portable）      | 1.75s        | 0.55s   |

除了传统的树形大小比较、自动绘制的文件夹大小图之外，WizTree 还提供了分扩展名占用的空间统计，方便你搞懂这个盘究竟装了些什么，或是找出「影音收藏」在哪个硬盘。

![img](https://raw.githubusercontent.com/h1s97x/picture/main/Doc/2d4d97716086944550afac9a794c8949)

最后还是在这里提醒大家：此类扫描软件可以让你清晰、直观地看到硬盘内的空间占用，但在执行删除操作前，**请确保你知道自己在删除的文件确实没有作用，否则可能会导致系统的崩溃**。

![img](https://cdn.sspai.com/2021/01/02/article/1a9093d1de2f499929c4d7bb7498d7fb?imageView2/2/w/1120/q/90/interlace/1/ignore-error/1)

你可以在官网下载 [WizTree](https://sspai.com/link?target=https%3A%2F%2Fwiztreefree.com%2Fdownload)，个人使用完全免费、自带中文。由于开发商打包时的问题，中文安装界面存在乱码的情况。建议在安装时选择英文的安装界面，安装完后再将语言改成中文。