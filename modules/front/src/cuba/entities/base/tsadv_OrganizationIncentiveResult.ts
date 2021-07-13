import { StandardEntity } from "./sys$StandardEntity";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { DicIncentiveIndicators } from "./tsadv_DicIncentiveIndicators";
export class OrganizationIncentiveResult extends StandardEntity {
  static NAME = "tsadv_OrganizationIncentiveResult";
  organizationGroup?: OrganizationGroupExt | null;
  periodDate?: any | null;
  indicator?: DicIncentiveIndicators | null;
  plan?: any | null;
  fact?: any | null;
  weight?: any | null;
  result?: any | null;
}
export type OrganizationIncentiveResultViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "organizationIncentiveResults-edit-view";
export type OrganizationIncentiveResultView<
  V extends OrganizationIncentiveResultViewName
> = V extends "_base"
  ? Pick<
      OrganizationIncentiveResult,
      "id" | "periodDate" | "plan" | "fact" | "weight" | "result"
    >
  : V extends "_local"
  ? Pick<
      OrganizationIncentiveResult,
      "id" | "periodDate" | "plan" | "fact" | "weight" | "result"
    >
  : V extends "organizationIncentiveResults-edit-view"
  ? Pick<
      OrganizationIncentiveResult,
      "id" | "periodDate" | "plan" | "fact" | "weight" | "result" | "indicator"
    >
  : never;
