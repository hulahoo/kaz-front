import { AbstractBprocRequest } from "./AbstractBprocRequest";
import { DicRequisitionType } from "./tsadv$DicRequisitionType";
import { Absence } from "./tsadv$Absence";
export class LeavingVacationRequest extends AbstractBprocRequest {
  static NAME = "tsadv$LeavingVacationRequest";
  requestType?: DicRequisitionType | null;
  vacation?: Absence | null;
  startDate?: any | null;
  endDate?: any | null;
  plannedStartDate?: any | null;
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
      | "endDate"
      | "plannedStartDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
    >
  : V extends "_local"
  ? Pick<
      LeavingVacationRequest,
      | "id"
      | "startDate"
      | "endDate"
      | "plannedStartDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
    >
  : V extends "_minimal"
  ? Pick<LeavingVacationRequest, "id" | "startDate" | "endDate">
  : V extends "leavingVacationRequest-browseView"
  ? Pick<
      LeavingVacationRequest,
      | "id"
      | "startDate"
      | "endDate"
      | "plannedStartDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
      | "requestType"
      | "vacation"
      | "status"
    >
  : V extends "leavingVacationRequest-editView"
  ? Pick<
      LeavingVacationRequest,
      | "id"
      | "startDate"
      | "endDate"
      | "plannedStartDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
      | "requestType"
      | "vacation"
      | "status"
    >
  : never;
