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
  title: '岚潮的小窝',
  description: '岚潮的博客：无业游民一枚，对 IT 和 AI 上头，日常靠 AGENT 编程自娱自乐。',
  url: 'https://blog.zhouwanx.top',
  lang: 'zh-CN',
  timezone: 'Asia/Shanghai',
  tagline: '无业游民一枚，对 IT 和 AI 上头，日常靠 AGENT 编程自娱自乐。',
};