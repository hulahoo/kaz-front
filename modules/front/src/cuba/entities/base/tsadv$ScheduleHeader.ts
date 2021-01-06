import { AbstractParentEntity } from "./AbstractParentEntity";
import { StandardSchedule } from "./tsadv$StandardSchedule";
import { StandardOffset } from "./tsadv$StandardOffset";
import { ScheduleSummary } from "./tsadv$ScheduleSummary";
export class ScheduleHeader extends AbstractParentEntity {
  static NAME = "tsadv$ScheduleHeader";
  schedule?: StandardSchedule | null;
  month?: any | null;
  offset?: StandardOffset | null;
  isLocked?: boolean | null;
  baseDays?: number | null;
  baseHours?: any | null;
  planDays?: number | null;
  planHours?: any | null;
  planHoursPart?: any | null;
  planHoursMonth?: any | null;
  nightHours?: any | null;
  weekendDays?: number | null;
  holidayDays?: number | null;
  holidayWorkDays?: number | null;
  holidayWorkHours?: any | null;
  summaries?: ScheduleSummary[] | null;
}
export type ScheduleHeaderViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "scheduleHeader.view"
  | "scheduleHeaderForTimecard"
  | "scheduleHeaderForTimecardWithOffset"
  | "scheduleHeaderWithOffset.view";
export type ScheduleHeaderView<
  V extends ScheduleHeaderViewName
> = V extends "_base"
  ? Pick<
      ScheduleHeader,
      | "id"
      | "month"
      | "isLocked"
      | "baseDays"
      | "baseHours"
      | "planDays"
      | "planHours"
      | "planHoursPart"
      | "planHoursMonth"
      | "nightHours"
      | "weekendDays"
      | "holidayDays"
      | "holidayWorkDays"
      | "holidayWorkHours"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      ScheduleHeader,
      | "id"
      | "month"
      | "isLocked"
      | "baseDays"
      | "baseHours"
      | "planDays"
      | "planHours"
      | "planHoursPart"
      | "planHoursMonth"
      | "nightHours"
      | "weekendDays"
      | "holidayDays"
      | "holidayWorkDays"
      | "holidayWorkHours"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<ScheduleHeader, "id">
  : V extends "scheduleHeader.view"
  ? Pick<
      ScheduleHeader,
      | "id"
      | "month"
      | "isLocked"
      | "baseDays"
      | "baseHours"
      | "planDays"
      | "planHours"
      | "planHoursPart"
      | "planHoursMonth"
      | "nightHours"
      | "weekendDays"
      | "holidayDays"
      | "holidayWorkDays"
      | "holidayWorkHours"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "schedule"
      | "offset"
      | "summaries"
    >
  : V extends "scheduleHeaderForTimecard"
  ? Pick<ScheduleHeader, "id" | "summaries">
  : V extends "scheduleHeaderForTimecardWithOffset"
  ? Pick<ScheduleHeader, "id" | "offset" | "summaries">
  : V extends "scheduleHeaderWithOffset.view"
  ? Pick<
      ScheduleHeader,
      | "id"
      | "month"
      | "isLocked"
      | "baseDays"
      | "baseHours"
      | "planDays"
      | "planHours"
      | "planHoursPart"
      | "planHoursMonth"
      | "nightHours"
      | "weekendDays"
      | "holidayDays"
      | "holidayWorkDays"
      | "holidayWorkHours"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "schedule"
      | "offset"
      | "summaries"
    >
  : never;
