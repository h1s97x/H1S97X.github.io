import { defineConfig } from "astro/config";
import fuwariTheme, { fuwariIntegrations } from "astro-theme-fuwari";

// https://astro.build/config
export default defineConfig({
	site: "https://h1s97x.github.io/",
	trailingSlash: "always",
	integrations: [
		// 主题包：拥有布局/组件/路由/集合 schema 与 markdown 配置，博客只提供内容
		fuwariTheme({
			// 评论系统（Giscus）。provider 亦可改为 "utterances"（需相应配置）。
			commentConfig: {
				provider: "giscus",
				giscus: {
					repo: "h1s97x/H1S97X.github.io",
					repoId: "R_kgDOJq3IOw",
					category: "Announcements",
					categoryId: "DIC_kwDOJq3IO84C0cUU",
				},
			},
		}),
		// 主题自带依赖的 Astro 集成（verbose 配置封装在主题包内）
		...fuwariIntegrations(),
	],
});
