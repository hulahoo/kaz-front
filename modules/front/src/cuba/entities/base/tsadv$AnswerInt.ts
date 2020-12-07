import { AbstractEntityInt } from "./tsadv$AbstractEntityInt";
export class AnswerInt extends AbstractEntityInt {
  static NAME = "tsadv$AnswerInt";
  answerText?: string | null;
  weight?: string | null;
}
export type AnswerIntViewName = "_minimal" | "_local" | "_base";
export type AnswerIntView<V extends AnswerIntViewName> = V extends "_minimal"
  ? Pick<AnswerInt, "id">
  : V extends "_base"
  ? Pick<AnswerInt, "id">
  : never;
