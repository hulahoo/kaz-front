import { StandardEntity } from "./sys$StandardEntity";
import { PositionGroupExt } from "./base$PositionGroupExt";
import { CoinDistributionRule } from "./tsadv$CoinDistributionRule";
export class CoinDistributionPosition extends StandardEntity {
  static NAME = "tsadv$CoinDistributionPosition";
  positionGroup?: PositionGroupExt | null;
  coinDistributionRule?: CoinDistributionRule | null;
}
export type CoinDistributionPositionViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "coinDistributionPosition.edit";
export type CoinDistributionPositionView<
  V extends CoinDistributionPositionViewName
> = V extends "coinDistributionPosition.edit"
  ? Pick<
      CoinDistributionPosition,
      "id" | "positionGroup" | "coinDistributionRule"
    >
  : never;
