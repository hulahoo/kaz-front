import { AbstractParentEntity } from "./AbstractParentEntity";
import { JobRequest } from "./tsadv$JobRequest";
import { DicCurrency } from "./base$DicCurrency";
import { OfferTemplate } from "./tsadv$OfferTemplate";
import { FileDescriptor } from "./sys$FileDescriptor";
import { OfferHistory } from "./tsadv$OfferHistory";
export class Offer extends AbstractParentEntity {
  static NAME = "tsadv$Offer";
  jobRequest?: JobRequest | null;
  candidateCommentary?: string | null;
  proposedSalary?: any | null;
  currency?: DicCurrency | null;
  expireDate?: any | null;
  proposedStartDate?: any | null;
  status?: any | null;
  offerTemplate?: OfferTemplate | null;
  file?: FileDescriptor | null;
  history?: OfferHistory[] | null;
  needBuisnessPartnerApprove?: boolean | null;
}
export type OfferViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "offer.rest"
  | "offer.edit"
  | "offer.browse"
  | "offer.bpm"
  | "offer.for.requisition";
export type OfferView<V extends OfferViewName> = V extends "_minimal"
  ? Pick<Offer, "id" | "jobRequest">
  : V extends "_local"
  ? Pick<
      Offer,
      | "id"
      | "candidateCommentary"
      | "proposedSalary"
      | "expireDate"
      | "proposedStartDate"
      | "status"
      | "needBuisnessPartnerApprove"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      Offer,
      | "id"
      | "jobRequest"
      | "candidateCommentary"
      | "proposedSalary"
      | "expireDate"
      | "proposedStartDate"
      | "status"
      | "needBuisnessPartnerApprove"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "offer.rest"
  ? Pick<
      Offer,
      | "id"
      | "candidateCommentary"
      | "proposedSalary"
      | "expireDate"
      | "proposedStartDate"
      | "status"
      | "needBuisnessPartnerApprove"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "jobRequest"
      | "file"
    >
  : V extends "offer.edit"
  ? Pick<
      Offer,
      | "id"
      | "candidateCommentary"
      | "proposedSalary"
      | "expireDate"
      | "proposedStartDate"
      | "status"
      | "needBuisnessPartnerApprove"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "file"
      | "history"
      | "jobRequest"
      | "currency"
      | "offerTemplate"
    >
  : V extends "offer.browse"
  ? Pick<
      Offer,
      | "id"
      | "candidateCommentary"
      | "proposedSalary"
      | "expireDate"
      | "proposedStartDate"
      | "status"
      | "needBuisnessPartnerApprove"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "jobRequest"
      | "currency"
      | "offerTemplate"
      | "file"
      | "history"
    >
  : V extends "offer.bpm"
  ? Pick<
      Offer,
      | "id"
      | "candidateCommentary"
      | "proposedSalary"
      | "expireDate"
      | "proposedStartDate"
      | "status"
      | "needBuisnessPartnerApprove"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "jobRequest"
      | "file"
    >
  : V extends "offer.for.requisition"
  ? Pick<Offer, "id" | "jobRequest" | "status">
  : never;
