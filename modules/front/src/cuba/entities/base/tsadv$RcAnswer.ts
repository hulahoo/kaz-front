import { AbstractParentEntity } from "./AbstractParentEntity";
import { RcQuestion } from "./tsadv$RcQuestion";
export class RcAnswer extends AbstractParentEntity {
  static NAME = "tsadv$RcAnswer";
  question?: RcQuestion | null;
  order?: number | null;
  answerText1?: string | null;
  answerText2?: string | null;
  answerText3?: string | null;
  answerText4?: string | null;
  answerText5?: string | null;
  answerResult?: any | null;
  positive?: boolean | null;
  answerText?: string | null;
}
export type RcAnswerViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "rcAnswer.view";
export type RcAnswerView<V extends RcAnswerViewName> = V extends "_minimal"
  ? Pick<RcAnswer, "id" | "answerText">
  : V extends "_local"
  ? Pick<
      RcAnswer,
      | "id"
      | "order"
      | "answerText1"
      | "answerText2"
      | "answerText3"
      | "answerText4"
      | "answerText5"
      | "answerResult"
      | "positive"
      | "answerText"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      RcAnswer,
      | "id"
      | "answerText"
      | "order"
      | "answerText1"
      | "answerText2"
      | "answerText3"
      | "answerText4"
      | "answerText5"
      | "answerResult"
      | "positive"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "rcAnswer.view"
  ? Pick<
      RcAnswer,
      | "id"
      | "order"
      | "answerText1"
      | "answerText2"
      | "answerText3"
      | "answerText4"
      | "answerText5"
      | "answerResult"
      | "positive"
      | "answerText"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "question"
    >
  : never;
