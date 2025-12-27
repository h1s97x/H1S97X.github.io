---
title: Wiki.js
date: '2025-12-27 23:46:11'
---
## 使用 Docker 部署 Wiki.js

> 本文将介绍如何用 Docker 容器技术部署 Wiki.js 应用程序。Wiki.js 是一个高度可定制 Wiki 平台，用 Node.js 编写，支持 Markdown 以及 HTML 文档。Docker 容器技术可帮助我们简化部署过程，提高应用程序的可移植性和可扩展性。

### 安装 Docker 端

开始部署之前，我们需要确保已经安装了 Docker。Docker 是一个开源应用容器引擎，可以轻松地为任何应用程序创建一个轻量级的、可移植的、自给自足容器。要安装 Docker，

```
curl -fsSL https://get.docker.com | bash -s docker
```

其他安装方式：

```
# 设置Docker的镜像仓库
yum install -y yum-utils

yum-config-manager \
    --add-repo \    https://download.docker.com/linux/centos/docker-ce.repo

# 安装Docker
yum install docker-ce docker-ce-cli containerd.io -y

# 启动Docker
systemctl start docker

# 设为开机自启
systemctl enalbe docker
```

可以运行一个hello-world镜像来验证Docker是否正确安装，

```
docker run hello-world
```

这个命令会下载一个测试镜像并运行，在命令行里输出hello world信息后自动退出

```
# 安装Docker Compose
curl -L "https://github.com/docker/compose/releases/download/1.25.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# 添加权限
chmod +x /usr/local/bin/docker-compose

# 查看docker compose版本，测试安装是否成功
docker compose version
```

### 获取镜像

在 Docker 中镜像是一个只读模板，可创建 Docker 容器。Wiki.js 官方提供了预构建 Docker 镜像，我们可直接从 Docker Hub 中拉取。

为了简化部署过程，我们先创建 `docker-compose.yml` 文件，

```
vim docker-compose.yml
```

复制以下内容：

```
version: "3"
services:

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: wiki
      POSTGRES_PASSWORD: wikijsrocks
      POSTGRES_USER: wikijs
    logging:
      driver: "none"
    restart: unless-stopped
    volumes:
      - db-data:/var/lib/postgresql/data

  wiki:
    image: linuxserver/wikijs
    depends_on:
      - db
    environment:
      DB_TYPE: postgres
      DB_HOST: db
      DB_PORT: 5432
      DB_USER: wikijs
      DB_PASS: wikijsrocks
      DB_NAME: wiki
    restart: unless-stopped
    ports:
      - "80:3000"

volumes:
  db-data:
```

编辑好上面内容后，执行下面的命令即可部署 Wiki.js：

```
docker compose up -d
```

### 初始配置

