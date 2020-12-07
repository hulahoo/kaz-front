import { StandardEntity } from "./sys$StandardEntity";
import { DicCostCenter } from "./tsadv$DicCostCenter";
import { CoinDistributionRule } from "./tsadv$CoinDistributionRule";
export class CoinDistributionCostCenter extends StandardEntity {
  static NAME = "tsadv$CoinDistributionCostCenter";
  costCenter?: DicCostCenter | null;
  coinDistributionRule?: CoinDistributionRule | null;
}
export type CoinDistributionCostCenterViewName =
  | "_minimal"
  | "_local"
  | "_base";
export type CoinDistributionCostCenterView<
  V extends CoinDistributionCostCenterViewName
> = never;
