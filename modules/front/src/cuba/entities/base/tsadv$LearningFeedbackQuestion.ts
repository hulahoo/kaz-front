import { AbstractParentEntity } from "./AbstractParentEntity";
import { LearningFeedbackAnswer } from "./tsadv$LearningFeedbackAnswer";
import { DicLearningFeedbackQuestionType } from "./tsadv$DicLearningFeedbackQuestionType";
export class LearningFeedbackQuestion extends AbstractParentEntity {
  static NAME = "tsadv$LearningFeedbackQuestion";
  questionLangValue1?: string | null;
  answers?: LearningFeedbackAnswer[] | null;
  questionLangValue2?: string | null;
  questionLangValue3?: string | null;
  questionLangValue4?: string | null;
  questionLangValue5?: string | null;
  questionType?: any | null;
  dicQuestionType?: DicLearningFeedbackQuestionType | null;
  questionLangValue?: string | null;
}
export type LearningFeedbackQuestionViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "course.feedback"
  | "learningFeedbackQuestion.browse"
  | "learningFeedbackQuestion.edit"
  | "question.with.answers";
export type LearningFeedbackQuestionView<
  V extends LearningFeedbackQuestionViewName
> = V extends "_base"
  ? Pick<
      LearningFeedbackQuestion,
      | "id"
      | "questionLangValue"
      | "questionLangValue1"
      | "questionLangValue2"
      | "questionLangValue3"
      | "questionLangValue4"
      | "questionLangValue5"
      | "questionType"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      LearningFeedbackQuestion,
      | "id"
      | "questionLangValue1"
      | "questionLangValue2"
      | "questionLangValue3"
      | "questionLangValue4"
      | "questionLangValue5"
      | "questionType"
      | "questionLangValue"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<LearningFeedbackQuestion, "id" | "questionLangValue">
  : V extends "course.feedback"
  ? Pick<
      LearningFeedbackQuestion,
      "id" | "questionLangValue1" | "questionType" | "answers"
    >
  : V extends "learningFeedbackQuestion.browse"
  ? Pick<
      LearningFeedbackQuestion,
      | "id"
      | "questionLangValue1"
      | "questionLangValue2"
      | "questionLangValue3"
      | "questionLangValue4"
      | "questionLangValue5"
      | "questionType"
      | "questionLangValue"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "answers"
    >
  : V extends "learningFeedbackQuestion.edit"
  ? Pick<
      LearningFeedbackQuestion,
      | "id"
      | "questionLangValue1"
      | "questionLangValue2"
      | "questionLangValue3"
      | "questionLangValue4"
      | "questionLangValue5"
      | "questionType"
      | "questionLangValue"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "answers"
    >
  : V extends "question.with.answers"
  ? Pick<
      LearningFeedbackQuestion,
      | "id"
      | "questionLangValue1"
      | "questionLangValue2"
      | "questionLangValue3"
      | "questionLangValue4"
      | "questionLangValue5"
      | "questionType"
      | "questionLangValue"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "answers"
    >
  : never;
