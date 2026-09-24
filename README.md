# 岚潮的小窝

一个基于 **Astro 7** + **Vue 3** + **Tailwind CSS v4** 构建的静态个人博客。

**设计语言：** 暖色编辑风（warm editorial）、衬线标题、赤陶色强调、纯矢量图标。

**适用场景：** 个人博客、作品集、技术笔记。

---

## 特性

### 核心功能

- **纯静态** — 构建时生成 HTML，无后端、无数据库，可部署到任意静态托管平台
- **Markdown 文章** — 通过 Astro Content Collections 管理，支持标签、分类、草稿、自定义作者
- **全局搜索** — 列表页顶部的下拉搜索框（Vue 3 + Fuse.js），各页面按内容类型过滤
- **说说（微笔记）** — Markdown 渲染 + 图片，图片自动按黄金比例缩放（φ ≈ 1.618）
- **恋爱日常** — 实时计时器（年/月/日/时/分/秒）+ 日常记录
- **GitHub 集成** — 项目页在构建时自动获取仓库星标数、分叉数、语言、Topics
- **文章归档** — 按年/月分组展示写作时间线
- **友链系统** — YAML 格式，每文件一条，网格展示
- **文章目录 TOC** — 文章详情页右侧目录，自动提取 h2/h3 标题
- **标签筛选** — 文章列表页按标签实时过滤，`?tag=` 参数可分享
- **RSS 订阅** — 自动生成 `/rss.xml`

### 设计

- **暖色编辑风** — 米白纸底 + 暖墨色文字 + 赤陶色强调，深浅两套主题
- **衬线标题** — 标题使用 Lora，正文使用 Inter，中文字体回退到系统字体
- **暗色模式** — 默认暗色，支持手动切换，选择持久化到 `localStorage.theme`
- **矢量图标** — Lucide SVG 路径在构建时内联，零客户端 JS 开销
- **响应式布局** — 桌面端左侧固定侧边栏 + 移动端顶栏抽屉菜单

### 性能

- **快速构建** — 全站约 1–3 秒完成构建
- **极低运行时开销** — 图标、样式、布局均为纯 HTML/CSS，Vue 仅在搜索和评论区域加载
- **SEO 友好** — 自动生成 meta、Open Graph、JSON-LD、sitemap、robots.txt、RSS

---

## 页面一览

| 路径 | 页面 | 功能 |
|------|------|------|
| `/` | 首页 | 个人简介 + 最新文章（4 篇）+ 最新说说（3 条） |
| `/blog` | 文章列表 | 按日期排序，标签筛选，计数显示，下拉搜索 |
| `/blog/[slug]` | 文章详情 | Markdown 渲染、TOC 目录、评论区 |
| `/projects` | 项目 | 项目卡片，构建时从 GitHub API 拉取数据 |
| `/archive` | 归档 | 按年/月分组，链接到文章详情 |
| `/notes` | 说说 | 微笔记列表，支持 Markdown 和图片 |
| `/friends` | 友链 | 友链网格展示 |
| `/daily` | 恋爱日常 | 恋爱计时器 + 日常记录 |
| `/search` | 搜索 | 独立搜索页（`noindex`） |
| `/rss.xml` | RSS 订阅 | 按发布日期排序 |
| `/robots.txt` | 爬虫规则 | 指向 sitemap |

---

## 技术栈

