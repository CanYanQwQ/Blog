/** 评论系统配置 */
export interface CommentConfig {
  /** 是否启用评论系统 */
  enabled: boolean;
  /** Artalk 后端地址（部署后获取） */
  server: string;
  /** Artalk 站点名称（需在管理后台创建） */
  site: string;
  /** 语言 */
  locale: string;
}

export const comment: CommentConfig = {
  enabled: true,
  server: 'https://artalk.zhouwanx.top',
  site: '博客',
  locale: 'zh-CN',
};