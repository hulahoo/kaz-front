import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicPersonQualificationType } from "./tsadv$DicPersonQualificationType";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { FileDescriptor } from "./sys$FileDescriptor";
export class PersonQualification extends AbstractParentEntity {
  static NAME = "tsadv$PersonQualification";
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
  startDateHistory?: any | null;
  endDateHistory?: any | null;
  attachments?: FileDescriptor[] | null;
}
export type PersonQualificationViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "personQualification-view";
export type PersonQualificationView<
  V extends PersonQualificationViewName
> = V extends "_base"
  ? Pick<
      PersonQualification,
      | "id"
      | "startDate"
      | "endDate"
      | "assignValidationDate"
      | "note"
      | "educationalInstitutionName"
      | "diploma"
      | "typeName"
      | "issuedDate"
      | "startDateHistory"
      | "endDateHistory"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      PersonQualification,
      | "id"
      | "startDate"
      | "endDate"
      | "assignValidationDate"
      | "note"
      | "educationalInstitutionName"
      | "diploma"
      | "typeName"
      | "issuedDate"
      | "startDateHistory"
      | "endDateHistory"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "personQualification-view"
  ? Pick<
      PersonQualification,
      | "id"
      | "startDate"
      | "endDate"
      | "assignValidationDate"
      | "note"
      | "educationalInstitutionName"
      | "diploma"
      | "typeName"
      | "issuedDate"
      | "startDateHistory"
      | "endDateHistory"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "type"
      | "attachment"
      | "personGroup"
    >
  : never;
