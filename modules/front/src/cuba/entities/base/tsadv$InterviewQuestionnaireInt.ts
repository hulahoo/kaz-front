import { AbstractEntityInt } from "./tsadv$AbstractEntityInt";
import { InterviewQuestionInt } from "./tsadv$InterviewQuestionInt";
export class InterviewQuestionnaireInt extends AbstractEntityInt {
  static NAME = "tsadv$InterviewQuestionnaireInt";
  questions?: InterviewQuestionInt | null;
  questionnaireId?: any | null;
  requisition?: any | null;
  interviewStatus?: string | null;
}
export type InterviewQuestionnaireIntViewName = "_minimal" | "_local" | "_base";
export type InterviewQuestionnaireIntView<
  V extends InterviewQuestionnaireIntViewName
> = V extends "_minimal"
  ? Pick<InterviewQuestionnaireInt, "id">
  : V extends "_base"
  ? Pick<InterviewQuestionnaireInt, "id">
  : never;
