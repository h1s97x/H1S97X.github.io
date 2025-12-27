
# Alist V3 API 整理

[Alist V3](https://alist.nn.ci/zh/)是一个支持多种存储，支持网页浏览和 WebDAV 的文件列表程序，由 gin 和 Solidjs 驱动。
Alist的官方文档提供了V2版本的API说明，但对于最新的V3版本并没有，这里个人整理了一些V3版本的常用API和参数设置，返回示例供有需要的朋友参考。

整理人：Kuingsmile@Github


## POST token获取

POST /api/auth/login

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Password|query|string| 是 |密码|
|Username|query|string| 是 |用户名|

> 返回示例

> 成功

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "token": "abcd"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» message|string|true|none||信息|
|» data|object|true|none||data|
|»» token|string|true|none||token|

## POST 获取文件列表

POST /api/fs/list

> Body 请求参数

```json
{
  "page": 3,
  "password": "",
  "path": "/阿里云盘",
  "per_page": 30,
  "refresh": false
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |用户token|
|Content-Type|header|string| 否 |none|
|body|body|object| 否 |none|
|» page|body|integer| 否 |当前页数|
|» password|body|string| 否 |密码|
|» path|body|string| 否 |路径|
|» per_page|body|integer| 否 |每页文件数|
|» refresh|body|boolean| 否 |强制刷新|

> 返回示例

> 成功

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "content": [
      {
        "name": "201311",
        "size": 0,
        "is_dir": true,
        "modified": "2021-11-30T15:41:43.004Z",
        "sign": "",
        "thumb": "",
        "type": 1
      },
      {
        "name": "201312",
        "size": 0,
        "is_dir": true,
        "modified": "2021-11-30T15:42:26.839Z",
        "sign": "",
        "thumb": "",
        "type": 1
      },
      {
        "name": "201401",
        "size": 0,
        "is_dir": true,
        "modified": "2021-11-30T15:42:37.344Z",
        "sign": "",
        "thumb": "",
        "type": 1
      },
      {
        "name": "201402",
        "size": 0,
        "is_dir": true,
        "modified": "2021-11-30T15:41:35.053Z",
        "sign": "",
        "thumb": "",
        "type": 1
      },
      {
        "name": "201403",
        "size": 0,
        "is_dir": true,
        "modified": "2021-11-30T15:41:51.271Z",
        "sign": "",
        "thumb": "",
        "type": 1
      }
    ],
    "total": 77,
    "readme": "",
    "write": true,
    "provider": "Aliyundrive"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» message|string|true|none||信息|
|» data|object|true|none||none|
|»» content|[object]|true|none||none|
|»»» name|string|true|none||文件名|
|»»» size|integer|true|none||文件大小|
|»»» is_dir|boolean|true|none||是否为目录|
|»»» modified|string|true|none||修改时间|
|»»» sign|string|true|none||访问密钥|
|»»» thumb|string|true|none||缩略图地址|
|»»» type|integer|true|none||none|
|»» total|integer|true|none||总文件数|
|»» readme|string|true|none||none|
|»» write|boolean|true|none||写入权限|
|»» provider|string|true|none||存储类型|

## POST 新建文件夹

POST /api/fs/mkdir

> Body 请求参数

```json
{
  "path": "/阿里云盘/test3"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |token|
|Content-Type|header|string| 否 |none|
|body|body|object| 否 |none|
|» path|body|string| 是 |新目录路径|

> 返回示例

> 成功

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» message|string|true|none||信息|
|» data|null|true|none||data|

## POST 重命名文件夹

POST /api/fs/rename

> Body 请求参数

```json
{
  "name": "test3",
  "path": "/阿里云盘/test2"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |token|
|Content-Type|header|string| 否 |none|
|body|body|object| 否 |none|
|» name|body|string| 是 |目标目录名，不支持'/'|
|» path|body|string| 是 |源目录名|

> 返回示例

> 成功

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» message|string|true|none||信息|
|» data|null|true|none||none|

## POST 删除文件夹

POST /api/fs/remove

> Body 请求参数

```json
{
  "dir": "/阿里云盘",
  "names": [
    "test",
    "test3"
  ]
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |token|
|Content-Type|header|string| 是 |none|
|body|body|object| 否 |none|
|» dir|body|string| 是 |文件所在目录|
|» names|body|[string]| 是 |文件名列表|

> 返回示例

> 成功

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» message|string|true|none||信息|
|» data|null|true|none||data|

## PUT 表单上传文件

PUT /api/fs/form

> Body 请求参数

```yaml
file: file://C:\test.jpg

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |token|
|Content-Type|header|string| 是 |需要是multipart/form-data;|
|Content-Length|header|string| 是 |文件大小|
|file-path|header|string| 是 |经过URL编码的完整文件路径|
|body|body|object| 否 |none|
|» file|body|string(binary)| 是 |文件|

> 返回示例

> 成功

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» message|string|true|none||信息|
|» data|null|true|none||data|

## POST 获取下载信息

POST /api/fs/get

> Body 请求参数

```json
{
  "path": "/阿里云盘/test/sw.jpg",
  "password": ""
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |token|
|Content-Type|header|string| 否 |none|
|body|body|object| 否 |none|
|» password|body|string| 否 |密码|
|» path|body|string| 是 |文件路径|

> 返回示例

> 成功

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "name": "sw.jpg",
    "size": 169918,
    "is_dir": false,
    "modified": "2022-11-26T12:54:54.534Z",
    "sign": "xxxx",
    "thumb": "",
    "type": 5,
    "raw_url": "https://cn-beijing-data.aliyundrive.net/xxxx",
    "readme": "",
    "provider": "Aliyundrive",
    "related": null
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» message|string|true|none||信息|
|» data|object|true|none||data|
|»» name|string|true|none||文件名|
|»» size|integer|true|none||文件大小|
|»» is_dir|boolean|true|none||是否是目录|
|»» modified|string|true|none||修改时间|
|»» sign|string|true|none||文件密钥|
|»» thumb|string|true|none||缩略图地址|
|»» type|integer|true|none||类型|
|»» raw_url|string|true|none||源文件下载地址|
|»» readme|string|true|none||none|
|»» provider|string|true|none||驱动类型|
|»» related|null|true|none||none|

## GET 系统设置

GET /api/admin/setting/list

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|group|query|integer| 是 |0-站点；1-样式；2-预览；3-全局；4-令牌；5-aria2|
|Authorization|header|string| 是 |token|
|Content-Type|header|string| 是 |none|

> 返回示例

> 成功

```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "key": "version",
      "value": "v3.5.1",
      "help": "",
      "type": "string",
      "options": "",
      "group": 0,
      "flag": 2
    },
    {
      "key": "site_title",
      "value": "",
      "help": "",
      "type": "string",
      "options": "",
      "group": 0,
      "flag": 0
    },
    {
      "key": "announcement",
      "value": "",
      "help": "",
      "type": "text",
      "options": "",
      "group": 0,
      "flag": 0
    },
    {
      "key": "pagination_type",
      "value": "pagination",
      "help": "",
      "type": "select",
      "options": "all,pagination,load_more,auto_load_more",
      "group": 0,
      "flag": 0
    },
    {
      "key": "default_page_size",
      "value": "30",
      "help": "",
      "type": "number",
      "options": "",
      "group": 0,
      "flag": 0
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» message|string|true|none||信息|
|» data|[object]|true|none||none|
|»» key|string|true|none||键|
|»» value|string|true|none||值|
|»» help|string|true|none||none|
|»» type|string|true|none||类型|
|»» options|string|true|none||none|
|»» group|integer|true|none||none|
|»» flag|integer|true|none||none|

## GET 账户列表

GET /api/admin/user/list

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |token|

> 返回示例

> 成功

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "content": [
      {
        "id": 1,
        "username": "admin",
        "password": "",
        "base_path": "/",
        "role": 2,
        "permission": 0
      },
      {
        "id": 2,
        "username": "guest",
        "password": "",
        "base_path": "/",
        "role": 1,
        "permission": 0
      }
    ],
    "total": 2
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» message|string|true|none||信息|
|» data|object|true|none||data|
|»» content|[object]|true|none||none|
|»»» id|integer|true|none||id|
|»»» username|string|true|none||用户名|
|»»» password|string|true|none||密码|
|»»» base_path|string|true|none||目录|
|»»» role|integer|true|none||none|
|»»» permission|integer|true|none||权限|
|»» total|integer|true|none||none|

## GET 存储列表

GET /api/admin/storage/list

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |token|

> 返回示例

> 成功

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "content": [
      {
        "id": 1,
        "mount_path": "/阿里云盘",
        "order": 0,
        "driver": "Aliyundrive",
        "cache_expiration": 30,
        "status": "work",
        "addition": "{\"root_folder_id\":\"xxx\",\"refresh_token\":\"xxx\",\"order_by\":\"name\",\"order_direction\":\"ASC\",\"rapid_upload\":false}",
        "remark": "",
        "modified": "2022-11-26T18:55:55.261579727+08:00",
        "disabled": false,
        "order_by": "",
        "order_direction": "",
        "extract_folder": "",
        "web_proxy": false,
        "webdav_policy": "302_redirect",
        "down_proxy_url": ""
      }
    ],
    "total": 1
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» message|string|true|none||信息|
|» data|object|true|none||none|
|»» content|[object]|true|none||none|
|»»» id|integer|false|none||id|
|»»» mount_path|string|false|none||挂载路径|
|»»» order|integer|false|none||顺序|
|»»» driver|string|false|none||驱动类型|
|»»» cache_expiration|integer|false|none||缓存时间|
|»»» status|string|false|none||状态|
|»»» addition|string|false|none||额外信息|
|»»» remark|string|false|none||备注名|
|»»» modified|string|false|none||修改时间|
|»»» disabled|boolean|false|none||是否被禁用|
|»»» order_by|string|false|none||排序方式|
|»»» order_direction|string|false|none||排序方向|
|»»» extract_folder|string|false|none||提取目录顺序|
|»»» web_proxy|boolean|false|none||http代理|
|»»» webdav_policy|string|false|none||webdav策略|
|»»» down_proxy_url|string|false|none||下载代理url|
|»» total|integer|true|none||none|

## POST 启用存储

POST /api/admin/storage/enable

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|query|integer| 是 |存储id|
|Authorization|header|string| 是 |token|

> 返回示例

> 成功

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» message|string|true|none||信息|
|» data|null|true|none||data|

## POST 禁用存储

POST /api/admin/storage/disable

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|query|string| 是 |存储id|
|Authorization|header|string| 是 |token|

> 返回示例

> 成功

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» message|string|true|none||信息|
|» data|null|true|none||data|

## POST 新建存储

POST /api/admin/storage/create

> Body 请求参数

```json
{
  "mount_path": "/阿里云盘2",
  "order": 1,
  "remark": "",
  "cache_expiration": 30,
  "web_proxy": false,
  "webdav_policy": "302_redirect",
  "down_proxy_url": "",
  "extract_folder": "front",
  "driver": "Aliyundrive",
  "addition": "{\"root_folder_id\":\"\",\"refresh_token\":\"\",\"order_by\":\"size\",\"order_direction\":\"ASC\",\"rapid_upload\":false}"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |token|
|body|body|object| 否 |none|
|» mount_path|body|string| 是 |挂载路径|
|» order|body|integer| 是 |排序|
|» remark|body|string| 是 |备注名|
|» cache_expiration|body|integer| 是 |缓存过期时间|
|» web_proxy|body|boolean| 是 |web代理|
|» webdav_policy|body|string| 是 |webdav策略|
|» down_proxy_url|body|string| 是 |下载代理|
|» extract_folder|body|string| 是 |提取目录|
|» driver|body|string| 是 |驱动|
|» addition|body|string| 是 |额外信息|

> 返回示例

> 成功

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 2
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» message|string|true|none||信息|
|» data|object|true|none||data|
|»» id|integer|true|none||none|

## GET 查询指定存储信息

GET /api/admin/storage/get

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|query|string| 是 |存储id|
|Authorization|header|string| 是 |token|

> 返回示例

> 成功

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 2,
    "mount_path": "/阿里云盘2",
    "order": 1,
    "driver": "Aliyundrive",
    "cache_expiration": 30,
    "status": "work",
    "addition": "{\"root_folder_id\":\"\",\"refresh_token\":\"\",\"order_by\":\"size\",\"order_direction\":\"ASC\",\"rapid_upload\":false}",
    "remark": "",
    "modified": "2022-11-26T21:50:44.142348853+08:00",
    "disabled": false,
    "order_by": "",
    "order_direction": "",
    "extract_folder": "front",
    "web_proxy": false,
    "webdav_policy": "302_redirect",
    "down_proxy_url": ""
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» message|string|true|none||信息|
|» data|object|true|none||none|
|»» id|integer|true|none||id|
|»» mount_path|string|true|none||挂载路径|
|»» order|integer|true|none||排序|
|»» driver|string|true|none||驱动|
|»» cache_expiration|integer|true|none||缓存过期时间|
|»» status|string|true|none||状态|
|»» addition|string|true|none||额外信息|
|»» remark|string|true|none||备注|
|»» modified|string|true|none||修改时间|
|»» disabled|boolean|true|none||是否被禁用|
|»» order_by|string|true|none||排序方式|
|»» order_direction|string|true|none||排序方向|
|»» extract_folder|string|true|none||提取目录|
|»» web_proxy|boolean|true|none||web代理|
|»» webdav_policy|string|true|none||webdav策略|
|»» down_proxy_url|string|true|none||下载代理|

## GET 查询所有驱动配置模板列表

GET /api/admin/driver/list

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |token|

> 返回示例

> 成功

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "115 Cloud": {
      "common": [
        {
          "name": "mount_path",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "order",
          "type": "number",
          "default": "",
          "options": "",
          "required": false,
          "help": "use to sort"
        },
        {
          "name": "remark",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "cache_expiration",
          "type": "number",
          "default": "30",
          "options": "",
          "required": true,
          "help": "The cache expiration time for this storage"
        },
        {
          "name": "webdav_policy",
          "type": "select",
          "default": "native_proxy",
          "options": "use_proxy_url,native_proxy",
          "required": true,
          "help": ""
        },
        {
          "name": "down_proxy_url",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "extract_folder",
          "type": "select",
          "default": "",
          "options": "front,back",
          "required": false,
          "help": ""
        }
      ],
      "additional": [
        {
          "name": "cookie",
          "type": "string",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "qrcode_token",
          "type": "string",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "root_folder_id",
          "type": "string",
          "default": "0",
          "options": "",
          "required": true,
          "help": ""
        }
      ],
      "config": {
        "name": "115 Cloud",
        "local_sort": false,
        "only_local": true,
        "only_proxy": true,
        "no_cache": false,
        "no_upload": false,
        "need_ms": false,
        "default_root": "0",
        "CheckStatus": false
      }
    },
    "123Pan": {
      "common": [
        {
          "name": "mount_path",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "order",
          "type": "number",
          "default": "",
          "options": "",
          "required": false,
          "help": "use to sort"
        },
        {
          "name": "remark",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "cache_expiration",
          "type": "number",
          "default": "30",
          "options": "",
          "required": true,
          "help": "The cache expiration time for this storage"
        },
        {
          "name": "web_proxy",
          "type": "bool",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "webdav_policy",
          "type": "select",
          "default": "302_redirect",
          "options": "302_redirect,use_proxy_url,native_proxy",
          "required": true,
          "help": ""
        },
        {
          "name": "down_proxy_url",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "extract_folder",
          "type": "select",
          "default": "",
          "options": "front,back",
          "required": false,
          "help": ""
        }
      ],
      "additional": [
        {
          "name": "username",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "password",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "order_by",
          "type": "select",
          "default": "file_name",
          "options": "file_name,size,update_at",
          "required": false,
          "help": ""
        },
        {
          "name": "order_direction",
          "type": "select",
          "default": "asc",
          "options": "asc,desc",
          "required": false,
          "help": ""
        },
        {
          "name": "root_folder_id",
          "type": "string",
          "default": "0",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "stream_upload",
          "type": "bool",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        }
      ],
      "config": {
        "name": "123Pan",
        "local_sort": false,
        "only_local": false,
        "only_proxy": false,
        "no_cache": false,
        "no_upload": false,
        "need_ms": false,
        "default_root": "0",
        "CheckStatus": false
      }
    },
    "139Yun": {
      "common": [
        {
          "name": "mount_path",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "order",
          "type": "number",
          "default": "",
          "options": "",
          "required": false,
          "help": "use to sort"
        },
        {
          "name": "remark",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "cache_expiration",
          "type": "number",
          "default": "30",
          "options": "",
          "required": true,
          "help": "The cache expiration time for this storage"
        },
        {
          "name": "web_proxy",
          "type": "bool",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "webdav_policy",
          "type": "select",
          "default": "302_redirect",
          "options": "302_redirect,use_proxy_url,native_proxy",
          "required": true,
          "help": ""
        },
        {
          "name": "down_proxy_url",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "order_by",
          "type": "select",
          "default": "",
          "options": "name,size,modified",
          "required": false,
          "help": ""
        },
        {
          "name": "order_direction",
          "type": "select",
          "default": "",
          "options": "asc,desc",
          "required": false,
          "help": ""
        },
        {
          "name": "extract_folder",
          "type": "select",
          "default": "",
          "options": "front,back",
          "required": false,
          "help": ""
        }
      ],
      "additional": [
        {
          "name": "account",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "cookie",
          "type": "text",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "root_folder_id",
          "type": "string",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "type",
          "type": "select",
          "default": "personal",
          "options": "personal,family",
          "required": false,
          "help": ""
        },
        {
          "name": "cloud_id",
          "type": "string",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        }
      ],
      "config": {
        "name": "139Yun",
        "local_sort": true,
        "only_local": false,
        "only_proxy": false,
        "no_cache": false,
        "no_upload": false,
        "need_ms": false,
        "default_root": "",
        "CheckStatus": false
      }
    },
    "189Cloud": {
      "common": [
        {
          "name": "mount_path",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "order",
          "type": "number",
          "default": "",
          "options": "",
          "required": false,
          "help": "use to sort"
        },
        {
          "name": "remark",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "cache_expiration",
          "type": "number",
          "default": "30",
          "options": "",
          "required": true,
          "help": "The cache expiration time for this storage"
        },
        {
          "name": "web_proxy",
          "type": "bool",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "webdav_policy",
          "type": "select",
          "default": "302_redirect",
          "options": "302_redirect,use_proxy_url,native_proxy",
          "required": true,
          "help": ""
        },
        {
          "name": "down_proxy_url",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "order_by",
          "type": "select",
          "default": "",
          "options": "name,size,modified",
          "required": false,
          "help": ""
        },
        {
          "name": "order_direction",
          "type": "select",
          "default": "",
          "options": "asc,desc",
          "required": false,
          "help": ""
        },
        {
          "name": "extract_folder",
          "type": "select",
          "default": "",
          "options": "front,back",
          "required": false,
          "help": ""
        }
      ],
      "additional": [
        {
          "name": "username",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "password",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "root_folder_id",
          "type": "string",
          "default": "-11",
          "options": "",
          "required": true,
          "help": ""
        }
      ],
      "config": {
        "name": "189Cloud",
        "local_sort": true,
        "only_local": false,
        "only_proxy": false,
        "no_cache": false,
        "no_upload": false,
        "need_ms": false,
        "default_root": "-11",
        "CheckStatus": false
      }
    },
    "189CloudPC": {
      "common": [
        {
          "name": "mount_path",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "order",
          "type": "number",
          "default": "",
          "options": "",
          "required": false,
          "help": "use to sort"
        },
        {
          "name": "remark",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "cache_expiration",
          "type": "number",
          "default": "30",
          "options": "",
          "required": true,
          "help": "The cache expiration time for this storage"
        },
        {
          "name": "web_proxy",
          "type": "bool",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "webdav_policy",
          "type": "select",
          "default": "302_redirect",
          "options": "302_redirect,use_proxy_url,native_proxy",
          "required": true,
          "help": ""
        },
        {
          "name": "down_proxy_url",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "extract_folder",
          "type": "select",
          "default": "",
          "options": "front,back",
          "required": false,
          "help": ""
        }
      ],
      "additional": [
        {
          "name": "username",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "password",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "validate_code",
          "type": "string",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "root_folder_id",
          "type": "string",
          "default": "-11",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "order_by",
          "type": "select",
          "default": "filename",
          "options": "filename,filesize,lastOpTime",
          "required": false,
          "help": ""
        },
        {
          "name": "order_direction",
          "type": "select",
          "default": "asc",
          "options": "asc,desc",
          "required": false,
          "help": ""
        },
        {
          "name": "type",
          "type": "select",
          "default": "personal",
          "options": "personal,family",
          "required": false,
          "help": ""
        },
        {
          "name": "family_id",
          "type": "string",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "rapid_upload",
          "type": "bool",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "no_use_ocr",
          "type": "bool",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        }
      ],
      "config": {
        "name": "189CloudPC",
        "local_sort": false,
        "only_local": false,
        "only_proxy": false,
        "no_cache": false,
        "no_upload": false,
        "need_ms": false,
        "default_root": "-11",
        "CheckStatus": false
      }
    },
    "AList V2": {
      "common": [
        {
          "name": "mount_path",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "order",
          "type": "number",
          "default": "",
          "options": "",
          "required": false,
          "help": "use to sort"
        },
        {
          "name": "remark",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "cache_expiration",
          "type": "number",
          "default": "30",
          "options": "",
          "required": true,
          "help": "The cache expiration time for this storage"
        },
        {
          "name": "web_proxy",
          "type": "bool",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "webdav_policy",
          "type": "select",
          "default": "302_redirect",
          "options": "302_redirect,use_proxy_url,native_proxy",
          "required": true,
          "help": ""
        },
        {
          "name": "down_proxy_url",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "order_by",
          "type": "select",
          "default": "",
          "options": "name,size,modified",
          "required": false,
          "help": ""
        },
        {
          "name": "order_direction",
          "type": "select",
          "default": "",
          "options": "asc,desc",
          "required": false,
          "help": ""
        },
        {
          "name": "extract_folder",
          "type": "select",
          "default": "",
          "options": "front,back",
          "required": false,
          "help": ""
        }
      ],
      "additional": [
        {
          "name": "root_folder_path",
          "type": "string",
          "default": "/",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "url",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "password",
          "type": "string",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "access_token",
          "type": "string",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        }
      ],
      "config": {
        "name": "AList V2",
        "local_sort": true,
        "only_local": false,
        "only_proxy": false,
        "no_cache": false,
        "no_upload": true,
        "need_ms": false,
        "default_root": "/",
        "CheckStatus": false
      }
    },
    "AList V3": {
      "common": [
        {
          "name": "mount_path",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "order",
          "type": "number",
          "default": "",
          "options": "",
          "required": false,
          "help": "use to sort"
        },
        {
          "name": "remark",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "cache_expiration",
          "type": "number",
          "default": "30",
          "options": "",
          "required": true,
          "help": "The cache expiration time for this storage"
        },
        {
          "name": "web_proxy",
          "type": "bool",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "webdav_policy",
          "type": "select",
          "default": "302_redirect",
          "options": "302_redirect,use_proxy_url,native_proxy",
          "required": true,
          "help": ""
        },
        {
          "name": "down_proxy_url",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "order_by",
          "type": "select",
          "default": "",
          "options": "name,size,modified",
          "required": false,
          "help": ""
        },
        {
          "name": "order_direction",
          "type": "select",
          "default": "",
          "options": "asc,desc",
          "required": false,
          "help": ""
        },
        {
          "name": "extract_folder",
          "type": "select",
          "default": "",
          "options": "front,back",
          "required": false,
          "help": ""
        }
      ],
      "additional": [
        {
          "name": "root_folder_path",
          "type": "string",
          "default": "/",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "url",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "password",
          "type": "string",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "access_token",
          "type": "string",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        }
      ],
      "config": {
        "name": "AList V3",
        "local_sort": true,
        "only_local": false,
        "only_proxy": false,
        "no_cache": false,
        "no_upload": true,
        "need_ms": false,
        "default_root": "/",
        "CheckStatus": false
      }
    },
    "Aliyundrive": {
      "common": [
        {
          "name": "mount_path",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "order",
          "type": "number",
          "default": "",
          "options": "",
          "required": false,
          "help": "use to sort"
        },
        {
          "name": "remark",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "cache_expiration",
          "type": "number",
          "default": "30",
          "options": "",
          "required": true,
          "help": "The cache expiration time for this storage"
        },
        {
          "name": "web_proxy",
          "type": "bool",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "webdav_policy",
          "type": "select",
          "default": "302_redirect",
          "options": "302_redirect,use_proxy_url,native_proxy",
          "required": true,
          "help": ""
        },
        {
          "name": "down_proxy_url",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "extract_folder",
          "type": "select",
          "default": "",
          "options": "front,back",
          "required": false,
          "help": ""
        }
      ],
      "additional": [
        {
          "name": "root_folder_id",
          "type": "string",
          "default": "root",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "refresh_token",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "order_by",
          "type": "select",
          "default": "",
          "options": "name,size,updated_at,created_at",
          "required": false,
          "help": ""
        },
        {
          "name": "order_direction",
          "type": "select",
          "default": "",
          "options": "ASC,DESC",
          "required": false,
          "help": ""
        },
        {
          "name": "rapid_upload",
          "type": "bool",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        }
      ],
      "config": {
        "name": "Aliyundrive",
        "local_sort": false,
        "only_local": false,
        "only_proxy": false,
        "no_cache": false,
        "no_upload": false,
        "need_ms": false,
        "default_root": "root",
        "CheckStatus": false
      }
    },
    "AliyundriveShare": {
      "common": [
        {
          "name": "mount_path",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "order",
          "type": "number",
          "default": "",
          "options": "",
          "required": false,
          "help": "use to sort"
        },
        {
          "name": "remark",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "cache_expiration",
          "type": "number",
          "default": "30",
          "options": "",
          "required": true,
          "help": "The cache expiration time for this storage"
        },
        {
          "name": "web_proxy",
          "type": "bool",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "webdav_policy",
          "type": "select",
          "default": "302_redirect",
          "options": "302_redirect,use_proxy_url,native_proxy",
          "required": true,
          "help": ""
        },
        {
          "name": "down_proxy_url",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "extract_folder",
          "type": "select",
          "default": "",
          "options": "front,back",
          "required": false,
          "help": ""
        }
      ],
      "additional": [
        {
          "name": "refresh_token",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "share_id",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "share_pwd",
          "type": "string",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "root_folder_id",
          "type": "string",
          "default": "root",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "order_by",
          "type": "select",
          "default": "",
          "options": "name,size,updated_at,created_at",
          "required": false,
          "help": ""
        },
        {
          "name": "order_direction",
          "type": "select",
          "default": "",
          "options": "ASC,DESC",
          "required": false,
          "help": ""
        }
      ],
      "config": {
        "name": "AliyundriveShare",
        "local_sort": false,
        "only_local": false,
        "only_proxy": false,
        "no_cache": false,
        "no_upload": true,
        "need_ms": false,
        "default_root": "root",
        "CheckStatus": false
      }
    },
    "BaiduNetdisk": {
      "common": [
        {
          "name": "mount_path",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "order",
          "type": "number",
          "default": "",
          "options": "",
          "required": false,
          "help": "use to sort"
        },
        {
          "name": "remark",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "cache_expiration",
          "type": "number",
          "default": "30",
          "options": "",
          "required": true,
          "help": "The cache expiration time for this storage"
        },
        {
          "name": "web_proxy",
          "type": "bool",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "webdav_policy",
          "type": "select",
          "default": "302_redirect",
          "options": "302_redirect,use_proxy_url,native_proxy",
          "required": true,
          "help": ""
        },
        {
          "name": "down_proxy_url",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "extract_folder",
          "type": "select",
          "default": "",
          "options": "front,back",
          "required": false,
          "help": ""
        }
      ],
      "additional": [
        {
          "name": "refresh_token",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "root_folder_path",
          "type": "string",
          "default": "/",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "order_by",
          "type": "select",
          "default": "name",
          "options": "name,time,size",
          "required": false,
          "help": ""
        },
        {
          "name": "order_direction",
          "type": "select",
          "default": "asc",
          "options": "asc,desc",
          "required": false,
          "help": ""
        },
        {
          "name": "download_api",
          "type": "select",
          "default": "official",
          "options": "official,crack",
          "required": false,
          "help": ""
        },
        {
          "name": "client_id",
          "type": "string",
          "default": "iYCeC9g08h5vuP9UqvPHKKSVrKFXGa1v",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "client_secret",
          "type": "string",
          "default": "jXiFMOPVPCWlO2M5CwWQzffpNPaGTRBG",
          "options": "",
          "required": true,
          "help": ""
        }
      ],
      "config": {
        "name": "BaiduNetdisk",
        "local_sort": false,
        "only_local": false,
        "only_proxy": false,
        "no_cache": false,
        "no_upload": false,
        "need_ms": false,
        "default_root": "/",
        "CheckStatus": false
      }
    },
    "BaiduPhoto": {
      "common": [
        {
          "name": "mount_path",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "order",
          "type": "number",
          "default": "",
          "options": "",
          "required": false,
          "help": "use to sort"
        },
        {
          "name": "remark",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "cache_expiration",
          "type": "number",
          "default": "30",
          "options": "",
          "required": true,
          "help": "The cache expiration time for this storage"
        },
        {
          "name": "web_proxy",
          "type": "bool",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "webdav_policy",
          "type": "select",
          "default": "302_redirect",
          "options": "302_redirect,use_proxy_url,native_proxy",
          "required": true,
          "help": ""
        },
        {
          "name": "down_proxy_url",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "order_by",
          "type": "select",
          "default": "",
          "options": "name,size,modified",
          "required": false,
          "help": ""
        },
        {
          "name": "order_direction",
          "type": "select",
          "default": "",
          "options": "asc,desc",
          "required": false,
          "help": ""
        },
        {
          "name": "extract_folder",
          "type": "select",
          "default": "",
          "options": "front,back",
          "required": false,
          "help": ""
        }
      ],
      "additional": [
        {
          "name": "refresh_token",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "show_type",
          "type": "select",
          "default": "root",
          "options": "root,root_only_album,root_only_file",
          "required": false,
          "help": ""
        },
        {
          "name": "album_id",
          "type": "string",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "client_id",
          "type": "string",
          "default": "iYCeC9g08h5vuP9UqvPHKKSVrKFXGa1v",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "client_secret",
          "type": "string",
          "default": "jXiFMOPVPCWlO2M5CwWQzffpNPaGTRBG",
          "options": "",
          "required": true,
          "help": ""
        }
      ],
      "config": {
        "name": "BaiduPhoto",
        "local_sort": true,
        "only_local": false,
        "only_proxy": false,
        "no_cache": false,
        "no_upload": false,
        "need_ms": false,
        "default_root": "",
        "CheckStatus": false
      }
    },
    "FTP": {
      "common": [
        {
          "name": "mount_path",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "order",
          "type": "number",
          "default": "",
          "options": "",
          "required": false,
          "help": "use to sort"
        },
        {
          "name": "remark",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "cache_expiration",
          "type": "number",
          "default": "30",
          "options": "",
          "required": true,
          "help": "The cache expiration time for this storage"
        },
        {
          "name": "webdav_policy",
          "type": "select",
          "default": "native_proxy",
          "options": "use_proxy_url,native_proxy",
          "required": true,
          "help": ""
        },
        {
          "name": "down_proxy_url",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "order_by",
          "type": "select",
          "default": "",
          "options": "name,size,modified",
          "required": false,
          "help": ""
        },
        {
          "name": "order_direction",
          "type": "select",
          "default": "",
          "options": "asc,desc",
          "required": false,
          "help": ""
        },
        {
          "name": "extract_folder",
          "type": "select",
          "default": "",
          "options": "front,back",
          "required": false,
          "help": ""
        }
      ],
      "additional": [
        {
          "name": "address",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "username",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "password",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "root_folder_path",
          "type": "string",
          "default": "/",
          "options": "",
          "required": true,
          "help": ""
        }
      ],
      "config": {
        "name": "FTP",
        "local_sort": true,
        "only_local": true,
        "only_proxy": false,
        "no_cache": false,
        "no_upload": false,
        "need_ms": false,
        "default_root": "/",
        "CheckStatus": false
      }
    },
    "GoogleDrive": {
      "common": [
        {
          "name": "mount_path",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "order",
          "type": "number",
          "default": "",
          "options": "",
          "required": false,
          "help": "use to sort"
        },
        {
          "name": "remark",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "cache_expiration",
          "type": "number",
          "default": "30",
          "options": "",
          "required": true,
          "help": "The cache expiration time for this storage"
        },
        {
          "name": "webdav_policy",
          "type": "select",
          "default": "native_proxy",
          "options": "use_proxy_url,native_proxy",
          "required": true,
          "help": ""
        },
        {
          "name": "down_proxy_url",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "extract_folder",
          "type": "select",
          "default": "",
          "options": "front,back",
          "required": false,
          "help": ""
        }
      ],
      "additional": [
        {
          "name": "root_folder_id",
          "type": "string",
          "default": "root",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "refresh_token",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "order_by",
          "type": "string",
          "default": "",
          "options": "",
          "required": false,
          "help": "such as: folder,name,modifiedTime"
        },
        {
          "name": "order_direction",
          "type": "select",
          "default": "",
          "options": "asc,desc",
          "required": false,
          "help": ""
        },
        {
          "name": "client_id",
          "type": "string",
          "default": "202264815644.apps.googleusercontent.com",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "client_secret",
          "type": "string",
          "default": "X4Z3ca8xfWDb1Voo-F9a7ZxJ",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "chunk_size",
          "type": "number",
          "default": "5",
          "options": "",
          "required": false,
          "help": "chunk size while uploading (unit: MB)"
        }
      ],
      "config": {
        "name": "GoogleDrive",
        "local_sort": false,
        "only_local": false,
        "only_proxy": true,
        "no_cache": false,
        "no_upload": false,
        "need_ms": false,
        "default_root": "root",
        "CheckStatus": false
      }
    },
    "GooglePhoto": {
      "common": [
        {
          "name": "mount_path",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "order",
          "type": "number",
          "default": "",
          "options": "",
          "required": false,
          "help": "use to sort"
        },
        {
          "name": "remark",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "cache_expiration",
          "type": "number",
          "default": "30",
          "options": "",
          "required": true,
          "help": "The cache expiration time for this storage"
        },
        {
          "name": "webdav_policy",
          "type": "select",
          "default": "native_proxy",
          "options": "use_proxy_url,native_proxy",
          "required": true,
          "help": ""
        },
        {
          "name": "down_proxy_url",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "order_by",
          "type": "select",
          "default": "",
          "options": "name,size,modified",
          "required": false,
          "help": ""
        },
        {
          "name": "order_direction",
          "type": "select",
          "default": "",
          "options": "asc,desc",
          "required": false,
          "help": ""
        },
        {
          "name": "extract_folder",
          "type": "select",
          "default": "",
          "options": "front,back",
          "required": false,
          "help": ""
        }
      ],
      "additional": [
        {
          "name": "root_folder_id",
          "type": "string",
          "default": "root",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "refresh_token",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "client_id",
          "type": "string",
          "default": "202264815644.apps.googleusercontent.com",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "client_secret",
          "type": "string",
          "default": "X4Z3ca8xfWDb1Voo-F9a7ZxJ",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "show_archive",
          "type": "bool",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        }
      ],
      "config": {
        "name": "GooglePhoto",
        "local_sort": true,
        "only_local": false,
        "only_proxy": true,
        "no_cache": false,
        "no_upload": true,
        "need_ms": false,
        "default_root": "root",
        "CheckStatus": false
      }
    },
    "Lanzou": {
      "common": [
        {
          "name": "mount_path",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "order",
          "type": "number",
          "default": "",
          "options": "",
          "required": false,
          "help": "use to sort"
        },
        {
          "name": "remark",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "cache_expiration",
          "type": "number",
          "default": "30",
          "options": "",
          "required": true,
          "help": "The cache expiration time for this storage"
        },
        {
          "name": "web_proxy",
          "type": "bool",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "webdav_policy",
          "type": "select",
          "default": "302_redirect",
          "options": "302_redirect,use_proxy_url,native_proxy",
          "required": true,
          "help": ""
        },
        {
          "name": "down_proxy_url",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "order_by",
          "type": "select",
          "default": "",
          "options": "name,size,modified",
          "required": false,
          "help": ""
        },
        {
          "name": "order_direction",
          "type": "select",
          "default": "",
          "options": "asc,desc",
          "required": false,
          "help": ""
        },
        {
          "name": "extract_folder",
          "type": "select",
          "default": "",
          "options": "front,back",
          "required": false,
          "help": ""
        }
      ],
      "additional": [
        {
          "name": "type",
          "type": "select",
          "default": "cookie",
          "options": "cookie,url",
          "required": false,
          "help": ""
        },
        {
          "name": "cookie",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": "about 15 days valid"
        },
        {
          "name": "root_folder_id",
          "type": "string",
          "default": "-1",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "share_password",
          "type": "string",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "baseUrl",
          "type": "string",
          "default": "https://pc.woozooo.com",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "shareUrl",
          "type": "string",
          "default": "https://pan.lanzouo.com",
          "options": "",
          "required": true,
          "help": ""
        }
      ],
      "config": {
        "name": "Lanzou",
        "local_sort": true,
        "only_local": false,
        "only_proxy": false,
        "no_cache": false,
        "no_upload": false,
        "need_ms": false,
        "default_root": "-1",
        "CheckStatus": false
      }
    },
    "Local": {
      "common": [
        {
          "name": "mount_path",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "order",
          "type": "number",
          "default": "",
          "options": "",
          "required": false,
          "help": "use to sort"
        },
        {
          "name": "remark",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "webdav_policy",
          "type": "select",
          "default": "native_proxy",
          "options": "use_proxy_url,native_proxy",
          "required": true,
          "help": ""
        },
        {
          "name": "down_proxy_url",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "order_by",
          "type": "select",
          "default": "",
          "options": "name,size,modified",
          "required": false,
          "help": ""
        },
        {
          "name": "order_direction",
          "type": "select",
          "default": "",
          "options": "asc,desc",
          "required": false,
          "help": ""
        },
        {
          "name": "extract_folder",
          "type": "select",
          "default": "",
          "options": "front,back",
          "required": false,
          "help": ""
        }
      ],
      "additional": [
        {
          "name": "root_folder_path",
          "type": "string",
          "default": "/",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "thumbnail",
          "type": "bool",
          "default": "",
          "options": "",
          "required": true,
          "help": "enable thumbnail"
        },
        {
          "name": "show_hidden",
          "type": "bool",
          "default": "true",
          "options": "",
          "required": false,
          "help": "show hidden directories and files"
        }
      ],
      "config": {
        "name": "Local",
        "local_sort": true,
        "only_local": true,
        "only_proxy": false,
        "no_cache": true,
        "no_upload": false,
        "need_ms": false,
        "default_root": "/",
        "CheckStatus": false
      }
    },
    "MediaTrack": {
      "common": [
        {
          "name": "mount_path",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "order",
          "type": "number",
          "default": "",
          "options": "",
          "required": false,
          "help": "use to sort"
        },
        {
          "name": "remark",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "cache_expiration",
          "type": "number",
          "default": "30",
          "options": "",
          "required": true,
          "help": "The cache expiration time for this storage"
        },
        {
          "name": "web_proxy",
          "type": "bool",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "webdav_policy",
          "type": "select",
          "default": "302_redirect",
          "options": "302_redirect,use_proxy_url,native_proxy",
          "required": true,
          "help": ""
        },
        {
          "name": "down_proxy_url",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "extract_folder",
          "type": "select",
          "default": "",
          "options": "front,back",
          "required": false,
          "help": ""
        }
      ],
      "additional": [
        {
          "name": "access_token",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "project_id",
          "type": "string",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "root_folder_id",
          "type": "string",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "order_by",
          "type": "select",
          "default": "title",
          "options": "updated_at,title,size",
          "required": false,
          "help": ""
        },
        {
          "name": "order_desc",
          "type": "bool",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        }
      ],
      "config": {
        "name": "MediaTrack",
        "local_sort": false,
        "only_local": false,
        "only_proxy": false,
        "no_cache": false,
        "no_upload": false,
        "need_ms": false,
        "default_root": "",
        "CheckStatus": false
      }
    },
    "Mega_nz": {
      "common": [
        {
          "name": "mount_path",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "order",
          "type": "number",
          "default": "",
          "options": "",
          "required": false,
          "help": "use to sort"
        },
        {
          "name": "remark",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "cache_expiration",
          "type": "number",
          "default": "30",
          "options": "",
          "required": true,
          "help": "The cache expiration time for this storage"
        },
        {
          "name": "webdav_policy",
          "type": "select",
          "default": "native_proxy",
          "options": "use_proxy_url,native_proxy",
          "required": true,
          "help": ""
        },
        {
          "name": "down_proxy_url",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "order_by",
          "type": "select",
          "default": "",
          "options": "name,size,modified",
          "required": false,
          "help": ""
        },
        {
          "name": "order_direction",
          "type": "select",
          "default": "",
          "options": "asc,desc",
          "required": false,
          "help": ""
        },
        {
          "name": "extract_folder",
          "type": "select",
          "default": "",
          "options": "front,back",
          "required": false,
          "help": ""
        }
      ],
      "additional": [
        {
          "name": "email",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "password",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        }
      ],
      "config": {
        "name": "Mega_nz",
        "local_sort": true,
        "only_local": true,
        "only_proxy": false,
        "no_cache": false,
        "no_upload": false,
        "need_ms": false,
        "default_root": "",
        "CheckStatus": false
      }
    },
    "Onedrive": {
      "common": [
        {
          "name": "mount_path",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "order",
          "type": "number",
          "default": "",
          "options": "",
          "required": false,
          "help": "use to sort"
        },
        {
          "name": "remark",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "cache_expiration",
          "type": "number",
          "default": "30",
          "options": "",
          "required": true,
          "help": "The cache expiration time for this storage"
        },
        {
          "name": "web_proxy",
          "type": "bool",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "webdav_policy",
          "type": "select",
          "default": "302_redirect",
          "options": "302_redirect,use_proxy_url,native_proxy",
          "required": true,
          "help": ""
        },
        {
          "name": "down_proxy_url",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "order_by",
          "type": "select",
          "default": "",
          "options": "name,size,modified",
          "required": false,
          "help": ""
        },
        {
          "name": "order_direction",
          "type": "select",
          "default": "",
          "options": "asc,desc",
          "required": false,
          "help": ""
        },
        {
          "name": "extract_folder",
          "type": "select",
          "default": "",
          "options": "front,back",
          "required": false,
          "help": ""
        }
      ],
      "additional": [
        {
          "name": "root_folder_path",
          "type": "string",
          "default": "/",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "region",
          "type": "select",
          "default": "global",
          "options": "global,cn,us,de",
          "required": true,
          "help": ""
        },
        {
          "name": "is_sharepoint",
          "type": "bool",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "client_id",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "client_secret",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "redirect_uri",
          "type": "string",
          "default": "https://tool.nn.ci/onedrive/callback",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "refresh_token",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "site_id",
          "type": "string",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "chunk_size",
          "type": "number",
          "default": "5",
          "options": "",
          "required": false,
          "help": ""
        }
      ],
      "config": {
        "name": "Onedrive",
        "local_sort": true,
        "only_local": false,
        "only_proxy": false,
        "no_cache": false,
        "no_upload": false,
        "need_ms": false,
        "default_root": "/",
        "CheckStatus": false
      }
    },
    "PikPak": {
      "common": [
        {
          "name": "mount_path",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "order",
          "type": "number",
          "default": "",
          "options": "",
          "required": false,
          "help": "use to sort"
        },
        {
          "name": "remark",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "cache_expiration",
          "type": "number",
          "default": "30",
          "options": "",
          "required": true,
          "help": "The cache expiration time for this storage"
        },
        {
          "name": "web_proxy",
          "type": "bool",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "webdav_policy",
          "type": "select",
          "default": "302_redirect",
          "options": "302_redirect,use_proxy_url,native_proxy",
          "required": true,
          "help": ""
        },
        {
          "name": "down_proxy_url",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "order_by",
          "type": "select",
          "default": "",
          "options": "name,size,modified",
          "required": false,
          "help": ""
        },
        {
          "name": "order_direction",
          "type": "select",
          "default": "",
          "options": "asc,desc",
          "required": false,
          "help": ""
        },
        {
          "name": "extract_folder",
          "type": "select",
          "default": "",
          "options": "front,back",
          "required": false,
          "help": ""
        }
      ],
      "additional": [
        {
          "name": "root_folder_id",
          "type": "string",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "username",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "password",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        }
      ],
      "config": {
        "name": "PikPak",
        "local_sort": true,
        "only_local": false,
        "only_proxy": false,
        "no_cache": false,
        "no_upload": false,
        "need_ms": false,
        "default_root": "",
        "CheckStatus": false
      }
    },
    "Quark": {
      "common": [
        {
          "name": "mount_path",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "order",
          "type": "number",
          "default": "",
          "options": "",
          "required": false,
          "help": "use to sort"
        },
        {
          "name": "remark",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "cache_expiration",
          "type": "number",
          "default": "30",
          "options": "",
          "required": true,
          "help": "The cache expiration time for this storage"
        },
        {
          "name": "webdav_policy",
          "type": "select",
          "default": "native_proxy",
          "options": "use_proxy_url,native_proxy",
          "required": true,
          "help": ""
        },
        {
          "name": "down_proxy_url",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "extract_folder",
          "type": "select",
          "default": "",
          "options": "front,back",
          "required": false,
          "help": ""
        }
      ],
      "additional": [
        {
          "name": "cookie",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "root_folder_id",
          "type": "string",
          "default": "0",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "order_by",
          "type": "select",
          "default": "none",
          "options": "none,file_type,file_name,updated_at",
          "required": false,
          "help": ""
        },
        {
          "name": "order_direction",
          "type": "select",
          "default": "asc",
          "options": "asc,desc",
          "required": false,
          "help": ""
        }
      ],
      "config": {
        "name": "Quark",
        "local_sort": false,
        "only_local": false,
        "only_proxy": true,
        "no_cache": false,
        "no_upload": false,
        "need_ms": false,
        "default_root": "0",
        "CheckStatus": false
      }
    },
    "S3": {
      "common": [
        {
          "name": "mount_path",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "order",
          "type": "number",
          "default": "",
          "options": "",
          "required": false,
          "help": "use to sort"
        },
        {
          "name": "remark",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "cache_expiration",
          "type": "number",
          "default": "30",
          "options": "",
          "required": true,
          "help": "The cache expiration time for this storage"
        },
        {
          "name": "web_proxy",
          "type": "bool",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "webdav_policy",
          "type": "select",
          "default": "302_redirect",
          "options": "302_redirect,use_proxy_url,native_proxy",
          "required": true,
          "help": ""
        },
        {
          "name": "down_proxy_url",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "order_by",
          "type": "select",
          "default": "",
          "options": "name,size,modified",
          "required": false,
          "help": ""
        },
        {
          "name": "order_direction",
          "type": "select",
          "default": "",
          "options": "asc,desc",
          "required": false,
          "help": ""
        },
        {
          "name": "extract_folder",
          "type": "select",
          "default": "",
          "options": "front,back",
          "required": false,
          "help": ""
        }
      ],
      "additional": [
        {
          "name": "root_folder_path",
          "type": "string",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "bucket",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "endpoint",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "region",
          "type": "string",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "access_key_id",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "secret_access_key",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "custom_host",
          "type": "string",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "sign_url_expire",
          "type": "number",
          "default": "4",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "placeholder",
          "type": "string",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "force_path_style",
          "type": "bool",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "list_object_version",
          "type": "select",
          "default": "v1",
          "options": "v1,v2",
          "required": false,
          "help": ""
        }
      ],
      "config": {
        "name": "S3",
        "local_sort": true,
        "only_local": false,
        "only_proxy": false,
        "no_cache": false,
        "no_upload": false,
        "need_ms": false,
        "default_root": "",
        "CheckStatus": true
      }
    },
    "SFTP": {
      "common": [
        {
          "name": "mount_path",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "order",
          "type": "number",
          "default": "",
          "options": "",
          "required": false,
          "help": "use to sort"
        },
        {
          "name": "remark",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "cache_expiration",
          "type": "number",
          "default": "30",
          "options": "",
          "required": true,
          "help": "The cache expiration time for this storage"
        },
        {
          "name": "webdav_policy",
          "type": "select",
          "default": "native_proxy",
          "options": "use_proxy_url,native_proxy",
          "required": true,
          "help": ""
        },
        {
          "name": "down_proxy_url",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "order_by",
          "type": "select",
          "default": "",
          "options": "name,size,modified",
          "required": false,
          "help": ""
        },
        {
          "name": "order_direction",
          "type": "select",
          "default": "",
          "options": "asc,desc",
          "required": false,
          "help": ""
        },
        {
          "name": "extract_folder",
          "type": "select",
          "default": "",
          "options": "front,back",
          "required": false,
          "help": ""
        }
      ],
      "additional": [
        {
          "name": "address",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "username",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "private_key",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "password",
          "type": "string",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "root_folder_path",
          "type": "string",
          "default": "/",
          "options": "",
          "required": true,
          "help": ""
        }
      ],
      "config": {
        "name": "SFTP",
        "local_sort": true,
        "only_local": true,
        "only_proxy": false,
        "no_cache": false,
        "no_upload": false,
        "need_ms": false,
        "default_root": "/",
        "CheckStatus": true
      }
    },
    "SMB": {
      "common": [
        {
          "name": "mount_path",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "order",
          "type": "number",
          "default": "",
          "options": "",
          "required": false,
          "help": "use to sort"
        },
        {
          "name": "remark",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "webdav_policy",
          "type": "select",
          "default": "native_proxy",
          "options": "use_proxy_url,native_proxy",
          "required": true,
          "help": ""
        },
        {
          "name": "down_proxy_url",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "order_by",
          "type": "select",
          "default": "",
          "options": "name,size,modified",
          "required": false,
          "help": ""
        },
        {
          "name": "order_direction",
          "type": "select",
          "default": "",
          "options": "asc,desc",
          "required": false,
          "help": ""
        },
        {
          "name": "extract_folder",
          "type": "select",
          "default": "",
          "options": "front,back",
          "required": false,
          "help": ""
        }
      ],
      "additional": [
        {
          "name": "root_folder_path",
          "type": "string",
          "default": ".",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "address",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "username",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "password",
          "type": "string",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "share_name",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        }
      ],
      "config": {
        "name": "SMB",
        "local_sort": true,
        "only_local": true,
        "only_proxy": false,
        "no_cache": true,
        "no_upload": false,
        "need_ms": false,
        "default_root": ".",
        "CheckStatus": false
      }
    },
    "Teambition": {
      "common": [
        {
          "name": "mount_path",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "order",
          "type": "number",
          "default": "",
          "options": "",
          "required": false,
          "help": "use to sort"
        },
        {
          "name": "remark",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "cache_expiration",
          "type": "number",
          "default": "30",
          "options": "",
          "required": true,
          "help": "The cache expiration time for this storage"
        },
        {
          "name": "web_proxy",
          "type": "bool",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "webdav_policy",
          "type": "select",
          "default": "302_redirect",
          "options": "302_redirect,use_proxy_url,native_proxy",
          "required": true,
          "help": ""
        },
        {
          "name": "down_proxy_url",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "extract_folder",
          "type": "select",
          "default": "",
          "options": "front,back",
          "required": false,
          "help": ""
        }
      ],
      "additional": [
        {
          "name": "region",
          "type": "select",
          "default": "",
          "options": "china,international",
          "required": true,
          "help": ""
        },
        {
          "name": "cookie",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "project_id",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "root_folder_id",
          "type": "string",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "order_by",
          "type": "select",
          "default": "fileName",
          "options": "fileName,fileSize,updated,created",
          "required": false,
          "help": ""
        },
        {
          "name": "order_direction",
          "type": "select",
          "default": "Asc",
          "options": "Asc,Desc",
          "required": false,
          "help": ""
        }
      ],
      "config": {
        "name": "Teambition",
        "local_sort": false,
        "only_local": false,
        "only_proxy": false,
        "no_cache": false,
        "no_upload": false,
        "need_ms": false,
        "default_root": "",
        "CheckStatus": false
      }
    },
    "Thunder": {
      "common": [
        {
          "name": "mount_path",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "order",
          "type": "number",
          "default": "",
          "options": "",
          "required": false,
          "help": "use to sort"
        },
        {
          "name": "remark",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "cache_expiration",
          "type": "number",
          "default": "30",
          "options": "",
          "required": true,
          "help": "The cache expiration time for this storage"
        },
        {
          "name": "webdav_policy",
          "type": "select",
          "default": "native_proxy",
          "options": "use_proxy_url,native_proxy",
          "required": true,
          "help": ""
        },
        {
          "name": "down_proxy_url",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "order_by",
          "type": "select",
          "default": "",
          "options": "name,size,modified",
          "required": false,
          "help": ""
        },
        {
          "name": "order_direction",
          "type": "select",
          "default": "",
          "options": "asc,desc",
          "required": false,
          "help": ""
        },
        {
          "name": "extract_folder",
          "type": "select",
          "default": "",
          "options": "front,back",
          "required": false,
          "help": ""
        }
      ],
      "additional": [
        {
          "name": "root_folder_id",
          "type": "string",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "username",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "password",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "captcha_token",
          "type": "string",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        }
      ],
      "config": {
        "name": "Thunder",
        "local_sort": true,
        "only_local": false,
        "only_proxy": true,
        "no_cache": false,
        "no_upload": false,
        "need_ms": false,
        "default_root": "",
        "CheckStatus": false
      }
    },
    "ThunderExpert": {
      "common": [
        {
          "name": "mount_path",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "order",
          "type": "number",
          "default": "",
          "options": "",
          "required": false,
          "help": "use to sort"
        },
        {
          "name": "remark",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "cache_expiration",
          "type": "number",
          "default": "30",
          "options": "",
          "required": true,
          "help": "The cache expiration time for this storage"
        },
        {
          "name": "web_proxy",
          "type": "bool",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "webdav_policy",
          "type": "select",
          "default": "302_redirect",
          "options": "302_redirect,use_proxy_url,native_proxy",
          "required": true,
          "help": ""
        },
        {
          "name": "down_proxy_url",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "order_by",
          "type": "select",
          "default": "",
          "options": "name,size,modified",
          "required": false,
          "help": ""
        },
        {
          "name": "order_direction",
          "type": "select",
          "default": "",
          "options": "asc,desc",
          "required": false,
          "help": ""
        },
        {
          "name": "extract_folder",
          "type": "select",
          "default": "",
          "options": "front,back",
          "required": false,
          "help": ""
        }
      ],
      "additional": [
        {
          "name": "root_folder_id",
          "type": "string",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "login_type",
          "type": "select",
          "default": "user",
          "options": "user,refresh_token",
          "required": false,
          "help": ""
        },
        {
          "name": "sign_type",
          "type": "select",
          "default": "algorithms",
          "options": "algorithms,captcha_sign",
          "required": false,
          "help": ""
        },
        {
          "name": "username",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": "login type is user,this is required"
        },
        {
          "name": "password",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": "login type is user,this is required"
        },
        {
          "name": "refresh_token",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": "login type is refresh_token,this is required"
        },
        {
          "name": "algorithms",
          "type": "string",
          "default": "HPxr4BVygTQVtQkIMwQH33ywbgYG5l4JoR,GzhNkZ8pOBsCY+7,v+l0ImTpG7c7/,e5ztohgVXNP,t,EbXUWyVVqQbQX39Mbjn2geok3/0WEkAVxeqhtx857++kjJiRheP8l77gO,o7dvYgbRMOpHXxCs,6MW8TD8DphmakaxCqVrfv7NReRRN7ck3KLnXBculD58MvxjFRqT+,kmo0HxCKVfmxoZswLB4bVA/dwqbVAYghSb,j,4scKJNdd7F27Hv7tbt",
          "options": "",
          "required": true,
          "help": "sign type is algorithms,this is required"
        },
        {
          "name": "captcha_sign",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": "sign type is captcha_sign,this is required"
        },
        {
          "name": "timestamp",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": "sign type is captcha_sign,this is required"
        },
        {
          "name": "captcha_token",
          "type": "string",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "device_id",
          "type": "string",
          "default": "9aa5c268e7bcfc197a9ad88e2fb330e5",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "client_id",
          "type": "string",
          "default": "Xp6vsxz_7IYVw2BB",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "client_secret",
          "type": "string",
          "default": "Xp6vsy4tN9toTVdMSpomVdXpRmES",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "client_version",
          "type": "string",
          "default": "7.51.0.8196",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "package_name",
          "type": "string",
          "default": "com.xunlei.downloadprovider",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "user_agent",
          "type": "string",
          "default": "ANDROID-com.xunlei.downloadprovider/7.51.0.8196 netWorkType/4G appid/40 deviceName/Xiaomi_M2004j7ac deviceModel/M2004J7AC OSVersion/12 protocolVersion/301 platformVersion/10 sdkVersion/220200 Oauth2Client/0.9 (Linux 4_14_186-perf-gdcf98eab238b) (JAVA 0)",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "download_user_agent",
          "type": "string",
          "default": "Dalvik/2.1.0 (Linux; U; Android 12; M2004J7AC Build/SP1A.210812.016)",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "use_video_url",
          "type": "bool",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        }
      ],
      "config": {
        "name": "ThunderExpert",
        "local_sort": true,
        "only_local": false,
        "only_proxy": false,
        "no_cache": false,
        "no_upload": false,
        "need_ms": false,
        "default_root": "",
        "CheckStatus": false
      }
    },
    "USS": {
      "common": [
        {
          "name": "mount_path",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "order",
          "type": "number",
          "default": "",
          "options": "",
          "required": false,
          "help": "use to sort"
        },
        {
          "name": "remark",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "cache_expiration",
          "type": "number",
          "default": "30",
          "options": "",
          "required": true,
          "help": "The cache expiration time for this storage"
        },
        {
          "name": "web_proxy",
          "type": "bool",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "webdav_policy",
          "type": "select",
          "default": "302_redirect",
          "options": "302_redirect,use_proxy_url,native_proxy",
          "required": true,
          "help": ""
        },
        {
          "name": "down_proxy_url",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "order_by",
          "type": "select",
          "default": "",
          "options": "name,size,modified",
          "required": false,
          "help": ""
        },
        {
          "name": "order_direction",
          "type": "select",
          "default": "",
          "options": "asc,desc",
          "required": false,
          "help": ""
        },
        {
          "name": "extract_folder",
          "type": "select",
          "default": "",
          "options": "front,back",
          "required": false,
          "help": ""
        }
      ],
      "additional": [
        {
          "name": "root_folder_path",
          "type": "string",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "bucket",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "endpoint",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "operator_name",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "operator_password",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "custom_host",
          "type": "string",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "sign_url_expire",
          "type": "number",
          "default": "4",
          "options": "",
          "required": false,
          "help": ""
        }
      ],
      "config": {
        "name": "USS",
        "local_sort": true,
        "only_local": false,
        "only_proxy": false,
        "no_cache": false,
        "no_upload": false,
        "need_ms": false,
        "default_root": "",
        "CheckStatus": false
      }
    },
    "Virtual": {
      "common": [
        {
          "name": "mount_path",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "order",
          "type": "number",
          "default": "",
          "options": "",
          "required": false,
          "help": "use to sort"
        },
        {
          "name": "remark",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "cache_expiration",
          "type": "number",
          "default": "30",
          "options": "",
          "required": true,
          "help": "The cache expiration time for this storage"
        },
        {
          "name": "webdav_policy",
          "type": "select",
          "default": "native_proxy",
          "options": "use_proxy_url,native_proxy",
          "required": true,
          "help": ""
        },
        {
          "name": "down_proxy_url",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "order_by",
          "type": "select",
          "default": "",
          "options": "name,size,modified",
          "required": false,
          "help": ""
        },
        {
          "name": "order_direction",
          "type": "select",
          "default": "",
          "options": "asc,desc",
          "required": false,
          "help": ""
        },
        {
          "name": "extract_folder",
          "type": "select",
          "default": "",
          "options": "front,back",
          "required": false,
          "help": ""
        }
      ],
      "additional": [
        {
          "name": "root_folder_path",
          "type": "string",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "num_file",
          "type": "number",
          "default": "30",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "num_folder",
          "type": "number",
          "default": "30",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "max_file_size",
          "type": "number",
          "default": "1073741824",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "min_file_size",
          "type": "number",
          "default": "1048576",
          "options": "",
          "required": true,
          "help": ""
        }
      ],
      "config": {
        "name": "Virtual",
        "local_sort": true,
        "only_local": true,
        "only_proxy": false,
        "no_cache": false,
        "no_upload": false,
        "need_ms": true,
        "default_root": "",
        "CheckStatus": false
      }
    },
    "WebDav": {
      "common": [
        {
          "name": "mount_path",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "order",
          "type": "number",
          "default": "",
          "options": "",
          "required": false,
          "help": "use to sort"
        },
        {
          "name": "remark",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "cache_expiration",
          "type": "number",
          "default": "30",
          "options": "",
          "required": true,
          "help": "The cache expiration time for this storage"
        },
        {
          "name": "webdav_policy",
          "type": "select",
          "default": "native_proxy",
          "options": "use_proxy_url,native_proxy",
          "required": true,
          "help": ""
        },
        {
          "name": "down_proxy_url",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "order_by",
          "type": "select",
          "default": "",
          "options": "name,size,modified",
          "required": false,
          "help": ""
        },
        {
          "name": "order_direction",
          "type": "select",
          "default": "",
          "options": "asc,desc",
          "required": false,
          "help": ""
        },
        {
          "name": "extract_folder",
          "type": "select",
          "default": "",
          "options": "front,back",
          "required": false,
          "help": ""
        }
      ],
      "additional": [
        {
          "name": "vendor",
          "type": "select",
          "default": "other",
          "options": "sharepoint,other",
          "required": false,
          "help": ""
        },
        {
          "name": "address",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "username",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "password",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "root_folder_path",
          "type": "string",
          "default": "/",
          "options": "",
          "required": true,
          "help": ""
        }
      ],
      "config": {
        "name": "WebDav",
        "local_sort": true,
        "only_local": true,
        "only_proxy": false,
        "no_cache": false,
        "no_upload": false,
        "need_ms": false,
        "default_root": "/",
        "CheckStatus": false
      }
    },
    "YandexDisk": {
      "common": [
        {
          "name": "mount_path",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "order",
          "type": "number",
          "default": "",
          "options": "",
          "required": false,
          "help": "use to sort"
        },
        {
          "name": "remark",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "cache_expiration",
          "type": "number",
          "default": "30",
          "options": "",
          "required": true,
          "help": "The cache expiration time for this storage"
        },
        {
          "name": "web_proxy",
          "type": "bool",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "webdav_policy",
          "type": "select",
          "default": "302_redirect",
          "options": "302_redirect,use_proxy_url,native_proxy",
          "required": true,
          "help": ""
        },
        {
          "name": "down_proxy_url",
          "type": "text",
          "default": "",
          "options": "",
          "required": false,
          "help": ""
        },
        {
          "name": "extract_folder",
          "type": "select",
          "default": "",
          "options": "front,back",
          "required": false,
          "help": ""
        }
      ],
      "additional": [
        {
          "name": "refresh_token",
          "type": "string",
          "default": "",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "order_by",
          "type": "select",
          "default": "name",
          "options": "name,path,created,modified,size",
          "required": false,
          "help": ""
        },
        {
          "name": "order_direction",
          "type": "select",
          "default": "asc",
          "options": "asc,desc",
          "required": false,
          "help": ""
        },
        {
          "name": "root_folder_path",
          "type": "string",
          "default": "/",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "client_id",
          "type": "string",
          "default": "a78d5a69054042fa936f6c77f9a0ae8b",
          "options": "",
          "required": true,
          "help": ""
        },
        {
          "name": "client_secret",
          "type": "string",
          "default": "9c119bbb04b346d2a52aa64401936b2b",
          "options": "",
          "required": true,
          "help": ""
        }
      ],
      "config": {
        "name": "YandexDisk",
        "local_sort": false,
        "only_local": false,
        "only_proxy": false,
        "no_cache": false,
        "no_upload": false,
        "need_ms": false,
        "default_root": "/",
        "CheckStatus": false
      }
    }
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» message|string|true|none||信息|
|» data|object|true|none||none|
|»» 115 Cloud|object|true|none||none|
|»»» common|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» additional|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» config|object|true|none||none|
|»»»» name|string|true|none||none|
|»»»» local_sort|boolean|true|none||none|
|»»»» only_local|boolean|true|none||none|
|»»»» only_proxy|boolean|true|none||none|
|»»»» no_cache|boolean|true|none||none|
|»»»» no_upload|boolean|true|none||none|
|»»»» need_ms|boolean|true|none||none|
|»»»» default_root|string|true|none||none|
|»»»» CheckStatus|boolean|true|none||none|
|»» 123Pan|object|true|none||none|
|»»» common|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» additional|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» config|object|true|none||none|
|»»»» name|string|true|none||none|
|»»»» local_sort|boolean|true|none||none|
|»»»» only_local|boolean|true|none||none|
|»»»» only_proxy|boolean|true|none||none|
|»»»» no_cache|boolean|true|none||none|
|»»»» no_upload|boolean|true|none||none|
|»»»» need_ms|boolean|true|none||none|
|»»»» default_root|string|true|none||none|
|»»»» CheckStatus|boolean|true|none||none|
|»» 139Yun|object|true|none||none|
|»»» common|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» additional|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» config|object|true|none||none|
|»»»» name|string|true|none||none|
|»»»» local_sort|boolean|true|none||none|
|»»»» only_local|boolean|true|none||none|
|»»»» only_proxy|boolean|true|none||none|
|»»»» no_cache|boolean|true|none||none|
|»»»» no_upload|boolean|true|none||none|
|»»»» need_ms|boolean|true|none||none|
|»»»» default_root|string|true|none||none|
|»»»» CheckStatus|boolean|true|none||none|
|»» 189Cloud|object|true|none||none|
|»»» common|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» additional|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» config|object|true|none||none|
|»»»» name|string|true|none||none|
|»»»» local_sort|boolean|true|none||none|
|»»»» only_local|boolean|true|none||none|
|»»»» only_proxy|boolean|true|none||none|
|»»»» no_cache|boolean|true|none||none|
|»»»» no_upload|boolean|true|none||none|
|»»»» need_ms|boolean|true|none||none|
|»»»» default_root|string|true|none||none|
|»»»» CheckStatus|boolean|true|none||none|
|»» 189CloudPC|object|true|none||none|
|»»» common|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» additional|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» config|object|true|none||none|
|»»»» name|string|true|none||none|
|»»»» local_sort|boolean|true|none||none|
|»»»» only_local|boolean|true|none||none|
|»»»» only_proxy|boolean|true|none||none|
|»»»» no_cache|boolean|true|none||none|
|»»»» no_upload|boolean|true|none||none|
|»»»» need_ms|boolean|true|none||none|
|»»»» default_root|string|true|none||none|
|»»»» CheckStatus|boolean|true|none||none|
|»» AList V2|object|true|none||none|
|»»» common|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» additional|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» config|object|true|none||none|
|»»»» name|string|true|none||none|
|»»»» local_sort|boolean|true|none||none|
|»»»» only_local|boolean|true|none||none|
|»»»» only_proxy|boolean|true|none||none|
|»»»» no_cache|boolean|true|none||none|
|»»»» no_upload|boolean|true|none||none|
|»»»» need_ms|boolean|true|none||none|
|»»»» default_root|string|true|none||none|
|»»»» CheckStatus|boolean|true|none||none|
|»» AList V3|object|true|none||none|
|»»» common|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» additional|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» config|object|true|none||none|
|»»»» name|string|true|none||none|
|»»»» local_sort|boolean|true|none||none|
|»»»» only_local|boolean|true|none||none|
|»»»» only_proxy|boolean|true|none||none|
|»»»» no_cache|boolean|true|none||none|
|»»»» no_upload|boolean|true|none||none|
|»»»» need_ms|boolean|true|none||none|
|»»»» default_root|string|true|none||none|
|»»»» CheckStatus|boolean|true|none||none|
|»» Aliyundrive|object|true|none||none|
|»»» common|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» additional|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» config|object|true|none||none|
|»»»» name|string|true|none||none|
|»»»» local_sort|boolean|true|none||none|
|»»»» only_local|boolean|true|none||none|
|»»»» only_proxy|boolean|true|none||none|
|»»»» no_cache|boolean|true|none||none|
|»»»» no_upload|boolean|true|none||none|
|»»»» need_ms|boolean|true|none||none|
|»»»» default_root|string|true|none||none|
|»»»» CheckStatus|boolean|true|none||none|
|»» AliyundriveShare|object|true|none||none|
|»»» common|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» additional|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» config|object|true|none||none|
|»»»» name|string|true|none||none|
|»»»» local_sort|boolean|true|none||none|
|»»»» only_local|boolean|true|none||none|
|»»»» only_proxy|boolean|true|none||none|
|»»»» no_cache|boolean|true|none||none|
|»»»» no_upload|boolean|true|none||none|
|»»»» need_ms|boolean|true|none||none|
|»»»» default_root|string|true|none||none|
|»»»» CheckStatus|boolean|true|none||none|
|»» BaiduNetdisk|object|true|none||none|
|»»» common|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» additional|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» config|object|true|none||none|
|»»»» name|string|true|none||none|
|»»»» local_sort|boolean|true|none||none|
|»»»» only_local|boolean|true|none||none|
|»»»» only_proxy|boolean|true|none||none|
|»»»» no_cache|boolean|true|none||none|
|»»»» no_upload|boolean|true|none||none|
|»»»» need_ms|boolean|true|none||none|
|»»»» default_root|string|true|none||none|
|»»»» CheckStatus|boolean|true|none||none|
|»» BaiduPhoto|object|true|none||none|
|»»» common|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» additional|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» config|object|true|none||none|
|»»»» name|string|true|none||none|
|»»»» local_sort|boolean|true|none||none|
|»»»» only_local|boolean|true|none||none|
|»»»» only_proxy|boolean|true|none||none|
|»»»» no_cache|boolean|true|none||none|
|»»»» no_upload|boolean|true|none||none|
|»»»» need_ms|boolean|true|none||none|
|»»»» default_root|string|true|none||none|
|»»»» CheckStatus|boolean|true|none||none|
|»» FTP|object|true|none||none|
|»»» common|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» additional|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» config|object|true|none||none|
|»»»» name|string|true|none||none|
|»»»» local_sort|boolean|true|none||none|
|»»»» only_local|boolean|true|none||none|
|»»»» only_proxy|boolean|true|none||none|
|»»»» no_cache|boolean|true|none||none|
|»»»» no_upload|boolean|true|none||none|
|»»»» need_ms|boolean|true|none||none|
|»»»» default_root|string|true|none||none|
|»»»» CheckStatus|boolean|true|none||none|
|»» GoogleDrive|object|true|none||none|
|»»» common|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» additional|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» config|object|true|none||none|
|»»»» name|string|true|none||none|
|»»»» local_sort|boolean|true|none||none|
|»»»» only_local|boolean|true|none||none|
|»»»» only_proxy|boolean|true|none||none|
|»»»» no_cache|boolean|true|none||none|
|»»»» no_upload|boolean|true|none||none|
|»»»» need_ms|boolean|true|none||none|
|»»»» default_root|string|true|none||none|
|»»»» CheckStatus|boolean|true|none||none|
|»» GooglePhoto|object|true|none||none|
|»»» common|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» additional|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» config|object|true|none||none|
|»»»» name|string|true|none||none|
|»»»» local_sort|boolean|true|none||none|
|»»»» only_local|boolean|true|none||none|
|»»»» only_proxy|boolean|true|none||none|
|»»»» no_cache|boolean|true|none||none|
|»»»» no_upload|boolean|true|none||none|
|»»»» need_ms|boolean|true|none||none|
|»»»» default_root|string|true|none||none|
|»»»» CheckStatus|boolean|true|none||none|
|»» Lanzou|object|true|none||none|
|»»» common|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» additional|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» config|object|true|none||none|
|»»»» name|string|true|none||none|
|»»»» local_sort|boolean|true|none||none|
|»»»» only_local|boolean|true|none||none|
|»»»» only_proxy|boolean|true|none||none|
|»»»» no_cache|boolean|true|none||none|
|»»»» no_upload|boolean|true|none||none|
|»»»» need_ms|boolean|true|none||none|
|»»»» default_root|string|true|none||none|
|»»»» CheckStatus|boolean|true|none||none|
|»» Local|object|true|none||none|
|»»» common|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» additional|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» config|object|true|none||none|
|»»»» name|string|true|none||none|
|»»»» local_sort|boolean|true|none||none|
|»»»» only_local|boolean|true|none||none|
|»»»» only_proxy|boolean|true|none||none|
|»»»» no_cache|boolean|true|none||none|
|»»»» no_upload|boolean|true|none||none|
|»»»» need_ms|boolean|true|none||none|
|»»»» default_root|string|true|none||none|
|»»»» CheckStatus|boolean|true|none||none|
|»» MediaTrack|object|true|none||none|
|»»» common|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» additional|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» config|object|true|none||none|
|»»»» name|string|true|none||none|
|»»»» local_sort|boolean|true|none||none|
|»»»» only_local|boolean|true|none||none|
|»»»» only_proxy|boolean|true|none||none|
|»»»» no_cache|boolean|true|none||none|
|»»»» no_upload|boolean|true|none||none|
|»»»» need_ms|boolean|true|none||none|
|»»»» default_root|string|true|none||none|
|»»»» CheckStatus|boolean|true|none||none|
|»» Mega_nz|object|true|none||none|
|»»» common|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» additional|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» config|object|true|none||none|
|»»»» name|string|true|none||none|
|»»»» local_sort|boolean|true|none||none|
|»»»» only_local|boolean|true|none||none|
|»»»» only_proxy|boolean|true|none||none|
|»»»» no_cache|boolean|true|none||none|
|»»»» no_upload|boolean|true|none||none|
|»»»» need_ms|boolean|true|none||none|
|»»»» default_root|string|true|none||none|
|»»»» CheckStatus|boolean|true|none||none|
|»» Onedrive|object|true|none||none|
|»»» common|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» additional|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» config|object|true|none||none|
|»»»» name|string|true|none||none|
|»»»» local_sort|boolean|true|none||none|
|»»»» only_local|boolean|true|none||none|
|»»»» only_proxy|boolean|true|none||none|
|»»»» no_cache|boolean|true|none||none|
|»»»» no_upload|boolean|true|none||none|
|»»»» need_ms|boolean|true|none||none|
|»»»» default_root|string|true|none||none|
|»»»» CheckStatus|boolean|true|none||none|
|»» PikPak|object|true|none||none|
|»»» common|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» additional|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» config|object|true|none||none|
|»»»» name|string|true|none||none|
|»»»» local_sort|boolean|true|none||none|
|»»»» only_local|boolean|true|none||none|
|»»»» only_proxy|boolean|true|none||none|
|»»»» no_cache|boolean|true|none||none|
|»»»» no_upload|boolean|true|none||none|
|»»»» need_ms|boolean|true|none||none|
|»»»» default_root|string|true|none||none|
|»»»» CheckStatus|boolean|true|none||none|
|»» Quark|object|true|none||none|
|»»» common|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» additional|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» config|object|true|none||none|
|»»»» name|string|true|none||none|
|»»»» local_sort|boolean|true|none||none|
|»»»» only_local|boolean|true|none||none|
|»»»» only_proxy|boolean|true|none||none|
|»»»» no_cache|boolean|true|none||none|
|»»»» no_upload|boolean|true|none||none|
|»»»» need_ms|boolean|true|none||none|
|»»»» default_root|string|true|none||none|
|»»»» CheckStatus|boolean|true|none||none|
|»» S3|object|true|none||none|
|»»» common|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» additional|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» config|object|true|none||none|
|»»»» name|string|true|none||none|
|»»»» local_sort|boolean|true|none||none|
|»»»» only_local|boolean|true|none||none|
|»»»» only_proxy|boolean|true|none||none|
|»»»» no_cache|boolean|true|none||none|
|»»»» no_upload|boolean|true|none||none|
|»»»» need_ms|boolean|true|none||none|
|»»»» default_root|string|true|none||none|
|»»»» CheckStatus|boolean|true|none||none|
|»» SFTP|object|true|none||none|
|»»» common|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» additional|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» config|object|true|none||none|
|»»»» name|string|true|none||none|
|»»»» local_sort|boolean|true|none||none|
|»»»» only_local|boolean|true|none||none|
|»»»» only_proxy|boolean|true|none||none|
|»»»» no_cache|boolean|true|none||none|
|»»»» no_upload|boolean|true|none||none|
|»»»» need_ms|boolean|true|none||none|
|»»»» default_root|string|true|none||none|
|»»»» CheckStatus|boolean|true|none||none|
|»» SMB|object|true|none||none|
|»»» common|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» additional|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» config|object|true|none||none|
|»»»» name|string|true|none||none|
|»»»» local_sort|boolean|true|none||none|
|»»»» only_local|boolean|true|none||none|
|»»»» only_proxy|boolean|true|none||none|
|»»»» no_cache|boolean|true|none||none|
|»»»» no_upload|boolean|true|none||none|
|»»»» need_ms|boolean|true|none||none|
|»»»» default_root|string|true|none||none|
|»»»» CheckStatus|boolean|true|none||none|
|»» Teambition|object|true|none||none|
|»»» common|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» additional|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» config|object|true|none||none|
|»»»» name|string|true|none||none|
|»»»» local_sort|boolean|true|none||none|
|»»»» only_local|boolean|true|none||none|
|»»»» only_proxy|boolean|true|none||none|
|»»»» no_cache|boolean|true|none||none|
|»»»» no_upload|boolean|true|none||none|
|»»»» need_ms|boolean|true|none||none|
|»»»» default_root|string|true|none||none|
|»»»» CheckStatus|boolean|true|none||none|
|»» Thunder|object|true|none||none|
|»»» common|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» additional|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» config|object|true|none||none|
|»»»» name|string|true|none||none|
|»»»» local_sort|boolean|true|none||none|
|»»»» only_local|boolean|true|none||none|
|»»»» only_proxy|boolean|true|none||none|
|»»»» no_cache|boolean|true|none||none|
|»»»» no_upload|boolean|true|none||none|
|»»»» need_ms|boolean|true|none||none|
|»»»» default_root|string|true|none||none|
|»»»» CheckStatus|boolean|true|none||none|
|»» ThunderExpert|object|true|none||none|
|»»» common|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» additional|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» config|object|true|none||none|
|»»»» name|string|true|none||none|
|»»»» local_sort|boolean|true|none||none|
|»»»» only_local|boolean|true|none||none|
|»»»» only_proxy|boolean|true|none||none|
|»»»» no_cache|boolean|true|none||none|
|»»»» no_upload|boolean|true|none||none|
|»»»» need_ms|boolean|true|none||none|
|»»»» default_root|string|true|none||none|
|»»»» CheckStatus|boolean|true|none||none|
|»» USS|object|true|none||none|
|»»» common|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» additional|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» config|object|true|none||none|
|»»»» name|string|true|none||none|
|»»»» local_sort|boolean|true|none||none|
|»»»» only_local|boolean|true|none||none|
|»»»» only_proxy|boolean|true|none||none|
|»»»» no_cache|boolean|true|none||none|
|»»»» no_upload|boolean|true|none||none|
|»»»» need_ms|boolean|true|none||none|
|»»»» default_root|string|true|none||none|
|»»»» CheckStatus|boolean|true|none||none|
|»» Virtual|object|true|none||none|
|»»» common|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» additional|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» config|object|true|none||none|
|»»»» name|string|true|none||none|
|»»»» local_sort|boolean|true|none||none|
|»»»» only_local|boolean|true|none||none|
|»»»» only_proxy|boolean|true|none||none|
|»»»» no_cache|boolean|true|none||none|
|»»»» no_upload|boolean|true|none||none|
|»»»» need_ms|boolean|true|none||none|
|»»»» default_root|string|true|none||none|
|»»»» CheckStatus|boolean|true|none||none|
|»» WebDav|object|true|none||none|
|»»» common|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» additional|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» config|object|true|none||none|
|»»»» name|string|true|none||none|
|»»»» local_sort|boolean|true|none||none|
|»»»» only_local|boolean|true|none||none|
|»»»» only_proxy|boolean|true|none||none|
|»»»» no_cache|boolean|true|none||none|
|»»»» no_upload|boolean|true|none||none|
|»»»» need_ms|boolean|true|none||none|
|»»»» default_root|string|true|none||none|
|»»»» CheckStatus|boolean|true|none||none|
|»» YandexDisk|object|true|none||none|
|»»» common|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» additional|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» default|string|true|none||none|
|»»»» options|string|true|none||none|
|»»»» required|boolean|true|none||none|
|»»»» help|string|true|none||none|
|»»» config|object|true|none||none|
|»»»» name|string|true|none||none|
|»»»» local_sort|boolean|true|none||none|
|»»»» only_local|boolean|true|none||none|
|»»»» only_proxy|boolean|true|none||none|
|»»»» no_cache|boolean|true|none||none|
|»»»» no_upload|boolean|true|none||none|
|»»»» need_ms|boolean|true|none||none|
|»»»» default_root|string|true|none||none|
|»»»» CheckStatus|boolean|true|none||none|

## POST 删除指定存储

POST /api/admin/storage/delete

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|query|string| 否 |存储id|
|Authorization|header|string| 是 |token|

> 返回示例

> 成功

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» message|string|true|none||信息|
|» data|null|true|none||data|

