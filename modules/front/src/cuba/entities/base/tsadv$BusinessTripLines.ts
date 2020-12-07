import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicCity } from "./base$DicCity";
import { BusinessTrip } from "./tsadv$BusinessTrip";
import { BusinessTripCost } from "./tsadv$BusinessTripCost";
export class BusinessTripLines extends AbstractParentEntity {
  static NAME = "tsadv$BusinessTripLines";
  cityTo?: DicCity | null;
  cityFrom?: DicCity | null;
  number?: string | null;
  dateFrom?: any | null;
  dateTo?: any | null;
  businessTrip?: BusinessTrip | null;
  businessTripCost?: BusinessTripCost[] | null;
}
export type BusinessTripLinesViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "businessTripLines-view";
export type BusinessTripLinesView<
  V extends BusinessTripLinesViewName
> = V extends "_minimal"
  ? Pick<BusinessTripLines, "id" | "cityTo">
  : V extends "_local"
  ? Pick<
      BusinessTripLines,
      | "id"
      | "number"
      | "dateFrom"
      | "dateTo"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      BusinessTripLines,
      | "id"
      | "cityTo"
      | "number"
      | "dateFrom"
      | "dateTo"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "businessTripLines-view"
  ? Pick<
      BusinessTripLines,
      | "id"
      | "number"
      | "dateFrom"
      | "dateTo"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "businessTripCost"
      | "cityTo"
      | "cityFrom"
    >
  : never;
