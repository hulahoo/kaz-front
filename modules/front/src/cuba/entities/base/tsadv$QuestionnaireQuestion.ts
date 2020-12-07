import { AbstractParentEntity } from "./AbstractParentEntity";
import { Questionnaire } from "./tsadv$Questionnaire";
import { DicQuestionnaireQuestionSection } from "./tsadv$DicQuestionnaireQuestionSection";
import { QuestionAnswer } from "./tsadv$QuestionAnswer";
export class QuestionnaireQuestion extends AbstractParentEntity {
  static NAME = "tsadv$QuestionnaireQuestion";
  questionnaire?: Questionnaire | null;
  order?: number | null;
  section?: DicQuestionnaireQuestionSection | null;
  questionTextLang1?: string | null;
  questionTextLang2?: string | null;
  questionTextLang3?: string | null;
  questionTextLang4?: string | null;
  questionTextLang5?: string | null;
  questionText?: string | null;
  questionType?: any | null;
  score?: number | null;
  answer?: QuestionAnswer[] | null;
}
export type QuestionnaireQuestionViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "questionnaireQuestion.browse"
  | "questionnaireQuestion.edit";
export type QuestionnaireQuestionView<
  V extends QuestionnaireQuestionViewName
> = V extends "_minimal"
  ? Pick<QuestionnaireQuestion, "id" | "questionText">
  : V extends "_local"
  ? Pick<
      QuestionnaireQuestion,
      | "id"
      | "order"
      | "questionTextLang1"
      | "questionTextLang2"
      | "questionTextLang3"
      | "questionTextLang4"
      | "questionTextLang5"
      | "questionType"
      | "score"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      QuestionnaireQuestion,
      | "id"
      | "questionText"
      | "order"
      | "questionTextLang1"
      | "questionTextLang2"
      | "questionTextLang3"
      | "questionTextLang4"
      | "questionTextLang5"
      | "questionType"
      | "score"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "questionnaireQuestion.browse"
  ? Pick<
      QuestionnaireQuestion,
      | "id"
      | "questionText"
      | "questionType"
      | "score"
      | "answer"
      | "questionTextLang1"
      | "questionTextLang2"
      | "questionTextLang3"
      | "questionTextLang4"
      | "questionTextLang5"
      | "section"
    >
  : V extends "questionnaireQuestion.edit"
  ? Pick<
      QuestionnaireQuestion,
      | "id"
      | "questionText"
      | "questionType"
      | "score"
      | "answer"
      | "questionTextLang1"
      | "questionTextLang2"
      | "questionTextLang3"
      | "questionTextLang4"
      | "questionTextLang5"
      | "section"
      | "order"
    >
  : never;
