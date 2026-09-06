/** 社交链接项 */
export interface SocialLink {
  /** 显示文本 */
  label: string;
  /** 链接地址 */
  url: string;
  /** 图标名（参考 Icon.astro 中的 icons 映射） */
  icon: string;
  /** 品牌强调色（用于悬停/图标强调） */
  color?: string;
}

/** 社交链接（展示在首页） */
export const social: SocialLink[] = [
  { label: 'GitHub', url: 'https://github.com/CanYanQwQ', icon: 'globe', color: '#18181B' },
  { label: '哔哩哔哩', url: 'https://space.bilibili.com/3546714340330136', icon: 'bilibili', color: '#FB7299' },
  { label: '邮箱', url: 'mailto:canyan886@gmail.com', icon: 'mail', color: '#D97706' },
];
