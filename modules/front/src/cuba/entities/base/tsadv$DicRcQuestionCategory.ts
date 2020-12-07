import { AbstractDictionary } from "./AbstractDictionary";
export class DicRcQuestionCategory extends AbstractDictionary {
  static NAME = "tsadv$DicRcQuestionCategory";
}
export type DicRcQuestionCategoryViewName = "_minimal" | "_local" | "_base";
export type DicRcQuestionCategoryView<
  V extends DicRcQuestionCategoryViewName
> = V extends "_minimal"
  ? Pick<DicRcQuestionCategory, "id" | "langValue">
  : V extends "_local"
  ? Pick<
      DicRcQuestionCategory,
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
      DicRcQuestionCategory,
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
