import { AbstractParentEntity } from "./AbstractParentEntity";
import { Requisition } from "./tsadv$Requisition";
import { DicPostingChannel } from "./tsadv$DicPostingChannel";
export class RequisitionPostingChannel extends AbstractParentEntity {
  static NAME = "tsadv$RequisitionPostingChannel";
  requisition?: Requisition | null;
  postingChannel?: DicPostingChannel | null;
  startDate?: any | null;
  endDate?: any | null;
}
export type RequisitionPostingChannelViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "requisitionPostingChannel.view";
export type RequisitionPostingChannelView<
  V extends RequisitionPostingChannelViewName
> = V extends "_minimal"
  ? Pick<RequisitionPostingChannel, "id">
  : V extends "_local"
  ? Pick<
      RequisitionPostingChannel,
      | "id"
      | "startDate"
      | "endDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      RequisitionPostingChannel,
      | "id"
      | "startDate"
      | "endDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "requisitionPostingChannel.view"
  ? Pick<
      RequisitionPostingChannel,
      | "id"
      | "startDate"
      | "endDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requisition"
      | "postingChannel"
    >
  : never;
