/** 导航菜单项 */
export interface NavItem {
  /** 显示文本 */
  label: string;
  /** 链接路径 */
  path: string;
  /** 图标名（参考 Icon.astro 中的 icons 映射） */
  icon: string;
}

/** 博客区导航（显示在侧边栏「博客区」分组下） */
export const nav: NavItem[] = [
  { label: '首页', path: '/', icon: 'home' },
  { label: '文章', path: '/blog', icon: 'file-text' },
  { label: '项目', path: '/projects', icon: 'briefcase' },
  { label: '归档', path: '/archive', icon: 'archive' },
  { label: '说说', path: '/notes', icon: 'message-square' },
  { label: '友链', path: '/friends', icon: 'link' },
];

/** 「更多」分组 */
export const more: NavItem[] = [
  { label: '恋爱日常', path: '/daily', icon: 'heart' },
];