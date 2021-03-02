import {AbstractBprocRequest} from "./AbstractBprocRequest";
import {AssignmentGroupExt} from "./base$AssignmentGroupExt";
import {FileDescriptor} from "./sys$FileDescriptor";
import {DicAbsenceType} from "./tsadv$DicAbsenceType";
import {PersonGroupExt} from "./base$PersonGroupExt";
import {DicAbsencePurpose} from "./tsadv_DicAbsencePurpose";

export class AllAbsenceRequest extends AbstractBprocRequest {
  static NAME = "tsadv_AllAbsenceRequest";
  startDate?: any | null;
  endDate?: any | null;
  absenceDays?: number | null;
  type?: DicAbsenceType | null;
  personGroup?: PersonGroupExt | null;
  entityName?: string | null;
}

export type AllAbsenceRequestViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "allAbsenceRequest-view";
export type AllAbsenceRequestView<V extends AllAbsenceRequestViewName> = V extends "_base"
  ? Pick<AllAbsenceRequest,
    | "id"
    | "requestDate"
    | "startDate"
    | "endDate"
    | "absenceDays"
    | "legacyId"
    | "organizationBin"
    | "integrationUserLogin"
    | "requestNumber"
    | "entityName"
    | "comment">
  : V extends "_local"
    ? Pick<AllAbsenceRequest,
      | "id"
      | "requestDate"
      | "startDate"
      | "endDate"
      | "absenceDays"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "entityName"
      | "comment">
    : V extends "_minimal"
      ? Pick<AllAbsenceRequest, "id" | "requestDate">
      : V extends "allAbsenceRequest-view"
        ? Pick<AllAbsenceRequest,
          | "id"
          | "startDate"
          | "endDate"
          | "absenceDays"
          | "organizationBin"
          | "integrationUserLogin"
          | "requestNumber"
          | "entityName"
          | "requestDate"
          | "comment"
          | "type"
          | "personGroup"
          | "status">
              : never;
