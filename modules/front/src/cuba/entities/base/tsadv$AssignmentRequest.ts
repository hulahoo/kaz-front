import { StandardEntity } from "./sys$StandardEntity";
import { DicRequestStatus } from "./tsadv$DicRequestStatus";
import { PositionGroupExt } from "./base$PositionGroupExt";
import { GradeGroup } from "./tsadv$GradeGroup";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { JobGroup } from "./tsadv$JobGroup";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { FileDescriptor } from "./sys$FileDescriptor";
export class AssignmentRequest extends StandardEntity {
  static NAME = "tsadv$AssignmentRequest";
  dateFrom?: any | null;
  status?: DicRequestStatus | null;
  requestNumber?: any | null;
  positionGroup?: PositionGroupExt | null;
  gradeGroup?: GradeGroup | null;
  organizationGroup?: OrganizationGroupExt | null;
  jobGroup?: JobGroup | null;
  note?: string | null;
  personGroup?: PersonGroupExt | null;
  attachment?: FileDescriptor | null;
  actualPositionGroup?: PositionGroupExt | null;
  substitutedEmployee?: PersonGroupExt | null;
}
export type AssignmentRequestViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "assignmentRequest-view";
export type AssignmentRequestView<
  V extends AssignmentRequestViewName
> = V extends "_local"
  ? Pick<AssignmentRequest, "id" | "dateFrom" | "requestNumber" | "note">
  : V extends "_base"
  ? Pick<AssignmentRequest, "id" | "dateFrom" | "requestNumber" | "note">
  : V extends "assignmentRequest-view"
  ? Pick<
      AssignmentRequest,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "dateFrom"
      | "requestNumber"
      | "note"
      | "positionGroup"
      | "gradeGroup"
      | "organizationGroup"
      | "jobGroup"
      | "personGroup"
      | "status"
      | "attachment"
      | "actualPositionGroup"
      | "substitutedEmployee"
    >
  : never;
