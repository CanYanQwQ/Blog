/**
 * 极简博客岚潮的小窝 — 配置中心
 *
 * 所有配置按分类放在 src/config/ 目录下，
 * 修改对应文件即可自定义博客的各个部分。
 */

export { site } from './site';
export type { SiteInfo } from './site';

export { author } from './author';
export type { AuthorInfo } from './author';

export { nav } from './nav';
export type { NavItem } from './nav';

export { social } from './social';
export type { SocialLink } from './social';

export { comment } from './comment';
export type { CommentConfig } from './comment';

export { theme } from './theme';
export type { ThemeConfig } from './theme';

export { blog } from './blog';
export type { BlogConfig } from './blog';

export { seo } from './seo';
export type { SeoConfig } from './seo';

export { footer } from './footer';
export type { FooterConfig } from './footer';

export { features } from './features';
export type { FeaturesConfig } from './features';