/** 页脚配置 */
export interface FooterConfig {
  /** 是否显示版权年份 */
  showCopyright: boolean;
  /** 建站年份 */
  since: number;
  /** 自定义文本（可选，会显示在版权信息旁） */
  customText?: string;
}

export const footer: FooterConfig = {
  showCopyright: true,
  since: 2025,
  customText: '',
};