import { AbstractParentEntity } from "./AbstractParentEntity";
import { RcQuestionnaire } from "./tsadv$RcQuestionnaire";
import { RcQuestion } from "./tsadv$RcQuestion";
import { RcQuestionnaireAnswer } from "./tsadv$RcQuestionnaireAnswer";
export class RcQuestionnaireQuestion extends AbstractParentEntity {
  static NAME = "tsadv$RcQuestionnaireQuestion";
  questionnaire?: RcQuestionnaire | null;
  question?: RcQuestion | null;
  answers?: RcQuestionnaireAnswer[] | null;
  order?: number | null;
}
export type RcQuestionnaireQuestionViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "rcQuestionnaireQuestion.view"
  | "rcQuestionnaireQuestion.rest";
export type RcQuestionnaireQuestionView<
  V extends RcQuestionnaireQuestionViewName
> = V extends "_minimal"
  ? Pick<RcQuestionnaireQuestion, "id">
  : V extends "_local"
  ? Pick<
      RcQuestionnaireQuestion,
      "id" | "order" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      RcQuestionnaireQuestion,
      "id" | "order" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "rcQuestionnaireQuestion.view"
  ? Pick<
      RcQuestionnaireQuestion,
      | "id"
      | "order"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "questionnaire"
      | "question"
      | "answers"
    >
  : V extends "rcQuestionnaireQuestion.rest"
  ? Pick<
      RcQuestionnaireQuestion,
      | "id"
      | "order"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "questionnaire"
      | "question"
      | "answers"
    >
  : never;
