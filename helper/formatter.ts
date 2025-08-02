import { format, formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';

const customLocale = {
  ...enUS,
  formatDistance: (token: string, count: number, options?: any): string => {
    const base = enUS.formatDistance(token as any, count, options);
    return base.replace(/^about /, '').replace(/^over /, '').replace(/^almost /, '');
  },
};

function sanitizeDateString(input: string): string {
  // If it has microseconds (6+ digits after dot), trim to 3 for milliseconds
  return input.replace(/\.(\d{3})\d+/, '.$1');
}

export function formatFullDateWithAgo(
  dateInput: string | Date,
  withTime: boolean = false
): string {
  let date: Date;

  if (typeof dateInput === 'string') {
    const sanitized = sanitizeDateString(dateInput);
    // Make sure it's parsed correctly with timezone; fallback to UTC if no zone info
    const finalInput =
      sanitized.endsWith('Z') || sanitized.includes('+') ? sanitized : sanitized + 'Z';
    date = new Date(finalInput);
  } else {
    date = dateInput;
  }

  if (isNaN(date.getTime())) return 'Invalid date';

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

