import { AbstractParentEntity } from "./AbstractParentEntity";
import { Calendar } from "./tsadv$Calendar";
import { StandardOffset } from "./tsadv$StandardOffset";
import { StandardShift } from "./tsadv$StandardShift";
export class StandardSchedule extends AbstractParentEntity {
  static NAME = "tsadv$StandardSchedule";
  scheduleName?: string | null;
  description?: string | null;
  startDate?: any | null;
  endDate?: any | null;
  period?: number | null;
  scheduleType?: any | null;
  baseStandardSchedule?: StandardSchedule | null;
  calendar?: Calendar | null;
  isHolidayWorkDay?: boolean | null;
  standardOffsets?: StandardOffset[] | null;
  standardShifts?: StandardShift[] | null;
}
export type StandardScheduleViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "schedule.view";
export type StandardScheduleView<
  V extends StandardScheduleViewName
> = V extends "_minimal"
  ? Pick<StandardSchedule, "id">
  : V extends "_local"
  ? Pick<
      StandardSchedule,
      | "id"
      | "scheduleName"
      | "description"
      | "startDate"
      | "endDate"
      | "period"
      | "scheduleType"
      | "isHolidayWorkDay"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      StandardSchedule,
      | "id"
      | "scheduleName"
      | "description"
      | "startDate"
      | "endDate"
      | "period"
      | "scheduleType"
      | "isHolidayWorkDay"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "schedule.view"
  ? Pick<
      StandardSchedule,
      | "id"
      | "scheduleName"
      | "description"
      | "startDate"
      | "endDate"
      | "period"
      | "scheduleType"
      | "isHolidayWorkDay"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "calendar"
      | "standardShifts"
      | "standardOffsets"
      | "baseStandardSchedule"
    >
  : never;
