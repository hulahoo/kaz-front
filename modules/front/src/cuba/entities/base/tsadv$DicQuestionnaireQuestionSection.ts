import { AbstractDictionary } from "./AbstractDictionary";
export class DicQuestionnaireQuestionSection extends AbstractDictionary {
  static NAME = "tsadv$DicQuestionnaireQuestionSection";
}
export type DicQuestionnaireQuestionSectionViewName =
  | "_minimal"
  | "_local"
  | "_base";
export type DicQuestionnaireQuestionSectionView<
  V extends DicQuestionnaireQuestionSectionViewName
> = V extends "_minimal"
  ? Pick<DicQuestionnaireQuestionSection, "id" | "langValue">
  : V extends "_local"
  ? Pick<
      DicQuestionnaireQuestionSection,
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
      DicQuestionnaireQuestionSection,
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
