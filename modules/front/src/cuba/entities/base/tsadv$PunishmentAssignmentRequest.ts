import { PunishmentRequest } from "./tsadv$PunishmentRequest";
import { DicOffenceType } from "./tsadv$DicOffenceType";
import { FileDescriptor } from "./sys$FileDescriptor";
import { DicPunishmentTypes } from "./tsadv$DicPunishmentTypes";
export class PunishmentAssignmentRequest extends PunishmentRequest {
  static NAME = "tsadv$PunishmentAssignmentRequest";
  offenceType?: DicOffenceType | null;
  assignmentDate?: any | null;
  accident?: string | null;
  hasDeclaratory?: boolean | null;
  declaratoryFile?: FileDescriptor | null;
  hasRefusal?: boolean | null;
  refusalFile?: FileDescriptor | null;
  punishmentType?: DicPunishmentTypes | null;
  additionalFiles?: FileDescriptor[] | null;
}
export type PunishmentAssignmentRequestViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "punishmentAssignmentRequest-view";
export type PunishmentAssignmentRequestView<
  V extends PunishmentAssignmentRequestViewName
  > = V extends "_base"
  ? Pick<
    PunishmentAssignmentRequest,
    | "id"
    | "requestNumber"
    | "requestDate"
    | "assignmentDate"
    | "accident"
    | "hasDeclaratory"
    | "hasRefusal"
    | "legacyId"
    | "organizationBin"
    | "integrationUserLogin"
    | "comment"
    | "requestType"
    >
  : V extends "_local"
    ? Pick<
      PunishmentAssignmentRequest,
      | "id"
      | "assignmentDate"
      | "accident"
      | "hasDeclaratory"
      | "hasRefusal"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
      | "requestType"
      >
    : V extends "_minimal"
      ? Pick<PunishmentAssignmentRequest, "id" | "requestNumber" | "requestDate">
      : V extends "punishmentAssignmentRequest-view"
        ? Pick<
          PunishmentAssignmentRequest,
          | "id"
          | "assignmentDate"
          | "accident"
          | "hasDeclaratory"
          | "hasRefusal"
          | "legacyId"
          | "organizationBin"
          | "integrationUserLogin"
          | "requestNumber"
          | "requestDate"
          | "comment"
          | "requestType"
          | "offenceType"
          | "declaratoryFile"
          | "refusalFile"
          | "additionalFiles"
          | "status"
          | "punishmentType"
          | "personGroup"
          >
        : never;
