import { AbstractBprocRequest } from "./AbstractBprocRequest";
import { AssignmentGroupExt } from "./base$AssignmentGroupExt";
import { DicAbsenceType } from "./tsadv$DicAbsenceType";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicAbsencePurpose } from "./tsadv_DicAbsencePurpose";
import { VacationScheduleRequest } from "./tsadv_VacationScheduleRequest";
import { FileDescriptor } from "./sys$FileDescriptor";
export class AbsenceRequest extends AbstractBprocRequest {
  static NAME = "tsadv$AbsenceRequest";
  assignmentGroup?: AssignmentGroupExt | null;
  reason?: string | null;
  dateFrom?: any | null;
  dateTo?: any | null;
  absenceDays?: number | null;
  type?: DicAbsenceType | null;
  distanceWorkingConfirm?: boolean | null;
  personGroup?: PersonGroupExt | null;
  purpose?: DicAbsencePurpose | null;
  purposeText?: string | null;
  timeOfStarting?: any | null;
  originalSheet?: boolean | null;
  scheduleStartDate?: any | null;
  scheduleEndDate?: any | null;
  addNextYear?: boolean | null;
  newStartDate?: any | null;
  newEndDate?: any | null;
  periodDateFrom?: any | null;
  periodDateTo?: any | null;
  timeOfFinishing?: any | null;
  totalHours?: number | null;
  compensation?: boolean | null;
  vacationDay?: boolean | null;
  acquainted?: boolean | null;
  agree?: boolean | null;
  vacationScheduleRequest?: VacationScheduleRequest | null;
  vacationDurationType?: any | null;
  files?: FileDescriptor[] | null;
  startTime?: any | null;
  endTime?: any | null;
  additionalTime?: number | null;
}
export type AbsenceRequestViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "absenceRequest-for-mobile"
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
      | "requestNumber"
      | "requestDate"
      | "reason"
      | "dateFrom"
      | "dateTo"
      | "absenceDays"
      | "distanceWorkingConfirm"
      | "purposeText"
      | "timeOfStarting"
      | "originalSheet"
      | "scheduleStartDate"
      | "scheduleEndDate"
      | "addNextYear"
      | "newStartDate"
      | "newEndDate"
      | "periodDateFrom"
      | "periodDateTo"
      | "timeOfFinishing"
      | "totalHours"
      | "compensation"
      | "vacationDay"
      | "acquainted"
      | "agree"
      | "startTime"
      | "endTime"
      | "additionalTime"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "comment"
    >
  : V extends "_local"
  ? Pick<
      AbsenceRequest,
      | "id"
      | "reason"
      | "dateFrom"
      | "dateTo"
      | "absenceDays"
      | "distanceWorkingConfirm"
      | "purposeText"
      | "timeOfStarting"
      | "originalSheet"
      | "scheduleStartDate"
      | "scheduleEndDate"
      | "addNextYear"
      | "newStartDate"
      | "newEndDate"
      | "periodDateFrom"
      | "periodDateTo"
      | "timeOfFinishing"
      | "totalHours"
      | "compensation"
      | "vacationDay"
      | "acquainted"
      | "agree"
      | "startTime"
      | "endTime"
      | "additionalTime"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
    >
  : V extends "_minimal"
  ? Pick<AbsenceRequest, "id" | "requestNumber" | "requestDate">
  : V extends "absenceRequest-for-mobile"
  ? Pick<
      AbsenceRequest,
      | "id"
      | "reason"
      | "dateFrom"
      | "dateTo"
      | "absenceDays"
      | "distanceWorkingConfirm"
      | "purposeText"
      | "timeOfStarting"
      | "originalSheet"
      | "scheduleStartDate"
      | "scheduleEndDate"
      | "addNextYear"
      | "newStartDate"
      | "newEndDate"
      | "periodDateFrom"
      | "periodDateTo"
      | "timeOfFinishing"
      | "totalHours"
      | "compensation"
      | "vacationDay"
      | "acquainted"
      | "agree"
      | "startTime"
      | "endTime"
      | "additionalTime"
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
      | "files"
    >
  : V extends "absenceRequest-for-my-team"
  ? Pick<
      AbsenceRequest,
      | "id"
      | "reason"
      | "dateFrom"
      | "dateTo"
      | "absenceDays"
      | "distanceWorkingConfirm"
      | "purposeText"
      | "timeOfStarting"
      | "originalSheet"
      | "scheduleStartDate"
      | "scheduleEndDate"
      | "addNextYear"
      | "newStartDate"
      | "newEndDate"
      | "periodDateFrom"
      | "periodDateTo"
      | "timeOfFinishing"
      | "totalHours"
      | "compensation"
      | "vacationDay"
      | "acquainted"
      | "agree"
      | "startTime"
      | "endTime"
      | "additionalTime"
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
      | "reason"
      | "dateFrom"
      | "dateTo"
      | "absenceDays"
      | "distanceWorkingConfirm"
      | "purposeText"
      | "timeOfStarting"
      | "originalSheet"
      | "scheduleStartDate"
      | "scheduleEndDate"
      | "addNextYear"
      | "newStartDate"
      | "newEndDate"
      | "periodDateFrom"
      | "periodDateTo"
      | "timeOfFinishing"
      | "totalHours"
      | "compensation"
      | "vacationDay"
      | "acquainted"
      | "agree"
      | "startTime"
      | "endTime"
      | "additionalTime"
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
      | "reason"
      | "dateFrom"
      | "dateTo"
      | "absenceDays"
      | "distanceWorkingConfirm"
      | "purposeText"
      | "timeOfStarting"
      | "originalSheet"
      | "scheduleStartDate"
      | "scheduleEndDate"
      | "addNextYear"
      | "newStartDate"
      | "newEndDate"
      | "periodDateFrom"
      | "periodDateTo"
      | "timeOfFinishing"
      | "totalHours"
      | "compensation"
      | "vacationDay"
      | "acquainted"
      | "agree"
      | "startTime"
      | "endTime"
      | "additionalTime"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
      | "assignmentGroup"
      | "type"
      | "status"
      | "purpose"
      | "personGroup"
      | "vacationScheduleRequest"
      | "vacationDurationType"
      | "files"
    >
  : V extends "absenceRequest.view"
  ? Pick<
      AbsenceRequest,
      | "id"
      | "reason"
      | "dateFrom"
      | "dateTo"
      | "absenceDays"
      | "distanceWorkingConfirm"
      | "purposeText"
      | "timeOfStarting"
      | "originalSheet"
      | "scheduleStartDate"
      | "scheduleEndDate"
      | "addNextYear"
      | "newStartDate"
      | "newEndDate"
      | "periodDateFrom"
      | "periodDateTo"
      | "timeOfFinishing"
      | "totalHours"
      | "compensation"
      | "vacationDay"
      | "acquainted"
      | "agree"
      | "startTime"
      | "endTime"
      | "additionalTime"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
      | "assignmentGroup"
      | "type"
      | "files"
      | "status"
      | "personGroup"
      | "purpose"
      | "vacationScheduleRequest"
    >
  : never;
