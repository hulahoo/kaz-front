import { AbstractParentEntity } from "./AbstractParentEntity";
import { CalendarHoliday } from "./tsadv$CalendarHoliday";
import { OrgAnalytics } from "./tsadv$OrgAnalytics";
export class Calendar extends AbstractParentEntity {
  static NAME = "tsadv$Calendar";
  calendar?: string | null;
  description?: string | null;
  startDate?: any | null;
  endDate?: any | null;
  calendarHolidays?: CalendarHoliday[] | null;
  orgAnalytics?: OrgAnalytics | null;
}
export type CalendarViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "calendar.view";
export type CalendarView<V extends CalendarViewName> = V extends "_base"
  ? Pick<
      Calendar,
      | "id"
      | "calendar"
      | "description"
      | "startDate"
      | "endDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      Calendar,
      | "id"
      | "calendar"
      | "description"
      | "startDate"
      | "endDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<Calendar, "id">
  : V extends "calendar.view"
  ? Pick<
      Calendar,
      | "id"
      | "calendar"
      | "description"
      | "startDate"
      | "endDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "calendarHolidays"
    >
  : never;
