/** 恋爱日常配置（TSH ♥ CXY） */
export interface DailyConfig {
  /** 双方昵称 */
  names: { left: string; right: string };
  /** 双方头像（可留空显示首字母圆形占位） */
  avatars: { left?: string; right?: string };
  /** 在一起开始日期（YYYY-MM-DD），用于实时计算天数 */
  startDate: string;
  /** 副标题文案，`{days}` 会替换为在一起的天数 */
  title: string;
}

export const daily: DailyConfig = {
  names: { left: 'TSH', right: 'CXY' },
  avatars: { left: '', right: '' },
  startDate: '2026-01-06',
  title: '我和宝宝在一起已经 {days} 天',
};
