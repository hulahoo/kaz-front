import { StandardEntity } from "./sys$StandardEntity";
import { DicCompany } from "./base_DicCompany";
import { OrganizationIncentiveResult } from "./tsadv_OrganizationIncentiveResult";
import { DicIncentiveResultStatus } from "./tsadv_DicIncentiveResultStatus";
export class OrganizationIncentiveMonthResult extends StandardEntity {
  static NAME = "tsadv_OrganizationIncentiveMonthResult";
  company?: DicCompany | null;
  period?: any | null;
  incentiveResults?: OrganizationIncentiveResult[] | null;
  status?: DicIncentiveResultStatus | null;
  comment?: string | null;
}
export type OrganizationIncentiveMonthResultViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "organizationIncentiveMonthResult.browse"
  | "organizationIncentiveMonthResult.edit"
  | "organizationIncentiveMonthResult.integration"
  | "organizationIncentiveMonthResult.integration.full"
  | "portal-organizationIncentiveMonthResult-view";
export type OrganizationIncentiveMonthResultView<
  V extends OrganizationIncentiveMonthResultViewName
> = V extends "_base"
  ? Pick<OrganizationIncentiveMonthResult, "id" | "period" | "comment">
  : V extends "_local"
  ? Pick<OrganizationIncentiveMonthResult, "id" | "period" | "comment">
  : V extends "organizationIncentiveMonthResult.browse"
  ? Pick<
      OrganizationIncentiveMonthResult,
      "id" | "period" | "comment" | "company" | "status"
    >
  : V extends "organizationIncentiveMonthResult.edit"
  ? Pick<
      OrganizationIncentiveMonthResult,
      "id" | "period" | "comment" | "status"
    >
  : V extends "organizationIncentiveMonthResult.integration"
  ? Pick<
      OrganizationIncentiveMonthResult,
      "id" | "period" | "comment" | "status"
    >
  : V extends "organizationIncentiveMonthResult.integration.full"
  ? Pick<
      OrganizationIncentiveMonthResult,
      "id" | "period" | "comment" | "incentiveResults"
    >
  : V extends "portal-organizationIncentiveMonthResult-view"
  ? Pick<
      OrganizationIncentiveMonthResult,
      "id" | "period" | "comment" | "incentiveResults" | "status"
    >
  : never;
