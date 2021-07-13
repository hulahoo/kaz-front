import { StandardEntity } from "./sys$StandardEntity";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
export class OrganizationIncentiveFlag extends StandardEntity {
  static NAME = "tsadv_OrganizationIncentiveFlag";
  organizationGroup?: OrganizationGroupExt | null;
  isIncentive?: boolean | null;
  dateFrom?: any | null;
  dateTo?: any | null;
}
export type OrganizationIncentiveFlagViewName = "_base" | "_local" | "_minimal";
export type OrganizationIncentiveFlagView<
  V extends OrganizationIncentiveFlagViewName
> = V extends "_base"
  ? Pick<
      OrganizationIncentiveFlag,
      "id" | "isIncentive" | "dateFrom" | "dateTo"
    >
  : V extends "_local"
  ? Pick<
      OrganizationIncentiveFlag,
      "id" | "isIncentive" | "dateFrom" | "dateTo"
    >
  : never;
