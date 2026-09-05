/** 文章列表配置 */
export interface BlogConfig {
  /** 每页文章数 */
  pageSize: number;
}

export const blog: BlogConfig = {
  pageSize: 10,
};