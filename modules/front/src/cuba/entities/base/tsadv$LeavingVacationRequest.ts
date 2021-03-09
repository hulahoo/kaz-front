import { AbstractBprocRequest } from "./AbstractBprocRequest";
import { Absence } from "./tsadv$Absence";
export class LeavingVacationRequest extends AbstractBprocRequest {
  static NAME = "tsadv$LeavingVacationRequest";
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
      | "vacation"
      | "status"
    >
  : never;
