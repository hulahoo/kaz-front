import { StandardEntity } from "./sys$StandardEntity";
import { DicCompany } from "./base_DicCompany";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { OrganizationIncentiveResult } from "./tsadv_OrganizationIncentiveResult";
import { DicIncentiveResultStatus } from "./tsadv_DicIncentiveResultStatus";
export class OrganizationIncentiveMonthResult extends StandardEntity {
  static NAME = "tsadv_OrganizationIncentiveMonthResult";
  company?: DicCompany | null;
  period?: any | null;
  department?: OrganizationGroupExt | null;
  incentiveResults?: OrganizationIncentiveResult[] | null;
  status?: DicIncentiveResultStatus | null;
  comment?: string | null;
}
export type OrganizationIncentiveMonthResultViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "organizationIncentiveMonthResult.browse"
  | "organizationIncentiveMonthResult.edit";
export type OrganizationIncentiveMonthResultView<
  V extends OrganizationIncentiveMonthResultViewName
> = V extends "_base"
  ? Pick<OrganizationIncentiveMonthResult, "id" | "period" | "comment">
  : V extends "_local"
  ? Pick<OrganizationIncentiveMonthResult, "id" | "period" | "comment">
  : V extends "organizationIncentiveMonthResult.browse"
  ? Pick<
      OrganizationIncentiveMonthResult,
      "id" | "period" | "comment" | "company" | "department" | "status"
    >
  : V extends "organizationIncentiveMonthResult.edit"
  ? Pick<
      OrganizationIncentiveMonthResult,
      "id" | "period" | "comment" | "department" | "status"
    >
  : never;
