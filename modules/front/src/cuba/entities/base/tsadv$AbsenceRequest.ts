import { AbstractParentEntity } from "./AbstractParentEntity";
import { AssignmentGroupExt } from "./base$AssignmentGroupExt";
import { FileDescriptor } from "./sys$FileDescriptor";
import { DicAbsenceType } from "./tsadv$DicAbsenceType";
import { DicRequestStatus } from "./tsadv$DicRequestStatus";
export class AbsenceRequest extends AbstractParentEntity {
  static NAME = "tsadv$AbsenceRequest";
  requestNumber?: any | null;
  assignmentGroup?: AssignmentGroupExt | null;
  dateFrom?: any | null;
  attachment?: FileDescriptor | null;
  dateTo?: any | null;
  absenceDays?: number | null;
  type?: DicAbsenceType | null;
  status?: DicRequestStatus | null;
  requestDate?: any | null;
  comment?: string | null;
  distanceWorkingConfirm?: boolean | null;
}
export type AbsenceRequestViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "absenceRequest.view";
export type AbsenceRequestView<
  V extends AbsenceRequestViewName
> = V extends "_base"
  ? Pick<
      AbsenceRequest,
      | "id"
      | "requestDate"
      | "requestNumber"
      | "dateFrom"
      | "dateTo"
      | "absenceDays"
      | "comment"
      | "distanceWorkingConfirm"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      AbsenceRequest,
      | "id"
      | "requestNumber"
      | "dateFrom"
      | "dateTo"
      | "absenceDays"
      | "requestDate"
      | "comment"
      | "distanceWorkingConfirm"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<AbsenceRequest, "id" | "requestDate">
  : V extends "absenceRequest.view"
  ? Pick<
      AbsenceRequest,
      | "id"
      | "requestNumber"
      | "dateFrom"
      | "dateTo"
      | "absenceDays"
      | "requestDate"
      | "comment"
      | "distanceWorkingConfirm"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "assignmentGroup"
      | "type"
      | "attachment"
      | "status"
    >
  : never;
