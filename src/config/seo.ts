/** SEO 配置 */
export interface SeoConfig {
  /** Twitter 卡片类型 */
  twitterCard: 'summary' | 'summary_large_image';
  /** 默认 OG 分享图路径 */
  ogImage?: string;
}

export const seo: SeoConfig = {
  twitterCard: 'summary_large_image',
  ogImage: '',
};