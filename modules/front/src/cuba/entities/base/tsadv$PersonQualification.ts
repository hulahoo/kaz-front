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
}
export type PersonQualificationViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "personQualification-view";
export type PersonQualificationView<
  V extends PersonQualificationViewName
> = V extends "_local"
  ? Pick<
      PersonQualification,
      | "id"
      | "startDate"
      | "endDate"
      | "assignValidationDate"
      | "note"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      PersonQualification,
      | "id"
      | "startDate"
      | "endDate"
      | "assignValidationDate"
      | "note"
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
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "type"
      | "attachment"
      | "personGroup"
    >
  : never;
