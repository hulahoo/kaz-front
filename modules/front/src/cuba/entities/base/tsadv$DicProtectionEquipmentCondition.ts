import { AbstractDictionary } from "./AbstractDictionary";
export class DicProtectionEquipmentCondition extends AbstractDictionary {
  static NAME = "tsadv$DicProtectionEquipmentCondition";
}
export type DicProtectionEquipmentConditionViewName =
  | "_base"
  | "_local"
  | "_minimal";
export type DicProtectionEquipmentConditionView<
  V extends DicProtectionEquipmentConditionViewName
> = V extends "_base"
  ? Pick<
      DicProtectionEquipmentCondition,
      | "id"
      | "langValue"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "langValue1"
      | "description1"
      | "langValue2"
      | "description2"
      | "langValue3"
      | "description3"
      | "langValue4"
      | "description4"
      | "langValue5"
      | "description5"
      | "startDate"
      | "endDate"
      | "code"
      | "isSystemRecord"
      | "active"
      | "isDefault"
      | "order"
    >
  : V extends "_local"
  ? Pick<
      DicProtectionEquipmentCondition,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "langValue1"
      | "description1"
      | "langValue2"
      | "description2"
      | "langValue3"
      | "description3"
      | "langValue4"
      | "description4"
      | "langValue5"
      | "description5"
      | "startDate"
      | "endDate"
      | "code"
      | "isSystemRecord"
      | "active"
      | "isDefault"
      | "order"
    >
  : V extends "_minimal"
  ? Pick<DicProtectionEquipmentCondition, "id" | "langValue">
  : never;
