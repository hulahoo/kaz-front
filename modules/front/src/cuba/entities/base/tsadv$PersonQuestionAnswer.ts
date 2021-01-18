import { StandardEntity } from "./sys$StandardEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { RcgQuestion } from "./tsadv$RcgQuestion";
import { RcgQuestionAnswer } from "./tsadv$RcgQuestionAnswer";
export class PersonQuestionAnswer extends StandardEntity {
  static NAME = "tsadv$PersonQuestionAnswer";
  personGroup?: PersonGroupExt | null;
  question?: RcgQuestion | null;
  answer?: RcgQuestionAnswer | null;
  date?: any | null;
}
export type PersonQuestionAnswerViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "personQuestionAnswer.browse";
export type PersonQuestionAnswerView<
  V extends PersonQuestionAnswerViewName
> = V extends "_base"
  ? Pick<PersonQuestionAnswer, "id" | "date">
  : V extends "_local"
  ? Pick<PersonQuestionAnswer, "id" | "date">
  : V extends "personQuestionAnswer.browse"
  ? Pick<
      PersonQuestionAnswer,
      "id" | "date" | "personGroup" | "question" | "answer"
    >
  : never;
