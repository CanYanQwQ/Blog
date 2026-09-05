# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development commands

- Requires Node.js `>=22.12.0` and npm.
- Install dependencies: `npm install`
- Start the HMR development server: `npm run dev` (normally `http://localhost:4321`)
- Start it in the repository's background mode: `npm run dev -- --background`
- Manage a background server through the local CLI: `npm run astro -- dev status`, `npm run astro -- dev logs`, and `npm run astro -- dev stop`. Calling `astro` directly only works when the local npm binary directory is on `PATH`.
- Build the static site into `dist/`: `npm run build`
- Serve the last production build: `npm run preview`
- The build generates Astro types and is the available type-validation step; there is no separate `typecheck` script.
- There are currently no lint or test scripts, test runner, or test files configured. Do not assume a single-test command exists; use `npm run build` and route smoke checks for validation.

## Architecture

This is a static Astro site. Pages fetch content and configuration in their frontmatter and are rendered to HTML at build time. Vue is used only for interactive islands, so most of the site has no client-side JavaScript.

- `src/pages/` defines the routes. The blog list, archive, RSS endpoint, home page, and search page each query content collections directly. `src/pages/blog/[...slug].astro` uses `getStaticPaths()` to create one static page per non-draft blog entry and uses Astro's `render()` to render Markdown and extract headings for the table of contents.
- `src/layouts/BaseLayout.astro` is the shared shell: it imports global styles, renders `Header` and `Footer`, sets document metadata, and builds the serialized search index from the blog, project, and note collections. `Header.astro` passes that index to the `GlobalSearch.vue` island. `PostLayout.astro` exists as a blog-oriented wrapper, but the current dynamic blog route uses `BaseLayout` directly.
- `src/content.config.ts` defines the four content collections and their loaders: Markdown blog posts, Markdown projects containing a GitHub `repo`, Markdown notes containing a `date`, and YAML friend links. Only `src/content/blog/` currently contains entries; absent `projects`, `notes`, and `friends` directories produce build warnings and empty collections, but the build still succeeds.
- `src/config/` is the typed configuration center. Change site metadata, author details, navigation, social links, comments, theme defaults, blog settings, SEO, footer, and feature flags in the relevant module; `src/config/index.ts` is the import surface used by the rest of the app.
- Vue components such as `GlobalSearch.vue`, `SearchBar.vue`, the note timeline, and comment integrations are hydrated from Astro with `client:load`. `GlobalSearch.vue` uses Fuse.js over the build-time index; comments are an external Artalk/Waline integration controlled by `src/config/comment.ts`.
- `src/styles/global.css` contains Tailwind CSS v4 setup, CSS theme variables, responsive styles, and the light/dark theme rules. `astro.config.mjs` wires Vue, the Tailwind Vite plugin, sitemap generation, static site output, and Shiki's `one-dark-pro` Markdown code theme.
- The projects page calls the GitHub REST API during the static build to enrich repository cards; it falls back to repository-name-only data when the URL is invalid or the request fails. Builds therefore may need network access when project entries exist.

## Content and behavior notes

- Blog frontmatter is validated by the collection schema (`title`, `description`, `date`, optional `updated`, `author`, `category`, `tags`, and `draft`). The home page, blog list, dynamic route, archive, and RSS filter out drafts. When changing draft visibility, also inspect `src/pages/search.astro`, which currently builds its own post list.
- Blog IDs are derived from filenames and become `/blog/<id>` routes. Keep filenames stable when links must remain valid.
- Markdown note bodies are rendered with `marked`; custom image rendering adds `.note-img-wrap`, and client-side code applies landscape/portrait sizing based on the image's natural dimensions.
- The visual language is intentionally square, monochrome, and typography-led. Never use blue-purple gradients or other blue/purple gradient treatments. Never use emojis or emoji-like decorative graphics; use the existing icon library first, and use vector SVG artwork when a custom graphic is needed.
- `site.url` in `src/config/site.ts` and `site` in `astro.config.mjs` are deployment placeholders and should be updated together when configuring a real domain. External comment settings in `src/config/comment.ts` also need a reachable backend.

## Behavioral guidelines

### Think before coding

- State assumptions before implementing. If the request is ambiguous, surface the ambiguity and ask instead of silently choosing an interpretation.
- When multiple approaches exist, briefly explain the tradeoffs and mention a simpler viable option. Push back when the requested approach is unnecessarily complex.

### Simplicity first

- Implement only what was requested; do not add speculative features, abstractions, configurability, or error handling for impossible states.
- Prefer the smallest implementation that solves the problem. Reconsider any implementation that is substantially more complex than necessary.

### Surgical changes

- Touch only the code required by the request. Match the surrounding style and do not refactor unrelated code, comments, or formatting.
- If a change makes an import, variable, or function unused, remove that orphan. Do not remove unrelated pre-existing dead code; mention it instead.
- Every changed line should trace directly to the user's request.

### Goal-driven execution

- Define concrete success criteria for each task and verify them.
- For multi-step work, state a brief plan with a verification step for each stage, then continue until the criteria are met.
