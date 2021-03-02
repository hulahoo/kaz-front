import { AbstractBprocRequest } from "./AbstractBprocRequest";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class VacationScheduleRequest extends AbstractBprocRequest {
  static NAME = "tsadv_VacationScheduleRequest";
  personGroup?: PersonGroupExt | null;
  startDate?: any | null;
  endDate?: any | null;
  absenceDays?: number | null;
  balance?: number | null;
}
export type VacationScheduleRequestViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "vacation-request-view"
  | "vacationScheduleRequest-edit";
export type VacationScheduleRequestView<
  V extends VacationScheduleRequestViewName
> = V extends "_base"
  ? Pick<
      VacationScheduleRequest,
      | "id"
      | "personGroup"
      | "absenceDays"
      | "startDate"
      | "endDate"
      | "balance"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
    >
  : V extends "_local"
  ? Pick<
      VacationScheduleRequest,
      | "id"
      | "startDate"
      | "endDate"
      | "absenceDays"
      | "balance"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
    >
  : V extends "_minimal"
  ? Pick<VacationScheduleRequest, "id" | "personGroup" | "absenceDays">
  : V extends "vacation-request-view"
  ? Pick<
      VacationScheduleRequest,
      | "id"
      | "startDate"
      | "endDate"
      | "absenceDays"
      | "balance"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
      | "status"
      | "personGroup"
    >
  : V extends "vacationScheduleRequest-edit"
  ? Pick<
      VacationScheduleRequest,
      | "id"
      | "startDate"
      | "endDate"
      | "absenceDays"
      | "balance"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
      | "personGroup"
      | "status"
    >
  : never;
