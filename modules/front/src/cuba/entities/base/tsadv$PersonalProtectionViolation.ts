import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonalProtection } from "./tsadv$PersonalProtection";
import { PersonalProtectionInspector } from "./tsadv$PersonalProtectionInspector";
export class PersonalProtectionViolation extends AbstractParentEntity {
  static NAME = "tsadv$PersonalProtectionViolation";
  personalProtection?: PersonalProtection | null;
  personalProtectionInspector?: PersonalProtectionInspector | null;
  violationDate?: any | null;
  violationInfo?: string | null;
}
export type PersonalProtectionViolationViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "personalProtectionViolation.edit";
export type PersonalProtectionViolationView<
  V extends PersonalProtectionViolationViewName
> = V extends "_base"
  ? Pick<
      PersonalProtectionViolation,
      | "id"
      | "violationDate"
      | "violationInfo"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      PersonalProtectionViolation,
      | "id"
      | "violationDate"
      | "violationInfo"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "personalProtectionViolation.edit"
  ? Pick<
      PersonalProtectionViolation,
      | "id"
      | "violationDate"
      | "violationInfo"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "personalProtection"
      | "personalProtectionInspector"
    >
  : never;
