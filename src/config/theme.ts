/** 主题配置 */
export interface ThemeConfig {
  /** 默认主题 */
  default: 'light' | 'dark' | 'auto';
}

export const theme: ThemeConfig = {
  default: 'auto',
};