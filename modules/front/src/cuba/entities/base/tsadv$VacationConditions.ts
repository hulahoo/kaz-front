import { AbstractTimeBasedEntity } from "./AbstractTimeBasedEntity";
import { DicAbsenceType } from "./tsadv$DicAbsenceType";
import { VacationConditionsGroup } from "./tsadv$VacationConditionsGroup";
import { PositionGroupExt } from "./base$PositionGroupExt";
import { JobGroup } from "./tsadv$JobGroup";
export class VacationConditions extends AbstractTimeBasedEntity {
  static NAME = "tsadv$VacationConditions";
  additionalDays?: number | null;
  vacationDurationType?: any | null;
  mainDaysNumber?: any | null;
  daysType?: DicAbsenceType | null;
  group?: VacationConditionsGroup | null;
  positionGroup?: PositionGroupExt | null;
  jobGroup?: JobGroup | null;
}
export type VacationConditionsViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "vacationConditions-view";
export type VacationConditionsView<
  V extends VacationConditionsViewName
> = V extends "_base"
  ? Pick<
      VacationConditions,
      | "id"
      | "additionalDays"
      | "vacationDurationType"
      | "mainDaysNumber"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
    >
  : V extends "_local"
  ? Pick<
      VacationConditions,
      | "id"
      | "additionalDays"
      | "vacationDurationType"
      | "mainDaysNumber"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
    >
  : V extends "vacationConditions-view"
  ? Pick<
      VacationConditions,
      | "id"
      | "additionalDays"
      | "vacationDurationType"
      | "mainDaysNumber"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
      | "daysType"
      | "positionGroup"
      | "jobGroup"
    >
  : never;
