# 岚潮的小窝

一个基于 **Astro 7** + **Vue 3** + **Tailwind CSS v4** 构建的极简风格静态博客。

**设计语言：** 直角、黑白、无表情包、纯矢量图标、现代化布局。

**适用场景：** 个人博客、作品集、技术笔记。

---

## 特性

### 核心功能
- **纯静态** — 构建时生成 HTML，无后端、无数据库，可直接部署到任意静态托管平台
- **Markdown 文章** — 通过 Astro Content Collections 管理，支持标签、分类、草稿、自定义作者
- **全局搜索** — 顶部搜索框（Vue 3 + Fuse.js），首页搜索全部内容，其他页面按 scope 只搜索对应类型
- **说说（微笔记）** — 支持 Markdown 渲染 + 图片，图片自动黄金比例缩放（φ ≈ 1.618）
- **GitHub 集成** — 项目页自动获取 GitHub 仓库星标数、分叉数、语言、Topics
- **文章归档** — 按年/月组织，直观展示写作时间线
- **友链系统** — YAML 格式，每文件一条，网格展示
- **RSS 订阅** — 自动生成 `/rss.xml`，支持全文订阅

### 设计
- **极简美学** — 全部直角（`border-radius: 0`），黑白配色，无蓝紫渐变
- **暗色模式** — 跟随系统偏好，支持手动切换，主题状态持久化到 localStorage
- **矢量图标** — 使用 Lucide 图标库，所有图标在构建时内联为 SVG（零客户端 JS 开销）
- **响应式布局** — 桌面端导航栏 + 移动端汉堡菜单，适配所有屏幕尺寸
- **文章目录 TOC** — 文章详情页右侧悬浮目录导航，自动提取 h2/h3 标题
- **标签筛选** — 文章列表页支持按标签实时过滤，URL 参数 `?tag=` 可分享

### 性能
- **快速构建** — 全站约 1–2 秒完成构建
- **零运行时 JS 开销** — 图标、样式、布局均为纯 HTML/CSS，Vue 只在搜索等交互区域加载
- **SEO 友好** — 自动生成 meta description、OG 信息、sitemap、RSS

---

## 页面一览

| 路径 | 页面 | 搜索范围 | 功能 |
|------|------|---------|------|
| `/` | 首页 | `all` | 最新文章（4 篇）+ 最新说说（3 条） |
| `/blog` | 文章列表 | `blog` | 按日期排序，标签筛选，计数显示 |
| `/blog/[slug]` | 文章详情 | `blog` | Markdown 渲染，typography 排版，TOC 目录，评论区 |
| `/projects` | 项目 | `projects` | 项目卡片，自动从 GitHub API 拉取数据 |
| `/archive` | 归档 | `archive` | 按年/月归档，链接到文章详情 |
| `/notes` | 说说 | `notes` | 微笔记时间线，支持 Markdown 和图片 |
| `/friends` | 友链 | `all` | 友链网格展示 |
| `/daily` | 恋爱日常 | `all` | 恋爱计时卡 + md 日常记录 |
| `/search` | 搜索 | `all` | 独立搜索页，Fuse.js 全文搜索 |
| `/rss.xml` | RSS 订阅 | — | 自动生成，按发布日期排序 |

---

## 技术栈

