import { AbstractDictionary } from "./AbstractDictionary";
export class DicPersonPreferenceType extends AbstractDictionary {
  static NAME = "tsadv$DicPersonPreferenceType";
  coins?: any | null;
}
export type DicPersonPreferenceTypeViewName = "_base" | "_local" | "_minimal";
export type DicPersonPreferenceTypeView<
  V extends DicPersonPreferenceTypeViewName
> = V extends "_base"
  ? Pick<
      DicPersonPreferenceType,
      | "id"
      | "langValue"
      | "coins"
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
      DicPersonPreferenceType,
      | "id"
      | "coins"
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
  ? Pick<DicPersonPreferenceType, "id" | "langValue">
  : never;
