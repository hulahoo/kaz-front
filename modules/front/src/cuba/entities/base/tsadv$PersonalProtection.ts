import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicProtectionEquipment } from "./tsadv$DicProtectionEquipment";
import { DicProtectionEquipmentCondition } from "./tsadv$DicProtectionEquipmentCondition";
export class PersonalProtection extends AbstractParentEntity {
  static NAME = "tsadv$PersonalProtection";
  employee?: PersonGroupExt | null;
  protectionEquipment?: DicProtectionEquipment | null;
  quantity?: number | null;
  dateOfIssue?: any | null;
  planChangeDate?: any | null;
  status?: any | null;
  condition?: DicProtectionEquipmentCondition | null;
  isAcceptedByPerson?: boolean | null;
  writtenOfReason?: string | null;
  writtenOfDate?: any | null;
  replacementDate?: any | null;
}
export type PersonalProtectionViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "personalProtection.edit";
export type PersonalProtectionView<
  V extends PersonalProtectionViewName
> = V extends "_local"
  ? Pick<
      PersonalProtection,
      | "id"
      | "quantity"
      | "dateOfIssue"
      | "planChangeDate"
      | "status"
      | "isAcceptedByPerson"
      | "writtenOfReason"
      | "writtenOfDate"
      | "replacementDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      PersonalProtection,
      | "id"
      | "quantity"
      | "dateOfIssue"
      | "planChangeDate"
      | "status"
      | "isAcceptedByPerson"
      | "writtenOfReason"
      | "writtenOfDate"
      | "replacementDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "personalProtection.edit"
  ? Pick<
      PersonalProtection,
      | "id"
      | "quantity"
      | "dateOfIssue"
      | "planChangeDate"
      | "status"
      | "isAcceptedByPerson"
      | "writtenOfReason"
      | "writtenOfDate"
      | "replacementDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "employee"
      | "protectionEquipment"
      | "condition"
    >
  : never;
