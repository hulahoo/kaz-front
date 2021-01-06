import { StandardEntity } from "./sys$StandardEntity";
import { RcgQuestionAnswer } from "./tsadv$RcgQuestionAnswer";
export class RcgQuestion extends StandardEntity {
  static NAME = "tsadv$RcgQuestion";
  textLang1?: string | null;
  textLang2?: string | null;
  textLang3?: string | null;
  textLang4?: string | null;
  textLang5?: string | null;
  descriptionLang1?: string | null;
  descriptionLang2?: string | null;
  descriptionLang3?: string | null;
  descriptionLang4?: string | null;
  descriptionLang5?: string | null;
  active?: boolean | null;
  answerType?: any | null;
  coins?: any | null;
  answers?: RcgQuestionAnswer[] | null;
  text?: string | null;
  description?: string | null;
}
export type RcgQuestionViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "rcgQuestion.browse"
  | "rcgQuestion.edit";
export type RcgQuestionView<V extends RcgQuestionViewName> = V extends "_base"
  ? Pick<
      RcgQuestion,
      | "id"
      | "textLang1"
      | "textLang2"
      | "textLang3"
      | "textLang4"
      | "textLang5"
      | "descriptionLang1"
      | "descriptionLang2"
      | "descriptionLang3"
      | "descriptionLang4"
      | "descriptionLang5"
      | "active"
      | "answerType"
      | "coins"
      | "text"
      | "description"
    >
  : V extends "_local"
  ? Pick<
      RcgQuestion,
      | "id"
      | "textLang1"
      | "textLang2"
      | "textLang3"
      | "textLang4"
      | "textLang5"
      | "descriptionLang1"
      | "descriptionLang2"
      | "descriptionLang3"
      | "descriptionLang4"
      | "descriptionLang5"
      | "active"
      | "answerType"
      | "coins"
      | "text"
      | "description"
    >
  : V extends "rcgQuestion.browse"
  ? Pick<
      RcgQuestion,
      | "id"
      | "textLang1"
      | "textLang2"
      | "textLang3"
      | "textLang4"
      | "textLang5"
      | "descriptionLang1"
      | "descriptionLang2"
      | "descriptionLang3"
      | "descriptionLang4"
      | "descriptionLang5"
      | "active"
      | "answerType"
      | "coins"
      | "text"
      | "description"
    >
  : V extends "rcgQuestion.edit"
  ? Pick<
      RcgQuestion,
      | "id"
      | "textLang1"
      | "textLang2"
      | "textLang3"
      | "textLang4"
      | "textLang5"
      | "descriptionLang1"
      | "descriptionLang2"
      | "descriptionLang3"
      | "descriptionLang4"
      | "descriptionLang5"
      | "active"
      | "answerType"
      | "coins"
      | "text"
      | "description"
      | "answers"
    >
  : never;
