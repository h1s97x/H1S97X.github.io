import type { AstroIntegration } from "astro";

/**
 * 把一段站点自有 CSS 接进 Vite 真实管道。
 *
 * `injectScript("head-inline", css)` 创建的是 `<script>`，CSS 写进去只当 JS 跑、
 * 样式根本不生效；硬塞 `<style>` 又得在 JS 里拼字符串。这里改成注册一个虚拟 CSS 模块，
 * Vite 正常处理并产出资源，Astro 自动把 `<link>` 挂到每个页面。
 */
export function siteStyles(opts: {
	name: string;
	/** 站点自有 CSS 源码 */
	code: string;
	/** 虚拟模块 id，用于让 Vite 解析 */
	moduleId: string;
}): AstroIntegration {
	const resolved = `\0${opts.moduleId}`;
	return {
		name: opts.name,
		hooks: {
			"astro:config:setup": ({ updateConfig, injectScript }) => {
				updateConfig({
					vite: {
						plugins: [
							{
								name: opts.name,
								resolveId: (id: string) =>
									id === opts.moduleId ? resolved : null,
								load: (id: string) => (id === resolved ? opts.code : null),
							},
						],
					},
				});
				// 视觉隐藏在 head 里加载，避免首屏闪烁
				injectScript("page-ssr", `import "${opts.moduleId}";`);
			},
		},
	};
}
