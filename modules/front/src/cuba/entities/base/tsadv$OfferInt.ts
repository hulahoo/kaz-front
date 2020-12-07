import { AbstractEntityInt } from "./tsadv$AbstractEntityInt";
export class OfferInt extends AbstractEntityInt {
  static NAME = "tsadv$OfferInt";
  requisition?: string | null;
  requisitionCode?: string | null;
  jobName?: string | null;
  proposedSalary?: string | null;
  expireDate?: string | null;
  file?: string | null;
  fileName?: string | null;
  proposedStartDate?: string | null;
  status?: string | null;
  comment?: string | null;
  offerId?: any | null;
}
export type OfferIntViewName = "_minimal" | "_local" | "_base";
export type OfferIntView<V extends OfferIntViewName> = V extends "_minimal"
  ? Pick<OfferInt, "id">
  : V extends "_base"
  ? Pick<OfferInt, "id">
  : never;