通过浏览器打开 Wiki.js 所在的服务器，进行初始配置。需要依次输入管理员的邮箱、密码，访问地址，设置是否匿名反馈使用情况：
![img](https://cdn.dusays.com/2023/12/656-1.jpg)

管理员用户创建完成后，会自动跳转到登录页面，输入刚刚创建好的管理员账号后，可以看到如下页面，这时我们先点击 ADMINISTRATION 进入后台：

[![img](https://raw.githubusercontent.com/h1s97x/picture/main/Doc/656-2.jpg)](https://cdn.dusays.com/2023/12/656-2.jpg)

在后台面板中，我们首先汉化一下全站界面。点击左侧的 Locale，进入语言包设置页：

![img](https://cdn.dusays.com/2023/12/656-3.jpg)

在右侧下载语言包，这里我们以 Chinese Simplified 为例，下载后在中间的 Site Localo 处选择 Chinese Simplified，最后点击右上角 APPLY 即可：

![img](https://raw.githubusercontent.com/h1s97x/picture/main/Doc/656-4.jpg)

切换至首页后，即可创建主页内容。这里可以选择使用何种编辑器来创建，这里我们以 Markdown 为例：

![img](https://raw.githubusercontent.com/h1s97x/picture/main/Doc/656-5.jpg)



写在最后

通过 `docker-compose.yml` 可以看出来，服务已经做了 `80` 端口的映射，如果服务器中有其它的网站环境，建议修改 `docker-compose.yml` 中种 `80` 为其它端口。

另外如无 Nginx 等引擎，但需要 SSL 加密访问，推荐安装 Nginx Proxy Manager 来进行加密反代。

强烈建议先配置好访问环境「即配置好 Nginx Proxy Manager 后」再做 Wiki.js 初始化操作。



https://dusays.com/656/



![img](https://img2023.cnblogs.com/blog/270073/202309/270073-20230906085158792-661022329.png)

## 开始使用

![img](https://img2023.cnblogs.com/blog/270073/202309/270073-20230906085226468-943909471.png)

### **1 效果展示**

　　Wiki.js 默认的前台页面布局和功能如下图所示，用户可根据自己需要来调整、启用或关闭。

![img](https://img2023.cnblogs.com/blog/270073/202309/270073-20230906085250986-296282782.png)

　　后台管理页面功能如下图所示。

![img](https://img2023.cnblogs.com/blog/270073/202309/270073-20230906085330649-370392906.png)

### **2 版本比对**

　　Wiki.js 支持一个简单的版本比对工具。

![img](https://img2023.cnblogs.com/blog/270073/202309/270073-20230906085313066-1529105748.png)

### **3 修改语言**

　　Wiki.js 默认为英文，可下载对应语言包，切换语言设置。

![img](https://img2023.cnblogs.com/blog/270073/202309/270073-20230906085353539-1674712978.png)

###  **4 全文检索**

　　本例我使用的是 PostgreSql 的搜索引擎，因为搭建起来比较方便。

　　在搜索引擎菜单中，选中“Database-PostgreSQL”，并在引擎配置中，选择我们在数据库中的配置名称。

![img](https://img2023.cnblogs.com/blog/270073/202309/270073-20230906085434425-269210813.png)

　　配置好后，我们就可以验证中文搜索了。

![img](https://img2023.cnblogs.com/blog/270073/202309/270073-20230906090717031-1656380835.png)

### **5 修饰站点 **

　　在“常规”菜单中，我们可以配置 Wiki 的基本信息，比如公司名称、Logo 等。

![img](https://img2023.cnblogs.com/blog/270073/202309/270073-20230906085535398-926066763.png)

### **6 权限控制**

　　Wiki.js 支持多种身份验证方式，可以按需要选择。

![img](https://img2023.cnblogs.com/blog/270073/202309/270073-20230906085558313-698544516.png)

　　可以通过建立组来统一管理用户。

![img](https://img2023.cnblogs.com/blog/270073/202309/270073-20230906085615709-201045966.png)

　　 基于 Permissions 和 Page Rules 灵活定义组权限。

![img](https://img2023.cnblogs.com/blog/270073/202309/270073-20230906085631811-1180650891.png)

![img](https://img2023.cnblogs.com/blog/270073/202309/270073-20230906085639109-704909312.png)

## 定制和扩展

　　在创建页面时，可以通过编写脚本和样式来定制和扩展页面功能。

　　Wiki.js 附带了一个默认主题，它支持明暗模式，对大多数用户来说应该足够了，用户也可以自行定制主题。

　　Wiki.js 是完全模块化的，所有模块都位于 server/modules 下，允许任何开发人员编写自己的模块。

　　Wiki.js 公开了一个 GraphQL API，您可以从中访问和修改 Wiki 的所有资源。

### 主題









## Wiki.js 通过 Generic OAuth2 进行身份验证

[少走点弯路：Wiki.js 通过 Generic OAuth2 进行身份验证](https://www.cnblogs.com/JiuLing-zhang/p/16899492.html)

基本的配置包含2个部分，分别是**授权配置**、**注册配置**。

## 1. 授权配置

### 1.1 Client ID

获取 `Token` 时会作为参数传递给接口。

### 1.2 Client Secret

获取 `Token` 时会作为参数传递给接口。

### 1.3 Authorization Endpoint URL

授权页面的地址。
当进入 `Wiki` 的登录页后，选择 `Generic OAuth2` 授权登录时跳转的地址。
如果同意授权，则需要跳转到 `Wiki` 指定的回调页面（跳转时可以加入自定义参数）。
每个项目的回调地址都不相同，最简单的办法就是在页面的最下面找到配置参考。
`http://xxx:3000/login/bf4439-a770-fedee4be57df/callback?MyValue=test`
如果回调地址配置的不对，可能会出现`Invalid authentication provider.`错误页。

### 1.4 Token Endpoint URL

获取`Token`的接口地址。

在调用该地址时，`Wiki`会自动附带下面这些参数：

1. `grant_type=authorization_code`
2. `client_id=1.1中配置的值`
3. `client_secret=1.2中配置的值`
4. `自定义参数（1.3中配置的值）`

服务端验证逻辑完成后，接口必须返回包含以下字段的返回值（**注意区分大小写**）

```json
{
    "access_token":"xxx"
}
```

如果返回值不合法，会出现错误页`Failed to obtain access token`。

### 1.5 User Info Endpoint URL

成功拿到`Token`后，获取用户信息的接口地址。

> 可以设置 `Wiki` 获取用户信息时 `Token` 的传递方式：`Query string` 或 `Authorization header`
> ![SetToken.png](https://s2.loli.net/2022/11/17/qRtYNFA4ODhfeLU.png)

服务器根据 `Token` 获取用户信息，最终返回包含以下字段的返回值（**注意区分大小写**）

```json
{
    "UserId":10086,
    "Name":"张三",
    "Email":"zs@test.com"
}
```

如果返回值不合法，会出现错误页`Missing or invalid email address from profile.`

> **`Wiki` 系统中是通过 `Email` 来标识唯一用户，因此不同用户的 `Email` 不能重复。**

### 1.6 ID Claim

用户信息接口中返回的`用户 ID` 字段名。

### 1.7 Display Name Claim

用户信息接口中返回的`用户名称`字段名。

### 1.8 Email Claim

用户信息接口中返回的`邮箱`字段名，该字段值必须保证唯一。

## 2. 注册配置

### 2.1 启用开放注册

授权登录完成后，当用户信息在 `Wiki` 中不存在时，则会新建用户信息并完成登录。

### 2.1 禁用开放注册

授权用户的 `Email` 必须已经在 `Wiki` 中注册，否则无法登录，出现错误页`You are not authorized to login.`
