import { AbstractParentEntity } from "./AbstractParentEntity";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { PositionGroupExt } from "./base$PositionGroupExt";
import { GradeGroup } from "./tsadv$GradeGroup";
import { DicCostCenter } from "./tsadv$DicCostCenter";
import { FileDescriptor } from "./sys$FileDescriptor";
import { DicRequestStatus } from "./tsadv$DicRequestStatus";
export class PositionChangeRequest extends AbstractParentEntity {
  static NAME = "tsadv$PositionChangeRequest";
  requestNumber?: any | null;
  requestDate?: any | null;
  requestType?: any | null;
  organizationGroup?: OrganizationGroupExt | null;
  positionGroup?: PositionGroupExt | null;
  jobNameLang1?: string | null;
  jobNameLang2?: string | null;
  jobNameLang3?: string | null;
  location?: string | null;
  gradeGroup?: GradeGroup | null;
  costCenter?: DicCostCenter | null;
  fte?: number | null;
  effectiveDate?: any | null;
  comments?: string | null;
  parentPositionGroup?: PositionGroupExt | null;
  materialLiabilityAgreementRequired?: boolean | null;
  mrgForm?: FileDescriptor | null;
  jobInstruction?: FileDescriptor | null;
  attachment?: FileDescriptor | null;
  status?: DicRequestStatus | null;
}
export type PositionChangeRequestViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "positionChangeRequest.edit";
export type PositionChangeRequestView<
  V extends PositionChangeRequestViewName
> = V extends "_minimal"
  ? Pick<PositionChangeRequest, "id" | "requestNumber">
  : V extends "_local"
  ? Pick<
      PositionChangeRequest,
      | "id"
      | "requestNumber"
      | "requestDate"
      | "requestType"
      | "jobNameLang1"
      | "jobNameLang2"
      | "jobNameLang3"
      | "location"
      | "fte"
      | "effectiveDate"
      | "comments"
      | "materialLiabilityAgreementRequired"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      PositionChangeRequest,
      | "id"
      | "requestNumber"
      | "requestDate"
      | "requestType"
      | "jobNameLang1"
      | "jobNameLang2"
      | "jobNameLang3"
      | "location"
      | "fte"
      | "effectiveDate"
      | "comments"
      | "materialLiabilityAgreementRequired"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "positionChangeRequest.edit"
  ? Pick<
      PositionChangeRequest,
      | "id"
      | "requestNumber"
      | "requestDate"
      | "requestType"
      | "jobNameLang1"
      | "jobNameLang2"
      | "jobNameLang3"
      | "location"
      | "fte"
      | "effectiveDate"
      | "comments"
      | "materialLiabilityAgreementRequired"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "positionGroup"
      | "gradeGroup"
      | "costCenter"
      | "parentPositionGroup"
      | "mrgForm"
      | "jobInstruction"
      | "attachment"
      | "organizationGroup"
      | "status"
    >
  : never;
