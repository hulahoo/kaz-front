import { AbstractParentEntity } from "./AbstractParentEntity";
import { Requisition } from "./tsadv$Requisition";
export class RequisitionHistory extends AbstractParentEntity {
  static NAME = "tsadv$RequisitionHistory";
  requisition?: Requisition | null;
  status?: any | null;
  reason?: string | null;
  openedPositionsCount?: any | null;
}
export type RequisitionHistoryViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "requisitionHistory.browse";
export type RequisitionHistoryView<
  V extends RequisitionHistoryViewName
> = V extends "_base"
  ? Pick<
      RequisitionHistory,
      | "id"
      | "status"
      | "reason"
      | "openedPositionsCount"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      RequisitionHistory,
      | "id"
      | "status"
      | "reason"
      | "openedPositionsCount"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "requisitionHistory.browse"
  ? Pick<
      RequisitionHistory,
      | "id"
      | "requisition"
      | "status"
      | "createTs"
      | "createdBy"
      | "reason"
      | "openedPositionsCount"
    >
  : never;
