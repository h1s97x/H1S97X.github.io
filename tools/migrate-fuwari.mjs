// 迁移脚本：把 Hexo 旧文（来自 main 分支的 source/）迁进 Astro + Fuwari 的
// Content Collections（src/content/posts/）。
//
// 用法：
//   git archive main source | tar -x -C /tmp/oldblog
//   node tools/migrate-fuwari.mjs /tmp/oldblog/source
//
// 转换规则：
//   - frontmatter: date/updated -> published/updated (ISO +08:00)；缺 date 时用该文件在
//     main 上的首次提交作者日期；categories[] -> category(首项) + notebook(路由用)
//     其余字段原样保留（依赖 schema.passthrough）
//   - {% asset_code file %} -> 把同目录 file 内容内联为 ```lang 代码块
//   - {% highlight lang %}...{% endhighlight %} -> ```lang 代码块
//   - 图片：source/images 整个复制到 public/images；相对 ../images/ 改写为 /images/

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "src/content/posts");
const PUBLIC_IMG = path.join(ROOT, "public/images");

const srcRoot = process.argv[2];
if (!srcRoot) {
	console.error("用法: node tools/migrate-fuwari.mjs <old-source-root>");
	process.exit(1);
}

const TYPE_OF = { _posts: "blog", notes: "notes", coding: "coding" };
const warnings = [];
const redirects = {};

const LANG_OF_EXT = {
	py: "python", js: "javascript", ts: "typescript", jsx: "jsx", tsx: "tsx",
	java: "java", cpp: "cpp", cc: "cpp", c: "c", h: "c", go: "go", rs: "rust",
	rb: "ruby", php: "php", html: "html", css: "css", json: "json", sh: "bash",
	sql: "sql", yaml: "yaml", yml: "yaml", xml: "xml", md: "markdown",
};
const langFromExt = (f) => LANG_OF_EXT[path.extname(f).slice(1).toLowerCase()] || "";

