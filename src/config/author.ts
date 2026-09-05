/** 作者信息 */
export interface AuthorInfo {
  /** 作者名 */
  name: string;
  /** 邮箱 */
  email: string;
  /** 头像图片路径（留空显示默认图标） */
  avatar?: string;
  /** 简介 */
  bio: string;
  /** 个人主页链接 */
  website?: string;
}

export const author: AuthorInfo = {
  name: '作者',
  email: 'hello@example.com',
  avatar: '',
  bio: '开发者 / 设计师',
  website: '',
};