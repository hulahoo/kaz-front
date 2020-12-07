import { AbstractEntityInt } from "./tsadv$AbstractEntityInt";
import { AnswerInt } from "./tsadv$AnswerInt";
export class QuestionInt extends AbstractEntityInt {
  static NAME = "tsadv$QuestionInt";
  questionText?: string | null;
  answerType?: string | null;
  answers?: AnswerInt | null;
}
export type QuestionIntViewName = "_minimal" | "_local" | "_base";
export type QuestionIntView<
  V extends QuestionIntViewName
> = V extends "_minimal"
  ? Pick<QuestionInt, "id">
  : V extends "_base"
  ? Pick<QuestionInt, "id">
  : never;
