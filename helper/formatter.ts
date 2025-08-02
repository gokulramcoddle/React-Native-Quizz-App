import { format, formatDistanceToNow } from 'date-fns';
import { enUS, type FormatDistanceToken } from 'date-fns/locale';

const customLocale = {
  ...enUS,
  formatDistance: (token: FormatDistanceToken, count: number, options?: any): string => {
    const base = enUS.formatDistance(token, count, options);
    return base.replace(/^about /, '').replace(/^over /, '').replace(/^almost /, '');
  },
};

export function formatFullDateWithAgo(dateInput: string | Date, withTime: boolean = false): string {
  const date = new Date(dateInput);

  const dateFormat = withTime ? 'dd MMMM yyyy, hh:mm a' : 'dd MMMM yyyy';
  const formattedDate = format(date, dateFormat);

  const timeAgo = formatDistanceToNow(date, {
    addSuffix: true,
    locale: customLocale,
  });

  return `${formattedDate} (${timeAgo})`;
}

export function formatName(name: string): string {
  return name
    .trim()                              // remove leading/trailing spaces
    .split(/\s+/)                        // split by any number of spaces
    .map(word =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(' ');                          // re-join with single space
}

