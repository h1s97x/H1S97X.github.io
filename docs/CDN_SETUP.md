# CDN 接入指南

## 当前状态

站点托管在 GitHub Pages，使用 Fastly CDN。国内访问速度一般。

## 推荐方案：Cloudflare 代理（零代码改动）

只需将域名的 DNS 服务器改为 Cloudflare，并启用代理（橙色云），即可获得：

- 全球 CDN 加速（国内节点）
- DDoS 防护
- 免费 HTTPS
- 自动压缩（Brotli）

### 步骤

1. 注册 [Cloudflare](https://dash.cloudflare.com/sign-up) 账号
2. 添加站点 `h1s97x.github.io`（或自定义域名）
3. Cloudflare 会提供新的 DNS 服务器地址
4. 到域名注册商处修改 DNS 服务器为 Cloudflare 提供的地址
5. 在 Cloudflare DNS 设置中，将 `h1s97x.github.io` 的 A 记录指向 GitHub Pages IP，并**开启代理（橙色云）**

### GitHub Pages IP

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

## 替代方案：Cloudflare Pages

直接将站点部署到 Cloudflare Pages，获得更好的全球性能。需要修改 `.github/workflows/deploy.yml` 或改用 Cloudflare Pages 的 Git 集成。

## 验证

接入后使用以下工具验证：

- [WebPageTest](https://www.webpagetest.org/) - 全球多地点测速
- [17CE](https://www.17ce.com/) - 国内多节点测速
- `curl -I https://h1s97x.github.io` - 检查响应头
