import { AbstractBprocRequest } from "./AbstractBprocRequest";
import { DicRequisitionType } from "./tsadv$DicRequisitionType";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { Absence } from "./tsadv$Absence";
import { FileDescriptor } from "./sys$FileDescriptor";
import { DicPurposeAbsence } from "./tsadv_DicPurposeAbsence";
export class ChangeAbsenceDaysRequest extends AbstractBprocRequest {
  static NAME = "tsadv_ChangeAbsenceDaysRequest";
  requestType?: DicRequisitionType | null;
  employee?: PersonGroupExt | null;
  vacation?: Absence | null;
  scheduleStartDate?: any | null;
  scheduleEndDate?: any | null;
  newStartDate?: any | null;
  newEndDate?: any | null;
  periodStartDate?: any | null;
  periodEndDate?: any | null;
  agree?: boolean | null;
  familiarization?: boolean | null;
  file?: FileDescriptor[] | null;
  purposeText?: string | null;
  purpose?: DicPurposeAbsence | null;
}
export type ChangeAbsenceDaysRequestViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "changeAbsenceDaysRequest.edit";
export type ChangeAbsenceDaysRequestView<
  V extends ChangeAbsenceDaysRequestViewName
> = V extends "_base"
  ? Pick<
      ChangeAbsenceDaysRequest,
      | "id"
      | "requestNumber"
      | "requestDate"
      | "scheduleStartDate"
      | "scheduleEndDate"
      | "newStartDate"
      | "newEndDate"
      | "periodStartDate"
      | "periodEndDate"
      | "agree"
      | "familiarization"
      | "purposeText"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "comment"
    >
  : V extends "_local"
  ? Pick<
      ChangeAbsenceDaysRequest,
      | "id"
      | "scheduleStartDate"
      | "scheduleEndDate"
      | "newStartDate"
      | "newEndDate"
      | "periodStartDate"
      | "periodEndDate"
      | "agree"
      | "familiarization"
      | "purposeText"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
    >
  : V extends "_minimal"
  ? Pick<ChangeAbsenceDaysRequest, "id" | "requestNumber" | "requestDate">
  : V extends "changeAbsenceDaysRequest.edit"
  ? Pick<
      ChangeAbsenceDaysRequest,
      | "id"
      | "scheduleStartDate"
      | "scheduleEndDate"
      | "newStartDate"
      | "newEndDate"
      | "periodStartDate"
      | "periodEndDate"
      | "agree"
      | "familiarization"
      | "purposeText"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
      | "requestType"
      | "employee"
      | "vacation"
      | "file"
      | "purpose"
      | "status"
    >
  : never;
