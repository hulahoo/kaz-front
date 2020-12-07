import { AbstractDictionary } from "./AbstractDictionary";
export class DicQuestionnaireType extends AbstractDictionary {
  static NAME = "tsadv$DicQuestionnaireType";
}
export type DicQuestionnaireTypeViewName = "_minimal" | "_local" | "_base";
export type DicQuestionnaireTypeView<
  V extends DicQuestionnaireTypeViewName
> = V extends "_minimal"
  ? Pick<DicQuestionnaireType, "id" | "langValue">
  : V extends "_local"
  ? Pick<
      DicQuestionnaireType,
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
      DicQuestionnaireType,
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
