import {StandardEntity} from "./sys$StandardEntity";
import {OrganizationGroupExt} from "./base$OrganizationGroupExt";
import {DicIncentiveIndicators} from "./tsadv_DicIncentiveIndicators";
import {PersonGroupExt} from "./base$PersonGroupExt";

export class OrganizationIncentiveIndicators extends StandardEntity {
  static NAME = "tsadv_OrganizationIncentiveIndicators";
  organizationGroup?: OrganizationGroupExt | null;
  dateFrom?: any | null;
  dateTo?: any | null;
  indicatorType?: any | null;
  indicator?: DicIncentiveIndicators | null;
  weight?: any | null;
  responsiblePerson?: PersonGroupExt | null;
}

export type OrganizationIncentiveIndicatorsViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "organizationIncentiveIndicators-edit-view";
export type OrganizationIncentiveIndicatorsView<V extends OrganizationIncentiveIndicatorsViewName> = V extends "_base"
  ? Pick<OrganizationIncentiveIndicators,
    "id" | "dateFrom" | "dateTo" | "indicatorType" | "weight">
  : V extends "_local"
    ? Pick<OrganizationIncentiveIndicators,
      "id" | "dateFrom" | "dateTo" | "indicatorType" | "weight">
    : V extends "organizationIncentiveIndicators-edit-view"
      ? Pick<OrganizationIncentiveIndicators,
        | "id"
        | "dateFrom"
        | "dateTo"
        | "indicatorType"
        | "weight"
        | "indicator"
        | "responsiblePerson">
      : V extends "portal-organizationIncentiveIndicators-view"
        ? Pick<OrganizationIncentiveIndicators,
          | "id"
          | "dateFrom"
          | "dateTo"
          | "indicatorType"
          | "weight"
          | "indicator">
        : never;
