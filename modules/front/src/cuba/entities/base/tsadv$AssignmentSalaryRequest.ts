import { StandardEntity } from "./sys$StandardEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { PositionGroupExt } from "./base$PositionGroupExt";
import { FileDescriptor } from "./sys$FileDescriptor";
import { DicRequestStatus } from "./tsadv$DicRequestStatus";
import { GradeGroup } from "./tsadv$GradeGroup";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { JobGroup } from "./tsadv$JobGroup";
import { DicCurrency } from "./base$DicCurrency";
import { DicSalaryChangeReason } from "./tsadv$DicSalaryChangeReason";
export class AssignmentSalaryRequest extends StandardEntity {
  static NAME = "tsadv$AssignmentSalaryRequest";
  personGroup?: PersonGroupExt | null;
  actualPositionGroup?: PositionGroupExt | null;
  attachment?: FileDescriptor | null;
  requestNumber?: any | null;
  status?: DicRequestStatus | null;
  dateFrom?: any | null;
  positionGroup?: PositionGroupExt | null;
  gradeGroup?: GradeGroup | null;
  organizationGroup?: OrganizationGroupExt | null;
  jobGroup?: JobGroup | null;
  type?: any | null;
  amount?: any | null;
  changePercent?: any | null;
  netGross?: any | null;
  currency?: DicCurrency | null;
  reason?: DicSalaryChangeReason | null;
  note?: string | null;
  substitutedEmployee?: PersonGroupExt | null;
}
export type AssignmentSalaryRequestViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "assignmentSalaryRequest-view";
export type AssignmentSalaryRequestView<
  V extends AssignmentSalaryRequestViewName
> = V extends "_local"
  ? Pick<
      AssignmentSalaryRequest,
      | "id"
      | "requestNumber"
      | "dateFrom"
      | "type"
      | "amount"
      | "changePercent"
      | "netGross"
      | "note"
    >
  : V extends "_base"
  ? Pick<
      AssignmentSalaryRequest,
      | "id"
      | "requestNumber"
      | "dateFrom"
      | "type"
      | "amount"
      | "changePercent"
      | "netGross"
      | "note"
    >
  : V extends "assignmentSalaryRequest-view"
  ? Pick<
      AssignmentSalaryRequest,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "requestNumber"
      | "dateFrom"
      | "type"
      | "amount"
      | "changePercent"
      | "netGross"
      | "note"
      | "personGroup"
      | "positionGroup"
      | "gradeGroup"
      | "organizationGroup"
      | "jobGroup"
      | "currency"
      | "reason"
      | "status"
      | "attachment"
      | "actualPositionGroup"
      | "substitutedEmployee"
    >
  : never;
