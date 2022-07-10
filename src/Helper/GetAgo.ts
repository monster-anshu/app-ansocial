import { Round } from 'Helper';
export const GetAgo = (postDate: string) => {
  const postTime = new Date(postDate);
  const currentTime = new Date();
  const diffSec = (currentTime.getTime() - postTime.getTime()) / 1000;
  const diffMin = diffSec / 60;
  const diffHour = diffMin / 60;
  const diffDay = diffHour / 24;
  const diffWeek = diffDay / 7;
  const diffMonth = diffWeek / 4;
  const diffYear = diffMonth / 12;
  if (diffSec < 60) return 'Just Now';
  if (diffMin < 60) return `${Round(diffMin)} min Ago`;
  if (diffHour < 24) return `${Round(diffHour)} hour Ago`;
  if (diffDay < 7) return `${Round(diffDay)} day Ago`;
  if (diffWeek < 4) return `${Round(diffWeek)} week Ago`;
  if (diffMonth < 12) return `${Round(diffMonth)} month Ago`;
  return `${diffYear} year Ago`;
};
