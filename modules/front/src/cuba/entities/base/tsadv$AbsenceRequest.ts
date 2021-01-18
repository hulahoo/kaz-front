import { AbstractBprocRequest } from "./AbstractBprocRequest";
import { AssignmentGroupExt } from "./base$AssignmentGroupExt";
import { FileDescriptor } from "./sys$FileDescriptor";
import { DicAbsenceType } from "./tsadv$DicAbsenceType";
export class AbsenceRequest extends AbstractBprocRequest {
  static NAME = "tsadv$AbsenceRequest";
  assignmentGroup?: AssignmentGroupExt | null;
  attachment?: FileDescriptor | null;
  dateFrom?: any | null;
  dateTo?: any | null;
  absenceDays?: number | null;
  type?: DicAbsenceType | null;
  comment?: string | null;
  distanceWorkingConfirm?: boolean | null;
}
export type AbsenceRequestViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "absenceRequest.edit"
  | "absenceRequest.view";
export type AbsenceRequestView<
  V extends AbsenceRequestViewName
> = V extends "_base"
  ? Pick<
      AbsenceRequest,
      | "id"
      | "requestDate"
      | "dateFrom"
      | "dateTo"
      | "absenceDays"
      | "comment"
      | "distanceWorkingConfirm"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
    >
  : V extends "_local"
  ? Pick<
      AbsenceRequest,
      | "id"
      | "dateFrom"
      | "dateTo"
      | "absenceDays"
      | "comment"
      | "distanceWorkingConfirm"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
    >
  : V extends "_minimal"
  ? Pick<AbsenceRequest, "id" | "requestDate">
  : V extends "absenceRequest.edit"
  ? Pick<
      AbsenceRequest,
      | "id"
      | "dateFrom"
      | "dateTo"
      | "absenceDays"
      | "comment"
      | "distanceWorkingConfirm"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "assignmentGroup"
      | "type"
      | "attachment"
      | "status"
    >
  : V extends "absenceRequest.view"
  ? Pick<
      AbsenceRequest,
      | "id"
      | "dateFrom"
      | "dateTo"
      | "absenceDays"
      | "comment"
      | "distanceWorkingConfirm"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "assignmentGroup"
      | "type"
      | "attachment"
      | "status"
    >
  : never;
