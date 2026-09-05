/** 站点基本信息 */
export interface SiteInfo {
  /** 站点标题 */
  title: string;
  /** 站点描述（SEO） */
  description: string;
  /** 站点 URL */
  url: string;
  /** 站点语言 */
  lang: string;
  /** 时区 */
  timezone: string;
  /** 站点标语/副标题 */
  tagline: string;
}

export const site: SiteInfo = {
  title: '极简博客岚潮的小窝',
  description: '岚潮的小窝：一个极简风格的个人博客',
  url: 'https://example.com',
  lang: 'zh-CN',
  timezone: 'Asia/Shanghai',
  tagline: '岚潮的更小窝 — 记录、分享与探索',
};