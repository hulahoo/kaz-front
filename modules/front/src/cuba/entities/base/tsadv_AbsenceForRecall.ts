import { AbstractBprocRequest } from "./AbstractBprocRequest";
import { DicAbsenceType } from "./tsadv$DicAbsenceType";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { Absence } from "./tsadv$Absence";
import { DicAbsencePurpose } from "./tsadv_DicAbsencePurpose";
import { FileDescriptor } from "./sys$FileDescriptor";
export class AbsenceForRecall extends AbstractBprocRequest {
  static NAME = "tsadv_AbsenceForRecall";
  absenceType?: DicAbsenceType | null;
  employee?: PersonGroupExt | null;
  vacation?: Absence | null;
  recallDateFrom?: any | null;
  recallDateTo?: any | null;
  dateFrom?: any | null;
  dateTo?: any | null;
  purpose?: DicAbsencePurpose | null;
  purposeText?: string | null;
  isAgree?: boolean | null;
  isFamiliarization?: boolean | null;
  leaveOtherTime?: boolean | null;
  compensationPayment?: boolean | null;
  file?: FileDescriptor[] | null;
}
export type AbsenceForRecallViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "absenceForRecall.edit";
export type AbsenceForRecallView<
  V extends AbsenceForRecallViewName
> = V extends "_base"
  ? Pick<
      AbsenceForRecall,
      | "id"
      | "recallDateFrom"
      | "recallDateTo"
      | "dateFrom"
      | "dateTo"
      | "purposeText"
      | "isAgree"
      | "isFamiliarization"
      | "leaveOtherTime"
      | "compensationPayment"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
    >
  : V extends "_local"
  ? Pick<
      AbsenceForRecall,
      | "id"
      | "recallDateFrom"
      | "recallDateTo"
      | "dateFrom"
      | "dateTo"
      | "purposeText"
      | "isAgree"
      | "isFamiliarization"
      | "leaveOtherTime"
      | "compensationPayment"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
    >
  : V extends "absenceForRecall.edit"
  ? Pick<
      AbsenceForRecall,
      | "id"
      | "recallDateFrom"
      | "recallDateTo"
      | "dateFrom"
      | "dateTo"
      | "purposeText"
      | "isAgree"
      | "isFamiliarization"
      | "leaveOtherTime"
      | "compensationPayment"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
      | "absenceType"
      | "employee"
      | "vacation"
      | "purpose"
      | "file"
      | "status"
    >
  : never;