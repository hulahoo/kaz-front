import { AbstractParentEntity } from "./AbstractParentEntity";
import { LearningFeedbackQuestion } from "./tsadv$LearningFeedbackQuestion";
export class LearningFeedbackAnswer extends AbstractParentEntity {
  static NAME = "tsadv$LearningFeedbackAnswer";
  order?: number | null;
  score?: number | null;
  answerLangValue1?: string | null;
  answerLangValue2?: string | null;
  answerLangValue3?: string | null;
  answerLangValue4?: string | null;
  answerLangValue5?: string | null;
  feedbackQuestion?: LearningFeedbackQuestion | null;
  answerLangValue?: string | null;
}
export type LearningFeedbackAnswerViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "learningFeedbackAnswer.edit";
export type LearningFeedbackAnswerView<
  V extends LearningFeedbackAnswerViewName
> = V extends "_local"
  ? Pick<
      LearningFeedbackAnswer,
      | "id"
      | "order"
      | "score"
      | "answerLangValue1"
      | "answerLangValue2"
      | "answerLangValue3"
      | "answerLangValue4"
      | "answerLangValue5"
      | "answerLangValue"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      LearningFeedbackAnswer,
      | "id"
      | "order"
      | "score"
      | "answerLangValue1"
      | "answerLangValue2"
      | "answerLangValue3"
      | "answerLangValue4"
      | "answerLangValue5"
      | "answerLangValue"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "learningFeedbackAnswer.edit"
  ? Pick<
      LearningFeedbackAnswer,
      | "id"
      | "order"
      | "score"
      | "answerLangValue1"
      | "answerLangValue2"
      | "answerLangValue3"
      | "answerLangValue4"
      | "answerLangValue5"
      | "answerLangValue"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
