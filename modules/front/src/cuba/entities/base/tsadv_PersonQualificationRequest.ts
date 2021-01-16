import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicPersonQualificationType } from "./tsadv$DicPersonQualificationType";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { FileDescriptor } from "./sys$FileDescriptor";
import { DicRequestStatus } from "./tsadv$DicRequestStatus";
export class PersonQualificationRequest extends AbstractParentEntity {
  static NAME = "tsadv_PersonQualificationRequest";
  type?: DicPersonQualificationType | null;
  personGroup?: PersonGroupExt | null;
  startDate?: any | null;
  endDate?: any | null;
  assignValidationDate?: any | null;
  attachment?: FileDescriptor | null;
  note?: string | null;
  educationalInstitutionName?: string | null;
  diploma?: string | null;
  typeName?: string | null;
  issuedDate?: any | null;
  requestStatus?: DicRequestStatus | null;
  file?: FileDescriptor | null;
  attachments?: FileDescriptor[] | null;
}
export type PersonQualificationRequestViewName =
  | "_base"
  | "_local"
  | "_minimal";
export type PersonQualificationRequestView<
  V extends PersonQualificationRequestViewName
> = V extends "_base"
  ? Pick<
      PersonQualificationRequest,
      | "id"
      | "startDate"
      | "endDate"
      | "assignValidationDate"
      | "note"
      | "educationalInstitutionName"
      | "diploma"
      | "typeName"
      | "issuedDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      PersonQualificationRequest,
      | "id"
      | "startDate"
      | "endDate"
      | "assignValidationDate"
      | "note"
      | "educationalInstitutionName"
      | "diploma"
      | "typeName"
      | "issuedDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
