import { StandardEntity } from "./sys$StandardEntity";
import { TsadvUser } from "./tsadv$UserExt";
export class BprocReassignment extends StandardEntity {
  static NAME = "tsadv_BprocReassignment";
  executionId?: string | null;
  startTime?: any | null;
  endTime?: any | null;
  comment?: string | null;
  outcome?: string | null;
  order?: number | null;
  assignee?: TsadvUser | null;
  processInstanceId?: string | null;
}
export type BprocReassignmentViewName = "_base" | "_local" | "_minimal";
export type BprocReassignmentView<
  V extends BprocReassignmentViewName
> = V extends "_base"
  ? Pick<
      BprocReassignment,
      | "id"
      | "executionId"
      | "startTime"
      | "endTime"
      | "comment"
      | "outcome"
      | "order"
      | "processInstanceId"
    >
  : V extends "_local"
  ? Pick<
      BprocReassignment,
      | "id"
      | "executionId"
      | "startTime"
      | "endTime"
      | "comment"
      | "outcome"
      | "order"
      | "processInstanceId"
    >
  : never;
