import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicRequestStatus } from "./tsadv$DicRequestStatus";
export class VacationScheduleRequest extends AbstractParentEntity {
  static NAME = "tsadv_VacationScheduleRequest";
  requestNumber?: any | null;
  requestDate?: any | null;
  personGroup?: PersonGroupExt | null;
  status?: DicRequestStatus | null;
  startDate?: any | null;
  endDate?: any | null;
  absenceDays?: number | null;
}
export type VacationScheduleRequestViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "vacation-request-view";
export type VacationScheduleRequestView<
  V extends VacationScheduleRequestViewName
> = V extends "_base"
  ? Pick<
      VacationScheduleRequest,
      | "id"
      | "requestNumber"
      | "requestDate"
      | "startDate"
      | "endDate"
      | "absenceDays"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      VacationScheduleRequest,
      | "id"
      | "requestNumber"
      | "requestDate"
      | "startDate"
      | "endDate"
      | "absenceDays"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "vacation-request-view"
  ? Pick<
      VacationScheduleRequest,
      | "id"
      | "requestNumber"
      | "requestDate"
      | "startDate"
      | "endDate"
      | "absenceDays"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "status"
      | "personGroup"
    >
  : never;
