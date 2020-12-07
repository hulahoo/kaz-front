import { AbstractParentEntity } from "./AbstractParentEntity";
import { AssignmentGroupExt } from "./base$AssignmentGroupExt";
import { PositionGroupExt } from "./base$PositionGroupExt";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { DicRequestStatus } from "./tsadv$DicRequestStatus";
export class TransferRequest extends AbstractParentEntity {
  static NAME = "tsadv$TransferRequest";
  assignmentGroup?: AssignmentGroupExt | null;
  requestDate?: any | null;
  transferDate?: any | null;
  newPositionGroup?: PositionGroupExt | null;
  newOrganizationGroup?: OrganizationGroupExt | null;
  requestStatus?: DicRequestStatus | null;
}
export type TransferRequestViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "transferRequest.view"
  | "transferRequest.edit";
export type TransferRequestView<
  V extends TransferRequestViewName
> = V extends "_minimal"
  ? Pick<TransferRequest, "id">
  : V extends "_local"
  ? Pick<
      TransferRequest,
      | "id"
      | "requestDate"
      | "transferDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      TransferRequest,
      | "id"
      | "requestDate"
      | "transferDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "transferRequest.view"
  ? Pick<
      TransferRequest,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "requestDate"
      | "transferDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "assignmentGroup"
      | "newPositionGroup"
      | "newOrganizationGroup"
      | "requestStatus"
    >
  : V extends "transferRequest.edit"
  ? Pick<
      TransferRequest,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "requestDate"
      | "transferDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "assignmentGroup"
      | "newPositionGroup"
      | "newOrganizationGroup"
      | "requestStatus"
    >
  : never;