| 技术 | 用途 |
|------|------|
| [Astro](https://astro.build) | 主框架，静态站点生成器（7.x） |
| [Vue 3](https://vuejs.org) | 交互组件（搜索、评论） |
| [Tailwind CSS](https://tailwindcss.com) | 原子化 CSS（v4，通过 Vite 插件接入） |
| [@tailwindcss/typography](https://github.com/tailwindlabs/tailwindcss-typography) | Markdown 文章排版（`prose`） |
| [marked](https://marked.js.org) | Markdown → HTML（说说 / 恋爱日常页，18.x） |
| [Fuse.js](https://fusejs.io) | 客户端模糊搜索（7.x） |
| [Lucide](https://lucide.dev) | 图标库（静态 SVG 路径映射） |
| [Artalk](https://artalk.js.org) | 评论系统（自托管后端） |
| [@astrojs/rss](https://docs.astro.build/en/guides/rss/) | RSS 生成 |
| [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) | Sitemap 生成 |
| [Shiki](https://shiki.style) | 代码高亮（`one-dark-pro`，构建时） |

---

## 快速开始

需要 Node.js `>=22.12.0`。

```bash
npm install       # 安装依赖
npm run dev       # 开发服务器（默认 http://localhost:4321）
npm run build     # 生产构建 → dist/
npm run preview   # 预览构建结果
npm run astro -- <command>   # Astro CLI 入口
```

### 注意事项

- **`npm run build` 不是类型检查。** 项目未安装 `typescript` 或 `@astrojs/check`，`astro build` 会跳过类型检查，类型有问题的源码同样能产出 HTML。验证方式是构建成功 + 路由冒烟检查。
- **冒烟测试前先确认 4321 端口上是哪个项目。** 本机常另有 Astro 项目占用该端口，直接访问可能验证到错误的代码库。可通过页面 `<title>` 确认，或换端口启动。
- Astro CLI 支持后台服务：`npm run astro -- dev --background`、`dev status`、`dev logs`、`dev stop`。
- 仓库没有 lint、测试脚本或测试文件。

---

## 项目结构

```
├── public/                      # 静态资源（原样复制到构建输出）
├── src/
│   ├── components/
│   │   ├── Header.astro         # 侧边栏 / 移动端顶栏 + 主题切换
│   │   ├── Footer.astro         # 页脚（版权 + RSS）
│   │   ├── Icon.astro           # 内联 SVG 图标（Lucide 路径映射）
│   │   ├── BlogCard.astro       # 文章卡片
│   │   ├── ProjectCard.astro    # 项目卡片
│   │   ├── FriendLinks.astro    # 友链网格
│   │   ├── CommentSystem.astro  # 评论容器（启用/禁用开关）
│   │   ├── GlobalSearch.vue     # 列表页下拉搜索
│   │   ├── SearchBar.vue        # 独立搜索页组件
│   │   └── ArtalkComments.vue   # Artalk 评论集成
│   ├── layouts/
│   │   └── BaseLayout.astro     # 唯一文档外壳（SEO、主题、Header/Footer）
│   ├── pages/                   # 路由
│   │   ├── index.astro          # 首页
│   │   ├── blog/index.astro     # 文章列表
│   │   ├── blog/[...slug].astro # 文章详情（动态路由 + TOC）
│   │   ├── projects.astro       # 项目页
│   │   ├── archive.astro        # 归档页
│   │   ├── notes.astro          # 说说页
│   │   ├── friends.astro        # 友链页
│   │   ├── daily.astro          # 恋爱日常页
│   │   ├── search.astro         # 搜索页
│   │   ├── rss.xml.js           # RSS 端点
│   │   └── robots.txt.ts        # robots.txt 端点
│   ├── content/                 # 内容集合
│   ├── config/                  # 配置中心（见下）
│   ├── content.config.ts        # 集合 Schema
│   └── styles/global.css        # Tailwind v4 + 设计令牌 + 双主题
├── astro.config.mjs             # Astro 配置
├── AGENTS.md                    # 面向编码 agent 的架构说明与陷阱
└── README.md
```

---

## 内容管理

### 文章 `src/content/blog/*.md`

文件名为 ID 和 URL（`foo.md` → `/blog/foo`），保持文件名稳定以免链接失效。

```yaml
---
title: 文章标题
description: 文章摘要（用于卡片、搜索索引、SEO）
date: 2026-01-01
updated: 2026-01-10        # 可选，与 date 不同时显示「更新于」
author: 作者名             # 可选
category: 技术             # 可选
tags: [Astro, Vue]         # 可选，用于标签筛选
draft: false               # 可选，true 时不发布到任何页面
---
```

草稿（`draft: true`）在首页、文章列表、归档、搜索和 RSS 中均不可见。

> **注意：** 在 frontmatter 中写 `slug:` 会覆盖文件名生成的 URL，但 Schema 并未声明该字段。这会同时改变路由、卡片链接、归档链接和 RSS 链接，请谨慎使用。

### 项目 `src/content/projects/*.md`

每个文件一个项目，只需 GitHub 仓库地址：

```yaml
---
repo: https://github.com/用户名/仓库名
---
```

页面在**构建时**请求 GitHub API 获取名称、描述、语言、Topics、星标和分叉数。请求失败或 URL 无法解析时回退为仓库名。因此有项目条目时构建需要网络访问。

### 说说 `src/content/notes/*.md`

微笔记，无标题字段，正文即内容：

```markdown
---
date: 2026-01-01 14:30
---

今天完成了一个新功能。

![图片描述](/images/example.png)
```

**图片黄金比例缩放：** 图片被包裹在 `.note-img-wrap` 中，客户端 JS 按横竖方向添加 `landscape` / `portrait` 类：

- 横向图片：最大 260×160（φ ≈ 1.625）
- 竖向图片：最大 160×260
- 移动端：横向 180×110，竖向 110×180

### 恋爱日常 `src/content/daily/*.md`

与说说格式相同（`date` + 正文），渲染在 `/daily` 页面。

计时器起始日期和标题在 `src/config/daily.ts` 配置。标题支持 `{days}` 占位符，会在构建时替换为已在一起的天数，并在客户端由计时器脚本保持同步——不要硬编码天数，否则会和计时器不一致。

### 友链 `src/content/friends/*.yaml`

每个文件一条：

```yaml
name: 站点名称
url: https://example.com
description: 站点描述
```

> `projects`、`notes`、`friends` 三个目录默认不存在，构建会输出空集合警告，对应页面渲染空状态。这是正常的，添加内容后警告消失。

---

## 配置中心

所有配置按模块拆分在 `src/config/`，通过 `src/config/index.ts` 统一导出。

| 文件 | 配置项 | 说明 |
|------|--------|------|
| `site.ts` | `title`、`description`、`url`、`lang`、`timezone`、`tagline` | 站点信息 |
| `author.ts` | `name`、`email`、`avatar`、`role`、`bio`、`website` | 作者信息 |
| `nav.ts` | `nav`、`more` | 导航菜单（两组） |
| `social.ts` | `label`、`url`、`icon`、`color` | 社交链接（首页展示） |
| `daily.ts` | `names`、`avatars`、`startDate`、`title` | 恋爱日常 |
| `comment.ts` | `enabled`、`server`、`site`、`locale` | 评论系统 |
| `theme.ts` | `default` | 默认主题（`light` / `dark` / `auto`，当前为 `dark`） |
| `blog.ts` | `pageSize` | 文章列表每页条数（**未接线**，列表未分页） |
| `seo.ts` | `twitterCard`、`ogImage` | SEO 配置 |
| `footer.ts` | `showCopyright`、`since`、`customText` | 页脚 |
| `features.ts` | `rss`、`search`、`darkModeToggle` | 功能开关 |

> 修改部署域名时，`site.url` 需与 `astro.config.mjs` 中的 `site` 保持一致。

**当前未接线的配置项**（声明了但没有消费者）：`features.search`、`blog.pageSize`、`footer.showCopyright`、`site.timezone`、`author.email`。要让它们生效需要补上使用方，而不只是改值。

---

## 搜索机制

列表页（文章 / 归档 / 项目 / 说说 / 友链）顶部都有下拉搜索框。

搜索索引由 `src/lib/search.ts` 在**构建时**生成，各页面调用 `filterByScope()` 过滤后传给 `GlobalSearch` 组件：

| 页面 | 范围 |
|------|------|
| 首页、友链 | `all` — 全部内容 |
| 文章列表、文章详情、归档 | `blog` — 仅文章 |
| 项目 | `projects` — 仅项目 |
| 说说 | `notes` — 仅说说 |

**Fuse.js 权重：** 标题 2.0、标签 1.5、描述 1.0，阈值 0.4。

`/search` 页面是独立的：它只索引非草稿文章，使用 `SearchBar.vue`，并带有高亮显示。

> `BaseLayout` 接受 `searchScope` prop，但**它只是描述性的，不会被读取**。真正的过滤发生在各页面调用 `filterByScope()` 时。

---

## 评论系统

通过 `src/config/comment.ts` 控制，当前使用 **Artalk**：

```ts
export const comment = {
  enabled: true,
  server: 'https://artalk.zhouwanx.top',  // Artalk 后端地址
  site: '博客',                            // Artalk 后台创建的站点名
  locale: 'zh-CN',
};
```

评论只渲染在**文章详情页**。Artalk 的脚本和样式在运行时从 unpkg 注入，因此需要访客能访问外网。

`server` 留空或包含 `xxx` 时，评论区会显示配置提示。

`src/components/WalineComments.vue` 是备选方案，但 `CommentSystem.astro` 并未挂载它。

---

## 设计说明

### 配色

设计令牌定义在 `src/styles/global.css`，浅色与暗色各自覆盖同一组变量。

| 令牌 | 浅色 | 暗色 | 用途 |
|------|------|------|------|
| `--paper` | `#faf9f5` | `#1b1b19` | 页面背景 |
| `--ink` | `#1b1b19` | `#faf9f5` | 正文文字 |
| `--muted` | `#5f5d55` | `#b0aea5` | 辅助文字 |
| `--line` | `#e3e0d4` | `rgba(255,255,255,.14)` | 边框线 |
| `--soft` | `#f1efe6` | `#26241f` | 悬停背景 |
| `--card` | `#ffffff` | `#2e2e2c` | 卡片背景 |
| `--nested` | `#f4f2ea` | `#383836` | 嵌套卡片 |
| `--sidebar` | `#f1eee5` | `#141414` | 侧边栏背景 |
| `--accent` | `#b84a24` | `#cc785c` | 强调色（赤陶） |
| `--accent-soft` | `#f4e3d1` | `#3a2a1c` | 强调色淡色 |

暗色模式下侧边栏（`#141414`）比内容区（`#1b1b19`）更深，形成分区。

### 排版

- **正文：** `Inter` → `PingFang SC` / `Microsoft YaHei` 回退
- **标题：** `Lora` → `Georgia` / `Songti SC` 回退（`.font-display` 类）
- **等宽：** 系统等宽字体栈
- **文章排版：** `@tailwindcss/typography` 的 `prose` 类，配色令牌已映射到主题变量
- **代码高亮：** Shiki，`one-dark-pro` 主题（构建时）

### 圆角

半径由 `--radius: 0.5rem` 派生：`--radius-sm`（×0.6，用于内部元素）和 `--radius-lg`（×1.25，用于卡片/面板），通过 `.rounded-inner` 和 `.rounded-panel` 工具类使用。

### 图标

所有图标来自 Lucide，以 SVG 路径数组静态映射在 `src/components/Icon.astro` 中，构建时内联，**无运行时 JS 开销**。部分品牌图标（如 Bilibili）为自定义路径，没有品牌图标时用 `globe` 代替。

添加图标：在 `Icon.astro` 的 `icons` 对象中加一个条目：

```ts
'my-icon': [
  ['path', { d: 'M...' }],
],
```

### 主题

- 默认**暗色**（`theme.default: 'dark'`），不跟随系统
- 用户可手动切换，选择持久化到 `localStorage.theme`
- 首屏前由内联脚本应用，无闪烁
- 切换按钮由 `features.darkModeToggle` 控制

---

## 自定义指南

### 修改导航

编辑 `src/config/nav.ts`。`nav` 是「博客区」分组，`more` 是「更多」分组，图标名参考 `Icon.astro` 的映射表：

```ts
export const nav: NavItem[] = [
  { label: '首页', path: '/', icon: 'home' },
  // ...
];
```

### 修改社交链接

编辑 `src/config/social.ts`（展示在首页）：

```ts
export const social: SocialLink[] = [
  { label: 'GitHub', url: 'https://github.com/你的用户名', icon: 'globe' },
];
```

### 添加新页面

1. 在 `src/pages/` 下创建 `.astro` 文件
2. 用 `BaseLayout` 包裹内容并传入 `title`
3. 如需导航入口，在 `src/config/nav.ts` 添加菜单项
4. 如需新内容类型，在 `src/content.config.ts` 添加集合

**渲染 Markdown 时请注意：** 项目有两条渲染路径。文章详情页用 Astro 的 `render()`；首页、说说页、恋爱日常页用 `marked` 的**局部实例**。不要改回共享的 `marked.use()` 全局调用——`marked` 导出的是模块级单例，`use()` 无法撤销，会污染其他页面并导致构建失败（详见 `AGENTS.md` 的构建陷阱）。

---

## 常见问题

### 构建输出「collection does not exist or is empty」警告？

`projects`、`notes`、`friends` 目录不存在或为空。属正常现象，添加内容后消失。

### 评论显示「已启用但尚未配置服务端地址」？

编辑 `src/config/comment.ts`，把 `server` 设为真实的 Artalk 后端地址（当前值包含 `xxx` 占位时会触发该提示）。

### 如何部署？

构建产物在 `dist/`，可部署到任意静态托管：

- **Vercel / Netlify** — 连接 Git 仓库，自动识别 Astro
- **Cloudflare Pages** — 构建命令 `npm run build`，输出目录 `dist`
- **GitHub Pages** — 使用 `actions/upload-pages-artifact`
- **任意静态服务器** — 上传 `dist/` 内容即可

修改域名后记得同步 `src/config/site.ts` 的 `url` 和 `astro.config.mjs` 的 `site`。

---

## License

MIT
