import { AbstractEntityInt } from "./tsadv$AbstractEntityInt";
import { InterviewAnswerInt } from "./tsadv$InterviewAnswerInt";
export class InterviewQuestionInt extends AbstractEntityInt {
  static NAME = "tsadv$InterviewQuestionInt";
  answers?: InterviewAnswerInt | null;
  questionId?: any | null;
  anotherAnswer?: string | null;
  type?: string | null;
}
export type InterviewQuestionIntViewName = "_minimal" | "_local" | "_base";
export type InterviewQuestionIntView<
  V extends InterviewQuestionIntViewName
> = V extends "_minimal"
  ? Pick<InterviewQuestionInt, "id">
  : V extends "_base"
  ? Pick<InterviewQuestionInt, "id">
  : never;
