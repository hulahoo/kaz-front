import { StandardEntity } from "./sys$StandardEntity";
import { DicRequestStatus } from "./tsadv$DicRequestStatus";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { PositionGroupExt } from "./base$PositionGroupExt";
import { GradeGroup } from "./tsadv$GradeGroup";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { JobGroup } from "./tsadv$JobGroup";
import { FileDescriptor } from "./sys$FileDescriptor";
export class TemporaryTranslationRequest extends StandardEntity {
  static NAME = "tsadv$TemporaryTranslationRequest";
  requestNumber?: any | null;
  status?: DicRequestStatus | null;
  personGroup?: PersonGroupExt | null;
  startDate?: any | null;
  endDate?: any | null;
  positionGroup?: PositionGroupExt | null;
  gradeGroup?: GradeGroup | null;
  organizationGroup?: OrganizationGroupExt | null;
  jobGroup?: JobGroup | null;
  note?: string | null;
  attachment?: FileDescriptor | null;
  substitutedEmployee?: PersonGroupExt | null;
  reason?: string | null;
  actualPositionGroup?: PositionGroupExt | null;
}
export type TemporaryTranslationRequestViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "temporaryTranslationRequest-view";
export type TemporaryTranslationRequestView<
  V extends TemporaryTranslationRequestViewName
> = V extends "_base"
  ? Pick<
      TemporaryTranslationRequest,
      "id" | "requestNumber" | "startDate" | "endDate" | "note" | "reason"
    >
  : V extends "_local"
  ? Pick<
      TemporaryTranslationRequest,
      "id" | "requestNumber" | "startDate" | "endDate" | "note" | "reason"
    >
  : V extends "temporaryTranslationRequest-view"
  ? Pick<
      TemporaryTranslationRequest,
      | "id"
      | "requestNumber"
      | "startDate"
      | "endDate"
      | "note"
      | "reason"
      | "status"
      | "personGroup"
      | "positionGroup"
      | "gradeGroup"
      | "organizationGroup"
      | "jobGroup"
      | "attachment"
      | "substitutedEmployee"
      | "actualPositionGroup"
    >
  : never;
