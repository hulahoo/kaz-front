import { AbstractDictionary } from "./AbstractDictionary";
import { DicProtectionEquipmentType } from "./tsadv$DicProtectionEquipmentType";
import { UOM } from "./tsadv$UOM";
import { DicProtectionEquipmentPhoto } from "./tsadv$DicProtectionEquipmentPhoto";
export class DicProtectionEquipment extends AbstractDictionary {
  static NAME = "tsadv$DicProtectionEquipment";
  gost?: string | null;
  replacementDuration?: number | null;
  type?: DicProtectionEquipmentType | null;
  isSingle?: boolean | null;
  replacementUom?: any | null;
  unitOfMeasure?: UOM | null;
  dicProtectionEquipmentPhoto?: DicProtectionEquipmentPhoto[] | null;
}
export type DicProtectionEquipmentViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "dicProtectionEquipment.edit";
export type DicProtectionEquipmentView<
  V extends DicProtectionEquipmentViewName
> = V extends "_base"
  ? Pick<
      DicProtectionEquipment,
      | "id"
      | "langValue"
      | "langValue1"
      | "langValue2"
      | "langValue3"
      | "langValue4"
      | "langValue5"
      | "gost"
      | "replacementDuration"
      | "isSingle"
      | "replacementUom"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "description1"
      | "description2"
      | "description3"
      | "description4"
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
      DicProtectionEquipment,
      | "id"
      | "gost"
      | "replacementDuration"
      | "isSingle"
      | "replacementUom"
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
  ? Pick<
      DicProtectionEquipment,
      | "id"
      | "langValue"
      | "langValue1"
      | "langValue2"
      | "langValue3"
      | "langValue4"
      | "langValue5"
    >
  : V extends "dicProtectionEquipment.edit"
  ? Pick<
      DicProtectionEquipment,
      | "id"
      | "gost"
      | "replacementDuration"
      | "isSingle"
      | "replacementUom"
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
      | "type"
      | "unitOfMeasure"
      | "dicProtectionEquipmentPhoto"
    >
  : never;
