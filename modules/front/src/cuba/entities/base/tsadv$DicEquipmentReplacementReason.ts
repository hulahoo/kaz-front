import { AbstractDictionary } from "./AbstractDictionary";
export class DicEquipmentReplacementReason extends AbstractDictionary {
  static NAME = "tsadv$DicEquipmentReplacementReason";
}
export type DicEquipmentReplacementReasonViewName =
  | "_minimal"
  | "_local"
  | "_base";
export type DicEquipmentReplacementReasonView<
  V extends DicEquipmentReplacementReasonViewName
> = V extends "_minimal"
  ? Pick<DicEquipmentReplacementReason, "id" | "langValue">
  : V extends "_local"
  ? Pick<
      DicEquipmentReplacementReason,
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
  : V extends "_base"
  ? Pick<
      DicEquipmentReplacementReason,
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
  : never;
