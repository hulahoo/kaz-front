import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { VacationScheduleRequest } from "./tsadv_VacationScheduleRequest";
export class VacationSchedule extends AbstractParentEntity {
  static NAME = "tsadv_VacationSchedule";
  personGroup?: PersonGroupExt | null;
  startDate?: any | null;
  endDate?: any | null;
  absenceDays?: number | null;
  request?: VacationScheduleRequest | null;
}
export type VacationScheduleViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "vacation-view";
export type VacationScheduleView<
  V extends VacationScheduleViewName
> = V extends "_base"
  ? Pick<
      VacationSchedule,
      | "id"
      | "personGroup"
      | "absenceDays"
      | "startDate"
      | "endDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      VacationSchedule,
      | "id"
      | "startDate"
      | "endDate"
      | "absenceDays"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<VacationSchedule, "id" | "personGroup" | "absenceDays">
  : V extends "vacation-view"
  ? Pick<
      VacationSchedule,
      | "id"
      | "startDate"
      | "endDate"
      | "absenceDays"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "personGroup"
    >
  : never;
