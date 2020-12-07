import { AbstractDictionary } from "./AbstractDictionary";
export class DicFireSafetyCategory extends AbstractDictionary {
  static NAME = "tsadv$DicFireSafetyCategory";
}
export type DicFireSafetyCategoryViewName = "_minimal" | "_local" | "_base";
export type DicFireSafetyCategoryView<
  V extends DicFireSafetyCategoryViewName
> = V extends "_minimal"
  ? Pick<DicFireSafetyCategory, "id" | "langValue">
  : V extends "_local"
  ? Pick<
      DicFireSafetyCategory,
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
      DicFireSafetyCategory,
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
