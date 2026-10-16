---
title: 开发者视角下的 CORS：浏览器为什么拦我，后端该怎么放行
tags: [前端, CORS, 跨域, 浏览器安全, 同源策略, HTTP]
description: "写给已经会写代码的人：CORS 到底在拦什么、简单请求与预检的判定边界、带 Cookie 的硬规矩，以及后端（Express / FastAPI / Nginx）具体该怎么配、配了还是不生效怎么查。"
published: 2026-11-20T21:00:00+08:00
updated: 2026-11-20T21:00:00+08:00
category: 思考
notebook: blog
---


接口在 Postman 里好得很，curl 也一把过，一挂到浏览器就红了：

```
Access to fetch at 'https://api.example.com/user' from origin 'https://app.example.com'
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present...
```

这不是接口挂了，也不是网络问题。请求其实**已经发出去了**，服务端**也正常返回了**——是浏览器读完响应后，发现对方没给出「允许你读」的授权头，于是把这个响应**拦在了 JS 外面**。

一句话：**CORS 是浏览器本地执行的一套「跨源访问控制」，不是 HTTP 层的禁止，更不是后端报错。**

所以有一组必背的对照：

| 发起方 | 结果 |
|---|---|
| Postman / curl / 服务端调用 | 正常（没有「源」的概念，不受管） |
| 浏览器里的 `fetch` / `XHR` | 可能被 CORS 拦 |

## 一、先厘清「源」，以及拦的到底是什么

**源 = 协议 + 主机 + 端口**，三者全同才算同源。子域也算跨源：

| 页面 | 请求 | 同源？ | 原因 |
|---|---|---|---|
| `https://a.com` | `https://a.com/api` | ✅ | 三要素一致 |
| `https://a.com` | `http://a.com` | ❌ | 协议不同 |
| `https://a.com` | `https://a.com:8080` | ❌ | 端口不同 |
| `https://a.com` | `https://api.a.com` | ❌ | 主机不同（子域也算） |

注意同源策略限制的是**读取响应**，不是「发出请求」。`<img>`、`<script>`、`<form>` 一直都能跨源发请求，只是脚本读不到内容。AJAX 的 CORS 设计就是照抄表单：**表单能发的请求，`fetch` 就能直接发（简单请求）；表单发不出的，就得先问一句（预检）。**

这条「抄表单」的思路，直接决定了下面两类请求的边界。

## 二、简单请求 vs 预检：一条判定线

满足下面**全部**条件 = 简单请求，浏览器直接发，不预检：

- 方法 ∈ `GET` / `HEAD` / `POST`
- 手动设置的请求头只有这几个：`Accept`、`Accept-Language`、`Content-Language`、`Content-Type`、`Range`（浏览器自动加的 `Host`、`User-Agent` 等不算）
- `Content-Type` 只取 `text/plain`、`multipart/form-data`、`application/x-www-form-urlencoded`
- 没注册 `upload` 进度监听，没用 `ReadableStream`

**只要沾一条**（`PUT`/`DELETE`、`Content-Type: application/json`、带 `Authorization` 或任何自定义头），就是非简单请求，浏览器先发一个 `OPTIONS` 预检探路。

> 踩坑率最高的其实是 `Content-Type: application/json`——JSON API 全中招。很多人以为「我就多发个 Header，怎么会多一个请求」，答案就在这。

**简单请求**：浏览器自动加 `Origin`，服务端回 `Access-Control-Allow-Origin`，完事。

```http
GET /data HTTP/1.1
Origin: https://foo.example
```
```http
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://foo.example
```

**预检**：先 `OPTIONS` 问清楚，通过了才发真请求。

```http
OPTIONS /doc HTTP/1.1
Origin: https://foo.example
Access-Control-Request-Method: PUT            ← 我打算用 PUT
Access-Control-Request-Headers: X-Custom      ← 我打算带这些头
```
```http
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://foo.example
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom
Access-Control-Max-Age: 86400                ← 预检结果缓存多久
```

一句话记：**简单请求「先发后判」，预检请求「先判后发」。**

两个必须知道的细节：

- **预检响应里要回全部支持的方法/头**，不是只回这次要用的——`Allow-Methods` 写全，才能少发几次 `OPTIONS`。
- **预检不能被重定向**。服务端（或网关）对 `OPTIONS` 做 301/302，浏览器直接判失败。常见于「HTTP 强制跳 HTTPS」的网关。

## 三、带 Cookie 时，规矩立刻收紧

默认跨源请求**不带** Cookie。要带，前端得显式开：

```js
fetch("https://api.example.com/profile", { credentials: "include" })
```

后端必须同时满足：

