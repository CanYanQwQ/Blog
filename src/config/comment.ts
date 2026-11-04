/** 评论系统配置（Waline 自托管） */
export interface CommentConfig {
  /** 是否启用评论系统 */
  enabled: boolean;
  /** Waline 服务端地址 */
  server: string;
}

export const comment: CommentConfig = {
  enabled: true,
  server: 'https://waline.zhouwanx.top',
};
