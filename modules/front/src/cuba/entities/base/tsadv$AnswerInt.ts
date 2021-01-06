import { AbstractEntityInt } from "./tsadv$AbstractEntityInt";
export class AnswerInt extends AbstractEntityInt {
  static NAME = "tsadv$AnswerInt";
  answerText?: string | null;
  weight?: string | null;
}
export type AnswerIntViewName = "_base" | "_local" | "_minimal";
export type AnswerIntView<V extends AnswerIntViewName> = V extends "_base"
  ? Pick<AnswerInt, "id">
  : V extends "_minimal"
  ? Pick<AnswerInt, "id">
  : never;
