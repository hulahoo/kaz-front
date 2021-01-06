import { AbstractEntityInt } from "./tsadv$AbstractEntityInt";
import { InterviewAnswerInt } from "./tsadv$InterviewAnswerInt";
export class InterviewQuestionInt extends AbstractEntityInt {
  static NAME = "tsadv$InterviewQuestionInt";
  answers?: InterviewAnswerInt | null;
  questionId?: any | null;
  anotherAnswer?: string | null;
  type?: string | null;
}
export type InterviewQuestionIntViewName = "_base" | "_local" | "_minimal";
export type InterviewQuestionIntView<
  V extends InterviewQuestionIntViewName
> = V extends "_base"
  ? Pick<InterviewQuestionInt, "id">
  : V extends "_minimal"
  ? Pick<InterviewQuestionInt, "id">
  : never;
