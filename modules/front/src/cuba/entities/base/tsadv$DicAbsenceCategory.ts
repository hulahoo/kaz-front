import { AbstractDictionary } from "./AbstractDictionary";
export class DicAbsenceCategory extends AbstractDictionary {
  static NAME = "tsadv$DicAbsenceCategory";
}
export type DicAbsenceCategoryViewName = "_base" | "_local" | "_minimal";
export type DicAbsenceCategoryView<
  V extends DicAbsenceCategoryViewName
> = V extends "_base"
  ? Pick<
      DicAbsenceCategory,
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
      DicAbsenceCategory,
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
  ? Pick<DicAbsenceCategory, "id" | "langValue">
  : never;
