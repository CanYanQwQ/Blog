# AGENTS.md

This file provides guidance to coding agents when working with code in this repository.

## Mandatory project rules — must follow

These rules are mandatory for every design, implementation, review, and content-related change in this repository:

1. **No blue-purple gradients.** Do not use blue-purple gradients or similar blue/violet gradient treatments in the UI, illustrations, backgrounds, buttons, cards, or other visual elements.
2. **No emoji or sticker-style UI graphics.** Do not add emojis, emoji-like decorations, stickers, or emoticons to the UI or decorative visuals. Use the existing icon library (`src/components/Icon.astro` / Lucide) or custom SVG/vector artwork instead. Do not replace an icon with a text symbol.
3. **Check these rules before delivery.** Before considering a change complete, inspect the affected UI and styles for violations and remove any newly introduced violation.

## Behavioral guidelines

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

### 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked. 
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

### 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

## Development commands

- Requires Node.js `>=22.12.0` and npm.
- Install dependencies: `npm install`
- Start the HMR development server: `npm run dev` (normally `http://localhost:4321`).
- Build the static site: `npm run build` (writes to `dist/`; ~1.5s, 9 pages).
- Preview the last production build: `npm run preview`.
- Run the Astro CLI: `npm run astro -- <command>`.
- The repository has no lint script, test runner, or test files. There is no single-test command.
- **`npm run build` is not a type check.** Neither `typescript` nor `@astrojs/check` is installed, so `astro build` skips type checking entirely and will emit HTML from type-broken sources. Validation is build success plus route smoke checks. Running `npx astro check` requires installing `@astrojs/check` first.
- **Check which project is on port 4321 before smoke-testing.** Another Astro project (`E:\nas目录\项目\博客开发`) commonly runs a preview server there. Hitting `http://localhost:4321` may silently validate the wrong codebase; confirm via `<title>`, or run this project on a different port.
- The Astro CLI also has background-server commands: `npm run astro -- dev --background`, `dev status`, `dev logs`, `dev stop`.

## Architecture

This is a static Astro site. Pages execute at build time, read content collections and typed configuration, and generate HTML in `dist/`. There is no application backend or database.

- `src/pages/` defines routes. The home page, lists, archive, RSS endpoint, and search page query collections directly. `src/pages/blog/[...slug].astro` uses `getStaticPaths()` to create one page per non-draft blog post, renders Markdown with Astro Content, and derives the h2/h3 table of contents from the rendered headings.
- `src/layouts/BaseLayout.astro` is the shared document shell. It imports global styles, renders `Header` and `Footer`, and owns metadata such as canonical URLs, Open Graph/Twitter tags, JSON-LD, robots, and RSS links. `PostLayout.astro` is an older blog wrapper; the current dynamic blog route uses `BaseLayout` directly.
- `src/components/` contains mostly build-time Astro UI components. Vue is reserved for interactive islands: `GlobalSearch.vue` (scoped search dropdown), `SearchBar.vue` (standalone blog search), and the Artalk/Waline comment integrations. Islands are hydrated from pages with `client:load`.
- `src/content.config.ts` defines the `blog`, `projects`, `notes`, `daily`, and `friends` collections using glob loaders. Blog frontmatter requires `title`, `description`, and `date`, with optional `updated`, `author`, `category`, `tags`, and `draft`; all page/feed routes that publish articles filter out drafts. Projects use a Markdown file containing a GitHub `repo`; notes and daily entries use Markdown bodies with a `date`; friends use YAML.
- Only `src/content/blog/` and `src/content/daily/` currently contain entries. The `projects`, `notes`, and `friends` loader directories are absent, so builds succeed but emit empty-collection warnings and those pages render empty states. Add the expected directories/content when enabling those sections.
- `src/lib/search.ts` builds the serialized search index from non-draft blogs, projects, and notes. Individual pages call `filterByScope()` and pass the result to `GlobalSearch`; `BaseLayout`'s `searchScope` prop is descriptive and does not itself build or filter the index. `/search` independently supplies only non-draft blog data to `SearchBar`.
- `src/pages/projects.astro` enriches project cards with GitHub REST API data during the static build (name, description, language/topics, stars, forks), with a repository-name fallback when the URL or request is unusable. Project builds therefore need network access when project entries exist.
- `src/styles/global.css` configures Tailwind CSS v4, typography, warm editorial design tokens, responsive layout, card/search styles, Markdown prose, note image sizing, and the light/dark themes. `src/config/theme.ts` currently defaults to dark; `BaseLayout` applies the initial theme before paint (both adding *and* removing the `dark` class) and `Header.astro` persists manual choices in `localStorage.theme`.
- `src/config/` is the typed configuration center, re-exported through `src/config/index.ts`. Update the relevant module for site metadata, author profile, navigation, social links, daily timer, comments, theme, blog settings, SEO, footer, and feature flags. Keep `site.url` in sync with the `site` value in `astro.config.mjs` when changing the deployment domain.

