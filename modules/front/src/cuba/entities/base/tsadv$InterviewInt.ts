import { AbstractEntityInt } from "./tsadv$AbstractEntityInt";
export class InterviewInt extends AbstractEntityInt {
  static NAME = "tsadv$InterviewInt";
  interviewDate?: string | null;
  timeFrom?: string | null;
  timeTo?: string | null;
  place?: string | null;
  hiringStep?: string | null;
  requisition?: any | null;
  requisitionCode?: string | null;
  requisitionJob?: string | null;
  interviewStatus?: string | null;
  reason?: string | null;
}
export type InterviewIntViewName = "_minimal" | "_local" | "_base";
export type InterviewIntView<
  V extends InterviewIntViewName
> = V extends "_minimal"
  ? Pick<InterviewInt, "id">
  : V extends "_base"
  ? Pick<InterviewInt, "id">
  : never;
