### 前言

宝塔面板作为简单好用的[服务器](https://cloud.tencent.com/act/pro/promotion-cvm?from_column=20065&from=20065)运维管理面板，它支持Linux/Windows系统，我们可用它来一键配置LAMP/LNMP环境、网站、[数据库](https://cloud.tencent.com/solution/database?from_column=20065&from=20065)、FTP等，通过Web端轻松管理服务器。

以下教程，我们将演示使用宝塔面板快速简单搭建本地web网站，并做内网穿透，实现不在同个局域网下的用户也可以访问到本地web站点，无需[公网IP](https://cloud.tencent.com/product/eip?from_column=20065&from=20065)，也不用设置路由器。

### 1. 环境安装

安装apache服务器,在宝塔面板中我们点击网站,然后会提示安装apache服务器。

![image-20230307143843485](https://raw.githubusercontent.com/h1s97x/picture/main/Doc/bbff18195cb87904aac4bdb2596b7f44.png)

![image-20230307155129355](https://developer.qcloudimg.com/http-save/yehe-10439143/151ebbebdfff4a106a9e8ab15f256273.png)

然后等待安装完成即可,安装完成在左边消息列表会提示

![image-20230307155221216](https://developer.qcloudimg.com/http-save/yehe-10439143/86f327aff984e56f62086d0c2d4f20a4.png)



### 2. 安装cpolar内网穿透

>  [https://www.cpolar.com/](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fwww.cpolar.com%2F&source=article&objectId=2337730) 

- 打开宝塔终端命令窗口,使用cpolar一件安装脚本:

```javascript
curl -L https://www.cpolar.com/static/downloads/install-release-cpolar.sh | sudo bash
```

![image-20230303183721806](https://developer.qcloudimg.com/http-save/yehe-10439143/242b75d2e65b085619dee64ca57b5007.png)

- token认证

登录cpolar官网,点击左侧的`验证`，查看自己的认证token，之后将token贴在命令行里

```javascript
cpolar authtoken xxxxxxx
```

![20230111103532](https://developer.qcloudimg.com/http-save/yehe-10439143/085c96875d0ced7713a5b8f45f57a1cb.png)

- 向系统添加服务

```javascript
sudo systemctl enable cpolar
```

- 启动cpolar服务

```javascript
sudo systemctl start cpolar
```

- 开放9200端口

在宝塔面板中选择安全.然后开放9200端口

![image-20230303184430176](https://raw.githubusercontent.com/h1s97x/picture/main/Doc/e3f2d366a85316014dcf8e1ed70e797f.png)

- 登录cpolar web UI 管理界面

然后局域网ip访问9200端口即可出现cpolar管理界面，输入cpolar邮箱账号进行登陆

![image-20230303184618711](https://developer.qcloudimg.com/http-save/yehe-10439143/55a1eee790aa10ff25c39207681dafcd.png)

### 3. 内网穿透

登录cpolar web UI管理界面后，我们创建一个http隧道，指向80端口,因为apache服务默认是80端口

- 隧道名称：可自定义，注意不要重复
- 协议：http
- 本地地址：80
- 端口类型：随机域名
- 地区：China vip

点击`创建`

![image-20230307161358154](https://raw.githubusercontent.com/h1s97x/picture/main/Doc/ccfb43d324c0d8199730fd4e3e0d10ed.png)

创建成功后我们打开在线隧道列表复制创建的公网地址

![image-20230307161716775](https://developer.qcloudimg.com/http-save/yehe-10439143/b575b43f6f998041ebeed60bdb34f16b.png)

然后我们打开宝塔面板,点击网站,选择添加站点,把复制的公网地址粘贴到域名的参数框,然后点击提交

![image-20230307162110990](https://developer.qcloudimg.com/http-save/yehe-10439143/6f20811dd43647cad1236d2e8e1e875e.png)

这个时候我们可以看到站点创建成功

![image-20230307162248903](https://raw.githubusercontent.com/h1s97x/picture/main/Doc/6ce1fe268297d5e5101b44d4862cfc9d.png)

然后我们再使用复制的公网地址,打开浏览器访问,出现欢迎页表示成功

![image-20230307163357047](https://raw.githubusercontent.com/h1s97x/picture/main/Doc/7e6eba1092281171140be29389b1eddf.png)

### 4. 固定http地址

由于刚刚创建隧道使用的是随机临时地址，该地址会在24小时内发生变化，为了长期远程访问，我们接下来将这个公网地址配置为固定的。

>  需升级至基础套餐或以上才支持配置二级子域名 

登录cpolar官网后台，点击左侧仪表盘的`预留`，找到`保留二级子域名`，为http隧道保留一个二级子域名。

- *地区：选择服务器地区*
- *名称：填写您想要保留的二级子域名（可自定义）*
- *描述：即备注，可自定义填写*

![image-20230307164936590](https://developer.qcloudimg.com/http-save/yehe-10439143/1ca2488f1909e325f929cc6b80c117a6.png)

本例保留一个名称为`mywebsitegame`的二级子域名。子域名保留成功后，我们将子域名复制下来，接下来需要将其配置到隧道中去。

![image-20230307165346945](https://developer.qcloudimg.com/http-save/yehe-10439143/e332484341c2eb766c0268e974f61b0d.png)

### 5. 配置二级子域名

登录cpolar web ui管理界面。点击左侧仪表盘的`隧道管理`——`隧道列表`，找到需要配置二级子域名的隧道（本例中为apache website隧道），点击右侧的`编辑`

![image-20230307165440111](https://raw.githubusercontent.com/h1s97x/picture/main/Doc/4b30ec2ade5fc0c448ab927eb6ac5864.png)

修改隧道信息，将二级子域名配置到隧道中：

- *域名类型：改为选择`二级子域名`*
- *Sub Domain：填写我们刚刚所保留的二级子域名（本例为`mywebsitegame`）*

修改完成后，点击`更新`

![image-20230307165524932](https://developer.qcloudimg.com/http-save/yehe-10439143/140721fc7f7d4e0f7b93014ecbc55679.png)

隧道更新成功后，点击左侧仪表盘的`状态`——`在线隧道列表`，可以看到隧道的公网地址，已经更新为二级子域名了，将公网地址复制下来。

![image-20230307165845253](https://raw.githubusercontent.com/h1s97x/picture/main/Doc/a5872f56222ed3609b3a5860b56539ea.png)

然后我们打开宝塔面板,找到站点,点击设置

![image-20230307170712990](https://raw.githubusercontent.com/h1s97x/picture/main/Doc/671aebf527cf7b19c48ef49ca6e75b29.png)

添加一个我们固定的公网地址域名

![image-20230307170900973](https://developer.qcloudimg.com/http-save/yehe-10439143/22de66f7ecc95d48d079694f250b830d.png)

然后把之前创建的随机地址删除

![image-20230307170948787](https://raw.githubusercontent.com/h1s97x/picture/main/Doc/53cf4d8386a128b542e40f0ced879e66.png)

然后我们打开浏览器,使用固定的公网地址进行访问,以上我们就配置好了站点远程访问

![image-20230307172031135](https://raw.githubusercontent.com/h1s97x/picture/main/Doc/9d77064ba2531a51effbf0bef350e8a6.png)

### 后续

说说体验：

首先是这是一个确实可行的方案，之前试过好几个结果都是有问题。

但是免费只能用随机地址，一天一换还是很讨厌的。