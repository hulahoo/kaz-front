import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicRequestStatus } from "./tsadv$DicRequestStatus";
import { DicRequisitionType } from "./tsadv$DicRequisitionType";
import { Absence } from "./tsadv$Absence";
export class LeavingVacationRequest extends AbstractParentEntity {
  static NAME = "tsadv$LeavingVacationRequest";
  requestNumber?: any | null;
  statusRequest?: DicRequestStatus | null;
  requestDate?: any | null;
  requestType?: DicRequisitionType | null;
  vacation?: Absence | null;
  startDate?: any | null;
  endData?: any | null;
  plannedStartDate?: any | null;
  comment?: string | null;
}
export type LeavingVacationRequestViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "leavingVacationRequest-browseView"
  | "leavingVacationRequest-editView";
export type LeavingVacationRequestView<
  V extends LeavingVacationRequestViewName
> = V extends "_base"
  ? Pick<
      LeavingVacationRequest,
      | "id"
      | "startDate"
      | "endData"
      | "requestNumber"
      | "requestDate"
      | "plannedStartDate"
      | "comment"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      LeavingVacationRequest,
      | "id"
      | "requestNumber"
      | "requestDate"
      | "startDate"
      | "endData"
      | "plannedStartDate"
      | "comment"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<LeavingVacationRequest, "id" | "startDate" | "endData">
  : V extends "leavingVacationRequest-browseView"
  ? Pick<
      LeavingVacationRequest,
      | "id"
      | "requestNumber"
      | "requestDate"
      | "startDate"
      | "endData"
      | "plannedStartDate"
      | "comment"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "statusRequest"
      | "requestType"
      | "vacation"
    >
  : V extends "leavingVacationRequest-editView"
  ? Pick<
      LeavingVacationRequest,
      | "id"
      | "requestNumber"
      | "requestDate"
      | "startDate"
      | "endData"
      | "plannedStartDate"
      | "comment"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "statusRequest"
      | "requestType"
      | "vacation"
    >
  : never;
