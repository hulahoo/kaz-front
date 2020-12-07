import { AbstractParentEntity } from "./AbstractParentEntity";
import { QuestionnaireQuestion } from "./tsadv$QuestionnaireQuestion";
import { FileDescriptor } from "./sys$FileDescriptor";
export class QuestionAnswer extends AbstractParentEntity {
  static NAME = "tsadv$QuestionAnswer";
  question?: QuestionnaireQuestion | null;
  order?: number | null;
  score?: number | null;
  icon?: FileDescriptor | null;
  answer?: string | null;
  answerLang1?: string | null;
  answerLang2?: string | null;
  answerLang3?: string | null;
  answerLang4?: string | null;
  answerLang5?: string | null;
  correctAnswer?: boolean | null;
}
export type QuestionAnswerViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "questionAnswer.browse"
  | "questionAnswer.edit";
export type QuestionAnswerView<
  V extends QuestionAnswerViewName
> = V extends "_minimal"
  ? Pick<QuestionAnswer, "id" | "answerLang1">
  : V extends "_local"
  ? Pick<
      QuestionAnswer,
      | "id"
      | "order"
      | "score"
      | "answerLang1"
      | "answerLang2"
      | "answerLang3"
      | "answerLang4"
      | "answerLang5"
      | "correctAnswer"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      QuestionAnswer,
      | "id"
      | "answerLang1"
      | "order"
      | "score"
      | "answerLang2"
      | "answerLang3"
      | "answerLang4"
      | "answerLang5"
      | "correctAnswer"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "questionAnswer.browse"
  ? Pick<
      QuestionAnswer,
      "id" | "answer" | "correctAnswer" | "icon" | "answerLang1"
    >
  : V extends "questionAnswer.edit"
  ? Pick<
      QuestionAnswer,
      | "id"
      | "question"
      | "score"
      | "correctAnswer"
      | "icon"
      | "answerLang1"
      | "order"
    >
  : never;
