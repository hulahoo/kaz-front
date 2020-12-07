import { AbstractDictionary } from "./AbstractDictionary";
export class DicLearningObjectType extends AbstractDictionary {
  static NAME = "tsadv$DicLearningObjectType";
}
export type DicLearningObjectTypeViewName = "_minimal" | "_local" | "_base";
export type DicLearningObjectTypeView<
  V extends DicLearningObjectTypeViewName
> = V extends "_minimal"
  ? Pick<DicLearningObjectType, "id" | "langValue">
  : V extends "_local"
  ? Pick<
      DicLearningObjectType,
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
      DicLearningObjectType,
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