| 技术 | 用途 | 版本 |
|------|------|------|
| [Astro](https://astro.build) | 主框架，静态站点生成器 | 7.x |
| [Vue 3](https://vuejs.org) | 交互组件（搜索、评论） | 3.x |
| [Tailwind CSS](https://tailwindcss.com) | 原子化 CSS 样式引擎 | 4.x |
| [@tailwindcss/typography](https://github.com/tailwindlabs/tailwindcss-typography) | Markdown 文章排版 | 0.5.x |
| [@tailwindcss/vite](https://github.com/tailwindlabs/tailwindcss) | Tailwind Vite 插件（v4） | 4.x |
| [Lucide](https://lucide.dev) | 矢量图标库（静态 SVG 路径映射） | 1.x |
| [Fuse.js](https://fusejs.io) | 客户端模糊搜索 | 7.x |
| [marked](https://marked.js.org) | Markdown → HTML 渲染（说说页） | 18.x |
| [Artalk](https://artalk.js.org) | 评论系统后端（自托管） | 2.x |
| [@astrojs/rss](https://docs.astro.build/en/guides/rss/) | RSS 订阅生成 | 4.x |
| [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) | 自动 Sitemap 生成 | 3.x |

---

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器（默认 http://localhost:4321）
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

### 开发服务器 CLI 命令

本项目使用增强版 Astro CLI，支持后台进程管理：

```bash
astro dev --background    # 后台启动开发服务器
astro dev status          # 查看服务器运行状态
astro dev logs            # 查看日志
astro dev stop            # 停止后台服务器
```

---

## 项目结构

```
岚潮的小窝/
├── public/                    # 静态资源（直接复制到构建输出）
│   ├── favicon.ico
│   └── favicon.svg
├── src/
│   ├── components/            # 组件
│   │   ├── Header.astro       # 导航栏 + 全局搜索框 + 暗色模式切换 + 移动端菜单
│   │   ├── Footer.astro       # 页脚（版权信息 + RSS 链接）
│   │   ├── Icon.astro         # 静态 SVG 图标组件（Lucide 路径映射，无客户端 JS）
│   │   ├── BlogCard.astro     # 文章卡片（标题/摘要/日期/标签/分类）
│   │   ├── ProjectCard.astro  # 项目卡片（名称/描述/技术栈/GitHub 星标/分叉数）
│   │   ├── TagPill.astro      # 直角标签组件
│   │   ├── FriendLinks.astro  # 友链网格
│   │   ├── CommentSystem.astro# 评论系统容器（控制启用/禁用）
│   │   ├── GlobalSearch.vue   # 全局搜索（Vue 3 + Fuse.js，URL 参数联动）
│   │   ├── SearchBar.vue      # 独立搜索页搜索框组件
│   │   ├── NotesTimeline.vue  # 说说时间线（Vue 3，可复用）
│   │   ├── ArtalkComments.vue # Artalk 评论系统集成
│   │   └── WalineComments.vue # Waline 评论系统（备选，未启用）
│   ├── layouts/               # 布局
│   │   ├── BaseLayout.astro   # 全局布局（Header + Footer + SEO + 搜索索引构建）
│   │   └── PostLayout.astro   # 文章详情布局（TOC 侧栏 + 评论区）
│   ├── pages/                 # 页面路由
│   │   ├── index.astro        # 首页
│   │   ├── blog/              # 文章系统
│   │   │   ├── index.astro    # 文章列表（标签筛选、计数、URL 参数同步）
│   │   │   └── [...slug].astro# 文章详情（动态路由，TOC，评论）
│   │   ├── projects.astro     # 项目页（GitHub API 数据增强）
│   │   ├── archive.astro      # 归档页（按年/月分组）
│   │   ├── notes.astro        # 说说页（marked 渲染 + 黄金比例图片）
│   │   ├── friends.astro      # 友链页
│   │   ├── daily.astro        # 恋爱日常页（计时卡 + md 日常）
│   │   ├── search.astro       # 独立搜索页
│   │   └── rss.xml.js         # RSS 生成端点
│   ├── content/               # 内容集合（数据源）
│   │   ├── blog/              # 文章 (*.md)
│   │   ├── projects/          # 项目 (*.md)
│   │   ├── notes/             # 说说 (*.md)
│   │   └── friends/           # 友链 (*.yaml)
│   ├── config/                # 配置模块（模块化拆分）
│   │   ├── index.ts           # 统一导出入口
│   │   ├── site.ts            # 站点基本信息（标题、描述、URL、语言、时区）
│   │   ├── author.ts          # 作者信息（姓名、邮箱、头像、简介）
│   │   ├── nav.ts             # 导航菜单配置（标签、路径、图标）
│   │   ├── social.ts          # 社交链接（标签、URL、图标）
│   │   ├── comment.ts         # 评论系统配置（Artask 服务器地址、站点名、语言）
│   │   ├── theme.ts           # 主题配置（默认模式：light/dark/auto）
│   │   ├── blog.ts            # 文章列表配置（每页条数）
│   │   ├── seo.ts             # SEO 配置（Twitter 卡片、OG 图片）
│   │   ├── footer.ts          # 页脚配置（版权年份、自定义文本）
│   │   └── features.ts        # 功能开关（RSS、搜索、暗色切换）
│   ├── content.config.ts      # 内容集合 Schema（blog/projects/notes/friends）
│   └── styles/
│       └── global.css         # Tailwind v4 + CSS 变量 + 明暗双主题 + 黄金比例
├── astro.config.mjs           # Astro 配置（集成、Vite 插件、Markdown 主题）
├── tsconfig.json              # TypeScript 配置
├── package.json
├── .gitignore
├── AGENTS.md                  # AI 辅助开发指引
├── CLAUDE.md                  # 开发工作流说明
└── README.md
```

---

## 内容管理

### 文章 `src/content/blog/*.md`

文章使用 Markdown 格式，文件名为 slug（如 `my-first-post.md` 对应 `/blog/my-first-post`）。

**frontmatter 字段：**

```yaml
---
title: 文章标题
description: 文章摘要（用于列表卡片、搜索索引、SEO meta）
date: 2025-01-01
updated: 2025-01-10        # 最后更新日期（可选，与 date 不同时显示）
author: 作者名             # 文章作者（可选，不填则不显示）
category: 技术             # 文章分类（可选，列表页和详情页显示）
tags: [Astro, Vue, Tailwind]  # 标签数组（可选，用于列表页筛选）
draft: false               # 是否为草稿（可选，true 时不发布到任何页面）
---
```

**功能：**
- 点击文章列表顶部的标签按钮，或文章详情页中的标签，可筛选出该标签下的所有文章
- 筛选状态通过 URL 参数 `?tag=` 持久化，可分享筛选链接
- 草稿文章（`draft: true`）在首页、文章列表、RSS、归档、搜索中均不可见

### 项目 `src/content/projects/*.md`

每个项目一个文件，**只需 GitHub 仓库地址**，页面自动从 GitHub API 获取标题、描述、语言、星标、分叉数：

```yaml
---
repo: https://github.com/用户名/仓库名
---
```

> **注意：** Schema 只强校验 `repo` 字段，额外写入 `title`、`description`、`tech` 等字段不会报错，但页面展示以 GitHub API 返回的数据为准。

### 说说 `src/content/notes/*.md`

微笔记格式，**没有标题字段，正文即内容**：

```markdown
---
date: 2025-01-01 14:30
---

今天完成了一个新功能。

![图片描述](https://example.com/image.jpg)
```

**图片自动黄金比例缩放：**
- 通过 `marked` 自定义渲染器，图片自动包裹 `.note-img-wrap` 容器
- 客户端 JS 检测图片横竖方向，按黄金比例约束：
  - **横向图片** → 约束在 **260×160** 框内（φ ≈ 1.625）
  - **竖向图片** → 约束在 **160×260** 框内
- 移动端：横向 180×110，竖向 110×180

### 友链 `src/content/friends/*.yaml`

每个文件一条友链，YAML 格式：

```yaml
name: 站点名称
url: https://example.com
description: 站点描述
```

---

## 配置中心

所有配置按模块拆分在 `src/config/` 目录下，通过 `src/config/index.ts` 统一导出。修改对应文件即可自定义博客的各个部分。

| 文件 | 配置项 | 说明 |
|------|--------|------|
| `site.ts` | `title`、`description`、`url`、`lang`、`timezone` | 站点基本信息 |
| `author.ts` | `name`、`email`、`avatar`、`bio`、`website` | 作者信息 |
| `nav.ts` | `label`、`path`、`icon` | 导航菜单（数组） |
| `social.ts` | `label`、`url`、`icon` | 社交链接（数组，展示在首页） |
| `comment.ts` | `enabled`、`server`、`site`、`locale` | 评论系统 |
| `theme.ts` | `default` | 默认主题模式（`light` / `dark` / `auto`） |
| `blog.ts` | `pageSize` | 文章列表每页条数 |
| `seo.ts` | `twitterCard`、`ogImage` | SEO 配置 |
| `footer.ts` | `showCopyright`、`since`、`customText` | 页脚版权信息 |
| `features.ts` | `rss`、`search`、`darkModeToggle` | 功能开关（布尔值） |

---

## 搜索机制

全局搜索使用 **Vue 3 + Fuse.js** 实现，`BaseLayout.astro` 在构建时自动收集所有内容建立搜索索引。

**搜索权重：**
| 字段 | 权重 |
|------|------|
| 标题 | 2.0 |
| 标签 | 1.5 |
| 描述 | 1.0 |

**搜索范围控制：**
`BaseLayout` 接收 `searchScope` prop，自动过滤搜索结果：

- `all` —— 首页、友链，搜索所有内容
- `blog` —— 文章列表 / 详情 / 归档，只搜文章
- `projects` —— 只搜项目
- `notes` —— 只搜说说

**搜索源：**
- **文章：** 标题、摘要、标签
- **项目：** 从 GitHub 仓库名提取标题
- **说说：** 正文前 60 字作为标题，前 120 字作为描述

---

## 评论系统

本项目使用 **Artalk** 作为评论系统，同时保留 Waline 组件作为备选。

### 当前配置

实际运行的是 **Artalk**（`src/components/ArtalkComments.vue`），需自托管后端：

```ts
// src/config/comment.ts
export const comment = {
  enabled: true,
  server: 'https://你的-artalk-后端.com',   // Artalk 后端地址
  site: '你的站点名',                         // 在 Artalk 管理后台创建的站点名
  locale: 'zh-CN',
};
```

**Artalk 后端部署：**
1. 在 [GitHub](https://github.com/ArtalkJS/Artalk) 下载 Artalk 服务端
2. 部署到 VPS / Docker / Railway 等平台
3. 创建站点并获取后端地址
4. 管理后台：`你的后端地址/ui/`

### 切换为 Waline

项目包含 Waline 组件（`src/components/WalineComments.vue`），如需切换：
1. 编辑 `src/components/CommentSystem.astro`，将 `ArtalkComments` 替换为 `WalineComments`
2. 修改 `src/config/comment.ts` 中的 `server` 字段为 Waline 后端地址
3. 部署 Waline 后端（支持 Vercel / Cloudflare Workers）

---

## 设计说明

### 配色

| 令牌 | 浅色模式 | 暗色模式 | 用途 |
|------|---------|---------|------|
| `--color-bg` | `#ffffff` | `#111111` | 页面背景 |
| `--color-fg` | `#111111` | `#e0e0e0` | 正文文字 |
| `--color-muted` | `#666666` | `#888888` | 辅助文字 |
| `--color-border` | `#d4d4d4` | `#333333` | 边框线 |
| `--color-hover` | `#f5f5f5` | `#1a1a1a` | 悬停背景 |
| `--color-black` | `#000000` | `#ffffff` | 强调色（暗色反转） |
| `--color-white` | `#ffffff` | `#111111` | 反色文字背景 |
| `--color-card` | `#ffffff` | `#181818` | 卡片背景 |
| 代码块背景 | `#1e1e2e` | `#1e1e2e` | 代码块（固定深色，不随主题变） |

### 排版

- **字体栈：** `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- **等宽字体：** `JetBrains Mono, "Fira Code", monospace`
- **文章排版：** `@tailwindcss/typography` 的 `prose` 类，视觉行距舒适
- **代码块：** 深色背景 `#1e1e2e` + Catppuccin 配色，代码高亮使用 Shiki（`one-dark-pro` 主题）

### 图标

- 所有图标来自 Lucide，无品牌图标（如 GitHub/Twitter），使用 `globe` 替代
- Bilibili 图标为自定义 SVG 路径
- 图标通过 `src/components/Icon.astro` 静态映射为内联 SVG，**零运行时 JS 开销**
- 添加新图标：在 `Icon.astro` 的 `icons` 对象中添加 SVG 路径数组

### 暗色模式

- 默认跟随系统（`prefers-color-scheme`），通过 `theme.default: 'auto'` 配置
- 用户可手动切换，选择持久化到 `localStorage.theme`
- 页面加载时通过内联 `<script>` 立即应用，无闪烁
- 暗色下黑白反转：`--color-black ↔ #ffffff`，`--color-white ↔ #111111`
- 功能开关：`features.darkModeToggle` 控制是否显示切换按钮

---

## 自定义指南

### 修改导航菜单

编辑 `src/config/nav.ts`：

```ts
export const nav: NavItem[] = [
  { label: '首页', path: '/', icon: 'home' },
  // 添加或修改条目
];
```

图标名参考 `src/components/Icon.astro` 中的 `icons` 映射表。

### 修改社交链接

编辑 `src/config/social.ts`：

```ts
export const social: SocialLink[] = [
  { label: 'GitHub', url: 'https://github.com/你的用户名', icon: 'globe' },
];
```

### 自定义页脚

编辑 `src/config/footer.ts`：

```ts
export const footer: FooterConfig = {
  showCopyright: true,
  since: 2025,
  customText: '由 Astro 驱动',
};
```

### 添加新页面

1. 在 `src/pages/` 下创建 `.astro` 文件
2. 使用 `BaseLayout` 布局并传入 `title`、`searchScope` 等 prop
3. 如需导航入口，在 `src/config/nav.ts` 中添加菜单项
4. 如需新内容类型，在 `src/content.config.ts` 中添加集合定义
5. 重启开发服务器或等待 HMR 刷新

---

## 常见问题

### 评论系统显示「已启用但未配置服务端地址」？

编辑 `src/config/comment.ts`，设置正确的 Artalk 后端地址：

```ts
server: 'https://你的-artalk-后端.com',
```

### 如何添加新的图标？

在 `src/components/Icon.astro` 的 `icons` 对象中添加 SVG 路径数组：

```ts
icons: {
  // 已有图标...
  'my-icon': [
    ['path', { d: 'M...' }],
  ],
}
```

### 如何让文章在首页置顶？

目前首页按日期排序显示最新 4 篇，若需置顶功能，可在 `src/pages/index.astro` 中调整排序逻辑，或在文章 frontmatter 中添加 `featured: true` 字段并修改 Schema。

### 构建时报内存不足？

`lucide` 包包含 2000+ 图标，本项目使用静态 SVG 路径映射（`Icon.astro`），避免导入整个包。如果仍遇到问题，请确保系统有足够内存，或增加 Node.js 内存限制：

```bash
NODE_OPTIONS="--max-old-space-size=512" npm run build
```

### 如何部署？

构建后输出在 `dist/` 目录，可部署到任意静态托管：

- **Vercel / Netlify** — 直接连接 Git 仓库，自动识别 Astro
- **Cloudflare Pages** — 设置构建命令 `npm run build`，输出目录 `dist`
- **GitHub Pages** — 使用 `actions/upload-pages-artifact` Action
- **任意静态服务器** — 将 `dist/` 目录上传到服务器即可

---

## 开发命令

```bash
npm run dev       # 开发服务器（HMR 热更新）
npm run build     # 生产构建 → dist/
npm run preview   # 预览构建结果
npm run astro     # Astro CLI 快捷入口
```

---

## License

MIT