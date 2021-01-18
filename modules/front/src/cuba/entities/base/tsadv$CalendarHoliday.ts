import { AbstractParentEntity } from "./AbstractParentEntity";
import { Calendar } from "./tsadv$Calendar";
export class CalendarHoliday extends AbstractParentEntity {
  static NAME = "tsadv$CalendarHoliday";
  calendar?: Calendar | null;
  name?: string | null;
  startDate?: any | null;
  endDate?: any | null;
  actionDateFrom?: any | null;
  actionDateTo?: any | null;
  state?: boolean | null;
  dayType?: any | null;
  transferStartDate?: any | null;
  transferEndDate?: any | null;
}
export type CalendarHolidayViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "calendarHoliday.view";
export type CalendarHolidayView<
  V extends CalendarHolidayViewName
> = V extends "_base"
  ? Pick<
      CalendarHoliday,
      | "id"
      | "name"
      | "startDate"
      | "endDate"
      | "actionDateFrom"
      | "actionDateTo"
      | "state"
      | "dayType"
      | "transferStartDate"
      | "transferEndDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      CalendarHoliday,
      | "id"
      | "name"
      | "startDate"
      | "endDate"
      | "actionDateFrom"
      | "actionDateTo"
      | "state"
      | "dayType"
      | "transferStartDate"
      | "transferEndDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<CalendarHoliday, "id">
  : V extends "calendarHoliday.view"
  ? Pick<
      CalendarHoliday,
      | "id"
      | "name"
      | "startDate"
      | "endDate"
      | "actionDateFrom"
      | "actionDateTo"
      | "state"
      | "dayType"
      | "transferStartDate"
      | "transferEndDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "calendar"
    >
  : never;
