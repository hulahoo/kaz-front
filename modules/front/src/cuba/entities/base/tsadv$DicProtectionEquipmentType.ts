import { AbstractDictionary } from "./AbstractDictionary";
export class DicProtectionEquipmentType extends AbstractDictionary {
  static NAME = "tsadv$DicProtectionEquipmentType";
}
export type DicProtectionEquipmentTypeViewName =
  | "_base"
  | "_local"
  | "_minimal";
export type DicProtectionEquipmentTypeView<
  V extends DicProtectionEquipmentTypeViewName
> = V extends "_base"
  ? Pick<
      DicProtectionEquipmentType,
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
      DicProtectionEquipmentType,
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
  ? Pick<DicProtectionEquipmentType, "id" | "langValue">
  : never;
