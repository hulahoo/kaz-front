import { StandardEntity } from "./sys$StandardEntity";
import { JobGroup } from "./tsadv$JobGroup";
import { CoinDistributionRule } from "./tsadv$CoinDistributionRule";
export class CoinDistributionJob extends StandardEntity {
  static NAME = "tsadv$CoinDistributionJob";
  jobGroup?: JobGroup | null;
  coinDistributionRule?: CoinDistributionRule | null;
}
export type CoinDistributionJobViewName = "_minimal" | "_local" | "_base";
export type CoinDistributionJobView<
  V extends CoinDistributionJobViewName
> = never;