- `Access-Control-Allow-Origin` **不能是 `*`**，必须是请求 `Origin` 的原值；
- 回 `Access-Control-Allow-Credentials: true`；
- `Allow-Headers` / `Allow-Methods` / `Expose-Headers` 也都不能用 `*`，得列具体值。

少一条，浏览器会**直接忽略整个响应**——哪怕状态码 200、body 也有内容，`fetch` 照样给你 `TypeError: Failed to fetch`。

还有一个现在几乎必踩的坑：跨站携带 Cookie，服务端写 Cookie 时得带 `SameSite=None; Secure`，否则 CORS 头全对，Cookie 还是上不去。

```
Set-Cookie: token=xxx; Path=/; SameSite=None; Secure; HttpOnly
```

## 四、后端到底怎么配

记住三个动作：**① 放行 `Origin` ② 回 `Access-Control-*` ③ 让 `OPTIONS` 提前返回**。

**Express**

```js
import cors from "cors";

const allowOrigins = new Set(["https://app.example.com", "http://localhost:5173"]);

app.use(cors({
  origin(origin, cb) {
    // 无 Origin：curl / 服务端调用 / 同源，按业务决定放不放
    if (!origin || allowOrigins.has(origin)) return cb(null, true);
    return cb(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["X-Request-Id"],
  maxAge: 600,
}));
```

**FastAPI**

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://app.example.com"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
    expose_headers=["X-Request-Id"],
    max_age=600,
)
```

**Nginx**（网关层兜底，注意 `always` 让 4xx/5xx 响应也带 CORS 头）

```nginx
location / {
    if ($request_method = OPTIONS) {
        add_header Access-Control-Allow-Origin  "https://app.example.com" always;
        add_header Access-Control-Allow-Credentials "true" always;
        add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS" always;
        add_header Access-Control-Allow-Headers "Content-Type, Authorization" always;
        add_header Access-Control-Max-Age 600 always;
        return 204;
    }
    add_header Access-Control-Allow-Origin "https://app.example.com" always;
    add_header Access-Control-Allow-Credentials "true" always;

    # 动态回 Origin 时，务必带上，否则 CDN/缓存会把 A 站的放行头错发给 B 站
    add_header Vary Origin always;
    proxy_pass http://127.0.0.1:3000;
}
```

## 五、配了 CORS 还是报错？按这个清单查

1. **`OPTIONS` 有没有被处理？** 很多框架只挂了业务路由，`OPTIONS` 落到 404 → 预检必挂。看报错 `Response to preflight request doesn't pass...` 基本是这条。
2. **`Allow-Headers` 漏了自定义头？** 前端带了 `Authorization` 或 `X-Token`，后端没列进去，预检直接拒。
3. **带 Cookie 却写了 `*`？** 见上一节，`*` 与 `credentials` 互斥。
4. **`OPTIONS` 被重定向了？** 查网关是否对 `OPTIONS` 也做了协议/域名跳转。
5. **`Vary: Origin` 缺失？** 动态回 Origin + CDN 缓存 = 串源放行。

排查姿势只有一个：**开 DevTools 的 Network，找那个标红的请求，请求头和响应头里全是答案。** CORS 失败时 JS 拿不到细节（这是故意的，防止脚本探测），只能在控制台和 Network 里看。

## 六、本地开发：别硬碰 CORS，走代理

`http://localhost:5173` 打 `http://localhost:3000`，端口不同就是跨源。开发时最省事的做法不是配 CORS，而是让 dev server 做代理——对浏览器而言请求同源，根本没有跨域。

```js
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      "/api": { target: "http://localhost:3000", changeOrigin: true },
    },
  },
});
```

前端只请求 `/api/user`，由 Vite 转发出去。

## 收尾

CORS 就一句话：**浏览器问「这个源能不能读你的响应」，服务端用 `Access-Control-*` 头回答，浏览器最终裁决。**

最后两个最容易混淆的点：

- **`no-cors` 不是解药**。`mode: "no-cors"` 只是把响应降级成「不透明响应」，你**读不到内容**，只适合发埋点/日志这类不需要回值的请求。
- **CORS ≠ 接口鉴权，也 ≠ CSRF 防护**。它只管「浏览器里的 JS 能不能读响应」，管不了请求是否合法。鉴权归 Token，CSRF 归 `SameSite` / CSRF Token / `Origin` 校验。

---

**参考**

- [阮一峰：跨域资源共享 CORS 详解](https://www.ruanyifeng.com/blog/2016/04/cors.html)
- [掘金：一篇讲透 CORS——为什么浏览器拦我请求，后端到底该怎么放行](https://juejin.cn/post/7667023796480131126)
- [MDN：跨源资源共享（CORS）](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Guides/CORS)
- [WHATWG Fetch 规范](https://fetch.spec.whatwg.org/)
