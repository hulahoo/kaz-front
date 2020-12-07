import { AbstractEntityInt } from "./tsadv$AbstractEntityInt";
export class InterviewAnswerInt extends AbstractEntityInt {
  static NAME = "tsadv$InterviewAnswerInt";
  checked?: boolean | null;
  answerId?: any | null;
}
export type InterviewAnswerIntViewName = "_minimal" | "_local" | "_base";
export type InterviewAnswerIntView<
  V extends InterviewAnswerIntViewName
> = V extends "_minimal"
  ? Pick<InterviewAnswerInt, "id">
  : V extends "_base"
  ? Pick<InterviewAnswerInt, "id">
  : never;
