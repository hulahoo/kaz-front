import { AbstractParentEntity } from "./AbstractParentEntity";
import { RcQuestionnaireQuestion } from "./tsadv$RcQuestionnaireQuestion";
import { RcAnswer } from "./tsadv$RcAnswer";
export class RcQuestionnaireAnswer extends AbstractParentEntity {
  static NAME = "tsadv$RcQuestionnaireAnswer";
  questionnaireQuestion?: RcQuestionnaireQuestion | null;
  answer?: RcAnswer | null;
  weight?: any | null;
  order?: number | null;
}
export type RcQuestionnaireAnswerViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "rcQuestionnaireAnswer.view";
export type RcQuestionnaireAnswerView<
  V extends RcQuestionnaireAnswerViewName
> = V extends "_minimal"
  ? Pick<RcQuestionnaireAnswer, "id">
  : V extends "_local"
  ? Pick<
      RcQuestionnaireAnswer,
      | "id"
      | "weight"
      | "order"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      RcQuestionnaireAnswer,
      | "id"
      | "weight"
      | "order"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "rcQuestionnaireAnswer.view"
  ? Pick<
      RcQuestionnaireAnswer,
      | "id"
      | "weight"
      | "order"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "questionnaireQuestion"
      | "answer"
    >
  : never;
