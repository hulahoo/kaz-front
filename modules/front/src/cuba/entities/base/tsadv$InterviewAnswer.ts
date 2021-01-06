import { AbstractParentEntity } from "./AbstractParentEntity";
import { InterviewQuestion } from "./tsadv$InterviewQuestion";
import { RcAnswer } from "./tsadv$RcAnswer";
export class InterviewAnswer extends AbstractParentEntity {
  static NAME = "tsadv$InterviewAnswer";
  interviewQuestion?: InterviewQuestion | null;
  weight?: any | null;
  answer?: RcAnswer | null;
  textAnswer?: string | null;
  dateAnswer?: any | null;
  booleanAnswer?: boolean | null;
  order?: number | null;
  numberAnswer?: any | null;
}
export type InterviewAnswerViewName = "_base" | "_local" | "_minimal";
export type InterviewAnswerView<
  V extends InterviewAnswerViewName
> = V extends "_base"
  ? Pick<
      InterviewAnswer,
      | "id"
      | "weight"
      | "textAnswer"
      | "dateAnswer"
      | "booleanAnswer"
      | "order"
      | "numberAnswer"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      InterviewAnswer,
      | "id"
      | "weight"
      | "textAnswer"
      | "dateAnswer"
      | "booleanAnswer"
      | "order"
      | "numberAnswer"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<InterviewAnswer, "id">
  : never;
