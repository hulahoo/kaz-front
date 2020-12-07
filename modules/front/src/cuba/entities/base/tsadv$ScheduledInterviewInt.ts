import { AbstractEntityInt } from "./tsadv$AbstractEntityInt";
export class ScheduledInterviewInt extends AbstractEntityInt {
  static NAME = "tsadv$ScheduledInterviewInt";
  interviewDate?: string | null;
  timeFrom?: string | null;
  timeTo?: string | null;
  availableRequestCount?: number | null;
  place?: string | null;
  hiringStep?: string | null;
  requisition?: any | null;
  requisitionCode?: string | null;
  requisitionJob?: string | null;
}
export type ScheduledInterviewIntViewName = "_minimal" | "_local" | "_base";
export type ScheduledInterviewIntView<
  V extends ScheduledInterviewIntViewName
> = V extends "_minimal"
  ? Pick<ScheduledInterviewInt, "id">
  : V extends "_base"
  ? Pick<ScheduledInterviewInt, "id">
  : never;
