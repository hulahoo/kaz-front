import { AbstractParentEntity } from "./AbstractParentEntity";
import { Calendar } from "./tsadv$Calendar";
import { StandardOffset } from "./tsadv$StandardOffset";
import { StandardShift } from "./tsadv$StandardShift";
import {DicCompany} from "./base_DicCompany";
import {ICompanyEntity} from "../interface/ICompanyEntity";
export class StandardSchedule extends AbstractParentEntity implements ICompanyEntity{
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
  company?: DicCompany | null;
}
export type StandardScheduleViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "schedule.view"
  | "standardSchedule-for-my-team";
export type StandardScheduleView<
  V extends StandardScheduleViewName
> = V extends "_base"
  ? Pick<
      StandardSchedule,
      | "id"
      | "legacyId"
      | "scheduleName"
      | "description"
      | "startDate"
      | "endDate"
      | "period"
      | "scheduleType"
      | "isHolidayWorkDay"
      | "organizationBin"
      | "integrationUserLogin"
    >
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
  : V extends "_minimal"
  ? Pick<StandardSchedule, "id" | "legacyId">
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
  : V extends "standardSchedule-for-my-team"
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
      | "baseStandardSchedule"
      | "calendar"
      | "standardOffsets"
      | "standardShifts"
    >
  : never;
