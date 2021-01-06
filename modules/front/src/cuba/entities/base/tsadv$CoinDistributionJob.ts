import { StandardEntity } from "./sys$StandardEntity";
import { JobGroup } from "./tsadv$JobGroup";
import { CoinDistributionRule } from "./tsadv$CoinDistributionRule";
export class CoinDistributionJob extends StandardEntity {
  static NAME = "tsadv$CoinDistributionJob";
  jobGroup?: JobGroup | null;
  coinDistributionRule?: CoinDistributionRule | null;
}
export type CoinDistributionJobViewName = "_base" | "_local" | "_minimal";
export type CoinDistributionJobView<
  V extends CoinDistributionJobViewName
> = never;
