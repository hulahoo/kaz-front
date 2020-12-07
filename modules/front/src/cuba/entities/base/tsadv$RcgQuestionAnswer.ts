import { StandardEntity } from "./sys$StandardEntity";
import { FileDescriptor } from "./sys$FileDescriptor";
import { RcgQuestion } from "./tsadv$RcgQuestion";
export class RcgQuestionAnswer extends StandardEntity {
  static NAME = "tsadv$RcgQuestionAnswer";
  textLang1?: string | null;
  textLang2?: string | null;
  textLang3?: string | null;
  textLang4?: string | null;
  textLang5?: string | null;
  score?: number | null;
  code?: string | null;
  icon?: FileDescriptor | null;
  rcgQuestion?: RcgQuestion | null;
  text?: string | null;
}
export type RcgQuestionAnswerViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "rcgQuestionAnswer.edit";
export type RcgQuestionAnswerView<
  V extends RcgQuestionAnswerViewName
> = V extends "_local"
  ? Pick<
      RcgQuestionAnswer,
      | "id"
      | "textLang1"
      | "textLang2"
      | "textLang3"
      | "textLang4"
      | "textLang5"
      | "score"
      | "code"
      | "text"
    >
  : V extends "_base"
  ? Pick<
      RcgQuestionAnswer,
      | "id"
      | "textLang1"
      | "textLang2"
      | "textLang3"
      | "textLang4"
      | "textLang5"
      | "score"
      | "code"
      | "text"
    >
  : V extends "rcgQuestionAnswer.edit"
  ? Pick<
      RcgQuestionAnswer,
      | "id"
      | "textLang1"
      | "textLang2"
      | "textLang3"
      | "textLang4"
      | "textLang5"
      | "score"
      | "code"
      | "text"
      | "icon"
    >
  : never;
