import { StandardEntity } from "./sys$StandardEntity";
import { CoinDistributionPerson } from "./tsadv$CoinDistributionPerson";
import { CoinDistributionOrganization } from "./tsadv$CoinDistributionOrganization";
import { CoinDistributionPosition } from "./tsadv$CoinDistributionPosition";
import { CoinDistributionJob } from "./tsadv$CoinDistributionJob";
import { CoinDistributionGrade } from "./tsadv$CoinDistributionGrade";
import { CoinDistributionCostCenter } from "./tsadv$CoinDistributionCostCenter";
export class CoinDistributionRule extends StandardEntity {
  static NAME = "tsadv$CoinDistributionRule";
  name?: string | null;
  persons?: CoinDistributionPerson[] | null;
  organizations?: CoinDistributionOrganization[] | null;
  positions?: CoinDistributionPosition[] | null;
  jobs?: CoinDistributionJob[] | null;
  grades?: CoinDistributionGrade[] | null;
  costCenters?: CoinDistributionCostCenter[] | null;
  description?: string | null;
  distributionFrequency?: any | null;
  zeroFrequency?: any | null;
  active?: boolean | null;
  coins?: any | null;
}
export type CoinDistributionRuleViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "coinDistributionRule.browse"
  | "coinDistributionRule.edit";
export type CoinDistributionRuleView<
  V extends CoinDistributionRuleViewName
> = V extends "_minimal"
  ? Pick<CoinDistributionRule, "id" | "name">
  : V extends "_local"
  ? Pick<
      CoinDistributionRule,
      | "id"
      | "name"
      | "description"
      | "distributionFrequency"
      | "zeroFrequency"
      | "active"
      | "coins"
    >
  : V extends "_base"
  ? Pick<
      CoinDistributionRule,
      | "id"
      | "name"
      | "description"
      | "distributionFrequency"
      | "zeroFrequency"
      | "active"
      | "coins"
    >
  : V extends "coinDistributionRule.browse"
  ? Pick<
      CoinDistributionRule,
      | "id"
      | "name"
      | "description"
      | "distributionFrequency"
      | "zeroFrequency"
      | "active"
      | "coins"
      | "persons"
      | "positions"
    >
  : V extends "coinDistributionRule.edit"
  ? Pick<
      CoinDistributionRule,
      | "id"
      | "name"
      | "description"
      | "distributionFrequency"
      | "zeroFrequency"
      | "active"
      | "coins"
      | "grades"
      | "persons"
      | "positions"
    >
  : never;
