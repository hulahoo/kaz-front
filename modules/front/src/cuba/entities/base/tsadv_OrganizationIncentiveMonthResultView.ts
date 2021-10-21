import { StandardEntity } from "./sys$StandardEntity";
import { DicCompany } from "./base_DicCompany";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { DicIncentiveIndicators } from "./tsadv_DicIncentiveIndicators";
import { DicIncentiveResultStatus } from "./tsadv_DicIncentiveResultStatus";
export class OrganizationIncentiveMonthResultView extends StandardEntity {
  static NAME = "tsadv_OrganizationIncentiveMonthResultView";
  company?: DicCompany | null;
  period?: any | null;
  department?: OrganizationGroupExt | null;
  indicator?: DicIncentiveIndicators | null;
  weight?: any | null;
  plan?: any | null;
  fact?: any | null;
  result?: any | null;
  premiumPercent?: any | null;
  totalPremiumPercent?: any | null;
  status?: DicIncentiveResultStatus | null;
  comment?: string | null;
  parent?: OrganizationIncentiveMonthResultView | null;
}
export type OrganizationIncentiveMonthResultViewViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "organizationIncentiveMonthResultView.browse";
export type OrganizationIncentiveMonthResultViewView<
  V extends OrganizationIncentiveMonthResultViewViewName
> = V extends "_base"
  ? Pick<
      OrganizationIncentiveMonthResultView,
      | "id"
      | "period"
      | "weight"
      | "plan"
      | "fact"
      | "result"
      | "premiumPercent"
      | "totalPremiumPercent"
      | "comment"
    >
  : V extends "_local"
  ? Pick<
      OrganizationIncentiveMonthResultView,
      | "id"
      | "period"
      | "weight"
      | "plan"
      | "fact"
      | "result"
      | "premiumPercent"
      | "totalPremiumPercent"
      | "comment"
    >
  : V extends "organizationIncentiveMonthResultView.browse"
  ? Pick<
      OrganizationIncentiveMonthResultView,
      | "id"
      | "period"
      | "weight"
      | "plan"
      | "fact"
      | "result"
      | "premiumPercent"
      | "totalPremiumPercent"
      | "comment"
      | "company"
      | "department"
      | "parent"
      | "status"
      | "indicator"
    >
  : never;
