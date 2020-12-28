export const DEFAULT_PATTERN = "dd.MM.yyyy hh:mm:ss";
export const DEFAULT_PATTERN_WITHOUT_SECONDS = "dd.MM.yyyy hh:mm";

export const format = (date: Date, pattern: string) => {
  return pattern.replace("yyyy", date.getFullYear().toString())
    .replace("MM", date.getMonth().toString())
    .replace("dd", date.getDate().toString())
    .replace("hh", date.getHours().toString())
    .replace("mm", date.getMinutes().toString())
    .replace("ss", date.getSeconds().toString());
}