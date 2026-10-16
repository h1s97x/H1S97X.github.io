/**
 * 转载声明卡的样式。
 *
 * 文章 Markdown 里写 `<div class="reprint-note">…</div>`（Astro 允许 Markdown 内嵌 HTML），
 * 徽章用 shields.io 静态徽章（`img.shields.io`，与 README 同一套）。
 * 颜色取主题的 CSS 变量，明暗主题自动跟随。
 *
 * 之所以是「字符串注入」而不是 `.css` 文件：博客仓没有页面/布局组件，
 * 没有天然的样式入口；在 `astro.config.mjs` 里用一行集成注入最省事，
 * 也不用为了一个 class 去 fork 主题仓库。
 */
export const reprintCss = `
.custom-md .reprint-note {
	--reprint-accent: var(--admonitions-color-warning);
	border-left: 3px solid var(--reprint-accent);
	border-radius: 0 var(--radius-large) var(--radius-large) 0;
	background: var(--license-block-bg);
	padding: 0.9rem 1.1rem;
	margin: 0 0 1.4rem;
}

.custom-md .reprint-note p {
	margin: 0.35rem 0;
	font-size: 0.95rem;
	line-height: 1.65;
}

/* 徽章：只包住徽章本身的一个段落，去掉段落自带的上下间距 */
.custom-md .reprint-note p:has(> a > img[src*="img.shields.io"]) {
	margin: 0 0 0.6rem;
	line-height: 1;
}

.custom-md .reprint-note p:has(> a > img[src*="img.shields.io"]) img {
	margin: 0;
	vertical-align: middle;
}

.custom-md .reprint-note ul {
	margin: 0.35rem 0 0;
	padding-left: 1.1rem;
}

.custom-md .reprint-note li {
	font-size: 0.9rem;
}

.custom-md .reprint-note a {
	text-decoration-thickness: 1px;
}
`;
