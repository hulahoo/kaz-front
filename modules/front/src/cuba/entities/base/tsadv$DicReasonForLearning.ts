import { AbstractDictionary } from "./AbstractDictionary";
export class DicReasonForLearning extends AbstractDictionary {
  static NAME = "tsadv$DicReasonForLearning";
}
export type DicReasonForLearningViewName = "_minimal" | "_local" | "_base";
export type DicReasonForLearningView<
  V extends DicReasonForLearningViewName
> = V extends "_minimal"
  ? Pick<DicReasonForLearning, "id" | "langValue">
  : V extends "_local"
  ? Pick<
      DicReasonForLearning,
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
      DicReasonForLearning,
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