## Build-time traps

These are non-obvious, cross-file hazards. Read before touching Markdown rendering or adding pages.

- **Two Markdown rendering paths.** `blog/[...slug].astro` is the only route that uses Astro's `render()` (and the only one with a TOC). The home page, `notes.astro`, and `daily.astro` instead pipe `entry.body` through a `marked` instance with a custom image renderer that wraps `<img>` in `.note-img-wrap`. Adding a section that renders Markdown means choosing a path deliberately, not by copy-paste.
- **Never mutate the module-global `marked` singleton.** Each Markdown-parsing page builds its own `new Marked({ renderer })` instance and parses with that. This is deliberate: `marked` exports a shared singleton, and `marked.use()` **cannot be undone** — passing `{ renderer: { image: undefined } }` to "reset" it does not restore the default, it leaves the image renderer permanently undefined. Any later parse containing a Markdown image then throws `TypeError: Cannot read properties of undefined (reading 'apply')`. The old code did exactly this on three pages and only built because the last polluter happened to be prerendered last; adding a note with an image would have broken the build. Keep the per-page instance pattern — do not "simplify" it back to a shared `marked.use()` call.
- **Blog URLs are not strictly filename-derived.** The glob loader's id function returns a frontmatter `slug` field when present, before schema validation, even though no schema declares it. Setting `slug:` in frontmatter changes the route, the card href, the archive link, and the RSS link.
- **`searchScope` is a dead prop.** `BaseLayout` accepts it and never reads it; each page filters its own index by calling `filterByScope()` before passing `items` to `GlobalSearch`. Adding a page does not require passing `searchScope` to get scoped search.
- **Tag values are interpolated into an inline `onclick` in `blog/index.astro` without escaping single quotes** (Astro escapes only `&` and `"` in attributes). Tag names are author-controlled today, but do not extend this pattern to untrusted input. The same page's tag links are also built without `encodeURIComponent`, so tags containing `+`, `#`, or `&` break the `?tag=` round trip.

## Content and behavior notes

- Blog filenames become IDs and URLs (`src/content/blog/foo.md` -> `/blog/foo`); keep filenames stable when links must remain valid. A frontmatter `slug` overrides this (see Build-time traps).
- The home page shows the four newest non-draft posts and three newest notes. The blog list supports client-side tag filtering and the `?tag=` URL parameter. The archive groups posts by year and month.
- Markdown notes and daily entries are rendered with `marked`; custom image rendering adds `.note-img-wrap`, and browser-side code classifies images as landscape or portrait for the configured size limits.
- `daily.title` supports a `{days}` placeholder, substituted at build time and kept live on the client by the page's timer script. Use it rather than hardcoding a day count, which drifts out of sync with the timer.
- Comments are enabled through `src/config/comment.ts` and currently use the Artalk Vue integration. The Waline component is an alternative but is not mounted by `CommentSystem.astro`. Comments render only on blog detail pages; the Artalk client script and stylesheet are injected from unpkg at runtime.
- Browser favicon files are static: `public/favicon.png` (64×64, referenced from `BaseLayout.astro`) and `public/favicon.ico` (16/32/48/64 multi-size), both generated from `public/avatar.jpg`. Changing the avatar does not regenerate them.
- The visual system is intentionally typography-led with warm neutral colors and terracotta accents. Reuse the existing CSS tokens and static `Icon.astro` SVG mapping when extending the UI; the mandatory visual rules above always take priority.
- Some config fields are declared but never read: `features.search`, `blog.pageSize` (the blog list is unpaginated), `footer.showCopyright`, `site.timezone`, and `author.email`. Wiring one up means adding the consumer, not just the value.
- `src/components/NotesTimeline.vue`, `src/components/WalineComments.vue`, `src/components/TagPill.astro`, and `src/layouts/PostLayout.astro` are imported nowhere. Leave them alone unless asked.

## Documentation status

`README.md` was rewritten to match current behavior and is now usable as a description of the site: design tokens, radius scale, search mechanics, comment setup, content formats, and deployment. `AGENTS.md` (this file) remains the authoritative source for architecture and build-time hazards — prefer reading the source when the two disagree.

## Repository references

- `README.md` covers content formats, configuration, design tokens, and deployment. It is accurate as of the last rewrite; if you change behavior it describes, update it in the same change.
- `astro.config.mjs` and `tsconfig.json` are the authoritative build and TypeScript configuration.
- `dist/` and `.astro/` are generated/ignored output; do not edit them as source.
