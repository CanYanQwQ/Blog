/** 功能开关 */
export interface FeaturesConfig {
  /** 是否显示 RSS 链接 */
  rss: boolean;
  /** 是否启用全局搜索 */
  search: boolean;
  /** 是否显示暗色模式切换按钮 */
  darkModeToggle: boolean;
}

export const features: FeaturesConfig = {
  rss: true,
  search: true,
  darkModeToggle: true,
};