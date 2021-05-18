import { AbstractBprocRequest } from "./AbstractBprocRequest";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicAbsenceType } from "./tsadv$DicAbsenceType";
import { DicAbsencePurpose } from "./tsadv_DicAbsencePurpose";
import {AbsPurposeSetting} from "./tsadv_AbsPurposeSetting";
import {FileDescriptor} from "./sys$FileDescriptor";
export class AbsenceRvdRequest extends AbstractBprocRequest {
  static NAME = "tsadv_AbsenceRvdRequest";
  personGroup?: PersonGroupExt | null;
  type?: DicAbsenceType | null;
  purpose?: DicAbsencePurpose| AbsPurposeSetting | null;
  purposeText?: string | null;
  timeOfStarting?: any | null;
  timeOfFinishing?: any | null;
  totalHours?: number | null;
  compensation?: boolean | null;
  vacationDay?: boolean | null;
  acquainted?: boolean | null;
  agree?: boolean | null;
  files?: FileDescriptor[] | null;
}
export type AbsenceRvdRequestViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "absenceRvdRequest-for-ss-structure-person"
  | "absenceRvdRequest.edit";
export type AbsenceRvdRequestView<
  V extends AbsenceRvdRequestViewName
> = V extends "_base"
  ? Pick<
      AbsenceRvdRequest,
      | "id"
      | "requestDate"
      | "purposeText"
      | "timeOfStarting"
      | "timeOfFinishing"
      | "totalHours"
      | "compensation"
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
      AbsenceRvdRequest,
      | "id"
      | "purposeText"
      | "timeOfStarting"
      | "timeOfFinishing"
      | "totalHours"
      | "compensation"
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
  ? Pick<AbsenceRvdRequest, "id" | "requestDate">
  : V extends "absenceRvdRequest-for-ss-structure-person"
  ? Pick<
      AbsenceRvdRequest,
      | "id"
      | "purposeText"
      | "timeOfStarting"
      | "timeOfFinishing"
      | "totalHours"
      | "compensation"
      | "vacationDay"
      | "acquainted"
      | "agree"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
      | "personGroup"
      | "type"
      | "purpose"
      | "status"
    >
  : V extends "absenceRvdRequest.edit"
  ? Pick<
      AbsenceRvdRequest,
      | "id"
      | "purposeText"
      | "timeOfStarting"
      | "timeOfFinishing"
      | "totalHours"
      | "compensation"
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
      | "files"
    >
  : never;
