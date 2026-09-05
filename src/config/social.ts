/** 社交链接项 */
export interface SocialLink {
  /** 显示文本 */
  label: string;
  /** 链接地址 */
  url: string;
  /** 图标名（参考 Icon.astro 中的 icons 映射） */
  icon: string;
}

/** 社交链接（展示在关于页） */
export const social: SocialLink[] = [
  { label: 'GitHub', url: 'https://github.com', icon: 'globe' },
  { label: '哔哩哔哩', url: 'https://space.bilibili.com', icon: 'bilibili' },
  { label: '邮箱', url: 'mailto:hello@example.com', icon: 'mail' },
];