function toISO(v) {
	v = String(v).trim().replace(/^['"]|['"]$/g, "");
	if (v.includes("T")) return v; // 已是 ISO
	const [d, t = "00:00:00"] = v.split(" ");
	return `${d}T${t}+08:00`;
}

function gitDate(relpath) {
	try {
		const p = "source/" + relpath;
		const r = execSync(`git -C ${JSON.stringify(ROOT)} log --reverse --format=%aI -- main -- ${JSON.stringify(p)}`, {
			encoding: "utf8",
		}).trim().split("\n")[0];
		return r || null;
	} catch {
		return null;
	}
}

function dateForRedirect(fm, relpath) {
	const m = fm.match(/^date:\s*(.*)$/m);
	let raw = m ? m[1].trim() : gitDate(relpath);
	if (!raw) return null;
	raw = raw.replace(/^['"]|['"]$/g, "").trim();
	const d = raw.split(" ")[0];
	const p = d.split("-");
	if (p.length < 3) return null;
	return { y: p[0], m: p[1].padStart(2, "0"), d: p[2].padStart(2, "0") };
}

function splitFM(raw) {
	const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
	if (!m) return { fm: "", body: raw };
	return { fm: m[1], body: m[2] };
}

function transformFM(fm, type, relpath) {
	const lines = fm.split("\n");
	const out = [];
	let category = null;
	let inCategories = false;
	let hasDate = false, dateVal = "";
	let hasUpdated = false, updatedVal = "";
	for (let line of lines) {
		if (inCategories) {
			if (/^\s*-\s+/.test(line)) {
				const item = line.replace(/^\s*-\s+/, "").trim();
				if (!category) category = item;
				continue;
			}
			inCategories = false;
		}
		if (/^notebook:/.test(line)) continue;
		if (/^category:/.test(line)) continue;
		const mUpd = line.match(/^updated:\s*(.*)$/);
		if (mUpd) { hasUpdated = true; updatedVal = mUpd[1]; continue; }
		const mDate = line.match(/^date:\s*(.*)$/);
		if (mDate) { hasDate = true; dateVal = mDate[1]; continue; }
		const mCat = line.match(/^categories:\s*(.*)$/);
		if (mCat) {
			const rest = mCat[1].trim();
			if (rest.startsWith("[")) {
				const items = rest.slice(1, -1).split(",").map((s) => s.trim().replace(/^['"]|['"]$/g, ""));
				category = items[0] || null;
			} else {
				inCategories = true;
			}
			continue;
		}
		out.push(line);
	}
	let pub;
	if (hasDate) pub = toISO(dateVal);
	else {
		const g = gitDate(relpath);
		if (g) pub = toISO(g);
		else { pub = "2024-01-01T00:00:00+08:00"; warnings.push("缺日期,使用默认 2024-01-01: " + relpath); }
	}
	const upd = hasUpdated ? toISO(updatedVal) : pub;
	let finalCat = category;
	if (type === "coding") finalCat = finalCat || "题解";
	else if (type === "notes") finalCat = finalCat || "笔记";
	else finalCat = finalCat || "随笔";
	out.push("published: " + pub);
	out.push("updated: " + upd);
	out.push("category: " + finalCat);
	out.push("notebook: " + type);
	return out.join("\n");
}

function transformBody(body, postDir, file) {
	body = body.replace(/\{%[^\S]*asset_code[^\S]*([^\s%]+)[^\S]*%}/g, (_, f) => {
		const p = path.join(postDir, f);
		if (fs.existsSync(p)) {
			const code = fs.readFileSync(p, "utf8").replace(/\n+$/, "");
			return "```" + langFromExt(f) + "\n" + code + "\n```";
		}
		warnings.push(`[asset_code 缺失] ${file} -> ${f}`);
		return `<!-- asset_code ${f} 未找到 -->`;
	});
	body = body.replace(
		/\{%[^\S]*highlight[^\S]*(\w+)?[^\S]*%\}\r?\n?([\s\S]*?)\r?\n?\{%[^\S]*endhighlight[^\S]*%}/g,
		(_, lang, code) => "```" + (lang || "") + "\n" + code.replace(/^\n+|\n+$/g, "") + "\n```",
	);
	body = body.replace(/\(\.\.[\\/]?images[\\/]/g, "(/images/").replace(/\(\/?images[\\/]/g, "(/images/").replace(/\(\/?img[\\/]/g, "(/images/");
	// 清洗代码块语言：非标准语言（如中文占位符）直接去掉，消除 Expressive Code 警告
	const KNOWN = new Set([
		...new Set(Object.values(LANG_OF_EXT)),
		"css", "html", "xml", "json", "yaml", "bash", "sql", "text", "txt", "markdown", "md",
		"shell", "sh", "go", "rust", "ruby", "php", "python", "javascript", "typescript", "java",
		"cpp", "c", "c++", "cs", "diff", "ini", "toml", "vue", "jsx", "tsx", "py", "makefile",
	]);
	body = body.replace(/```([^\n]*)\n([\s\S]*?)```/g, (m, lang, code) => {
		const l = (lang || "").trim().toLowerCase();
		return "```" + (KNOWN.has(l) ? l : "") + "\n" + code + "```";
	});
	return body;
}

function walk(dir) {
	const out = [];
	for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
		const p = path.join(dir, e.name);
		if (e.isDirectory()) out.push(...walk(p));
		else if (e.name.endsWith(".md")) out.push(p);
	}
	return out;
}

function slugAndPrefix(file, type) {
	if (type === "notes" || type === "coding") {
		const parent = path.basename(path.dirname(file));
		return { slug: parent, prefix: type + "-" };
	}
	return { slug: path.basename(file, ".md"), prefix: "" };
}

fs.mkdirSync(OUT_DIR, { recursive: true });
// 清掉上一轮生成的全部旧文，统一从 main 的 source/ 重新生成（脚本是唯一来源，避免重复/-2 副本）
for (const f of fs.readdirSync(OUT_DIR)) {
	if (f.endsWith(".md")) fs.rmSync(path.join(OUT_DIR, f), { force: true });
}
let count = 0;

for (const typeDir of ["_posts", "notes", "coding"]) {
	const abs = path.join(srcRoot, typeDir);
	if (!fs.existsSync(abs)) continue;
	const type = TYPE_OF[typeDir];
	for (const file of walk(abs)) {
		const raw = fs.readFileSync(file, "utf8");
		const { fm, body } = splitFM(raw);
		const relpath = path.relative(srcRoot, file);
		const postDir = path.dirname(file);
		const newFM = transformFM(fm, type, relpath);
		const newBody = transformBody(body, postDir, relpath);
		const { slug, prefix } = slugAndPrefix(file, type);
		let outName = `${prefix}${slug}.md`;
		let outPath = path.join(OUT_DIR, outName);
		let i = 2;
		while (fs.existsSync(outPath)) outPath = path.join(OUT_DIR, (outName = `${prefix}${slug}-${i++}.md`));
		const toSlug = outName.replace(/\.md$/, "");
		// draft 文章在 production 构建中不会生成页面（content-utils 会过滤），
		// 旧链接若指向它们会 404，统一回落到 /archive/ 保证可达。
		const isDraft = /^draft:\s*true\s*$/m.test(newFM);
		const to = isDraft ? "/archive/" : `/posts/${toSlug}/`;
		const froms = [];
		if (type === "coding") froms.push(`/coding/${slug}/`);
		else if (type === "notes") froms.push(`/notes/${slug}/`);
		else {
			const dd = dateForRedirect(fm, relpath);
			if (dd) froms.push(`/blog/${dd.y}/${dd.m}/${dd.d}/${slug}/`);
		}
		for (const f of froms) if (!(f in redirects)) redirects[f] = to;
		fs.writeFileSync(outPath, `---\n${newFM}\n---\n\n${newBody}`);
		count++;
	}
}

const imgSrc = path.join(srcRoot, "images");
if (fs.existsSync(imgSrc)) {
	fs.cpSync(imgSrc, PUBLIC_IMG, { recursive: true });
	console.log(`已复制图片: ${imgSrc} -> ${PUBLIC_IMG}`);
}

const REDIRECTS_PATH = path.join(ROOT, "tools/redirects.json");
redirects["/archives/"] = "/archive/";
fs.writeFileSync(REDIRECTS_PATH, JSON.stringify(redirects, null, 2) + "\n");
console.log(`已生成重定向 ${Object.keys(redirects).length} 条 -> ${REDIRECTS_PATH}`);
console.log(`迁移完成：${count} 篇 -> ${OUT_DIR}`);
if (warnings.length) {
	console.log(`\n⚠️  ${warnings.length} 条警告：`);
	for (const w of warnings.slice(0, 30)) console.log("  - " + w);
	if (warnings.length > 30) console.log(`  ... 其余 ${warnings.length - 30} 条省略`);
}
