/** 作者信息 */
export interface AuthorInfo {
  /** 作者名 */
  name: string;
  /** 邮箱 */
  email: string;
  /** 头像图片路径（留空显示默认图标） */
  avatar?: string;
  /** 一句话角色/头衔 */
  role?: string;
  /** 简介 */
  bio: string;
  /** 个人主页链接 */
  website?: string;
}

export const author: AuthorInfo = {
  name: '残颜',
  email: 'canyan886@gmail.com',
  avatar: '/avatar.jpg',
  role: '无业游民',
  bio: '无业游民一枚，对 IT 和 AI 上头，日常靠 AGENT 编程自娱自乐。',
  website: 'https://zhouwanx.top',
};
