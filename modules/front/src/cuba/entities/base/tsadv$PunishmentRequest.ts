import { AbstractBprocRequest } from "./AbstractBprocRequest";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { PunishmentRequestType } from "../../enums/enums";
export class PunishmentRequest extends AbstractBprocRequest {
  static NAME = "tsadv$PunishmentRequest";
  personGroup?: PersonGroupExt | null;
  requestType?: PunishmentRequestType | null;
}
export type PunishmentRequestViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "punishmentRequest-view";
export type PunishmentRequestView<
  V extends PunishmentRequestViewName
  > = V extends "_base"
  ? Pick<
    PunishmentRequest,
    | "id"
    | "requestNumber"
    | "requestDate"
    | "requestType"
    | "legacyId"
    | "organizationBin"
    | "integrationUserLogin"
    | "comment"
    >
  : V extends "_local"
    ? Pick<
      PunishmentRequest,
      | "id"
      | "requestType"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
      >
    : V extends "_minimal"
      ? Pick<PunishmentRequest, "id" | "requestNumber" | "requestDate">
      : V extends "punishmentRequest-view"
        ? Pick<
          PunishmentRequest,
          | "id"
          | "requestType"
          | "legacyId"
          | "organizationBin"
          | "integrationUserLogin"
          | "requestNumber"
          | "requestDate"
          | "comment"
          | "personGroup"
          | "status"
          >
        : never;
