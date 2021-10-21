import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { FileDescriptor } from "./sys$FileDescriptor";
export class PersonPayslip extends AbstractParentEntity {
  static NAME = "tsadv_PersonPayslip";
  personGroup?: PersonGroupExt | null;
  period?: any | null;
  file?: FileDescriptor | null;
}
export type PersonPayslipViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "personPayslip.edit"
  | "portal.personPayslip-list";
export type PersonPayslipView<
  V extends PersonPayslipViewName
> = V extends "_base"
  ? Pick<
      PersonPayslip,
      "id" | "period" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      PersonPayslip,
      "id" | "period" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "personPayslip.edit"
  ? Pick<
      PersonPayslip,
      | "id"
      | "period"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "personGroup"
      | "file"
    >
  : V extends "portal.personPayslip-list"
  ? Pick<
      PersonPayslip,
      | "id"
      | "period"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "personGroup"
      | "file"
    >
  : never;
