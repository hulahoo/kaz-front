import { AbstractDictionary } from "./AbstractDictionary";
import { Course } from "./tsadv$Course";
export class DicCategory extends AbstractDictionary {
  static NAME = "tsadv$DicCategory";
  parentCategory?: DicCategory | null;
  courses?: Course[] | null;
  image?: any | null;
}
export type DicCategoryViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "category-courses"
  | "dicCategory.browse";
export type DicCategoryView<V extends DicCategoryViewName> = V extends "_base"
  ? Pick<
      DicCategory,
      | "id"
      | "langValue"
      | "langValue1"
      | "langValue2"
      | "langValue3"
      | "langValue4"
      | "langValue5"
      | "image"
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
      DicCategory,
      | "id"
      | "image"
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
      DicCategory,
      | "id"
      | "langValue"
      | "langValue1"
      | "langValue2"
      | "langValue3"
      | "langValue4"
      | "langValue5"
    >
  : V extends "category-courses"
  ? Pick<
      DicCategory,
      | "id"
      | "langValue"
      | "langValue1"
      | "langValue2"
      | "langValue3"
      | "courses"
    >
  : V extends "dicCategory.browse"
  ? Pick<
      DicCategory,
      | "id"
      | "parentCategory"
      | "langValue1"
      | "langValue2"
      | "langValue3"
      | "langValue4"
      | "langValue5"
      | "startDate"
      | "endDate"
      | "image"
      | "isSystemRecord"
      | "code"
      | "company"
    >
  : never;
