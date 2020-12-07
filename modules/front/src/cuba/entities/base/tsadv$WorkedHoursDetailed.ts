import { AbstractParentEntity } from "./AbstractParentEntity";
import { WorkedHoursSummary } from "./tsadv$WorkedHoursSummary";
import { TimecardHeader } from "./tsadv$TimecardHeader";
import { DicScheduleElementType } from "./tsadv$DicScheduleElementType";
export class WorkedHoursDetailed extends AbstractParentEntity {
  static NAME = "tsadv$WorkedHoursDetailed";
  workedHoursSummary?: WorkedHoursSummary | null;
  timecardHeader?: TimecardHeader | null;
  workedDate?: any | null;
  hours?: any | null;
  planHours?: any | null;
  timeIn?: any | null;
  timeOut?: any | null;
  scheduleElementType?: DicScheduleElementType | null;
  actualTimeIn?: any | null;
  actualTimeOut?: any | null;
  isNeedToCheckAndCreateAdditionalHours?: boolean | null;
}
export type WorkedHoursDetailedViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "workedHoursDetailed-view"
  | "workedHoursDetailed-with-parents"
  | "workedHoursDetailed-with-type";
export type WorkedHoursDetailedView<
  V extends WorkedHoursDetailedViewName
> = V extends "_local"
  ? Pick<
      WorkedHoursDetailed,
      | "id"
      | "workedDate"
      | "hours"
      | "planHours"
      | "timeIn"
      | "timeOut"
      | "actualTimeIn"
      | "actualTimeOut"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      WorkedHoursDetailed,
      | "id"
      | "workedDate"
      | "hours"
      | "planHours"
      | "timeIn"
      | "timeOut"
      | "actualTimeIn"
      | "actualTimeOut"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "workedHoursDetailed-view"
  ? Pick<
      WorkedHoursDetailed,
      | "id"
      | "workedDate"
      | "hours"
      | "planHours"
      | "timeIn"
      | "timeOut"
      | "actualTimeIn"
      | "actualTimeOut"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "scheduleElementType"
      | "workedHoursSummary"
    >
  : V extends "workedHoursDetailed-with-parents"
  ? Pick<
      WorkedHoursDetailed,
      | "id"
      | "workedDate"
      | "hours"
      | "planHours"
      | "timeIn"
      | "timeOut"
      | "actualTimeIn"
      | "actualTimeOut"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "scheduleElementType"
      | "workedHoursSummary"
    >
  : V extends "workedHoursDetailed-with-type"
  ? Pick<
      WorkedHoursDetailed,
      | "id"
      | "workedDate"
      | "hours"
      | "planHours"
      | "timeIn"
      | "timeOut"
      | "actualTimeIn"
      | "actualTimeOut"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "scheduleElementType"
    >
  : never;
