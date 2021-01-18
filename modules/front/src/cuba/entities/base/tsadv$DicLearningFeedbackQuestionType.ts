import { AbstractDictionary } from "./AbstractDictionary";
export class DicLearningFeedbackQuestionType extends AbstractDictionary {
  static NAME = "tsadv$DicLearningFeedbackQuestionType";
}
export type DicLearningFeedbackQuestionTypeViewName =
  | "_base"
  | "_local"
  | "_minimal";
export type DicLearningFeedbackQuestionTypeView<
  V extends DicLearningFeedbackQuestionTypeViewName
> = V extends "_base"
  ? Pick<
      DicLearningFeedbackQuestionType,
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
      DicLearningFeedbackQuestionType,
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
  ? Pick<DicLearningFeedbackQuestionType, "id" | "langValue">
  : never;
