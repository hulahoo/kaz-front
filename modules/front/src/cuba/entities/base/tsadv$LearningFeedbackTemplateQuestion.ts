import { AbstractParentEntity } from "./AbstractParentEntity";
import { LearningFeedbackTemplate } from "./tsadv$LearningFeedbackTemplate";
import { LearningFeedbackQuestion } from "./tsadv$LearningFeedbackQuestion";
export class LearningFeedbackTemplateQuestion extends AbstractParentEntity {
  static NAME = "tsadv$LearningFeedbackTemplateQuestion";
  feedbackTemplate?: LearningFeedbackTemplate | null;
  feedbackQuestion?: LearningFeedbackQuestion | null;
  order?: number | null;
}
export type LearningFeedbackTemplateQuestionViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "learningFeedbackTemplateQuestion.edit";
export type LearningFeedbackTemplateQuestionView<
  V extends LearningFeedbackTemplateQuestionViewName
> = V extends "_local"
  ? Pick<
      LearningFeedbackTemplateQuestion,
      "id" | "order" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      LearningFeedbackTemplateQuestion,
      "id" | "order" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "learningFeedbackTemplateQuestion.edit"
  ? Pick<
      LearningFeedbackTemplateQuestion,
      | "id"
      | "order"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "feedbackQuestion"
      | "feedbackTemplate"
    >
  : never;
