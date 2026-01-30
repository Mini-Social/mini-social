import { formatDistanceToNowStrict } from 'date-fns';
import { vi } from 'date-fns/locale';

export const FormatDate = (date: Date | string, addSuffix: boolean) =>
  formatDistanceToNowStrict(date, {
    addSuffix,
    locale: vi,
  });
