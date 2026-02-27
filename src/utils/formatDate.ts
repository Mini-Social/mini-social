import { formatDistanceToNowStrict } from 'date-fns';
import { vi } from 'date-fns/locale';

export const FormatDate = (date: Date | string, addSuffix: boolean) => {
  const diffInSeconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000,
  );
  if (diffInSeconds < 60) {
    return 'vừa xong';
  }
  return formatDistanceToNowStrict(date, {
    addSuffix,
    locale: vi,
  });
};
