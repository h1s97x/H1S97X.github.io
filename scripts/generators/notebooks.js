'use strict';

/**
 * Notebooks / Home 生成器（Almagest 主题适配）
 *
 * Stellar 主题通过 site_tree + notebooks 数据生成 /notes/ /coding/ 等列表页；
 * Almagest 主题只内置 archive/categories/tags/search 生成器，没有 notebook 概念。
 * 这里在站点侧补齐：
 *   - 首页 /（展示最近文章，layout: index）
 *   - /notes/ /coding/ 等（读取 source/_data/notebooks/*.yml，按 base_dir 生成列表页）
 *
 * 依赖 source/_data/notebooks/<id>.yml 中的字段：
 *   name / title / base_dir / per_page / order_by
 */

hexo.extend.generator.register('notebooks', function (locals) {
  const routes = [];
  const data = locals.data || {};

  Object.entries(data).forEach(([key, info]) => {
    if (!key.startsWith('notebooks/') || !info) {
      return;
    }
    const id = key.slice('notebooks/'.length);
    if (id.endsWith('.DS_Store')) {
      return;
    }

    const baseDir = (info.base_dir || `/${id}/`).replace(/^\/+|\/+$/g, '');
    const perPage = info.per_page || hexo.config.per_page || 10;
    const orderBy = info.order_by || '-date';

    // 筛选属于该 notebook 的页面（frontmatter 中 notebook: <id>）
    let posts;
    try {
      posts = locals.pages.filter((p) => p.notebook === id).sort(orderBy);
    } catch (e) {
      hexo.log.warn(`[notebooks] 过滤 ${id} 失败: ${e.message}`);
      return;
    }

    const total = Math.max(1, Math.ceil(posts.length / perPage));
    for (let i = 0; i < total; i++) {
      const current = i + 1;
      const path =
        current === 1
          ? `${baseDir}/index.html`
          : `${baseDir}/page/${current}/index.html`;
      routes.push({
        path,
        layout: ['archive', 'index'],
        data: {
          title: info.title || info.name || id,
          notebook: id,
          posts: posts.skip(i * perPage).limit(perPage),
          base: `${baseDir}/`,
          total,
          current,
          current_url: path.replace(/index\.html$/, ''),
          prev: current > 1 ? current - 1 : 0,
          next: current < total ? current + 1 : 0,
        },
      });
    }
  });

  return routes;
});

// 首页：展示最近文章（含生活记录与各 notebook 文章）
hexo.extend.generator.register('home', function (locals) {
  return {
    path: 'index.html',
    layout: ['index'],
    data: {
      posts: locals.posts.sort('-date').limit(10),
      total: 1,
      current: 1,
    },
  };
});
