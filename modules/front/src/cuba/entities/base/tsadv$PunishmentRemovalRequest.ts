import { PunishmentRequest } from "./tsadv$PunishmentRequest";
import { FileDescriptor } from "./sys$FileDescriptor";
export class PunishmentRemovalRequest extends PunishmentRequest {
  static NAME = "tsadv$PunishmentRemovalRequest";
  removingDate?: any | null;
  removingOrderNum?: string | null;
  removingOrderDate?: any | null;
  earlyTerminationReason?: string | null;
  removingFile?: FileDescriptor | null;
}
export type PunishmentRemovalRequestViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "punishmentRemovalRequest-view";
export type PunishmentRemovalRequestView<
  V extends PunishmentRemovalRequestViewName
  > = V extends "_base"
  ? Pick<
    PunishmentRemovalRequest,
    | "id"
    | "requestNumber"
    | "requestDate"
    | "removingDate"
    | "removingOrderNum"
    | "removingOrderDate"
    | "earlyTerminationReason"
    | "legacyId"
    | "organizationBin"
    | "integrationUserLogin"
    | "comment"
    | "requestType"
    >
  : V extends "_local"
    ? Pick<
      PunishmentRemovalRequest,
      | "id"
      | "removingDate"
      | "removingOrderNum"
      | "removingOrderDate"
      | "earlyTerminationReason"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
      | "requestType"
      >
    : V extends "_minimal"
      ? Pick<PunishmentRemovalRequest, "id" | "requestNumber" | "requestDate">
      : V extends "punishmentRemovalRequest-view"
        ? Pick<
          PunishmentRemovalRequest,
          | "id"
          | "removingDate"
          | "removingOrderNum"
          | "removingOrderDate"
          | "earlyTerminationReason"
          | "legacyId"
          | "organizationBin"
          | "integrationUserLogin"
          | "requestNumber"
          | "requestDate"
          | "comment"
          | "requestType"
          | "status"
          | "removingFile"
          | "personGroup"
          >
        : never;
