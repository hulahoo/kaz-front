import { StandardEntity } from "./sys$StandardEntity";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { Hierarchy } from "./base$Hierarchy";
import { CoinDistributionRule } from "./tsadv$CoinDistributionRule";
export class CoinDistributionOrganization extends StandardEntity {
  static NAME = "tsadv$CoinDistributionOrganization";
  parentOrganizationGroup?: OrganizationGroupExt | null;
  hierarchy?: Hierarchy | null;
  organizationGroup?: OrganizationGroupExt | null;
  coinDistributionRule?: CoinDistributionRule | null;
}
export type CoinDistributionOrganizationViewName =
  | "_minimal"
  | "_local"
  | "_base";
export type CoinDistributionOrganizationView<
  V extends CoinDistributionOrganizationViewName
> = never;
