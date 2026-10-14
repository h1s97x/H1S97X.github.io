import { defineConfig } from "astro/config";
import fuwariTheme, { fuwariIntegrations } from "astro-theme-fuwari";
import genRedirects from "./tools/redirects.json" with { type: "json" };

// https://astro.build/config
export default defineConfig({
	site: "https://h1s97x.github.io/",
	trailingSlash: "always",
	integrations: [
		// 主题包：拥有布局/组件/路由/集合 schema 与 markdown 配置，博客只提供内容
		fuwariTheme(),
		// 主题自带依赖的 Astro 集成（verbose 配置封装在主题包内）
		...fuwariIntegrations(),
	],
	// 旧链接 301 重定向（博客特有，随内容迁移保留）
	redirects: genRedirects,
});
