import moment from "moment";
import { DEFAULT_DATE_PARSE_FORMAT } from "../../../cuba/services";

export const DEFAULT_DATE_TIME_PATTERN = "DD.MM.YYYY hh:mm:ss";
export const DEFAULT_DATE_TIME_PATTERN_WITHOUT_SECONDS = "DD.MM.YYYY hh:mm";
export const DEFAULT_DATE_PATTERN = "DD.MM.YYYY";

export const format = (date: Date, pattern: string) => {
  return pattern.replace("yyyy", date.getFullYear().toString())
    .replace("MM", wrapZero(date.getMonth() + 1))
    .replace("dd", wrapZero(date.getDate()))
    .replace("hh", wrapZero(date.getHours()))
    .replace("mm", wrapZero(date.getMinutes()))
    .replace("ss", wrapZero(date.getSeconds()));
};

export const formatDefaultDate = (date: Date) => {
  return format(date, 'dd.MM.yyyy')
};

export const formatDefaultDateFromString=(date: any)=>{
  return moment(date,DEFAULT_DATE_PARSE_FORMAT).format(DEFAULT_DATE_PATTERN);
}

const wrapZero = (value: number): string => {
  if (value > 0 && value < 10) {
    return "0" + value;
  } else {
    return value.toString();
  }
};
