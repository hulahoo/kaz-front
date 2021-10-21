import { StandardEntity } from "./sys$StandardEntity";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { OrganizationIncentiveMonthResult } from "./tsadv_OrganizationIncentiveMonthResult";
import { DicIncentiveIndicators } from "./tsadv_DicIncentiveIndicators";
export class OrganizationIncentiveResult extends StandardEntity {
  static NAME = "tsadv_OrganizationIncentiveResult";
  organizationGroup?: OrganizationGroupExt | null;
  organizationIncentiveMonthResult?: OrganizationIncentiveMonthResult | null;
  periodDate?: any | null;
  indicator?: DicIncentiveIndicators | null;
  plan?: any | null;
  fact?: any | null;
  weight?: any | null;
  premiumPercent?: any | null;
  result?: any | null;
  score?: any | null;
}
export type OrganizationIncentiveResultViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "organizationIncentiveResults-edit-view"
  | "organizationIncentiveResults-for-incentiveMonthResult"
  | "organizationIncentiveResults-notification-view"
  | "portal-organizationIncentiveResult-view";
export type OrganizationIncentiveResultView<
  V extends OrganizationIncentiveResultViewName
> = V extends "_base"
  ? Pick<
      OrganizationIncentiveResult,
      | "id"
      | "periodDate"
      | "plan"
      | "fact"
      | "weight"
      | "premiumPercent"
      | "result"
      | "score"
    >
  : V extends "_local"
  ? Pick<
      OrganizationIncentiveResult,
      | "id"
      | "periodDate"
      | "plan"
      | "fact"
      | "weight"
      | "premiumPercent"
      | "result"
      | "score"
    >
  : V extends "organizationIncentiveResults-edit-view"
  ? Pick<
      OrganizationIncentiveResult,
      | "id"
      | "periodDate"
      | "plan"
      | "fact"
      | "weight"
      | "premiumPercent"
      | "result"
      | "score"
      | "indicator"
    >
  : V extends "organizationIncentiveResults-for-incentiveMonthResult"
  ? Pick<
      OrganizationIncentiveResult,
      | "id"
      | "periodDate"
      | "plan"
      | "fact"
      | "weight"
      | "premiumPercent"
      | "result"
      | "score"
      | "indicator"
      | "organizationGroup"
      | "organizationIncentiveMonthResult"
    >
  : V extends "organizationIncentiveResults-notification-view"
  ? Pick<
      OrganizationIncentiveResult,
      | "id"
      | "periodDate"
      | "plan"
      | "fact"
      | "weight"
      | "premiumPercent"
      | "result"
      | "score"
      | "organizationIncentiveMonthResult"
    >
  : V extends "portal-organizationIncentiveResult-view"
  ? Pick<
      OrganizationIncentiveResult,
      | "id"
      | "periodDate"
      | "plan"
      | "fact"
      | "weight"
      | "premiumPercent"
      | "result"
      | "score"
      | "organizationGroup"
      | "indicator"
    >
  : never;
