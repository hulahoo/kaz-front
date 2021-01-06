import { AbstractEntityInt } from "./tsadv$AbstractEntityInt";
import { InterviewQuestionInt } from "./tsadv$InterviewQuestionInt";
export class InterviewQuestionnaireInt extends AbstractEntityInt {
  static NAME = "tsadv$InterviewQuestionnaireInt";
  questions?: InterviewQuestionInt | null;
  questionnaireId?: any | null;
  requisition?: any | null;
  interviewStatus?: string | null;
}
export type InterviewQuestionnaireIntViewName = "_base" | "_local" | "_minimal";
export type InterviewQuestionnaireIntView<
  V extends InterviewQuestionnaireIntViewName
> = V extends "_base"
  ? Pick<InterviewQuestionnaireInt, "id">
  : V extends "_minimal"
  ? Pick<InterviewQuestionnaireInt, "id">
  : never;
