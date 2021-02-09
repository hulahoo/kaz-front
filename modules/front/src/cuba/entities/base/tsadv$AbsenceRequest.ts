import { AbstractBprocRequest } from "./AbstractBprocRequest";
import { AssignmentGroupExt } from "./base$AssignmentGroupExt";
import { FileDescriptor } from "./sys$FileDescriptor";
import { DicAbsenceType } from "./tsadv$DicAbsenceType";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicAbsencePurpose } from "./tsadv_DicAbsencePurpose";
export class AbsenceRequest extends AbstractBprocRequest {
  static NAME = "tsadv$AbsenceRequest";
  assignmentGroup?: AssignmentGroupExt | null;
  attachment?: FileDescriptor | null;
  dateFrom?: any | null;
  dateTo?: any | null;
  absenceDays?: number | null;
  type?: DicAbsenceType | null;
  distanceWorkingConfirm?: boolean | null;
  personGroup?: PersonGroupExt | null;
  purpose?: DicAbsencePurpose | null;
  purposeText?: string | null;
  timeOfStarting?: any | null;
  timeOfFinishing?: any | null;
  totalHours?: number | null;
  compencation?: boolean | null;
  vacationDay?: boolean | null;
  acquainted?: boolean | null;
  agree?: boolean | null;
}
export type AbsenceRequestViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "absenceRequest-for-my-team"
  | "absenceRequest-for-ss-my-team"
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
      | "distanceWorkingConfirm"
      | "purposeText"
      | "timeOfStarting"
      | "timeOfFinishing"
      | "totalHours"
      | "compencation"
      | "vacationDay"
      | "acquainted"
      | "agree"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "comment"
    >
  : V extends "_local"
  ? Pick<
      AbsenceRequest,
      | "id"
      | "dateFrom"
      | "dateTo"
      | "absenceDays"
      | "distanceWorkingConfirm"
      | "purposeText"
      | "timeOfStarting"
      | "timeOfFinishing"
      | "totalHours"
      | "compencation"
      | "vacationDay"
      | "acquainted"
      | "agree"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
    >
  : V extends "_minimal"
  ? Pick<AbsenceRequest, "id" | "requestDate">
  : V extends "absenceRequest-for-my-team"
  ? Pick<
      AbsenceRequest,
      | "id"
      | "dateFrom"
      | "dateTo"
      | "absenceDays"
      | "distanceWorkingConfirm"
      | "purposeText"
      | "timeOfStarting"
      | "timeOfFinishing"
      | "totalHours"
      | "compencation"
      | "vacationDay"
      | "acquainted"
      | "agree"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
      | "type"
      | "personGroup"
      | "purpose"
      | "status"
    >
  : V extends "absenceRequest-for-ss-my-team"
  ? Pick<
      AbsenceRequest,
      | "id"
      | "dateFrom"
      | "dateTo"
      | "absenceDays"
      | "distanceWorkingConfirm"
      | "purposeText"
      | "timeOfStarting"
      | "timeOfFinishing"
      | "totalHours"
      | "compencation"
      | "vacationDay"
      | "acquainted"
      | "agree"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
    >
  : V extends "absenceRequest.edit"
  ? Pick<
      AbsenceRequest,
      | "id"
      | "dateFrom"
      | "dateTo"
      | "absenceDays"
      | "distanceWorkingConfirm"
      | "purposeText"
      | "timeOfStarting"
      | "timeOfFinishing"
      | "totalHours"
      | "compencation"
      | "vacationDay"
      | "acquainted"
      | "agree"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
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
      | "distanceWorkingConfirm"
      | "purposeText"
      | "timeOfStarting"
      | "timeOfFinishing"
      | "totalHours"
      | "compencation"
      | "vacationDay"
      | "acquainted"
      | "agree"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
      | "assignmentGroup"
      | "type"
      | "attachment"
      | "status"
    >
  : never;
