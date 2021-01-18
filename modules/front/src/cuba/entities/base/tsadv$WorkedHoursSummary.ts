import { AbstractParentEntity } from "./AbstractParentEntity";
import { TimecardHeader } from "./tsadv$TimecardHeader";
import { AbsenceToWorkedHoursSummary } from "./tsadv$AbsenceToWorkedHoursSummary";
import { Shift } from "./tsadv$Shift";
import { DicScheduleElementType } from "./tsadv$DicScheduleElementType";
import { BusinessTrip } from "./tsadv$BusinessTrip";
import { Order } from "./tsadv$Order";
import { Absence } from "./tsadv$Absence";
export class WorkedHoursSummary extends AbstractParentEntity {
  static NAME = "tsadv$WorkedHoursSummary";
  timecardHeader?: TimecardHeader | null;
  displayValue?: string | null;
  absenceToWorkedHoursSummaryList?: AbsenceToWorkedHoursSummary[] | null;
  workedDate?: any | null;
  hours?: any | null;
  timeIn?: any | null;
  timeOut?: any | null;
  shift?: Shift | null;
  scheduleElementType?: DicScheduleElementType | null;
  correctionFlag?: boolean | null;
  bussinessTrip?: BusinessTrip | null;
  order?: Order | null;
  absence?: Absence | null;
  timecardRepresentation?: string | null;
}
export type WorkedHoursSummaryViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "workedHoursSummary-for-timecard"
  | "workedHoursSummary-view"
  | "workedHoursSummary-with-timecardHeader"
  | "workedHoursSummary-with-type";
export type WorkedHoursSummaryView<
  V extends WorkedHoursSummaryViewName
> = V extends "_base"
  ? Pick<
      WorkedHoursSummary,
      | "id"
      | "displayValue"
      | "workedDate"
      | "hours"
      | "timeIn"
      | "timeOut"
      | "correctionFlag"
      | "timecardRepresentation"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      WorkedHoursSummary,
      | "id"
      | "displayValue"
      | "workedDate"
      | "hours"
      | "timeIn"
      | "timeOut"
      | "correctionFlag"
      | "timecardRepresentation"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "workedHoursSummary-for-timecard"
  ? Pick<
      WorkedHoursSummary,
      | "id"
      | "displayValue"
      | "workedDate"
      | "hours"
      | "timeIn"
      | "timeOut"
      | "correctionFlag"
      | "timecardRepresentation"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "timecardHeader"
      | "shift"
      | "scheduleElementType"
      | "bussinessTrip"
      | "absence"
    >
  : V extends "workedHoursSummary-view"
  ? Pick<
      WorkedHoursSummary,
      | "id"
      | "displayValue"
      | "workedDate"
      | "hours"
      | "timeIn"
      | "timeOut"
      | "correctionFlag"
      | "timecardRepresentation"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "timecardHeader"
      | "shift"
      | "scheduleElementType"
      | "bussinessTrip"
      | "absence"
      | "absenceToWorkedHoursSummaryList"
    >
  : V extends "workedHoursSummary-with-timecardHeader"
  ? Pick<
      WorkedHoursSummary,
      | "id"
      | "displayValue"
      | "workedDate"
      | "hours"
      | "timeIn"
      | "timeOut"
      | "correctionFlag"
      | "timecardRepresentation"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "timecardHeader"
      | "scheduleElementType"
    >
  : V extends "workedHoursSummary-with-type"
  ? Pick<
      WorkedHoursSummary,
      | "id"
      | "displayValue"
      | "workedDate"
      | "hours"
      | "timeIn"
      | "timeOut"
      | "correctionFlag"
      | "timecardRepresentation"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "timecardHeader"
      | "scheduleElementType"
    >
  : never;
