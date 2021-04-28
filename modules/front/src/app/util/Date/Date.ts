export const DEFAULT_DATE_TIME_PATTERN = "DD.MM.YYYY hh:mm:ss";
export const DEFAULT_DATE_TIME_PATTERN_WITHOUT_SECONDS = "DD.MM.YYYY hh:mm";
export const DEFAULT_DATE_PATTERN = "DD.MM.YYYY";

export const format = (date: Date, pattern: string = DEFAULT_DATE_PATTERN): string => {
  if (!date) return '';
  return pattern.replace("YYYY", date.getFullYear().toString())
    .replace("MM", wrapZero(date.getMonth() + 1))
    .replace("DD", wrapZero(date.getDate()))
    .replace("hh", wrapZero(date.getHours()))
    .replace("mm", wrapZero(date.getMinutes()))
    .replace("ss", wrapZero(date.getSeconds()));
};

export const formatDate = (date: number | string | Date | null, pattern: string = DEFAULT_DATE_PATTERN): string => {
  if (!date) return '';
  return format(new Date(date), pattern);
};

const wrapZero = (value: number): string => {
  return (value < 10 ? '0' : '') + value;
};
