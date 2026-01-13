import { formatDistanceToNowStrict } from 'date-fns';
import { vi } from 'date-fns/locale';

export const FormatDate = (date: string, addSuffix: boolean) =>
  formatDistanceToNowStrict(date, {
    addSuffix,
    locale: vi,
  });
