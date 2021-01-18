import { AbstractDictionary } from "./AbstractDictionary";
export class DicEmployeeCategory extends AbstractDictionary {
  static NAME = "tsadv$DicEmployeeCategory";
}
export type DicEmployeeCategoryViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "dicEmployeeCategory.browse";
export type DicEmployeeCategoryView<
  V extends DicEmployeeCategoryViewName
> = V extends "_base"
  ? Pick<
      DicEmployeeCategory,
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
      DicEmployeeCategory,
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
  ? Pick<DicEmployeeCategory, "id" | "langValue">
  : V extends "dicEmployeeCategory.browse"
  ? Pick<
      DicEmployeeCategory,
      | "id"
      | "langValue1"
      | "langValue2"
      | "langValue3"
      | "langValue4"
      | "langValue5"
      | "startDate"
      | "endDate"
      | "code"
      | "isSystemRecord"
    >
  : never;
