import { AbstractDictionary } from "./AbstractDictionary";
export class DicRcQuestionnaireCategory extends AbstractDictionary {
  static NAME = "tsadv$DicRcQuestionnaireCategory";
}
export type DicRcQuestionnaireCategoryViewName =
  | "_minimal"
  | "_local"
  | "_base";
export type DicRcQuestionnaireCategoryView<
  V extends DicRcQuestionnaireCategoryViewName
> = V extends "_minimal"
  ? Pick<DicRcQuestionnaireCategory, "id" | "langValue">
  : V extends "_local"
  ? Pick<
      DicRcQuestionnaireCategory,
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
      DicRcQuestionnaireCategory,
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
