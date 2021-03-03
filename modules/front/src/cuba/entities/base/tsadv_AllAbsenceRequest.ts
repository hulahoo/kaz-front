import { AbstractBprocRequest } from "./AbstractBprocRequest";
import { DicAbsenceType } from "./tsadv$DicAbsenceType";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class AllAbsenceRequest extends AbstractBprocRequest {
  static NAME = "tsadv_AllAbsenceRequest";
  type?: DicAbsenceType | null;
  personGroup?: PersonGroupExt | null;
  entityName?: string | null;
  startDate?: any | null;
  endDate?: any | null;
  absenceDays?: number | null;
}
export type AllAbsenceRequestViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "allAbsenceRequest-view";
export type AllAbsenceRequestView<
  V extends AllAbsenceRequestViewName
> = V extends "_base"
  ? Pick<
      AllAbsenceRequest,
      | "id"
      | "requestNumber"
      | "requestDate"
      | "entityName"
      | "startDate"
      | "endDate"
      | "absenceDays"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "comment"
    >
  : V extends "_local"
  ? Pick<
      AllAbsenceRequest,
      | "id"
      | "entityName"
      | "startDate"
      | "endDate"
      | "absenceDays"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
    >
  : V extends "_minimal"
  ? Pick<AllAbsenceRequest, "id" | "requestNumber" | "requestDate">
  : V extends "allAbsenceRequest-view"
  ? Pick<
      AllAbsenceRequest,
      | "id"
      | "entityName"
      | "startDate"
      | "endDate"
      | "absenceDays"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
      | "type"
      | "personGroup"
      | "status"
    >
  : never;
