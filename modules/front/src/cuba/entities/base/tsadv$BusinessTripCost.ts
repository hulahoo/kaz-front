import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicCostType } from "./tsadv$DicCostType";
import { DicCurrency } from "./base$DicCurrency";
import { BusinessTripLines } from "./tsadv$BusinessTripLines";
export class BusinessTripCost extends AbstractParentEntity {
  static NAME = "tsadv$BusinessTripCost";
  amount?: any | null;
  costType?: DicCostType | null;
  currency?: DicCurrency | null;
  businessTripLines?: BusinessTripLines | null;
}
export type BusinessTripCostViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "businessTripCost-view";
export type BusinessTripCostView<
  V extends BusinessTripCostViewName
> = V extends "_base"
  ? Pick<
      BusinessTripCost,
      | "id"
      | "amount"
      | "costType"
      | "currency"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      BusinessTripCost,
      "id" | "amount" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<BusinessTripCost, "id" | "amount" | "costType" | "currency">
  : V extends "businessTripCost-view"
  ? Pick<
      BusinessTripCost,
      | "id"
      | "amount"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "costType"
      | "currency"
    >
  : never;
