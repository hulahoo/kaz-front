import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { Offer } from "./tsadv$Offer";
export class OfferHistory extends AbstractParentEntity {
  static NAME = "tsadv$OfferHistory";
  statusChangeDate?: any | null;
  status?: any | null;
  changeReason?: string | null;
  declineReason?: string | null;
  changedBy?: PersonGroupExt | null;
  offer?: Offer | null;
}
export type OfferHistoryViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "offerHistory.edit";
export type OfferHistoryView<V extends OfferHistoryViewName> = V extends "_base"
  ? Pick<
      OfferHistory,
      | "id"
      | "statusChangeDate"
      | "status"
      | "changeReason"
      | "declineReason"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      OfferHistory,
      | "id"
      | "statusChangeDate"
      | "status"
      | "changeReason"
      | "declineReason"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "offerHistory.edit"
  ? Pick<
      OfferHistory,
      | "id"
      | "statusChangeDate"
      | "status"
      | "changeReason"
      | "declineReason"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "changedBy"
      | "offer"
    >
  : never;
